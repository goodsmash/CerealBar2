import { motion } from "framer-motion";

export const ContactSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#d6e5fa] to-[#ff9a9e]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          KEEP IN TOUCH
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-lg mb-8"
        >
          Sign up with your email address to receive news and updates!
        </motion.p>
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email Address"
            className="w-full max-w-md p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#86e3ce]"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#ff9a9e] text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-opacity"
          >
            SIGN UP
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};