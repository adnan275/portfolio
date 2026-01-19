import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 1000 }) {
    const points = useRef();
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (points.current) {
            points.current.rotation.x = time * 0.05;
            points.current.rotation.y = time * 0.075;
        }
    });

    return (
        <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#6366f1"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

function FloatingShape({ position, geometry, color, speed = 1 }) {
    const mesh = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.rotation.x = time * speed * 0.2;
            mesh.current.rotation.y = time * speed * 0.3;
            mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
        }
    });

    return (
        <mesh ref={mesh} position={position}>
            {geometry}
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.15}
                wireframe={false}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

            <ParticleField count={1000} />

            <FloatingShape
                position={[-3, 2, -2]}
                geometry={<icosahedronGeometry args={[0.5, 0]} />}
                color="#6366f1"
                speed={0.8}
            />
            <FloatingShape
                position={[3, -1, -3]}
                geometry={<torusGeometry args={[0.4, 0.15, 16, 32]} />}
                color="#8b5cf6"
                speed={1.2}
            />
            <FloatingShape
                position={[2, 2, -4]}
                geometry={<octahedronGeometry args={[0.4, 0]} />}
                color="#ec4899"
                speed={1}
            />
            <FloatingShape
                position={[-2, -2, -2]}
                geometry={<boxGeometry args={[0.5, 0.5, 0.5]} />}
                color="#06b6d4"
                speed={0.9}
            />
        </>
    );
}

const ThreeBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none'
        }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                frameloop="demand"
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
