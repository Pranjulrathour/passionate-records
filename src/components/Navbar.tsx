
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, profile, signOut, isAdmin, loading } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Artists', path: '/artists' },
    { name: 'Releases', path: '/releases' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-passionate-black/80 backdrop-blur-xl border-b border-passionate-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0 -ml-2 sm:-ml-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/VSICS (1).png" 
                alt="Passionate Records" 
                className="h-8 sm:h-10 lg:h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1 xl:space-x-2 bg-passionate-white/5 backdrop-blur-md rounded-full px-2 py-1 border border-passionate-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-passionate-white bg-passionate-red/80 shadow-lg'
                      : 'text-passionate-white/70 hover:text-passionate-white hover:bg-passionate-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section - Right Side */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0">
            {loading ? (
              <div className="w-6 h-6 xl:w-8 xl:h-8 border-2 border-passionate-red/30 border-t-passionate-red rounded-full animate-spin" />
            ) : user ? (
              <div className="flex items-center space-x-2 xl:space-x-3">
                <div className="text-passionate-white/70 text-xs xl:text-sm font-medium max-w-24 xl:max-w-none truncate">
                  {profile?.full_name || user.email}
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="p-1.5 xl:p-2 bg-passionate-white/5 backdrop-blur-md text-passionate-red rounded-full border border-passionate-white/10 hover:bg-passionate-red hover:text-passionate-white transition-all duration-300"
                  >
                    <Settings className="h-3 w-3 xl:h-4 xl:w-4" />
                  </Link>
                )}
                <Button
                  onClick={signOut}
                  variant="ghost"
                  size="sm"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 bg-passionate-white/5 backdrop-blur-md text-passionate-white/70 hover:text-passionate-white hover:bg-passionate-white/10 rounded-full border border-passionate-white/10 transition-all duration-300 text-xs xl:text-sm"
                >
                  <LogOut className="h-3 w-3 xl:h-4 xl:w-4" />
                </Button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-1.5 xl:space-x-2 px-4 xl:px-6 py-1.5 xl:py-2 bg-passionate-red/80 backdrop-blur-md text-passionate-white text-xs xl:text-sm font-medium rounded-full border border-passionate-red/30 hover:bg-passionate-red transition-all duration-300 shadow-lg"
              >
                <User className="h-3 w-3 xl:h-4 xl:w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 bg-passionate-white/5 backdrop-blur-md text-passionate-white hover:bg-passionate-white/10 rounded-full border border-passionate-white/10 transition-all duration-300 touch-manipulation"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-passionate-black/95 backdrop-blur-xl border-t border-passionate-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 touch-manipulation ${
                      isActive(link.path)
                        ? 'text-passionate-white bg-passionate-red/20 border border-passionate-red/30'
                        : 'text-passionate-white/70 hover:text-passionate-white hover:bg-passionate-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Auth */}
                <div className="pt-4 mt-4 border-t border-passionate-white/10">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-passionate-white/70 text-sm truncate">
                        {profile?.full_name || user.email}
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-2 px-4 py-3 text-passionate-red text-base font-medium hover:bg-passionate-red/10 rounded-xl transition-all duration-300 touch-manipulation"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full text-left px-4 py-3 text-passionate-red text-base font-medium hover:bg-passionate-red/10 rounded-xl transition-all duration-300 touch-manipulation"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-passionate-red text-passionate-white text-base font-medium rounded-xl text-center hover:bg-passionate-red/80 transition-all duration-300 touch-manipulation"
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
              </div>
      </nav>
    );
  };

  export default Navbar;
