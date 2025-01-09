import { motion } from "framer-motion";

const shapes = [
  // Ice cream cones with adjusted positioning to avoid overlap
  { color: "#4ADE80", type: "icecream", size: "80px", left: "5%", top: "10%", rotate: true },
  { color: "#FF1493", type: "icecream", size: "70px", left: "85%", top: "15%", rotate: true },
  { color: "#4ADE80", type: "icecream", size: "90px", left: "15%", top: "85%", rotate: true },
  { color: "#FF1493", type: "icecream", size: "75px", left: "90%", top: "90%", rotate: true },
  
  // Decorative shapes with adjusted positioning
  { color: "#FF4D4D", type: "circle", size: "12px", left: "25%", top: "30%", rotate: false },
  { color: "#FF8B3D", type: "circle", size: "16px", left: "75%", top: "50%", rotate: false },
  { color: "#FF1493", type: "circle", size: "14px", left: "45%", top: "70%", rotate: false },
  { color: "#4ADE80", type: "circle", size: "18px", left: "35%", top: "95%", rotate: false },
];

const IceCreamCone = ({ color, size }: { color: string; size: string }) => (
  <div style={{ width: size, height: size }}>
    <div
      style={{
        width: "100%",
        height: "65%",
        background: `linear-gradient(45deg, ${color} 0%, ${color}dd 100%)`,
        borderRadius: "50% 50% 45% 45%",
        position: "relative",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transform: "translateY(2px)",
      }}
    >
      {/* Ice cream highlights */}
      <div
        style={{
          position: "absolute",
          width: "30%",
          height: "30%",
          background: "rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          top: "20%",
          left: "20%",
        }}
      />
    </div>
    <div
      style={{
        width: "70%",
        height: "50%",
        background: "linear-gradient(45deg, #8B4513 0%, #A0522D 100%)",
        clipPath: "polygon(50% 100%, 0 0, 100% 0)",
        margin: "-10% auto 0",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    />
  </div>
);

export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ 
            x: shape.left, 
            y: shape.top,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{ 
            x: [shape.left, `calc(${shape.left} + 30px)`, shape.left],
            y: [shape.top, `calc(${shape.top} + 30px)`, shape.top],
            opacity: [0.6, 0.8, 0.6],
            scale: [0.8, 1, 0.8],
            rotate: shape.rotate ? [0, 10, 0, -10, 0] : [0, 360],
          }}
          transition={{
            duration: Math.random() * 4 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          style={{
            left: shape.left,
            top: shape.top,
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
          }}
        >
          {shape.type === "circle" && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                background: `radial-gradient(circle at 30% 30%, ${shape.color}dd, ${shape.color})`,
                borderRadius: "50%",
                opacity: 0.4,
              }}
            />
          )}
          {shape.type === "icecream" && (
            <IceCreamCone color={shape.color} size={shape.size} />
          )}
        </motion.div>
      ))}
    </div>
  );
};
