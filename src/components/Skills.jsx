import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/NeuralGraph.css';
import '../styles/Skills.css';

const skillNodes = [
    // Center Node
    { id: 'adnan', label: 'ADNAN RIZVI', category: 'center', radius: 22, color: '#ffffff' },

    // Core 5 Domain Pillars
    { id: 'ai', label: 'AI & ML Core', category: 'pillar', radius: 15, color: '#00f0ff' },
    { id: 'fullstack', label: 'Full-Stack Systems', category: 'pillar', radius: 15, color: '#c084fc' },
    { id: 'data', label: 'Data & Analytics', category: 'pillar', radius: 15, color: '#ffb703' },
    { id: 'tools', label: 'Production Engineering', category: 'pillar', radius: 15, color: '#34d399' },
    { id: 'networking', label: 'Computer Networks', category: 'pillar', radius: 15, color: '#38bdf8' },

    // --- AI & ML Core Sub-skills ---
    { id: 'langgraph', label: 'LangGraph v0.2+', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'MULTI-AGENT', level: 96, desc: 'Stateful cyclic agent workflows, persistent checkpointing & human-in-the-loop validation.' },
    { id: 'langchain', label: 'LangChain & RAG', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'RAG PIPELINE', level: 94, desc: 'Semantic retrieval architectures, dense vector search, hybrid ranking & agent memory.' },
    { id: 'llms', label: 'Transformers & LLMs', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'FOUNDATION', level: 92, desc: 'Self-Attention, Mamba SSMs, Diffusion pipelines, Direct Preference Optimization (DPO).' },
    { id: 'python', label: 'PyTorch & Deep Learning', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'TENSOR ENGINE', level: 95, desc: 'Custom autograd backprop, CNNs, LSTMs, VAEs, LoRA & QLoRA quantization.' },
    { id: 'groq', label: 'Groq LPU Engine', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'INFERENCE', level: 93, desc: 'Ultra-low latency sub-50ms TTFT acceleration for real-time agent reasoning loops.' },
    { id: 'streamlit', label: 'Streamlit & Agent UI', category: 'ai_skill', domain: 'ai', radius: 7, color: '#00f0ff', tag: 'PROTOTYPE', level: 90, desc: 'Rapid reactive AI dashboard prototypes, multi-agent chat interfaces & telemetry displays.' },

    // --- Full-Stack Systems Sub-skills ---
    { id: 'react', label: 'React 19 & Vite', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'MODERN SPA', level: 96, desc: 'High-performance component trees, custom hooks, atomic state management & SSR pipelines.' },
    { id: 'nodejs', label: 'Node.js & Express', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'HIGH-THROUGHPUT', level: 94, desc: 'Non-blocking event-driven backend services, clustering, stream pipes & async REST APIs.' },
    { id: 'prisma', label: 'Prisma ORM', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'TYPE-SAFE DB', level: 92, desc: 'Schema-driven migrations, declarative relations, connection pooling & auto-generated clients.' },
    { id: 'mysql', label: 'MySQL & MongoDB', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'STORAGE LAYER', level: 91, desc: 'B-tree indexing, ACID relational guarantees, aggregation pipelines & sharding strategies.' },
    { id: 'javascript', label: 'JavaScript (ES6+)', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'RUNTIME CORE', level: 96, desc: 'V8 engine internals, Event Loop microtasks, closures, Web Workers & async generators.' },
    { id: 'tailwind', label: 'Tailwind & Motion', category: 'fs_skill', domain: 'fullstack', radius: 7, color: '#c084fc', tag: 'CYBER UI', level: 94, desc: 'Atomic design tokens, hardware-accelerated animations, responsive glassmorphism & HUDs.' },

    // --- Data & Analytics Sub-skills ---
    { id: 'sql', label: 'Advanced SQL', category: 'data_skill', domain: 'data', radius: 8, color: '#ffb703', tag: 'QUERY ENGINE', level: 95, desc: 'Window functions, Common Table Expressions (CTEs), recursive queries & execution plan tuning.' },
    { id: 'tableau', label: 'Tableau & Dashboards', category: 'data_skill', domain: 'data', radius: 8, color: '#ffb703', tag: 'ANALYTICS HUD', level: 90, desc: 'Interactive parameter controls, multi-source blending, calculated fields & KPI reporting.' },
    { id: 'pandas', label: 'Pandas & NumPy', category: 'data_skill', domain: 'data', radius: 8, color: '#ffb703', tag: 'ETL PIPELINE', level: 93, desc: 'Vectorized tensor operations, exploratory data analysis, outlier sanitization & feature engineering.' },
    { id: 'excel', label: 'Excel & Data Prep', category: 'data_skill', domain: 'data', radius: 7, color: '#ffb703', tag: 'STATISTICS', level: 88, desc: 'Dynamic pivot structures, statistical regression modeling, Power Query transformations.' },

    // --- Production Engineering Sub-skills ---
    { id: 'sysdesign', label: 'System Design', category: 'tool_skill', domain: 'tools', radius: 8, color: '#34d399', tag: 'DISTRIBUTED', level: 94, desc: 'Microservices architectures, Redis caching layers, load balancers, CDN edge caching & CAP theorem.' },
    { id: 'docker', label: 'Docker Containers', category: 'tool_skill', domain: 'tools', radius: 8, color: '#34d399', tag: 'ISOLATION', level: 92, desc: 'Multi-stage container builds, Alpine optimization, compose orchestration & deterministic runs.' },
    { id: 'solid', label: 'OOP & Clean Code', category: 'tool_skill', domain: 'tools', radius: 8, color: '#34d399', tag: 'PATTERNS', level: 92, desc: 'SOLID principles, design patterns (Factory, Observer, Strategy), dependency injection.' },
    { id: 'jwt', label: 'JWT & Security', category: 'tool_skill', domain: 'tools', radius: 8, color: '#34d399', tag: 'AUTH / SEC', level: 93, desc: 'Role-Based Access Control (RBAC), token rotation, salted SHA hashing & CSRF/XSS hardening.' },
    { id: 'git', label: 'Git & CI/CD Pipelines', category: 'tool_skill', domain: 'tools', radius: 7, color: '#34d399', tag: 'DEVOPS', level: 94, desc: 'Branch protections, automated GitHub Actions testing, preview deploy triggers on Vercel.' },

    // --- Computer Networks Sub-skills ---
    { id: 'vpc', label: 'AWS VPC & Subnets', category: 'net_skill', domain: 'networking', radius: 8, color: '#38bdf8', tag: 'CLOUD NETWORK', level: 92, desc: 'CIDR subnetting, Internet Gateways, NAT routing tables & multi-tier isolated zones.' },
    { id: 'wireshark', label: 'Wireshark & Packets', category: 'net_skill', domain: 'networking', radius: 8, color: '#38bdf8', tag: 'PACKET DIAG', level: 90, desc: 'Packet trace inspection, TCP 3-way handshake analysis, window sizing & packet drop telemetry.' },
    { id: 'tcpudp', label: 'TCP/UDP & Sockets', category: 'net_skill', domain: 'networking', radius: 8, color: '#38bdf8', tag: 'TRANSPORT', level: 94, desc: 'Python low-level socket programming, AIMD congestion control & multiplexing protocols.' },
    { id: 'secgroups', label: 'Security & VPNs', category: 'net_skill', domain: 'networking', radius: 7, color: '#38bdf8', tag: 'ENCRYPTION', level: 91, desc: 'Stateful Security Groups, stateless NACLs, TLS/SSL certificates, WireGuard tunnels.' }
];

const skillLinks = [
    // Core links to pillars
    { source: 'adnan', target: 'ai' },
    { source: 'adnan', target: 'fullstack' },
    { source: 'adnan', target: 'data' },
    { source: 'adnan', target: 'tools' },
    { source: 'adnan', target: 'networking' },

    // AI sub-links
    { source: 'ai', target: 'langgraph' },
    { source: 'ai', target: 'langchain' },
    { source: 'ai', target: 'llms' },
    { source: 'ai', target: 'python' },
    { source: 'ai', target: 'groq' },
    { source: 'ai', target: 'streamlit' },

    // Full-Stack sub-links
    { source: 'fullstack', target: 'react' },
    { source: 'fullstack', target: 'nodejs' },
    { source: 'fullstack', target: 'prisma' },
    { source: 'fullstack', target: 'mysql' },
    { source: 'fullstack', target: 'javascript' },
    { source: 'fullstack', target: 'tailwind' },

    // Data sub-links
    { source: 'data', target: 'sql' },
    { source: 'data', target: 'tableau' },
    { source: 'data', target: 'pandas' },
    { source: 'data', target: 'excel' },

    // Production Engineering sub-links
    { source: 'tools', target: 'sysdesign' },
    { source: 'tools', target: 'docker' },
    { source: 'tools', target: 'solid' },
    { source: 'tools', target: 'jwt' },
    { source: 'tools', target: 'git' },

    // Networking sub-links
    { source: 'networking', target: 'vpc' },
    { source: 'networking', target: 'wireshark' },
    { source: 'networking', target: 'tcpudp' },
    { source: 'networking', target: 'secgroups' }
];

const domainFilterList = [
    { id: 'all', label: 'All Domains', color: '#ffffff', count: 25 },
    { id: 'ai', label: 'AI & ML Core', color: '#00f0ff', count: 6 },
    { id: 'fullstack', label: 'Full-Stack Systems', color: '#c084fc', count: 6 },
    { id: 'data', label: 'Data & Analytics', color: '#ffb703', count: 4 },
    { id: 'tools', label: 'Production Engineering', color: '#34d399', count: 5 },
    { id: 'networking', label: 'Computer Networks', color: '#38bdf8', count: 4 }
];

const Skills = () => {
    const canvasRef = useRef(null);
    const [activeDomain, setActiveDomain] = useState('all');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const activeDomainRef = useRef('all');

    useEffect(() => {
        activeDomainRef.current = activeDomain;
    }, [activeDomain]);

    const handleDomainToggle = (domainId) => {
        setActiveDomain(prev => (prev === domainId && domainId !== 'all') ? 'all' : domainId);
    };

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

        const nodes = skillNodes.map(n => {
            const coordMap = {
                adnan: { x: 0.50, y: 0.48 },

                // 5 Core Pillars
                ai: { x: 0.32, y: 0.30 },
                fullstack: { x: 0.68, y: 0.30 },
                data: { x: 0.25, y: 0.64 },
                tools: { x: 0.75, y: 0.64 },
                networking: { x: 0.50, y: 0.78 },

                // AI Sub-nodes (Top-Left)
                langgraph: { x: 0.16, y: 0.14 },
                langchain: { x: 0.13, y: 0.26 },
                llms: { x: 0.28, y: 0.12 },
                python: { x: 0.14, y: 0.40 },
                groq: { x: 0.38, y: 0.16 },
                streamlit: { x: 0.32, y: 0.22 },

                // Full-Stack Sub-nodes (Top-Right)
                react: { x: 0.84, y: 0.14 },
                nodejs: { x: 0.70, y: 0.12 },
                prisma: { x: 0.87, y: 0.26 },
                mysql: { x: 0.62, y: 0.16 },
                javascript: { x: 0.86, y: 0.40 },
                tailwind: { x: 0.68, y: 0.22 },

                // Data Sub-nodes (Bottom-Left)
                sql: { x: 0.12, y: 0.58 },
                tableau: { x: 0.28, y: 0.82 },
                pandas: { x: 0.15, y: 0.74 },
                excel: { x: 0.11, y: 0.48 },

                // Production Sub-nodes (Bottom-Right)
                sysdesign: { x: 0.88, y: 0.58 },
                docker: { x: 0.76, y: 0.88 },
                solid: { x: 0.72, y: 0.80 },
                jwt: { x: 0.85, y: 0.74 },
                git: { x: 0.89, y: 0.48 },

                // Networking Sub-nodes (Bottom-Center)
                vpc: { x: 0.40, y: 0.90 },
                wireshark: { x: 0.60, y: 0.90 },
                tcpudp: { x: 0.34, y: 0.80 },
                secgroups: { x: 0.66, y: 0.80 }
            };

            const target = coordMap[n.id] || { x: 0.5, y: 0.5 };
            const x = width * target.x;
            const y = height * target.y;

            return {
                ...n,
                x,
                y,
                baseX: x,
                baseY: y,
                opacity: 1,
                scale: 1,
                angle: Math.random() * Math.PI * 2,
                speed: 0.0014 + Math.random() * 0.0014
            };
        });

        let hoveredId = 'adnan';
        let draggedNode = null;
        let mouseDownPos = { x: 0, y: 0 };
        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            if (draggedNode) {
                draggedNode.x = mouseX;
                draggedNode.y = mouseY;
            } else {
                let found = null;
                for (const node of nodes) {
                    if (node.opacity < 0.2) continue;
                    const dx = mouseX - node.x;
                    const dy = mouseY - node.y;
                    if (Math.hypot(dx, dy) < node.radius + 12) {
                        found = node;
                        break;
                    }
                }
                hoveredId = found ? found.id : null;
                canvas.style.cursor = found ? 'pointer' : 'default';
                if (found && found.desc) {
                    setSelectedSkill(found);
                }
            }
        };

        const handleMouseDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseDownPos = { x: e.clientX, y: e.clientY };

            for (const node of nodes) {
                if (node.opacity < 0.2) continue;
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                if (Math.hypot(dx, dy) < node.radius + 12) {
                    draggedNode = node;
                    break;
                }
            }
        };

        const handleMouseUp = (e) => {
            const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);

            if (dist < 6) {
                const rect = canvas.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                for (const node of nodes) {
                    if (node.opacity < 0.2) continue;
                    const dx = clickX - node.x;
                    const dy = clickY - node.y;
                    if (Math.hypot(dx, dy) < node.radius + 14) {
                        if (node.category === 'pillar') {
                            const next = activeDomainRef.current === node.id ? 'all' : node.id;
                            setActiveDomain(next);
                            activeDomainRef.current = next;
                        } else if (node.id === 'adnan') {
                            setActiveDomain('all');
                            activeDomainRef.current = 'all';
                        } else if (node.desc) {
                            setSelectedSkill(node);
                        }
                        break;
                    }
                }
            }
            draggedNode = null;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        let time = 0;

        const render = () => {
            time += 0.012;
            ctx.clearRect(0, 0, width, height);

            const curDomain = activeDomainRef.current;

            // Update smooth node expansion/collapse physics
            nodes.forEach(node => {
                const isMatch = curDomain === 'all' ||
                                node.id === 'adnan' ||
                                node.category === 'pillar' ||
                                node.domain === curDomain;

                const targetOpacity = isMatch ? 1 : 0;
                const targetScale = isMatch ? 1 : 0.15;
                node.opacity += (targetOpacity - node.opacity) * 0.16;
                node.scale += (targetScale - node.scale) * 0.16;

                if (node !== draggedNode) {
                    node.angle += node.speed;
                    node.x = node.baseX + Math.sin(node.angle * 1.1) * 5;
                    node.y = node.baseY + Math.cos(node.angle * 1.5) * 5;
                }
            });

            // Calculate active links
            const activeLinks = new Set();
            if (hoveredId) {
                skillLinks.forEach((link, idx) => {
                    if (link.source === hoveredId || link.target === hoveredId) {
                        activeLinks.add(idx);
                        const otherId = link.source === hoveredId ? link.target : link.source;
                        skillLinks.forEach((pLink, pIdx) => {
                            if ((pLink.source === 'adnan' && pLink.target === otherId) ||
                                (pLink.target === 'adnan' && pLink.source === otherId)) {
                                activeLinks.add(pIdx);
                            }
                        });
                    }
                });
            }

            // 1. Draw Neural Synapse Links
            skillLinks.forEach((link, idx) => {
                const s = nodes.find(n => n.id === link.source);
                const t = nodes.find(n => n.id === link.target);
                if (!s || !t) return;

                const linkOpacity = Math.min(s.opacity, t.opacity);
                if (linkOpacity < 0.04) return;

                const isCoreLink = s.id === 'adnan' || t.id === 'adnan';
                const isDomainActive = curDomain !== 'all' && (s.id === curDomain || t.id === curDomain);
                const isHoveredPath = activeLinks.has(idx);
                const isLinkActive = isCoreLink || isDomainActive || isHoveredPath;

                const activeColor = isHoveredPath ? (s.color === '#ffffff' ? t.color : s.color) : (isDomainActive ? (t.color || s.color) : s.color);

                ctx.save();
                ctx.globalAlpha = linkOpacity;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(t.x, t.y);

                if (isHoveredPath || isDomainActive) {
                    ctx.strokeStyle = activeColor;
                    ctx.lineWidth = 2.4;
                    ctx.shadowColor = activeColor;
                    ctx.shadowBlur = 14;
                } else if (isCoreLink) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
                    ctx.lineWidth = 1.5;
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 8;
                } else {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
                    ctx.lineWidth = 0.9;
                    ctx.shadowBlur = 0;
                }
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Glowing Action Potential Impulse Photon
                if (isLinkActive && linkOpacity > 0.4) {
                    const speed = isHoveredPath ? 0.35 : 0.2;
                    const progress = (time * speed + (s.x % 6)) % 1;
                    const px = s.x + (t.x - s.x) * progress;
                    const py = s.y + (t.y - s.y) * progress;

                    const tailLen = 0.18;
                    const tailProg = Math.max(0, progress - tailLen);
                    const tx = s.x + (t.x - s.x) * tailProg;
                    const ty = s.y + (t.y - s.y) * tailProg;

                    const grad = ctx.createLinearGradient(tx, ty, px, py);
                    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
                    grad.addColorStop(1, (isHoveredPath || isDomainActive) ? activeColor : (s.color || '#ffffff'));

                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.lineTo(px, py);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = isHoveredPath ? 3.8 : 2.2;
                    ctx.stroke();

                    // Photon Head
                    ctx.beginPath();
                    ctx.arc(px, py, isHoveredPath ? 4 : 2.8, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = activeColor;
                    ctx.shadowBlur = 16;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
                ctx.restore();
            });

            // 2. Draw Neural Nodes
            nodes.forEach(node => {
                if (node.opacity < 0.05) return;

                ctx.save();
                ctx.globalAlpha = node.opacity;

                const isHovered = node.id === hoveredId;
                const isCore = node.id === 'adnan';
                const isPillar = node.category === 'pillar';
                const isSelectedDomain = curDomain === node.id;
                const r = node.radius * Math.max(0.1, node.scale);

                // Central Node Pulsing Halo
                if (isCore) {
                    const pulseRadius = r + 10 + Math.sin(time * 3) * 4;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 1.8;
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 18;
                    ctx.globalAlpha = 0.75 * node.opacity;
                    ctx.stroke();
                    ctx.globalAlpha = node.opacity;
                    ctx.shadowBlur = 0;
                } else if (isPillar) {
                    const ringRadius = r + (isSelectedDomain ? (14 + Math.sin(time * 4) * 3) : (isHovered ? 12 : 7));
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = node.color;
                    ctx.lineWidth = isSelectedDomain ? 2.5 : (isHovered ? 2 : 1.2);
                    ctx.shadowColor = node.color;
                    ctx.shadowBlur = isSelectedDomain ? 20 : 0;
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                } else if (isHovered) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, r + 8, 0, Math.PI * 2);
                    ctx.strokeStyle = node.color;
                    ctx.lineWidth = 1.8;
                    ctx.stroke();
                }

                // Inner Glowing Circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, r / (isCore ? 1.5 : 1.8), 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.shadowColor = node.color;
                ctx.shadowBlur = isCore ? 20 : (isSelectedDomain ? 26 : (isHovered ? 22 : 9));
                ctx.fill();
                ctx.shadowBlur = 0;

                // Monospace Text Label
                const fontSize = width < 520 ? 9 : 10.5;
                ctx.font = `${isHovered || isCore || isSelectedDomain ? '700' : '600'} ${fontSize}px 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                const labelY = node.y + r + 6;
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 8;
                ctx.fillStyle = (isHovered || isCore || isSelectedDomain) ? '#ffffff' : 'rgba(235, 240, 255, 0.85)';

                const labelText = isSelectedDomain ? `${node.label} [ACTIVE]` : node.label;
                ctx.fillText(labelText, node.x, labelY);
                ctx.shadowBlur = 0;

                ctx.restore();
            });

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animId);
        };
    }, []);

    const activeDomainMeta = domainFilterList.find(d => d.id === activeDomain) || domainFilterList[0];

    return (
        <section id="skills" className="section-padding neural-graph-section">
            <div className="container">
                <motion.div
                    className="neural-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="neural-meta-pill">
                        <span className="pill-pulse-dot"></span>
                        Architectural Constellation
                    </span>
                    <h2 className="heading-lg">The Secret Sauce</h2>
                    <p className="neural-subtitle">
                        Neural topology mapping technologies across agentic AI, deep learning, silicon architectures, and distributed full-stack systems. Click any domain pillar to expand its cluster.
                    </p>
                </motion.div>

                <div className="graph-container glass-panel">
                    {/* Top Left Meta Tag */}
                    <div className="graph-system-meta">
                        <span className="meta-prefix">System Architecture:</span>
                        <span className="meta-code" style={{ color: activeDomainMeta.color }}>
                            {' '}SKILLS_NEURAL_TOPOLOGY_V2 // {activeDomainMeta.label.toUpperCase()}
                        </span>
                        <span className="meta-instruction"> — Click domain pillars or buttons to filter</span>
                    </div>

                    {/* Top Right Legend / Interactive Filter Pills */}
                    <div className="graph-legend-card">
                        {domainFilterList.map(domain => (
                            <button
                                key={domain.id}
                                className={`legend-btn ${activeDomain === domain.id ? 'active' : ''}`}
                                onClick={() => handleDomainToggle(domain.id)}
                                title={`Filter: ${domain.label}`}
                            >
                                <span
                                    className="legend-dot"
                                    style={{
                                        backgroundColor: domain.color,
                                        boxShadow: `0 0 8px ${domain.color}`
                                    }}
                                ></span>
                                <span className="legend-label">{domain.label}</span>
                                <span className="legend-count">{domain.count}</span>
                            </button>
                        ))}
                    </div>

                    <canvas ref={canvasRef} className="graph-canvas" />

                    {/* Interactive Telemetry HUD Inspector (Shows on Hover/Click) */}
                    <AnimatePresence>
                        {selectedSkill && selectedSkill.desc && (
                            <motion.div
                                key={selectedSkill.id}
                                className="skills-hud-inspector"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    '--hud-accent': selectedSkill.color,
                                    '--hud-glow': `${selectedSkill.color}25`
                                }}
                            >
                                <div className="hud-header">
                                    <span className="hud-tag">{selectedSkill.tag || 'SPEC'}</span>
                                    <h4 className="hud-title">{selectedSkill.label}</h4>
                                    <span className="hud-level">{selectedSkill.level || 90}% MASTERY</span>
                                </div>
                                <p className="hud-desc">{selectedSkill.desc}</p>
                                <div className="hud-meter-track">
                                    <div
                                        className="hud-meter-fill"
                                        style={{ width: `${selectedSkill.level || 90}%`, background: selectedSkill.color }}
                                    ></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Skills;
