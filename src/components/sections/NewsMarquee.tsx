import { motion } from 'framer-motion';
import { FaIceCream, FaGift, FaStar, FaHeart, FaMagic } from 'react-icons/fa';

const newsItems = [
  {
    icon: <FaIceCream className="text-xl" />,
    text: "NEW: Artisanal Ice Cream Flavors",
    highlight: true
  },
  {
    icon: <FaGift className="text-xl" />,
    text: "Student Discounts Available",
    highlight: false
  },
  {
    icon: <FaStar className="text-xl" />,
    text: "Join Our Rewards Program",
    highlight: true
  },
  {
    icon: <FaHeart className="text-xl" />,
    text: "Made with Love in Brighton",
    highlight: false
  },
  {
    icon: <FaMagic className="text-xl" />,
    text: "Custom Ice Cream Creations",
    highlight: true
  }
];

export const NewsMarquee = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary/90 via-secondary/90 to-primary/90 backdrop-blur-sm border-t border-primary/20 py-3 z-50">
      <div className="relative overflow-hidden">
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex space-x-8 whitespace-nowrap"
        >
          {[...newsItems, ...newsItems].map((item, index) => (
            <div
              key={index}
              className={`inline-flex items-center space-x-2 px-4 py-1 rounded-full ${
                item.highlight
                  ? 'bg-white/10 text-white'
                  : 'text-white/90'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
