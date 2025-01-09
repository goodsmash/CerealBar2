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
import { cn } from '@/lib/utils';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

const Events = () => {
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get current date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateSelect = (selectInfo: any) => {
    const selectedDate = new Date(selectInfo.start);
    if (selectedDate < today) {
      toast({
        title: "Invalid Date",
        description: "Please select a future date for your event.",
        variant: "destructive"
      });
      return;
    }
    setSelectedDate(selectedDate);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = async (formData: any) => {
    try {
      // Here we'll add the API call to submit the booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      toast({
        title: "Booking Request Sent!",
        description: "We'll get back to you within 24 hours to confirm your event details.",
      });
      setIsBookingOpen(false);
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your booking. Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  // Sample events - replace with actual events from your backend
  const events = [
    {
      title: 'Birthday Celebration',
      start: '2025-01-15',
      backgroundColor: 'var(--primary)',
      borderColor: 'var(--primary)'
    },
    {
      title: 'Corporate Ice Cream Social',
      start: '2025-01-20',
      backgroundColor: 'var(--secondary)',
      borderColor: 'var(--secondary)'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(147, 197, 253)" // Light blue
          gradientBackgroundEnd="rgb(255, 182, 193)" // Light pink
          firstColor="147, 197, 253" // Light blue
          secondColor="255, 182, 193" // Light pink
          thirdColor="224, 231, 255" // Lavender
          fourthColor="255, 218, 185" // Peach
          fifthColor="230, 244, 255" // Baby blue
          className="absolute inset-0 !h-full opacity-70"
        />
      </div>
      <div className="relative z-10 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              Sweet Events & Celebrations
            </h1>
            <p className="text-xl text-foreground/80 mb-6">
              Make your next event unforgettable with Sweet & Comfy Boston's signature ice cream experience!
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-foreground/70">
              From intimate gatherings to grand celebrations, we bring the magic of artisanal ice cream to every occasion. 
              Host your party at our charming Brighton location or let us bring the sweet experience to you!
            </p>
            <Button
              size="lg"
              variant="default"
              className="bg-gradient-to-r from-primary via-secondary to-primary hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
              onClick={() => setIsBookingOpen(true)}
            >
              Book Your Sweet Celebration 🎉
            </Button>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 shadow-xl p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Available Dates</h2>
            <div className="calendar-wrapper">
              <style>{`
                .fc {
                  --fc-border-color: rgba(var(--primary), 0.1);
                  --fc-button-bg-color: var(--primary);
                  --fc-button-border-color: var(--primary);
                  --fc-button-hover-bg-color: var(--primary-foreground);
                  --fc-button-hover-border-color: var(--primary-foreground);
                  --fc-button-active-bg-color: var(--secondary);
                  --fc-button-active-border-color: var(--secondary);
                  --fc-today-bg-color: rgba(var(--primary), 0.1);
                  --fc-neutral-bg-color: var(--background);
                  --fc-page-bg-color: transparent;
                  --fc-event-bg-color: var(--primary);
                  --fc-event-border-color: var(--primary);
                  --fc-event-text-color: #fff;
                }
                .fc-theme-standard td, .fc-theme-standard th {
                  border-color: var(--border);
                }
                .fc-day-today {
                  background: rgba(var(--primary), 0.1) !important;
                }
                .fc-button {
                  font-weight: 600 !important;
                  padding: 0.75rem 1.5rem !important;
                  border-radius: 9999px !important;
                }
                .fc-button-primary:not(:disabled):active,
                .fc-button-primary:not(:disabled).fc-button-active {
                  background-color: var(--secondary) !important;
                  border-color: var(--secondary) !important;
                }
                .fc-daygrid-day-number,
                .fc-col-header-cell-cushion {
                  color: var(--foreground);
                  font-weight: 500;
                  padding: 0.5rem;
                }
                .fc-day-past {
                  opacity: 0.5;
                  pointer-events: none;
                }
                .fc-event {
                  padding: 0.25rem 0.5rem;
                  border-radius: 6px;
                  font-weight: 500;
                }
                .fc-day-future:hover {
                  background: rgba(var(--primary), 0.05);
                  cursor: pointer;
                }
                .fc-toolbar-title {
                  font-size: 1.5rem !important;
                  font-weight: 600 !important;
                  color: var(--foreground);
                }
              `}</style>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                select={handleDateSelect}
                headerToolbar={{
                  left: 'prev,next',
                  center: 'title',
                  right: 'today'
                }}
                validRange={{
                  start: today
                }}
                height="auto"
                events={events}
                selectConstraint={{
                  start: today.toISOString()
                }}
                selectOverlap={false}
                businessHours={{
                  daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                  startTime: '10:00',
                  endTime: '20:00',
                }}
                selectMirror={true}
                dayMaxEvents={3}
                eventDisplay="block"
                eventTimeFormat={{
                  hour: 'numeric',
                  minute: '2-digit',
                  meridiem: 'short'
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Sweet Celebrations",
                description: "Host your event at our charming Brighton location. Perfect for birthdays, graduations, and special moments worth celebrating.",
                icon: "🎉"
              },
              {
                title: "Mobile Ice Cream Bar",
                description: "We bring the sweet experience to you! Choose from drop-off service or fully staffed events for a worry-free celebration.",
                icon: "🚚"
              },
              {
                title: "Corporate & Special Events",
                description: "Elevate your corporate events, weddings, or festivals with our premium ice cream experience.",
                icon: "✨"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-lg"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg mb-4 text-foreground/80">
              Ready to plan your sweet celebration? Contact us at{' '}
              <a
                href="mailto:info@sweetandcomfyboston.com"
                className="text-primary hover:underline font-semibold"
              >
                info@sweetandcomfyboston.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Book Your Sweet Celebration</DialogTitle>
            <DialogDescription className="text-foreground/70">
              Tell us about your dream event, and we'll help make it unforgettably sweet!
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
