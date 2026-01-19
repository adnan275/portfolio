import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

function SkillCard3D({ skill, position, index }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.y = hovered
                ? time * 2
                : Math.sin(time * 0.5 + index) * 0.2;
            meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[0.8, 1, 0.1]} />
                <meshStandardMaterial
                    color={hovered ? '#6366f1' : '#1e1e22'}
                    emissive={hovered ? '#6366f1' : '#000000'}
                    emissiveIntensity={hovered ? 0.5 : 0}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    );
}

function SkillCards3D({ skills }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {skills.slice(0, 8).map((skill, index) => {
                const angle = (index / 8) * Math.PI * 2;
                const radius = 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <SkillCard3D
                        key={index}
                        skill={skill}
                        position={[x, 0, z]}
                        index={index}
                    />
                );
            })}
        </group>
    );
}

const SkillCards3DCanvas = ({ skills }) => {
    return (
        <div style={{
            width: '100%',
            height: '400px',
            position: 'relative'
        }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                <SkillCards3D skills={skills} />
            </Canvas>
        </div>
    );
};

export default SkillCards3DCanvas;
