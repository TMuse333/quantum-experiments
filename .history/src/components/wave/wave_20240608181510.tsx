import React, { useRef, useEffect } from 'react';

const SineWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const waves = [
      {
        amplitude: 50,
        frequency: 0.01,
        speed: 0.02,
        xOffset: 0,
        color: 'rgba(0, 191, 255, 0.5)', // Sky Blue
      },
      {
        amplitude: 30,
        frequency: 0.02,
        speed: 0.03,
        xOffset: 0,
        color: 'rgba(75, 0, 130, 0.3)', // Indigo
      },
      {
        amplitude: 20,
        frequency: 0.03,
        speed: 0.04,
        xOffset: 0,
        color: 'rgba(138, 43, 226, 0.2)', // Blue Violet
      },
      {
        amplitude: 40,
        frequency: 0.015,
        speed: 0.025,
        xOffset: 0,
        color: 'rgba(72, 61, 139, 0.4)', // Dark Slate Blue
      },
      {
        amplitude: 25,
        frequency: 0.025,
        speed: 0.035,
        xOffset: 0,
        color: 'rgba(0, 0, 255, 0.3)', // Blue
      },
    ];

    const resizeHandler = () => {
      canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);
      waves.forEach((wave) => {
        c.beginPath();
        c.moveTo(0, canvas.height / 2);
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * wave.frequency + wave.xOffset) * wave.amplitude;
          c.lineTo(x, y);
        }
        c.strokeStyle = wave.color;
        c.stroke();
        wave.xOffset += wave.speed;
      });
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div className='w-screen bg-blue-500 relative h-[200px] max-w-[1000px] ml-auto mr-auto'>
      <canvas className='h-full w-full' ref={canvasRef} />
    </div>
  );
};

export default SineWave;
