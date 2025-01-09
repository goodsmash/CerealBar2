"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full items-center justify-center bg-background text-foreground transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--primary-gradient:repeating-linear-gradient(100deg,var(--primary)_0%,var(--primary)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--primary)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--pink-500)_10%,var(--blue-300)_15%,var(--pink-300)_20%,var(--blue-200)_25%,var(--pink-400)_30%)]
            [background-image:var(--primary-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--primary-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:[background-position:50%_50%,50%_50%]
            after:animate-aurora
            after:opacity-70
            after:blur-[10px]
            absolute -inset-[10px]
            animate-aurora
            [--pink-300:theme(colors.primary.light)]
            [--pink-400:theme(colors.primary.DEFAULT)]
            [--pink-500:theme(colors.primary.dark)]
            [--blue-200:theme(colors.secondary.light)]
            [--blue-300:theme(colors.secondary.DEFAULT)]
            [--primary:theme(colors.primary.DEFAULT)]
            [--transparent:transparent]
            `,
            showRadialGradient &&
              "after:bg-gradient-to-r after:from-transparent after:via-primary/10 after:to-transparent"
          )}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
