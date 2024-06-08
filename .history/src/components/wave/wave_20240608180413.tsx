import React, { useRef, useEffect } from 'react';

const SineWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const wave = {
      amplitude: 50,
      frequency: 0.05, // Slower wave
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

    // const resizeHandler = () => {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    
    // };

    // window.addEventListener('resize', resizeHandler);

    // return () => {
    //   window.removeEventListener('resize', resizeHandler);
    // };
  }, []);

  return  (
    <div className='w-screen bg-blue-500
    h-[200px] max-w-[1000px]'>

  
  <canvas className='h-full ml-auto mr-auto w-full'
   ref={canvasRef} />
     </div>
  )
};

export default SineWave;
