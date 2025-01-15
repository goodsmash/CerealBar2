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
import { EventBookingForm } from "@/components/events/EventBookingForm";

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
          gradientBackgroundStart="rgba(255, 105, 180, 0.8)" // Brand pink with opacity
          gradientBackgroundEnd="rgba(75, 156, 211, 0.8)" // Brand blue with opacity
          firstColor="255, 105, 180" // Brand pink
          secondColor="75, 156, 211" // Brand blue
          thirdColor="255, 182, 193" // Light pink
          fourthColor="135, 206, 235" // Light blue
          fifthColor="245, 245, 220" // Cream
          blendingValue="soft-light" // Changed from hard-light for softer blend
          size="100%" // Full coverage
          className="absolute inset-0 !h-full opacity-70" // Reduced opacity
        />
      </div>
      
      <div className="relative z-10">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-32 pb-32"
            >
              <HeroSection onMenuClick={scrollToMenu} onContactClick={scrollToContact} />
              <NewsMarquee />
              <div ref={menuRef}>
                <MenuSection items={menuItems} />
              </div>
              <ReviewsSection />
              <LocationSection />
              <div ref={contactRef} className="pt-16">
                <BrandContainer>
                  <BrandHeading level={2} className="text-center mb-16">Book an Event</BrandHeading>
                  <EventBookingForm />
                </BrandContainer>
              </div>
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
        <FloatingShapes />
      </div>
    </div>
  );
};

export default Index;