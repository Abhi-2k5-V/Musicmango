import React from 'react';
import { Mail, Phone } from 'lucide-react';
import logo from '../assets/logo.png';

const Instagram = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetDirections = (e) => {
    e.preventDefault();
    const isApple = typeof navigator !== 'undefined' && 
      (/iPad|iPhone|iPod|Macintosh|MacIntel|MacPPC|Mac68K/gi.test(navigator.userAgent || '') ||
       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    const url = isApple
      ? 'https://maps.apple.com/?ll=10.241333,76.264611'
      : 'https://maps.google.com/?q=10.241333,76.264611';
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-mango-black border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Footer CTA Block */}
        <div className="glass-premium rounded-3xl p-8 md:p-12 border border-white/10 mb-16 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative glowing backdrops */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-mango-gold/5 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-mango-red/5 rounded-full blur-[40px] pointer-events-none" />
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Ready to bring your audio and <br className="hidden sm:inline" />
            video project to life?
          </h3>
          <p className="text-gray-400 font-light text-sm max-w-xl mx-auto mb-8">
            Connect with our engineering and production team today. Let's discuss your custom pricing and options.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Call Now */}
            <a 
              href="tel:+919846495782"
              className="px-6 py-3.5 bg-gradient-to-r from-mango-gold to-mango-orange text-black font-bold rounded-xl text-xs uppercase tracking-wider hover:shadow-neon-gold hover:-translate-y-0.5 transition-all duration-300"
            >
              📞 Call Now
            </a>
            {/* Chat on WhatsApp */}
            <a 
              href="https://wa.me/919846495782"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              💬 Chat on WhatsApp
            </a>
            {/* Get Directions */}
            <button 
              onClick={handleGetDirections}
              className="px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:border-mango-orange hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              📍 Get Directions
            </button>
            {/* Send Email */}
            <a 
              href="mailto:musicmangoaudios@gmail.com"
              className="px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:border-mango-pink hover:-translate-y-0.5 transition-all duration-300"
            >
              📧 Send Email
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand/Logo Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Music Mango Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-display font-black text-lg tracking-wider bg-gradient-to-r from-mango-gold to-mango-orange bg-clip-text text-transparent">
                MUSIC MANGO
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
              Transforming your creative ideas into premium, studio-grade audio and video experiences.
            </p>
          </div>
 
          {/* Quick Links Column */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Our Services', href: '#services' },
                { name: 'Why Choose Us', href: '#why-us' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-mango-gold text-xs sm:text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Contact Details Column */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-xs sm:text-sm font-light">
                <span className="text-mango-gold flex-shrink-0 mt-0.5">📍</span>
                <div>
                  <p className="font-semibold text-white text-xs">Studio Location</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">10°14'28.8"N 76°15'52.6"E</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-xs sm:text-sm font-light">
                <span className="text-mango-gold flex-shrink-0 mt-0.5">📞</span>
                <div className="flex flex-col">
                  <a href="tel:+919495636565" className="hover:text-white transition-colors font-medium">+91 9495636565</a>
                  <a href="tel:+919846495782" className="hover:text-white transition-colors font-medium">+91 9846495782</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-xs sm:text-sm font-light">
                <span className="text-mango-green flex-shrink-0 mt-0.5">💬</span>
                <a href="https://wa.me/919846495782" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">WhatsApp: +91 9846495782</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-xs sm:text-sm font-light">
                <span className="text-mango-orange flex-shrink-0">📧</span>
                <a href="mailto:musicmangoaudios@gmail.com" className="hover:text-white transition-colors font-medium truncate">musicmangoaudios@gmail.com</a>
              </li>
            </ul>
          </div>
 
          {/* Connect Column */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">Socials</h4>
            <p className="text-gray-400 text-xs sm:text-sm font-light mb-4 leading-relaxed">
              Stay updated with our latest releases and behind-the-scenes on social media.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/music_mango_official" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-mango-pink flex items-center justify-center text-gray-400 hover:text-mango-pink transition-all duration-300 hover:scale-105"
                aria-label="Instagram Link"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
 
        </div>
 
        {/* Copyright divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            &copy; 2025 Music Mango Audio & Video Creations. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
