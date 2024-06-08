import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Cloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = containerRef.current;
    if (container) {
      container.appendChild(renderer.domElement);
    }

    camera.position.z = 10;

    const cloudGeometry = new THREE.SphereGeometry(1, 32, 32);

    // Create an array to store cloud mesh objects
    const cloudMeshes: THREE.Mesh[] = [];

    // Define parameters for cloud spheres
    const numSpheres = 30;
    const minSize = 0.5;
    const maxSize = 1.5;

    for (let i = 0; i < numSpheres; i++) {
      // Randomize position
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;

      // Randomize size
      const size = Math.random() * (maxSize - minSize) + minSize;

      // Randomize opacity and color
      const opacity = Math.random() * 0.5 + 0.2;
      const color = new THREE.Color(Math.random(), Math.random(), Math.random());

      // Create cloud material
      const cloudMaterial = new THREE.MeshLambertMaterial({ color, opacity, transparent: true });

      // Create cloud sphere
      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloudMesh.position.set(x, y, z);
      cloudMesh.scale.set(size, size, size);

      // Add cloud sphere to the scene
      scene.add(cloudMesh);

      // Store cloud mesh object
      cloudMeshes.push(cloudMesh);
    }

    // Add ambient and directional lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cloudMeshes.forEach(cloudMesh => {
        cloudMesh.rotation.y += 0.001; // Rotate the cloud
      });
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Cloud;
