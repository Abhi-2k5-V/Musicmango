import React from 'react';

export default function WaveTransition() {
  return (
    <div className="relative w-full overflow-hidden bg-mango-black pointer-events-none" style={{ height: '70px', marginTop: '-2px', marginBottom: '-2px' }}>
      <div className="absolute inset-0 flex w-[200%] h-full">
        {/* Layer 1: Gold / Yellow glowing wave */}
        <svg
          className="w-1/2 h-full text-mango-black fill-current absolute top-0 left-0 animate-[slide-wave_20s_linear_infinite]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ width: '200vw' }}
        >
          <path
            d="M 0 40 Q 360 10 720 40 T 1440 40 T 2160 40 T 2880 40 L 2880 100 L 0 100 Z"
            fill="rgba(246, 192, 0, 0.08)"
          />
        </svg>

        {/* Layer 2: Orange / Red glowing wave, slightly offset and moving opposite/slower */}
        <svg
          className="w-1/2 h-full text-mango-black fill-current absolute top-0 left-0 animate-[slide-wave-reverse_25s_linear_infinite]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ width: '200vw' }}
        >
          <path
            d="M 0 50 Q 360 80 720 50 T 1440 50 T 2160 50 T 2880 50 L 2880 100 L 0 100 Z"
            fill="rgba(240, 138, 26, 0.06)"
          />
        </svg>

        {/* Layer 3: Pink glowing wave, offset height */}
        <svg
          className="w-1/2 h-full text-mango-black fill-current absolute top-0 left-0 animate-[slide-wave_15s_linear_infinite]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ width: '200vw' }}
        >
          <path
            d="M 0 60 Q 360 30 720 60 T 1440 60 T 2160 60 T 2880 60 L 2880 100 L 0 100 Z"
            fill="rgba(217, 0, 125, 0.05)"
          />
        </svg>
      </div>

      {/* Thin glowing divider line at the very bottom/top of the boundary */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-mango-gold/20 via-mango-pink/30 to-mango-red/20" />
    </div>
  );
}
