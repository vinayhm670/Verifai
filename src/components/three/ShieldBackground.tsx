import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ShieldBackgroundProps {
  isAnalyzing?: boolean;
  subtleMode?: boolean;
}

interface NerveBranch {
  points: THREE.Vector3[];
  length: number;
  curve: THREE.CatmullRomCurve3;
  depthLayer: number;
}

interface NeuralNode {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  baseScale: number;
  energy: number;
  glowIntensity: number;
  meshIndex: number;
}

interface SignalParticle {
  branchIndex: number;
  progress: number;
  speed: number;
  color: THREE.Color;
  size: number;
}

interface ElectricalPulse {
  branchIndex: number;
  headProgress: number;
  length: number;
  speed: number;
  intensity: number;
}

export const ShieldBackground: React.FC<ShieldBackgroundProps> = ({ 
  isAnalyzing = false,
  subtleMode = false 
}) => {
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

    // Neural Bioluminescent Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Natural luminous green (#39FF88, #22C55E, #00FF9D)
    const neuralGreenLight = new THREE.PointLight(0x39ff88, 3.8, 48);
    neuralGreenLight.position.set(-6, 6, 12);
    scene.add(neuralGreenLight);

    const biolumLight = new THREE.PointLight(0x00ff9d, 2.8, 42);
    biolumLight.position.set(7, -5, 10);
    scene.add(biolumLight);

    const tealLight = new THREE.PointLight(0x0f766e, 2.4, 38);
    tealLight.position.set(0, 10, 8);
    scene.add(tealLight);

    const mainNetworkGroup = new THREE.Group();
    scene.add(mainNetworkGroup);

    // ==========================================
    // 1. ORGANIC BRANCHING GREEN NERVE FIBRES
    // ==========================================
    const isMobile = window.innerWidth < 768;
    const branches: NerveBranch[] = [];
    const neuralNodes: NeuralNode[] = [];

    // Nerve roots across multiple depth layers
    const stemOrigins = [
      { pos: new THREE.Vector3(-15, -9, -5), layer: 0 },
      { pos: new THREE.Vector3(15, 9, -6), layer: 0 },
      { pos: new THREE.Vector3(-13, 11, -3), layer: 1 },
      { pos: new THREE.Vector3(14, -10, -4), layer: 1 },
      { pos: new THREE.Vector3(0, -13, -2), layer: 2 },
      { pos: new THREE.Vector3(-11, 1, -7), layer: 0 },
      { pos: new THREE.Vector3(12, 3, -5), layer: 1 },
      { pos: new THREE.Vector3(-4, 13, -3), layer: 2 },
      { pos: new THREE.Vector3(5, -12, -4), layer: 1 }
    ];

    const generateNervePath = (
      start: THREE.Vector3, 
      direction: THREE.Vector3, 
      depth: number, 
      maxDepth: number,
      layer: number
    ) => {
      const pointCount = 7;
      const points: THREE.Vector3[] = [start.clone()];
      let current = start.clone();
      let currentDir = direction.clone().normalize();

      for (let p = 1; p < pointCount; p++) {
        // Natural biological jitter simulating dendritic branching
        const angleVarX = (Math.random() - 0.5) * 0.48;
        const angleVarY = (Math.random() - 0.5) * 0.48;
        const angleVarZ = (Math.random() - 0.5) * 0.28;
        
        currentDir.x += angleVarX;
        currentDir.y += angleVarY;
        currentDir.z += angleVarZ;
        currentDir.normalize();

        const stepLength = 2.0 + Math.random() * 1.6;
        current = current.clone().add(currentDir.clone().multiplyScalar(stepLength));
        points.push(current.clone());

        // Place neural nodes at junctions and endpoints
        if (Math.random() > 0.4 || p === pointCount - 1) {
          neuralNodes.push({
            position: current.clone(),
            originalPosition: current.clone(),
            baseScale: 0.14 + Math.random() * 0.14,
            energy: Math.random() * 0.8,
            glowIntensity: 0.6 + Math.random() * 0.4,
            meshIndex: 0
          });
        }
      }

      const curve = new THREE.CatmullRomCurve3(points);
      branches.push({
        points,
        length: curve.getLength(),
        curve,
        depthLayer: layer
      });

      // Recursive bifurcations
      if (depth < maxDepth && (!isMobile || depth < 1)) {
        const splitPoint = points[Math.floor(points.length * 0.55)];
        const branchDir1 = currentDir.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.52);
        const branchDir2 = currentDir.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), -0.52);
        
        generateNervePath(splitPoint, branchDir1, depth + 1, maxDepth, layer);
        if (Math.random() > 0.35) {
          generateNervePath(splitPoint, branchDir2, depth + 1, maxDepth, layer);
        }
      }
    };

    // Generate branching nerve trees
    stemOrigins.forEach((stem) => {
      const targetCenter = new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 0);
      const dir = targetCenter.sub(stem.pos).normalize();
      generateNervePath(stem.pos, dir, 0, isMobile ? 1 : 2, stem.layer);
    });

    // 1B. Render Nerve Filaments with Multi-Depth Color Grading
    const nerveLineGroup = new THREE.Group();
    mainNetworkGroup.add(nerveLineGroup);

    branches.forEach((b) => {
      const divisions = 32;
      const curvePoints = b.curve.getPoints(divisions);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      
      // Depth-based opacity & color: closer layers are luminous green #39FF88, deeper layers are deep teal/emerald #115E59
      const filamentColor = b.depthLayer === 2 
        ? 0x39ff88 // Foreground luminous green
        : b.depthLayer === 1 
          ? 0x22c55e // Mid-layer neural green
          : 0x0f766e; // Deep teal layer

      const lineMat = new THREE.LineBasicMaterial({
        color: filamentColor,
        transparent: true,
        opacity: isMobile ? 0.28 : (subtleMode ? 0.24 : 0.42),
        linewidth: 1
      });

      const line = new THREE.Line(lineGeo, lineMat);
      nerveLineGroup.add(line);
    });

    // ==========================================
    // 2. BIOLUMINESCENT NEURAL JUNCTION NODES
    // ==========================================
    const nodeGeometry = new THREE.SphereGeometry(1, 14, 14);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x86efac,
      transparent: true,
      opacity: subtleMode ? 0.65 : 0.9
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
    const particleCount = isMobile ? 40 : (subtleMode ? 50 : 90);
    const signalParticles: SignalParticle[] = [];
    const particleColors = [
      new THREE.Color(0x39ff88), // Luminous Green
      new THREE.Color(0x00ff9d), // Mint Emerald
      new THREE.Color(0x86efac), // Soft Highlight
      new THREE.Color(0x67e8f9)  // Action Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      signalParticles.push({
        branchIndex: Math.floor(Math.random() * branches.length),
        progress: Math.random(),
        speed: 0.0025 + Math.random() * 0.0055,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        size: isMobile ? 0.32 : 0.46
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
      size: isMobile ? 0.36 : 0.48,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });

    const signalPointSystem = new THREE.Points(particleGeo, particleMat);
    mainNetworkGroup.add(signalPointSystem);

    // ==========================================
    // 3B. ELECTRICAL PULSE PROPAGATION WAVES
    // ==========================================
    const electricalPulses: ElectricalPulse[] = [
      { branchIndex: 0, headProgress: 0.1, length: 0.25, speed: 0.008, intensity: 1.0 },
      { branchIndex: Math.floor(branches.length * 0.3), headProgress: 0.4, length: 0.3, speed: 0.007, intensity: 0.9 },
      { branchIndex: Math.floor(branches.length * 0.7), headProgress: 0.7, length: 0.22, speed: 0.009, intensity: 1.2 }
    ];

    // ==========================================
    // 4. FLOATING TRANSLUCENT SHIELD (FOREGROUND EMBLEM)
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
      transmission: 0.74,
      thickness: 1.25,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.85
    });

    const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldMesh.position.set(0, 0.4, 1.2);
    mainNetworkGroup.add(shieldMesh);

    // Center Verification Checkmark
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
    // 5. INTERACTIVE EVENT HANDLERS (POINTER & SCROLL)
    // ==========================================
    const pointer = { 
      x: 0, 
      y: 0, 
      targetX: 0, 
      targetY: 0,
      worldX: 0,
      worldY: 0
    };

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
      
      // Projected world position estimation
      pointer.worldX = pointer.targetX * 14;
      pointer.worldY = pointer.targetY * 9;
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
    // 6. ANIMATION & BIOLOGICAL NERVE PULSE LOOP
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
        // Continuous biological movement (gentle respiratory sway)
        const organicSway = Math.sin(elapsed * 0.45) * 0.04;
        mainNetworkGroup.rotation.y = pointer.x * 0.32 + organicSway;
        mainNetworkGroup.rotation.x = -pointer.y * 0.22 + Math.cos(elapsed * 0.38) * 0.03;
        mainNetworkGroup.position.y = Math.sin(elapsed * 0.75) * 0.22 - (scrollY * 0.0022);
        mainNetworkGroup.position.z = Math.cos(elapsed * 0.5) * 0.2;

        // Dynamic reaction when a verification check runs
        if (isAnalyzing) {
          shieldMaterial.emissive.setHex(0x39ff88);
          neuralGreenLight.intensity = 5.8;
          biolumLight.intensity = 4.8;
          tealLight.intensity = 4.2;
        } else {
          shieldMaterial.emissive.setHex(0x071e16);
          neuralGreenLight.intensity = 3.6;
          biolumLight.intensity = 2.6;
          tealLight.intensity = 2.0;
        }

        // Animate signal particles along nerve branches
        const positions = particleGeo.attributes.position.array as Float32Array;

        signalParticles.forEach((sp, idx) => {
          const currentSpeed = isAnalyzing ? sp.speed * 2.6 : sp.speed;
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

        // Advance electrical action-potential pulses
        electricalPulses.forEach((pulse) => {
          pulse.headProgress += pulse.speed;
          if (pulse.headProgress >= 1.0) {
            pulse.headProgress = 0;
            pulse.branchIndex = Math.floor(Math.random() * branches.length);
          }
        });

        // Neural node soft energy pulse + pointer proximity reaction
        neuralNodes.forEach((node, i) => {
          node.energy += 0.022;

          // Pointer proximity repulsion & brightening
          const dx = node.originalPosition.x - pointer.worldX;
          const dy = node.originalPosition.y - pointer.worldY;
          const distSq = dx * dx + dy * dy;
          const proximityInfluence = distSq < 16 ? (1 - Math.sqrt(distSq) / 4) : 0;

          // Gentle biological twitch when pointer is near
          node.position.x = node.originalPosition.x + dx * proximityInfluence * 0.12;
          node.position.y = node.originalPosition.y + dy * proximityInfluence * 0.12;

          // Rhythmic firing pulse
          const pulse = Math.sin(node.energy + elapsed * 1.6) * 0.32 + 0.68;
          const dynamicScale = node.baseScale * (1 + pulse * 0.35 + proximityInfluence * 0.45);

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
  }, [isAnalyzing, subtleMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {webglSupported ? (
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block opacity-90 dark:opacity-75 transition-opacity duration-300" 
        />
      ) : (
        /* CSS / SVG Static Fallback for non-WebGL environments */
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/70 via-slate-50 to-slate-100 dark:from-[#07130F] dark:via-[#091713] dark:to-[#07130F]">
          <div className="absolute inset-0 bg-[radial-gradient(#39ff88_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      )}
    </div>
  );
};
