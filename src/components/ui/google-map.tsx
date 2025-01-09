import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  address: string;
  apiKey: string;
  className?: string;
}

export const GoogleMap = ({ address, apiKey, className = '' }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places'],
          mapIds: ['ac9815d07ed690e7']
        });

        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        const geocodeResponse = await new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              resolve(results[0]);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          });
        });

        const location = (geocodeResponse as google.maps.GeocoderResult).geometry.location;
        
        const mapOptions: google.maps.MapOptions = {
          center: location,
          zoom: 15,
          mapId: 'ac9815d07ed690e7',
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          gestureHandling: 'cooperative'
        };

        // Create map instance
        const map = new google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Create and add marker
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'Sweet & Comfy Boston',
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#ec4899',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }
        });
        markerRef.current = marker;

        // Add hover effect to marker
        marker.addListener('mouseover', () => {
          if (marker.getIcon() && typeof marker.getIcon() !== 'string') {
            marker.setIcon({
              ...(marker.getIcon() as google.maps.Symbol),
              scale: 12,
            });
          }
        });

        marker.addListener('mouseout', () => {
          if (marker.getIcon() && typeof marker.getIcon() !== 'string') {
            marker.setIcon({
              ...(marker.getIcon() as google.maps.Symbol),
              scale: 10,
            });
          }
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2 text-gray-800">
              <h3 class="font-bold text-lg mb-1">Sweet & Comfy Boston</h3>
              <p class="text-sm">${(geocodeResponse as google.maps.GeocoderResult).formatted_address}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Trigger a resize event after map initialization
        window.setTimeout(() => {
          google.maps.event.trigger(map, 'resize');
        }, 500);

      } catch (error) {
        console.error('Error loading Google Maps:', error);
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

  return (
    <div 
      ref={mapRef} 
      className={`${className} relative w-full h-full min-h-[400px]`}
      style={{ 
        position: 'relative',
        overflow: 'hidden'
      }} 
      aria-label="Google Map showing Sweet & Comfy Boston location"
    />
  );
};
