import React from 'react';

export default function CallFloating() {
  return (
    <a
      href="tel:+919846495782"
      className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-mango-gold via-mango-orange to-mango-red text-black p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group hover:shadow-[0_0_25px_rgba(240,138,26,0.5)] cursor-pointer"
      aria-label="Call Music Mango"
    >
      {/* Pulse effect rings */}
      <span className="absolute inset-0 rounded-full border-2 border-mango-orange animate-ping opacity-75 group-hover:hidden" style={{ animationDuration: '2.5s' }} />
      
      {/* Phone SVG Icon */}
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-black" viewBox="0 0 24 24">
        <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.779-7.82-4.584-8.884.09-.043 2.057-1.004 2.057-1.004l-3.516-6.799s-1.935.955-2.016.991c-3.197 1.545-2.023 9.615 1.546 16.513 3.568 6.899 11.378 8.16 14.545 6.626.085-.041 2.019-.993 2.019-.993z"/>
      </svg>
      
      {/* Hover Tooltip/Label */}
      <span className="absolute left-16 bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-xl opacity-0 -translate-x-3 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap border border-white/10 uppercase tracking-widest">
        Call Music Mango
      </span>
    </a>
  );
}
