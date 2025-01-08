import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cereals } from '@/lib/menu-data/cereals';
import { CustomItem } from '@/types/cereal';

interface CerealSelectionProps {
  customItem: CustomItem;
  onSelect: (category: keyof CustomItem, item: string) => void;
  onNext: () => void;
}

export function CerealSelection({ customItem, onSelect, onNext }: CerealSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">Choose Your Cereals</h2>
      <div className="grid grid-cols-2 gap-4">
        {cereals.map((cereal) => (
          <Button
            key={cereal.id}
            onClick={() => {
              onSelect('cereals', cereal.id);
              onNext();
            }}
            variant={customItem.cereals.includes(cereal.id) ? "default" : "outline"}
            className="h-auto py-4"
          >
            {cereal.name}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}