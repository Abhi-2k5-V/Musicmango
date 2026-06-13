import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Video, Radio, Flame } from 'lucide-react';
import aboutImg from '../assets/about.png';

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-mango-black overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-mango-orange/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[2px] w-8 bg-mango-gold"></span>
                <span className="text-mango-gold uppercase tracking-widest text-sm font-semibold">About Music Mango</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 tracking-tight uppercase leading-snug">
                Professional Movie Editing, <br />
                <span className="bg-gradient-to-r from-mango-gold via-mango-orange to-mango-red bg-clip-text text-transparent">
                  5.1 Surround Sound, DTS Mixing & Audio Post-Production
                </span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 font-light">
                Music Mango delivers professional film editing, video production, 5.1 surround sound mixing, DTS audio mixing, stereo mixing & mastering, sound design, dubbing, background score production, and complete audio post-production services. We create immersive cinematic experiences for films, advertisements, YouTube creators, businesses, and digital media platforms.
              </p>
            </motion.div>

            {/* Micro features list */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Mic className="w-5 h-5 text-mango-gold" />, title: 'Pro Audio', text: 'Mixing, mastering & recording' },
                { icon: <Video className="w-5 h-5 text-mango-orange" />, title: 'Video & Film', text: 'Editing & content creation' },
                { icon: <Radio className="w-5 h-5 text-mango-red" />, title: 'Sound Design', text: 'Foley, FX & soundscapes' },
                { icon: <Flame className="w-5 h-5 text-mango-pink" />, title: 'Creative Media', text: 'Socials & promotional videos' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-normal">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image/Visual Panel */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-mango-orange/5 group"
            >
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
              <img 
                src={aboutImg} 
                alt="Music Mango Studio Control Room" 
                className="w-full h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200'; // fallback
                }}
              />
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 z-20 glass p-5 rounded-xl border border-white/10">
                <p className="text-sm font-semibold uppercase text-mango-gold tracking-wider mb-1">State-of-the-Art Gear</p>
                <p className="text-xs text-gray-300">Providing industry-standard mixing, mastering, and cinematography tools to deliver pristine digital media.</p>
              </div>
            </motion.div>
            
            {/* Accent pink line behind the image to reflect the logo theme */}
            <div className="absolute -bottom-4 -right-4 w-1/2 h-[3px] bg-mango-pink rounded-full blur-[1px] pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-[3px] h-1/2 bg-mango-gold rounded-full blur-[1px] pointer-events-none" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
