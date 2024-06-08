import React, { useRef, useEffect } from 'react';

const SineWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const wave = {
      amplitude: 100,
      frequency: 0.002, // Slower wave
      speed: 0.03, // Slower speed
      xOffset: 0,
      yOffset: canvas.height / 2,
      waveColor: '#fff'
    };

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.beginPath();
      c.moveTo(0, wave.yOffset);
      for (let x = 0; x < canvas.width; x++) {
        const y = wave.yOffset + Math.sin(x * wave.frequency + wave.xOffset) * wave.amplitude;
        c.lineTo(x, y);
      }
      c.strokeStyle = wave.waveColor;
      c.stroke();
      wave.xOffset += wave.speed;
      requestAnimationFrame(draw);
    };

    draw();

    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      wave.yOffset = canvas.height / 2;
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return <canvas className='w-screen'
   ref={canvasRef} />;
};

export default SineWave;
