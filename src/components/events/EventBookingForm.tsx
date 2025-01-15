import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { sendEventBookingEmail, eventBookingSchema, type EventBookingData } from "@/lib/email-service";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

type EventType = typeof eventTypes[number]['id'];

const eventTypes = [
  { id: 'birthday', label: 'Birthday Party 🎂', description: 'Perfect for celebrating birthdays of all ages' },
  { id: 'wedding', label: 'Wedding Reception 👰', description: 'Make your special day even sweeter' },
  { id: 'corporate', label: 'Corporate Event 💼', description: 'Team building & client appreciation events' },
  { id: 'graduation', label: 'Graduation 🎓', description: 'Celebrate academic achievements' },
  { id: 'holiday', label: 'Holiday Party 🎄', description: 'Seasonal celebrations & festivities' },
  { id: 'fundraiser', label: 'Fundraiser 🤝', description: 'Support your cause with sweet treats' },
  { id: 'private', label: 'Private Event ⭐', description: 'Custom events for any occasion' },
  { id: 'festival', label: 'Festival/Fair 🎪', description: 'Large-scale outdoor events' },
] as const;

const timeSlots = [
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' }
] as const;

type TimeSlot = typeof timeSlots[number]['value'];

interface EventBookingFormProps {
  initialDate?: Date;
  onClose?: () => void;
}

type TabId = 'contact' | 'event' | 'venue';

const tabConfig: Record<TabId, { title: string; description: string }> = {
  contact: {
    title: "Contact Information",
    description: "Tell us how to reach you",
  },
  event: {
    title: "Event Details",
    description: "Plan your perfect event",
  },
  venue: {
    title: "Venue Information",
    description: "Where should we set up?",
  },
};

const fadeAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const EventBookingForm = ({ initialDate, onClose }: EventBookingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('contact');
  const [formData, setFormData] = useState<EventBookingData>({
    contact: {
      name: '',
      email: '',
      phone: '',
      companyName: '',
    },
    event: {
      date: initialDate ? format(initialDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      type: '',
      guestCount: 10,
      theme: '',
      budget: 0,
      notes: '',
    },
    venue: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const handleChange = useCallback(<T extends keyof EventBookingData>(
    section: T,
    field: keyof EventBookingData[T],
    value: EventBookingData[T][keyof EventBookingData[T]]
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }, []);

  const formatPhoneNumber = useCallback((value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 10);
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }, []);

  const validateTab = useCallback((tab: TabId): boolean => {
    try {
      const sectionData = formData[tab];
      const sectionSchema = eventBookingSchema.shape[tab];
      sectionSchema.parse(sectionData);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Please check the following:",
          description: (
            <ul className="list-disc pl-4 space-y-1">
              {error.errors?.map((err, i) => (
                <li key={i} className="text-sm">{err.message}</li>
              ))}
            </ul>
          ),
          variant: "destructive",
        });
      }
      return false;
    }
  }, [formData, toast]);

  const handleTabChange = useCallback((newTab: TabId) => {
    if (activeTab === newTab) return;
    if (validateTab(activeTab)) {
      setActiveTab(newTab);
    }
  }, [activeTab, validateTab]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateTab(activeTab)) return;
    
    setIsSubmitting(true);

    try {
      const validationResult = eventBookingSchema.safeParse(formData);
      
      if (!validationResult.success) {
        toast({
          title: "Please check your information",
          description: (
            <ul className="list-disc pl-4 space-y-1">
              {validationResult.error.errors.map((err, i) => (
                <li key={i} className="text-sm">{err.message}</li>
              ))}
            </ul>
          ),
          variant: "destructive",
        });
        return;
      }

      const response = await sendEventBookingEmail(validationResult.data, '127.0.0.1');
      
      if (!response.success) {
        toast({
          title: "Failed to send booking request",
          description: response.error || "Please try again later",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Booking request sent!",
        description: "We'll get back to you shortly to confirm your event details.",
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Event booking error:', error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {Object.entries(tabConfig).map(([id, { title }]) => (
            <TabsTrigger 
              key={id} 
              value={id}
              disabled={isSubmitting}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {title}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="overflow-y-auto max-h-[70vh] pr-4 -mr-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeAnimation}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="contact" className="space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.contact.name}
                      onChange={(e) => handleChange('contact', 'name', e.target.value)}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleChange('contact', 'email', e.target.value)}
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.contact.phone}
                      onChange={(e) => handleChange('contact', 'phone', formatPhoneNumber(e.target.value))}
                      placeholder="(123) 456-7890"
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (Optional)</Label>
                    <Input
                      id="companyName"
                      value={formData.contact.companyName}
                      onChange={(e) => handleChange('contact', 'companyName', e.target.value)}
                      placeholder="Your company name"
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="event" className="space-y-6">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.event.date}
                        onChange={(e) => handleChange('event', 'date', e.target.value)}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guestCount">Number of Guests *</Label>
                      <Input
                        id="guestCount"
                        type="number"
                        value={formData.event.guestCount}
                        onChange={(e) => handleChange('event', 'guestCount', parseInt(e.target.value, 10))}
                        min={10}
                        max={500}
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Select
                        value={formData.event.startTime}
                        onValueChange={(value) => handleChange('event', 'startTime', value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Select
                        value={formData.event.endTime}
                        onValueChange={(value) => handleChange('event', 'endTime', value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots
                            .filter(({ value }) => value > (formData.event.startTime || '00:00'))
                            .map(({ value, label }) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Event Type *</Label>
                    <RadioGroup
                      value={formData.event.type}
                      onValueChange={(value) => handleChange('event', 'type', value)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      disabled={isSubmitting}
                    >
                      {eventTypes.map(({ id, label, description }) => (
                        <Label
                          key={id}
                          htmlFor={id}
                          className={`
                            flex items-start p-4 gap-4 rounded-lg border cursor-pointer
                            transition-colors duration-200
                            ${formData.event.type === id
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                            }
                          `}
                        >
                          <RadioGroupItem value={id} id={id} className="mt-1" />
                          <div className="space-y-1">
                            <span className="block font-medium">{label}</span>
                            <span className="block text-sm text-muted-foreground">
                              {description}
                            </span>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Event Theme/Colors</Label>
                    <Input
                      id="theme"
                      value={formData.event.theme}
                      onChange={(e) => handleChange('event', 'theme', e.target.value)}
                      placeholder="e.g., Winter Wonderland, Tropical Paradise"
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">
                      Budget Range (USD)
                      <span className="text-sm text-muted-foreground ml-2">Optional</span>
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.event.budget}
                      onChange={(e) => handleChange('event', 'budget', parseInt(e.target.value, 10))}
                      placeholder="Your estimated budget"
                      min={0}
                      step={100}
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.event.notes}
                      onChange={(e) => handleChange('event', 'notes', e.target.value)}
                      placeholder="Any special requests or additional information"
                      className="h-24 bg-background/50"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="venue" className="space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.venue.address}
                      onChange={(e) => handleChange('venue', 'address', e.target.value)}
                      placeholder="Street address"
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.venue.city}
                        onChange={(e) => handleChange('venue', 'city', e.target.value)}
                        placeholder="City"
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.venue.state}
                        onChange={(e) => handleChange('venue', 'state', e.target.value.toUpperCase())}
                        placeholder="MA"
                        maxLength={2}
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.venue.zipCode}
                        onChange={(e) => handleChange('venue', 'zipCode', e.target.value)}
                        placeholder="12345"
                        maxLength={5}
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
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
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </div>
          ) : (
            'Book Event'
          )}
        </Button>
      </div>
    </form>
  );
};
