import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Visit Us</h3>
            <p className="text-secondary-light">6 Tremont St</p>
            <p className="text-secondary-light">Brighton, MA</p>
            <a 
              href="tel:+1234567890" 
              className="text-secondary-light hover:text-primary transition-colors"
            >
              (123) 456-7890
            </a>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Hours</h3>
            <p className="text-secondary-light">Monday - Thursday: 11am - 10pm</p>
            <p className="text-secondary-light">Friday - Saturday: 11am - 12am</p>
            <p className="text-secondary-light">Sunday: 11am - 9pm</p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-secondary-light hover:text-primary transition-colors"
              >
                Instagram
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-secondary-light hover:text-primary transition-colors"
              >
                Facebook
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-secondary-light hover:text-primary transition-colors"
              >
                Twitter
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary/10">
          <p className="text-center text-secondary-light">
            &copy; {new Date().getFullYear()} Sweet & Comfy Boston. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
