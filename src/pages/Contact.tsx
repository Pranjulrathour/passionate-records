
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-5xl sm:text-6xl text-passionate-white mb-6 tracking-wider animate-slide-up">
            GET IN
            <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl"> TOUCH</span>
          </h1>
          <div className="w-24 h-1 bg-passionate-red mx-auto mb-6"></div>
          <p className="text-xl text-passionate-white/70 max-w-3xl mx-auto animate-fade-in">
            Ready to collaborate? Have questions? Want to join the revolution? Let's connect and create something legendary.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="text-center animate-fade-in">
              <div className="bg-passionate-gray/20 border border-passionate-gray p-8 hover:border-passionate-red transition-all duration-300">
                <Mail className="h-12 w-12 text-passionate-red mx-auto mb-4" />
                <h3 className="font-syncopate font-bold text-passionate-white text-lg mb-2 tracking-wider">
                  EMAIL US
                </h3>
                <p className="text-passionate-white/70 mb-4">
                  For business inquiries and partnerships
                </p>
                <a
                  href="mailto:info@passionaterecords.com"
                  className="text-passionate-red hover:text-passionate-red-dark transition-colors"
                >
                  info@passionaterecords.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="text-center animate-fade-in delay-200">
              <div className="bg-passionate-gray/20 border border-passionate-gray p-8 hover:border-passionate-red transition-all duration-300">
                <Phone className="h-12 w-12 text-passionate-red mx-auto mb-4" />
                <h3 className="font-syncopate font-bold text-passionate-white text-lg mb-2 tracking-wider">
                  CALL US
                </h3>
                <p className="text-passionate-white/70 mb-4">
                  Available Mon-Fri, 10AM-6PM IST
                </p>
                <a
                  href="tel:+919876543210"
                  className="text-passionate-red hover:text-passionate-red-dark transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="text-center animate-fade-in delay-400">
              <div className="bg-passionate-gray/20 border border-passionate-gray p-8 hover:border-passionate-red transition-all duration-300">
                <MapPin className="h-12 w-12 text-passionate-red mx-auto mb-4" />
                <h3 className="font-syncopate font-bold text-passionate-white text-lg mb-2 tracking-wider">
                  VISIT US
                </h3>
                <p className="text-passionate-white/70 mb-4">
                  Underground Studios
                </p>
                <address className="text-passionate-red not-italic">
                  Mumbai, Maharashtra<br />
                  India
                </address>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center animate-fade-in">
            <h2 className="font-syncopate font-bold text-3xl text-passionate-white mb-8 tracking-wider">
              FOLLOW THE
              <span className="bg-passionate-red text-passionate-white px-4 py-2 rounded-xl"> MOVEMENT</span>
            </h2>
            
            <div className="flex justify-center space-x-8 mb-12">
              <a
                href="https://instagram.com/passionaterecords"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2"
              >
                <div className="bg-passionate-gray/20 border border-passionate-gray p-4 group-hover:border-passionate-red group-hover:bg-passionate-red/10 transition-all duration-300">
                  <Instagram className="h-8 w-8 text-passionate-white group-hover:text-passionate-red transition-colors" />
                </div>
                <span className="text-passionate-white/70 group-hover:text-passionate-red transition-colors text-sm font-syncopate tracking-wider">
                  INSTAGRAM
                </span>
              </a>

              <a
                href="https://youtube.com/@passionaterecords"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2"
              >
                <div className="bg-passionate-gray/20 border border-passionate-gray p-4 group-hover:border-passionate-red group-hover:bg-passionate-red/10 transition-all duration-300">
                  <Youtube className="h-8 w-8 text-passionate-white group-hover:text-passionate-red transition-colors" />
                </div>
                <span className="text-passionate-white/70 group-hover:text-passionate-red transition-colors text-sm font-syncopate tracking-wider">
                  YOUTUBE
                </span>
              </a>

              <a
                href="https://twitter.com/passionate_rec"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2"
              >
                <div className="bg-passionate-gray/20 border border-passionate-gray p-4 group-hover:border-passionate-red group-hover:bg-passionate-red/10 transition-all duration-300">
                  <Twitter className="h-8 w-8 text-passionate-white group-hover:text-passionate-red transition-colors" />
                </div>
                <span className="text-passionate-white/70 group-hover:text-passionate-red transition-colors text-sm font-syncopate tracking-wider">
                  TWITTER
                </span>
              </a>
            </div>

            {/* CTA */}
            <div className="bg-passionate-gray/20 border border-passionate-gray p-8 max-w-2xl mx-auto">
              <h3 className="font-syncopate font-bold text-passionate-white text-xl mb-4 tracking-wider">
                READY TO JOIN THE REVOLUTION?
              </h3>
              <p className="text-passionate-white/70 mb-6">
                Whether you're an artist, producer, or music lover, there's a place for you in our underground collective.
              </p>
              <a
                href="/submit-demo"
                className="inline-block bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-8 py-4 tracking-wider transition-all duration-300 red-glow"
              >
                SUBMIT YOUR DEMO
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
