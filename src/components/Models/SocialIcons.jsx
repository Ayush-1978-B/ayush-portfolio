import React, { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations, Stars, Text } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";

const Model = ({ url, link, scale, ...props }) => {
  const { scene, animations } = useGLTF(url);
  const { ref, actions } = useAnimations(animations);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    
  }, [actions, url]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  const springProps = useSpring({
    scale: hovered ? scale * 1.2 : scale,
  });

  return (
    <a.primitive
      {...props}
      object={scene}
      ref={ref}
      scale={springProps.scale}
      rotation={url === "/models/linkdin.glb" ? [Math.PI / 2, 0, 0] : [0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => window.open(link, "_blank")}
    />
  );
};

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = { fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])
  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion)
    ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
  })
  return <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...props} {...fontProps} children={children} />
}

function Cloud({ count = 4, radius = 20 }) {
  const words = useMemo(() => {
    const temp = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++) temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), 'contact me'])
    return temp
  }, [count, radius])
  return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

const SocialIcons = ({ icon, scale = 1.5 }) => {
  const spring = useSpring({
    from: { opacity: 0, position: [0, -5, 0] },
    to: { opacity: 1, position: [0, 0, 0] },
    delay: 200,
  });

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          autoRotate
          minPolarAngle={-Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <a.group {...spring}>
          <Model url={icon.url} link={icon.link} scale={scale} />
        </a.group>
        <Cloud count={8} radius={20} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default SocialIcons;