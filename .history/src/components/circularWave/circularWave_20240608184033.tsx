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
    const waveLength = 60; // Wavelength of the wave
    const amplitude = 10; // Amplitude of the wave
    const frequency = 0.002; // Frequency of the wave
    const phaseShift = Math.PI / 2; // Phase shift to start the wave from the top

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circular path
      c.beginPath();
      c.arc(centerX, centerY, radius, 0, Math.PI * 2);
      c.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      c.stroke();

      // Draw circular wave
      for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle) + amplitude * Math.sin(angle * waveLength + frequency * angle + phaseShift);
        if (angle === 0) {
          c.moveTo(x, y);
        } else {
          c.lineTo(x, y);
        }
      }

      c.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      c.stroke();

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
