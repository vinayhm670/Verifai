import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ShieldBackgroundProps {
  isAnalyzing?: boolean;
}

export const ShieldBackground: React.FC<ShieldBackgroundProps> = ({ isAnalyzing = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL support check
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Lights: Soft cyan, white, teal, and blue lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const tealLight = new THREE.PointLight(0x0f766e, 3, 50);
    tealLight.position.set(-8, 8, 10);
    scene.add(tealLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 50);
    cyanLight.position.set(8, -5, 8);
    scene.add(cyanLight);

    const blueLight = new THREE.DirectionalLight(0x1d4ed8, 1.2);
    blueLight.position.set(0, 10, 15);
    scene.add(blueLight);

    // Group for the floating shield and network
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Floating Translucent Shield
    // Custom shape for shield
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 3.8);
    shieldShape.quadraticCurveTo(2.8, 3.4, 3.2, 0.5);
    shieldShape.quadraticCurveTo(3.0, -2.5, 0, -4.2);
    shieldShape.quadraticCurveTo(-3.0, -2.5, -3.2, 0.5);
    shieldShape.quadraticCurveTo(-2.8, 3.4, 0, 3.8);

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.15,
      bevelThickness: 0.15
    };

    const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeometry.center();

    const shieldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f766e,
      emissive: 0x042f2e,
      metalness: 0.1,
      roughness: 0.25,
      transmission: 0.65, // translucent glass effect
      thickness: 1.2,
      transparent: true,
      opacity: 0.82,
      reflectivity: 0.8
    });

    const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldMesh.position.set(0, 0.5, 0);
    mainGroup.add(shieldMesh);

    // Inner checkmark emblem on shield
    const checkShape = new THREE.Shape();
    checkShape.moveTo(-1.1, 0.1);
    checkShape.lineTo(-0.4, -0.6);
    checkShape.lineTo(1.3, 1.1);
    checkShape.lineTo(1.0, 1.4);
    checkShape.lineTo(-0.4, 0.0);
    checkShape.lineTo(-0.8, 0.4);
    checkShape.closePath();

    const checkGeo = new THREE.ShapeGeometry(checkShape);
    checkGeo.center();
    const checkMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });
    const checkMesh = new THREE.Mesh(checkGeo, checkMat);
    checkMesh.position.set(0, 0.5, 0.28);
    mainGroup.add(checkMesh);

    // 2. Interconnected Particles representing a verification network
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 45 : 95;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 32;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;

      particleVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.008
        )
      );
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 0.22 : 0.28,
      transparent: true,
      opacity: 0.75
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0f766e,
      transparent: true,
      opacity: 0.18
    });

    const maxLineSegments = particleCount * 2;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Mouse / Touch Interactivity
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Scroll effect
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Visibility change (pause when tab is hidden to save battery)
    let isPageVisible = !document.hidden;
    const handleVisibility = () => {
      isPageVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isPageVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!prefersReducedMotion) {
        // Floating motion for main shield
        mainGroup.rotation.y = mouse.x * 0.45 + Math.sin(elapsed * 0.6) * 0.08;
        mainGroup.rotation.x = -mouse.y * 0.35 + Math.cos(elapsed * 0.5) * 0.05;
        mainGroup.position.y = Math.sin(elapsed * 1.2) * 0.25 - (scrollY * 0.003);

        // Analysis pulse reaction
        if (isAnalyzing) {
          shieldMaterial.emissive.setHex(0x0284c7);
          tealLight.intensity = 4.5;
          cyanLight.intensity = 4.0;
        } else {
          shieldMaterial.emissive.setHex(0x042f2e);
          tealLight.intensity = 2.5;
          cyanLight.intensity = 2.0;
        }

        // Particle updates
        const positions = particlesGeometry.attributes.position.array as Float32Array;
        let lineIdx = 0;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += particleVelocities[i].x;
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3 + 2] += particleVelocities[i].z;

          // Boundary bounce
          if (Math.abs(positions[i * 3]) > 16) particleVelocities[i].x *= -1;
          if (Math.abs(positions[i * 3 + 1]) > 10) particleVelocities[i].y *= -1;
          if (Math.abs(positions[i * 3 + 2]) > 8) particleVelocities[i].z *= -1;

          // Connect adjacent particles
          for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 4.5 && lineIdx < maxLineSegments * 6 - 6) {
              linePositions[lineIdx++] = positions[i * 3];
              linePositions[lineIdx++] = positions[i * 3 + 1];
              linePositions[lineIdx++] = positions[i * 3 + 2];

              linePositions[lineIdx++] = positions[j * 3];
              linePositions[lineIdx++] = positions[j * 3 + 1];
              linePositions[lineIdx++] = positions[j * 3 + 2];
            }
          }
        }

        particlesGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      renderer.dispose();
      shieldGeometry.dispose();
      shieldMaterial.dispose();
      checkGeo.dispose();
      checkMat.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, [isAnalyzing]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {webglSupported ? (
        <canvas ref={canvasRef} className="w-full h-full block opacity-75 dark:opacity-40" />
      ) : (
        /* CSS / SVG Static Fallback if WebGL is unavailable */
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/60 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(#0f766e_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        </div>
      )}
    </div>
  );
};
