import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-[#86e3ce] to-[#d6e5fa] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center p-8 max-w-4xl"
      >
        <h1 className="text-6xl font-bold mb-6 text-black">
          YOUR LOCAL<br/>
          <motion.span 
            className="text-[#86e3ce]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CEREAL
          </motion.span> AND <motion.span 
            className="text-[#d6e5fa]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            ICE CREAM
          </motion.span><br/>
          SHOP
        </h1>
        <div className="flex flex-col gap-4 md:flex-row justify-center items-center mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-[#ff9a9e]">ALLERGEN AWARE</h3>
            <p className="text-gray-600 mt-2">All ingredients clearly listed</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-[#86e3ce]">ECO FRIENDLY</h3>
            <p className="text-gray-600 mt-2">Sustainable packaging</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};