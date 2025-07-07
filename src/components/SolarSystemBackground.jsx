import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SolarSystemBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planetsRef = useRef([]);
  const starsRef = useRef([]);
  const smallStarsRef = useRef([]);
  const asteroidBeltRef = useRef(null);

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
    camera.position.set(0, 8, 25);
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create distant stars background with different sizes
    const createStars = () => {
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 3000;
      const positions = new Float32Array(starsCount * 3);
      const colors = new Float32Array(starsCount * 3);
      const sizes = new Float32Array(starsCount);

      for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 300;

        // Different star colors
        const starType = Math.random();
        if (starType < 0.6) {
          // White/blue stars
          colors[i * 3] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 2] = 1.0;
        } else if (starType < 0.8) {
          // Yellow stars
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
        } else {
          // Red stars
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 0.5 + Math.random() * 0.3;
          colors[i * 3 + 2] = 0.3 + Math.random() * 0.3;
        }

        sizes[i] = Math.random() * 0.2 + 0.05;
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const starsMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true
      });

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);
      starsRef.current = stars;
    };

    createStars();

    // Create small glowing particles (nearby stars)
    const createSmallStars = () => {
      const smallStarsCount = 500;
      
      for (let i = 0; i < smallStarsCount; i++) {
        const starGeometry = new THREE.SphereGeometry(0.02 + Math.random() * 0.03, 8, 8);
        
        // Random star colors with glow
        const starColors = [
          0xffffff, // White
          0x87ceeb, // Sky blue
          0xffd700, // Gold
          0xff6b6b, // Light red
          0x98fb98, // Pale green
          0xdda0dd, // Plum
          0xffa500, // Orange
          0x00ffff  // Cyan
        ];
        
        const starColor = starColors[Math.floor(Math.random() * starColors.length)];
        const starMaterial = new THREE.MeshBasicMaterial({
          color: starColor,
          emissive: starColor,
          emissiveIntensity: 0.5 + Math.random() * 0.5
        });
        
        const star = new THREE.Mesh(starGeometry, starMaterial);
        
        // Random position in 3D space
        star.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        );
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.05 + Math.random() * 0.05, 8, 8);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: starColor,
          transparent: true,
          opacity: 0.3 + Math.random() * 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        star.add(glow);
        
        // Store animation data
        star.userData = {
          originalY: star.position.y,
          speed: Math.random() * 0.02 + 0.01,
          glowIntensity: Math.random() * 0.5 + 0.5
        };
        
        scene.add(star);
        smallStarsRef.current.push(star);
      }
    };

    createSmallStars();

    // Create Sun with enhanced glow effect
    const createSun = () => {
      const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 1.0
      });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sun.position.set(0, 0, 0);
      
      // Add multiple sun glow layers
      const glowLayers = [2.5, 3.0, 3.5];
      glowLayers.forEach((radius, index) => {
        const sunGlowGeometry = new THREE.SphereGeometry(radius, 32, 32);
        const sunGlowMaterial = new THREE.MeshBasicMaterial({
          color: 0xffd700,
          transparent: true,
          opacity: 0.2 - (index * 0.05)
        });
        const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
        sun.add(sunGlow);
      });
      
      scene.add(sun);
      planetsRef.current.push({ mesh: sun, orbitRadius: 0, speed: 0.01, tilt: 0, name: 'Sun' });
    };

    // Create planets with enhanced materials
    const createPlanet = (name, radius, distance, color, speed, tilt = 0, hasRings = false) => {
      const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const planetMaterial = new THREE.MeshPhongMaterial({ 
        color,
        shininess: 50,
        specular: 0x222222
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      
      planet.position.set(distance, 0, 0);
      planet.rotation.x = tilt;
      planet.castShadow = true;
      planet.receiveShadow = true;
      
      scene.add(planet);
      planetsRef.current.push({ 
        mesh: planet, 
        orbitRadius: distance, 
        speed: speed, 
        tilt: tilt,
        name: name,
        hasRings: hasRings
      });
    };

    // Create planets with realistic properties
    createSun();
    createPlanet('Mercury', 0.3, 4, 0x8c7853, 0.04);
    createPlanet('Venus', 0.5, 6, 0xffd700, 0.015);
    createPlanet('Earth', 0.6, 8, 0x0077be, 0.01);
    createPlanet('Mars', 0.4, 10, 0xff4500, 0.008);
    createPlanet('Jupiter', 1.2, 13, 0xffa500, 0.002);
    createPlanet('Saturn', 1.0, 16, 0xffd700, 0.0009, 0, true);
    createPlanet('Uranus', 0.8, 19, 0x00ffff, 0.0004);
    createPlanet('Neptune', 0.8, 22, 0x0000ff, 0.0001);

    // Create Saturn's rings
    const createSaturnRings = () => {
      const ringGeometry = new THREE.RingGeometry(1.5, 2.5, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const rings = new THREE.Mesh(ringGeometry, ringMaterial);
      rings.rotation.x = Math.PI / 2;
      rings.position.set(16, 0, 0);
      scene.add(rings);
      planetsRef.current.push({ 
        mesh: rings, 
        orbitRadius: 16, 
        speed: 0.0009, 
        tilt: 0,
        name: 'SaturnRings' 
      });
    };

    createSaturnRings();

    // Create asteroid belt
    const createAsteroidBelt = () => {
      const asteroidCount = 150;
      const asteroidGeometry = new THREE.SphereGeometry(0.03, 6, 6);
      const asteroidMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x666666,
        emissive: 0x333333,
        emissiveIntensity: 0.1
      });
      
      for (let i = 0; i < asteroidCount; i++) {
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
        const angle = Math.random() * Math.PI * 2;
        const radius = 11 + Math.random() * 2;
        asteroid.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 0.5,
          Math.sin(angle) * radius
        );
        scene.add(asteroid);
      }
    };

    createAsteroidBelt();

    // Enhanced lighting for darker universe theme
    const ambientLight = new THREE.AmbientLight(0x101010, 0.1);
    scene.add(ambientLight);

    // Sun light with enhanced glow
    const sunLight = new THREE.PointLight(0xffd700, 3, 60);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Additional directional light for depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate planets orbiting around the sun
      planetsRef.current.forEach((planet, index) => {
        if (planet.orbitRadius > 0) {
          planet.mesh.position.x = Math.cos(time * planet.speed) * planet.orbitRadius;
          planet.mesh.position.z = Math.sin(time * planet.speed) * planet.orbitRadius;
          planet.mesh.rotation.y += 0.01;
        } else {
          // Sun rotation
          planet.mesh.rotation.y += 0.005;
        }
      });

      // Animate distant stars with twinkling effect
      if (starsRef.current) {
        starsRef.current.rotation.y += 0.0002;
        starsRef.current.rotation.x += 0.0001;
        
        // Twinkling effect
        const positions = starsRef.current.geometry.attributes.position.array;
        const colors = starsRef.current.geometry.attributes.color.array;
        
        for (let i = 0; i < positions.length; i += 3) {
          const twinkle = Math.sin(time * 3 + i) * 0.15 + 0.85;
          colors[i] *= twinkle;
          colors[i + 1] *= twinkle;
          colors[i + 2] *= twinkle;
        }
        
        starsRef.current.geometry.attributes.color.needsUpdate = true;
      }

      // Animate small glowing stars
      smallStarsRef.current.forEach((star, index) => {
        const userData = star.userData;
        star.position.y = userData.originalY + Math.sin(time * userData.speed + index) * 0.5;
        star.rotation.y += 0.01;
        
        // Pulsing glow effect
        const glow = star.children[0];
        if (glow) {
          const pulse = Math.sin(time * 2 + index) * 0.2 + 0.8;
          glow.material.opacity = userData.glowIntensity * pulse;
        }
      });

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
      // More dynamic camera movement
      gsap.to(cameraRef.current.position, {
        x: 8,
        y: 12,
        z: 30,
        duration: 30,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to(cameraRef.current.rotation, {
        y: Math.PI * 0.3,
        x: Math.PI * 0.15,
        duration: 35,
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
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.95) 100%)'
      }}
    />
  );
};

export default SolarSystemBackground; 