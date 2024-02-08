import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Test = () => {
  return (
    <>
      <Canvas>
        <OrbitControls autoRotate={true} />
        <mesh>
          <ambientLight intensity={2} />
          <directionalLight position={[-1, 0, 1]} intensity={0.5} />
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={0xababab} />
        </mesh>
      </Canvas>
    </>
  );
};

export default Test;
