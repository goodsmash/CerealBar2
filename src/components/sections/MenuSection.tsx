import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrandContainer, BrandHeading } from '@/components/ui/brand-theme';
import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MenuSectionProps {
  items: MenuItem[];
}

export const MenuSection = ({ items }: MenuSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 relative"
    >
      {/* Add a semi-transparent background overlay for better contrast */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      
      <BrandContainer className="relative z-10">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <BrandHeading level={2}>Our Menu</BrandHeading>
            <p className="text-lg font-medium text-foreground/90 max-w-2xl mx-auto">
              Discover our unique cereal creations and signature combinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-background/95 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-primary/50 transition-colors shadow-lg"
              >
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{item.name}</h3>
                <p className="text-foreground/80 mb-4 font-medium">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                  {item.popular && (
                    <span className="px-3 py-1 text-sm font-semibold bg-primary/15 text-primary rounded-full">
                      Popular
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </BrandContainer>
    </motion.section>
  );
};