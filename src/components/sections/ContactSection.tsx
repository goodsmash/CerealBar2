"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-black/40 backdrop-blur-sm p-12 rounded-2xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6 text-white"
            >
              KEEP IN TOUCH
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-200 mb-8"
            >
              Sign up with your email address to receive news and updates about our latest flavors and special offers!
            </motion.p>
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-bold whitespace-nowrap"
                >
                  GET UPDATES
                </Button>
              </div>
              <p className="text-sm text-gray-300 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};