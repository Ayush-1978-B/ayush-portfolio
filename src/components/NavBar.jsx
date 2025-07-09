import React, { useState, useEffect } from 'react';
import { navLinks } from '../constants/Index';
import HireMeButton from './HireMeButton';
import '../index.css';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (name) => {
    document.title = `${name} | Ayush Yadav`;
    setActive(name);
    setMobileOpen(false);
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a 
            href="#hero" 
            className="logo text-white text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2" 
            onClick={() => handleNavClick('Home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Ayush
            </span>
            <span className="text-white">Yadav</span>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-8">
              {navLinks.map(({ link, name }) => (
                <li key={name}>
                  <motion.a
                    href={link}
                    onClick={() => handleNavClick(name)}
                    className={`relative px-3 py-2 font-medium text-sm transition-all duration-300 rounded-lg ${
                      active === name 
                        ? 'text-pink-400 bg-pink-500/10' 
                        : 'text-white/80 hover:text-pink-400 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {name}
                    {active === name && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded"
                      />
                    )}
                  </motion.a>
              </li>
            ))}
          </ul>
            <div className="ml-4">
              <HireMeButton />
            </div>
        </nav>

          {/* Mobile Hamburger */}
          <motion.button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiMenu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <Transition appear show={mobileOpen} as={React.Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 lg:hidden" onClose={() => setMobileOpen(false)}>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md" aria-hidden="true" />
              </Transition.Child>

              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-sm bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-white text-xl font-bold">Menu</span>
                      <motion.button
                        className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <HiX className="w-6 h-6" />
                      </motion.button>
                    </div>
                    
                    <nav className="space-y-4">
                      {navLinks.map(({ link, name }) => (
                        <motion.a
                          key={name}
                          href={link}
                          onClick={() => handleNavClick(name)}
                          className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                            active === name 
                              ? 'text-pink-400 bg-pink-500/10 border border-pink-500/20' 
                              : 'text-white/80 hover:text-pink-400 hover:bg-white/5'
                          }`}
                          whileHover={{ x: 8 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {name}
                        </motion.a>
                      ))}
                    </nav>
                    
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <HireMeButton />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default NavBar;