import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MenuSectionProps {
  items: MenuItem[];
}

export const MenuSection = ({ items }: MenuSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'Shakes' | 'Bowls' | 'Water'>('Shakes');
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  
  const categories = [
    { id: 'Shakes', label: 'Shakes', icon: '🥤' },
    { id: 'Bowls', label: 'Bowls', icon: '🥣' },
    { id: 'Water', label: 'Drinks', icon: '💧' },
  ];

  const filteredItems = items.filter(item => item.category === selectedCategory);

  const handleImageError = (itemId: string) => {
    console.error(`Failed to load image for item: ${itemId}`);
    setImageError(prev => ({ ...prev, [itemId]: true }));
  };

  return (
    <section id="menu" className="min-h-screen bg-gradient-to-b from-background to-background/90 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-light">Our Menu</h2>
          <p className="text-xl text-secondary-light">Explore our delicious selection of treats</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as 'Shakes' | 'Bowls' | 'Water')}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`px-6 py-3 text-lg font-semibold ${
                selectedCategory === category.id
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'text-primary border-primary hover:bg-primary hover:text-white'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                {!imageError[item.id] ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-4xl">{
                      item.category === 'Shakes' ? '🥤' :
                      item.category === 'Bowls' ? '🥣' : '💧'
                    }</span>
                  </div>
                )}
                {item.popular && (
                  <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="outline"
                    className="bg-white/90 text-primary hover:bg-white"
                  >
                    View Details
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">{item.name}</h3>
                <p className="text-secondary-light mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};