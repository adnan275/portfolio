import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Particles3D({ count = 800, mouse }) {
    const points = useRef();

    const particlesData = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 5 + 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            const depth = Math.abs(positions[i3 + 2]) / 5;
            colors[i3] = 0.4 + depth * 0.6;
            colors[i3 + 1] = 0.4 + depth * 0.4;
            colors[i3 + 2] = 0.95;

            sizes[i] = Math.random() * 0.03 + 0.01;
        }

        return { positions, colors, sizes };
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            const time = state.clock.getElapsedTime();
            points.current.rotation.y = time * 0.03;
            points.current.rotation.x = Math.sin(time * 0.02) * 0.1;

            if (mouse.current) {
                points.current.rotation.x += mouse.current.y * 0.0001;
                points.current.rotation.y += mouse.current.x * 0.0001;
            }
        }
    });

    return (
        <Points
            ref={points}
            positions={particlesData.positions}
            colors={particlesData.colors}
            sizes={particlesData.sizes}
            stride={3}
        >
            <PointMaterial
                transparent
                vertexColors
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

const ParticleBackground3D = ({ particleCount = 600 }) => {
    const mouse = useRef({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        mouse.current = {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        };
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{
                    alpha: true,
                    antialias: false,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
            >
                <Particles3D count={particleCount} mouse={mouse} />
            </Canvas>
        </div>
    );
};

export default ParticleBackground3D;
