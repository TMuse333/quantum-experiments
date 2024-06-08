import React, { useEffect, useRef } from 'react';

const CircularWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameId = useRef<number | null>(null); // To store the frame ID

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100; // Radius of the circle
    const numWaves = 10; // Number of waves
    const waveLength = 100; // Wavelength of the wave
    const amplitude = 20; // Amplitude of the wave
    const speed = 0.02; // Speed of the wave

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numWaves; i++) {
        const angle = (i / numWaves) * Math.PI * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        c.beginPath();
        c.moveTo(x, y);

        for (let j = 0; j < waveLength; j++) {
          const waveX = x + j;
          const waveY = y + Math.sin(j * speed) * amplitude;
          c.lineTo(waveX, waveY);
        }

        c.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        c.stroke();
      }

      frameId.current = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup function
    return () => cancelAnimationFrame(frameId.current ?? 0); // Use ?? operator to handle null or undefined frame ID
  }, []);

  return (
    <canvas
      className='h-full w-full'
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    ></canvas>
  );
};

export default CircularWave;
