"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/forms/ContactForm";

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
              Have questions or want to learn more about our services? Send us a message and we'll get back to you soon!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};