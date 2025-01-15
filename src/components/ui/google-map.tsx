import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { IceCream, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { MapErrorBoundary } from './map-error-boundary';
import styles from './google-map.module.css';
import cn from 'classnames';
import { config } from '@/lib/config';

// Constants
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const DEFAULT_ZOOM = 15;
const MIN_ZOOM = 10;
const MAX_ZOOM = 20;

// Error messages
const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Google Maps API key is missing. Map functionality will be disabled.',
  LOAD_FAILED: 'Failed to load Google Maps. Please try again.',
  GEOCODING_FAILED: 'Failed to find the location. Please check the address.',
  GENERAL_ERROR: 'An error occurred. Please try again.',
};

// Map styles
const MAP_STYLES = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      { saturation: -100 },
      { lightness: 50 }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  }
];

interface GoogleMapProps {
  address: string;
  className?: string;
}

export const GoogleMap = ({ address, className = '' }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  // Validate API key on component mount
  if (typeof window !== 'undefined' && !GOOGLE_MAPS_API_KEY) {
    console.error(ERROR_MESSAGES.API_KEY_MISSING);
  }

  // Loading and error UI
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div 
        className={cn("relative w-full h-[400px] bg-secondary/10 rounded-lg flex items-center justify-center", className)}
        role="alert"
        aria-label={ERROR_MESSAGES.API_KEY_MISSING}
      >
        <p className="text-secondary-light">{ERROR_MESSAGES.API_KEY_MISSING}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={cn("relative w-full h-[400px] bg-secondary/10 rounded-lg flex items-center justify-center", className)}
        role="alert"
        aria-label={error}
      >
        <p className="text-secondary-light">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className={cn("relative w-full h-[400px] bg-secondary/10 rounded-lg flex items-center justify-center", className)}
        role="status"
        aria-label="Loading map..."
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        <span className="sr-only">Loading map...</span>
      </div>
    );
  }

  // Map control handlers
  const handleZoom = useCallback((delta: number) => {
    if (mapInstanceRef.current) {
      const newZoom = currentZoom + delta;
      if (newZoom >= MIN_ZOOM && newZoom <= MAX_ZOOM) {
        mapInstanceRef.current.setZoom(newZoom);
        setCurrentZoom(newZoom);
      }
    }
  }, [currentZoom]);

  const handleRecenter = useCallback(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const position = markerRef.current.getPosition();
      if (position) {
        mapInstanceRef.current.panTo(position);
        mapInstanceRef.current.setZoom(DEFAULT_ZOOM);
        setCurrentZoom(DEFAULT_ZOOM);
      }
    }
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current || !GOOGLE_MAPS_API_KEY) return;

      try {
        setIsLoading(true);
        setError(null);

        // Initialize Google Maps
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places", "geometry"]
        });

        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        const result = await new Promise<google.maps.GeocoderResult | null>((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              resolve(results[0]);
            } else {
              reject(new Error(ERROR_MESSAGES.GEOCODING_FAILED));
            }
          });
        });

        if (!result) {
          throw new Error(ERROR_MESSAGES.GEOCODING_FAILED);
        }

        const { location } = result.geometry;
        const mapOptions: google.maps.MapOptions = {
          center: location,
          zoom: DEFAULT_ZOOM,
          styles: MAP_STYLES,
          disableDefaultUI: true,
          gestureHandling: 'cooperative',
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        const marker = new google.maps.Marker({
          map,
          position: location,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#ff4b4b',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff',
          },
        });
        markerRef.current = marker;

        // Add event listeners
        map.addListener('zoom_changed', () => {
          setCurrentZoom(map.getZoom() || DEFAULT_ZOOM);
        });

        map.addListener('mouseover', () => {
          setIsMapInteractive(true);
        });

        map.addListener('mouseout', () => {
          setIsMapInteractive(false);
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Map initialization error:', err);
        setError(err instanceof Error ? err.message : ERROR_MESSAGES.GENERAL_ERROR);
        setIsLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        const google = window.google;
        if (google) {
          google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        }
      }
    };
  }, [address]);

  return (
    <MapErrorBoundary>
      <div className={cn("relative w-full h-[400px]", className)}>
        <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
        
        {/* Map controls */}
        <div className={cn(
          "absolute right-4 bottom-4 flex flex-col gap-2 transition-opacity duration-200",
          isMapInteractive ? "opacity-100" : "opacity-0"
        )}>
          <button
            onClick={() => handleZoom(1)}
            disabled={currentZoom >= MAX_ZOOM}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => handleZoom(-1)}
            disabled={currentZoom <= MIN_ZOOM}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleRecenter}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
            aria-label="Recenter map"
          >
            <Compass className="w-5 h-5" />
          </button>
        </div>
      </div>
    </MapErrorBoundary>
  );
};