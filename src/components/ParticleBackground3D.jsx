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

            // Wide central corridor with generous edge clearance to prevent text clipping
            const isSmallScreen = w < 1200;
            const padLeft = isMobile ? w * 0.05 : (isSmallScreen ? 165 : 185);
            const padRight = isMobile ? w * 0.05 : (isSmallScreen ? 175 : 195);

            const xPositions = isMobile
                ? [w * 0.04, w * 0.28, w * 0.72, w * 0.96]
                : [
                    Math.max(padLeft, w * 0.12),
                    w * 0.29,
                    w * 0.71,
                    Math.min(w - padRight, w * 0.88)
                ];

            const inputLabels = isSmallMobile
                ? ['[IN_0] Ingest', '[IN_1] Vector', '[IN_2] Prompt', '[IN_3] Stream']
                : isMobile
                    ? ['[IN_00] Data Ingest', '[IN_01] 768D Mesh', '[IN_02] Agent Loop', '[IN_03] WebRTC']
                    : ['[IN_00] Data Ingest', '[IN_01] 768D Vector Mesh', '[IN_02] Agentic Prompt Loop', '[IN_03] WebRTC / TCP Stream'];

            const outputLabels = isSmallMobile
                ? ['[OUT_0] API', '[OUT_1] Agent', '[OUT_2] Embed', '[OUT_3] Telemetry']
                : isMobile
                    ? ['[OUT_00] Sub-80ms', '[OUT_01] Auto Action', '[OUT_02] PCA Embed', '[OUT_03] Telemetry']
                    : ['[OUT_00] Sub-80ms Inference', '[OUT_01] Autonomous Agent', '[OUT_02] PCA 2D Embeddings', '[OUT_03] Production Telemetry'];

            const layers = [
                // Layer 0: Input Layer (Crimson Scarlet)
                {
                    name: 'INPUT LAYER',
                    color: '#ff334b',
                    x: xPositions[0],
                    nodes: Array.from({ length: 4 }, (_, i) => ({
                        label: inputLabels[i] || `X${i}`,
                        y: h * (isMobile ? 0.35 + i * 0.14 : 0.33 + i * 0.15),
                        radius: isSmallMobile ? 4.5 : (isMobile ? 5.5 : 8)
                    }))
                },
                // Layer 1: Hidden Layer 1 (Amber Ember)
                {
                    name: 'HIDDEN 1',
                    color: '#f97316',
                    x: xPositions[1],
                    nodes: Array.from({ length: 4 }, (_, i) => ({
                        label: `H1_${i}`,
                        y: h * (isMobile ? 0.34 + i * 0.14 : 0.31 + i * 0.16),
                        radius: isSmallMobile ? 3.5 : (isMobile ? 4.5 : 7)
                    }))
                },
                // Layer 2: Hidden Layer 2 (Warm Ruby)
                {
                    name: 'HIDDEN 2',
                    color: '#e11d48',
                    x: xPositions[2],
                    nodes: Array.from({ length: 4 }, (_, i) => ({
                        label: `H2_${i}`,
                        y: h * (isMobile ? 0.34 + i * 0.14 : 0.31 + i * 0.16),
                        radius: isSmallMobile ? 3.5 : (isMobile ? 4.5 : 7)
                    }))
                },
                // Layer 3: Output Layer (Jade Green)
                {
                    name: 'OUTPUT LAYER',
                    color: '#10b981',
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

        const createFloatingFormulas = () => {
            const isMobile = w < 768;
            const isSmallMobile = w < 480;

            const formulaTexts = [
                { text: 'z = wᵀx + b', color: '#ff334b', px: 0.06, py: 0.28 },
                { text: 'σ(z) = 1/(1+e⁻ᶻ)', color: '#f97316', px: isMobile ? 0.05 : 0.18, py: isMobile ? 0.48 : 0.38 },
                { text: 'σ\'(z) = σ(z)(1-σ(z))', color: '#e4e4e7', px: 0.15, py: 0.72 },
                { text: 'ŷ = Xw + b', color: '#ff4d61', px: 0.24, py: 0.82 },
                { text: 'J(w,b) = ½n Σ(yᵢ-ŷᵢ)²', color: '#fb7185', px: isMobile ? 0.85 : 0.76, py: isMobile ? 0.52 : 0.80 },
                { text: 'w := w - α(∂J/∂w)', color: '#f59e0b', px: 0.82, py: 0.42 },
                { text: 'β = (XᵀX)⁻¹Xᵀy', color: '#10b981', px: 0.92, py: 0.28 },
                { text: 'Acc = (TP+TN)/Total', color: '#a1a1aa', px: 0.88, py: 0.72 }
            ];

            // Filter out dense formulas on mobile to keep layout clean
            const filtered = isSmallMobile
                ? [formulaTexts[0], formulaTexts[1], formulaTexts[5], formulaTexts[6]]
                : (isMobile ? formulaTexts.slice(0, 6) : formulaTexts);

            return filtered.map((f, i) => ({
                text: f.text,
                color: f.color,
                x: w * f.px,
                baseY: h * f.py,
                phase: i * 1.3,
                speed: 0.0008 + i * 0.0003
            }));
        };

        let layers = getLayerConfig();
        let photons = createPhotons(layers);
        let floatingFormulas = createFloatingFormulas();

        const handleResize = () => {
            resize();
            layers = getLayerConfig();
            photons = createPhotons(layers);
            floatingFormulas = createFloatingFormulas();
        };

        let mouseX = -1000;
        let mouseY = -1000;
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        let activeBursts = [];
        let lastBurstTime = 0;
        const triggerActivationBurst = () => {
            const now = performance.now();
            if (now - lastBurstTime < 500) return; // Debounce rapid hover jitter
            lastBurstTime = now;
            activeBursts.push({
                startTime: now,
                duration: 1700 // Smooth, majestic 1.7s forward pass travel
            });
            if (activeBursts.length > 2) activeBursts.shift();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('neural-activation-burst', triggerActivationBurst);

        const render = () => {
            const width = w;
            const height = h;
            const isMobile = width < 768;
            const isSmallMobile = width < 480;

            ctx.clearRect(0, 0, width, height);

            const now = performance.now();
            activeBursts = activeBursts.filter(b => now - b.startTime < b.duration);

            const getBurstWave = (x) => {
                let maxFactor = 0;
                activeBursts.forEach(b => {
                    const progress = (now - b.startTime) / b.duration;
                    const startX = layers[0]?.x || 0;
                    const endX = layers[layers.length - 1]?.x || width;
                    const waveX = startX + (endX - startX) * progress;
                    const dist = Math.abs(x - waveX);
                    const radius = 125;
                    if (dist < radius) {
                        const factor = Math.cos((dist / radius) * (Math.PI / 2));
                        if (factor > maxFactor) maxFactor = factor;
                    }
                });
                return maxFactor;
            };

            const getBurstSparksForSegment = (x1, x2, y1, y2) => {
                const sparks = [];
                activeBursts.forEach(b => {
                    const progress = (now - b.startTime) / b.duration;
                    const startX = layers[0]?.x || 0;
                    const endX = layers[layers.length - 1]?.x || width;
                    const waveX = startX + (endX - startX) * progress;
                    if (waveX >= x1 && waveX <= x2) {
                        const segRatio = (waveX - x1) / (x2 - x1);
                        sparks.push({
                            x: waveX,
                            y: y1 + (y2 - y1) * segRatio,
                            ratio: segRatio,
                            dx: x2 - x1,
                            dy: y2 - y1
                        });
                    }
                });
                return sparks;
            };

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

                        const sparks = getBurstSparksForSegment(currentLayer.x, nextLayer.x, nodeA.y, nodeB.y);
                        const hasBurst = sparks.length > 0;

                        ctx.beginPath();
                        ctx.moveTo(currentLayer.x, nodeA.y);
                        ctx.lineTo(nextLayer.x, nodeB.y);

                        if (hasBurst) {
                            ctx.strokeStyle = currentLayer.color;
                            ctx.lineWidth = isMobile ? 1.8 : 2.5;
                            ctx.globalAlpha = 0.95;
                            ctx.shadowColor = currentLayer.color;
                            ctx.shadowBlur = 14;
                        } else if (isMouseNear) {
                            ctx.strokeStyle = currentLayer.color;
                            ctx.lineWidth = isMobile ? 1.2 : 1.8;
                            ctx.globalAlpha = 0.7;
                            ctx.shadowBlur = 0;
                        } else {
                            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
                            ctx.lineWidth = isMobile ? 0.7 : 1.2;
                            ctx.globalAlpha = isMobile ? 0.15 : 0.40;
                            ctx.shadowBlur = 0;
                        }
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                        ctx.globalAlpha = 1;

                        // Electrical forward-pass impulse sparks along active synapses
                        if (hasBurst) {
                            sparks.forEach(spark => {
                                // Fading trail particle behind main spark
                                if (spark.ratio > 0.06) {
                                    const tailX = spark.x - (spark.dx || 30) * 0.05;
                                    const tailY = spark.y - (spark.dy || 0) * 0.05;
                                    ctx.beginPath();
                                    ctx.arc(tailX, tailY, isMobile ? 1.8 : 2.6, 0, Math.PI * 2);
                                    ctx.fillStyle = currentLayer.color;
                                    ctx.globalAlpha = 0.6;
                                    ctx.fill();
                                    ctx.globalAlpha = 1;
                                }

                                ctx.beginPath();
                                ctx.arc(spark.x, spark.y, isMobile ? 3 : 4.5, 0, Math.PI * 2);
                                ctx.fillStyle = '#ffffff';
                                ctx.shadowColor = currentLayer.color;
                                ctx.shadowBlur = 16;
                                ctx.fill();
                                ctx.shadowBlur = 0;
                            });
                        }
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

            // 3. Render Ambient Floating Math Formulas in Background Space (With Interactive Glow)
            const time = Date.now();
            floatingFormulas.forEach((item) => {
                const floatY = item.baseY + Math.sin(time * item.speed + item.phase) * 8;
                const distToMouse = Math.hypot(mouseX - item.x, mouseY - floatY);
                const isHovered = distToMouse < 110;
                const formulaWave = getBurstWave(item.x);
                const isFormulaExcited = isHovered || formulaWave > 0.25;

                const fontSz = isSmallMobile ? "600 7.5px" : (isMobile ? "600 8.5px" : (isFormulaExcited ? "700 11px" : "600 9.8px"));
                ctx.font = `${fontSz} 'Fira Code', 'JetBrains Mono', monospace`;
                
                if (isFormulaExcited) {
                    ctx.fillStyle = '#ffffff';
                    ctx.globalAlpha = 0.95;
                    ctx.shadowColor = item.color;
                    ctx.shadowBlur = 14;
                } else {
                    ctx.fillStyle = item.color;
                    ctx.globalAlpha = isMobile ? 0.28 : 0.40;
                    ctx.shadowColor = '#000000';
                    ctx.shadowBlur = 4;
                }

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(item.text, item.x, floatY);
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            });

            // 4. Draw Layer Header Titles & Nodes (Razor Sharp Monospace Precision)
            layers.forEach((layer, layerIdx) => {
                const isOuterLayer = layerIdx === 0 || layerIdx === layers.length - 1;
                const layerWavePulse = getBurstWave(layer.x);
                const isLayerPulsing = layerWavePulse > 0.05;

                // Header Titles: Centered cleanly above their respective node columns
                const headerY = isSmallMobile ? height * 0.10 : (isMobile ? height * 0.11 : height * 0.19);
                const fontSize = isSmallMobile ? "800 8.5px" : (isMobile ? "800 9.5px" : "800 12px");
                ctx.font = `${fontSize} 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.fillStyle = isLayerPulsing ? '#ffffff' : layer.color;

                let displayName = layer.name;
                if (isSmallMobile) {
                    if (layerIdx === 0) displayName = 'INPUT';
                    else if (layerIdx === 3) displayName = 'OUTPUT';
                }

                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.globalAlpha = isLayerPulsing ? 1.0 : 0.95;
                ctx.shadowColor = isLayerPulsing ? layer.color : '#000000';
                ctx.shadowBlur = isLayerPulsing ? 14 : 4;
                ctx.fillText(displayName, layer.x, headerY);
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;

                // Layer Nodes
                layer.nodes.forEach((node) => {
                    const distToMouse = Math.hypot(mouseX - layer.x, mouseY - node.y);
                    const isHovered = distToMouse < 30;

                    // Outer Ring with dynamic forward-pass impulse expansion
                    ctx.beginPath();
                    const ringRadius = node.radius + (isHovered ? 6 : (isMobile ? 2 : 4)) + (layerWavePulse * 7.5);
                    ctx.arc(layer.x, node.y, ringRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = (isHovered || layerWavePulse > 0.35) ? '#ffffff' : layer.color;
                    ctx.lineWidth = (isHovered || isLayerPulsing) ? (2.0 + layerWavePulse * 1.5) : 1.2;
                    ctx.globalAlpha = isOuterLayer 
                        ? (isHovered || isLayerPulsing ? 1.0 : (isMobile ? 0.35 : 0.6)) 
                        : (isLayerPulsing ? 0.95 : 0.25);
                    if (isLayerPulsing || isHovered) {
                        ctx.shadowColor = layer.color;
                        ctx.shadowBlur = isHovered ? 18 : 22 * layerWavePulse;
                    }
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = 1;

                    // Inner Core Dot with high-energy white ignition
                    ctx.beginPath();
                    const coreRadius = (node.radius / 1.7) + (layerWavePulse * 2.5);
                    ctx.arc(layer.x, node.y, coreRadius, 0, Math.PI * 2);
                    ctx.fillStyle = (isHovered || layerWavePulse > 0.28) ? '#ffffff' : layer.color;
                    ctx.globalAlpha = (isHovered || isLayerPulsing) ? 1.0 : (isMobile ? 0.7 : 0.85);
                    if (isHovered || isLayerPulsing) {
                        ctx.shadowColor = layer.color;
                        ctx.shadowBlur = isHovered ? 18 : 25 * layerWavePulse;
                    }
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = 1;

                    // Labels for Outer Layers (Input & Output) - DESKTOP ONLY
                    if (isOuterLayer && !isMobile) {
                        const fontSize = (isHovered || isLayerPulsing) ? "700 10.5px" : "600 10px";
                        ctx.font = `${fontSize} 'Fira Code', 'JetBrains Mono', monospace`;
                        ctx.fillStyle = (isHovered || isLayerPulsing) 
                            ? '#ffffff' 
                            : (layerIdx === 0 ? 'rgba(255, 140, 155, 0.92)' : 'rgba(110, 231, 183, 0.92)');

                        const textOffset = 12;
                        const isLeft = layerIdx === 0;
                        ctx.textAlign = isLeft ? 'right' : 'left';
                        
                        const textX = isLeft
                            ? layer.x - node.radius - textOffset
                            : layer.x + node.radius + textOffset;

                        ctx.textBaseline = 'middle';
                        ctx.shadowColor = (isHovered || isLayerPulsing) ? layer.color : '#000000';
                        ctx.shadowBlur = (isHovered || isLayerPulsing) ? 12 : 4;
                        ctx.fillText(node.label, textX, node.y);
                        ctx.shadowBlur = 0;
                    }
                });
            });

            if (isVisible) {
                animId = requestAnimationFrame(render);
            }
        };

        let isVisible = true;
        const observer = new IntersectionObserver(([entry]) => {
            const nextVisible = entry.isIntersecting;
            if (nextVisible && !isVisible) {
                isVisible = true;
                cancelAnimationFrame(animId);
                animId = requestAnimationFrame(render);
            } else if (!nextVisible && isVisible) {
                isVisible = false;
                cancelAnimationFrame(animId);
            }
        }, { threshold: 0.05 });

        if (canvas.parentElement) {
            observer.observe(canvas.parentElement);
        } else {
            observer.observe(canvas);
        }

        render();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('neural-activation-burst', triggerActivationBurst);
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
