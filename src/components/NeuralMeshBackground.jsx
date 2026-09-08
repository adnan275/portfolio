import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NeuralNetwork = ({ nodeCount = 70, maxDistance = 3.5 }) => {
    const groupRef = useRef();
    const linesRef = useRef();
    const pointsRef = useRef();

    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(nodeCount * 3);
        const vel = [];
        for (let i = 0; i < nodeCount; i++) {
            const i3 = i * 3;
            pos[i3] = (Math.random() - 0.5) * 12;
            pos[i3 + 1] = (Math.random() - 0.5) * 8;
            pos[i3 + 2] = (Math.random() - 0.5) * 6;

            vel.push({
                x: (Math.random() - 0.5) * 0.005,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.003,
            });
        }
        return { positions: pos, velocities: vel };
    }, [nodeCount]);

    const linePositions = useMemo(() => {
        const maxLines = (nodeCount * (nodeCount - 1)) / 2;
        return new Float32Array(maxLines * 6);
    }, [nodeCount]);

    const lineColors = useMemo(() => {
        const maxLines = (nodeCount * (nodeCount - 1)) / 2;
        return new Float32Array(maxLines * 6);
    }, [nodeCount]);

    useFrame((state) => {
        if (!pointsRef.current || !linesRef.current) return;

        const time = state.clock.getElapsedTime();
        const posAttr = pointsRef.current.geometry.attributes.position;
        const posArray = posAttr.array;

        for (let i = 0; i < nodeCount; i++) {
            const i3 = i * 3;
            posArray[i3] += velocities[i].x;
            posArray[i3 + 1] += velocities[i].y;
            posArray[i3 + 2] += velocities[i].z;

            if (Math.abs(posArray[i3]) > 7) velocities[i].x *= -1;
            if (Math.abs(posArray[i3 + 1]) > 5) velocities[i].y *= -1;
            if (Math.abs(posArray[i3 + 2]) > 4) velocities[i].z *= -1;
        }
        posAttr.needsUpdate = true;

        let vertexIndex = 0;
        let colorIndex = 0;
        let lineCount = 0;

        for (let i = 0; i < nodeCount; i++) {
            const i3 = i * 3;
            const x1 = posArray[i3];
            const y1 = posArray[i3 + 1];
            const z1 = posArray[i3 + 2];

            for (let j = i + 1; j < nodeCount; j++) {
                const j3 = j * 3;
                const x2 = posArray[j3];
                const y2 = posArray[j3 + 1];
                const z2 = posArray[j3 + 2];

                const dx = x1 - x2;
                const dy = y1 - y2;
                const dz = z1 - z2;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDistance) {
                    const alpha = 1 - dist / maxDistance;

                    linePositions[vertexIndex++] = x1;
                    linePositions[vertexIndex++] = y1;
                    linePositions[vertexIndex++] = z1;
                    linePositions[vertexIndex++] = x2;
                    linePositions[vertexIndex++] = y2;
                    linePositions[vertexIndex++] = z2;

                    const pulse = (Math.sin(time * 2 + dist) + 1) * 0.5;
                    const r = 0.0 + pulse * 0.3;
                    const g = 0.7 + pulse * 0.3;
                    const b = 1.0;

                    lineColors[colorIndex++] = r * alpha;
                    lineColors[colorIndex++] = g * alpha;
                    lineColors[colorIndex++] = b * alpha;

                    lineColors[colorIndex++] = r * alpha;
                    lineColors[colorIndex++] = g * alpha;
                    lineColors[colorIndex++] = b * alpha;

                    lineCount++;
                }
            }
        }

        const linePosAttr = linesRef.current.geometry.attributes.position;
        const lineColAttr = linesRef.current.geometry.attributes.color;

        linePosAttr.array.set(linePositions.subarray(0, vertexIndex));
        linePosAttr.needsUpdate = true;

        lineColAttr.array.set(lineColors.subarray(0, colorIndex));
        lineColAttr.needsUpdate = true;

        linesRef.current.geometry.setDrawRange(0, lineCount * 2);

        groupRef.current.rotation.y = time * 0.04;
        groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={nodeCount}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <PointMaterial
                    size={0.09}
                    color="#00f0ff"
                    transparent
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
                    sizeAttenuation
                />
            </points>

            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={linePositions.length / 3}
                        array={linePositions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={lineColors.length / 3}
                        array={lineColors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.5}
                    blending={THREE.AdditiveBlending}
                    linewidth={1.5}
                />
            </lineSegments>
        </group>
    );
};

const NeuralMeshBackground = () => {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <NeuralNetwork nodeCount={65} maxDistance={3.2} />
            </Canvas>
        </div>
    );
};

export default NeuralMeshBackground;
