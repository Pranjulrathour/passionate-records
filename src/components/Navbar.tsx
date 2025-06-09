
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
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0 -ml-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/VSICS (1).png" 
                alt="Passionate Records" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-2 bg-passionate-white/5 backdrop-blur-md rounded-full px-2 py-1 border border-passionate-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
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
              <div className="w-8 h-8 border-2 border-passionate-red/30 border-t-passionate-red rounded-full animate-spin" />
            ) : user ? (
              <div className="flex items-center space-x-3">
                <div className="text-passionate-white/70 text-sm font-medium">
                  {profile?.full_name || user.email}
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 bg-passionate-white/5 backdrop-blur-md text-passionate-red rounded-full border border-passionate-white/10 hover:bg-passionate-red hover:text-passionate-white transition-all duration-300"
                  >
                    <Settings className="h-4 w-4" />
                  </Link>
                )}
                <Button
                  onClick={signOut}
                  variant="ghost"
                  size="sm"
                  className="px-4 py-2 bg-passionate-white/5 backdrop-blur-md text-passionate-white/70 hover:text-passionate-white hover:bg-passionate-white/10 rounded-full border border-passionate-white/10 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 px-6 py-2 bg-passionate-red/80 backdrop-blur-md text-passionate-white text-sm font-medium rounded-full border border-passionate-red/30 hover:bg-passionate-red transition-all duration-300 shadow-lg"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 bg-passionate-white/5 backdrop-blur-md text-passionate-white hover:bg-passionate-white/10 rounded-full border border-passionate-white/10 transition-all duration-300"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-passionate-white/10 mt-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-passionate-white bg-passionate-red/20'
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
                  <div className="px-4 py-2 text-passionate-white/70 text-sm">
                    {profile?.full_name || user.email}
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-passionate-red text-sm font-medium hover:bg-passionate-red/10 rounded-xl transition-all duration-300"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-passionate-red text-sm font-medium hover:bg-passionate-red/10 rounded-xl transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 bg-passionate-red text-passionate-white text-sm font-medium rounded-xl text-center hover:bg-passionate-red/80 transition-all duration-300"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
              </div>
      </nav>
    );
  };

  export default Navbar;
