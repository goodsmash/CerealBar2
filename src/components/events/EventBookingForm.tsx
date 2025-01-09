import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';

const eventTypes = [
  { value: 'birthday', label: 'Birthday Party 🎂', description: 'Perfect for celebrating birthdays of all ages' },
  { value: 'wedding', label: 'Wedding Reception 💍', description: 'Make your special day even sweeter' },
  { value: 'corporate', label: 'Corporate Event 💼', description: 'Team building & client appreciation events' },
  { value: 'graduation', label: 'Graduation 🎓', description: 'Celebrate academic achievements' },
  { value: 'holiday', label: 'Holiday Party 🎄', description: 'Seasonal celebrations & festivities' },
  { value: 'fundraiser', label: 'Fundraiser 🤝', description: 'Support your cause with sweet treats' },
  { value: 'private', label: 'Private Event 🌟', description: 'Custom events for any occasion' },
  { value: 'festival', label: 'Festival/Fair 🎪', description: 'Large-scale outdoor events' }
];

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
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone must be in format (123) 456-7890'),
  eventType: z.string(),
  location: z.string(),
  guestCount: z.string(),
  specialRequests: z.string(),
  preferredTime: z.string(),
  date: z.date(),
  budget: z.string().optional(),
  duration: z.string(),
  dietaryRestrictions: z.array(z.string()).optional(),
  setupNeeded: z.boolean(),
  hearAboutUs: z.string()
});

interface EventBookingFormProps {
  selectedDate: Date | null;
  onSubmit: (formData: any) => void;
}

export const EventBookingForm = ({ selectedDate, onSubmit }: EventBookingFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    location: 'onsite',
    guestCount: '',
    specialRequests: '',
    preferredTime: '',
    budget: '',
    duration: '2',
    dietaryRestrictions: [] as string[],
    setupNeeded: false,
    hearAboutUs: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleChange('phone', formatted);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is modified
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    try {
      bookingSchema.parse({
        ...formData,
        date: selectedDate
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        date: selectedDate,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your full name"
                className="bg-background border-primary/20 focus:border-primary"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className="bg-background border-primary/20 focus:border-primary"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="(123) 456-7890"
                className="bg-background border-primary/20 focus:border-primary"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Event Details</h3>
          
          <div className="space-y-2">
            <Label className="text-foreground">Event Type</Label>
            <RadioGroup
              value={formData.eventType}
              onValueChange={(value) => handleChange('eventType', value)}
              className="grid grid-cols-2 gap-4"
            >
              {eventTypes.map(({ value, label, description }) => (
                <div key={value} className="flex flex-col space-y-1 bg-background/50 p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={value} className="text-primary" />
                    <Label htmlFor={value} className="text-foreground font-medium cursor-pointer">{label}</Label>
                  </div>
                  <p className="text-sm text-foreground/70 ml-6">{description}</p>
                </div>
              ))}
            </RadioGroup>
            {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Location Preference</Label>
            <RadioGroup
              value={formData.location}
              onValueChange={(value) => handleChange('location', value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex flex-col space-y-1 bg-background/50 p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onsite" id="location-onsite" className="text-primary" />
                  <Label htmlFor="location-onsite" className="text-foreground font-medium cursor-pointer">At Our Location 🏠</Label>
                </div>
                <p className="text-sm text-foreground/70 ml-6">Host your event at our charming Brighton venue</p>
              </div>
              <div className="flex flex-col space-y-1 bg-background/50 p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offsite" id="location-offsite" className="text-primary" />
                  <Label htmlFor="location-offsite" className="text-foreground font-medium cursor-pointer">At Your Location 🚗</Label>
                </div>
                <p className="text-sm text-foreground/70 ml-6">We'll bring the sweet experience to you</p>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guestCount" className="text-foreground">Number of Guests</Label>
              <Select value={formData.guestCount} onValueChange={(value) => handleChange('guestCount', value)}>
                <SelectTrigger className="bg-background border-primary/20">
                  <SelectValue placeholder="Select guest count" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: '10-20', label: '10-20 guests' },
                    { value: '21-50', label: '21-50 guests' },
                    { value: '51-100', label: '51-100 guests' },
                    { value: '101-200', label: '101-200 guests' },
                    { value: '200+', label: '200+ guests' }
                  ].map(({ value, label }) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-foreground">Event Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => handleChange('duration', value)}>
                <SelectTrigger className="bg-background border-primary/20">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: '2', label: '2 hours' },
                    { value: '3', label: '3 hours' },
                    { value: '4', label: '4 hours' },
                    { value: '5', label: '5 hours' },
                    { value: 'custom', label: 'Custom duration' }
                  ].map(({ value, label }) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="text-foreground">Preferred Time</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleChange('preferredTime', value)}>
                <SelectTrigger className="bg-background border-primary/20">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-foreground">Estimated Budget</Label>
              <Select value={formData.budget} onValueChange={(value) => handleChange('budget', value)}>
                <SelectTrigger className="bg-background border-primary/20">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: '500-1000', label: '$500-$1,000' },
                    { value: '1001-2000', label: '$1,001-$2,000' },
                    { value: '2001-3000', label: '$2,001-$3,000' },
                    { value: '3001-5000', label: '$3,001-$5,000' },
                    { value: '5000+', label: '$5,000+' }
                  ].map(({ value, label }) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions" className="text-foreground">Dietary Restrictions</Label>
            <Select
              value={formData.dietaryRestrictions[0] || ''}
              onValueChange={(value) => handleChange('dietaryRestrictions', [value])}
            >
              <SelectTrigger className="bg-background border-primary/20">
                <SelectValue placeholder="Select any dietary restrictions" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: 'none', label: 'No Restrictions' },
                  { value: 'gluten-free', label: 'Gluten-Free Options Needed' },
                  { value: 'dairy-free', label: 'Dairy-Free Options Needed' },
                  { value: 'vegan', label: 'Vegan Options Needed' },
                  { value: 'nut-free', label: 'Nut-Free Options Needed' }
                ].map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hearAboutUs" className="text-foreground">How did you hear about us?</Label>
            <Select value={formData.hearAboutUs} onValueChange={(value) => handleChange('hearAboutUs', value)}>
              <SelectTrigger className="bg-background border-primary/20">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: 'social', label: 'Social Media' },
                  { value: 'friend', label: 'Friend/Family' },
                  { value: 'search', label: 'Google Search' },
                  { value: 'event', label: 'Previous Event' },
                  { value: 'other', label: 'Other' }
                ].map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-foreground">Special Requests</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleChange('specialRequests', e.target.value)}
              placeholder="Tell us about any special requests, theme ideas, or specific ice cream flavors you'd like..."
              className="bg-background border-primary/20 focus:border-primary min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:opacity-90 text-white font-semibold py-6 text-lg"
      >
        Submit Booking Request
      </Button>
    </form>
  );
};
