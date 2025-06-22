import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock,
  ExternalLink,
  Ticket,
  Share2,
  Music,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { shareEvent } from '@/utils/shareUtils';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-passionate-white text-xl">Loading event...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <div className="text-passionate-red text-xl">Event not found</div>
            <Button onClick={() => navigate('/events')} variant="outline">
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatEventType = (type: string) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const eventDateTime = formatDateTime(event.date_time);
  const isUpcoming = new Date(event.date_time) > new Date();

  const handleShareEvent = async () => {
    try {
      const success = await shareEvent(event.title, event.venue);
      if (success) {
        toast({
          title: "Shared successfully!",
          description: "The event link has been shared.",
        });
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Unable to share at this time. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-passionate-black to-passionate-gray/20">
          {event.image_url && (
            <div className="absolute inset-0 opacity-20">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-passionate-black/70"></div>
            </div>
          )}
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                onClick={() => navigate('/events')}
                variant="ghost"
                className="mb-8 text-passionate-white hover:text-passionate-red"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {event.image_url && (
                  <div className="relative">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
                    />
                    {isUpcoming && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-passionate-red text-passionate-white">
                          <Calendar className="h-3 w-3 mr-1" />
                          Upcoming
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <h1 className="text-4xl lg:text-6xl font-black text-passionate-white mb-4 font-syncopate">
                    {event.title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    {event.event_type && (
                      <Badge variant="secondary" className="bg-passionate-red/20 text-passionate-red border-passionate-red/30">
                        <Music className="h-3 w-3 mr-1" />
                        {formatEventType(event.event_type)}
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-passionate-white/30 text-passionate-white">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.venue}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`border-passionate-white/30 ${isUpcoming ? 'text-green-400' : 'text-passionate-white/60'}`}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      {isUpcoming ? 'Upcoming' : 'Past Event'}
                    </Badge>
                  </div>

                  {/* Date and Time */}
                  <div className="bg-passionate-gray/20 rounded-xl p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 text-passionate-white mb-2">
                          <Calendar className="h-5 w-5 text-passionate-red" />
                          <span className="font-semibold">Date</span>
                        </div>
                        <p className="text-passionate-white/80 text-lg">
                          {eventDateTime.date}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-passionate-white mb-2">
                          <Clock className="h-5 w-5 text-passionate-red" />
                          <span className="font-semibold">Time</span>
                        </div>
                        <p className="text-passionate-white/80 text-lg">
                          {eventDateTime.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-passionate-white/80 text-lg leading-relaxed mb-8">
                      {event.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {event.ticket_url && (
                      <a
                        href={event.ticket_url.startsWith('http://') || event.ticket_url.startsWith('https://') ? event.ticket_url : `https://${event.ticket_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-8 py-4 bg-passionate-red text-white rounded-full hover:bg-passionate-red/80 transition-colors font-semibold"
                      >
                        <Ticket className="h-5 w-5" />
                        <span>Get Tickets</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <Button
                      onClick={handleShareEvent}
                      variant="outline"
                      className="flex items-center space-x-2 px-8 py-4 border-passionate-white/30 text-passionate-white hover:bg-passionate-white/10"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share Event</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-passionate-gray/20 border-passionate-gray">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-6 w-6 text-passionate-red" />
                    <h3 className="text-xl font-bold text-passionate-white">Venue</h3>
                  </div>
                  <p className="text-passionate-white/80 text-lg">{event.venue}</p>
                </CardContent>
              </Card>

              <Card className="bg-passionate-gray/20 border-passionate-gray">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Music className="h-6 w-6 text-passionate-red" />
                    <h3 className="text-xl font-bold text-passionate-white">Event Type</h3>
                  </div>
                  <p className="text-passionate-white/80 text-lg">
                    {event.event_type ? formatEventType(event.event_type) : 'Music Event'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-passionate-gray/20 border-passionate-gray">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="h-6 w-6 text-passionate-red" />
                    <h3 className="text-xl font-bold text-passionate-white">Status</h3>
                  </div>
                  <p className="text-passionate-white/80 text-lg">
                    {isUpcoming ? 'Upcoming Event' : 'Past Event'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-passionate-gray/10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-2xl font-syncopate text-passionate-white mb-6">
                Discover More Events
              </h3>
              <Button
                onClick={() => navigate('/events')}
                className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white px-8 py-3"
              >
                Explore All Events
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail; 