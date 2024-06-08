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
    const radius = 100; // Radius of the circular wave
    const speed = 0.05; // Speed of the wave
    const amplitude = 20; // Amplitude of the wave

    let angle = 0;

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circular path
      c.beginPath();
      c.arc(centerX, centerY, radius, 0, Math.PI * 2);
      c.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      c.stroke();

      // Draw circular wave
      c.beginPath();
      c.moveTo(centerX + radius, centerY);

      for (let theta = 0; theta <= Math.PI * 2; theta += 0.01) {
        const x = centerX + radius * Math.cos(theta);
        const y = centerY + amplitude * Math.sin(angle + theta);
        c.lineTo(x, y);
      }

      c.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      c.stroke();

      angle += speed;

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
