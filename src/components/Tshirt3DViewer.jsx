import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

function TshirtModel({ customImage, customText }) {
  // Create a simple t-shirt shape using Three.js primitives
  return (
    <group>
      {/* T-shirt body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* T-shirt sleeves */}
      <mesh position={[-0.6, 0.3, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.6, 0.3, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* T-shirt neck */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Custom image if provided */}
      {customImage && (
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshStandardMaterial 
            map={new THREE.TextureLoader().load(customImage)}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
      
      {/* Custom text if provided */}
      {customText && (
        <Text
          position={[0, 0, 0.07]}
          fontSize={0.1}
          color="black"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.8}
        >
          {customText}
        </Text>
      )}
    </group>
  );
}

export default function Tshirt3DViewer({ customImage, customText }) {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1.5, 0.1]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        }>
          <TshirtModel customImage={customImage} customText={customText} />
        </Suspense>
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3/4}
        />
      </Canvas>
    </div>
  );
} 