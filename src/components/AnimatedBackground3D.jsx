import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedBackground3D = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const lightsRef = useRef([]);
  const modelsRef = useRef([]);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create pulsing lights with different colors
    const createPulsingLight = (x, y, z, color, intensity = 1) => {
      const light = new THREE.PointLight(color, intensity, 50);
      light.position.set(x, y, z);
      light.castShadow = true;
      scene.add(light);
      lightsRef.current.push(light);
      return light;
    };

    // Add multiple pulsing lights in a more dynamic pattern
    createPulsingLight(3, 3, 3, 0xff6b6b, 2);
    createPulsingLight(-3, -3, 3, 0x4ecdc4, 2);
    createPulsingLight(3, -3, 3, 0x45b7d1, 2);
    createPulsingLight(-3, 3, 3, 0x96ceb4, 2);
    createPulsingLight(0, 4, 4, 0xffeaa7, 3);
    createPulsingLight(0, -4, 4, 0xdda0dd, 2);
    createPulsingLight(4, 0, 4, 0xffa726, 2);
    createPulsingLight(-4, 0, 4, 0xab47bc, 2);

    // Create particle system
    const createParticles = () => {
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        colors[i * 3] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 2] = Math.random() * 0.5 + 0.5;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      particlesRef.current = particles;
    };

    createParticles();

    // Create floating geometric shapes with more variety
    const createFloatingShape = (geometry, material, x, y, z) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = {
        originalY: y,
        originalX: x,
        speed: Math.random() * 0.02 + 0.01,
        rotationSpeed: Math.random() * 0.02 + 0.01,
        floatRange: Math.random() * 2 + 1,
        horizontalRange: Math.random() * 1 + 0.5
      };
      scene.add(mesh);
      modelsRef.current.push(mesh);
      return mesh;
    };

    // Create various geometric shapes with better materials
    const geometries = [
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
      new THREE.SphereGeometry(0.4, 32, 32),
      new THREE.TorusGeometry(0.4, 0.15, 16, 32),
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.5),
      new THREE.IcosahedronGeometry(0.4),
      new THREE.ConeGeometry(0.3, 0.8, 8),
      new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0xff6b6b, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x4ecdc4, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x45b7d1, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x96ceb4, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xffeaa7, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xdda0dd, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xffa726, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xab47bc, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100
      })
    ];

    // Create multiple floating shapes
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 6;
      createFloatingShape(geometry, material, x, y, z);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate lights pulsing with different frequencies
      lightsRef.current.forEach((light, index) => {
        light.intensity = 1 + Math.sin(time * (1.5 + index * 0.3)) * 0.8;
        light.position.x += Math.sin(time * 0.5 + index) * 0.01;
        light.position.y += Math.cos(time * 0.5 + index) * 0.01;
      });

      // Animate floating shapes with more complex movement
      modelsRef.current.forEach((model, index) => {
        const userData = model.userData;
        model.position.y = userData.originalY + Math.sin(time * userData.speed + index) * userData.floatRange;
        model.position.x = userData.originalX + Math.sin(time * userData.speed * 0.7 + index) * userData.horizontalRange;
        model.rotation.x += userData.rotationSpeed;
        model.rotation.y += userData.rotationSpeed * 0.7;
        model.rotation.z += userData.rotationSpeed * 0.5;
      });

      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // GSAP animations for camera movement
  useGSAP(() => {
    if (cameraRef.current) {
      // More complex camera movement
      gsap.to(cameraRef.current.position, {
        x: 3,
        y: 2,
        z: 10,
        duration: 12,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to(cameraRef.current.rotation, {
        y: Math.PI * 0.15,
        x: Math.PI * 0.05,
        duration: 15,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)'
      }}
    />
  );
};

export default AnimatedBackground3D; 