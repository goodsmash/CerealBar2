import { motion } from 'framer-motion';
import { FaIceCream, FaGift, FaStar, FaHeart, FaMagic } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const newsItems = [
  {
    icon: <FaIceCream className="text-2xl text-brand-pink" />,
    text: "NEW: Artisanal Ice Cream Flavors",
    highlight: true,
    href: "/menu"
  },
  {
    icon: <FaGift className="text-2xl text-brand-blue" />,
    text: "Student Discounts Available",
    highlight: false,
    href: "/events"
  },
  {
    icon: <FaStar className="text-2xl text-yellow-400" />,
    text: "Join Our Rewards Program",
    highlight: true,
    href: "/events"
  },
  {
    icon: <FaHeart className="text-2xl text-red-400" />,
    text: "Made with Love in Brighton",
    highlight: false,
    href: "/contact"
  },
  {
    icon: <FaMagic className="text-2xl text-purple-400" />,
    text: "Custom Ice Cream Creations",
    highlight: true,
    href: "/menu"
  }
];

export const NewsMarquee = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-brand-pink/90 via-brand-blue/90 to-brand-pink/90 backdrop-blur-sm border-t border-white/20 py-4 z-50">
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
          className="flex space-x-12 whitespace-nowrap"
        >
          {[...newsItems, ...newsItems].map((item, index) => (
            <Button
              key={index}
              variant={item.highlight ? "default" : "secondary"}
              size="sm"
              asChild
              className="flex items-center gap-2 px-4 py-2 rounded-full"
            >
              <a href={item.href}>
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </a>
            </Button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
