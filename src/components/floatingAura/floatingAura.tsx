import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };
}

const FloatingAura = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Check if canvas is null

    const c = canvas.getContext('2d');
    if (!c) return; // Check if context is null

    let particles: Particle[] = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Function to generate random number within a range
    const randomRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // Particle class
    class Particle {
      constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
        public velocity: { x: number; y: number }
      ) {}

      // Update particle position
      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }

      // Draw particle
      draw() {

        if(c){

          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          c.fillStyle = this.color;
          c.fill();        }
        
      }
    }

    // Create particles
    const init = () => {
      for (let i = 0; i < 100; i++) {
        const radius = randomRange(5, 20);
        const x = randomRange(radius, canvas.width - radius);
        const y = randomRange(radius, canvas.height - radius);
        const color = `rgba(${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0.5, 1)})`;
        const velocity = {
          x: randomRange(-0.5, 0.5),
          y: randomRange(-0.5, 0.5)
        };
        particles.push(new Particle(x, y, radius, color, velocity));
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
    };

    // Initialize and start animation
    init();
    animate();

    // Cleanup function
    return () => {
      particles = []; // Reset particles array
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
    ></canvas>
  );
};

export default FloatingAura;
