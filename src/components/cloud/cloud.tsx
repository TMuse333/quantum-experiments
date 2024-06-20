import React, { useEffect, useRef } from 'react';

const Cloud: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cloud = useRef<{ x: number; y: number; radius: number }[]>([]);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext('2d');
    if (!c) return;

    const generateCloud = () => {
      const numCircles = 20; // Number of circles in the cloud
      const cloudWidth = 200; // Width of the cloud
      const cloudHeight = 50; // Height of the cloud

      // Calculate center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < numCircles; i++) {
        const x = centerX + (Math.random() - 0.5) * cloudWidth; // Random x within cloudWidth range
        const y = centerY + (Math.random() - 0.5) * cloudHeight; // Random y within cloudHeight range
        const radius = Math.random() * 20 + 10; // Random radius between 10 and 30

        cloud.current.push({ x, y, radius });
      }
    };

    const drawCloud = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      cloud.current.forEach(circle => {
        // Add small random displacement to circle position
        circle.x += (Math.random() - 0.5) * 2.7;
        circle.y += (Math.random() - 0.5) * 1.1;

        c.beginPath();
        c.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        c.fillStyle = 'white';
        c.fill();
      });

      // Request next frame
      frameId.current = requestAnimationFrame(drawCloud);
    };

    generateCloud();
    drawCloud();

    // Clean-up
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default Cloud;
