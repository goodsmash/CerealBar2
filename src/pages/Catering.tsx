import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cateringPackages } from "@/data/catering";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CheckIcon } from "lucide-react";

const Catering = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleInquiry = (packageId: string) => {
    toast({
      title: "Inquiry Sent!",
      description: "We'll contact you within 24 hours to discuss your catering needs.",
    });
    setSelectedPackage(null);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">Sweet & Comfy Catering</h1>
        <p className="text-xl text-foreground/90 max-w-2xl mx-auto">
          Make your event unforgettable with our premium catering services.
          From corporate meetings to weddings, we'll make it sweet and comfy!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {cateringPackages.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors"
          >
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold text-primary">{pkg.name}</h3>
                  <p className="text-foreground/90 mt-2">
                    {pkg.description}
                  </p>
                </div>
                {pkg.popular && (
                  <Badge className="bg-primary text-white">Popular</Badge>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-primary">${pkg.basePrice.toFixed(2)}</span>
                <span className="text-sm text-foreground/70">per person</span>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground/90">Package Includes:</p>
                <ul className="space-y-2">
                  {pkg.includes.map((item, index) => (
                    <li key={index} className="text-sm flex items-start text-foreground/90">
                      <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground/90">Additional Information:</p>
                <ul className="text-sm space-y-1 text-foreground/90">
                  <li>Minimum Order: {pkg.minimumOrder} people</li>
                  <li>Time: {pkg.timeOfDay}</li>
                  <li>Notice Required: {pkg.notice}</li>
                </ul>
              </div>

              {pkg.addOns && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/90">Available Add-ons:</p>
                  <ul className="text-sm space-y-1 text-foreground/90">
                    {pkg.addOns.map((addon, index) => (
                      <li key={index}>
                        {addon.name} - ${addon.price.toFixed(2)} {addon.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                className="w-full bg-primary/20 hover:bg-primary/30 text-primary"
                onClick={() => handleInquiry(pkg.id)}
              >
                Request Quote
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mt-16"
      >
        <h2 className="text-2xl font-bold text-primary mb-4">Custom Catering</h2>
        <p className="text-foreground/90 mb-6">
          Don't see exactly what you're looking for? We'd love to create a custom package
          tailored to your specific event needs.
        </p>
        <Button
          className="bg-primary/20 hover:bg-primary/30 text-primary"
          onClick={() => handleInquiry('custom')}
        >
          Contact for Custom Package
        </Button>
      </motion.div>
    </div>
  );
};

export default Catering;