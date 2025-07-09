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
  const novaRef = useRef(null);
  const solarFlaresRef = useRef([]);

  const createNovaExplosion = (scene) => {
    const novaGroup = new THREE.Group();
    
    const novaColors = [0xff6b6b, 0xffd700, 0x00ffff, 0xff1493, 0x00ff00];
    const novaColor = novaColors[Math.floor(Math.random() * novaColors.length)];
    
    const novaPosition = new THREE.Vector3(
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 100 - 50
    );
    
    const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: novaColor
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.copy(novaPosition);
    novaGroup.add(core);
    
    const shockwaveLayers = [2, 4, 8, 16, 32, 48, 64];
    shockwaveLayers.forEach((radius, index) => {
      const shockwaveGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const shockwaveMaterial = new THREE.MeshBasicMaterial({
        color: novaColor,
        transparent: true,
        opacity: 0.8 - (index * 0.1),
        side: THREE.BackSide
      });
      const shockwave = new THREE.Mesh(shockwaveGeometry, shockwaveMaterial);
      shockwave.position.copy(novaPosition);
      novaGroup.add(shockwave);
    });
    
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = Math.random() * 50 + 10;
      
      particlePositions[i * 3] = novaPosition.x + Math.sin(phi) * Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = novaPosition.y + Math.sin(phi) * Math.sin(angle) * radius;
      particlePositions[i * 3 + 2] = novaPosition.z + Math.cos(phi) * radius;
      
      particleColors[i * 3] = novaColor / 0xffffff;
      particleColors[i * 3 + 1] = (novaColor >> 8) / 0xffffff;
      particleColors[i * 3 + 2] = (novaColor >> 16) / 0xffffff;
      
      particleSizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    novaGroup.add(particles);
    
    const novaLight = new THREE.PointLight(novaColor, 10, 200);
    novaLight.position.copy(novaPosition);
    novaGroup.add(novaLight);
    
    novaGroup.userData = {
      startTime: Date.now(),
      duration: 8000,
      novaColor: novaColor,
      novaLight: novaLight,
      particles: particles,
      shockwaves: novaGroup.children.filter(child => child !== core && child !== particles && child !== novaLight)
    };
    
    scene.add(novaGroup);
    novaRef.current = novaGroup;
  };

  const createSolarFlare = (scene) => {
    const flareGroup = new THREE.Group();
    
    const flareColors = [0xff6b6b, 0xffd700, 0xff4500, 0xff8c00, 0xff1493];
    const flareColor = flareColors[Math.floor(Math.random() * flareColors.length)];
    
    const flareDirection = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ).normalize();
    
    const flareLength = Math.random() * 8 + 4;
    const flareWidth = Math.random() * 0.8 + 0.4;
    
    const flareGeometry = new THREE.CylinderGeometry(flareWidth, flareWidth * 0.3, flareLength, 8, 1, true);
    const flareMaterial = new THREE.MeshBasicMaterial({
      color: flareColor,
      transparent: true,
      opacity: 0.9
    });
    
    const flare = new THREE.Mesh(flareGeometry, flareMaterial);
    flare.position.copy(flareDirection.clone().multiplyScalar(flareLength / 2 + 2));
    flare.lookAt(flareDirection.clone().multiplyScalar(flareLength + 2));
    flareGroup.add(flare);
    
    const glowLayers = [1.5, 2.5, 3.5];
    glowLayers.forEach((scale, index) => {
      const glowGeometry = new THREE.CylinderGeometry(flareWidth * scale, flareWidth * scale * 0.3, flareLength, 8, 1, true);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: flareColor,
        transparent: true,
        opacity: 0.4 - (index * 0.1),
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(flare.position);
      glow.lookAt(flareDirection.clone().multiplyScalar(flareLength + 2));
      flareGroup.add(glow);
    });
    
    const particleCount = 50;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const radius = Math.random() * flareWidth * 2;
      const angle = Math.random() * Math.PI * 2;
      
      const particlePos = flareDirection.clone()
        .multiplyScalar(2 + t * flareLength)
        .add(new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ));
      
      particlePositions[i * 3] = particlePos.x;
      particlePositions[i * 3 + 1] = particlePos.y;
      particlePositions[i * 3 + 2] = particlePos.z;
      
      particleColors[i * 3] = flareColor / 0xffffff;
      particleColors[i * 3 + 1] = (flareColor >> 8) / 0xffffff;
      particleColors[i * 3 + 2] = (flareColor >> 16) / 0xffffff;
      
      particleSizes[i] = Math.random() * 0.3 + 0.1;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    flareGroup.add(particles);
    
    const flareLight = new THREE.SpotLight(flareColor, 15, 30, Math.PI / 6, 0.5);
    flareLight.position.copy(flareDirection.clone().multiplyScalar(2));
    flareLight.target.position.copy(flareDirection.clone().multiplyScalar(flareLength + 2));
    flareLight.castShadow = true;
    flareGroup.add(flareLight);
    flareGroup.add(flareLight.target);
    
    const pointLight = new THREE.PointLight(flareColor, 8, 20);
    pointLight.position.copy(flareDirection.clone().multiplyScalar(flareLength / 2 + 2));
    flareGroup.add(pointLight);
    
    flareGroup.userData = {
      startTime: Date.now(),
      duration: 2000 + Math.random() * 1000,
      flareColor: flareColor,
      flareLight: flareLight,
      pointLight: pointLight,
      particles: particles,
      direction: flareDirection,
      length: flareLength,
      width: flareWidth
    };
    
    scene.add(flareGroup);
    solarFlaresRef.current.push(flareGroup);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 25);
    cameraRef.current = camera;

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

        const starType = Math.random();
        if (starType < 0.6) {
          colors[i * 3] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 2] = 1.0;
        } else if (starType < 0.8) {
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
        } else {
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

    const createSmallStars = () => {
      const smallStarsCount = 500;
      
      for (let i = 0; i < smallStarsCount; i++) {
        const starGeometry = new THREE.SphereGeometry(0.02 + Math.random() * 0.03, 8, 8);
        
        const starColors = [
          0xffffff,
          0x87ceeb,
          0xffd700,
          0xff6b6b,
          0x98fb98,
          0xdda0dd,
          0xffa500,
          0x00ffff
        ];
        
        const starColor = starColors[Math.floor(Math.random() * starColors.length)];
        const starMaterial = new THREE.MeshPhongMaterial({
          color: starColor
        });
        
        const starGroup = new THREE.Group();
        const star = new THREE.Mesh(starGeometry, starMaterial);
        starGroup.add(star);
        
        starGroup.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        );
        
        const glowLayers = [0.08, 0.12, 0.18];
        glowLayers.forEach((glowRadius, index) => {
          const glowGeometry = new THREE.SphereGeometry(glowRadius, 8, 8);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: starColor,
          transparent: true,
            opacity: 0.4 - (index * 0.1),
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          starGroup.add(glow);
        });
        
        const starLight = new THREE.PointLight(starColor, 0.3, 8);
        starLight.position.set(0, 0, 0);
        starGroup.add(starLight);
        
        starGroup.userData = {
          originalY: starGroup.position.y,
          speed: Math.random() * 0.02 + 0.01,
          glowIntensity: Math.random() * 0.5 + 0.5,
          starLight: starLight
        };
        
        scene.add(starGroup);
        smallStarsRef.current.push(starGroup);
      }
    };

    createSmallStars();

    const createSun = () => {
      const sunGroup = new THREE.Group();
      
      const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
      const sunMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700
      });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sunGroup.add(sun);
      
      const glowLayers = [2.8, 3.5, 4.2, 5.0, 6.0];
      glowLayers.forEach((radius, index) => {
        const sunGlowGeometry = new THREE.SphereGeometry(radius, 32, 32);
        const sunGlowMaterial = new THREE.MeshBasicMaterial({
          color: 0xffd700,
          transparent: true,
          opacity: 0.3 - (index * 0.05),
          side: THREE.BackSide
        });
        const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
        sunGroup.add(sunGlow);
      });
      
      const sunLight = new THREE.PointLight(0xffd700, 5, 100);
      sunLight.position.set(0, 0, 0);
      sunGroup.add(sunLight);
      
      const coronaGeometry = new THREE.SphereGeometry(8, 32, 32);
      const coronaMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
      });
      const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
      sunGroup.add(corona);
      
      scene.add(sunGroup);
      planetsRef.current.push({ 
        mesh: sunGroup, 
        orbitRadius: 0, 
        speed: 0.01, 
        tilt: 0, 
        name: 'Sun',
        pointLight: sunLight,
        glowIntensity: 1.0
      });
    };

    const createPlanet = (name, radius, distance, color, speed, tilt = 0, hasRings = false) => {
      const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const planetMaterial = new THREE.MeshPhongMaterial({ 
        color,
        emissive: color,
        shininess: 100,
        specular: 0x444444
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      
      planet.position.set(distance, 0, 0);
      planet.rotation.x = tilt;
      planet.castShadow = true;
      planet.receiveShadow = true;
      
      const planetGroup = new THREE.Group();
      planetGroup.add(planet);
      
      const glowLayers = [radius * 1.2, radius * 1.4, radius * 1.6];
      glowLayers.forEach((glowRadius, index) => {
        const glowGeometry = new THREE.SphereGeometry(glowRadius, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.15 - (index * 0.05),
          side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        planetGroup.add(glow);
      });
      
      const pointLight = new THREE.PointLight(color, 0.5, 20);
      pointLight.position.set(0, 0, 0);
      planetGroup.add(pointLight);
      
      scene.add(planetGroup);
      planetsRef.current.push({ 
        mesh: planetGroup, 
        orbitRadius: distance, 
        speed: speed, 
        tilt: tilt,
        name: name,
        hasRings: hasRings,
        pointLight: pointLight,
        glowIntensity: Math.random() * 0.5 + 0.5
      });
    };

    createSun();
    createPlanet('Mercury', 0.3, 4, 0x8c7853, 0.04);
    createPlanet('Venus', 0.5, 6, 0xffd700, 0.015);
    createPlanet('Earth', 0.6, 8, 0x0077be, 0.01);
    createPlanet('Mars', 0.4, 10, 0xff4500, 0.008);
    createPlanet('Jupiter', 1.2, 13, 0xffa500, 0.002);
    createPlanet('Saturn', 1.0, 16, 0xffd700, 0.0009, 0, true);
    createPlanet('Uranus', 0.8, 19, 0x00ffff, 0.0004);
    createPlanet('Neptune', 0.8, 22, 0x0000ff, 0.0001);

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

    const createAsteroidBelt = () => {
      const asteroidCount = 150;
      const asteroidGeometry = new THREE.SphereGeometry(0.03, 6, 6);
      
      for (let i = 0; i < asteroidCount; i++) {
        const asteroidColor = Math.random() > 0.8 ? 0xffd700 : 0x666666;
        const asteroidMaterial = new THREE.MeshPhongMaterial({ 
          color: asteroidColor
        });
        
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
        const angle = Math.random() * Math.PI * 2;
        const radius = 11 + Math.random() * 2;
        asteroid.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 0.5,
          Math.sin(angle) * radius
        );
        
        if (Math.random() > 0.9) {
          const glowGeometry = new THREE.SphereGeometry(0.06, 6, 6);
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: asteroidColor,
            transparent: true,
            opacity: 0.3
          });
          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          asteroid.add(glow);
        }
        
        scene.add(asteroid);
      }
    };

    createAsteroidBelt();

    createNovaExplosion(scene);

    const ambientLight = new THREE.AmbientLight(0x101010, 0.1);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffd700, 3, 60);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      planetsRef.current.forEach((planet, index) => {
        if (planet.orbitRadius > 0) {
          planet.mesh.position.x = Math.cos(time * planet.speed) * planet.orbitRadius;
          planet.mesh.position.z = Math.sin(time * planet.speed) * planet.orbitRadius;
          planet.mesh.rotation.y += 0.01;
        } else {
          planet.mesh.rotation.y += 0.005;
        }
        
        if (planet.pointLight) {
          const pulse = Math.sin(time * 1.5 + index) * 0.2 + 0.8;
          planet.pointLight.intensity = 0.5 * pulse;
        }
        
        if (planet.name === 'Sun') {
          const sunPulse = Math.sin(time * 0.5) * 0.3 + 0.7;
          planet.pointLight.intensity = 5 * sunPulse;
        }
      });

      if (starsRef.current) {
        starsRef.current.rotation.y += 0.0002;
        starsRef.current.rotation.x += 0.0001;
        
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

      smallStarsRef.current.forEach((starGroup, index) => {
        const userData = starGroup.userData;
        starGroup.position.y = userData.originalY + Math.sin(time * userData.speed + index) * 0.5;
        starGroup.rotation.y += 0.01;
        
        const pulse = Math.sin(time * 2 + index) * 0.3 + 0.7;
        if (userData.starLight) {
          userData.starLight.intensity = 0.3 * pulse;
        }
        
        starGroup.children.forEach((child, childIndex) => {
          if (childIndex > 0 && child.material && child.material.opacity !== undefined) {
            child.material.opacity = (0.4 - (childIndex - 1) * 0.1) * pulse;
          }
        });
      });

      if (novaRef.current) {
        const novaData = novaRef.current.userData;
        const elapsed = Date.now() - novaData.startTime;
        const progress = Math.min(1, elapsed / novaData.duration);
        
        if (progress < 1) {
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const easeIn = Math.pow(progress, 2);
          
          novaData.novaLight.intensity = 10 * (1 - easeOut);
          
          novaData.shockwaves.forEach((shockwave, index) => {
            const scale = 1 + (easeOut * 3);
            shockwave.scale.setScalar(scale);
            shockwave.material.opacity = (0.8 - (index * 0.1)) * (1 - easeOut);
          });
          
          if (novaData.particles) {
            const positions = novaData.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
              const originalX = positions[i];
              const originalY = positions[i + 1];
              const originalZ = positions[i + 2];
              
              const expansion = easeOut * 2;
              positions[i] = originalX * (1 + expansion);
              positions[i + 1] = originalY * (1 + expansion);
              positions[i + 2] = originalZ * (1 + expansion);
            }
            novaData.particles.geometry.attributes.position.needsUpdate = true;
            novaData.particles.material.opacity = 0.8 * (1 - easeOut);
          }
        } else {
          scene.remove(novaRef.current);
          novaRef.current = null;
          
          setTimeout(() => {
            if (!novaRef.current) {
              createNovaExplosion(scene);
            }
          }, Math.random() * 10000 + 5000);
        }
      }

      solarFlaresRef.current.forEach((flareGroup, index) => {
        const flareData = flareGroup.userData;
        const elapsed = Date.now() - flareData.startTime;
        const progress = Math.min(1, elapsed / flareData.duration);
        
        if (progress < 1) {
          const easeOut = 1 - Math.pow(1 - progress, 2);
          const easeIn = Math.pow(progress, 3);
          
          const intensity = 15 * easeIn * (1 - easeOut);
          flareData.flareLight.intensity = intensity;
          flareData.pointLight.intensity = 8 * easeIn * (1 - easeOut);
          
          flareGroup.children.forEach((child, childIndex) => {
            if (child.material && child.material.opacity !== undefined) {
              if (childIndex === 0) {
                child.material.opacity = 0.9 * (1 - easeOut);
              } else if (childIndex < 4) {
                child.material.opacity = (0.4 - ((childIndex - 1) * 0.1)) * (1 - easeOut);
              }
            }
          });
          
          if (flareData.particles) {
            flareData.particles.material.opacity = 0.8 * (1 - easeOut);
            
            const positions = flareData.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
              const expansion = easeOut * 2;
              positions[i] += flareData.direction.x * expansion * 0.1;
              positions[i + 1] += flareData.direction.y * expansion * 0.1;
              positions[i + 2] += flareData.direction.z * expansion * 0.1;
            }
            flareData.particles.geometry.attributes.position.needsUpdate = true;
          }
        } else {
          scene.remove(flareGroup);
          solarFlaresRef.current.splice(index, 1);
        }
      });

      if (Math.random() < 0.02 && solarFlaresRef.current.length < 3) {
        createSolarFlare(scene);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useGSAP(() => {
    if (cameraRef.current) {
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