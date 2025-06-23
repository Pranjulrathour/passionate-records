import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Send, Music, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SubmitDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    genre: '',
    link: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const genres = [
    'HIP-HOP / RAP',
    'INDIE POP',
    'ALTERNATIVE ROCK',
    'ELECTRONIC',
    'TRAP',
    'SYNTHWAVE',
    'PUNK ROCK',
    'EXPERIMENTAL',
    'R&B / SOUL',
    'OTHER'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('demo_submissions')
        .insert([{
          artist_name: formData.name,
          email: formData.email,
          genre: formData.genre,
          demo_link: formData.link,
          message: formData.message,
          status: 'pending'
        }]);

      if (error) throw error;
      
      toast({
        title: "Demo Submitted Successfully! 🔥",
        description: "We'll review your submission and get back to you within 48 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        genre: '',
        link: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your demo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            SUBMIT YOUR
            <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl"> DEMO</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            Ready to join the underground revolution? Share your passion with us and let's create something legendary together.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                    ARTIST / BAND NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors"
                    placeholder="Enter your artist or band name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Genre */}
                <div>
                  <label htmlFor="genre" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                    GENRE *
                  </label>
                  <select
                    id="genre"
                    name="genre"
                    required
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors"
                  >
                    <option value="">SELECT YOUR GENRE</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                {/* Link */}
                <div>
                  <label htmlFor="link" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                    DEMO LINK *
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    required
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors"
                    placeholder="SoundCloud, Google Drive, Dropbox, etc."
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                    TELL US YOUR STORY
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors resize-none"
                    placeholder="What makes your music special? What's your vision? Share your passion with us..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-passionate-red hover:bg-passionate-red-dark disabled:bg-passionate-gray text-passionate-white font-syncopate font-bold py-4 tracking-wider transition-all duration-300 red-glow flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-passionate-white"></div>
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>SUBMIT DEMO</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Panel */}
            <div className="space-y-8 animate-slide-up">
              {/* Guidelines */}
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6">
                <h3 className="font-syncopate font-bold bg-passionate-red text-passionate-white px-4 py-2 rounded-xl text-lg mb-4 tracking-wider inline-block">
                  SUBMISSION GUIDELINES
                </h3>
                <ul className="space-y-3 text-passionate-white/70">
                  <li className="flex items-start space-x-3">
                    <Music className="h-5 w-5 text-passionate-red mt-0.5 flex-shrink-0" />
                    <span>Submit only original, unreleased music</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Upload className="h-5 w-5 text-passionate-red mt-0.5 flex-shrink-0" />
                    <span>Use SoundCloud, Google Drive, or Dropbox links</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Send className="h-5 w-5 text-passionate-red mt-0.5 flex-shrink-0" />
                    <span>We respond to all submissions within 48 hours</span>
                  </li>
                </ul>
              </div>

              {/* What We Look For */}
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6">
                <h3 className="font-syncopate font-bold bg-passionate-red text-passionate-white px-4 py-2 rounded-xl text-lg mb-4 tracking-wider inline-block">
                  WHAT WE LOOK FOR
                </h3>
                <ul className="space-y-2 text-passionate-white/70">
                  <li>• Unique sound and artistic vision</li>
                  <li>• Professional production quality</li>
                  <li>• Passion and authenticity</li>
                  <li>• Strong social media presence</li>
                  <li>• Commitment to the underground scene</li>
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6">
                <h3 className="font-syncopate font-bold bg-passionate-red text-passionate-white px-4 py-2 rounded-xl text-lg mb-4 tracking-wider inline-block">
                  DIRECT CONTACT
                </h3>
                <p className="text-passionate-white/70 mb-4">
                  For urgent inquiries or partnerships, reach out directly:
                </p>
                <div className="space-y-2">
                  <p className="text-passionate-white">
                    <strong>Email:</strong> glossdigitalentertainment@gmail.com
                  </p>
                  <p className="text-passionate-white">
                    <strong>Phone:</strong> +91 73177 63969
                  </p>
                  <p className="text-passionate-white">
                    <strong>WhatsApp:</strong> +91 94524 42318
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubmitDemo;
