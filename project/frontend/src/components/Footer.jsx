import React from 'react';
import logo from '../assets/logo.png';

export default function Footer() {
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            {/* Go to Contact Page */}
            <a 
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:border-mango-orange hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              ✉ Send an Inquiry
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
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
