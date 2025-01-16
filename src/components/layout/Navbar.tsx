import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { BrandGradientText } from "@/components/ui/brand-theme";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Menu" },
    { path: "/flavor-finder", label: "Flavor Finder" },
    { path: "/events", label: "Events & Catering" },
  ];

  return (
    <nav 
      className="fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-brand-pink/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-90 transition-opacity group"
              aria-label="Sweet & Comfy Boston - Home"
            >
              <div className="relative">
                <img 
                  src="./images/logo.svg" 
                  alt="Sweet & Comfy Boston Logo" 
                  className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
                  width={48}
                  height={48}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/20 to-brand-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <BrandGradientText className="text-xl font-bold">
                Sweet & Comfy Boston
              </BrandGradientText>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path}
                active={location.pathname === item.path}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="Open menu"
                  className="relative"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-primary/5 text-foreground"
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={location.pathname === item.path ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  active: boolean;
  className?: string;
  "aria-current"?: "page" | undefined;
}

const NavLink = ({ to, children, active, className, ...props }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`relative py-2 transition-colors hover:text-primary ${
        active ? "text-primary" : "text-foreground"
      } ${className || ""}`}
      {...props}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-gradient-to-r from-brand-pink to-brand-blue"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
};