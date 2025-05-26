
import { Music, Instagram, Youtube, Twitter, Mail, Phone, Disc3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-passionate-black border-t border-passionate-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <Disc3 className="h-8 w-8 text-passionate-red" />
              <span className="font-syncopate font-bold text-2xl text-passionate-white tracking-wider">
                PASSIONATE RECORDS
              </span>
            </Link>
            
            <p className="text-passionate-white/70 mb-6 leading-relaxed max-w-md">
              INDIA'S PREMIER UNDERGROUND MUSIC LABEL. WE DISCOVER, DEVELOP, AND PROMOTE THE MOST PASSIONATE ARTISTS 
              ACROSS ELECTRONIC, HIP-HOP, EXPERIMENTAL, AND AVANT-GARDE GENRES.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-syncopate font-bold text-passionate-white mb-3 tracking-wider">
                STAY IN THE LOOP
              </h4>
              <p className="text-passionate-white/60 text-sm mb-3">
                GET THE LATEST RELEASES, ARTIST NEWS, AND EXCLUSIVE CONTENT.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="flex-1 bg-passionate-gray/20 border border-passionate-gray text-passionate-white px-4 py-3 focus:outline-none focus:border-passionate-red transition-colors placeholder:text-passionate-white/40"
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
              EXPLORE
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
                    className="text-passionate-white/70 hover:text-passionate-red transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h5 className="font-syncopate font-bold text-passionate-white text-sm mb-3 tracking-wider">
                GENRES
              </h5>
              <ul className="space-y-2">
                {['ELECTRONIC', 'HIP-HOP', 'EXPERIMENTAL', 'AMBIENT', 'DUBSTEP'].map((genre) => (
                  <li key={genre}>
                    <span className="text-passionate-white/50 text-xs hover:text-passionate-red transition-colors cursor-pointer">
                      {genre}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
                className="flex items-center space-x-3 text-passionate-white/70 hover:text-passionate-red transition-colors duration-300 text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>INFO@PASSIONATERECORDS.COM</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-3 text-passionate-white/70 hover:text-passionate-red transition-colors duration-300 text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </a>
              <div className="text-passionate-white/50 text-xs">
                <p>MUMBAI, INDIA</p>
                <p>MON-FRI 10AM-6PM IST</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h5 className="font-syncopate font-bold text-passionate-white text-sm mb-3 tracking-wider">
                FOLLOW US
              </h5>
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
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-passionate-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-passionate-white/50 text-sm">
            © 2024 PASSIONATE RECORDS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-passionate-white/50 text-sm mt-4 md:mt-0">
            AMPLIFYING UNDERGROUND VOICES SINCE 2024 ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
