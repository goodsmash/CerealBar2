import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CustomItem } from '@/types/cereal';
import { IceCreamCone, UtensilsCrossed } from 'lucide-react';

interface StyleSelectionProps {
  customItem: CustomItem;
  onSelect: (category: keyof CustomItem, item: string) => void;
  onNext: () => void;
}

const styleOptions = [
  { id: 'shake', name: 'Milkshake', price: 2.00, icon: <IceCreamCone className="w-6 h-6" /> },
  { id: 'bowl', name: 'Classic Bowl', price: 0, icon: <UtensilsCrossed className="w-6 h-6" /> }
];

export function StyleSelection({ customItem, onSelect, onNext }: StyleSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">Choose Your Style</h2>
      <div className="grid grid-cols-2 gap-4">
        {styleOptions.map((style) => (
          <Button
            key={style.id}
            onClick={() => {
              onSelect('style', style.id);
              onNext();
            }}
            variant={customItem.style === style.id ? "default" : "outline"}
            className="h-auto py-4"
          >
            <span className="flex items-center gap-2">
              {style.icon}
              {style.name}
            </span>
          </Button>
        ))}
      </div>
    </motion.div>
  );
}