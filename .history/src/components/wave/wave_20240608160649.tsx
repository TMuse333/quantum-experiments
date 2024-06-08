import React, { useRef, useEffect } from 'react';

const SineWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const wave = {
      amplitude: 100,
      frequency: 0.01,
      speed: 1,
      xOffset: 0,
      yOffset: canvas.height / 2,
      waveColor: '#fff'
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(0, wave.yOffset);
      for (let x = 0; x < canvas.width; x++) {
        const y = wave.yOffset + Math.sin(x * wave.frequency + wave.xOffset) * wave.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.waveColor;
      ctx.stroke();
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

  return <canvas ref={canvasRef} />;
};

export default SineWave;
