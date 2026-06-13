import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Waveform from './Waveform';
import FloatingNotes from './FloatingNotes';
import logo from '../assets/logo.png';

export default function Hero() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full max-w-none min-h-screen flex items-center justify-center overflow-hidden pt-20 grid-bg z-10"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-mango-black z-0 pointer-events-none" />
      <FloatingNotes />
      <Waveform />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <img 
            src={logo} 
            alt="Music Mango Logo" 
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain filter drop-shadow-[0_0_20px_rgba(246,192,0,0.4)]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase"
        >
          Transforming Ideas into Stunning <br />
          <span className="bg-gradient-to-r from-mango-gold via-mango-orange to-mango-red bg-clip-text text-transparent">
            Audio & Visual
          </span>{' '}
          Experiences
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mb-10 leading-relaxed font-light"
        >
          Professional Audio Production, Video Creation, Editing, Mixing, Mastering & Creative Media Solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#contact"
            onClick={scrollToContact}
            className="px-8 py-4 bg-gradient-to-r from-mango-gold to-mango-orange text-black font-semibold rounded-full uppercase tracking-wider text-sm shadow-lg hover:shadow-neon-gold hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Book Your Project
            <Play className="w-4 h-4 fill-black" />
          </a>
        </motion.div>


      </div>

      {/* Decorative side accent lines */}
      <div className="absolute top-1/4 left-0 w-24 h-[1px] bg-gradient-to-r from-mango-gold to-transparent opacity-30 hidden lg:block" />
      <div className="absolute top-1/3 right-0 w-24 h-[1px] bg-gradient-to-l from-mango-red to-transparent opacity-30 hidden lg:block" />
    </section>
  );
}
