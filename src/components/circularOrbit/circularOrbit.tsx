import React, { useEffect, useRef } from 'react';

const CircularOrbit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    const circleRadius = 10;
    const numCircles = 6;
    let angle = 0;

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numCircles; i++) {
        const x = centerX + radius * Math.cos(angle + (i * 2 * Math.PI) / numCircles);
        const y = centerY + radius * Math.sin(angle + (i * 2 * Math.PI) / numCircles);

        c.beginPath();
        c.arc(x, y, circleRadius, 0, Math.PI * 2);
        c.fillStyle = `hsl(${(i * 360) / numCircles}, 100%, 50%)`;
        c.fill();
      }

      angle += 0.02;

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

export default CircularOrbit;
