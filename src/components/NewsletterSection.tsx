
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate newsletter subscription
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates about new releases and events.",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-passionate-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-passionate-red/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-passionate-red/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-passionate-red/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail className="h-10 w-10 text-passionate-red" />
          </div>

          <h2 className="font-syncopate font-bold text-4xl text-passionate-white mb-4 tracking-wider">
            STAY IN THE <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">LOOP</span>
          </h2>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-8"></div>
          
          <p className="text-passionate-white/70 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Get exclusive access to new releases, artist spotlights, and underground events. 
            Join our community of music lovers and never miss a beat.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-passionate-gray/30 border-passionate-gray text-passionate-white placeholder-passionate-white/50 flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-passionate-red hover:bg-passionate-red/80 font-syncopate tracking-wider"
            >
              {isLoading ? (
                'SUBSCRIBING...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  SUBSCRIBE
                </>
              )}
            </Button>
          </form>

          <p className="text-passionate-white/50 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
