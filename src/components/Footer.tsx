
import { Music, Instagram, Youtube, Twitter, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-passionate-black border-t border-passionate-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 hover:opacity-80 transition-opacity">
              <img 
                src="/assets/VSICS (1).png" 
                alt="Passionate Records Logo" 
                className="h-8 sm:h-10 w-8 sm:w-10"
              />
              <span className="font-syncopate font-bold text-lg sm:text-xl lg:text-2xl text-passionate-white tracking-wider">
                PASSIONATE RECORDS
              </span>
            </Link>
            
            <p className="text-passionate-white/70 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed max-w-md">
              INDIA'S PREMIER UNDERGROUND MUSIC LABEL. WE DISCOVER, DEVELOP, AND PROMOTE THE MOST PASSIONATE ARTISTS 
              ACROSS ELECTRONIC, HIP-HOP, EXPERIMENTAL, AND AVANT-GARDE GENRES.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-4 sm:mb-6">
              <h4 className="font-syncopate font-bold text-passionate-white text-sm sm:text-base mb-2 sm:mb-3 tracking-wider">
                STAY IN THE LOOP
              </h4>
              <p className="text-passionate-white/60 text-xs sm:text-sm mb-3">
                GET THE LATEST RELEASES, ARTIST NEWS, AND EXCLUSIVE CONTENT.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="flex-1 bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-passionate-red transition-colors placeholder:text-passionate-white/40 text-sm sm:text-base rounded sm:rounded-none sm:rounded-l"
                />
                <button className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white px-4 sm:px-6 py-2 sm:py-3 font-syncopate font-bold text-xs sm:text-sm tracking-wider transition-colors rounded sm:rounded-none sm:rounded-r touch-manipulation">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1">
            <h4 className="font-syncopate font-bold text-passionate-white text-sm sm:text-base mb-4 sm:mb-6 tracking-wider">
              EXPLORE
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'HOME', path: '/' },
                { name: 'ARTISTS', path: '/artists' },
                { name: 'RELEASES', path: '/releases' },
                { name: 'SUBMIT DEMO', path: '/submit-demo' },
                { name: 'CONTACT', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-passionate-white/70 hover:text-passionate-red transition-colors duration-300 text-xs sm:text-sm touch-manipulation"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Contact & Social */}
          <div className="sm:col-span-1">
            <h4 className="font-syncopate font-bold text-passionate-white text-sm sm:text-base mb-4 sm:mb-6 tracking-wider">
              CONNECT
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <a
                href="mailto:info@passionaterecords.com"
                className="flex items-center space-x-2 sm:space-x-3 text-passionate-white/70 hover:text-passionate-red transition-colors duration-300 text-xs sm:text-sm touch-manipulation"
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">INFO@PASSIONATERECORDS.COM</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-2 sm:space-x-3 text-passionate-white/70 hover:text-passionate-red transition-colors duration-300 text-xs sm:text-sm touch-manipulation"
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <div className="text-passionate-white/50 text-xs">
                <p>MUMBAI, INDIA</p>
                <p>MON-FRI 10AM-6PM IST</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h5 className="font-syncopate font-bold text-passionate-white text-xs sm:text-sm mb-2 sm:mb-3 tracking-wider">
                FOLLOW US
              </h5>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="https://instagram.com/passionaterecords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300 touch-manipulation"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <a
                  href="https://youtube.com/@passionaterecords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300 touch-manipulation"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <a
                  href="https://twitter.com/passionate_rec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300 touch-manipulation"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-passionate-gray mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <p className="text-passionate-white/50 text-xs sm:text-sm text-center sm:text-left">
            © 2024 PASSIONATE RECORDS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-passionate-white/50 text-xs sm:text-sm text-center sm:text-right">
            AMPLIFYING UNDERGROUND VOICES SINCE 2024 ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
