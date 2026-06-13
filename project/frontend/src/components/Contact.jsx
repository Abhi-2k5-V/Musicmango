import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const Instagram = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const SERVICES_LIST = [
  'Professional Film Editing',
  '5.1 Surround Sound Mixing',
  'DTS Audio Mixing',
  'Stereo Mixing & Mastering',
  'Film Audio Post-Production',
  'Movie Sound Design',
  'Background Score & Music Production',
  'Audio Recording Services',
  'Video Production Services',
  'Other / Custom Inquiry'
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
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
    <section id="contact" className="relative py-24 bg-mango-black overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-mango-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-mango-red/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-mango-red"></span>
            <span className="text-mango-red uppercase tracking-widest text-sm font-semibold">Get in Touch</span>
            <span className="h-[2px] w-8 bg-mango-red"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-tight">
            Ready to Start{' '}
            <span className="bg-gradient-to-r from-mango-gold via-mango-orange to-mango-pink bg-clip-text text-transparent">
              Your Production?
            </span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl mt-4">
            Submit an inquiry through our contact form, or find our studio location and navigate directly using Apple or Google Maps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Inquire Now</h3>
                  <p className="text-gray-400 text-xs mt-1 font-light">Fields marked with * are required.</p>
                </div>

                {/* Status Messages */}
                {status.success && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Inquiry submitted successfully! We will contact you shortly.</span>
                  </div>
                )}
                {status.error && (
                  <div className="flex items-center gap-3 p-4 bg-mango-red/10 border border-mango-red/20 text-mango-red rounded-xl text-sm animate-fade-in">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-wider text-gray-400 font-medium">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-mango-gold focus:ring-1 focus:ring-mango-gold transition-all duration-200 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-400 font-medium">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-mango-orange focus:ring-1 focus:ring-mango-orange transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-wider text-gray-400 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      pattern="^[0-9+\s\-()]{10,15}$"
                      title="Phone number must be between 10 and 15 digits"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 99999 99999"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-mango-red focus:ring-1 focus:ring-mango-red transition-all duration-200 text-sm"
                    />
                  </div>

                  {/* Service Required */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="text-xs uppercase tracking-wider text-gray-400 font-medium">Service Required *</label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-mango-black border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:border-mango-pink focus:ring-1 focus:ring-mango-pink transition-all duration-200 text-sm"
                      >
                        <option value="" disabled>Select a Service</option>
                        {SERVICES_LIST.map((srv, index) => (
                          <option key={index} value={srv} className="bg-mango-black">{srv}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-wider text-gray-400 font-medium">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and deadline..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-mango-gold focus:ring-1 focus:ring-mango-gold transition-all duration-200 text-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-gradient-to-r from-mango-gold to-mango-orange text-black font-bold py-4 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:shadow-neon-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Start Your Production
                      <Send className="w-4 h-4 fill-black" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Map & Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Embedded Location Map */}
            <div className="glass rounded-3xl p-5 border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white text-sm font-bold uppercase tracking-wider">Studio Location</h4>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-400 font-light">
                  10.241333, 76.264611
                </span>
              </div>
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 relative shadow-lg mb-3">
                <iframe 
                  title="Music Mango Studio Location"
                  src="https://maps.google.com/maps?q=10.241333,76.264611&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-gray-500 text-center font-light">
                📍 Coordinates: 10°14'28.8"N 76°15'52.6"E
              </p>
            </div>

            {/* Smart Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={handleGetDirections}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-mango-gold to-mango-orange text-black font-semibold rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-neon-gold hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                📍 Get Directions
              </button>
              <a 
                href="https://wa.me/919846495782"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-xl text-xs uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                💬 WhatsApp Us
              </a>
              <a 
                href="https://maps.google.com/?q=10.241333,76.264611"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mango-orange text-white font-semibold rounded-xl text-[10px] uppercase tracking-wider transition-all duration-300 text-center"
              >
                🗺 Open in Google Maps
              </a>
              <a 
                href="https://maps.apple.com/?ll=10.241333,76.264611"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mango-pink text-white font-semibold rounded-xl text-[10px] uppercase tracking-wider transition-all duration-300 text-center"
              >
                🍎 Open in Apple Maps
              </a>
            </div>

            {/* Contact Info Items */}
            <div className="space-y-4">
              {/* Phone item */}
              <div className="flex flex-col gap-3 p-5 rounded-2xl glass border border-white/5 hover-neon-gold transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-mango-gold/10 flex items-center justify-center border border-mango-gold/20 flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-mango-gold" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Call Us</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  <a 
                    href="tel:+919846495782" 
                    className="flex items-center justify-center gap-2 h-11 bg-gradient-to-r from-mango-gold to-mango-orange text-black font-bold rounded-xl text-xs transition-all duration-300 hover:shadow-neon-gold hover:-translate-y-0.5"
                  >
                    📞 Call Now
                  </a>
                  <a 
                    href="tel:+919495636565" 
                    className="flex items-center justify-center gap-2 h-11 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all duration-300 border border-white/5 hover:border-mango-gold hover:shadow-neon-gold/10"
                  >
                    📞 +91 9495636565
                  </a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex flex-col gap-3 p-5 rounded-2xl glass border border-white/5 hover-neon-orange transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-mango-orange/10 flex items-center justify-center border border-mango-orange/20 flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-mango-orange" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email Address</p>
                </div>
                <a 
                  href="mailto:musicmangoaudios@gmail.com" 
                  className="flex items-center justify-center gap-2 h-11 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all duration-300 border border-white/5 hover:border-mango-orange hover:shadow-neon-orange/10 mt-1"
                >
                  📧 musicmangoaudios@gmail.com
                </a>
              </div>

              {/* Instagram item */}
              <div className="flex flex-col gap-3 p-5 rounded-2xl glass border border-white/5 hover-neon-pink transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-mango-pink/10 flex items-center justify-center border border-mango-pink/20 flex-shrink-0">
                    <Instagram className="w-3.5 h-3.5 text-mango-pink" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Instagram Feed</p>
                </div>
                <a 
                  href="https://www.instagram.com/music_mango_official" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 h-11 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs transition-all duration-300 border border-white/5 hover:border-mango-pink hover:shadow-neon-pink/10 mt-1"
                >
                  📸 @music_mango_official
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
