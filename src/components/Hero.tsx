
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

  return (
    <motion.section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center passionate-gradient overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Enhanced Background Pattern with Motion */}
      <div className="absolute inset-0 opacity-20">
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

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Enhanced Main Heading with Stagger Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="font-syncopate font-bold text-4xl sm:text-6xl lg:text-8xl text-passionate-white mb-6 tracking-wider text-shadow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              FEEL THE
            </motion.span>
            <motion.span 
              className="block text-passionate-red"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              BEAT
            </motion.span>
          </motion.h1>
          
          <motion.h2 
            className="font-syncopate font-bold text-2xl sm:text-4xl lg:text-5xl text-passionate-white mb-8 tracking-wider text-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            LIVE THE PASSION
          </motion.h2>
        </motion.div>

        {/* Enhanced Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-lg sm:text-xl lg:text-2xl text-passionate-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            India's premier indie music label. Where underground artists become legends and passion becomes profession.
          </p>
        </motion.div>

        {/* Enhanced CTA Buttons with Advanced Hover Effects */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/artists"
              className="group bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 rounded-none border-2 border-passionate-red hover:border-passionate-red-dark transition-all duration-300 flex items-center space-x-3 red-glow tracking-wider relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                whileHover={{ translateX: "200%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">EXPLORE ARTISTS</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/submit-demo"
              className="group bg-transparent hover:bg-passionate-red/10 text-passionate-white font-syncopate font-bold px-8 py-4 rounded-none border-2 border-passionate-white hover:border-passionate-red transition-all duration-300 flex items-center space-x-3 tracking-wider relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-passionate-red/10 to-transparent -translate-x-full"
                whileHover={{ translateX: "200%" }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="h-5 w-5 relative z-10" />
              </motion.div>
              <span className="relative z-10">SUBMIT YOUR DEMO</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-passionate-white rounded-full flex justify-center cursor-pointer"
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
