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
    { path: "/custom-order", label: "Custom Order" },
    { path: "/catering", label: "Catering" },
    { path: "/events", label: "Events" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-brand-pink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-90 transition-opacity group"
            >
              <div className="relative">
                <img 
                  src="./images/logo.svg" 
                  alt="Sweet & Comfy Boston" 
                  className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
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
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="hover:bg-brand-pink/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`text-lg font-medium transition-colors hover:text-brand-pink ${
                        location.pathname === item.path ? "text-brand-pink" : "text-secondary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ 
  to, 
  children, 
  active 
}: { 
  to: string; 
  children: React.ReactNode;
  active: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`relative font-medium transition-colors hover:text-brand-pink ${
        active ? "text-brand-pink" : "text-secondary"
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute -bottom-[1.5px] left-0 right-0 h-[2px] bg-gradient-to-r from-brand-pink to-brand-blue"
          layoutId="navbar-indicator"
          transition={{ type: "spring", bounce: 0.25 }}
        />
      )}
    </Link>
  );
};