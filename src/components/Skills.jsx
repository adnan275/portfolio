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
    { id: 'langchain', label: 'LangChain & Vector DBs', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'RAG & VECTORS', level: 94, desc: 'Semantic retrieval architectures, ChromaDB/Pinecone dense vector search, hybrid ranking & agent memory.' },
    { id: 'llms', label: 'Transformers & LLMs', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'FOUNDATION', level: 92, desc: 'Self-Attention, Mamba SSMs, Diffusion pipelines, Direct Preference Optimization (DPO).' },
    { id: 'python', label: 'Python & PyTorch', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'PYTHON & AI', level: 96, desc: 'Core Python, async FastAPI microservices, custom autograd backprop, CNNs, LoRA & QLoRA quantization.' },
    { id: 'groq', label: 'Groq LPU Engine', category: 'ai_skill', domain: 'ai', radius: 8, color: '#00f0ff', tag: 'INFERENCE', level: 93, desc: 'Ultra-low latency sub-50ms TTFT acceleration for real-time agent reasoning loops.' },
    { id: 'streamlit', label: 'Streamlit & Agent UI', category: 'ai_skill', domain: 'ai', radius: 7, color: '#00f0ff', tag: 'PROTOTYPE', level: 90, desc: 'Rapid reactive AI dashboard prototypes, multi-agent chat interfaces & telemetry displays.' },

    // --- Full-Stack Systems Sub-skills ---
    { id: 'react', label: 'React 19 & Next.js', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'FULLSTACK UI', level: 96, desc: 'Next.js App Router, SSR/SSG pipelines, React Server Components, custom hooks & Vite.' },
    { id: 'nodejs', label: 'Node.js & WebSockets', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'REAL-TIME APIS', level: 94, desc: 'Socket.io real-time bidirectional messaging, WebRTC signaling, async clustering & Express REST APIs.' },
    { id: 'prisma', label: 'Prisma ORM', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'TYPE-SAFE DB', level: 92, desc: 'Schema-driven migrations, declarative relations, connection pooling & auto-generated clients.' },
    { id: 'mysql', label: 'MySQL & MongoDB', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'STORAGE LAYER', level: 91, desc: 'B-tree indexing, ACID relational guarantees, aggregation pipelines & sharding strategies.' },
    { id: 'javascript', label: 'TypeScript & JavaScript', category: 'fs_skill', domain: 'fullstack', radius: 8, color: '#c084fc', tag: 'TYPE-SAFE CORE', level: 96, desc: 'Type-safe interfaces, generics, V8 Event Loop microtasks, closures & Web Workers.' },
    { id: 'tailwind', label: 'Tailwind & Motion', category: 'fs_skill', domain: 'fullstack', radius: 7, color: '#c084fc', tag: 'CYBER UI', level: 94, desc: 'Atomic design tokens, hardware-accelerated animations, responsive glassmorphism & HUDs.' },

    // --- Data & Analytics Sub-skills ---
    { id: 'sql', label: 'Advanced SQL', category: 'data_skill', domain: 'data', radius: 8, color: '#ffb703', tag: 'QUERY ENGINE', level: 95, desc: 'Window functions, Common Table Expressions (CTEs), recursive queries & execution plan tuning.' },
    { id: 'tableau', label: 'Tableau & Dashboards', category: 'data_skill', domain: 'data', radius: 8, color: '#ffb703', tag: 'ANALYTICS HUD', level: 90, desc: 'Interactive parameter controls, multi-source blending, calculated fields & KPI reporting.' },
    { id: 'pandas', label: 'Pandas & NumPy', category: 'data_skill', domain: 'data', radius: 8, color: '#ffb703', tag: 'ETL PIPELINE', level: 93, desc: 'Vectorized tensor operations, exploratory data analysis, outlier sanitization & feature engineering.' },
    { id: 'excel', label: 'Excel & Data Prep', category: 'data_skill', domain: 'data', radius: 7, color: '#ffb703', tag: 'STATISTICS', level: 88, desc: 'Dynamic pivot structures, statistical regression modeling, Power Query transformations.' },

    // --- Production Engineering Sub-skills ---
    { id: 'sysdesign', label: 'System Design & Redis', category: 'tool_skill', domain: 'tools', radius: 8, color: '#34d399', tag: 'DISTRIBUTED ARCH', level: 95, desc: 'Redis distributed caching, microservices architectures, load balancers, CDN edge caching & CAP theorem.' },
    { id: 'docker', label: 'Docker Containers', category: 'tool_skill', domain: 'tools', radius: 8, color: '#34d399', tag: 'ISOLATION', level: 92, desc: 'Multi-stage container builds, Alpine optimization, compose orchestration & deterministic runs.' },
    { id: 'solid', label: 'OOP & Clean Code', category: 'tool_skill', domain: 'tools', radius: 8, color: '#34d399', tag: 'PATTERNS', level: 92, desc: 'SOLID principles, design patterns (Factory, Observer, Strategy), dependency injection.' },
    { id: 'jwt', label: 'JWT & Security', category: 'tool_skill', domain: 'tools', radius: 8, color: '#34d399', tag: 'AUTH / SEC', level: 93, desc: 'Role-Based Access Control (RBAC), token rotation, salted SHA hashing & CSRF/XSS hardening.' },
    { id: 'git', label: 'Git & GitHub Actions', category: 'tool_skill', domain: 'tools', radius: 7, color: '#34d399', tag: 'CI/CD DEVOPS', level: 94, desc: 'Branch protections, automated GitHub Actions testing, preview deploy triggers on Vercel.' },

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
    // By default loads with 'all' domains visible; telemetry dock is hidden until a skill is clicked
    const [activeDomain, setActiveDomain] = useState('all');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const activeDomainRef = useRef('all');
    const selectedSkillRef = useRef(null);

    useEffect(() => {
        activeDomainRef.current = activeDomain;
    }, [activeDomain]);

    const handleDomainToggle = (domainId) => {
        setActiveDomain(domainId);
        selectedSkillRef.current = null;
        setSelectedSkill(null);
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
                adnan: { x: 0.50, y: 0.50 },

                // 5 Core Pillars (Generous separation)
                ai: { x: 0.30, y: 0.34 },
                fullstack: { x: 0.70, y: 0.34 },
                data: { x: 0.26, y: 0.68 },
                tools: { x: 0.74, y: 0.68 },
                networking: { x: 0.50, y: 0.80 },

                // AI Sub-nodes (Top-Left Quadrant - Clear of bottom)
                langgraph: { x: 0.13, y: 0.15 },
                langchain: { x: 0.10, y: 0.28 },
                llms: { x: 0.26, y: 0.12 },
                python: { x: 0.14, y: 0.42 }, // PyTorch & DL safely positioned at y: 0.42
                groq: { x: 0.38, y: 0.18 },
                streamlit: { x: 0.33, y: 0.24 },

                // Full-Stack Sub-nodes (Top-Right Quadrant - Clear of bottom)
                react: { x: 0.87, y: 0.15 },
                nodejs: { x: 0.74, y: 0.12 },
                prisma: { x: 0.90, y: 0.28 },
                mysql: { x: 0.62, y: 0.18 },
                javascript: { x: 0.86, y: 0.42 }, // JS safely positioned at y: 0.42
                tailwind: { x: 0.67, y: 0.24 },

                // Data Sub-nodes (Bottom-Left Quadrant - Well separated below y: 0.56)
                excel: { x: 0.10, y: 0.58 }, // Excel positioned at y: 0.58 (115px below PyTorch)
                sql: { x: 0.12, y: 0.70 },
                pandas: { x: 0.16, y: 0.82 },
                tableau: { x: 0.30, y: 0.88 },

                // Production Sub-nodes (Bottom-Right Quadrant - Well separated below y: 0.56)
                jwt: { x: 0.90, y: 0.58 }, // JWT positioned at y: 0.58 (115px below JavaScript)
                sysdesign: { x: 0.88, y: 0.70 },
                git: { x: 0.82, y: 0.82 },
                solid: { x: 0.70, y: 0.86 },
                docker: { x: 0.78, y: 0.92 },

                // Networking Sub-nodes (Bottom-Center - Well spaced)
                vpc: { x: 0.38, y: 0.92 },
                wireshark: { x: 0.62, y: 0.92 },
                tcpudp: { x: 0.34, y: 0.82 },
                secgroups: { x: 0.66, y: 0.82 }
            };

            const target = coordMap[n.id] || { x: 0.5, y: 0.5 };
            let tx = target.x;
            // On narrower screens, gently compress X towards center so edge labels never clip off canvas
            if (width < 580 && tx !== 0.5) {
                tx = 0.5 + (tx - 0.5) * 0.86;
            }
            const x = width * tx;
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

                // Instant zero-delay hover telemetry inspector
                if (found && found.desc) {
                    if (selectedSkillRef.current?.id !== found.id) {
                        selectedSkillRef.current = found;
                        setSelectedSkill(found);
                    }
                } else if (!found) {
                    if (selectedSkillRef.current !== null) {
                        selectedSkillRef.current = null;
                        setSelectedSkill(null);
                    }
                }
            }
        };

        const handleMouseLeave = () => {
            hoveredId = null;
            if (selectedSkillRef.current !== null) {
                selectedSkillRef.current = null;
                setSelectedSkill(null);
            }
        };

        const handleMouseDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseDownPos = { x: e.clientX, y: e.clientY };

            for (const node of nodes) {
                if (node.opacity < 0.2) continue;
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                if (Math.hypot(dx, dy) < node.radius + 14) {
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

                let clickedNode = null;
                for (const node of nodes) {
                    if (node.opacity < 0.2) continue;
                    const dx = clickX - node.x;
                    const dy = clickY - node.y;
                    if (Math.hypot(dx, dy) < node.radius + 14) {
                        clickedNode = node;
                        break;
                    }
                }

                if (clickedNode) {
                    if (clickedNode.category === 'pillar') {
                        const next = activeDomainRef.current === clickedNode.id ? 'all' : clickedNode.id;
                        setActiveDomain(next);
                        activeDomainRef.current = next;
                        selectedSkillRef.current = null;
                        setSelectedSkill(null);
                    } else if (clickedNode.id === 'adnan') {
                        setActiveDomain('all');
                        activeDomainRef.current = 'all';
                        selectedSkillRef.current = null;
                        setSelectedSkill(null);
                    } else if (clickedNode.desc) {
                        selectedSkillRef.current = clickedNode;
                        setSelectedSkill(clickedNode);
                    }
                } else {
                    // Clicked on blank space on canvas
                    selectedSkillRef.current = null;
                    setSelectedSkill(null);
                }
            }
            draggedNode = null;
        };

        const handleTouchStart = (e) => {
            if (e.touches.length === 1) {
                const t = e.touches[0];
                handleMouseDown({ clientX: t.clientX, clientY: t.clientY });
            }
        };

        const handleTouchMove = (e) => {
            if (e.touches.length === 1) {
                const t = e.touches[0];
                handleMouseMove({ clientX: t.clientX, clientY: t.clientY });
            }
        };

        const handleTouchEnd = (e) => {
            if (e.changedTouches.length === 1) {
                const t = e.changedTouches[0];
                handleMouseUp({ clientX: t.clientX, clientY: t.clientY });
            }
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

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

                // Monospace Text Label (Scaled smoothly for small phones & tablets)
                const isSmallPhone = width < 420;
                const isTablet = width < 560;
                const fontSize = isSmallPhone ? 7.6 : (isTablet ? 8.8 : 10.5);
                ctx.font = `${isHovered || isCore || isSelectedDomain ? '700' : '600'} ${fontSize}px 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                const labelY = node.y + r + (isSmallPhone ? 4 : 6);
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
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animId);
        };
    }, []);

    const activeDomainMeta = domainFilterList.find(d => d.id === activeDomain) || domainFilterList[0];

    return (
        <section id="skills" className="section-padding skills-neural-section">
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

                {/* Horizontal Domain Filter Toolbar (Above Canvas - Zero Node Overlap) */}
                <div className="skills-filter-toolbar">
                    {domainFilterList.map(domain => (
                        <button
                            key={domain.id}
                            className={`filter-chip ${activeDomain === domain.id ? 'active' : ''}`}
                            onClick={() => handleDomainToggle(domain.id)}
                            style={{ '--chip-color': domain.color }}
                        >
                            <span
                                className="chip-dot"
                                style={{
                                    backgroundColor: domain.color,
                                    boxShadow: `0 0 8px ${domain.color}`
                                }}
                            ></span>
                            <span className="chip-text">{domain.label}</span>
                            <span className="chip-count">{domain.count}</span>
                        </button>
                    ))}
                </div>

                <div className="graph-container glass-panel skills-graph-canvas-box">
                    {/* Top Left Meta Tag */}
                    <div className="graph-system-meta">
                        <span className="meta-prefix">System Architecture:</span>
                        <span className="meta-code" style={{ color: activeDomainMeta.color }}>
                            {' '}SKILLS_NEURAL_TOPOLOGY_V2 // {activeDomainMeta.label.toUpperCase()}
                        </span>
                        <span className="meta-instruction"> — Click domain chips above to filter</span>
                    </div>

                    <canvas ref={canvasRef} className="graph-canvas" />
                </div>

                {/* Telemetry HUD Dock (Smoothly glides into view on hover) */}
                {selectedSkill && selectedSkill.desc && (
                    <div
                        key={selectedSkill.id}
                        className="skills-telemetry-dock glass-panel"
                        style={{
                            '--dock-accent': selectedSkill.color,
                            '--dock-glow': `${selectedSkill.color}25`
                        }}
                    >
                        <div className="dock-left">
                            <span className="dock-tag" style={{ color: selectedSkill.color, borderColor: `${selectedSkill.color}66` }}>
                                {selectedSkill.tag || 'SPEC'}
                            </span>
                            <div className="dock-title-wrap">
                                <h4 className="dock-title">{selectedSkill.label}</h4>
                                <span className="dock-domain">{selectedSkill.domain?.toUpperCase() || 'CORE'} DOMAIN</span>
                            </div>
                        </div>

                        <p className="dock-desc">{selectedSkill.desc}</p>

                        <div className="dock-right">
                            <span className="dock-level-text">{selectedSkill.level || 90}% PROFICIENCY</span>
                            <div className="dock-meter-track">
                                <div
                                    className="dock-meter-fill"
                                    style={{
                                        width: `${selectedSkill.level || 90}%`,
                                        background: `linear-gradient(90deg, ${selectedSkill.color} 0%, #ffffff 100%)`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <button
                            className="dock-close-btn"
                            onClick={() => {
                                selectedSkillRef.current = null;
                                setSelectedSkill(null);
                            }}
                            aria-label="Close details"
                            title="Close"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;
