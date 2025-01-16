"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IceCream, Calendar, Clock, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onMenuClick: () => void;
  onContactClick: () => void;
}

export const HeroSection = ({ onMenuClick, onContactClick }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-brand-pink/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-brand-blue/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 container mx-auto h-full flex items-center justify-center text-center px-4 py-20"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-24 h-24 mx-auto mb-8"
            >
              <IceCream className="w-full h-full text-brand-pink" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brand-pink via-white to-brand-blue drop-shadow-lg">
              Sweet Dreams Are Made of These
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed drop-shadow-md">
              Where cereal meets ice cream in perfect harmony.
              Your childhood favorites reimagined.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-background/95 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:border-brand-pink/50 transition-all duration-300 shadow-lg">
              <Clock className="w-10 h-10 text-brand-pink mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Open Daily
              </h3>
              <p className="text-foreground/90 font-medium">
                Mon-Thu: 11am - 10pm
                <br />
                Fri-Sat: 11am - 12am
              </p>
            </div>

            <div className="bg-background/95 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:border-brand-blue/50 transition-all duration-300 shadow-lg">
              <MapPin className="w-10 h-10 text-brand-blue mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Visit Us
              </h3>
              <p className="text-foreground/90 font-medium">
                6 Tremont St
                <br />
                Brighton, MA 02135
              </p>
            </div>

            <div className="bg-background/95 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:border-brand-pink/50 transition-all duration-300 shadow-lg">
              <Calendar className="w-10 h-10 text-brand-pink mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Events
              </h3>
              <p className="text-foreground/90 font-medium">
                Book your special
                <br />
                celebration with us
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              onClick={onMenuClick}
              className="bg-brand-pink hover:bg-brand-pink-dark text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              View Menu
            </Button>
            <Button
              onClick={onContactClick}
              variant="outline"
              className="border-2 border-white/20 hover:border-brand-blue/50 text-white px-8 py-6 rounded-full text-lg font-semibold backdrop-blur-sm hover:bg-brand-blue/20 transition-all duration-300 w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};