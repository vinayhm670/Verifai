import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ShieldBackgroundProps {
  isAnalyzing?: boolean;
}

interface NerveBranch {
  points: THREE.Vector3[];
  length: number;
  curve: THREE.CatmullRomCurve3;
}

interface NeuralNode {
  position: THREE.Vector3;
  baseScale: number;
  energy: number;
  meshIndex: number;
}

interface SignalParticle {
  branchIndex: number;
  progress: number;
  speed: number;
  color: THREE.Color;
}

export const ShieldBackground: React.FC<ShieldBackgroundProps> = ({ isAnalyzing = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    camera.position.z = 25;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Neural Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Dynamic green & teal lights
    const neuralGreenLight = new THREE.PointLight(0x22c55e, 3.5, 45);
    neuralGreenLight.position.set(-6, 6, 12);
    scene.add(neuralGreenLight);

    const mintLight = new THREE.PointLight(0x86efac, 2.5, 40);
    mintLight.position.set(7, -5, 10);
    scene.add(mintLight);

    const cyanLight = new THREE.PointLight(0x67e8f9, 2.0, 35);
    cyanLight.position.set(0, 10, 8);
    scene.add(cyanLight);

    const mainNetworkGroup = new THREE.Group();
    scene.add(mainNetworkGroup);

    // ==========================================
    // 1. PROCEDURAL GREEN NERVE-SYSTEM BRANCHES
    // ==========================================
    const isMobile = window.innerWidth < 768;
    const branches: NerveBranch[] = [];
    const neuralNodes: NeuralNode[] = [];

    // Nerve origins across depth layers
    const stemOrigins = [
      new THREE.Vector3(-14, -8, -4),
      new THREE.Vector3(14, 8, -5),
      new THREE.Vector3(-12, 10, -3),
      new THREE.Vector3(13, -9, -4),
      new THREE.Vector3(0, -12, -2),
      new THREE.Vector3(-10, 0, -6),
      new THREE.Vector3(11, 2, -5)
    ];

    const generateNervePath = (
      start: THREE.Vector3, 
      direction: THREE.Vector3, 
      depth: number, 
      maxDepth: number
    ) => {
      const pointCount = 6;
      const points: THREE.Vector3[] = [start.clone()];
      let current = start.clone();
      let currentDir = direction.clone().normalize();

      for (let p = 1; p < pointCount; p++) {
        // Organic biological jitter
        const angleVar = (Math.random() - 0.5) * 0.45;
        currentDir.x += angleVar;
        currentDir.y += (Math.random() - 0.5) * 0.45;
        currentDir.z += (Math.random() - 0.5) * 0.25;
        currentDir.normalize();

        const stepLength = 2.2 + Math.random() * 1.5;
        current = current.clone().add(currentDir.clone().multiplyScalar(stepLength));
        points.push(current.clone());

        // Create neural node at branch junctions
        if (Math.random() > 0.45 || p === pointCount - 1) {
          neuralNodes.push({
            position: current.clone(),
            baseScale: 0.12 + Math.random() * 0.12,
            energy: Math.random() * 0.6,
            meshIndex: 0
          });
        }
      }

      const curve = new THREE.CatmullRomCurve3(points);
      branches.push({
        points,
        length: curve.getLength(),
        curve
      });

      // Recursive sub-branching
      if (depth < maxDepth && (!isMobile || depth < 1)) {
        const splitPoint = points[Math.floor(points.length * 0.6)];
        const branchDir1 = currentDir.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.55);
        const branchDir2 = currentDir.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -0.55);
        generateNervePath(splitPoint, branchDir1, depth + 1, maxDepth);
        if (Math.random() > 0.4) {
          generateNervePath(splitPoint, branchDir2, depth + 1, maxDepth);
        }
      }
    };

    // Build branching tree
    stemOrigins.forEach((origin) => {
      const targetCenter = new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 0);
      const dir = targetCenter.sub(origin).normalize();
      generateNervePath(origin, dir, 0, isMobile ? 1 : 2);
    });

    // Render Filaments using smooth Curves
    const nerveLineGroup = new THREE.Group();
    mainNetworkGroup.add(nerveLineGroup);

    branches.forEach((b) => {
      const divisions = 30;
      const curvePoints = b.curve.getPoints(divisions);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x22c55e,
        transparent: true,
        opacity: isMobile ? 0.28 : 0.38,
        linewidth: 1
      });

      const line = new THREE.Line(lineGeo, lineMat);
      nerveLineGroup.add(line);
    });

    // ==========================================
    // 2. GLOWING NEURAL JUNCTION NODES
    // ==========================================
    const nodeGeometry = new THREE.SphereGeometry(1, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x86efac,
      transparent: true,
      opacity: 0.85
    });

    const instancedNodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, neuralNodes.length);
    const dummy = new THREE.Object3D();

    neuralNodes.forEach((node, i) => {
      dummy.position.copy(node.position);
      dummy.scale.setScalar(node.baseScale);
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(i, dummy.matrix);
      node.meshIndex = i;
    });
    instancedNodes.instanceMatrix.needsUpdate = true;
    mainNetworkGroup.add(instancedNodes);

    // ==========================================
    // 3. ACTION-POTENTIAL SIGNAL PARTICLES
    // ==========================================
    const particleCount = isMobile ? 35 : 75;
    const signalParticles: SignalParticle[] = [];
    const particleColors = [
      new THREE.Color(0x22c55e), // Neural Green
      new THREE.Color(0x86efac), // Soft Green Highlight
      new THREE.Color(0xa7f3d0), // Mint
      new THREE.Color(0x67e8f9)  // Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      signalParticles.push({
        branchIndex: Math.floor(Math.random() * branches.length),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        color: particleColors[Math.floor(Math.random() * particleColors.length)]
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColorArray = new Float32Array(particleCount * 3);

    signalParticles.forEach((p, idx) => {
      const pos = branches[p.branchIndex].curve.getPoint(p.progress);
      particlePositions[idx * 3] = pos.x;
      particlePositions[idx * 3 + 1] = pos.y;
      particlePositions[idx * 3 + 2] = pos.z;

      particleColorArray[idx * 3] = p.color.r;
      particleColorArray[idx * 3 + 1] = p.color.g;
      particleColorArray[idx * 3 + 2] = p.color.b;
    });

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.35 : 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });

    const signalPointSystem = new THREE.Points(particleGeo, particleMat);
    mainNetworkGroup.add(signalPointSystem);

    // ==========================================
    // 4. FLOATING TRANSLUCENT SHIELD (FOREGROUND)
    // ==========================================
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 3.6);
    shieldShape.quadraticCurveTo(2.6, 3.2, 3.0, 0.4);
    shieldShape.quadraticCurveTo(2.8, -2.4, 0, -4.0);
    shieldShape.quadraticCurveTo(-2.8, -2.4, -3.0, 0.4);
    shieldShape.quadraticCurveTo(-2.6, 3.2, 0, 3.6);

    const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.12,
      bevelThickness: 0.12
    });
    shieldGeometry.center();

    const shieldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f766e,
      emissive: 0x071e16,
      metalness: 0.15,
      roughness: 0.2,
      transmission: 0.72,
      thickness: 1.2,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.85
    });

    const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldMesh.position.set(0, 0.4, 1.2);
    mainNetworkGroup.add(shieldMesh);

    // Center Checkmark
    const checkShape = new THREE.Shape();
    checkShape.moveTo(-1.0, 0.1);
    checkShape.lineTo(-0.35, -0.55);
    checkShape.lineTo(1.2, 1.0);
    checkShape.lineTo(0.95, 1.25);
    checkShape.lineTo(-0.35, -0.05);
    checkShape.lineTo(-0.75, 0.35);
    checkShape.closePath();

    const checkGeo = new THREE.ShapeGeometry(checkShape);
    checkGeo.center();
    const checkMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });
    const checkMesh = new THREE.Mesh(checkGeo, checkMat);
    checkMesh.position.set(0, 0.4, 1.48);
    mainNetworkGroup.add(checkMesh);

    // ==========================================
    // 5. INTERACTIVE EVENT HANDLERS (MOUSE, TOUCH, SCROLL)
    // ==========================================
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

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
      pointer.targetX = (clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let isPageVisible = !document.hidden;
    const handleVisibility = () => {
      isPageVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // ==========================================
    // 6. ANIMATION & PULSE LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isPageVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth camera and parallax damping
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      if (!prefersReducedMotion) {
        // Gentle organic float
        mainNetworkGroup.rotation.y = pointer.x * 0.35 + Math.sin(elapsed * 0.4) * 0.04;
        mainNetworkGroup.rotation.x = -pointer.y * 0.25 + Math.cos(elapsed * 0.35) * 0.03;
        mainNetworkGroup.position.y = Math.sin(elapsed * 0.8) * 0.2 - (scrollY * 0.0025);
        mainNetworkGroup.position.z = Math.cos(elapsed * 0.5) * 0.2;

        // Verification response: wave excitation when analyzing
        if (isAnalyzing) {
          shieldMaterial.emissive.setHex(0x22c55e);
          neuralGreenLight.intensity = 5.5;
          mintLight.intensity = 4.5;
          cyanLight.intensity = 4.0;
        } else {
          shieldMaterial.emissive.setHex(0x071e16);
          neuralGreenLight.intensity = 3.2;
          mintLight.intensity = 2.2;
          cyanLight.intensity = 1.8;
        }

        // Animate signal particles along nerve branches
        const positions = particleGeo.attributes.position.array as Float32Array;

        signalParticles.forEach((sp, idx) => {
          const currentSpeed = isAnalyzing ? sp.speed * 2.8 : sp.speed;
          sp.progress += currentSpeed;

          if (sp.progress >= 1.0) {
            sp.progress = 0;
            sp.branchIndex = Math.floor(Math.random() * branches.length);
          }

          const branch = branches[sp.branchIndex];
          const point = branch.curve.getPoint(sp.progress);

          positions[idx * 3] = point.x;
          positions[idx * 3 + 1] = point.y;
          positions[idx * 3 + 2] = point.z;
        });

        particleGeo.attributes.position.needsUpdate = true;

        // Neural node soft energy pulse
        neuralNodes.forEach((node, i) => {
          node.energy += 0.02;
          const pulse = Math.sin(node.energy + elapsed * 1.5) * 0.3 + 0.7;
          const dynamicScale = node.baseScale * (1 + pulse * 0.35);

          dummy.position.copy(node.position);
          dummy.scale.setScalar(dynamicScale);
          dummy.updateMatrix();
          instancedNodes.setMatrixAt(i, dummy.matrix);
        });
        instancedNodes.instanceMatrix.needsUpdate = true;
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
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isAnalyzing]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {webglSupported ? (
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block opacity-85 dark:opacity-65 transition-opacity duration-300" 
        />
      ) : (
        /* CSS / SVG Static Fallback for non-WebGL environments */
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/70 via-slate-50 to-slate-100 dark:from-[#07130F] dark:via-[#091713] dark:to-[#07130F]">
          <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      )}
    </div>
  );
};
