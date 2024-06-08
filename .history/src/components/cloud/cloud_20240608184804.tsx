import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Cloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer to container
    const container = containerRef.current;
    if (container) {
      container.appendChild(renderer.domElement);
    }

    // Create cloud material
    const cloudMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });

    // Create cloud geometry
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32);
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

    // Add cloud to the scene
    scene.add(cloudMesh);

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Add directional light to the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Set camera position
    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cloudMesh.rotation.y += 0.01; // Rotate the cloud
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
