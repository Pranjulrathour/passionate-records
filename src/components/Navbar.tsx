
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut, isAdmin, loading } = useAuth();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ARTISTS', path: '/artists' },
    { name: 'RELEASES', path: '/releases' },
    { name: 'EVENTS', path: '/events' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'SERVICES', path: '/services' },
    { name: 'WHY US', path: '/why-us' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-passionate-black/95 backdrop-blur-sm border-b border-passionate-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/" 
              className="font-syncopate font-bold text-2xl text-passionate-white hover:text-passionate-red transition-colors duration-300"
            >
              PASSIONATE<span className="text-passionate-red">RECORDS</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link
                  to={link.path}
                  className={`font-syncopate font-bold text-sm tracking-wider transition-all duration-300 relative group ${
                    isActive(link.path)
                      ? 'text-passionate-red'
                      : 'text-passionate-white hover:text-passionate-red'
                  }`}
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-passionate-red"
                    initial={{ width: 0 }}
                    animate={{ width: isActive(link.path) ? '100%' : 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Authentication Section */}
            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-passionate-gray/30">
              {loading ? (
                <div className="text-passionate-white/50 text-sm">Loading...</div>
              ) : user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-passionate-white/70 text-sm">
                    Welcome, {profile?.full_name || user.email}
                  </span>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 px-3 py-2 text-sm bg-passionate-red/20 text-passionate-red border border-passionate-red rounded hover:bg-passionate-red hover:text-passionate-white transition-all duration-300"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  )}
                  <Button
                    onClick={signOut}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-passionate-red text-passionate-red hover:bg-passionate-red hover:text-passionate-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 px-4 py-2 bg-passionate-red text-passionate-white font-syncopate text-sm tracking-wider hover:bg-passionate-red/80 transition-all duration-300"
                >
                  <User className="h-4 w-4" />
                  <span>SIGN IN</span>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-passionate-white hover:text-passionate-red transition-colors duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-passionate-black/90 backdrop-blur-sm border-t border-passionate-gray/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      to={link.path}
                      onClick={toggleMenu}
                      className={`block px-3 py-2 font-syncopate font-bold text-sm tracking-wider transition-all duration-300 ${
                        isActive(link.path)
                          ? 'text-passionate-red bg-passionate-red/10'
                          : 'text-passionate-white hover:text-passionate-red hover:bg-passionate-red/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Authentication */}
                <div className="pt-4 mt-4 border-t border-passionate-gray/30">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-passionate-white/70 text-sm">
                        Welcome, {profile?.full_name || user.email}
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={toggleMenu}
                          className="block px-3 py-2 text-passionate-red font-syncopate text-sm tracking-wider"
                        >
                          ADMIN DASHBOARD
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          toggleMenu();
                        }}
                        className="block w-full text-left px-3 py-2 text-passionate-red font-syncopate text-sm tracking-wider"
                      >
                        SIGN OUT
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={toggleMenu}
                      className="block px-3 py-2 text-passionate-red font-syncopate text-sm tracking-wider"
                    >
                      SIGN IN
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
