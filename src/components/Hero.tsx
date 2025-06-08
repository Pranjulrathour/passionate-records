
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play, Music2, Headphones, Volume2, Radio } from 'lucide-react';
import InteractiveCard from './InteractiveCard';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Featured music releases/tracks
  const featuredTracks = [
    {
      id: 1,
      title: "MIDNIGHT ECHOES",
      artist: "NEON PULSE",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop&crop=center",
      category: "ELECTRONIC",
      duration: "3:45"
    },
    {
      id: 2,
      title: "URBAN RHYTHM",
      artist: "STREET BEATS",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=center",
      category: "HIP HOP",
      duration: "4:12"
    },
    {
      id: 3,
      title: "DIGITAL DREAMS",
      artist: "CYBER SYMPHONY",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=500&fit=crop&crop=center",
      category: "AMBIENT",
      duration: "5:33"
    },
    {
      id: 4,
      title: "BASS DROP",
      artist: "THUNDER WAVE",
      image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=500&fit=crop&crop=center",
      category: "DUBSTEP",
      duration: "3:28"
    },
    {
      id: 5,
      title: "MELODIC FLOW",
      artist: "HARMONY LABS",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=500&fit=crop&crop=center",
      category: "EXPERIMENTAL",
      duration: "4:56"
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="relative min-h-screen flex flex-col bg-gradient-to-br from-passionate-black via-passionate-black to-passionate-gray/20 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Background Circles */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-passionate-red/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-passionate-red/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255,0,0) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      {/* Floating Sound Waves */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {i % 3 === 0 ? (
            <Volume2 className="w-4 h-4 text-passionate-red/30" />
          ) : i % 3 === 1 ? (
            <Radio className="w-4 h-4 text-passionate-red/30" />
          ) : (
            <Music2 className="w-4 h-4 text-passionate-red/30" />
          )}
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            {/* Logo and Brand */}
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.img 
                src="/lovable-uploads/2798045b-acfd-4e92-9275-b9b11607bbb4.png" 
                alt="Passionate Records Logo" 
                className="h-16 w-16 mr-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.h1 
                className="font-syncopate font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-passionate-white tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-passionate-red">PASSIONATE</span>{' '}
                <span className="block sm:inline">RECORDS</span>
              </motion.h1>
            </motion.div>
            
            <motion.h2 
              className="font-syncopate font-medium text-lg sm:text-xl md:text-2xl text-passionate-white/80 mb-6 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              UNDERGROUND MUSIC LABEL & ARTISTS COLLECTIVE
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-passionate-white/60 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              DISCOVER CUTTING-EDGE MUSIC FROM EMERGING ARTISTS. FROM ELECTRONIC BEATS TO EXPERIMENTAL SOUNDS, 
              WE CHAMPION AUTHENTIC VOICES IN THE UNDERGROUND MUSIC SCENE.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/submit-demo"
                  className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-medium px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base shadow-lg"
                >
                  <Headphones className="h-4 w-4" />
                  <span>SUBMIT YOUR MUSIC</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/artists"
                  className="bg-transparent hover:bg-passionate-white/5 text-passionate-white font-medium px-8 py-4 rounded-xl border border-passionate-white/20 hover:border-passionate-red transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
                >
                  <span>EXPLORE ARTISTS</span>
                  <Play className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interactive Cards Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative"
          >
            <motion.h3
              className="font-syncopate font-bold text-2xl sm:text-3xl text-passionate-white mb-8 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              FEATURED <span className="text-passionate-red">RELEASES</span>
            </motion.h3>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-7xl mx-auto">
              {featuredTracks.map((track, index) => (
                <InteractiveCard
                  key={track.id}
                  title={track.title}
                  artist={track.artist}
                  image={track.image}
                  category={track.category}
                  duration={track.duration}
                  index={index}
                />
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <motion.button
                className="bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-3 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 0, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW ALL RELEASES
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div 
            className="w-5 h-8 border border-passionate-white/30 rounded-full flex justify-center cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-2 bg-passionate-red rounded-full mt-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
