import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { IceCream, ZoomIn, ZoomOut, Compass, MapPin } from 'lucide-react';
import { MapErrorBoundary } from './map-error-boundary';
import styles from './google-map.module.css';
import cn from 'classnames';
import { Button } from './button';

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
    elementType: "geometry",
    stylers: [
      { saturation: -30 },
      { lightness: 10 }
    ]
  },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      { saturation: -100 },
      { lightness: 45 }
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
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&zoom=15`;

  return (
    <div className={cn("w-full h-full relative overflow-hidden rounded-lg", className)}>
      <iframe
        className="w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        title="Google Maps location"
      />
    </div>
  );
};