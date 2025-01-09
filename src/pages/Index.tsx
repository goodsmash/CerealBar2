"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { NewsMarquee } from "@/components/sections/NewsMarquee";
import { MenuSection } from "@/components/sections/MenuSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { menuItems } from "@/data/menu";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(255, 215, 0)" // Yellow
          gradientBackgroundEnd="rgb(236, 72, 153)" // Pink
          firstColor="255, 215, 0" // Yellow
          secondColor="236, 72, 153" // Pink
          thirdColor="255, 182, 193" // Light Pink
          fourthColor="255, 223, 186" // Peach
          fifthColor="255, 240, 245" // Lavender Blush
          className="absolute inset-0 !h-full"
        />
      </div>
      
      <div className="relative z-10">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <HeroSection 
                onMenuClick={() => scrollToSection('menu')}
                onContactClick={() => scrollToSection('contact')}
              />

              <section className="relative py-20 z-20">
                <ReviewsSection />
              </section>

              <section className="relative py-20 bg-black/30 backdrop-blur-sm z-20">
                <LocationSection />
              </section>

              <section id="menu" className="relative py-20 z-20">
                <MenuSection items={menuItems} />
              </section>

              <section id="contact" className="relative py-20 z-20">
                <ContactSection />
              </section>

              <div className="relative z-20">
                <NewsMarquee />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <FloatingShapes />
      </div>
    </div>
  );
};

export default Index;