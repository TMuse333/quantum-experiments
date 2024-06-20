import React, { useEffect, useRef } from 'react';

const SpinningSpiral: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const numTurns = 10;
    let angle = 0;

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      c.beginPath();
      for (let i = 0; i < 360 * numTurns; i++) {
        const radius = i / 10;
        const x = centerX + radius * Math.cos((i + angle) * (Math.PI / 180));
        const y = centerY + radius * Math.sin((i + angle) * (Math.PI / 180));
        c.lineTo(x, y);
      }
      c.strokeStyle = 'rgba(0, 191, 255, 0.5)';
      c.stroke();

      angle += 1;

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

export default SpinningSpiral;
