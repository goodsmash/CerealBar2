import { MenuSection } from "@/components/sections/MenuSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { NewsMarquee } from "@/components/sections/NewsMarquee";
import { ParallaxSection } from "@/components/sections/ParallaxSection";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { menuItems } from "@/data/menu";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { IceCreamIcon } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
              <motion.div
                style={{ opacity, scale, y }}
                className="relative h-screen flex flex-col items-center justify-center text-center px-4"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-8"
                >
                  <IceCreamIcon className="h-24 w-24 text-primary mx-auto mb-6" />
                </motion.div>

                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary"
                >
                  Sweet Dreams Are Made of These
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto"
                >
                  Experience the perfect blend of nostalgia and indulgence
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-primary/5 backdrop-blur-lg border border-primary/10 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 hover:bg-primary/10"
                  >
                    <h2 className="text-2xl font-bold text-primary mb-2">ALLERGEN AWARE</h2>
                    <p className="text-foreground/80">Safe treats for everyone</p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="bg-secondary/5 backdrop-blur-lg border border-secondary/10 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 hover:bg-secondary/10"
                  >
                    <h2 className="text-2xl font-bold text-secondary mb-2">ECO FRIENDLY</h2>
                    <p className="text-foreground/80">Sustainable sweetness</p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="bg-primary/5 backdrop-blur-lg border border-primary/10 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 hover:bg-primary/10"
                  >
                    <h2 className="text-2xl font-bold text-primary mb-2">COMMUNITY INSPIRED</h2>
                    <p className="text-foreground/80">Local flavors & love</p>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="flex gap-4"
                >
                  <Button
                    onClick={scrollToMenu}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
                  >
                    GET THE SCOOP
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-6"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    CONTACT US
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            <section id="menu" className="py-20">
              <MenuSection items={menuItems} />
            </section>

            <section className="py-20 bg-background/50 backdrop-blur">
              <ParallaxSection />
            </section>

            <section className="py-20">
              <ReviewsSection />
            </section>

            <section className="relative py-20 bg-background/50 backdrop-blur">
              <LocationSection />
            </section>

            <section className="py-20">
              <NewsletterSection />
            </section>

            <section id="contact" className="py-20 bg-background/50 backdrop-blur">
              <ContactForm />
            </section>

            <NewsMarquee />
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingShapes />
    </div>
  );
};

export default Index;