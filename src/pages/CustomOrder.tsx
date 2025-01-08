import { CerealBuilder } from "@/components/cereal/CerealBuilder";
import { CerealItem } from "@/types/menu";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const CustomOrder = () => {
  const { toast } = useToast();

  const handleAddToCart = (item: CerealItem) => {
    toast({
      title: "Added to Cart!",
      description: "Your custom creation has been added to your cart.",
    });
    console.log("Added to cart:", item);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          Create Your Perfect Treat
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Tell us what you like, and we'll recommend the perfect ice cream creation for you.
          Then customize it to make it uniquely yours!
        </p>
      </motion.div>

      <CerealBuilder onAddToCart={handleAddToCart} />
    </div>
  );
};

export default CustomOrder;