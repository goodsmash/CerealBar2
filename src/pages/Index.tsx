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
import { BrandContainer } from "@/components/ui/brand-theme";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToEvents = () => {
    navigate('/events');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgba(255, 105, 180, 0.8)"
          gradientBackgroundEnd="rgba(75, 156, 211, 0.8)"
          firstColor="255, 105, 180"
          secondColor="75, 156, 211"
          thirdColor="255, 182, 193"
          fourthColor="135, 206, 235"
          fifthColor="245, 245, 220"
          blendingValue="soft-light"
          size="100%"
          className="absolute inset-0 !h-full opacity-70"
        />
      </div>
      
      <div className="relative z-10">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24 pb-32"
            >
              <HeroSection onMenuClick={scrollToMenu} onContactClick={scrollToContact} />
              <div ref={menuRef}>
                <MenuSection items={menuItems} />
              </div>
              <ReviewsSection />
              <LocationSection />
              
              {/* Event CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-16 bg-gradient-to-r from-brand-pink/20 via-brand-blue/20 to-brand-pink/20 backdrop-blur-sm"
              >
                <BrandContainer>
                  <div className="text-center space-y-6">
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      Planning an Event?
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-gray-200 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      Make it unforgettable with our custom ice cream catering services.
                      Perfect for birthdays, weddings, corporate events, and more!
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Button 
                        onClick={navigateToEvents}
                        className="bg-brand-pink hover:bg-brand-pink-dark text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Book Your Event
                      </Button>
                    </motion.div>
                  </div>
                </BrandContainer>
              </motion.div>

              <div ref={contactRef}>
                <ContactSection />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <FloatingShapes />
      </div>
      <NewsMarquee />
    </div>
  );
};

export default Index;