import React from 'react';
import { motion } from 'framer-motion';
import { 
  Music, Mic, Disc, Video, Tv, 
  Volume2, Radio, Sliders, Film 
} from 'lucide-react';

const SERVICES = [
  {
    title: 'Professional Film Editing',
    description: 'Feature, short & documentary editing, trailer cuts, music videos, YouTube editing, color grading & VFX integration.',
    bullets: ['Feature & Short Films', 'Color Correction & Grading', 'VFX & Motion Graphics', 'YouTube & Social Video'],
    icon: <Film className="w-8 h-8 text-mango-gold" />,
    hoverClass: 'hover-neon-gold',
    borderColor: 'group-hover:border-mango-gold/40'
  },
  {
    title: '5.1 Surround Sound Mixing',
    description: 'Immersive cinematic audio mixing for films, advertisements, and digital content. Theatre-ready, Dolby-compatible delivery.',
    bullets: ['Cinematic Sound Mixing', 'Dolby-Compatible Prep', 'Immersive Experience', 'Theatre-Ready Audio'],
    icon: <Volume2 className="w-8 h-8 text-mango-orange" />,
    hoverClass: 'hover-neon-orange',
    borderColor: 'group-hover:border-mango-orange/40'
  },
  {
    title: 'DTS Audio Mixing',
    description: 'High-quality DTS-compatible spatial audio with precise sound positioning. Optimized for cinema, home theatre, and streaming.',
    bullets: ['DTS-Compatible Mix', 'Spatial Sound FX', 'Cinema & Home Theatre', 'Streaming Optimization'],
    icon: <Disc className="w-8 h-8 text-mango-red" />,
    hoverClass: 'hover-neon-red',
    borderColor: 'group-hover:border-mango-red/40'
  },
  {
    title: 'Stereo Mixing & Mastering',
    description: 'Professional music mixing, loudness optimization, and broadcast-ready mastering for albums, singles, and digital platforms.',
    bullets: ['Professional Music Mix', 'Loudness Optimization', 'Broadcast-Ready Masters', 'Album & Single Mastering'],
    icon: <Sliders className="w-8 h-8 text-mango-pink" />,
    hoverClass: 'hover-neon-pink',
    borderColor: 'group-hover:border-mango-pink/40'
  },
  {
    title: 'Film Audio Post-Production',
    description: 'Dialogue editing, noise reduction, foley recording, custom sound effects, and complete audio restoration.',
    bullets: ['Dialogue & Foley', 'Noise Reduction & Cleanup', 'Sound Effects (SFX)', 'Audio Restoration'],
    icon: <Mic className="w-8 h-8 text-mango-green" />,
    hoverClass: 'hover:shadow-[0_0_15px_rgba(149,179,0,0.5)] hover:border-mango-green',
    borderColor: 'group-hover:border-mango-green/40'
  },
  {
    title: 'Movie Sound Design',
    description: 'Creating atmospheric depth, custom action-scene sound effects, environmental layers, and mood enhancement.',
    bullets: ['Cinematic Sound Design', 'Action Scene Sound FX', 'Environmental Ambiences', 'Atmosphere & Mood'],
    icon: <Radio className="w-8 h-8 text-mango-gold" />,
    hoverClass: 'hover-neon-gold',
    borderColor: 'group-hover:border-mango-gold/40'
  },
  {
    title: 'Background Score & Music',
    description: 'Original background music and score compositions, jingles, commercial themes, and podcast audio production.',
    bullets: ['Original Background Score', 'Film Score Composition', 'Jingles & Ad Music', 'Podcast Audio Setup'],
    icon: <Music className="w-8 h-8 text-mango-orange" />,
    hoverClass: 'hover-neon-orange',
    borderColor: 'group-hover:border-mango-orange/40'
  },
  {
    title: 'Audio Recording Services',
    description: 'Studio-quality recording for vocals, instruments, voice-overs, dubbing, podcasts, and narrations.',
    bullets: ['Vocal & Voice-over Tracking', 'Dubbing Services', 'Podcast Recording', 'Narration Recording'],
    icon: <Mic className="w-8 h-8 text-mango-red" />,
    hoverClass: 'hover-neon-red',
    borderColor: 'group-hover:border-mango-red/40'
  },
  {
    title: 'Video Production Services',
    description: 'Full-service creation of corporate videos, promo clips, commercial ads, social media reels, and event highlights.',
    bullets: ['Corporate & Promo Videos', 'Commercial Ads', 'Social Reels & Shorts', 'YouTube Content'],
    icon: <Video className="w-8 h-8 text-mango-pink" />,
    hoverClass: 'hover-neon-pink',
    borderColor: 'group-hover:border-mango-pink/40'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-mango-dark grid-bg">
      {/* Decorative glow top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mango-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-mango-orange"></span>
            <span className="text-mango-orange uppercase tracking-widest text-sm font-semibold">Our Expertise</span>
            <span className="h-[2px] w-8 bg-mango-orange"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
            Professional{' '}
            <span className="bg-gradient-to-r from-mango-gold to-mango-red bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4 text-sm sm:text-base font-light">
            Music Mango delivers state-of-the-art media services to create high-impact, immersive experiences.
          </p>
        </div>

        {/* Services Grid (Symmetrical 3 Columns) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group glass rounded-2xl p-8 flex flex-col justify-between border border-white/5 cursor-pointer ${service.hoverClass}`}
            >
              <div>
                {/* Icon Wrapper with bounce effect on hover */}
                <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-all duration-300 ${service.borderColor} group-hover:bg-white/10`}>
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide uppercase transition-colors duration-200">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Sub-services bullets as small tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.bullets.map((bullet, bIdx) => (
                    <span 
                      key={bIdx} 
                      className="text-[10px] uppercase font-medium tracking-wider px-2.5 py-1 bg-white/5 border border-white/5 text-gray-300 rounded-md group-hover:bg-white/10 group-hover:border-white/10 transition-colors"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Bottom decorative color line indicator */}
              <div className="w-12 h-1 bg-white/10 rounded-full mt-4 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-mango-orange group-hover:to-mango-gold transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
