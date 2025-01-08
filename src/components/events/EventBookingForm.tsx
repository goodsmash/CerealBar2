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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(123) 456-7890"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Event Type</Label>
          <RadioGroup
            value={formData.eventType}
            onValueChange={(value) => handleChange('eventType', value)}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="birthday" id="birthday" />
              <Label htmlFor="birthday">Birthday Party</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="corporate" id="corporate" />
              <Label htmlFor="corporate">Corporate Event</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wedding" id="wedding" />
              <Label htmlFor="wedding">Wedding</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Location Preference</Label>
          <RadioGroup
            value={formData.location}
            onValueChange={(value) => handleChange('location', value)}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="onsite" id="onsite" />
              <Label htmlFor="onsite">On-site at Sweet Bar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offsite" id="offsite" />
              <Label htmlFor="offsite">Off-site Location</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guestCount">Number of Guests</Label>
            <Select
              value={formData.guestCount}
              onValueChange={(value) => handleChange('guestCount', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select guest count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 guests</SelectItem>
                <SelectItem value="11-25">11-25 guests</SelectItem>
                <SelectItem value="26-50">26-50 guests</SelectItem>
                <SelectItem value="51-100">51-100 guests</SelectItem>
                <SelectItem value="100+">100+ guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredTime">Preferred Time</Label>
            <Select
              value={formData.preferredTime}
              onValueChange={(value) => handleChange('preferredTime', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="16:00">4:00 PM</SelectItem>
                <SelectItem value="18:00">6:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            placeholder="Tell us about any special requirements or requests..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="w-full">
          Submit Booking Request
        </Button>
      </div>
    </form>
  );
};
