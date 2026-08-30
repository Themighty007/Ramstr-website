import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface WebGLHeroProps {
  scrollProgress: number;
  onExploreClick: () => void;
}

export const WebGLHero: React.FC<WebGLHeroProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    if (!canvasRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;
    let isDisposed = false;

    // Mouse drag / interaction state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    try {
      // 1. Scene setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x02050a, 0.001);

      // 2. Camera setup
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 16.5);

      // 3. Renderer setup
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      // Group hierarchy
      const earthPivot = new THREE.Group();
      scene.add(earthPivot);

      const earthGroup = new THREE.Group();
      earthPivot.add(earthGroup);

      // ----------------------------------------------------

      // ----------------------------------------------------
      // REALISTIC TEXTURE LOADER
      // ----------------------------------------------------
      const textureLoader = new THREE.TextureLoader();
      
      const colorMap = textureLoader.load('https://unpkg.com/three-globe@2.45.2/example/img/earth-blue-marble.jpg');
      colorMap.colorSpace = THREE.SRGBColorSpace;
      
      const bumpMap = textureLoader.load('https://unpkg.com/three-globe@2.45.2/example/img/earth-topology.png');
      const specularMap = textureLoader.load('https://unpkg.com/three-globe@2.45.2/example/img/earth-water.png');
      const cloudsMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

      // THREE.JS MESHES & MATERIALS
      // ----------------------------------------------------

      const earthRadius = 5.2;

      // 1. Earth Core Planet Mesh
      const earthGeom = new THREE.SphereGeometry(earthRadius, 96, 96);
      const earthMat = new THREE.MeshStandardMaterial({
        map: colorMap,
        bumpMap: bumpMap,
        bumpScale: 0.015,
        roughnessMap: specularMap,
        roughness: 0.6,
        metalness: 0.15
      });
      const earthMesh = new THREE.Mesh(earthGeom, earthMat);
      earthGroup.add(earthMesh);

      // 2. Swirling Cloud Atmosphere Layer
      const cloudGeom = new THREE.SphereGeometry(earthRadius * 1.012, 64, 64);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudsMap,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
      earthGroup.add(cloudMesh);

      // 3. Rayleigh Atmospheric Limb Glow Shell (Custom Shader)
      const atmosphereGeom = new THREE.SphereGeometry(earthRadius * 1.14, 64, 64);
      const atmosphereMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vec3 viewDir = normalize(-vPosition);
            float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
            float intensity = pow(rim, 3.4);
            // Rayleigh scattering celestial cyan/azure blue
            vec3 atmosphereColor = vec3(0.08, 0.68, 1.0);
            gl_FragColor = vec4(atmosphereColor, intensity * 0.85);
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false
      });
      const atmosphereMesh = new THREE.Mesh(atmosphereGeom, atmosphereMat);
      earthGroup.add(atmosphereMesh);

      // 4. Photorealistic Starfield in Deep Cosmic Space
      const starCount = 2200;
      const starGeom = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);
      const starSizes = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        const r = 90 + Math.random() * 150;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        starPositions[i * 3 + 2] = r * Math.cos(phi);

        // Realistic star temperatures (Blue giant, White, Warm Gold, Cyan)
        const rand = Math.random();
        if (rand > 0.88) {
          // Electric Azure / Cyan
          starColors[i * 3] = 0.2;
          starColors[i * 3 + 1] = 0.8;
          starColors[i * 3 + 2] = 1.0;
          starSizes[i] = 2.4;
        } else if (rand > 0.75) {
          // Warm Solar Gold
          starColors[i * 3] = 1.0;
          starColors[i * 3 + 1] = 0.85;
          starColors[i * 3 + 2] = 0.55;
          starSizes[i] = 1.8;
        } else {
          // Brilliant Starlight White
          starColors[i * 3] = 0.95;
          starColors[i * 3 + 1] = 0.98;
          starColors[i * 3 + 2] = 1.0;
          starSizes[i] = 1.2;
        }
      }

      starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeom.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      const starMat = new THREE.PointsMaterial({
        size: 1.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
      });
      const starField = new THREE.Points(starGeom, starMat);
      scene.add(starField);

      // 5. Realistic Lighting Configuration (Sun Direction + Ambient Space Fill)
      // Primary Sun Light (Day side illumination)
      const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
      sunLight.position.set(18, 6, 12);
      scene.add(sunLight);

      // Secondary Solar Rim Light (Atmosphere halo back-edge)
      const rimLight = new THREE.DirectionalLight(0x0088ff, 0.7);
      rimLight.position.set(-14, -8, -10);
      scene.add(rimLight);

      // Deep space ambient fill (Prevents complete pitch black on dark side)
      const spaceAmbient = new THREE.AmbientLight(0x040e1e, 0.55);
      scene.add(spaceAmbient);

      // Initial Earth Tilt (23.4° axial tilt like real Earth)
      earthPivot.rotation.z = -0.41;
      earthGroup.rotation.x = 0.15;
      earthGroup.rotation.y = -0.8;

      // Position Earth nicely in hero viewport (Right-offset composition)
      const updateResponsivePosition = () => {
        if (window.innerWidth < 768) {
          earthPivot.position.set(0, 1.2, 0);
          earthPivot.scale.set(0.72, 0.72, 0.72);
        } else if (window.innerWidth < 1024) {
          earthPivot.position.set(2.2, -0.2, 0);
          earthPivot.scale.set(0.88, 0.88, 0.88);
        } else {
          earthPivot.position.set(3.4, -0.3, 0);
          earthPivot.scale.set(1, 1, 1);
        }
      };
      updateResponsivePosition();

      // ----------------------------------------------------
      // INTERACTIVE MOUSE ROTATION / DRAG CONTROLS
      // ----------------------------------------------------
      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        dragVelocity.x = deltaX * 0.003;
        dragVelocity.y = deltaY * 0.003;

        earthGroup.rotation.y += dragVelocity.x;
        earthGroup.rotation.x += dragVelocity.y;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const canvas = canvasRef.current;
      canvas.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      // Touch events for mobile
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          isDragging = true;
          previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        dragVelocity.x = deltaX * 0.004;
        dragVelocity.y = deltaY * 0.004;

        earthGroup.rotation.y += dragVelocity.x;
        earthGroup.rotation.x += dragVelocity.y;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };

      const onTouchEnd = () => {
        isDragging = false;
      };

      canvas.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);

      // ----------------------------------------------------
      // ANIMATION & SCROLL CHOREOGRAPHY LOOP
      // ----------------------------------------------------
      const clock = new THREE.Clock();

      const animate = () => {
        if (isDisposed) return;
        animationFrameId = requestAnimationFrame(animate);

        const delta = Math.min(clock.getDelta(), 0.1);

        // 1. Independent, continuous planetary rotation (Constant rate)
        earthMesh.rotation.y += delta * 0.038;
        // Clouds drift at independent differential velocity
        cloudMesh.rotation.y += delta * 0.052;
        // Slow star rotation
        starField.rotation.y += delta * 0.003;

        // Inertial damping after user drag
        if (!isDragging) {
          dragVelocity.x *= 0.92;
          dragVelocity.y *= 0.92;
          earthGroup.rotation.y += dragVelocity.x;
          earthGroup.rotation.x += dragVelocity.y;
        }

        // 2. Scroll-controlled Camera Dynamics & Descent
        // Note: Scroll does NOT rotate the Earth; it moves camera position and descends smoothly!
        const p = Math.min(Math.max(scrollRef.current, 0), 1);

        // Camera smoothly closes distance
        const startZ = 16.5;
        const targetZ = 7.8;
        camera.position.z = THREE.MathUtils.lerp(startZ, targetZ, p * 1.15);

        // Center Earth into frame as user scrolls
        const baseX = window.innerWidth < 768 ? 0 : 3.4;
        earthPivot.position.x = THREE.MathUtils.lerp(baseX, 0, p);
        earthPivot.position.y = THREE.MathUtils.lerp(window.innerWidth < 768 ? 1.2 : -0.3, 0, p);

        // Atmosphere transparency adjustment on cloud penetration
        if (p > 0.55) {
          const penetration = (p - 0.55) / 0.45;
          cloudMat.opacity = THREE.MathUtils.lerp(0.65, 0.12, penetration);
          atmosphereMesh.scale.setScalar(THREE.MathUtils.lerp(1, 1.3, penetration));
        } else {
          cloudMat.opacity = 0.65;
          atmosphereMesh.scale.setScalar(1);
        }

        renderer?.render(scene, camera);
      };

      animate();

      // Window Resize Handler
      const handleResize = () => {
        if (!renderer || !canvasRef.current) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateResponsivePosition();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        isDisposed = true;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        canvas.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to static visual:', err);
      setWebGlSupported(false);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      id="webgl-hero-container"
      className="relative w-full h-screen overflow-hidden bg-[#02050a] select-none"
    >
      {webGlSupported ? (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
        />
      ) : (
        /* Fallback Visual */
        <div className="absolute inset-0 flex items-center justify-end p-8 md:p-24 bg-radial from-slate-900 to-[#02050a]">
          <div className="w-80 h-80 md:w-120 md:h-120 rounded-full border border-cyan-500/30 bg-gradient-to-br from-blue-950/40 via-cyan-950/20 to-black shadow-2xl flex items-center justify-center relative">
            <div className="absolute text-center text-xs font-mono text-[#00F0FF]">
              SENTINEL-2 L2A<br/>EARTH OBSERVATION SIMULATION
            </div>
          </div>
        </div>
      )}

      {/* Subtle Space Depth Vignette (Dark Cosmic Edges) */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#02050a]/85 pointer-events-none"></div>

      {/* Scientific Horizon Grid Overlay */}
      <div className="absolute inset-0 scientific-grid-dark opacity-15 pointer-events-none"></div>
    </div>
  );
};
