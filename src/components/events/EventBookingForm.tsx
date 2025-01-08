import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventBookingFormProps {
  selectedDate: Date | null;
  onSubmit: (formData: any) => void;
}

export const EventBookingForm = ({ selectedDate, onSubmit }: EventBookingFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'birthday',
    location: 'onsite',
    guestCount: '',
    specialRequests: '',
    preferredTime: '12:00',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: selectedDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(123) 456-7890"
              className="bg-background border-primary/20 focus:border-primary"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Event Type</Label>
          <RadioGroup
            value={formData.eventType}
            onValueChange={(value) => handleChange('eventType', value)}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: 'birthday', label: 'Birthday Party 🎂' },
              { value: 'corporate', label: 'Corporate Event 💼' },
              { value: 'wedding', label: 'Wedding 💍' },
              { value: 'other', label: 'Other Celebration 🎉' }
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2 bg-background/50 p-3 rounded-lg border border-primary/10">
                <RadioGroupItem value={value} id={value} className="text-primary" />
                <Label htmlFor={value} className="text-foreground cursor-pointer">{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Location Preference</Label>
          <RadioGroup
            value={formData.location}
            onValueChange={(value) => handleChange('location', value)}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: 'onsite', label: 'At Our Location 🏠' },
              { value: 'offsite', label: 'At Your Location 🚗' }
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2 bg-background/50 p-3 rounded-lg border border-primary/10">
                <RadioGroupItem value={value} id={`location-${value}`} className="text-primary" />
                <Label htmlFor={`location-${value}`} className="text-foreground cursor-pointer">{label}</Label>
              </div>
            ))}
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
                {['10-20', '21-50', '51-100', '100+'].map((count) => (
                  <SelectItem key={count} value={count}>{count} guests</SelectItem>
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
                {[
                  '10:00', '11:00', '12:00', '13:00', '14:00',
                  '15:00', '16:00', '17:00', '18:00', '19:00'
                ].map((time) => (
                  <SelectItem key={time} value={time}>
                    {time.split(':')[0] > '12' 
                      ? `${parseInt(time.split(':')[0]) - 12}:00 PM`
                      : `${time} ${time === '12:00' ? 'PM' : 'AM'}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequests" className="text-foreground">Special Requests</Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            placeholder="Tell us about any special requests or dietary requirements..."
            className="bg-background border-primary/20 focus:border-primary min-h-[100px]"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
      >
        Submit Booking Request
      </Button>
    </form>
  );
};
