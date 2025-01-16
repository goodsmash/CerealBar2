import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { BrandContainer, BrandHeading } from '@/components/ui/brand-theme';
import { Button } from '@/components/ui/button';
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

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      
      <BrandContainer className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <BrandHeading level={2} className="mb-4">Visit Us</BrandHeading>
          <p className="text-xl md:text-2xl text-foreground/90 font-medium">
            Come experience the sweetest spot in Brighton!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 bg-background/95 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-xl lg:sticky lg:top-24 h-[500px]"
          >
            {/* Address Section */}
            <div className="flex items-start space-x-4">
              <div className="bg-brand-pink/20 p-3 rounded-lg">
                <MapPin className="text-brand-pink" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Location</h3>
                <p className="text-foreground/90 font-medium">{location.address}</p>
                <p className="text-foreground/90 font-medium mb-3">{location.city}, {location.state} {location.zipCode}</p>
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="gap-2"
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Phone Section */}
            <div className="flex items-start space-x-4">
              <div className="bg-brand-pink/20 p-3 rounded-lg">
                <Phone className="text-brand-pink" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Phone</h3>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-foreground/90 hover:text-brand-pink font-medium"
                >
                  <a href={`tel:${location.phone}`}>
                    {location.phone}
                  </a>
                </Button>
              </div>
            </div>

            {/* Hours Section */}
            <div className="flex items-start space-x-4">
              <div className="bg-brand-pink/20 p-3 rounded-lg">
                <Clock className="text-brand-pink" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Hours</h3>
                <div className="space-y-1 text-foreground/90 font-medium">
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
            className="w-full h-[500px] relative rounded-2xl overflow-hidden shadow-xl border border-white/20"
            style={{ position: 'relative' }}
          >
            <GoogleMap 
              address={fullAddress}
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </BrandContainer>
    </section>
  );
};