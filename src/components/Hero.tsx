
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play } from 'lucide-react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Featured digital art pieces with music theme
  const featuredArtworks = [
    {
      id: 1,
      title: "Neon Pulse",
      artist: "Digital Dreams",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop&crop=center",
      category: "Digital Art"
    },
    {
      id: 2,
      title: "Cyber Symphony",
      artist: "TechVibe",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=500&fit=crop&crop=center",
      category: "AI Art"
    },
    {
      id: 3,
      title: "Vibrant Soul",
      artist: "ColorWave",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop&crop=center",
      category: "Abstract"
    },
    {
      id: 4,
      title: "Electric Mind",
      artist: "NeonArt",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop&crop=center",
      category: "Futuristic"
    },
    {
      id: 5,
      title: "Digital Harmony",
      artist: "ArtFlow",
      image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=400&h=500&fit=crop&crop=center",
      category: "Modern"
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-passionate-black via-passionate-black to-passionate-gray overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ y, opacity }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-passionate-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-passionate-red rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-passionate-red/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-7xl mx-auto w-full">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.h1 
            className="font-syncopate font-bold text-4xl sm:text-6xl lg:text-7xl text-passionate-white mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome to <span className="text-passionate-red">Passionate</span>:
          </motion.h1>
          
          <motion.h2 
            className="font-syncopate font-medium text-xl sm:text-2xl lg:text-3xl text-passionate-white/80 mb-8 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Online Digital Art Gallery
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-passionate-white/60 max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unleash your creativity and reach masterpieces with AI at Passionate. Share your digital artworks with friends and the world in this simple online gallery where passion meets art.
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
                className="bg-passionate-red hover:bg-passionate-red/90 text-passionate-white font-medium px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                <span>Create Artwork</span>
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
                <span>Discover Gallery</span>
                <Play className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Featured Artworks Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative perspective-1000"
        >
          <div className="flex justify-center items-end space-x-2 sm:space-x-4 lg:space-x-6">
            {featuredArtworks.map((artwork, index) => {
              const isCenter = index === 2;
              const isSecondary = index === 1 || index === 3;
              
              return (
                <motion.div
                  key={artwork.id}
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
                      src={artwork.image} 
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-passionate-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Like button */}
                    {isCenter && (
                      <motion.button
                        className="absolute top-4 right-4 w-8 h-8 bg-passionate-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="h-4 w-4 text-passionate-white" />
                      </motion.button>
                    )}
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-syncopate font-bold text-passionate-white text-xs sm:text-sm mb-1">
                        {artwork.title}
                      </h3>
                      <p className="text-passionate-white/70 text-xs">{artwork.artist}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-passionate-red/20 text-passionate-red text-xs rounded-md">
                        {artwork.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
