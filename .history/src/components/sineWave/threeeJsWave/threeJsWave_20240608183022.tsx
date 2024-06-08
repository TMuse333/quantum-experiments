import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeJSWave: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Adjust camera position to center the waves
    camera.position.z = 5;

    // Create waves
    const createWaveMesh = (amplitude: number, frequency: number, color: number, segments: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(segments * 3);

      for (let i = 0; i < segments; i++) {
        positions[i * 3] = (i / segments) * 20 - 10; // Adjust x-position to span entire screen
        positions[i * 3 + 1] = 0; // y
        positions[i * 3 + 2] = 0; // z
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({ color });
      const line = new THREE.Line(geometry, material);

      return { line, amplitude, frequency, offset: 0 };
    };

    const waves = [
      createWaveMesh(1.5, 0.02, 0x00bfff, 100), // Sky Blue
      createWaveMesh(1.3, 0.04, 0x4b0082, 100), // Indigo
      createWaveMesh(1.2, 0.06, 0x8a2be2, 100), // Blue Violet
      createWaveMesh(1.4, 0.03, 0x483d8b, 100), // Dark Slate Blue
      createWaveMesh(1.25, 0.05, 0x0000ff, 100), // Blue
    ];

    waves.forEach(wave => scene.add(wave.line));

    const animate = () => {
      waves.forEach(wave => {
        const positions = wave.line.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3 + 1] = Math.sin(i * wave.frequency + wave.offset) * wave.amplitude;
        }
        wave.line.geometry.attributes.position.needsUpdate = true;
        wave.offset += wave.0.01;
      });

      renderer.render(scene, camera);
      frameId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className='w-screen h-screen bg-red-900'>
      <div className='w-full h-full' ref={containerRef}></div>
    </div>
  );
};

export default ThreeJSWave;
