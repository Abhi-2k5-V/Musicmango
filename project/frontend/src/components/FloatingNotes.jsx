import React from 'react';
import { motion } from 'framer-motion';

const NOTE_SVGS = [
  // Eighth note
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h6V3h-8z"/>
  </svg>,
  // Quarter note / Music note
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm0-4.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm0-4.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S10.67 7.5 11.5 7.5s1.5.67 1.5 1.5z" />
  </svg>,
  // Beam notes
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M17 3H9v11.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h6v7.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3z"/>
  </svg>,
  // Treble clef (simplified / alternate)
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.9c-.8-.2-1.4-.7-1.7-1.4-.4-.7-.4-1.6 0-2.3.4-.7 1.1-1.2 1.9-1.2h.3c.5.9 1.1 1.7 1.9 2.2-.4.8-1.2 1.4-2.1 1.6-1.1.2-1.9-.3-2.3-.9v4.2c-.3.4-.8.5-1.2.2s-.6-.8-.2-1.2c.4-.4.9-.5 1.2-.2v-3c-1.4.1-2.6-1-2.7-2.4-.1-1.5 1-2.8 2.4-2.9 1.1-.1 2 .5 2.5 1.4.6-.3 1.1-.8 1.4-1.3-.2-.5-.5-1-.9-1.3-.8-.7-1.9-.8-2.8-.2-.9.6-1.3 1.7-1 2.7l-1.3.3c-.5-1.5.2-3.1 1.7-3.8 1.4-.7 3.2-.4 4.3.7.6.6 1 1.4 1 2.2 0 .9-.4 1.8-1.1 2.4l.2.3c.8-.5 1.3-1.4 1.3-2.4 0-1.8-1.5-3.3-3.3-3.3s-3.3 1.5-3.3 3.3c0 .8.3 1.6.8 2.2l-.3.2zm2.8-5.3c-.6.3-1.2.5-1.8.6v1.9c.7-.2 1.3-.5 1.8-.9v-1.6z"/>
  </svg>
];

const COLORS = ['text-mango-gold', 'text-mango-orange', 'text-mango-red', 'text-mango-pink', 'text-mango-green'];

export default function FloatingNotes() {
  const notes = React.useMemo(() => {
    return Array.from({ length: 25 }).map((_, index) => {
      const size = Math.floor(Math.random() * 24) + 16; // 16px to 40px
      const left = Math.random() * 100; // 0% to 100%
      const delay = Math.random() * 7; // 0s to 7s delay
      const duration = Math.random() * 10 + 8; // 8s to 18s duration
      const svgIndex = Math.floor(Math.random() * NOTE_SVGS.length);
      const colorClass = COLORS[Math.floor(Math.random() * COLORS.length)];

      return {
        id: index,
        size,
        left,
        delay,
        duration,
        svg: NOTE_SVGS[svgIndex],
        colorClass
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
      {notes.map((note) => (
        <motion.div
          key={note.id}
          className={`absolute opacity-0 ${note.colorClass}`}
          style={{
            width: note.size,
            height: note.size,
            left: `${note.left}%`,
            bottom: '-50px',
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, Math.sin(note.id) * 60, 0, Math.cos(note.id) * 40],
            rotate: [0, 180, 360],
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{
            duration: note.duration,
            repeat: Infinity,
            delay: note.delay,
            ease: 'linear',
          }}
        >
          {note.svg}
        </motion.div>
      ))}
    </div>
  );
}
