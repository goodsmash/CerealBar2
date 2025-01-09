"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { NewsMarquee } from "@/components/sections/NewsMarquee";
import { MenuSection } from "@/components/sections/MenuSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { menuItems } from "@/data/menu";
import { ContactSection } from "@/components/sections/ContactSection";
import { BrandContainer, BrandHeading } from "@/components/ui/brand-theme";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="#FF69B4" // Brand pink
          gradientBackgroundEnd="#4B9CD3" // Brand blue
          firstColor="255, 105, 180" // Brand pink
          secondColor="75, 156, 211" // Brand blue
          thirdColor="255, 182, 193" // Light pink
          fourthColor="135, 206, 235" // Light blue
          fifthColor="245, 245, 220" // Cream
          className="absolute inset-0 !h-full opacity-90"
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
                onMenuClick={scrollToMenu}
                onContactClick={scrollToContact}
              />

              <div ref={menuRef}>
                <BrandContainer className="my-20 mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
                  <BrandHeading level={2} className="text-center mb-12">
                    Our Menu
                  </BrandHeading>
                  <MenuSection items={menuItems} />
                </BrandContainer>
              </div>

              <section className="relative py-20 bg-black/30 backdrop-blur-sm z-20">
                <BrandContainer className="mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
                  <BrandHeading level={2} className="text-center mb-12">
                    Our Location
                  </BrandHeading>
                  <LocationSection />
                </BrandContainer>
              </section>

              <section className="relative py-20 z-20">
                <BrandContainer className="mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
                  <BrandHeading level={2} className="text-center mb-12">
                    What Our Customers Say
                  </BrandHeading>
                  <ReviewsSection />
                </BrandContainer>
              </section>

              <div ref={contactRef} className="my-20">
                <BrandContainer className="mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
                  <BrandHeading level={2} className="text-center mb-12">
                    Contact Us
                  </BrandHeading>
                  <ContactSection />
                </BrandContainer>
              </div>

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