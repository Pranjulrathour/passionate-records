
import React, { useState } from 'react';
import { Music, Send, User, Mail, Phone, Guitar, Globe, ExternalLink, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ArtistEnrollment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    stage_name: '',
    email: '',
    phone: '',
    genre: 'OTHER' as const,
    expertise: '',
    master_link: '',
    portfolio_url: '',
    message: ''
  });

  const genres = [
    { value: 'HIP_HOP', label: 'Hip Hop' },
    { value: 'RAP', label: 'Rap' },
    { value: 'ELECTRONIC', label: 'Electronic' },
    { value: 'INDIE_POP', label: 'Indie Pop' },
    { value: 'ALTERNATIVE_ROCK', label: 'Alternative Rock' },
    { value: 'TRAP', label: 'Trap' },
    { value: 'SYNTHWAVE', label: 'Synthwave' },
    { value: 'PUNK_ROCK', label: 'Punk Rock' },
    { value: 'EXPERIMENTAL', label: 'Experimental' },
    { value: 'RNB', label: 'R&B' },
    { value: 'SOUL', label: 'Soul' },
    { value: 'OTHER', label: 'Other' }
  ] as const;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

      toast.success('Application submitted successfully! We\'ll be in touch soon.');
      setFormData({
        full_name: '',
        stage_name: '',
        email: '',
        phone: '',
        genre: 'OTHER',
        expertise: '',
        master_link: '',
        portfolio_url: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-syncopate font-bold text-4xl sm:text-5xl text-passionate-white mb-6 tracking-wider">
              JOIN THE <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl">PASSIONATE</span> FAMILY
            </h1>
            <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
            <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto leading-relaxed">
              Are you ready to take your music to the next level? Submit your application and become part of India's most passionate record label.
            </p>
          </div>

          {/* Application Form */}
          <div className="bg-passionate-gray/10 border border-passionate-gray rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="full_name" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                    <User className="h-4 w-4 mr-2 text-passionate-red" />
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors"
                    placeholder="Enter your full legal name"
                  />
                </div>

                <div>
                  <label htmlFor="stage_name" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                    <Music className="h-4 w-4 mr-2 text-passionate-red" />
                    STAGE NAME
                  </label>
                  <input
                    type="text"
                    id="stage_name"
                    name="stage_name"
                    value={formData.stage_name}
                    onChange={handleInputChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors"
                    placeholder="Your artist/stage name"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                    <Mail className="h-4 w-4 mr-2 text-passionate-red" />
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                    <Phone className="h-4 w-4 mr-2 text-passionate-red" />
                    PHONE
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              {/* Music Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="genre" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                    <Guitar className="h-4 w-4 mr-2 text-passionate-red" />
                    PRIMARY GENRE
                  </label>
                  <select
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors"
                  >
                    {genres.map((genre) => (
                      <option key={genre.value} value={genre.value} className="bg-passionate-gray text-passionate-white">
                        {genre.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="expertise" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                    <Music className="h-4 w-4 mr-2 text-passionate-red" />
                    EXPERTISE
                  </label>
                  <input
                    type="text"
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors"
                    placeholder="Singer, Producer, Songwriter, etc."
                  />
                </div>
              </div>

              {/* Links */}
              <div className="space-y-6">
                <h3 className="font-syncopate font-bold text-passionate-white text-lg tracking-wider">
                  LINKS & PORTFOLIO
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="master_link" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                      <ExternalLink className="h-4 w-4 mr-2 text-passionate-red" />
                      MAIN LINK
                    </label>
                    <input
                      type="url"
                      id="master_link"
                      name="master_link"
                      value={formData.master_link}
                      onChange={handleInputChange}
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors"
                      placeholder="Your main social media or music platform link"
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio_url" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                      <Globe className="h-4 w-4 mr-2 text-passionate-red" />
                      PORTFOLIO URL
                    </label>
                    <input
                      type="url"
                      id="portfolio_url"
                      name="portfolio_url"
                      value={formData.portfolio_url}
                      onChange={handleInputChange}
                      className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors"
                      placeholder="Your website or SoundCloud link"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="flex items-center text-passionate-white font-syncopate text-sm tracking-wider mb-2">
                  <MessageSquare className="h-4 w-4 mr-2 text-passionate-red" />
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 rounded-lg focus:border-passionate-red focus:outline-none transition-colors resize-vertical"
                  placeholder="Tell us about your music journey, aspirations, and why you want to join Passionate Records..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-12 py-4 tracking-wider transition-all duration-300 red-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
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
                <p className="text-passionate-white/60 text-sm mt-4">
                  * We'll review your application and get back to you within 7 business days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistEnrollment;
