import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

export const LocationSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Visit Us</h2>
          <p className="text-xl text-foreground/80">Come experience the sweetest spot in Brighton!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-primary/10"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FaMapMarkerAlt className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Address</h3>
                <p className="text-foreground/80">6 Tremont St</p>
                <p className="text-foreground/80">Brighton, MA</p>
                <a
                  href="https://maps.google.com/?q=6+Tremont+St+Brighton+MA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FaPhone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Phone</h3>
                <a
                  href="tel:+11234567890"
                  className="text-foreground/80 hover:text-primary"
                >
                  (123) 456-7890
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FaClock className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Hours</h3>
                <div className="space-y-1 text-foreground/80">
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
            className="h-[500px] rounded-xl overflow-hidden shadow-lg border border-primary/10 bg-background/50"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.828588245437!2d-71.15568968487055!3d42.348500043906726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e379a606c9e879%3A0x4395e689feb76639!2s6%20Tremont%20St%2C%20Brighton%2C%20MA%2002135!5e0!3m2!1sen!2sus!4v1673649148597!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
