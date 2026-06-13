import React, { useEffect, useRef } from 'react';

export default function Equalizer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Equalizer variables
    const barWidth = 6;
    const barGap = 4;
    let bars = [];
    const numBars = Math.ceil(canvas.width / (barWidth + barGap));

    // Initialize target heights and current heights
    for (let i = 0; i < numBars; i++) {
      bars.push({
        currentHeight: 10 + Math.random() * 50,
        targetHeight: 10 + Math.random() * 100,
        speed: 0.1 + Math.random() * 0.15,
        freq: 0.02 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, '#E52B1A');   // Red at the bottom
      gradient.addColorStop(0.5, '#F08A1A'); // Orange in the middle
      gradient.addColorStop(1, '#F6C000');   // Gold at the top

      ctx.fillStyle = gradient;

      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];
        
        // Use mathematical wave function combined with random target changes to look like real audio
        const wave = Math.sin(time * 5 + i * 0.1) * Math.cos(time * 2 + i * 0.05);
        bar.targetHeight = (canvas.height * 0.1) + Math.abs(wave) * (canvas.height * 0.7) + Math.sin(time + bar.phase) * 15;
        
        // Smoothly interpolate current height to target height
        bar.currentHeight += (bar.targetHeight - bar.currentHeight) * bar.speed;

        // Ensure a minimum height
        if (bar.currentHeight < 10) bar.currentHeight = 10;

        const x = i * (barWidth + barGap);
        const y = canvas.height - bar.currentHeight;

        // Draw rounded rectangle/bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, bar.currentHeight, 3);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-24 sm:h-28 md:h-32 bg-mango-black overflow-hidden border-b border-white/5 z-20">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-70 pointer-events-none" 
      />
    </div>
  );
}
