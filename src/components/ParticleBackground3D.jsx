import React, { useEffect, useRef } from 'react';

const ParticleBackground3D = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        let dpr = 1;
        let w = 0;
        let h = 0;

        const resize = () => {
            const parent = canvas.parentElement;
            w = parent ? parent.clientWidth : window.innerWidth;
            h = parent ? parent.clientHeight : window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2.5);

            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);

        const getLayerConfig = () => {
            const isMobile = w < 768;
            const isSmallMobile = w < 480;

            // Wide central corridor (xPositions auto-adapt to device width)
            const xPositions = isMobile
                ? [w * 0.04, w * 0.28, w * 0.72, w * 0.96]
                : [w * 0.08, w * 0.25, w * 0.75, w * 0.92];

            const inputLabels = isSmallMobile
                ? ['X0: Data Ingest', 'X1: Vector Mesh', 'X2: Agent Prompt', 'X3: WebRTC']
                : ['X0: Data Ingest', 'X1: 768D Vector Mesh', 'X2: Agentic Prompt', 'X3: WebRTC / Stream'];

            const outputLabels = isSmallMobile
                ? ['Y0: Sub-80ms API', 'Y1: Agent Action', 'Y2: PCA 2D', 'Y3: Prod App']
                : ['Y0: Sub-80ms API', 'Y1: Autonomous Action', 'Y2: PCA 2D Embedding', 'Y3: Production App'];

            const layers = [
                // Layer 0: Input Layer (Cyan)
                {
                    name: 'INPUT LAYER',
                    formula: 'z = wᵀx + b',
                    color: '#00f0ff',
                    x: xPositions[0],
                    nodes: Array.from({ length: 4 }, (_, i) => ({
                        label: inputLabels[i] || `X${i}`,
                        y: h * (isMobile ? 0.35 + i * 0.14 : 0.33 + i * 0.15),
                        radius: isSmallMobile ? 4.5 : (isMobile ? 5.5 : 8)
                    }))
                },
                // Layer 1: Hidden Layer 1 (Purple)
                {
                    name: 'HIDDEN 1',
                    formula: 'σ(z) = 1/(1+e⁻ᶻ)',
                    color: '#c084fc',
                    x: xPositions[1],
                    nodes: Array.from({ length: 4 }, (_, i) => ({
                        label: `H1_${i}`,
                        y: h * (isMobile ? 0.34 + i * 0.14 : 0.31 + i * 0.16),
                        radius: isSmallMobile ? 3.5 : (isMobile ? 4.5 : 7)
                    }))
                },
                // Layer 2: Hidden Layer 2 (Magenta)
                {
                    name: 'HIDDEN 2',
                    formula: 'w := w - α(∂J/∂w)',
                    color: '#e879f9',
                    x: xPositions[2],
                    nodes: Array.from({ length: 4 }, (_, i) => ({
                        label: `H2_${i}`,
                        y: h * (isMobile ? 0.34 + i * 0.14 : 0.31 + i * 0.16),
                        radius: isSmallMobile ? 3.5 : (isMobile ? 4.5 : 7)
                    }))
                },
                // Layer 3: Output Layer (Green)
                {
                    name: 'OUTPUT LAYER',
                    formula: 'β = (XᵀX)⁻¹Xᵀy',
                    color: '#34d399',
                    x: xPositions[3],
                    nodes: Array.from({ length: 4 }, (_, i) => ({
                        label: outputLabels[i] || `Y${i}`,
                        y: h * (isMobile ? 0.35 + i * 0.14 : 0.33 + i * 0.15),
                        radius: isSmallMobile ? 4.5 : (isMobile ? 5.5 : 8)
                    }))
                }
            ];

            return layers;
        };

        const createPhotons = (layers) => {
            const photons = [];
            for (let l = 0; l < layers.length - 1; l++) {
                const currentLayer = layers[l];
                const nextLayer = layers[l + 1];

                currentLayer.nodes.forEach((nA, idxA) => {
                    const targetIdx = (idxA + l) % nextLayer.nodes.length;
                    const nB = nextLayer.nodes[targetIdx];

                    photons.push({
                        x1: currentLayer.x,
                        y1: nA.y,
                        x2: nextLayer.x,
                        y2: nB.y,
                        progress: Math.random(),
                        speed: 0.0014 + Math.random() * 0.0012,
                        color: currentLayer.color
                    });
                });
            }
            return photons;
        };

        let layers = getLayerConfig();
        let photons = createPhotons(layers);

        const handleResize = () => {
            resize();
            layers = getLayerConfig();
            photons = createPhotons(layers);
        };

        let mouseX = -1000;
        let mouseY = -1000;
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            const width = w;
            const height = h;
            const isMobile = width < 768;
            const isSmallMobile = width < 480;

            ctx.clearRect(0, 0, width, height);

            // 1. Draw Visible Network Connection Lines (Streamlined on mobile for clean, uncluttered look)
            for (let l = 0; l < layers.length - 1; l++) {
                const currentLayer = layers[l];
                const nextLayer = layers[l + 1];

                currentLayer.nodes.forEach((nodeA, idxA) => {
                    nextLayer.nodes.forEach((nodeB, idxB) => {
                        // On mobile, only connect direct & adjacent nodes to keep lines clean and elegant
                        if (isMobile && Math.abs(idxA - idxB) > 1) return;

                        const midX = (currentLayer.x + nextLayer.x) / 2;
                        const midY = (nodeA.y + nodeB.y) / 2;
                        const isMouseNear = Math.hypot(mouseX - midX, mouseY - midY) < 140;

                        ctx.beginPath();
                        ctx.moveTo(currentLayer.x, nodeA.y);
                        ctx.lineTo(nextLayer.x, nodeB.y);

                        if (isMouseNear) {
                            ctx.strokeStyle = currentLayer.color;
                            ctx.lineWidth = isMobile ? 1.2 : 1.8;
                            ctx.globalAlpha = 0.7;
                        } else {
                            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
                            ctx.lineWidth = isMobile ? 0.7 : 1.2;
                            ctx.globalAlpha = isMobile ? 0.15 : 0.40;
                        }
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    });
                });
            }

            // 2. Animate Photon Dots Sliding Along the Lines
            photons.forEach((p) => {
                p.progress += p.speed;
                if (p.progress >= 1) {
                    p.progress = 0;
                }

                const px = p.x1 + (p.x2 - p.x1) * p.progress;
                const py = p.y1 + (p.y2 - p.y1) * p.progress;

                ctx.beginPath();
                ctx.arc(px, py, isSmallMobile ? 2 : (isMobile ? 2.5 : 3.5), 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = p.color;
                ctx.shadowBlur = isMobile ? 4 : 12;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            // 3. Draw Layer Header Titles & Nodes (Razor Sharp HD Rendering)
            layers.forEach((layer, layerIdx) => {
                const isOuterLayer = layerIdx === 0 || layerIdx === layers.length - 1;

                // Header Titles & Math Formulas
                const headerY = isSmallMobile ? height * 0.10 : (isMobile ? height * 0.11 : height * 0.19);
                const fontSize = isSmallMobile ? "800 8.5px" : (isMobile ? "800 9.5px" : "800 12px");
                ctx.font = `${fontSize} 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.fillStyle = layer.color;

                let displayName = layer.name;
                if (isSmallMobile) {
                    if (layerIdx === 0) displayName = 'INPUT';
                    else if (layerIdx === 3) displayName = 'OUTPUT';
                }

                if (layerIdx === 0) {
                    ctx.textAlign = 'left';
                } else if (layerIdx === layers.length - 1) {
                    ctx.textAlign = 'right';
                } else {
                    ctx.textAlign = 'center';
                }

                ctx.textBaseline = 'bottom';
                ctx.globalAlpha = 1.0;
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 3;
                ctx.fillText(displayName, layer.x, headerY);

                // Math Formula Tag below title
                if (layer.formula) {
                    const subFontSize = isSmallMobile ? "600 7px" : (isMobile ? "600 7.5px" : "600 9.5px");
                    ctx.font = `${subFontSize} 'Fira Code', 'JetBrains Mono', monospace`;
                    ctx.fillStyle = 'rgba(225, 235, 255, 0.70)';
                    ctx.textBaseline = 'top';
                    ctx.fillText(layer.formula, layer.x, headerY + (isMobile ? 2 : 4));
                }

                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;

                // Layer Nodes
                layer.nodes.forEach((node) => {
                    const distToMouse = Math.hypot(mouseX - layer.x, mouseY - node.y);
                    const isHovered = distToMouse < 30;

                    // Outer Ring
                    ctx.beginPath();
                    ctx.arc(layer.x, node.y, node.radius + (isHovered ? 6 : (isMobile ? 2 : 4)), 0, Math.PI * 2);
                    ctx.strokeStyle = layer.color;
                    ctx.lineWidth = isHovered ? 2 : 1.2;
                    ctx.globalAlpha = isOuterLayer ? (isHovered ? 0.95 : (isMobile ? 0.35 : 0.6)) : 0.25;
                    ctx.stroke();
                    ctx.globalAlpha = 1;

                    // Inner Core Dot
                    ctx.beginPath();
                    ctx.arc(layer.x, node.y, node.radius / 1.7, 0, Math.PI * 2);
                    ctx.fillStyle = isHovered ? '#ffffff' : layer.color;
                    ctx.globalAlpha = isHovered ? 1 : (isMobile ? 0.7 : 0.85);
                    if (isHovered) {
                        ctx.shadowColor = layer.color;
                        ctx.shadowBlur = 18;
                    }
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = 1;

                    // Labels for Outer Layers (Input & Output) - DESKTOP ONLY to keep mobile 100% clean
                    if (isOuterLayer && !isMobile) {
                        const fontSize = "600 10px";
                        ctx.font = `${fontSize} 'Fira Code', 'JetBrains Mono', monospace`;
                        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(235, 240, 255, 0.82)';

                        ctx.textAlign = layer.x < width * 0.5 ? 'right' : 'left';
                        const textOffset = 10;
                        const textX = layer.x < width * 0.5
                            ? layer.x - node.radius - textOffset
                            : layer.x + node.radius + textOffset;

                        ctx.textBaseline = 'middle';
                        ctx.shadowColor = '#000000';
                        ctx.shadowBlur = 6;
                        ctx.fillText(node.label, textX, node.y);
                        ctx.shadowBlur = 0;
                    }
                });
            });

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden'
        }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
    );
};

export default ParticleBackground3D;
