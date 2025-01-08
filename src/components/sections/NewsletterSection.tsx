import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';

interface NewsletterFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export const NewsletterSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<NewsletterFormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your first name",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.lastName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your last name",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          to_email: "bostoncereal@gmail.com",
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          type: "newsletter_signup"
        }
      );

      if (result.status === 200) {
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter!",
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
      console.error("Newsletter signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100 opacity-50" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            KEEP IN TOUCH
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Sign up with your email address to receive news and updates on all things Sweet Bar!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="bg-white/80 border-primary/20 focus:border-primary"
              />
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="bg-white/80 border-primary/20 focus:border-primary"
              />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="bg-white/80 border-primary/20 focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "SIGN UP"}
            </Button>
          </form>

          <p className="text-sm text-foreground/60 mt-4">
            We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
