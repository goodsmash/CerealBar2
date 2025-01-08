import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaIceCream, FaHeart, FaStar } from 'react-icons/fa';

export const ParallaxSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section 
      ref={ref}
      className="relative min-h-[60vh] overflow-hidden"
    >
      {/* Background gradient and texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />

      {/* Floating icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ y: y1, opacity, scale }}
          className="absolute text-primary/20 transform -translate-x-64"
        >
          <FaIceCream className="w-32 h-32 md:w-48 md:h-48" />
        </motion.div>
        <motion.div
          style={{ y: y2, opacity, scale }}
          className="absolute text-secondary/20"
        >
          <FaStar className="w-32 h-32 md:w-48 md:h-48" />
        </motion.div>
        <motion.div
          style={{ y: y3, opacity, scale }}
          className="absolute text-primary/20 transform translate-x-64"
        >
          <FaHeart className="w-32 h-32 md:w-48 md:h-48" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex items-center justify-center text-center px-4 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                Crafted with Love
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Every scoop tells a story of passion, creativity, and the finest ingredients.
              Experience ice cream reimagined.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8"
          >
            <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10 flex-1 min-w-[250px] max-w-[300px]">
              <div className="text-primary mb-4">
                <FaIceCream className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Artisanal Quality</h3>
              <p className="text-foreground/70">Handcrafted in small batches for the perfect taste</p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10 flex-1 min-w-[250px] max-w-[300px]">
              <div className="text-secondary mb-4">
                <FaStar className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Ingredients</h3>
              <p className="text-foreground/70">Sourced from local farms and suppliers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
