import React, { useEffect, useRef } from 'react';

export default function Waveform() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      // Set canvas dimensions based on its bounding box or the window to ensure it's full viewport/hero height
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave configurations matching Music Mango brand palette
    const waves = [
      {
        amplitude: 60,
        frequency: 0.003,
        speed: 0.015,
        color: 'rgba(246, 192, 0, 0.15)', // Gold
        lineWidth: 2,
        phase: 0,
        fill: true,
      },
      {
        amplitude: 40,
        frequency: 0.005,
        speed: -0.01,
        color: 'rgba(240, 138, 26, 0.2)', // Orange
        lineWidth: 1.5,
        phase: Math.PI / 3,
        fill: false,
      },
      {
        amplitude: 50,
        frequency: 0.004,
        speed: 0.008,
        color: 'rgba(229, 43, 26, 0.15)', // Red
        lineWidth: 2.5,
        phase: Math.PI / 1.5,
        fill: false,
      },
      {
        amplitude: 30,
        frequency: 0.008,
        speed: -0.02,
        color: 'rgba(217, 0, 125, 0.25)', // Pink
        lineWidth: 1,
        phase: Math.PI,
        fill: false,
      },
      {
        amplitude: 25,
        frequency: 0.006,
        speed: 0.012,
        color: 'rgba(149, 179, 0, 0.15)', // Green
        lineWidth: 1.5,
        phase: Math.PI * 1.5,
        fill: false,
      }
    ];

    let time = 0;

    const animate = () => {
      time += 0.5;
      
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;
        
        // Horizontal wave path
        for (let x = 0; x <= canvas.width; x += 5) {
          // Calculate dynamic vertical position based on sine function and phase offsets
          const angle = x * wave.frequency + (time * wave.speed) + wave.phase;
          // Apply a vertical dampening factor towards the left and right edges so waves fade out nicely
          const edgeDampening = Math.sin((x / canvas.width) * Math.PI);
          const y = centerY + Math.sin(angle) * wave.amplitude * edgeDampening;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        if (wave.fill) {
          // Connect to bottom right and bottom left to fill the wave
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          
          // Create gradient for fill
          const grad = ctx.createLinearGradient(0, centerY - wave.amplitude, 0, canvas.height);
          grad.addColorStop(0, 'rgba(246, 192, 0, 0.08)');
          grad.addColorStop(0.5, 'rgba(240, 138, 26, 0.04)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
}
