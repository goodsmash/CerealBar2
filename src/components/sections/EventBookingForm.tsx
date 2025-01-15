import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEventBookingEmail } from "@/lib/email-service";

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
];

const bookingSchema = z.object({
  contact: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone must be in format (123) 456-7890'),
    companyName: z.string().optional(),
  }),
  event: z.object({
    date: z.date(),
    startTime: z.string(),
    endTime: z.string(),
  }),
  venue: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
  eventType: z.string(),
  guestCount: z.number().min(1, 'Must have at least 1 guest'),
  theme: z.string(),
  additionalServices: z.array(z.string()),
  budget: z.number().min(0, 'Budget must be a positive number'),
  notes: z.string(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface EventBookingFormProps {
  selectedDate?: Date;
  onClose?: () => void;
}

export const EventBookingForm = ({ selectedDate, onClose }: EventBookingFormProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      contact: {
        name: "",
        email: "",
        phone: "",
        companyName: "",
      },
      event: {
        date: selectedDate || new Date(),
        startTime: "",
        endTime: "",
      },
      venue: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
      eventType: "",
      guestCount: 10,
      theme: "",
      additionalServices: [],
      budget: 0,
      notes: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting event booking:', data);
      
      const result = await sendEventBookingEmail({
        contact: {
          name: data.contact.name,
          email: data.contact.email,
          phone: data.contact.phone,
          companyName: data.contact.companyName
        },
        event: {
          date: format(data.event.date, 'yyyy-MM-dd'),
          startTime: data.event.startTime,
          endTime: data.event.endTime
        },
        venue: data.venue,
        eventType: data.eventType,
        guestCount: data.guestCount,
        theme: data.theme,
        budget: data.budget,
        notes: data.notes
      });

      console.log('Event booking email result:', result);

      if (!result.success) {
        throw new Error(result.error || 'Failed to send event booking');
      }

      toast({
        title: "Event Booking Submitted!",
        description: "Thank you for your interest. We'll contact you soon to discuss your event!",
      });

      if (onClose) {
        onClose();
      }

      // Reset form
      form.reset({
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
        eventType: "",
        guestCount: 10,
        theme: "",
        additionalServices: [],
        budget: 0,
        notes: "",
      });

      setActiveTab("contact");
    } catch (error) {
      console.error('Event booking error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit event booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTab = () => {
    if (activeTab === "details") {
      form.handleSubmit(onSubmit)();
    } else {
      switch (activeTab) {
        case "contact":
          setActiveTab("event");
          break;
        case "event":
          setActiveTab("details");
          break;
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="event">Event Details</TabsTrigger>
          <TabsTrigger value="details">Additional Details</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...form.register("contact.name")}
                placeholder="Your full name"
                className={form.formState.errors.contact?.name ? "border-red-500" : ""}
              />
              {form.formState.errors.contact?.name && (
                <p className="text-sm text-red-500">{form.formState.errors.contact.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("contact.email")}
                placeholder="your@email.com"
                className={form.formState.errors.contact?.email ? "border-red-500" : ""}
              />
              {form.formState.errors.contact?.email && (
                <p className="text-sm text-red-500">{form.formState.errors.contact.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...form.register("contact.phone")}
                placeholder="(123) 456-7890"
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  form.setValue("contact.phone", formatted);
                }}
                className={form.formState.errors.contact?.phone ? "border-red-500" : ""}
              />
              {form.formState.errors.contact?.phone && (
                <p className="text-sm text-red-500">{form.formState.errors.contact.phone.message}</p>
              )}
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

          <div className="flex justify-end">
            <Button type="button" onClick={nextTab}>
              Next: Event Details
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="event" className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Event Type</Label>
              <RadioGroup
                value={form.watch("eventType")}
                onValueChange={(value) => form.setValue("eventType", value)}
                className="grid grid-cols-2 gap-4"
              >
                {eventTypes.map(({ id, label, description }) => (
                  <div key={id} className="flex flex-col space-y-1 bg-background/50 p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={id} id={id} className="text-primary" />
                      <Label htmlFor={id} className="font-medium cursor-pointer">{label}</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">{description}</p>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  {...form.register("event.date")}
                  defaultValue={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestCount">Number of Guests</Label>
                <Input
                  id="guestCount"
                  type="number"
                  {...form.register("guestCount", { valueAsNumber: true })}
                  min={1}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Select
                  value={form.watch("event.startTime")}
                  onValueChange={(value) => form.setValue("event.startTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Select
                  value={form.watch("event.endTime")}
                  onValueChange={(value) => form.setValue("event.endTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("contact")}
            >
              Back
            </Button>
            <Button type="button" onClick={nextTab}>
              Next: Additional Details
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Event Theme/Colors</Label>
              <Input
                id="theme"
                {...form.register("theme")}
                placeholder="Describe your desired theme or color scheme"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Input
                id="budget"
                type="number"
                {...form.register("budget", { valueAsNumber: true })}
                min={0}
                step={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                {...form.register("notes")}
                placeholder="Any special requests or additional information"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="venue.address">Venue Address</Label>
                <Input
                  id="venue.address"
                  {...form.register("venue.address")}
                  placeholder="Street address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue.city">City</Label>
                <Input
                  id="venue.city"
                  {...form.register("venue.city")}
                  placeholder="City"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue.state">State</Label>
                <Input
                  id="venue.state"
                  {...form.register("venue.state")}
                  placeholder="State"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue.zipCode">ZIP Code</Label>
                <Input
                  id="venue.zipCode"
                  {...form.register("venue.zipCode")}
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("event")}
            >
              Back
            </Button>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
              Submit Inquiry
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
