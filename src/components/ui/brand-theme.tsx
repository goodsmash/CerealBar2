import { cn } from "@/lib/utils";

interface BrandGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const BrandGradientText = ({
  children,
  className,
}: BrandGradientTextProps) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-brand-pink to-brand-blue bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
};

interface BrandContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const BrandContainer = ({
  children,
  className,
}: BrandContainerProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-brand-pink/10 bg-background/95 p-6 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      {children}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-pink/0 via-brand-pink/50 to-brand-pink/0" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-brand-blue/0 via-brand-blue/50 to-brand-blue/0" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-brand-pink/0 via-brand-pink/50 to-brand-blue/50" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-brand-pink/0 via-brand-pink/50 to-brand-blue/50" />
      </div>
    </div>
  );
};

interface BrandButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export const BrandButton = ({
  children,
  className,
  variant = "default",
}: BrandButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-gradient-to-r from-brand-pink to-brand-blue text-white hover:from-brand-pink/90 hover:to-brand-blue/90 shadow-lg",
    outline: "border border-brand-pink/50 hover:border-brand-pink bg-background hover:bg-accent/10",
    ghost: "hover:bg-accent/10 hover:text-accent-foreground",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

interface BrandCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const BrandCard = ({
  children,
  className,
  hoverable = false,
}: BrandCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-brand-pink/10 bg-card p-6",
        hoverable && "transition-all duration-200 hover:shadow-lg hover:border-brand-pink/30 hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BrandHeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const BrandHeading = ({
  children,
  className,
  level = 2,
}: BrandHeadingProps) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseStyles = "font-bold bg-gradient-to-r from-brand-pink to-brand-blue bg-clip-text text-transparent";
  const sizeStyles = {
    1: "text-4xl md:text-5xl lg:text-6xl",
    2: "text-3xl md:text-4xl lg:text-5xl",
    3: "text-2xl md:text-3xl lg:text-4xl",
    4: "text-xl md:text-2xl lg:text-3xl",
    5: "text-lg md:text-xl lg:text-2xl",
    6: "text-base md:text-lg lg:text-xl",
  };

  return (
    <Component
      className={cn(
        baseStyles,
        sizeStyles[level],
        className
      )}
    >
      {children}
    </Component>
  );
};
