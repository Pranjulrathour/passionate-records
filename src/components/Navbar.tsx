
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ARTISTS', path: '/artists' },
    { name: 'RELEASES', path: '/releases' },
    { name: 'SUBMIT DEMO', path: '/submit-demo' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-passionate-black/90 backdrop-blur-sm border-b border-passionate-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Music className="h-8 w-8 text-passionate-red group-hover:animate-pulse" />
            <span className="font-syncopate font-bold text-xl text-passionate-white tracking-wider">
              PASSIONATE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-syncopate text-sm tracking-wider transition-all duration-300 hover:text-passionate-red ${
                  isActive(item.path) 
                    ? 'text-passionate-red border-b-2 border-passionate-red' 
                    : 'text-passionate-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-passionate-white hover:text-passionate-red transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-passionate-black border-t border-passionate-gray">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 font-syncopate text-sm tracking-wider transition-all duration-300 hover:text-passionate-red ${
                    isActive(item.path) ? 'text-passionate-red' : 'text-passionate-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
