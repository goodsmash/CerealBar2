import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cateringPackages } from "@/data/catering";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CheckIcon, X, Clock, Users, DollarSign, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CateringFormData, cateringSchema } from "@/lib/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { sendEventBookingEmail } from "@/lib/email-service";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Catering = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CateringFormData>({
    resolver: zodResolver(cateringSchema),
    defaultValues: {
      contact: {
        name: "",
        email: "",
        phone: "",
        companyName: "",
      },
      event: {
        date: new Date(),
        startTime: "",
        endTime: "",
      },
      venue: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
      packageId: "",
      guestCount: 10,
      dietaryRestrictions: "",
      specialRequests: "",
      setupNeeded: false,
      servingStyle: "buffet",
    },
  });

  const handleInquiry = (packageId: string) => {
    setSelectedPackage(packageId);
    form.setValue("packageId", packageId);
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CateringFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await sendEventBookingEmail({
        contact: data.contact,
        event: {
          date: format(data.event.date, 'yyyy-MM-dd'),
          startTime: data.event.startTime,
          endTime: data.event.endTime,
          type: 'Catering',
          guestCount: data.guestCount,
          theme: data.dietaryRestrictions,
          notes: `
Package: ${data.packageId}
Special Requests: ${data.specialRequests}
Setup Needed: ${data.setupNeeded ? 'Yes' : 'No'}
Serving Style: ${data.servingStyle}
          `.trim(),
        },
        venue: data.venue,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to send catering inquiry');
      }
      
      toast({
        title: "Inquiry Sent!",
        description: "We'll contact you within 24 hours to discuss your catering needs.",
      });
      
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error('Catering inquiry error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackageData = selectedPackage ? cateringPackages.find(pkg => pkg.id === selectedPackage) : null;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Catering Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From corporate events to weddings, we offer delightful catering packages that will make your event unforgettable.
        </p>
      </motion.div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {cateringPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="relative bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={{ delay: index * 0.1 }}
          >
            {pkg.popular && (
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                Popular
              </Badge>
            )}
            
            <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
            <p className="text-muted-foreground mb-4">{pkg.description}</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>${pkg.basePrice.toFixed(2)} {pkg.servingSize}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Minimum {pkg.minimumOrder} people</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{pkg.timeOfDay}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {pkg.includes.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full hover-lift"
              onClick={() => handleInquiry(pkg.id)}
            >
              Inquire Now
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Inquiry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Catering Inquiry</DialogTitle>
            <DialogDescription>
              {selectedPackageData && (
                <div className="text-muted-foreground">
                  Package: {selectedPackageData.name}
                  <br />
                  {selectedPackageData.notice}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="event">Event Details</TabsTrigger>
                <TabsTrigger value="venue">Venue</TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      {...form.register("contact.name")}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("contact.email")}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      {...form.register("contact.phone")}
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (Optional)</Label>
                    <Input
                      id="companyName"
                      {...form.register("contact.companyName")}
                      placeholder="Your company name"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="event" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        {...form.register("event.date")}
                        min={format(new Date(), 'yyyy-MM-dd')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guestCount">Number of Guests *</Label>
                      <Input
                        id="guestCount"
                        type="number"
                        {...form.register("guestCount", { valueAsNumber: true })}
                        min={selectedPackageData?.minimumOrder || 10}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Select
                        value={form.watch("event.startTime")}
                        onValueChange={(value) => form.setValue("event.startTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, '0');
                            return (
                              <SelectItem key={hour} value={`${hour}:00`}>
                                {format(new Date().setHours(i), 'h:mm a')}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Select
                        value={form.watch("event.endTime")}
                        onValueChange={(value) => form.setValue("event.endTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, '0');
                            return (
                              <SelectItem key={hour} value={`${hour}:00`}>
                                {format(new Date().setHours(i), 'h:mm a')}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servingStyle">Serving Style *</Label>
                    <Select
                      value={form.watch("servingStyle")}
                      onValueChange={(value) => form.setValue("servingStyle", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select serving style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buffet">Buffet Style</SelectItem>
                        <SelectItem value="plated">Plated Service</SelectItem>
                        <SelectItem value="family">Family Style</SelectItem>
                        <SelectItem value="stations">Food Stations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="setupNeeded">Setup Service Needed</Label>
                      <Switch
                        id="setupNeeded"
                        checked={form.watch("setupNeeded")}
                        onCheckedChange={(checked) => form.setValue("setupNeeded", checked)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Includes setup, service staff, and cleanup
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="venue" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Venue Address *</Label>
                    <Input
                      id="address"
                      {...form.register("venue.address")}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        {...form.register("venue.city")}
                        placeholder="City"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        {...form.register("venue.state")}
                        placeholder="MA"
                        maxLength={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        {...form.register("venue.zipCode")}
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                    <Textarea
                      id="dietaryRestrictions"
                      {...form.register("dietaryRestrictions")}
                      placeholder="List any allergies or dietary restrictions"
                      className="h-20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      {...form.register("specialRequests")}
                      placeholder="Any special requests or additional information"
                      className="h-20"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Inquiry'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Catering;