import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";

const Model = ({ url, link, scale, ...props }) => {
  const { scene, animations } = useGLTF(url);
  const { ref, actions } = useAnimations(animations);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // if (url === "/models/linkdin.glb") {
    //   actions[Object.keys(actions)[0]].play();
    // }
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
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => window.open(link, "_blank")}
    />
  );
};

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
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default SocialIcons;