import React, { useRef, useEffect, useState } from 'react';

const SineWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

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
      yOffset: canvasHeight / 2,
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
      setCanvasHeight(canvas.parentElement?.clientHeight || 0); // Get the height of the parent div
      canvas.width = window.innerWidth;
      canvas.height = canvasHeight; // Set the canvas height to match the parent div height
      wave.yOffset = canvasHeight / 2;
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [canvasHeight]);

  return  (
    <div className='w-screen bg-green-200 h-1/2'>
      <canvas ref={canvasRef} style={{ height: canvasHeight }} />
    </div>
  );
};

export default SineWave;
