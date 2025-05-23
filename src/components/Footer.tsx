
import { Music, Instagram, Youtube, Twitter, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-passionate-black border-t border-passionate-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <Music className="h-8 w-8 text-passionate-red" />
              <span className="font-syncopate font-bold text-2xl text-passionate-white tracking-wider">
                PASSIONATE RECORDS
              </span>
            </Link>
            
            <p className="text-passionate-white/70 mb-6 leading-relaxed max-w-md">
              India's premier indie music label. We discover, develop, and promote the most passionate artists in the underground scene.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-syncopate font-bold text-passionate-white mb-3 tracking-wider">
                STAY UPDATED
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors"
                />
                <button className="bg-passionate-red hover:bg-passionate-red-dark text-passionate-white px-6 py-3 font-syncopate font-bold text-sm tracking-wider transition-colors">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-syncopate font-bold text-passionate-white mb-6 tracking-wider">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
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
                    className="text-passionate-white/70 hover:text-passionate-red transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-syncopate font-bold text-passionate-white mb-6 tracking-wider">
              CONNECT
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:info@passionaterecords.com"
                className="flex items-center space-x-3 text-passionate-white/70 hover:text-passionate-red transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                <span>info@passionaterecords.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-3 text-passionate-white/70 hover:text-passionate-red transition-colors duration-300"
              >
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/passionaterecords"
                target="_blank"
                rel="noopener noreferrer"
                className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/@passionaterecords"
                target="_blank"
                rel="noopener noreferrer"
                className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/passionate_rec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-passionate-white/50 hover:text-passionate-red transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-passionate-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-passionate-white/50 text-sm">
            © 2024 Passionate Records. All rights reserved.
          </p>
          <p className="text-passionate-white/50 text-sm mt-4 md:mt-0">
            Made with ❤️ for the underground music scene
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
