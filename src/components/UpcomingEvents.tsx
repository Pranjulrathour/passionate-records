
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpcomingEvents = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date_time', new Date().toISOString())
        .order('date_time', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-passionate-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-passionate-white">Loading upcoming events...</div>
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return (
      <section className="py-20 bg-passionate-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
              UPCOMING <span className="text-passionate-red">EVENTS</span>
            </h2>
            <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
          </div>
          <div className="text-center text-passionate-white/70">
            <p>No upcoming events scheduled. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-passionate-gray/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider animate-slide-up">
            UPCOMING <span className="text-passionate-red">EVENTS</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto animate-fade-in"></div>
          <p className="text-passionate-white/70 mt-6 max-w-2xl mx-auto animate-fade-in">
            Join us for exclusive live performances, album launches, and underground music experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-passionate-black border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden rounded-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image_url || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop"}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-passionate-black/40 group-hover:bg-passionate-red/20 transition-all duration-500"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-passionate-red px-2 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                    {event.event_type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-syncopate font-bold text-lg text-passionate-white mb-2 tracking-wider">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-passionate-white/70 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-passionate-red" />
                    {new Date(event.date_time).toLocaleDateString()} at {new Date(event.date_time).toLocaleTimeString()}
                  </div>
                  <div className="flex items-center text-passionate-white/70 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-passionate-red" />
                    {event.venue}
                  </div>
                </div>
                
                <p className="text-passionate-white/60 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {event.ticket_url && (
                  <Button className="w-full bg-passionate-red hover:bg-passionate-red/80">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    GET TICKETS
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-3 rounded-xl transition-all duration-300"
          >
            VIEW ALL EVENTS
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
