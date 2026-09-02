import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeSacredMandala() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group to hold all sacred geometry
    const mandalaGroup = new THREE.Group();
    scene.add(mandalaGroup);

    // 1. Concentric Gold Wireframe Sacred Rings
    const goldMaterial = new THREE.MeshBasicMaterial({
      color: 0xe5c578,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    const brightGoldMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });

    // Outer Ring
    const torus1 = new THREE.Mesh(new THREE.TorusGeometry(6, 0.06, 16, 100), goldMaterial);
    mandalaGroup.add(torus1);

    // Middle Ring
    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.05, 16, 80), brightGoldMaterial);
    mandalaGroup.add(torus2);

    // Inner Ring
    const torus3 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.04, 16, 60), goldMaterial);
    mandalaGroup.add(torus3);

    // 2. Sacred Icosahedron / Sri Yantra Geometric Core
    const icoGeometry = new THREE.IcosahedronGeometry(2.8, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xe5c578,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    mandalaGroup.add(icosahedron);

    // Inner Octahedron (Pure White / Diamond Light)
    const octGeometry = new THREE.OctahedronGeometry(1.6, 0);
    const octMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const octahedron = new THREE.Mesh(octGeometry, octMaterial);
    mandalaGroup.add(octahedron);

    // Center Glowing Sphere (Bindu)
    const binduGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const binduMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const bindu = new THREE.Mesh(binduGeo, binduMat);
    mandalaGroup.add(bindu);

    // 3. Floating Cosmic Particles (Prana Energy Field)
    const particleCount = 250;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      // Warm Amber & Gold Colors
      particleColors[i * 3] = 0.9 + Math.random() * 0.1;
      particleColors[i * 3 + 1] = 0.75 + Math.random() * 0.2;
      particleColors[i * 3 + 2] = 0.3;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    mandalaGroup.add(particleSystem);

    // Mouse Tracking for 3D Parallax Tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate group
      mandalaGroup.rotation.y += 0.004;
      mandalaGroup.rotation.x = targetY * 0.4;
      mandalaGroup.rotation.y += targetX * 0.008;

      // Counter-rotate inner geometry
      icosahedron.rotation.x += 0.005;
      icosahedron.rotation.z += 0.003;
      octahedron.rotation.y -= 0.008;
      particleSystem.rotation.y -= 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 360;
      const newHeight = container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
      title="Interactive 3D Sacred Geometry Mandala — Move cursor to orbit"
    />
  );
}
