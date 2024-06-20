import React, { useEffect, useRef } from 'react';

const ConcentricCircles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let radius = 200; // Start with the maximum radius

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 10; i++) {
        const currentRadius = radius - i * 20;
        if (currentRadius > 0) {
          c.beginPath();
          c.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
          c.strokeStyle = `rgba(0, 191, 255, ${1 - i * 0.1})`;
          c.stroke();
        }
      }

      radius -= 1;
      if (radius < 0) radius = 200;

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

export default ConcentricCircles;
