import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/button';

interface MenuSectionProps {
  items: MenuItem[];
}

export const MenuSection = ({ items }: MenuSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'Shakes' | 'Bowls' | 'Water'>('Shakes');
  
  const categories = [
    { id: 'Shakes', label: 'Shakes', icon: '🥤' },
    { id: 'Bowls', label: 'Bowls', icon: '🥣' },
    { id: 'Water', label: 'Drinks', icon: '💧' },
  ];

  const filteredItems = items.filter(item => item.category === selectedCategory);

  return (
    <section id="menu" className="min-h-screen bg-gradient-to-b from-background to-background/90 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Menu</h2>
          <p className="text-xl text-gray-300">Explore our delicious selection of treats</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as 'Shakes' | 'Bowls' | 'Water')}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`px-6 py-3 text-lg font-semibold ${
                selectedCategory === category.id
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="aspect-video relative rounded-lg overflow-hidden mb-4 bg-black/20">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                {item.popular && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-gray-300 mb-4 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                {item.allergens && (
                  <span className="text-sm text-gray-400">Contains: {item.allergens.join(', ')}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};