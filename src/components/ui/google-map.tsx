import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  address: string;
  apiKey: string;
  className?: string;
}

export const GoogleMap = ({ address, apiKey, className = '' }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || !apiKey) {
        setError('Map configuration error');
        setIsLoading(false);
        return;
      }

      try {
        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places'],
        });

        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        const geocodeResponse = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              resolve(results[0]);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          });
        });

        const location = geocodeResponse.geometry.location;
        
        const mapOptions: google.maps.MapOptions = {
          center: location,
          zoom: 15,
          styles: [
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#000000' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { weight: 2 }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e9e9e9' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [{ color: '#eeeeee' }]
            }
          ],
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          rotateControl: false,
          fullscreenControl: true,
          backgroundColor: '#ffffff',
          gestureHandling: 'cooperative'
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'Sweet & Comfy Boston',
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#FF69B4',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          }
        });
        markerRef.current = marker;

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="padding: 8px;">
            <h3 style="margin: 0 0 4px; font-weight: bold;">Sweet & Comfy Boston</h3>
            <p style="margin: 0;">${address}</p>
          </div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Map initialization error:', err);
        setError('Failed to load map');
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
      }
    };
  }, [address, apiKey]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-background/95 ${className}`}>
        <div className="text-center p-8">
          <MapPin className="w-12 h-12 text-brand-pink mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Map temporarily unavailable</p>
          <p className="text-sm text-muted-foreground">Please visit us at:</p>
          <p className="text-sm text-muted-foreground">{address}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-background/95 ${className}`}>
        <div className="text-center p-8">
          <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};
