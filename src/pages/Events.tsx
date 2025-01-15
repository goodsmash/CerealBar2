import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import type { DateSelectArg, EventClickArg, EventInput, ViewContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { EventBookingForm } from '@/components/events/EventBookingForm';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { BrandContainer, BrandHeading } from '@/components/ui/brand-theme';
import { cn } from '@/lib/utils';

interface CalendarEvent extends EventInput {
  type: 'birthday' | 'corporate' | 'private';
}

const Events = () => {
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedView, setSelectedView] = useState<'dayGridMonth' | 'timeGridWeek'>('dayGridMonth');

  // Get current date at midnight for date validation
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
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
  }, [today, toast]);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    toast({
      title: "Event Details",
      description: `${clickInfo.event.title} - ${clickInfo.event.start?.toLocaleTimeString()}`,
    });
  }, [toast]);

  const handleViewChange = useCallback((viewContent: ViewContentArg) => {
    setSelectedView(viewContent.view.type as 'dayGridMonth' | 'timeGridWeek');
  }, []);

  // Sample events - replace with actual events from your backend
  const events: CalendarEvent[] = [
    {
      title: 'Birthday Celebration',
      start: '2025-01-15',
      end: '2025-01-15T04:00:00',
      backgroundColor: 'rgb(244, 114, 182)',
      borderColor: 'rgb(244, 114, 182)',
      textColor: 'white',
      type: 'birthday'
    },
    {
      title: 'Corporate Ice Cream Social',
      start: '2025-01-20T13:00:00',
      end: '2025-01-20T16:00:00',
      backgroundColor: 'rgb(96, 165, 250)',
      borderColor: 'rgb(96, 165, 250)',
      textColor: 'white',
      type: 'corporate'
    }
  ];

  return (
    <div className="min-h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(147, 197, 253)"
          gradientBackgroundEnd="rgb(255, 182, 193)"
          firstColor="147, 197, 253"
          secondColor="255, 182, 193"
          thirdColor="224, 231, 255"
          fourthColor="255, 218, 185"
          fifthColor="230, 244, 255"
          className="absolute inset-0 !h-full opacity-70"
          interactive={false}
          blendingValue="hard-light"
          size="80%"
        />
      </div>
      
      <div className="relative z-10 pt-24 pb-16">
        <BrandContainer className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <BrandHeading level={1}>Event Calendar</BrandHeading>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select a date on the calendar to book your event, or click the button below to start planning your special occasion.
              </p>
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="bg-gradient-to-r from-brand-pink to-brand-blue hover:opacity-90 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                size="lg"
              >
                Book an Event
              </Button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <div className="calendar-container bg-black/40 backdrop-blur-sm p-6">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                  }}
                  events={events}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  select={handleDateSelect}
                  eventClick={handleEventClick}
                  viewDidMount={handleViewChange}
                  height="auto"
                  eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short'
                  }}
                  slotMinTime="09:00:00"
                  slotMaxTime="22:00:00"
                  allDaySlot={false}
                  slotDuration="01:00:00"
                  expandRows={true}
                  stickyHeaderDates={true}
                  nowIndicator={true}
                  weekends={true}
                  businessHours={{
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    startTime: '09:00',
                    endTime: '22:00',
                  }}
                  selectConstraint="businessHours"
                  className={cn(
                    'custom-calendar rounded-xl overflow-hidden',
                    'fc-theme-custom',
                    selectedView === 'timeGridWeek' && 'week-view'
                  )}
                />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-white">Available Time Slots</h3>
              <p className="text-muted-foreground">
                We're open daily from 9 AM to 10 PM. Select your preferred date and time on the calendar above.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="bg-brand-pink/20 px-4 py-2 rounded-lg border border-brand-pink/30 text-brand-pink">
                  <span className="mr-2">●</span>
                  Birthday Celebrations
                </div>
                <div className="bg-brand-blue/20 px-4 py-2 rounded-lg border border-brand-blue/30 text-brand-blue">
                  <span className="mr-2">●</span>
                  Corporate Events
                </div>
              </div>
            </div>
          </motion.div>
        </BrandContainer>
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-4xl bg-black/90 backdrop-blur-sm border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white text-center">
              Book Your Event
              {selectedDate && (
                <span className="block text-lg font-normal text-muted-foreground mt-1">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Fill out the form below to request your event booking.
            </DialogDescription>
          </DialogHeader>
          <EventBookingForm
            initialDate={selectedDate}
            onClose={() => setIsBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .fc {
          --fc-border-color: rgba(255, 255, 255, 0.1);
          --fc-button-bg-color: rgba(255, 255, 255, 0.1);
          --fc-button-border-color: rgba(255, 255, 255, 0.2);
          --fc-button-hover-bg-color: rgba(255, 255, 255, 0.2);
          --fc-button-hover-border-color: rgba(255, 255, 255, 0.3);
          --fc-button-active-bg-color: rgba(255, 255, 255, 0.3);
          --fc-button-active-border-color: rgba(255, 255, 255, 0.4);
          --fc-event-bg-color: rgb(244, 114, 182);
          --fc-event-border-color: rgb(244, 114, 182);
          --fc-event-text-color: #fff;
          --fc-page-bg-color: transparent;
        }

        .fc .fc-button {
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          font-weight: 500;
          border-radius: 0.5rem;
          text-transform: capitalize;
        }

        .fc .fc-button-primary:not(:disabled).fc-button-active,
        .fc .fc-button-primary:not(:disabled):active {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .fc .fc-toolbar-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .fc .fc-daygrid-day-number,
        .fc .fc-col-header-cell-cushion {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
        }

        .fc .fc-day-today {
          background: rgba(255, 255, 255, 0.1);
        }

        .fc .fc-highlight {
          background: rgba(255, 255, 255, 0.1);
        }

        .fc-theme-custom .fc-list-event:hover td {
          background: rgba(255, 255, 255, 0.1);
        }

        .fc-theme-custom .fc-timegrid-slot {
          height: 3rem;
        }

        .week-view .fc-timegrid-slot {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 768px) {
          .fc .fc-toolbar {
            flex-direction: column;
            gap: 1rem;
          }

          .fc .fc-toolbar-title {
            font-size: 1.125rem;
          }

          .fc .fc-button {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Events;
