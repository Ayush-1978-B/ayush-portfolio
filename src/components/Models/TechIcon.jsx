import { Center, Environment, Float, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";

function TechIcon({ model }) {
  const scene = useGLTF(model.modelPath);

  return (
    <Canvas>
      <ambientLight intensity={0.3}/>
      <directionalLight position={[5,5,5]} intensity={1}/>

      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
      <Float speed={1.5} rotationIntensity={2} floatIntensity={10}>
        <Center>
          <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group></Center>
      </Float>
    </Canvas>
  )
}

export default TechIcon