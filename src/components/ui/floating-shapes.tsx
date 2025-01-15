import { memo } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

interface Shape {
  color: string;
  secondColor?: string;
  type: "icecream" | "sprinkle" | "drip";
  size: string;
  left: string;
  top: string;
  hideOnMobile?: boolean;
  delay?: number;
}

const shapes: Shape[] = [
  // Ice cream cones with brand colors
  { color: "#FF69B4", secondColor: "#FFB6C1", type: "icecream", size: "60px", left: "5%", top: "10%" },
  { color: "#4B9CD3", secondColor: "#87CEEB", type: "icecream", size: "50px", left: "85%", top: "15%" },
  { color: "#FF69B4", secondColor: "#FF1493", type: "icecream", size: "55px", left: "15%", top: "85%" },
  { color: "#4B9CD3", secondColor: "#4169E1", type: "icecream", size: "45px", left: "90%", top: "90%" },
  { color: "#FF69B4", secondColor: "#FFB6C1", type: "icecream", size: "40px", left: "25%", top: "40%", hideOnMobile: true },
  { color: "#4B9CD3", secondColor: "#87CEEB", type: "icecream", size: "50px", left: "55%", top: "30%", hideOnMobile: true },
  
  // Sprinkles with brand colors
  { color: "#FF69B4", type: "sprinkle", size: "12px", left: "30%", top: "25%" },
  { color: "#4B9CD3", type: "sprinkle", size: "14px", left: "70%", top: "45%" },
  { color: "#F5F5DC", type: "sprinkle", size: "10px", left: "20%", top: "70%" },
  { color: "#FF69B4", type: "sprinkle", size: "16px", left: "60%", top: "85%" },
  { color: "#4B9CD3", type: "sprinkle", size: "12px", left: "40%", top: "55%" },
  { color: "#FF1493", type: "sprinkle", size: "10px", left: "15%", top: "35%" },
  { color: "#87CEEB", type: "sprinkle", size: "8px", left: "85%", top: "65%" },
  { color: "#4169E1", type: "sprinkle", size: "14px", left: "50%", top: "40%" },
  { color: "#FF69B4", type: "sprinkle", size: "11px", left: "25%", top: "60%" },
  { color: "#4B9CD3", type: "sprinkle", size: "13px", left: "75%", top: "25%" },
  // Additional sprinkles
  { color: "#FFB6C1", type: "sprinkle", size: "9px", left: "45%", top: "75%" },
  { color: "#87CEEB", type: "sprinkle", size: "11px", left: "35%", top: "15%" },
  { color: "#F5F5DC", type: "sprinkle", size: "13px", left: "65%", top: "50%" },
  { color: "#FF69B4", type: "sprinkle", size: "10px", left: "80%", top: "80%" },
  { color: "#4B9CD3", type: "sprinkle", size: "12px", left: "10%", top: "45%" },
  { color: "#FF1493", type: "sprinkle", size: "15px", left: "95%", top: "35%" },
  { color: "#87CEEB", type: "sprinkle", size: "11px", left: "55%", top: "65%" },
  { color: "#4169E1", type: "sprinkle", size: "9px", left: "40%", top: "95%" },
  { color: "#FF69B4", type: "sprinkle", size: "14px", left: "75%", top: "5%" },
  { color: "#4B9CD3", type: "sprinkle", size: "12px", left: "20%", top: "20%" },
  // Even more sprinkles!
  { color: "#FF69B4", type: "sprinkle", size: "10px", left: "88%", top: "42%" },
  { color: "#4B9CD3", type: "sprinkle", size: "8px", left: "33%", top: "88%" },
  { color: "#F5F5DC", type: "sprinkle", size: "11px", left: "92%", top: "22%" },
  { color: "#FF1493", type: "sprinkle", size: "9px", left: "7%", top: "77%" },
  { color: "#87CEEB", type: "sprinkle", size: "13px", left: "48%", top: "18%" },
  { color: "#4169E1", type: "sprinkle", size: "10px", left: "82%", top: "58%" },
  { color: "#FFB6C1", type: "sprinkle", size: "12px", left: "17%", top: "92%" },
  { color: "#FF69B4", type: "sprinkle", size: "11px", left: "63%", top: "12%" },
  { color: "#4B9CD3", type: "sprinkle", size: "9px", left: "28%", top: "73%" },
  { color: "#F5F5DC", type: "sprinkle", size: "14px", left: "97%", top: "48%" },
  // Add some drips
  { color: "#FF69B4", type: "drip", size: "20px", left: "10%", top: "20%", delay: 0 },
  { color: "#4B9CD3", type: "drip", size: "15px", left: "80%", top: "40%", delay: 1 },
  { color: "#FFB6C1", type: "drip", size: "18px", left: "30%", top: "70%", delay: 2 },
];

interface IceCreamProps {
  color: string;
  size: string;
  secondColor?: string;
}

const IceCreamCone = memo(({ color, size, secondColor = color }: IceCreamProps) => {
  return (
    <div style={{ width: size, height: size }}>
      <motion.div
        style={{
          width: "100%",
          height: "65%",
          background: `linear-gradient(45deg, ${color} 0%, ${secondColor} 50%, ${color} 100%)`,
          borderRadius: "50% 50% 45% 45%",
          position: "relative",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
          transform: "translateY(2px)",
        }}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            width: "30%",
            height: "30%",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "50%",
            filter: "blur(2px)",
            top: "20%",
            left: "20%",
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <motion.div
        style={{
          width: "70%",
          height: "50%",
          background: "linear-gradient(45deg, #8B4513 0%, #A0522D 100%)",
          clipPath: "polygon(50% 100%, 0 0, 100% 0)",
          margin: "-10% auto 0",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: "80%",
            height: "20%",
            background: "rgba(255, 255, 255, 0.1)",
            clipPath: "polygon(50% 100%, 0 0, 100% 0)",
          }}
        />
      </motion.div>
    </div>
  );
});

interface SprinkleProps {
  color: string;
  size: string;
}

const Sprinkle = memo(({ color, size }: SprinkleProps) => (
  <motion.div
    style={{
      width: size,
      height: `calc(${size} / 3)`,
      background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`,
      borderRadius: size,
      transform: "rotate(45deg)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
    animate={{
      rotate: [45, 225, 45],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
));

const Drip = memo(({ color, size }: SprinkleProps) => (
  <motion.div
    style={{
      width: size,
      height: size,
      background: color,
      borderRadius: "40% 40% 50% 50%",
      filter: "blur(1px)",
    }}
    animate={{
      y: [0, 100],
      opacity: [1, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeIn",
    }}
  />
));

export const FloatingShapes = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute",
            shape.hideOnMobile && "hidden md:block"
          )}
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            delay: shape.delay || 0,
            duration: shape.type === "icecream" ? 4 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === "icecream" && (
            <IceCreamCone
              color={shape.color}
              secondColor={shape.secondColor}
              size={shape.size}
            />
          )}
          {shape.type === "sprinkle" && (
            <Sprinkle color={shape.color} size={shape.size} />
          )}
          {shape.type === "drip" && (
            <Drip color={shape.color} size={shape.size} />
          )}
        </motion.div>
      ))}
    </div>
  );
});
