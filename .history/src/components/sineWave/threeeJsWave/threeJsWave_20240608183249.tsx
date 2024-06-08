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
    camera.position.z = 10;
    camera.position.y = 2;
    camera.rotation.x = -0.4;

    // Create waves using PlaneGeometry
    const createWaveMesh = (width: number, height: number, widthSegments: number, heightSegments: number, color: number) => {
      const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);

      const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, wireframe: false });
      const plane = new THREE.Mesh(geometry, material);

      return { plane, amplitude: 1, frequency: 0.5, speed: 0.02, offset: 0 };
    };

    const waves = [
      createWaveMesh(2, 2, 2, 2, 0x00bfff), // Sky Blue
      createWaveMesh(2, 2, 2, 2, 0x4b0082), // Indigo
      createWaveMesh(2, 2, 2, 2, 0x8a2be2), // Blue Violet
      createWaveMesh(2, 2, 2, 2, 0x483d8b), // Dark Slate Blue
      createWaveMesh(2, 2, 2, 2, 0x0000ff), // Blue
    ];

    waves.forEach(wave => scene.add(wave.plane));

    const animate = () => {
      waves.forEach(wave => {
        const { plane, amplitude, frequency, offset } = wave;
        const position = plane.geometry.attributes.position;
        const vertices = position.array as Float32Array;

        for (let i = 0; i < vertices.length; i += 3) {
          const x = vertices[i];
          const y = vertices[i + 1];
          vertices[i + 2] = Math.sin((x + offset) * frequency) * amplitude;
        }

        position.needsUpdate = true;
        wave.offset += wave.speed;
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
