import { useState } from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { EventBookingForm } from '@/components/events/EventBookingForm';

const Events = () => {
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (formData: any) => {
    // Here you would typically send this to your backend
    console.log('Booking submitted:', formData);
    toast({
      title: "Booking Request Sent!",
      description: "We'll get back to you soon to confirm your event details.",
    });
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
      <div className="pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">LET'S CELEBRATE!</h1>
            <p className="text-xl text-cyan-500 mb-6">
              Craving ice cream at your next event? We offer Ice Cream Parties of all shapes 
              and sizes for the young and old alike at our location or yours.
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              We offer a ton of fun events. Hold your next ice cream party On-site at Sweet Bar 
              with a view of the river, plenty of parking, and lots of delicious treats. 
              We also offer Off-site Ice Cream Socials with drop off, pick-up, or staffed options.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsBookingOpen(true)}
            >
              BOOK YOUR DATE
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Available Dates</h2>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              select={handleDateSelect}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
              }}
              height="auto"
              events={[
                // You can add your existing events here
                {
                  title: 'Birthday Party',
                  start: '2025-01-15',
                  backgroundColor: '#FF69B4'
                },
                {
                  title: 'Corporate Event',
                  start: '2025-01-20',
                  backgroundColor: '#4CAF50'
                }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-3">On-Site Parties</h3>
              <p className="text-gray-600">
                Host your event at our beautiful location with a view of the river. Perfect for birthdays, 
                celebrations, and special occasions.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-3">Off-Site Events</h3>
              <p className="text-gray-600">
                We bring the party to you! Choose from drop-off service or fully staffed events for 
                a worry-free experience.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-3">Festival & Corporate</h3>
              <p className="text-gray-600">
                Perfect for large gatherings, corporate events, and festivals. We'll work with you 
                to create the perfect ice cream experience.
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <p className="text-lg mb-4">
              Email us at{' '}
              <a
                href="mailto:info@fandfsweetbar.com"
                className="text-primary hover:underline"
              >
                info@fandfsweetbar.com
              </a>
              {' '}to set up your party and talk details about your next great event.
            </p>
          </div>
        </motion.div>
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Your Event</DialogTitle>
            <DialogDescription>
              Fill out the form below to request your event date. We'll get back to you 
              within 24 hours to confirm details.
            </DialogDescription>
          </DialogHeader>
          <EventBookingForm
            selectedDate={selectedDate}
            onSubmit={handleBookingSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
