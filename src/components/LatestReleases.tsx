
import { Play, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const LatestReleases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mock data - in production this would come from Supabase
  const releases = [
    {
      id: 1,
      title: "MIDNIGHT HUSTLE",
      artist: "ARJUN BEATS",
      coverArt: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop",
      releaseDate: "2024-01-15",
      genre: "TRAP",
      spotifyUrl: "https://open.spotify.com/track/example1",
      youtubeUrl: "https://youtube.com/watch?v=example1"
    },
    {
      id: 2,
      title: "NEON DREAMS",
      artist: "MAYA VOICE",
      coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      releaseDate: "2024-01-10",
      genre: "INDIE POP",
      spotifyUrl: "https://open.spotify.com/track/example2",
      youtubeUrl: "https://youtube.com/watch?v=example2"
    },
    {
      id: 3,
      title: "UNDERGROUND ANTHEM",
      artist: "DELHI DREAMS",
      coverArt: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      releaseDate: "2024-01-05",
      genre: "ROCK",
      spotifyUrl: "https://open.spotify.com/track/example3",
      youtubeUrl: "https://youtube.com/watch?v=example3"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-passionate-gray/10 relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #FF0000 1px, transparent 1px), 
                           radial-gradient(circle at 80% 80%, #FF0000 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="font-syncopate font-bold text-4xl sm:text-5xl text-passionate-white mb-4 tracking-wider"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
          >
            LATEST
            <motion.span 
              className="text-passionate-red"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(255, 0, 0, 0.5)",
                  "0 0 20px rgba(255, 0, 0, 0.8)",
                  "0 0 10px rgba(255, 0, 0, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            > RELEASES</motion.span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-passionate-red mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p 
            className="text-xl text-passionate-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Fresh sounds from our underground collective
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {releases.map((release, index) => (
            <motion.div
              key={release.id}
              variants={cardVariants}
              className="group bg-passionate-black border border-passionate-gray hover:border-passionate-red transition-all duration-500 overflow-hidden relative"
              whileHover={{ 
                y: -15,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(255, 0, 0, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Cover Art */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={release.coverArt}
                  alt={release.title}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-passionate-black/20"
                  whileHover={{ 
                    background: "linear-gradient(45deg, rgba(255,0,0,0.3), rgba(0,0,0,0.3))"
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Play Button Overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="bg-passionate-red/90 rounded-full p-4"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Play className="h-8 w-8 text-passionate-white" />
                  </motion.div>
                </motion.div>

                {/* Genre Tag */}
                <motion.div 
                  className="absolute top-4 left-4"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="bg-passionate-red px-3 py-1 text-xs font-syncopate tracking-wider text-passionate-white">
                    {release.genre}
                  </span>
                </motion.div>
              </div>

              {/* Release Info */}
              <div className="p-6">
                <motion.div 
                  className="mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <span className="text-xs text-passionate-red font-syncopate tracking-wider">
                    {new Date(release.releaseDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </motion.div>
                
                <motion.h3 
                  className="font-syncopate font-bold text-xl text-passionate-white mb-1 tracking-wider"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                  whileHover={{ x: 5 }}
                >
                  {release.title}
                </motion.h3>
                
                <motion.p 
                  className="text-passionate-white/70 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                >
                  by {release.artist}
                </motion.p>

                {/* Platform Links */}
                <motion.div 
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.9 }}
                >
                  <motion.a
                    href={release.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-passionate-white/50 hover:text-passionate-red transition-colors duration-300 text-sm"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>SPOTIFY</span>
                  </motion.a>
                  <motion.a
                    href={release.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-passionate-white/50 hover:text-passionate-red transition-colors duration-300 text-sm"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>YOUTUBE</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Releases Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="/releases"
            className="inline-flex items-center space-x-3 bg-transparent border-2 border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-passionate-red/0 via-passionate-red to-passionate-red/0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">VIEW ALL RELEASES</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <Play className="h-5 w-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestReleases;
