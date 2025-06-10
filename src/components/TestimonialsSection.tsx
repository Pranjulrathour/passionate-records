
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "ALEX RIVERA",
      role: "Electronic Producer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Passionate Records gave me the platform I needed to reach a global audience. Their support for underground artists is unmatched.",
      rating: 5
    },
    {
      name: "MAYA CHEN",
      role: "Hip-Hop Artist",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face",
      content: "Working with Passionate Records transformed my career. They understand the underground scene like no other label.",
      rating: 5
    },
    {
      name: "JORDAN BLAKE",
      role: "Indie Rock Musician",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The creative freedom and professional support I received here allowed me to create my most authentic work yet.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-passionate-gray/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
            WHAT ARTISTS <span className="text-passionate-red">SAY</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto"></div>
          <p className="text-passionate-white/70 mt-6 max-w-2xl mx-auto">
            Hear from the talented artists who have made Passionate Records their home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-passionate-black border border-passionate-gray hover:border-passionate-red transition-all duration-500 p-6 rounded-xl group"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-syncopate font-bold text-passionate-white text-sm tracking-wider">
                    {testimonial.name}
                  </h4>
                  <p className="text-passionate-red text-xs">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-passionate-red fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="h-6 w-6 text-passionate-red/30 absolute -top-2 -left-1" />
                <p className="text-passionate-white/70 text-sm leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
