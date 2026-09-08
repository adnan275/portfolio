import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/NeuralLoader.css';

const terminalLogs = [
    { time: '0.001s', text: 'SYSTEM_BOOT_INIT // ARCH: x86_64_NEURAL' },
    { time: '0.014s', text: 'LOADING_CUDA_TENSORS // FP16_PRECISION' },
    { time: '0.038s', text: 'MOUNTING_HNSW_INDEX // 768_VECTOR_DIMS' },
    { time: '0.072s', text: 'DEPLOYING_LANGGRAPH_AGENTS // AGENTIC_V2' },
    { time: '0.105s', text: 'CONNECTING_PRISMA_ORM // MYSQL_AIVEN' },
    { time: '0.150s', text: 'SYSTEM_READY // ADNAN_RIZVI_PORTFOLIO' }
];

const NeuralLoader = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [activeLogs, setActiveLogs] = useState([terminalLogs[0]]);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // ~3.8s immersive HUD boot sequence
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsFinished(true);
                        if (onComplete) onComplete();
                    }, 900);
                    return 100;
                }

                const next = prev + Math.floor(Math.random() * 3) + 2;
                const targetIdx = Math.min(Math.floor((next / 100) * terminalLogs.length), terminalLogs.length - 1);
                setActiveLogs(terminalLogs.slice(0, targetIdx + 1));
                return Math.min(next, 100);
            });
        }, 95);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const nodes = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '#00f0ff' : '#c084fc'
        }));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodes.forEach((n, i) => {
                n.x += n.vx;
                n.y += n.vy;

                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = n.color;
                ctx.fill();

                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dx = n.x - n2.x;
                    const dy = n.y - n2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.strokeStyle = n.color;
                        ctx.globalAlpha = (1 - dist / 140) * 0.4;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    className="neural-loader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div className="loader-grid-bg" />
                    <canvas ref={canvasRef} className="loader-canvas" />

                    {/* Top HUD Telemetry Bar */}
                    <div className="loader-hud-top">
                        <div className="hud-pill">
                            <span className="hud-dot" />
                            <span>SYS_STATUS: ONLINE</span>
                        </div>
                        <div>MEM: 64GB DDR5 // CUDA_ACTIVE</div>
                        <div>LATENCY: 12ms</div>
                    </div>

                    {/* Center Terminal Container */}
                    <motion.div
                        className="loader-hud-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="hud-header">
                            <div className="hud-title-group">
                                <span className="hud-main-title">ADNAN RIZVI // SYSTEM BOOT</span>
                                <span className="hud-sub-title">SOFTWARE & AI ENGINEERING KNOWLEDGE ENGINE</span>
                            </div>
                            <span className="hud-version-badge">v2.4_PROD</span>
                        </div>

                        {/* Terminal Log Stream Window */}
                        <div className="loader-terminal-window">
                            {activeLogs.slice(-4).map((log, index) => (
                                <div
                                    key={index}
                                    className={`terminal-line${index === activeLogs.slice(-4).length - 1 ? ' active' : ''}`}
                                >
                                    <span className="terminal-prefix">[SYS]</span>
                                    <span className="terminal-time">{log.time}</span>
                                    <span>{log.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Progress Bar & Percentage */}
                        <div className="loader-progress-section">
                            <div className="progress-header-row">
                                <span className="progress-label">INITIALIZING NEURAL MESH</span>
                                <span className="progress-val">{progress}%</span>
                            </div>
                            <div className="hud-progress-bg">
                                <div
                                    className="hud-progress-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NeuralLoader;
