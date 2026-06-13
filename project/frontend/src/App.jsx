import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Equalizer from './components/Equalizer';
import WaveTransition from './components/WaveTransition';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import CallFloating from './components/CallFloating';

export default function App() {
  return (
    <div className="bg-mango-black text-white relative selection:bg-mango-gold/30 selection:text-mango-gold min-h-screen overflow-x-hidden antialiased">
      {/* Sticky Top Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Full-width Equalizer visualizer immediately below Hero */}
      <Equalizer />

      {/* Seamless Wave Transition Divider */}
      <WaveTransition />

      {/* About Us Section */}
      <About />

      {/* Services Grid Section */}
      <Services />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Contact Form & Info Section */}
      <Contact />

      {/* Footer Branding & Social Links */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloating />

      {/* Floating Call Action Button */}
      <CallFloating />
    </div>
  );
}
