import React, { useEffect, useRef } from 'react';

const CircularWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100; // Radius of the circular wave
    const speed = 0.05; // Speed of the wave
    const amplitude = 20; // Amplitude of the wave

    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circular path
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.stroke();

      // Draw circular wave
      ctx.beginPath();
      ctx.moveTo(centerX + radius, centerY);

      for (let theta = 0; theta <= Math.PI * 2; theta += 0.01) {
        const x = centerX + radius * Math.cos(theta);
        const y = centerY + amplitude * Math.sin(angle + theta);
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.stroke();

      angle += speed;

      requestAnimationFrame(draw);
    };

    draw();

    // Cleanup function
    return () => cancelAnimationFrame(draw);
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
