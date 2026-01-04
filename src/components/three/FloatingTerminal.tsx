import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function DataParticles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      const speed = 0.02 + Math.random() * 0.03;
      temp.push({ x, y, z, speed, offset: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed + particle.offset;
      dummy.position.set(
        particle.x + Math.sin(t) * 0.5,
        particle.y + Math.cos(t * 0.8) * 0.5,
        particle.z + Math.sin(t * 0.6) * 0.3
      );
      dummy.scale.setScalar(0.02 + Math.sin(t * 2) * 0.01);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00ff00" transparent opacity={0.8} />
    </instancedMesh>
  );
}

function TerminalBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          emissive="#00ff00"
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* Terminal screen */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[2.8, 1.8]} />
        <meshBasicMaterial color="#0a0a0f" />
      </mesh>
      {/* Glowing border */}
      <mesh position={[0, 0, 0.12]}>
        <ringGeometry args={[1.5, 1.52, 4]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const lines = useMemo(() => {
    const lineData = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const startX = Math.cos(angle) * 2;
      const startY = Math.sin(angle) * 2;
      lineData.push({
        points: [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(startX * 0.5, startY * 0.5, 0),
          new THREE.Vector3(startX, startY, Math.random() - 0.5),
        ],
      });
    }
    return lineData;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={line.points.length}
              array={new Float32Array(line.points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00ff00" transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff00" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
      
      <TerminalBox />
      <DataParticles count={150} />
      <ConnectionLines />
      
      {/* Background glow */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial 
          color="#00ff00" 
          transparent 
          opacity={0.02}
        />
      </mesh>
    </>
  );
}

export default function FloatingTerminal() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
