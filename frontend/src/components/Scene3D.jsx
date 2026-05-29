import { Canvas, useFrame } from "@react-three/fiber";
import { Component } from "react";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const PALETTES = {
  home: {
    primary: "#00d1c7",
    secondary: "#ff6f61",
    tertiary: "#b7e85f",
    thread: "#101314"
  },
  products: {
    primary: "#00a6a6",
    secondary: "#7cdbd5",
    tertiary: "#ffb199",
    thread: "#101314"
  },
  admin: {
    primary: "#00d1c7",
    secondary: "#b7e85f",
    tertiary: "#ffffff",
    thread: "#ffffff"
  },
  default: {
    primary: "#00d1c7",
    secondary: "#ff6f61",
    tertiary: "#b7e85f",
    thread: "#101314"
  }
};

function WavyRibbon({ color, y = 0, z = 0, width = 5.8, speed = 1, phase = 0 }) {
  const meshRef = useRef(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(width, 0.28, 72, 2), [width]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { array } = mesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      array[i + 2] = Math.sin(x * 2.1 + state.clock.elapsedTime * speed + phase) * 0.2;
    }
    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.rotation.y = Math.sin(state.clock.elapsedTime * 0.28 + phase) * 0.18;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, y, z]} rotation={[-0.28, 0, 0.08]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.22}
        metalness={0.45}
        roughness={0.28}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ThreadField({ palette, dark = false }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.2;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  const threadColor = dark ? "#ffffff" : palette.thread;
  const opacity = dark ? 0.28 : 0.16;

  return (
    <group ref={groupRef} rotation={[0.22, -0.3, -0.08]}>
      {Array.from({ length: 15 }).map((_, index) => (
        <mesh key={`warp-${index}`} position={[-3.6 + index * 0.52, 0, -1.2]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 5.8, 10]} />
          <meshStandardMaterial color={threadColor} transparent opacity={opacity} />
        </mesh>
      ))}
      {Array.from({ length: 9 }).map((_, index) => (
        <mesh key={`weft-${index}`} position={[0, -2.2 + index * 0.55, -1.28]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 7.7, 10]} />
          <meshStandardMaterial color={threadColor} transparent opacity={opacity * 0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Loom({ palette, variant }) {
  const rigRef = useRef(null);
  const dark = variant === "admin";

  useFrame((state) => {
    if (!rigRef.current) return;
    rigRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.14) * 0.08;
    rigRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.11) * 0.06;
  });

  return (
    <group ref={rigRef} position={[0.3, 0, 0]}>
      <ThreadField palette={palette} dark={dark} />
      <WavyRibbon color={palette.primary} y={0.95} z={0.15} speed={1.25} phase={0} />
      <WavyRibbon color={palette.secondary} y={0.25} z={0.05} speed={1.05} phase={1.7} />
      <WavyRibbon color={palette.tertiary} y={-0.45} z={-0.05} speed={1.45} phase={3.2} width={5.1} />
      <mesh position={[2.95, -1.35, -0.55]} rotation={[0.2, 0.1, 0.28]}>
        <boxGeometry args={[1.35, 0.08, 0.08]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={0.28} />
      </mesh>
      <mesh position={[-2.55, 1.55, -0.5]} rotation={[0.2, -0.2, -0.45]}>
        <boxGeometry args={[1.15, 0.08, 0.08]} />
        <meshStandardMaterial color={palette.secondary} emissive={palette.secondary} emissiveIntensity={0.22} />
      </mesh>
    </group>
  );
}

class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.setState({ failed: true });
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function FallbackLoom({ palette }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="css-loom" style={{ "--loom-a": palette.primary, "--loom-b": palette.secondary, "--loom-c": palette.tertiary }}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function Scene3D({ variant = "default", className = "" }) {
  const palette = PALETTES[variant] || PALETTES.default;
  const dark = variant === "admin";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <SceneBoundary fallback={<FallbackLoom palette={palette} />}>
        <Canvas
          camera={{ position: [0, 0.1, 7.4], fov: 46 }}
          dpr={[1, 1.6]}
          gl={{ alpha: true, antialias: true }}
          className="h-full w-full"
          fallback={<FallbackLoom palette={palette} />}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={dark ? 0.55 : 0.75} />
            <directionalLight position={[4, 5, 6]} intensity={1.35} color={palette.primary} />
            <pointLight position={[-4, -2, 4]} intensity={1.2} color={palette.secondary} />
            <Loom palette={palette} variant={variant} />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
