
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, Music, Calendar, Award } from 'lucide-react';

const StatsSection = () => {
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [artistsResult, projectsResult, eventsResult] = await Promise.all([
        supabase.from('artists').select('id', { count: 'exact' }),
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('events').select('id', { count: 'exact' })
      ]);

      return {
        artists: artistsResult.count || 0,
        projects: projectsResult.count || 0,
        events: eventsResult.count || 0,
        satisfaction: 98 // Static for now
      };
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  const statsData = [
    {
      icon: Users,
      number: stats?.artists || 0,
      label: "TALENTED ARTISTS",
      suffix: "+"
    },
    {
      icon: Music,
      number: stats?.projects || 0,
      label: "MUSIC PROJECTS",
      suffix: "+"
    },
    {
      icon: Calendar,
      number: stats?.events || 0,
      label: "LIVE EVENTS",
      suffix: "+"
    },
    {
      icon: Award,
      number: stats?.satisfaction || 98,
      label: "SATISFACTION RATE",
      suffix: "%"
    }
  ];

  return (
    <section className="py-20 bg-passionate-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(255,0,0) 2px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
            OUR <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">IMPACT</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 p-8 rounded-xl group-hover:bg-passionate-red/10">
                <div className="w-16 h-16 bg-passionate-red/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-passionate-red/30 transition-colors duration-300">
                  <stat.icon className="h-8 w-8 text-passionate-red" />
                </div>
                <div className="font-syncopate font-bold text-3xl lg:text-4xl text-passionate-white mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="font-syncopate text-sm text-passionate-white/70 tracking-wider">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
