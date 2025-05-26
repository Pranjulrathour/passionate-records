
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Featured music cards data
  const featuredCards = [
    {
      id: 1,
      title: "Neon Dreams",
      artist: "SynthWave",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=faces",
      genre: "Electronic"
    },
    {
      id: 2,
      title: "Urban Pulse",
      artist: "BeatMaster",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=faces",
      genre: "Hip-Hop"
    },
    {
      id: 3,
      title: "Midnight Vibes",
      artist: "Eclipse",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=entropy",
      genre: "Ambient"
    },
    {
      id: 4,
      title: "Fire Flow",
      artist: "RedLine",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=entropy",
      genre: "Trap"
    },
    {
      id: 5,
      title: "Digital Soul",
      artist: "VoidSpace",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
      genre: "Future Bass"
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center passionate-gradient overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ y, opacity }}
    >
      {/* Enhanced Background Pattern with Motion */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 border border-passionate-red rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-20 w-24 h-24 border border-passionate-red rounded-full"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.8, 0.3, 0.8]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-16 h-16 border border-passionate-red rounded-full"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-passionate-red rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1 
            className="font-syncopate font-bold text-3xl sm:text-5xl lg:text-6xl text-passionate-white mb-4 tracking-wider text-shadow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Welcome to <span className="text-passionate-red">Passionate</span>:
          </motion.h1>
          
          <motion.h2 
            className="font-syncopate font-bold text-xl sm:text-3xl lg:text-4xl text-passionate-white/90 mb-6 tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Your Underground Music Gateway
          </motion.h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-base sm:text-lg lg:text-xl text-passionate-white/70 max-w-3xl mx-auto leading-relaxed">
            Unleash your creativity and reach masterpieces with AI at Passionate. Share your digital artworks with friends and the world in this simple online gallery where passion meets art.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/submit-demo"
              className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 red-glow tracking-wider text-sm"
            >
              <span>Create Artwork</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/artists"
              className="bg-transparent hover:bg-passionate-red/10 text-passionate-white font-syncopate font-bold px-6 py-3 rounded-lg border border-passionate-white/30 hover:border-passionate-red transition-all duration-300 flex items-center space-x-3 tracking-wider text-sm"
            >
              <span>Discover Gallery</span>
              <Play className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Featured Music Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="relative"
        >
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-5xl">
              {/* Center card */}
              <motion.div
                className="relative z-30 mx-auto w-64 h-80 bg-passionate-gray rounded-2xl overflow-hidden border border-passionate-white/10"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-full">
                  <img 
                    src={featuredCards[2].image} 
                    alt={featuredCards[2].title}
                    className="w-full h-3/4 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-passionate-black/50 rounded-full flex items-center justify-center"
                    >
                      <Play className="h-4 w-4 text-passionate-white" />
                    </motion.button>
                  </div>
                  <div className="p-4 bg-passionate-black/90">
                    <h3 className="font-syncopate font-bold text-passionate-white text-sm mb-1">
                      {featuredCards[2].title}
                    </h3>
                    <p className="text-passionate-white/70 text-xs">{featuredCards[2].artist}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-passionate-red/20 text-passionate-red text-xs rounded">
                      {featuredCards[2].genre}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Left cards */}
              <motion.div
                className="absolute left-0 top-8 z-20 w-56 h-72 bg-passionate-gray rounded-2xl overflow-hidden border border-passionate-white/10 opacity-80"
                style={{ transform: 'translateX(-50%) rotateY(15deg)' }}
                whileHover={{ scale: 1.02, x: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={featuredCards[1].image} 
                  alt={featuredCards[1].title}
                  className="w-full h-3/4 object-cover"
                />
                <div className="p-3 bg-passionate-black/90">
                  <h3 className="font-syncopate font-bold text-passionate-white text-xs mb-1">
                    {featuredCards[1].title}
                  </h3>
                  <p className="text-passionate-white/70 text-xs">{featuredCards[1].artist}</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute left-0 top-16 z-10 w-48 h-64 bg-passionate-gray rounded-2xl overflow-hidden border border-passionate-white/10 opacity-60"
                style={{ transform: 'translateX(-70%) rotateY(25deg)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={featuredCards[0].image} 
                  alt={featuredCards[0].title}
                  className="w-full h-3/4 object-cover"
                />
                <div className="p-3 bg-passionate-black/90">
                  <h3 className="font-syncopate font-bold text-passionate-white text-xs">
                    {featuredCards[0].title}
                  </h3>
                </div>
              </motion.div>

              {/* Right cards */}
              <motion.div
                className="absolute right-0 top-8 z-20 w-56 h-72 bg-passionate-gray rounded-2xl overflow-hidden border border-passionate-white/10 opacity-80"
                style={{ transform: 'translateX(50%) rotateY(-15deg)' }}
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={featuredCards[3].image} 
                  alt={featuredCards[3].title}
                  className="w-full h-3/4 object-cover"
                />
                <div className="p-3 bg-passionate-black/90">
                  <h3 className="font-syncopate font-bold text-passionate-white text-xs mb-1">
                    {featuredCards[3].title}
                  </h3>
                  <p className="text-passionate-white/70 text-xs">{featuredCards[3].artist}</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-0 top-16 z-10 w-48 h-64 bg-passionate-gray rounded-2xl overflow-hidden border border-passionate-white/10 opacity-60"
                style={{ transform: 'translateX(70%) rotateY(-25deg)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={featuredCards[4].image} 
                  alt={featuredCards[4].title}
                  className="w-full h-3/4 object-cover"
                />
                <div className="p-3 bg-passionate-black/90">
                  <h3 className="font-syncopate font-bold text-passionate-white text-xs">
                    {featuredCards[4].title}
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-passionate-white/50 rounded-full flex justify-center cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="w-1 h-3 bg-passionate-white rounded-full mt-2"
              animate={{ 
                scaleY: [1, 0.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
