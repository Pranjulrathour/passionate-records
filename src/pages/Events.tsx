
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date_time', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-passionate-black">
        <Navbar />
        <div className="pt-24 pb-12 passionate-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-passionate-white font-syncopate text-xl">Loading Events...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = events?.filter(event => new Date(event.date_time) > now) || [];
  const pastEvents = events?.filter(event => new Date(event.date_time) <= now) || [];

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            OUR
            <span className="text-passionate-red"> EVENTS</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            Join us for unforgettable live experiences that celebrate underground music culture and bring our community together.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-8 tracking-wider">
              UPCOMING <span className="text-passionate-red">EVENTS</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-passionate-black/20 group-hover:bg-passionate-red/20 transition-all duration-500"></div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-passionate-red px-3 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                        {event.event_type?.replace('_', ' ') || 'EVENT'}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-green-600 px-2 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                        UPCOMING
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-3 tracking-wider">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-passionate-white/70">
                        <MapPin className="h-4 w-4 mr-2 text-passionate-red" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                      
                      <div className="flex items-center text-passionate-white/70">
                        <Calendar className="h-4 w-4 mr-2 text-passionate-red" />
                        <span className="text-sm">
                          {new Date(event.date_time).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center text-passionate-white/70">
                        <Clock className="h-4 w-4 mr-2 text-passionate-red" />
                        <span className="text-sm">
                          {new Date(event.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    
                    {event.description && (
                      <p className="text-passionate-white/70 mb-4 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {event.ticket_url && (
                          <a
                            href={event.ticket_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      
                      {event.ticket_url ? (
                        <a
                          href={event.ticket_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white px-4 py-2 text-sm font-syncopate tracking-wider transition-all duration-300"
                        >
                          GET TICKETS
                        </a>
                      ) : (
                        <button className="bg-passionate-red/20 text-passionate-red px-4 py-2 text-sm font-syncopate tracking-wider border border-passionate-red">
                          MORE INFO
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-8 tracking-wider">
              PAST <span className="text-passionate-red">EVENTS</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden animate-slide-up opacity-75"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-passionate-black/40 group-hover:bg-passionate-black/20 transition-all duration-500"></div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-passionate-gray px-3 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                        {event.event_type?.replace('_', ' ') || 'EVENT'}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-passionate-gray px-2 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                        PAST
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-3 tracking-wider">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-passionate-white/50">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                      
                      <div className="flex items-center text-passionate-white/50">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {new Date(event.date_time).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    {event.description && (
                      <p className="text-passionate-white/50 mb-4 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Events Message */}
      {(!events || events.length === 0) && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-syncopate text-2xl text-passionate-white mb-4">No Events Scheduled</h3>
            <p className="text-passionate-white/70">Stay tuned for exciting upcoming events!</p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Events;
