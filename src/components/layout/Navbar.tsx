import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
    <nav className="fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <img 
                src="./images/logo.svg" 
                alt="Sweet & Comfy Boston" 
                className="h-12 w-12"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Sweet & Comfy Boston
              </span>
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
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-primary/20 text-primary hover:bg-primary/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background/95 backdrop-blur-lg">
                <div className="flex flex-col space-y-6 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        location.pathname === item.path
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                      onClick={() => setIsOpen(false)}
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
      className={`relative font-medium transition-colors hover:text-primary ${
        active ? "text-primary" : "text-secondary"
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute -bottom-[1.5px] left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
          layoutId="navbar-indicator"
          transition={{ type: "spring", bounce: 0.25 }}
        />
      )}
    </Link>
  );
};