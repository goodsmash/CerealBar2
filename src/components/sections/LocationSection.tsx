import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { BrandContainer, BrandHeading } from '@/components/ui/brand-theme';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { GoogleMap } from '@/components/ui/google-map';

const location = {
  name: 'Sweet & Comfy Boston',
  address: '6 Tremont St',
  city: 'Brighton',
  state: 'MA',
  zipCode: '02135',
  phone: '(123) 456-7890',
  hours: {
    monThur: '11am - 10pm',
    friSat: '11am - 12am',
    sun: '11am - 9pm'
  }
};

export const LocationSection = () => {
  const fullAddress = `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`;
  const googleMapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(fullAddress)}`;
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  return (
    <BrandContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <BrandHeading level={2} className="mb-4">Visit Us</BrandHeading>
        <p className="text-xl md:text-2xl text-gray-200">
          Come experience the sweetest spot in Brighton!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-xl lg:sticky lg:top-24"
        >
          {/* Address Section */}
          <div className="flex items-start space-x-4">
            <div className="bg-brand-pink/20 p-3 rounded-lg">
              <MapPin className="text-brand-pink" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-300">{location.address}</p>
              <p className="text-gray-300">{location.city}, {location.state} {location.zipCode}</p>
              <InteractiveHoverButton
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-brand-pink hover:text-brand-pink-light flex items-center"
              >
                Get Directions
                <ExternalLink className="ml-1 h-4 w-4" />
              </InteractiveHoverButton>
            </div>
          </div>

          {/* Phone Section */}
          <div className="flex items-start space-x-4">
            <div className="bg-brand-pink/20 p-3 rounded-lg">
              <Phone className="text-brand-pink" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
              <InteractiveHoverButton
                href={`tel:${location.phone}`}
                className="text-gray-300 hover:text-brand-pink"
              >
                {location.phone}
              </InteractiveHoverButton>
            </div>
          </div>

          {/* Hours Section */}
          <div className="flex items-start space-x-4">
            <div className="bg-brand-pink/20 p-3 rounded-lg">
              <Clock className="text-brand-pink" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Hours</h3>
              <div className="space-y-1 text-gray-300">
                <p>Mon-Thu: {location.hours.monThur}</p>
                <p>Fri-Sat: {location.hours.friSat}</p>
                <p>Sun: {location.hours.sun}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-xl"
        >
          {/* Map Error Fallback */}
          {!googleMapsApiKey && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-8 rounded-xl">
              <div className="text-center text-white">
                <MapPin className="w-12 h-12 text-brand-pink mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Map Unavailable</h3>
                <p className="text-gray-300 mb-4">Please visit us at:</p>
                <p className="text-gray-300">{fullAddress}</p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-brand-pink to-brand-blue text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          )}
          {/* Google Map */}
          <GoogleMap
            address={fullAddress}
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </BrandContainer>
  );
};
