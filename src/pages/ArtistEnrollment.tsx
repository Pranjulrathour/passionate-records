
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Send, Music, Upload, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ArtistEnrollment = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    stage_name: '',
    email: '',
    phone: '',
    genre: '',
    expertise: '',
    instagram_handle: '',
    youtube_handle: '',
    spotify_url: '',
    portfolio_url: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const genres = [
    'HIP_HOP',
    'RAP', 
    'ELECTRONIC',
    'INDIE_POP',
    'ALTERNATIVE_ROCK',
    'TRAP',
    'SYNTHWAVE',
    'PUNK_ROCK',
    'EXPERIMENTAL',
    'RNB',
    'SOUL',
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
      const { error } = await supabase
        .from('artist_enrollments')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "APPLICATION SUBMITTED SUCCESSFULLY! 🎵",
        description: "WE'LL REVIEW YOUR APPLICATION AND GET BACK TO YOU WITHIN 48 HOURS.",
      });

      // Reset form
      setFormData({
        full_name: '',
        stage_name: '',
        email: '',
        phone: '',
        genre: '',
        expertise: '',
        instagram_handle: '',
        youtube_handle: '',
        spotify_url: '',
        portfolio_url: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "SUBMISSION FAILED",
        description: "THERE WAS AN ERROR SUBMITTING YOUR APPLICATION. PLEASE TRY AGAIN.",
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
            ARTIST
            <span className="text-passionate-red"> ENROLLMENT</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            JOIN THE PASSIONATE RECORDS FAMILY. SUBMIT YOUR APPLICATION AND LET'S CREATE MUSIC HISTORY TOGETHER.
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
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="full_name" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                      placeholder="YOUR LEGAL NAME"
                    />
                  </div>
                  <div>
                    <label htmlFor="stage_name" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                      STAGE NAME
                    </label>
                    <input
                      type="text"
                      id="stage_name"
                      name="stage_name"
                      value={formData.stage_name}
                      onChange={handleChange}
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                      placeholder="YOUR ARTIST NAME"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
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
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                      placeholder="YOUR.EMAIL@EXAMPLE.COM"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Music Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="genre" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                      PRIMARY GENRE *
                    </label>
                    <select
                      id="genre"
                      name="genre"
                      required
                      value={formData.genre}
                      onChange={handleChange}
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                    >
                      <option value="">SELECT YOUR GENRE</option>
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>{genre.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="expertise" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                      EXPERTISE
                    </label>
                    <input
                      type="text"
                      id="expertise"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleChange}
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                      placeholder="E.G. SONGWRITER, PRODUCER, VOCALIST"
                    />
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <h3 className="font-syncopate font-bold text-passionate-red text-lg tracking-wider">
                    SOCIAL MEDIA PRESENCE
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="instagram_handle" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                        INSTAGRAM HANDLE
                      </label>
                      <input
                        type="text"
                        id="instagram_handle"
                        name="instagram_handle"
                        value={formData.instagram_handle}
                        onChange={handleChange}
                        className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                        placeholder="@YOURUSERNAME"
                      />
                    </div>
                    <div>
                      <label htmlFor="youtube_handle" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                        YOUTUBE CHANNEL
                      </label>
                      <input
                        type="text"
                        id="youtube_handle"
                        name="youtube_handle"
                        value={formData.youtube_handle}
                        onChange={handleChange}
                        className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                        placeholder="@YOURCHANNELNAME"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="spotify_url" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                      SPOTIFY PROFILE URL
                    </label>
                    <input
                      type="url"
                      id="spotify_url"
                      name="spotify_url"
                      value={formData.spotify_url}
                      onChange={handleChange}
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                      placeholder="HTTPS://OPEN.SPOTIFY.COM/ARTIST/..."
                    />
                  </div>
                </div>

                {/* Portfolio */}
                <div>
                  <label htmlFor="portfolio_url" className="block text-passionate-white font-syncopate tracking-wider mb-2">
                    PORTFOLIO URL *
                  </label>
                  <input
                    type="url"
                    id="portfolio_url"
                    name="portfolio_url"
                    required
                    value={formData.portfolio_url}
                    onChange={handleChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors rounded-xl"
                    placeholder="SOUNDCLOUD, BANDCAMP, YOUTUBE, OR DRIVE LINK"
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
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors resize-none rounded-xl"
                    placeholder="WHAT DRIVES YOUR PASSION FOR MUSIC? TELL US ABOUT YOUR JOURNEY, GOALS, AND WHY YOU WANT TO JOIN PASSIONATE RECORDS..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-passionate-red hover:bg-passionate-red-dark disabled:bg-passionate-gray text-passionate-white font-syncopate font-bold py-4 tracking-wider transition-all duration-300 red-glow flex items-center justify-center space-x-3 rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-passionate-white"></div>
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>SUBMIT APPLICATION</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Panel */}
            <div className="space-y-8 animate-slide-up">
              {/* What We Look For */}
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6 rounded-2xl">
                <h3 className="font-syncopate font-bold text-passionate-red text-lg mb-4 tracking-wider">
                  WHAT WE LOOK FOR
                </h3>
                <ul className="space-y-3 text-passionate-white/70">
                  <li className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-passionate-red mt-0.5 flex-shrink-0" />
                    <span>UNIQUE ARTISTIC VISION AND AUTHENTIC VOICE</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Music className="h-5 w-5 text-passionate-red mt-0.5 flex-shrink-0" />
                    <span>PROFESSIONAL QUALITY MUSIC PRODUCTION</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Upload className="h-5 w-5 text-passionate-red mt-0.5 flex-shrink-0" />
                    <span>STRONG WORK ETHIC AND DEDICATION</span>
                  </li>
                </ul>
              </div>

              {/* Application Process */}
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6 rounded-2xl">
                <h3 className="font-syncopate font-bold text-passionate-red text-lg mb-4 tracking-wider">
                  APPLICATION PROCESS
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-passionate-red rounded-full flex items-center justify-center text-passionate-white font-bold text-sm">1</div>
                    <span className="text-passionate-white/70">SUBMIT YOUR APPLICATION</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-passionate-red rounded-full flex items-center justify-center text-passionate-white font-bold text-sm">2</div>
                    <span className="text-passionate-white/70">INITIAL REVIEW (48 HOURS)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-passionate-red rounded-full flex items-center justify-center text-passionate-white font-bold text-sm">3</div>
                    <span className="text-passionate-white/70">INTERVIEW & DEMO REVIEW</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-passionate-red rounded-full flex items-center justify-center text-passionate-white font-bold text-sm">4</div>
                    <span className="text-passionate-white/70">FINAL DECISION</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6 rounded-2xl">
                <h3 className="font-syncopate font-bold text-passionate-red text-lg mb-4 tracking-wider">
                  QUESTIONS?
                </h3>
                <p className="text-passionate-white/70 mb-4">
                  HAVE QUESTIONS ABOUT THE APPLICATION PROCESS? REACH OUT TO US DIRECTLY:
                </p>
                <div className="space-y-2">
                  <p className="text-passionate-white">
                    <strong>EMAIL:</strong> ARTISTS@PASSIONATERECORDS.COM
                  </p>
                  <p className="text-passionate-white">
                    <strong>WHATSAPP:</strong> +91 98765 43210
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

export default ArtistEnrollment;
