import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/NeuralGraph.css';

const skillNodes = [
    // Center Node
    { id: 'adnan', label: 'ADNAN RIZVI', category: 'center', radius: 24, color: '#ffffff' },

    // Core 4 Pillars
    { id: 'ai', label: 'AI & ML Core', category: 'pillar', radius: 17, color: '#00f0ff' },
    { id: 'fullstack', label: 'Full-Stack Systems', category: 'pillar', radius: 17, color: '#c084fc' },
    { id: 'data', label: 'Data & Analytics', category: 'pillar', radius: 17, color: '#ffb703' },
    { id: 'tools', label: 'Production Engineering', category: 'pillar', radius: 17, color: '#34d399' },

    // AI & ML Skills
    { id: 'langchain', label: 'LangChain & RAG', category: 'ai_skill', radius: 9, color: '#00f0ff', desc: 'RAG pipelines, vector search & agentic memory' },
    { id: 'llms', label: 'LLMs & Prompting', category: 'ai_skill', radius: 8, color: '#00f0ff', desc: 'OpenAI, Groq & HuggingFace inference' },
    { id: 'python', label: 'Python & PyTorch', category: 'ai_skill', radius: 9, color: '#00f0ff', desc: 'Model scripting & numerical computing' },
    { id: 'streamlit', label: 'Streamlit & Agent UI', category: 'ai_skill', radius: 8, color: '#00f0ff', desc: 'Rapid AI prototype UI dashboards' },

    // Full-Stack Skills
    { id: 'react', label: 'React & Vite', category: 'fs_skill', radius: 9, color: '#c084fc', desc: 'Modern SPA UI, hooks & state architecture' },
    { id: 'nodejs', label: 'Node.js & Express', category: 'fs_skill', radius: 9, color: '#c084fc', desc: 'High-throughput async REST APIs' },
    { id: 'prisma', label: 'Prisma ORM', category: 'fs_skill', radius: 8, color: '#c084fc', desc: 'Type-safe database queries & migrations' },
    { id: 'mysql', label: 'MySQL & MongoDB', category: 'fs_skill', radius: 9, color: '#c084fc', desc: 'Relational indexing & document stores' },
    { id: 'javascript', label: 'JavaScript (ES6+)', category: 'fs_skill', radius: 8, color: '#c084fc', desc: 'Async closures, Event Loop & Promises' },

    // Data & Analytics Skills
    { id: 'sql', label: 'Advanced SQL', category: 'data_skill', radius: 9, color: '#ffb703', desc: 'Complex joins, window functions & aggregations' },
    { id: 'tableau', label: 'Tableau & Dashboards', category: 'data_skill', radius: 8, color: '#ffb703', desc: 'Executive KPI reporting & visualizations' },
    { id: 'pandas', label: 'Pandas & NumPy', category: 'data_skill', radius: 8, color: '#ffb703', desc: 'Data cleaning, ETL & matrix transformations' },
    { id: 'excel', label: 'Excel & Data Prep', category: 'data_skill', radius: 8, color: '#ffb703', desc: 'Data modeling, formulas & analytics' },

    // Production Engineering Skills
    { id: 'sysdesign', label: 'System Design', category: 'tool_skill', radius: 9, color: '#34d399', desc: 'Scalable backend architecture & caching' },
    { id: 'solid', label: 'OOP & SOLID', category: 'tool_skill', radius: 8, color: '#34d399', desc: 'Clean maintainable code design patterns' },
    { id: 'jwt', label: 'JWT & Security', category: 'tool_skill', radius: 8, color: '#34d399', desc: 'RBAC authentication & secure headers' },
    { id: 'git', label: 'Git & CI/CD Vercel', category: 'tool_skill', radius: 8, color: '#34d399', desc: 'Version control & automated deployments' }
];

const skillLinks = [
    { source: 'adnan', target: 'ai' },
    { source: 'adnan', target: 'fullstack' },
    { source: 'adnan', target: 'data' },
    { source: 'adnan', target: 'tools' },

    { source: 'ai', target: 'langchain' },
    { source: 'ai', target: 'llms' },
    { source: 'ai', target: 'python' },
    { source: 'ai', target: 'streamlit' },

    { source: 'fullstack', target: 'react' },
    { source: 'fullstack', target: 'nodejs' },
    { source: 'fullstack', target: 'prisma' },
    { source: 'fullstack', target: 'mysql' },
    { source: 'fullstack', target: 'javascript' },

    { source: 'data', target: 'sql' },
    { source: 'data', target: 'tableau' },
    { source: 'data', target: 'pandas' },
    { source: 'data', target: 'excel' },

    { source: 'tools', target: 'sysdesign' },
    { source: 'tools', target: 'solid' },
    { source: 'tools', target: 'jwt' },
    { source: 'tools', target: 'git' },

    // Mesh cross connections
    { source: 'langchain', target: 'python' },
    { source: 'react', target: 'javascript' },
    { source: 'nodejs', target: 'prisma' },
    { source: 'sql', target: 'pandas' }
];

const SkillsNeuralGraph = () => {
    const canvasRef = useRef(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;

        const nodes = skillNodes.map((n) => {
            const coordMap = {
                adnan: { x: 0.50, y: 0.50 },

                ai: { x: 0.33, y: 0.38 },
                fullstack: { x: 0.67, y: 0.38 },
                data: { x: 0.33, y: 0.62 },
                tools: { x: 0.67, y: 0.62 },

                // AI Skills (Top-Left)
                langchain: { x: 0.14, y: 0.28 },
                llms: { x: 0.28, y: 0.18 },
                python: { x: 0.15, y: 0.44 },
                streamlit: { x: 0.32, y: 0.26 },

                // Full-Stack Skills (Top-Right)
                react: { x: 0.84, y: 0.28 },
                nodejs: { x: 0.68, y: 0.18 },
                prisma: { x: 0.86, y: 0.44 },
                mysql: { x: 0.72, y: 0.26 },
                javascript: { x: 0.88, y: 0.36 },

                // Data Skills (Bottom-Left)
                sql: { x: 0.14, y: 0.74 },
                tableau: { x: 0.34, y: 0.86 },
                pandas: { x: 0.22, y: 0.84 },
                excel: { x: 0.12, y: 0.60 },

                // Tools Skills (Bottom-Right)
                sysdesign: { x: 0.82, y: 0.74 },
                solid: { x: 0.66, y: 0.84 },
                jwt: { x: 0.86, y: 0.86 },
                git: { x: 0.88, y: 0.60 }
            };

            const target = coordMap[n.id] || { x: 0.5, y: 0.5 };
            return {
                ...n,
                x: width * target.x,
                y: height * target.y
            };
        });

        let mouseX = -1000;
        let mouseY = -1000;
        let activeHoverNode = null;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            let found = null;
            nodes.forEach((n) => {
                const dist = Math.hypot(mouseX - n.x, mouseY - n.y);
                if (dist < n.radius + 8) {
                    found = n;
                }
            });
            activeHoverNode = found;
            setHoveredSkill(found);
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        const activePaths = new Set();
        const updateActivePaths = (targetNodeId) => {
            activePaths.clear();
            if (!targetNodeId) return;

            activePaths.add(targetNodeId);

            skillLinks.forEach((l) => {
                if (l.target === targetNodeId) {
                    activePaths.add(l.source);
                    skillLinks.forEach((l2) => {
                        if (l2.target === l.source) activePaths.add(l2.source);
                    });
                } else if (l.source === targetNodeId) {
                    activePaths.add(l.target);
                }
            });
        };

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            const time = Date.now() * 0.002;

            if (activeHoverNode) {
                updateActivePaths(activeHoverNode.id);
            } else {
                activePaths.clear();
            }

            // 1. Draw Links
            skillLinks.forEach((l) => {
                const s = nodes.find((n) => n.id === l.source);
                const t = nodes.find((n) => n.id === l.target);
                if (!s || !t) return;

                const isHighlighted = activePaths.has(s.id) && activePaths.has(t.id);
                const isCoreConnection = s.id === 'adnan' || t.id === 'adnan';

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(t.x, t.y);

                if (isHighlighted) {
                    ctx.strokeStyle = s.color !== '#ffffff' ? s.color : t.color;
                    ctx.lineWidth = 2.2;
                    ctx.globalAlpha = 0.9;
                } else if (isCoreConnection) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
                    ctx.lineWidth = 1.4;
                    ctx.globalAlpha = 0.6;
                } else {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                    ctx.lineWidth = 0.8;
                    ctx.globalAlpha = 0.3;
                }
                ctx.stroke();
                ctx.globalAlpha = 1;

                // Impulse Pulses
                if (isCoreConnection || isHighlighted) {
                    const speed = isHighlighted ? 0.0025 : 0.0012;
                    const progress = ((Date.now() * speed) + (s.x * 0.001)) % 1;
                    const px = s.x + (t.x - s.x) * progress;
                    const py = s.y + (t.y - s.y) * progress;

                    ctx.beginPath();
                    ctx.arc(px, py, isHighlighted ? 3.5 : 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = s.color !== '#ffffff' ? s.color : t.color;
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            // 2. Draw Nodes
            nodes.forEach((n) => {
                const isHovered = activeHoverNode?.id === n.id;
                const isHighlighted = activePaths.has(n.id);
                const isCenter = n.id === 'adnan';

                // Center Pulsing Ring
                if (isCenter) {
                    const pulseRadius = n.radius + 8 + Math.sin(time * 2.5) * 4;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, pulseRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.lineWidth = 1.8;
                    ctx.stroke();
                }

                // Outer Glow Ring
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius + (isHovered ? 6 : (isHighlighted ? 4 : 2)), 0, Math.PI * 2);
                ctx.strokeStyle = n.color;
                ctx.lineWidth = isHovered ? 2.5 : (isHighlighted ? 2 : 1.2);
                ctx.globalAlpha = isHovered ? 1 : (isHighlighted ? 0.85 : 0.5);
                ctx.stroke();
                ctx.globalAlpha = 1;

                // Fill Node
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = isHovered ? '#ffffff' : (isCenter ? '#ffffff' : '#0a0d18');
                ctx.shadowColor = n.color;
                ctx.shadowBlur = isHovered ? 20 : (isHighlighted ? 12 : 6);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Inner Dot for Non-Center Nodes
                if (!isCenter) {
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.radius * 0.45, 0, Math.PI * 2);
                    ctx.fillStyle = n.color;
                    ctx.fill();
                }

                // Node Text Labels
                const fontSize = isCenter ? '700 11px' : (n.category === 'pillar' ? '700 10px' : '500 9px');
                ctx.font = `${fontSize} 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.fillStyle = isHovered ? '#ffffff' : (isCenter ? '#ffffff' : (isHighlighted ? n.color : 'rgba(235, 240, 255, 0.82)'));
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 6;
                ctx.fillText(n.label, n.x, n.y + n.radius + 6);
                ctx.shadowBlur = 0;
            });

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <section id="skills" className="neural-graph-section">
            <div className="container">
                <motion.div
                    className="neural-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        color: 'var(--accent-primary)',
                        marginBottom: '0.75rem',
                        fontWeight: '700',
                        opacity: 0.85
                    }}>
                        Tech Stack
                    </span>
                    <h2 className="heading-lg">The Secret Sauce</h2>
                    <p className="neural-subtitle">
                        A curated selection of modern technologies and frameworks, engineered for high performance, structural reliability, and seamless digital experiences.
                    </p>
                </motion.div>

                <div className="graph-container glass-panel">
                    {/* Top Left Meta Tag */}
                    <div className="graph-system-meta">
                        System Architecture: SKILLS_NEURAL_TOPOLOGY_V1 // TECH_STACK
                    </div>

                    {/* Top Right Legend Box */}
                    <div className="graph-legend-card">
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }}></span>
                            <span className="legend-label">AI & ML Core</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: '#c084fc', boxShadow: '0 0 8px #c084fc' }}></span>
                            <span className="legend-label">Full-Stack Systems</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: '#ffb703', boxShadow: '0 0 8px #ffb703' }}></span>
                            <span className="legend-label">Data & Analytics</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: '#34d399', boxShadow: '0 0 8px #34d399' }}></span>
                            <span className="legend-label">Production Engineering</span>
                        </div>
                    </div>

                    <canvas ref={canvasRef} className="graph-canvas" />

                    {/* Hover Skill Tooltip Overlay */}
                    {hoveredSkill && hoveredSkill.desc && (
                        <div style={{
                            position: 'absolute',
                            bottom: '1.5rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '12px',
                            background: 'rgba(10, 14, 26, 0.92)',
                            backdropFilter: 'blur(16px)',
                            border: `1px solid ${hoveredSkill.color}`,
                            boxShadow: `0 8px 24px ${hoveredSkill.color}22`,
                            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                            fontSize: '0.82rem',
                            color: '#ffffff',
                            pointerEvents: 'none',
                            zIndex: 20,
                            textAlign: 'center'
                        }}>
                            <span style={{ color: hoveredSkill.color, fontWeight: '700' }}>{hoveredSkill.label}</span>
                            <span style={{ opacity: 0.6, margin: '0 0.5rem' }}>—</span>
                            <span style={{ opacity: 0.9 }}>{hoveredSkill.desc}</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SkillsNeuralGraph;
