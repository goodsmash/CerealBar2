import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/data/types';

interface MenuSectionProps {
  items: MenuItem[];
}

export const MenuSection = ({ items }: MenuSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Shakes');
  
  const categories = [
    { id: 'Shakes', label: 'Shakes', icon: '🥤' },
    { id: 'Bowls', label: 'Bowls', icon: '🥣' },
    { id: 'Add-Ons', label: 'Add-Ons', icon: '🍪' },
    { id: 'Water', label: 'Drinks', icon: '💧' },
  ];

  const filteredItems = items.filter(item => item.category === selectedCategory);

  return (
    <section id="menu" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Our Menu</h2>
          <p className="text-secondary">Explore our delicious selection of treats</p>
        </motion.div>

        <div className="flex justify-center mb-8 gap-4 overflow-x-auto pb-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                ${selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-accent/10 text-secondary hover:bg-accent/20'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-lg shadow-lg overflow-hidden"
            >
              {item.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  {item.popular && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      Popular
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">{item.name}</h3>
                <p className="text-secondary text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="text-sm text-secondary">
                      Contains: {item.allergens.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};