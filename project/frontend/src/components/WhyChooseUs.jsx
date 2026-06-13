import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Film, Volume2, Zap, Tag, Users, Tv, Sliders } from 'lucide-react';

const REASONS = [
  {
    icon: <Cpu className="w-6 h-6 text-mango-gold" />,
    title: 'Industry-Standard Audio & Video',
    desc: 'Using cutting edge technology and professional tools to deliver high-quality media outputs.',
    accent: 'border-mango-gold/20 hover:border-mango-gold/50'
  },
  {
    icon: <Film className="w-6 h-6 text-mango-orange" />,
    title: 'Professional Film Editing Workflow',
    desc: 'Structured storytelling, color-grading, and post-production processes for seamless film delivery.',
    accent: 'border-mango-orange/20 hover:border-mango-orange/50'
  },
  {
    icon: <Volume2 className="w-6 h-6 text-mango-red" />,
    title: '5.1 Surround & DTS Mixing',
    desc: 'Advanced surround audio engineering, perfectly calibrated for cinematic and home-theatre spaces.',
    accent: 'border-mango-red/20 hover:border-mango-red/50'
  },
  {
    icon: <Zap className="w-6 h-6 text-mango-pink" />,
    title: 'Fast Turnaround Time',
    desc: 'Prompt and highly efficient production timelines to launch your projects without delay.',
    accent: 'border-mango-pink/20 hover:border-mango-pink/50'
  },
  {
    icon: <Tag className="w-6 h-6 text-mango-green" />,
    title: 'Affordable Pricing',
    desc: 'Flexible and highly competitive package rates that match creators, indie artists, and brands.',
    accent: 'border-mango-green/20 hover:border-mango-green/50'
  },
  {
    icon: <Users className="w-6 h-6 text-mango-gold" />,
    title: 'Creative & Experienced Team',
    desc: 'Seasoned professionals with extensive experience in the film, audio, and advertising industries.',
    accent: 'border-mango-gold/20 hover:border-mango-gold/50'
  },
  {
    icon: <Tv className="w-6 h-6 text-mango-orange" />,
    title: 'Cinema and OTT Ready',
    desc: 'Content engineered to match technical standards required by theatres, OTT platforms, and broadcasters.',
    accent: 'border-mango-orange/20 hover:border-mango-orange/50'
  },
  {
    icon: <Sliders className="w-6 h-6 text-mango-red" />,
    title: 'High-Quality Audio Mastering',
    desc: 'Adding that final polish to your audio for maximum punch, clarity, and streaming platform optimization.',
    accent: 'border-mango-red/20 hover:border-mango-red/50'
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 bg-mango-dark grid-bg">
      {/* Decorative glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-mango-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-mango-gold"></span>
              <span className="text-mango-gold uppercase tracking-widest text-sm font-semibold">Our Edge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase leading-tight">
              Why Choose <br />
              <span className="bg-gradient-to-r from-mango-orange via-mango-red to-mango-pink bg-clip-text text-transparent">
                Music Mango?
              </span>
            </h2>
            <p className="text-gray-400 font-light text-base leading-relaxed mb-6">
              We provide the expertise, technical precision, and creative passion required to make your project stand out.
            </p>
            <div className="p-5 border border-white/5 bg-white/5 rounded-2xl glass">
              <p className="text-xs text-gray-500 italic">"Our commitment is delivering high-impact, premium media. Every detail of your music or video is engineered for maximum performance and emotional resonance."</p>
              <p className="text-xs text-white font-semibold mt-3">— Music Mango Team</p>
            </div>
          </div>

          {/* Right Column: Grid of 8 Reasons */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {REASONS.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`p-6 rounded-2xl glass border transition-all duration-300 ${reason.accent} hover:bg-white/5`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 border border-white/10">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{reason.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">{reason.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
