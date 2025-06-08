
import { motion } from 'framer-motion';
import { Play, Heart, Download } from 'lucide-react';
import { useState } from 'react';

interface InteractiveCardProps {
  title: string;
  artist: string;
  image: string;
  category: string;
  duration: string;
  index: number;
}

const InteractiveCard = ({ title, artist, image, category, duration, index }: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-passionate-gray/20 backdrop-blur-sm border border-passionate-white/10">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-passionate-black/80 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Play Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="w-16 h-16 bg-passionate-red/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 0, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-6 w-6 text-passionate-white fill-passionate-white ml-1" />
            </motion.button>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="absolute top-4 right-4 flex space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                isLiked ? 'bg-passionate-red/90' : 'bg-passionate-black/40'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'text-passionate-white fill-passionate-white' : 'text-passionate-white/70'}`} />
            </motion.button>
            
            <motion.button
              className="w-8 h-8 bg-passionate-black/40 backdrop-blur-sm rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="h-4 w-4 text-passionate-white/70" />
            </motion.button>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          >
            <span className="px-3 py-1 bg-passionate-red/20 backdrop-blur-sm text-passionate-red text-xs font-syncopate rounded-full border border-passionate-red/30">
              {category}
            </span>
          </motion.div>
        </div>

        {/* Track Info */}
        <motion.div
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
        >
          <h3 className="font-syncopate font-bold text-passionate-white text-sm mb-1 truncate">
            {title}
          </h3>
          <p className="text-passionate-white/70 text-xs mb-2 truncate">{artist}</p>
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-passionate-red rounded-full animate-pulse"></div>
              <span className="text-passionate-white/50 text-xs">LIVE</span>
            </motion.div>
            <span className="text-passionate-white/50 text-xs">{duration}</span>
          </div>
        </motion.div>

        {/* Hover Effect Border */}
        <motion.div
          className="absolute inset-0 border-2 border-passionate-red rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default InteractiveCard;
