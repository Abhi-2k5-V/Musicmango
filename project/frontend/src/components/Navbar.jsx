import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass py-2.5 shadow-lg' : 'bg-transparent py-4'
    }`}>
      {/* Contact Info Top Bar (smooth transition on scroll) */}
      <div className={`hidden md:block border-b border-white/5 transition-all duration-300 overflow-hidden ${
        isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-10 opacity-100 mb-2 pb-2'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-gray-400 font-light">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="text-mango-gold text-xs">📞</span>
              <a href="tel:+919495636565" className="hover:text-mango-gold transition-colors font-medium">+91 9495636565</a>
              <span className="text-gray-700">|</span>
              <a href="tel:+919846495782" className="hover:text-mango-gold transition-colors font-medium">+91 9846495782</a>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-mango-orange text-xs">📧</span>
              <a href="mailto:musicmangoaudios@gmail.com" className="hover:text-mango-orange transition-colors font-medium">musicmangoaudios@gmail.com</a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/music_mango_official" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-mango-pink transition-colors font-medium"
            >
              Instagram
            </a>
            <span className="text-gray-700">|</span>
            <a 
              href="https://wa.me/919846495782" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-mango-green transition-colors font-medium"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Music Mango Logo" 
                className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-display font-black text-xl tracking-wider bg-gradient-to-r from-mango-gold via-mango-orange to-mango-red bg-clip-text text-transparent">
                MUSIC MANGO
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-300 hover:text-mango-gold font-medium text-sm transition-colors duration-200 uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center gap-1 bg-gradient-to-r from-mango-gold to-mango-orange text-black font-semibold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:shadow-neon-gold transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 absolute top-full left-0 w-full py-4 px-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-300 hover:text-mango-gold text-lg font-medium py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full text-center bg-gradient-to-r from-mango-gold to-mango-orange text-black font-semibold py-3 rounded-full text-sm uppercase tracking-wider hover:shadow-neon-gold transition-all duration-200"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
