import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, MapPin, ExternalLink, Clock, Users, Music, Ticket, Star, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const navigate = useNavigate();
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

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
            <div className="flex items-center justify-center space-x-3">
              <Music className="h-8 w-8 text-passionate-red animate-pulse" />
              <div className="text-passionate-white font-syncopate text-xl">LOADING EVENTS...</div>
            </div>
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
  
  const filteredUpcomingEvents = upcomingEvents;
  const featuredEvent = upcomingEvents[0];

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background with pattern */}
        <div className="absolute inset-0 passionate-gradient">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-tr from-passionate-red/3 via-transparent to-passionate-red/3"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title */}
          <div className="mb-8 animate-slide-up">
            <h1 className="font-syncopate font-bold text-6xl sm:text-7xl lg:text-8xl text-passionate-white mb-6 tracking-wider text-center">
              LIVE<br/>
              <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl text-shadow-red inline-block">EVENTS</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-passionate-red to-transparent mx-auto mb-8"></div>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-passionate-white/80 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in">
            EXPERIENCE UNFORGETTABLE LIVE PERFORMANCES THAT CELEBRATE UNDERGROUND MUSIC CULTURE.
            <span className="block text-passionate-red font-syncopate text-sm tracking-widest mt-2">
              CONNECT • CELEBRATE • CREATE MEMORIES
            </span>
          </p>
          
          {/* Event Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-syncopate font-bold text-passionate-red">{upcomingEvents?.length || 0}</div>
              <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">UPCOMING</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-syncopate font-bold text-passionate-red">{pastEvents?.length || 0}</div>
              <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">PAST EVENTS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-syncopate font-bold text-passionate-red">
                {events?.filter(e => e.event_type === 'concert').length || 0}
              </div>
              <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">CONCERTS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-syncopate font-bold text-passionate-red">
                {events?.filter(e => e.event_type === 'festival').length || 0}
              </div>
              <div className="text-xs text-passionate-white/60 font-syncopate tracking-wider">FESTIVALS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event Hero */}
      {featuredEvent && (
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
                NEXT <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">EVENT</span>
              </h2>
              <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Event Image */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={featuredEvent.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop"}
                    alt={featuredEvent.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/80 via-transparent to-transparent"></div>
                  
                  {/* Event Type Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-passionate-red/90 backdrop-blur-sm border border-passionate-red/50 px-4 py-2 rounded-full text-sm font-syncopate tracking-wider text-passionate-white">
                      {featuredEvent.event_type?.replace('_', ' ').toUpperCase() || 'EVENT'}
                    </span>
                  </div>
                  
                  {/* Date Overlay */}
                  <div className="absolute bottom-6 left-6 bg-passionate-black/80 backdrop-blur-sm rounded-2xl p-4 border border-passionate-gray/30">
                    <div className="text-passionate-red font-syncopate text-sm tracking-wider">
                      {new Date(featuredEvent.date_time).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                    </div>
                    <div className="text-passionate-white font-syncopate text-2xl font-bold">
                      {new Date(featuredEvent.date_time).getDate()}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Event Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-syncopate font-bold text-4xl lg:text-5xl text-passionate-white mb-4 tracking-wider">
                    {featuredEvent.title}
                  </h3>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2 text-passionate-red">
                      <MapPin className="h-5 w-5" />
                      <span className="font-syncopate tracking-wider">{featuredEvent.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-passionate-red">
                      <Clock className="h-5 w-5" />
                      <span className="font-syncopate tracking-wider">
                        {new Date(featuredEvent.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-passionate-white/80 text-lg leading-relaxed">
                  {featuredEvent.description || `Join us for an incredible night of underground music at ${featuredEvent.venue}. Experience the passion and energy that defines our music collective.`}
                </p>
                
                {/* Event Details Grid */}
                <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-passionate-gray/30">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-passionate-red" />
                    <div>
                      <div className="text-sm text-passionate-white/60 font-syncopate">DATE</div>
                      <div className="text-passionate-white font-syncopate">
                        {new Date(featuredEvent.date_time).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-passionate-red" />
                    <div>
                      <div className="text-sm text-passionate-white/60 font-syncopate">VENUE</div>
                      <div className="text-passionate-white font-syncopate">{featuredEvent.venue}</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {featuredEvent.ticket_url ? (
                    <a
                      href={featuredEvent.ticket_url.startsWith('http://') || featuredEvent.ticket_url.startsWith('https://') ? featuredEvent.ticket_url : `https://${featuredEvent.ticket_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300 red-glow flex items-center space-x-2"
                    >
                      <Ticket className="h-5 w-5" />
                      <span>GET TICKETS</span>
                    </a>
                  ) : (
                    <button 
                      onClick={() => navigate(`/events/${featuredEvent.id}`)}
                      className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300 red-glow"
                    >
                      MORE INFO
                    </button>
                  )}
                  
                  <button 
                    onClick={() => navigate(`/events/${featuredEvent.id}`)}
                    className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 rounded-xl tracking-wider transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}



      {/* Upcoming Events */}
      {filteredUpcomingEvents.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-12 tracking-wider text-center">
              UPCOMING <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">EVENTS</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpcomingEvents.slice(featuredEvent ? 1 : 0).map((event, index) => (
                <div
                  key={event.id}
                  className="group relative bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 hover:border-passionate-red/50 rounded-2xl overflow-hidden transition-all duration-500 animate-slide-up hover:transform hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/80 via-transparent to-transparent"></div>
                    
                    {/* Event Type */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-passionate-red/90 backdrop-blur-sm border border-passionate-red/30 px-3 py-1 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                        {event.event_type?.replace('_', ' ').toUpperCase() || 'EVENT'}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-600/90 backdrop-blur-sm border border-green-400/30 px-3 py-1 rounded-full text-xs font-syncopate tracking-wider text-white">
                        UPCOMING
                      </span>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 bg-passionate-black/80 backdrop-blur-sm rounded-xl p-3 border border-passionate-gray/30">
                      <div className="text-passionate-red font-syncopate text-xs tracking-wider">
                        {new Date(event.date_time).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                      </div>
                      <div className="text-passionate-white font-syncopate text-lg font-bold">
                        {new Date(event.date_time).getDate()}
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-passionate-red/20 backdrop-blur-sm transition-all duration-300 ${
                      hoveredEvent === event.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-passionate-white/20 backdrop-blur-sm rounded-full p-4">
                          <ExternalLink className="h-6 w-6 text-passionate-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-3 tracking-wider group-hover:text-passionate-red transition-colors duration-300">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-passionate-white/70">
                        <MapPin className="h-4 w-4 mr-2 text-passionate-red flex-shrink-0" />
                        <span className="text-sm truncate">{event.venue}</span>
                      </div>
                      
                      <div className="flex items-center text-passionate-white/70">
                        <Calendar className="h-4 w-4 mr-2 text-passionate-red flex-shrink-0" />
                        <span className="text-sm">
                          {new Date(event.date_time).toLocaleDateString('en-US', { 
                            weekday: 'short',
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>

                      <div className="flex items-center text-passionate-white/70">
                        <Clock className="h-4 w-4 mr-2 text-passionate-red flex-shrink-0" />
                        <span className="text-sm">
                          {new Date(event.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    
                    {event.description && (
                      <p className="text-passionate-white/70 text-sm mb-4 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {event.ticket_url && (
                          <a
                            href={event.ticket_url.startsWith('http://') || event.ticket_url.startsWith('https://') ? event.ticket_url : `https://${event.ticket_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-passionate-red/20 hover:bg-passionate-red text-passionate-red hover:text-passionate-white transition-all duration-300"
                          >
                            <Ticket className="h-4 w-4" />
                          </a>
                        )}
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Add to favorites"
                          className="p-2 rounded-full bg-passionate-gray/20 hover:bg-passionate-red/20 text-passionate-white/60 hover:text-passionate-red transition-all duration-300"
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {event.ticket_url ? (
                        <a
                          href={event.ticket_url.startsWith('http://') || event.ticket_url.startsWith('https://') ? event.ticket_url : `https://${event.ticket_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white px-4 py-2 text-sm font-syncopate tracking-wider transition-all duration-300 rounded-lg"
                        >
                          GET TICKETS
                        </a>
                      ) : (
                        <button className="bg-passionate-red/20 text-passionate-red px-4 py-2 text-sm font-syncopate tracking-wider border border-passionate-red rounded-lg hover:bg-passionate-red hover:text-passionate-white transition-all duration-300">
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
        <section className="py-20 border-t border-passionate-gray/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-12 tracking-wider text-center">
              PAST <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">EVENTS</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastEvents.slice(0, 8).map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 hover:border-passionate-gray rounded-2xl overflow-hidden transition-all duration-500 animate-slide-up opacity-75 hover:opacity-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"}
                      alt={event.title}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-passionate-black/60"></div>
                    
                    <div className="absolute top-3 left-3">
                      <span className="bg-passionate-gray/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                        {event.event_type?.replace('_', ' ').toUpperCase() || 'EVENT'}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-passionate-gray/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-syncopate tracking-wider text-passionate-white">
                        PAST
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-syncopate font-bold text-sm text-passionate-white mb-2 tracking-wider line-clamp-1">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center text-passionate-white/50">
                        <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span className="text-xs truncate">{event.venue}</span>
                      </div>
                      
                      <div className="flex items-center text-passionate-white/50">
                        <Calendar className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span className="text-xs">
                          {new Date(event.date_time).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-passionate-gray/10 backdrop-blur-sm border border-passionate-gray/20 rounded-3xl p-16 animate-fade-in">
              <Music className="h-20 w-20 text-passionate-red mx-auto mb-8" />
              <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-6 tracking-wider">
                EVENTS COMING SOON
              </h2>
              <p className="text-passionate-white/70 text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                WE'RE PLANNING INCREDIBLE LIVE EXPERIENCES THAT WILL BRING OUR UNDERGROUND COMMUNITY TOGETHER.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/artists"
                  className="bg-passionate-red hover:bg-passionate-red/80 text-passionate-white font-syncopate font-bold px-10 py-4 rounded-xl tracking-wider transition-all duration-300 red-glow"
                >
                  MEET OUR ARTISTS
                </a>
                <a
                  href="/releases"
                  className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-10 py-4 rounded-xl tracking-wider transition-all duration-300"
                >
                  LATEST RELEASES
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Events;
