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
import { cateringPackages } from '@/data/catering';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, Clock, Users, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CalendarEvent extends EventInput {
  type: 'birthday' | 'corporate' | 'private';
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Events = () => {
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedView, setSelectedView] = useState<'dayGridMonth' | 'timeGridWeek'>('dayGridMonth');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState<'events' | 'catering'>('events');

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

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setIsBookingOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-20"
    >
      <BackgroundGradientAnimation>
        <BrandContainer>
          <div className="space-y-8 pt-20">
            <div className="text-center space-y-4">
              <BrandHeading level={1}>
                Book Your Event
              </BrandHeading>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From private events to corporate catering, we'll make your special occasion unforgettable with our custom cereal creations.
              </p>
            </div>

            <Tabs value={activeServiceTab} onValueChange={(value) => setActiveServiceTab(value as 'events' | 'catering')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="events">Private Events</TabsTrigger>
                <TabsTrigger value="catering">Catering Services</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h3 className="text-2xl font-bold mb-4">Event Calendar</h3>
                      <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        viewDidMount={handleViewChange}
                        headerToolbar={{
                          left: 'prev,next today',
                          center: 'title',
                          right: 'dayGridMonth,timeGridWeek'
                        }}
                        height="auto"
                        className="event-calendar"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h3 className="text-2xl font-bold mb-4">Event Types</h3>
                      <div className="grid gap-4">
                        <div className="p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors">
                          <h4 className="text-xl font-semibold mb-2">Birthday Parties 🎂</h4>
                          <p className="text-muted-foreground">Make your birthday celebration unique with our custom cereal bar!</p>
                        </div>
                        <div className="p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors">
                          <h4 className="text-xl font-semibold mb-2">Corporate Events 💼</h4>
                          <p className="text-muted-foreground">Perfect for team building and client appreciation events.</p>
                        </div>
                        <div className="p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors">
                          <h4 className="text-xl font-semibold mb-2">Private Events ⭐</h4>
                          <p className="text-muted-foreground">Customize your special occasion with our unique venue.</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="catering" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cateringPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-colors"
                      variants={fadeIn}
                      initial="initial"
                      animate="animate"
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
                        className="w-full"
                        onClick={() => handlePackageSelect(pkg.id)}
                      >
                        Book Now
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </BrandContainer>
      </BackgroundGradientAnimation>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Book Your {activeServiceTab === 'events' ? 'Event' : 'Catering Service'}</DialogTitle>
            <DialogDescription>
              Fill out the form below to book your {activeServiceTab === 'events' ? 'event' : 'catering service'}. We'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <EventBookingForm
            initialDate={selectedDate}
            onClose={() => {
              setIsBookingOpen(false);
              setSelectedPackage(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Events;
