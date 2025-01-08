import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CustomItem } from '@/types/cereal';

interface SizeSelectionProps {
  customItem: CustomItem;
  onSelect: (category: keyof CustomItem, item: string) => void;
  onNext: () => void;
}

const sizeOptions = [
  { id: 'regular', name: 'Regular (16oz)', price: 0 },
  { id: 'large', name: 'Large (24oz)', price: 2.00 }
];

export function SizeSelection({ customItem, onSelect, onNext }: SizeSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">Choose Your Size</h2>
      <div className="grid grid-cols-2 gap-4">
        {sizeOptions.map((size) => (
          <Button
            key={size.id}
            onClick={() => {
              onSelect('size', size.id);
              onNext();
            }}
            variant={customItem.size === size.id ? "default" : "outline"}
            className="h-auto py-4"
          >
            {size.name}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}