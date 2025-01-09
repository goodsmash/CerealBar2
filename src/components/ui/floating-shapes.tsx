import { memo } from "react";
import { motion } from "framer-motion";

interface Shape {
  color: string;
  secondColor?: string;
  type: "icecream" | "sprinkle";
  size: string;
  left: string;
  top: string;
  rotate: boolean;
  variant?: "swirl" | "scoop" | "double";
}

const shapes: Shape[] = [
  // Ice cream cones with brand colors
  { color: "#FF69B4", secondColor: "#FFB6C1", type: "icecream", size: "80px", left: "5%", top: "10%", rotate: true, variant: "swirl" },
  { color: "#4B9CD3", secondColor: "#87CEEB", type: "icecream", size: "70px", left: "85%", top: "15%", rotate: true, variant: "scoop" },
  { color: "#FF69B4", secondColor: "#FF1493", type: "icecream", size: "90px", left: "15%", top: "85%", rotate: true, variant: "double" },
  { color: "#4B9CD3", secondColor: "#4169E1", type: "icecream", size: "75px", left: "90%", top: "90%", rotate: true, variant: "swirl" },
  { color: "#FF69B4", secondColor: "#FFB6C1", type: "icecream", size: "65px", left: "25%", top: "40%", rotate: true, variant: "scoop" },
  { color: "#4B9CD3", secondColor: "#87CEEB", type: "icecream", size: "85px", left: "55%", top: "30%", rotate: true, variant: "double" },
  
  // Sprinkles with brand colors
  { color: "#FF69B4", type: "sprinkle", size: "12px", left: "30%", top: "25%", rotate: true },
  { color: "#4B9CD3", type: "sprinkle", size: "14px", left: "70%", top: "45%", rotate: true },
  { color: "#F5F5DC", type: "sprinkle", size: "10px", left: "20%", top: "70%", rotate: true },
  { color: "#FF69B4", type: "sprinkle", size: "16px", left: "60%", top: "85%", rotate: true },
  { color: "#4B9CD3", type: "sprinkle", size: "12px", left: "40%", top: "55%", rotate: true },
  { color: "#FF1493", type: "sprinkle", size: "10px", left: "15%", top: "35%", rotate: true },
  { color: "#87CEEB", type: "sprinkle", size: "8px", left: "85%", top: "65%", rotate: true },
  { color: "#4169E1", type: "sprinkle", size: "14px", left: "50%", top: "40%", rotate: true },
  { color: "#FF69B4", type: "sprinkle", size: "11px", left: "25%", top: "60%", rotate: true },
  { color: "#4B9CD3", type: "sprinkle", size: "13px", left: "75%", top: "25%", rotate: true },
  // Additional sprinkles
  { color: "#FFB6C1", type: "sprinkle", size: "9px", left: "45%", top: "75%", rotate: true },
  { color: "#87CEEB", type: "sprinkle", size: "11px", left: "35%", top: "15%", rotate: true },
  { color: "#F5F5DC", type: "sprinkle", size: "13px", left: "65%", top: "50%", rotate: true },
  { color: "#FF69B4", type: "sprinkle", size: "10px", left: "80%", top: "80%", rotate: true },
  { color: "#4B9CD3", type: "sprinkle", size: "12px", left: "10%", top: "45%", rotate: true },
  { color: "#FF1493", type: "sprinkle", size: "15px", left: "95%", top: "35%", rotate: true },
  { color: "#87CEEB", type: "sprinkle", size: "11px", left: "55%", top: "65%", rotate: true },
  { color: "#4169E1", type: "sprinkle", size: "9px", left: "40%", top: "95%", rotate: true },
  { color: "#FF69B4", type: "sprinkle", size: "14px", left: "75%", top: "5%", rotate: true },
  { color: "#4B9CD3", type: "sprinkle", size: "12px", left: "20%", top: "20%", rotate: true }
];

interface IceCreamProps {
  color: string;
  size: string;
  variant?: "swirl" | "scoop" | "double";
  secondColor?: string;
}

const IceCreamCone = memo(({ color, size, variant = "scoop", secondColor = color }: IceCreamProps) => {
  const scoopContent = () => {
    switch (variant) {
      case "swirl":
        return (
          <motion.div
            style={{
              width: "100%",
              height: "65%",
              background: `conic-gradient(from 0deg, ${color} 0%, ${secondColor} 50%, ${color} 100%)`,
              borderRadius: "50% 50% 45% 45%",
              position: "relative",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transform: "translateY(2px)",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
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
                top: "20%",
                left: "20%",
              }}
              animate={{
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      case "double":
        return (
          <>
            <motion.div
              style={{
                width: "90%",
                height: "45%",
                background: `linear-gradient(45deg, ${color} 0%, ${color}dd 100%)`,
                borderRadius: "50% 50% 45% 45%",
                position: "relative",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 2,
              }}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              style={{
                width: "80%",
                height: "45%",
                background: `linear-gradient(45deg, ${secondColor} 0%, ${secondColor}dd 100%)`,
                borderRadius: "50% 50% 45% 45%",
                position: "absolute",
                top: "25%",
                left: "10%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 1,
              }}
              animate={{
                y: [0, -1, 0],
              }}
              transition={{
                duration: 3,
                delay: 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );
      default: // "scoop"
        return (
          <motion.div
            style={{
              width: "100%",
              height: "65%",
              background: `linear-gradient(45deg, ${color} 0%, ${secondColor} 50%, ${color} 100%)`,
              borderRadius: "50% 50% 45% 45%",
              position: "relative",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transform: "translateY(2px)",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
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
                top: "20%",
                left: "20%",
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
    }
  };

  return (
    <div style={{ width: size, height: size }}>
      {scoopContent()}
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
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
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

export const FloatingShapes = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {shapes.map((shape, index) => {
        const key = `shape-${index}-${shape.type}-${shape.color}`;
        const Component = shape.type === "icecream" ? IceCreamCone : Sprinkle;
        
        return (
          <motion.div
            key={key}
            style={{
              position: "absolute",
              left: shape.left,
              top: shape.top,
            }}
            animate={{
              y: ["0%", "5%", "0%"],
              rotate: shape.rotate ? [0, 360] : 0,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              rotate: {
                duration: Math.random() * 20 + 10,
              },
            }}
          >
            <Component {...shape} />
          </motion.div>
        );
      })}
    </div>
  );
});
