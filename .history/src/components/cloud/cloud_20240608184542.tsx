import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cloud: React.FC = () => {
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

    camera.position.z = 50;

    // Create cloud geometry
    const cloudGeometry = new THREE.BufferGeometry();
    const cloudMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });

    // Number of particles in the cloud
    const numParticles = 1000;

    // Add particles to the cloud geometry
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * 100 - 50; // Random x position
      const y = Math.random() * 100 - 50; // Random y position
      const z = Math.random() * 100 - 50; // Random z position
      const particle = new THREE.Vector3(x, y, z);
      cloudGeometry.vertices.push(particle);
    }

    // Create cloud points
    const cloud = new THREE.Points(cloudGeometry, cloudMaterial);
    scene.add(cloud);

    // Add light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const animate = () => {
      frameId.current = requestAnimationFrame(animate);

      // Rotate the cloud
      cloud.rotation.x += 0.001;
      cloud.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(frameId.current ?? 0);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div className='w-full h-full' ref={containerRef}></div>;
};

export default Cloud;
