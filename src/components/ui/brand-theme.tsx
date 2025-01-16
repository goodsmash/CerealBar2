import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BrandContainerProps {
  children: ReactNode;
  className?: string;
}

interface BrandHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

interface BrandButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface BrandCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const BrandContainer = ({ children, className }: BrandContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

export const BrandHeading = ({ 
  level = 2, 
  children, 
  className,
  gradient = true 
}: BrandHeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag 
      className={cn(
        "font-bold",
        {
          "text-6xl md:text-7xl": level === 1,
          "text-5xl md:text-6xl": level === 2,
          "text-4xl md:text-5xl": level === 3,
          "text-3xl md:text-4xl": level === 4,
          "text-2xl md:text-3xl": level === 5,
          "text-xl md:text-2xl": level === 6,
        },
        gradient && "bg-clip-text text-transparent bg-gradient-to-r from-brand-pink-light via-white to-brand-blue-light",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export const BrandButton = ({ 
  variant = "primary", 
  size = "md", 
  children, 
  className,
  onClick 
}: BrandButtonProps) => {
  const baseStyles = "rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl";
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const variantStyles = {
    primary: "bg-brand-pink hover:bg-brand-pink-dark text-white",
    secondary: "bg-brand-blue hover:bg-brand-blue-dark text-white",
    outline: "border-2 border-white/20 hover:border-brand-pink-light/50 text-white hover:bg-white/10 backdrop-blur-sm",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export const BrandCard = ({ 
  children, 
  className,
  hover = true,
  gradient = true
}: BrandCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : undefined}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        className
      )}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-lighter/20 to-brand-blue-lighter/20 blur-xl transition-all duration-300 group-hover:scale-105" />
      )}
      <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-brand-pink-light/50">
        {children}
      </div>
    </motion.div>
  );
};

export const BrandGradientText = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <span className={cn(
      "bg-clip-text text-transparent bg-gradient-to-r from-brand-pink-light via-white to-brand-blue-light",
      className
    )}>
      {children}
    </span>
  );
};
