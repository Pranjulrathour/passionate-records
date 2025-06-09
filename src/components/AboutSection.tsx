
import { motion } from 'framer-motion';
import { Music, Users, Award, Zap } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Music,
      title: "UNDERGROUND MUSIC",
      description: "Discover cutting-edge tracks from emerging artists who are pushing the boundaries of sound."
    },
    {
      icon: Users,
      title: "ARTIST COLLECTIVE",
      description: "Join a community of passionate musicians and creators who share your vision for authentic music."
    },
    {
      icon: Award,
      title: "QUALITY PRODUCTION",
      description: "Professional recording, mixing, and mastering services to bring your music to life."
    },
    {
      icon: Zap,
      title: "RAPID GROWTH",
      description: "Fast-track your music career with our industry connections and promotional strategies."
    }
  ];

  return (
    <section className="py-20 bg-passionate-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-passionate-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-passionate-red rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-syncopate font-bold text-4xl md:text-5xl text-passionate-white mb-6 tracking-wider">
            WHY CHOOSE <span className="text-passionate-red">PASSIONATE RECORDS</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-8"></div>
          <p className="text-passionate-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
            We're not just a record label – we're a movement. Passionate Records is dedicated to nurturing 
            underground talent and bringing authentic voices to the forefront of the music industry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="bg-passionate-gray/20 border border-passionate-gray hover:border-passionate-red transition-all duration-500 p-8 rounded-xl group-hover:bg-passionate-red/10">
                <div className="w-16 h-16 bg-passionate-red/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-passionate-red/30 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-passionate-red" />
                </div>
                <h3 className="font-syncopate font-bold text-lg text-passionate-white mb-4 tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-passionate-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
