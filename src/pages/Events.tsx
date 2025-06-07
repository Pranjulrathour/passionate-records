
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  event_type: string;
  date_time: string;
  venue: string;
  description?: string;
  image_url?: string;
  ticket_url?: string;
}

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date_time', { ascending: true });
      
      if (error) throw error;
      return data as Event[];
    }
  });

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            UPCOMING
            <span className="text-passionate-red"> EVENTS</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            JOIN US FOR UNFORGETTABLE LIVE EXPERIENCES. FROM INTIMATE GIGS TO MAJOR CONCERTS.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-passionate-gray/40 rounded-xl mb-4"></div>
                  <div className="h-6 bg-passionate-gray/40 rounded mb-2"></div>
                  <div className="h-4 bg-passionate-gray/40 rounded mb-4"></div>
                </div>
              ))}
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-passionate-gray/20 border border-passionate-gray rounded-2xl overflow-hidden hover:border-passionate-red transition-all duration-300 group">
                  {event.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center text-passionate-red text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(event.date_time), 'MMM dd, yyyy')}
                    </div>
                    
                    <h3 className="font-syncopate font-bold text-xl text-passionate-white mb-2 tracking-wider">
                      {event.title.toUpperCase()}
                    </h3>
                    
                    <div className="flex items-center text-passionate-white/70 text-sm mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      {format(new Date(event.date_time), 'h:mm a')}
                    </div>
                    
                    <div className="flex items-center text-passionate-white/70 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.venue}
                    </div>
                    
                    {event.description && (
                      <p className="text-passionate-white/60 text-sm mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="bg-passionate-red/20 text-passionate-red px-3 py-1 rounded-full text-xs font-syncopate tracking-wider">
                        {event.event_type.replace('_', ' ')}
                      </span>
                      
                      {event.ticket_url && (
                        <a
                          href={event.ticket_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white px-4 py-2 rounded-xl font-syncopate text-xs tracking-wider transition-colors duration-300 flex items-center space-x-2"
                        >
                          <span>GET TICKETS</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 text-passionate-red mx-auto mb-6" />
              <h3 className="font-syncopate font-bold text-2xl text-passionate-white mb-4 tracking-wider">
                NO UPCOMING EVENTS
              </h3>
              <p className="text-passionate-white/70 max-w-md mx-auto">
                WE'RE PLANNING SOMETHING EPIC. STAY TUNED FOR ANNOUNCEMENTS!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
