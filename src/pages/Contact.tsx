
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-passionate-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 passionate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syncopate font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-passionate-white mb-4 sm:mb-6 tracking-wider animate-slide-up leading-tight">
            GET IN
            <span className="bg-passionate-red text-passionate-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl block sm:inline mt-2 sm:mt-0"> TOUCH</span>
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-passionate-red mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-passionate-white/70 max-w-2xl lg:max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Ready to collaborate? Have questions? Want to join the revolution? Let's connect and create something legendary.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Email */}
            <div className="text-center animate-fade-in">
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6 sm:p-8 hover:border-passionate-red transition-all duration-300 rounded-xl sm:rounded-2xl touch-manipulation">
                <Mail className="h-10 w-10 sm:h-12 sm:w-12 text-passionate-red mx-auto mb-3 sm:mb-4" />
                <h3 className="font-syncopate font-bold text-passionate-white text-base sm:text-lg mb-2 tracking-wider">
                  EMAIL US
                </h3>
                <p className="text-passionate-white/70 mb-3 sm:mb-4 text-sm sm:text-base">
                  For business inquiries and partnerships
                </p>
                <a
                  href="mailto:info@passionaterecords.com"
                  className="text-passionate-red hover:text-passionate-red-dark transition-colors text-sm sm:text-base break-all touch-manipulation"
                >
                  info@passionaterecords.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="text-center animate-fade-in delay-200">
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6 sm:p-8 hover:border-passionate-red transition-all duration-300 rounded-xl sm:rounded-2xl touch-manipulation">
                <Phone className="h-10 w-10 sm:h-12 sm:w-12 text-passionate-red mx-auto mb-3 sm:mb-4" />
                <h3 className="font-syncopate font-bold text-passionate-white text-base sm:text-lg mb-2 tracking-wider">
                  CALL US
                </h3>
                <p className="text-passionate-white/70 mb-3 sm:mb-4 text-sm sm:text-base">
                  Available Mon-Fri, 10AM-6PM IST
                </p>
                <a
                  href="tel:+919876543210"
                  className="text-passionate-red hover:text-passionate-red-dark transition-colors text-sm sm:text-base touch-manipulation"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="text-center animate-fade-in delay-400 sm:col-span-2 lg:col-span-1">
              <div className="bg-passionate-gray/20 border border-passionate-gray p-6 sm:p-8 hover:border-passionate-red transition-all duration-300 rounded-xl sm:rounded-2xl touch-manipulation">
                <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-passionate-red mx-auto mb-3 sm:mb-4" />
                <h3 className="font-syncopate font-bold text-passionate-white text-base sm:text-lg mb-2 tracking-wider">
                  VISIT US
                </h3>
                <p className="text-passionate-white/70 mb-3 sm:mb-4 text-sm sm:text-base">
                  Underground Studios
                </p>
                <address className="text-passionate-red not-italic text-sm sm:text-base">
                  Mumbai, Maharashtra<br />
                  India
                </address>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center animate-fade-in">
            <h2 className="font-syncopate font-bold text-xl sm:text-2xl lg:text-3xl text-passionate-white mb-6 sm:mb-8 tracking-wider leading-tight">
              FOLLOW THE
              <span className="bg-passionate-red text-passionate-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl block sm:inline mt-2 sm:mt-0"> MOVEMENT</span>
            </h2>
            
            <div className="flex justify-center space-x-6 sm:space-x-8 mb-8 sm:mb-12">
              <a
                href="https://instagram.com/passionaterecords"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2 touch-manipulation"
              >
                <div className="bg-passionate-gray/20 border border-passionate-gray p-3 sm:p-4 group-hover:border-passionate-red group-hover:bg-passionate-red/10 transition-all duration-300 rounded-lg sm:rounded-xl">
                  <Instagram className="h-6 w-6 sm:h-8 sm:w-8 text-passionate-white group-hover:text-passionate-red transition-colors" />
                </div>
                <span className="text-passionate-white/70 group-hover:text-passionate-red transition-colors text-xs sm:text-sm font-syncopate tracking-wider">
                  INSTAGRAM
                </span>
              </a>

              <a
                href="https://youtube.com/@passionaterecords"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2 touch-manipulation"
              >
                <div className="bg-passionate-gray/20 border border-passionate-gray p-3 sm:p-4 group-hover:border-passionate-red group-hover:bg-passionate-red/10 transition-all duration-300 rounded-lg sm:rounded-xl">
                  <Youtube className="h-6 w-6 sm:h-8 sm:w-8 text-passionate-white group-hover:text-passionate-red transition-colors" />
                </div>
                <span className="text-passionate-white/70 group-hover:text-passionate-red transition-colors text-xs sm:text-sm font-syncopate tracking-wider">
                  YOUTUBE
                </span>
              </a>

              <a
                href="https://twitter.com/passionate_rec"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2 touch-manipulation"
              >
                <div className="bg-passionate-gray/20 border border-passionate-gray p-3 sm:p-4 group-hover:border-passionate-red group-hover:bg-passionate-red/10 transition-all duration-300 rounded-lg sm:rounded-xl">
                  <Twitter className="h-6 w-6 sm:h-8 sm:w-8 text-passionate-white group-hover:text-passionate-red transition-colors" />
                </div>
                <span className="text-passionate-white/70 group-hover:text-passionate-red transition-colors text-xs sm:text-sm font-syncopate tracking-wider">
                  TWITTER
                </span>
              </a>
            </div>

            {/* CTA */}
            <div className="bg-passionate-gray/20 border border-passionate-gray p-6 sm:p-8 max-w-xl sm:max-w-2xl mx-auto rounded-xl sm:rounded-2xl">
              <h3 className="font-syncopate font-bold text-passionate-white text-lg sm:text-xl mb-3 sm:mb-4 tracking-wider leading-tight">
                READY TO JOIN THE REVOLUTION?
              </h3>
              <p className="text-passionate-white/70 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Whether you're an artist, producer, or music lover, there's a place for you in our underground collective.
              </p>
              <a
                href="/submit-demo"
                className="inline-block bg-passionate-red hover:bg-passionate-red-dark text-passionate-white font-syncopate font-bold px-6 sm:px-8 py-3 sm:py-4 tracking-wider transition-all duration-300 red-glow rounded-lg sm:rounded-xl text-sm sm:text-base touch-manipulation min-h-[44px]"
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
