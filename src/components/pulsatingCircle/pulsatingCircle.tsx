import React, { useEffect, useRef } from 'react';

const PulsatingCircle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let radius = 50;
    let increasing = true;

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      c.beginPath();
      c.arc(centerX, centerY, radius, 0, Math.PI * 2);
      c.fillStyle = 'rgba(0, 191, 255, 0.5)';
      c.fill();

      if (increasing) {
        radius += 1;
        if (radius > 100) increasing = false;
      } else {
        radius -= 1;
        if (radius < 50) increasing = true;
      }

      frameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default PulsatingCircle;
