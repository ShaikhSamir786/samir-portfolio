import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Skill {
  name: string;
  proficiency: number;
  category: "backend" | "frontend" | "database" | "devops";
  position: [number, number, number];
}

const skills: Skill[] = [
  { name: "Node.js", proficiency: 95, category: "backend", position: [-2, 1.5, 0] },
  { name: "TypeScript", proficiency: 92, category: "frontend", position: [1, 1.5, -0.5] },
  { name: "React", proficiency: 90, category: "frontend", position: [2, 0.5, 0.5] },
  { name: "PostgreSQL", proficiency: 85, category: "database", position: [0, -1.5, 1] },
  { name: "MongoDB", proficiency: 82, category: "database", position: [-1.5, -1, 0.5] },
  { name: "Docker", proficiency: 88, category: "devops", position: [1.5, -0.5, -1] },
  { name: "GraphQL", proficiency: 85, category: "backend", position: [-0.5, 1, -1.5] },
  { name: "Next.js", proficiency: 87, category: "frontend", position: [1, 1, 1.5] },
  { name: "Redis", proficiency: 78, category: "database", position: [-1, -0.5, -1] },
  { name: "HTML", proficiency: 95, category: "frontend", position: [-1.8, -0.5, 1.5] },
  { name: "CSS", proficiency: 95, category: "frontend", position: [1.8, -1.2, 0.5] },
  { name: "JavaScript", proficiency: 95, category: "frontend", position: [0, 2.2, 0] },
  { name: "Bootstrap", proficiency: 90, category: "frontend", position: [-2, -1.5, -1] },
  { name: "Tailwind", proficiency: 95, category: "frontend", position: [2, 1, -1] },
  { name: "Framer", proficiency: 92, category: "frontend", position: [0.5, -2, -1] },
  { name: "Express", proficiency: 90, category: "backend", position: [2.2, 0, 0] },
  { name: "NestJS", proficiency: 88, category: "backend", position: [-2.2, 0, 0] },

];

const categoryColors: Record<string, string> = {
  backend: "#00ff00",
  frontend: "#00ffff",
  database: "#ff00ff",
  devops: "#ffff00",
};

function SkillNode({ skill, onHover }: { skill: Skill; onHover: (skill: Skill | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const size = (skill.proficiency / 100) * 0.3 + 0.15;
  const color = categoryColors[skill.category];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        hovered ? size * 1.3 : size * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={skill.position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            setHovered(true);
            onHover(skill);
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        {/* Glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.2, size * 1.4, 32]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.6 : 0.2} side={THREE.DoubleSide} />
        </mesh>
        {hovered && (
          <Html center distanceFactor={5}>
            <div className="bg-background/90 border-2 border-primary px-4 py-2 whitespace-nowrap">
              <p className="text-primary font-bold text-sm">{skill.name}</p>
              <p className="text-foreground text-xs">{skill.proficiency}%</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function ConnectionLines({ skills }: { skills: Skill[] }) {
  const connections = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];

    skills.forEach((skill, i) => {
      skills.slice(i + 1).forEach((otherSkill) => {
        // Connect skills in same category or adjacent positions
        if (
          skill.category === otherSkill.category ||
          Math.random() > 0.7
        ) {
          lines.push({
            start: new THREE.Vector3(...skill.position),
            end: new THREE.Vector3(...otherSkill.position),
            color: categoryColors[skill.category],
          });
        }
      });
    });

    return lines;
  }, [skills]);

  return (
    <group>
      {connections.map((conn, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                conn.start.x, conn.start.y, conn.start.z,
                conn.end.x, conn.end.y, conn.end.z,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={conn.color} transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
}

function Scene() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />

      <group ref={groupRef}>
        <ConnectionLines skills={skills} />
        {skills.map((skill) => (
          <SkillNode key={skill.name} skill={skill} onHover={setHoveredSkill} />
        ))}
      </group>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function SkillsConstellation() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
