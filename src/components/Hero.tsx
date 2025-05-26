
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play, Music2, Headphones } from 'lucide-react';

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
      className="relative min-h-[120vh] flex flex-col items-center justify-center bg-gradient-to-br from-passionate-black via-passionate-black to-passionate-gray overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-20"
      style={{ y, opacity }}
    >
      {/* Background musical elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-passionate-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-passionate-red rounded-full blur-3xl"></div>
      </div>

      {/* Floating musical notes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <Music2 className="w-4 h-4 text-passionate-red/40" />
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-7xl mx-auto w-full flex flex-col min-h-[100vh] justify-center">
        {/* Main Content - Fixed text alignment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 flex-1 flex flex-col justify-center"
        >
          <motion.h1 
            className="font-syncopate font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-passionate-white mb-8 tracking-tight text-center leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            WELCOME TO <span className="text-passionate-red block sm:inline">PASSIONATE</span>{' '}
            <span className="block">RECORDS</span>
          </motion.h1>
          
          <motion.h2 
            className="font-syncopate font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl text-passionate-white/80 mb-8 tracking-wide text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            UNDERGROUND MUSIC LABEL & ARTISTS COLLECTIVE
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-passionate-white/60 max-w-4xl mx-auto leading-relaxed mb-12 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            DISCOVER CUTTING-EDGE MUSIC FROM EMERGING ARTISTS. FROM ELECTRONIC BEATS TO EXPERIMENTAL SOUNDS, 
            WE CHAMPION AUTHENTIC VOICES IN THE UNDERGROUND MUSIC SCENE. JOIN OUR PASSIONATE COMMUNITY OF MUSIC LOVERS.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/submit-demo"
                className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-medium px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base shadow-lg hover:shadow-xl"
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
                className="bg-transparent hover:bg-passionate-white/5 text-passionate-white font-medium px-8 py-4 rounded-xl border border-passionate-white/20 hover:border-passionate-white/40 transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
              >
                <span>EXPLORE ARTISTS</span>
                <Play className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Featured Tracks Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative perspective-1000"
        >
          <div className="flex justify-center items-end space-x-2 sm:space-x-4 lg:space-x-6">
            {featuredTracks.map((track, index) => {
              const isCenter = index === 2;
              const isSecondary = index === 1 || index === 3;
              
              return (
                <motion.div
                  key={track.id}
                  className={`
                    relative bg-passionate-gray/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-passionate-white/10
                    ${isCenter ? 'w-48 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80 z-30' : ''}
                    ${isSecondary ? 'w-40 h-52 sm:w-48 sm:h-60 lg:w-52 lg:h-68 z-20' : ''}
                    ${!isCenter && !isSecondary ? 'w-32 h-44 sm:w-40 sm:h-52 lg:w-44 lg:h-56 z-10' : ''}
                    ${!isCenter ? 'opacity-70' : 'opacity-100'}
                  `}
                  style={{
                    transform: isCenter ? 'none' : 
                             index < 2 ? `rotateY(${15 - index * 5}deg) translateX(${index * 10}px)` :
                             `rotateY(${-15 + (index - 4) * 5}deg) translateX(${(index - 4) * -10}px)`
                  }}
                  whileHover={{ 
                    scale: isCenter ? 1.05 : 1.02,
                    y: isCenter ? -10 : -5,
                    opacity: 1
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative h-full group cursor-pointer">
                    <img 
                      src={track.image} 
                      alt={track.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play button for center track */}
                    {isCenter && (
                      <motion.button
                        className="absolute top-4 right-4 w-8 h-8 bg-passionate-red/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="h-4 w-4 text-passionate-white fill-passionate-white" />
                      </motion.button>
                    )}
                    
                    {/* Track info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-syncopate font-bold text-passionate-white text-xs sm:text-sm mb-1">
                        {track.title}
                      </h3>
                      <p className="text-passionate-white/70 text-xs mb-1">{track.artist}</p>
                      <div className="flex justify-between items-center">
                        <span className="inline-block px-2 py-1 bg-passionate-red/20 text-passionate-red text-xs rounded-md">
                          {track.category}
                        </span>
                        <span className="text-passionate-white/50 text-xs">{track.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Featured tracks label */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-passionate-white/40 text-sm font-syncopate tracking-wider">
              FEATURED RELEASES
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div 
            className="w-5 h-8 border border-passionate-white/30 rounded-full flex justify-center cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-2 bg-passionate-white/50 rounded-full mt-2"
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
