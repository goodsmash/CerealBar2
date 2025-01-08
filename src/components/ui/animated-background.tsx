import { motion } from 'framer-motion';

const FloatingElement = ({ emoji, delay, duration, x, y }: { 
  emoji: string; 
  delay: number;
  duration: number;
  x: number;
  y: number;
}) => (
  <motion.div
    className="absolute text-2xl pointer-events-none select-none opacity-20"
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [y, y - 200],
      x: [x, x + Math.sin(delay) * 50],
      rotate: [0, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {emoji}
  </motion.div>
);

export const AnimatedBackground = () => {
  const elements = [
    { emoji: "🍦", delay: 0, duration: 15, x: "20%", y: "80%" },
    { emoji: "🥣", delay: 2, duration: 12, x: "40%", y: "90%" },
    { emoji: "🍪", delay: 4, duration: 18, x: "60%", y: "85%" },
    { emoji: "🧊", delay: 6, duration: 14, x: "80%", y: "75%" },
    { emoji: "🍫", delay: 8, duration: 16, x: "30%", y: "95%" },
    { emoji: "🥛", delay: 10, duration: 13, x: "70%", y: "80%" },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, var(--primary) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, var(--primary) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Elements */}
      {elements.map((el, index) => (
        <FloatingElement
          key={index}
          emoji={el.emoji}
          delay={el.delay}
          duration={el.duration}
          x={parseInt(el.x)}
          y={parseInt(el.y)}
        />
      ))}
    </div>
  );
};
