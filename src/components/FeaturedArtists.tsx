
import { Music2, Instagram, Youtube } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const FeaturedArtists = () => {
  const { data: artists, isLoading } = useQuery({
    queryKey: ['featured-artists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('is_featured', true)
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  // Mock data - in production this would come from Supabase
  const displayArtists = artists && artists.length > 0 ? artists : [
    {
      id: '1',
      name: 'ALEX THUNDER',
      stage_name: 'ALEX THUNDER',
      genre: 'ELECTRONIC',
      bio: 'ELECTRONIC MUSIC PRODUCER WITH A PASSION FOR CREATING IMMERSIVE SOUNDSCAPES.',
      image_url: '/placeholder.svg',
      instagram_handle: '@alexthunder',
      youtube_handle: '@alexthundermusic',
      spotify_url: 'https://open.spotify.com/artist/alexthunder'
    },
    {
      id: '2',
      name: "MAYA VOICE",
      stage_name: "MAYA VOICE",
      genre: "INDIE_POP",
      bio: "Soulful indie pop sensation from Bangalore",
      image_url: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=400&fit=crop",
      instagram_handle: "@mayavoicemusic",
      youtube_handle: "@MayaVoiceOfficial",
      spotify_url: 'https://open.spotify.com/artist/mayavoice'
    },
    {
      id: '3',
      name: "DELHI DREAMS",
      stage_name: "DELHI DREAMS",
      genre: "ALTERNATIVE_ROCK",
      bio: "Underground rock collective changing the game",
      image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      instagram_handle: "@delhidreamsband",
      youtube_handle: "@DelhiDreamsRock",
      spotify_url: 'https://open.spotify.com/artist/delhidreams'
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-passionate-gray/5 relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-10 right-10 w-64 h-64 border border-passionate-red/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-32 h-32 border border-passionate-red/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="font-syncopate font-bold text-4xl sm:text-5xl text-passionate-white mb-4 tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            FEATURED
            <motion.span 
              className="text-passionate-red"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            > ARTISTS</motion.span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-passionate-red mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p 
            className="text-xl text-passionate-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Meet the visionaries redefining India's music landscape
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {displayArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              variants={cardVariants}
              className="group bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-300 overflow-hidden relative"
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(255, 0, 0, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Artist Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={artist.image_url}
                  alt={artist.name}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-passionate-black/20"
                  whileHover={{ backgroundColor: "rgba(255, 0, 0, 0.2)" }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Play Button Overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="bg-passionate-red/90 rounded-full p-4"
                    initial={{ scale: 0.5, rotate: 0 }}
                    whileHover={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <Music2 className="h-8 w-8 text-passionate-white" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Artist Info */}
              <div className="p-6">
                <motion.div 
                  className="mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <span className="text-xs font-syncopate tracking-wider text-passionate-red">
                    {artist.genre}
                  </span>
                </motion.div>
                
                <motion.h3 
                  className="font-syncopate font-bold text-xl text-passionate-white mb-3 tracking-wider"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {artist.name}
                </motion.h3>
                
                <motion.p 
                  className="text-passionate-white/70 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {artist.bio}
                </motion.p>

                {/* Social Links */}
                <motion.div 
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <motion.a
                    href={`https://instagram.com/${artist.instagram_handle?.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href={`https://youtube.com/@${artist.youtube_handle?.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Youtube className="h-5 w-5" />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Artists Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="/artists"
            className="inline-flex items-center space-x-3 bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-passionate-red"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">VIEW ALL ARTISTS</span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative z-10"
            >
              <Music2 className="h-5 w-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
