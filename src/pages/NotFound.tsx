import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandGradientText } from "@/components/ui/brand-theme";

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <BrandGradientText className="text-6xl font-bold mb-4">404</BrandGradientText>
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-secondary-light mb-8 max-w-md">
          Looks like this page got lost in our cereal bowl! Let's get you back to the sweet stuff.
        </p>
        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" className="min-w-[200px]">
              Return Home
            </Button>
          </Link>
          <div className="flex justify-center gap-4">
            <Link to="/flavor-finder">
              <Button variant="outline" size="sm">
                Find Your Flavor
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="sm">
                Book an Event
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
