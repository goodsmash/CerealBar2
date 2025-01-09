import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { GoogleMap } from '@/components/ui/google-map';

const location = {
  address: '6 Tremont St',
  city: 'Brighton',
  state: 'MA',
  zipCode: '02135'
};

export const LocationSection = () => {
  const fullAddress = `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`;
  const googleMapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(fullAddress)}`;

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 w-full">
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-pink-500 mb-4">Visit Us</h2>
            <p className="text-xl md:text-2xl text-gray-800">Come experience the sweetest spot in Brighton!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-xl border-2 border-pink-500"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <MapPin className="text-pink-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Address</h3>
                  <p className="text-gray-600">{location.address}</p>
                  <p className="text-gray-600">{location.city}, {location.state} {location.zipCode}</p>
                  <div className="mt-3">
                    <InteractiveHoverButton
                      text="Get Directions"
                      onClick={() => window.open(googleMapsUrl, '_blank')}
                      icon={<ExternalLink size={16} />}
                      className="bg-pink-500 text-white hover:bg-pink-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Phone className="text-pink-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Phone</h3>
                  <InteractiveHoverButton
                    text="(123) 456-7890"
                    onClick={() => window.location.href = 'tel:+11234567890'}
                    icon={<Phone size={16} />}
                    className="bg-pink-500 text-white hover:bg-pink-600"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Clock className="text-pink-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Hours</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Monday - Thursday: 11am - 10pm</p>
                    <p>Friday - Saturday: 11am - 12am</p>
                    <p>Sunday: 11am - 9pm</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg border-2 border-pink-500"
            >
              <div className="absolute inset-0 w-full h-full">
                <GoogleMap
                  address={fullAddress}
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  className="w-full h-full rounded-xl"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <InteractiveHoverButton
                    text="View on Maps"
                    onClick={() => window.open(googleMapsUrl, '_blank')}
                    icon={<ExternalLink size={16} />}
                    className="bg-pink-500 text-white hover:bg-pink-600"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
