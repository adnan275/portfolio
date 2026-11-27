import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/NeuralGraph.css';
import '../styles/Skills.css';

const skillNodes = [
    // Center Node
    { id: 'adnan', label: 'ADNAN RIZVI', category: 'center', radius: 25, color: '#ffffff' },

    // Core 5 Domain Pillars
    { id: 'ai', label: 'AI & ML Core', category: 'pillar', radius: 17, color: '#ff334b' },
    { id: 'fullstack', label: 'Full-Stack Systems', category: 'pillar', radius: 17, color: '#38bdf8' },
    { id: 'comparch', label: 'Computer Architecture', category: 'pillar', radius: 17, color: '#f97316' },
    { id: 'networking', label: 'Cloud & Networks', category: 'pillar', radius: 17, color: '#fbbf24' },
    { id: 'tools', label: 'Production & Systems', category: 'pillar', radius: 17, color: '#10b981' },

    // --- AI & ML Core Sub-skills (Exact Nodes from Portfolio Architecture) ---
    { id: 'langgraph', label: 'LangGraph v0.2+', category: 'ai_skill', domain: 'ai', radius: 10, color: '#fb7185', tag: 'MULTI-AGENT', level: 96, desc: 'Stateful cyclic agent workflows, multi-agent teams, persistent checkpoints & human-in-the-loop validation.' },
    { id: 'groq', label: 'Groq LPU Engine', category: 'ai_skill', domain: 'ai', radius: 10, color: '#fb7185', tag: 'INFERENCE', level: 93, desc: 'Ultra-low latency sub-50ms TTFT acceleration for real-time agent reasoning loops.' },
    { id: 'streamlit', label: 'Streamlit & Agent UI', category: 'ai_skill', domain: 'ai', radius: 10, color: '#fb7185', tag: 'PROTOTYPE', level: 90, desc: 'Rapid reactive AI dashboard prototypes, multi-agent chat interfaces & telemetry displays.' },
    { id: 'langchain', label: 'LangChain & Vector DBs', category: 'ai_skill', domain: 'ai', radius: 10, color: '#fb7185', tag: 'RAG & VECTORS', level: 95, desc: 'Semantic retrieval architectures, ChromaDB/Pinecone dense vector search, hybrid ranking & agent memory.' },
    { id: 'python', label: 'Python & PyTorch', category: 'ai_skill', domain: 'ai', radius: 10, color: '#fb7185', tag: 'PYTHON & AI', level: 96, desc: 'Core Python, async FastAPI microservices, custom autograd backprop, CNNs, LoRA & QLoRA quantization.' },

    // --- Full-Stack Systems Sub-skills (Frontend, Backend, UI/Motion & Database) ---
    { id: 'react_next', label: 'React 19 & Next.js', category: 'fs_skill', domain: 'fullstack', radius: 10, color: '#7dd3fc', tag: 'MODERN FRONTEND', level: 96, desc: 'Next.js App Router, React 19 Server Components, SSR/SSG pipelines & client-side reactive state.' },
    { id: 'tailwind_ui', label: 'Tailwind CSS & Motion', category: 'fs_skill', domain: 'fullstack', radius: 10, color: '#7dd3fc', tag: 'MODERN UI/UX', level: 95, desc: 'Responsive glassmorphism HUDs, atomic utility tokens, Framer Motion animations & cyber aesthetics.' },
    { id: 'node_ts', label: 'Node.js & TypeScript', category: 'fs_skill', domain: 'fullstack', radius: 10, color: '#7dd3fc', tag: 'TYPE-SAFE BACKEND', level: 95, desc: 'Scalable async backend services, Express/Fastify APIs, type-safe RPC contracts & real-time WebSockets.' },
    { id: 'db_sql_nosql', label: 'MySQL & MongoDB', category: 'fs_skill', domain: 'fullstack', radius: 10, color: '#7dd3fc', tag: 'SQL & NOSQL DB', level: 94, desc: 'Relational schema design, ACID transactions, MongoDB document aggregation, indexing & Prisma ORM.' },

    // --- Modern Computer Architecture Sub-skills (Directly from CSA-222 PDF) ---
    { id: 'verilog', label: 'Verilog HDL & GTKWave', category: 'arch_skill', domain: 'comparch', radius: 10, color: '#fdba74', tag: 'RTL SYNTHESIS', level: 95, desc: 'Hardware description language (HDL), cycle-accurate RTL testbench validation, waveform simulation & logic verification.' },
    { id: 'riscv_pipe', label: 'RISC-V & 5-Stage Datapath', category: 'arch_skill', domain: 'comparch', radius: 10, color: '#fdba74', tag: 'CPU PIPELINING', level: 93, desc: '5-stage instruction datapath (IF/ID/EX/MEM/WB), RAW data hazard mitigation, branch prediction & assembly translation.' },
    { id: 'systolic_ai', label: 'TPU & Systolic Arrays', category: 'arch_skill', domain: 'comparch', radius: 10, color: '#fdba74', tag: 'TENSORAX GEMM', level: 95, desc: '2D mesh systolic array matrix accelerators, parameterized PEs, spatial data reuse & low-power tensor compute.' },
    { id: 'cache_mesi', label: 'Cache Hierarchy & MESI', category: 'arch_skill', domain: 'comparch', radius: 10, color: '#fdba74', tag: 'AMAT & COHERENCE', level: 92, desc: 'L1/L2/L3 cache associativity, AMAT latency reduction, multicore MESI snooping protocol & cache-blocked matrix tiling.' },

    // --- Computer Networks & Cloud Sub-skills ---
    { id: 'tcp_sockets', label: 'TCP/IP & Wireshark', category: 'net_skill', domain: 'networking', radius: 10, color: '#fde047', tag: 'PROTOCOLS', level: 94, desc: 'Low-level Python sockets, 3-way handshakes, TLS 1.3 termination & Wireshark packet capture telemetry.' },
    { id: 'cloud_vpc', label: 'AWS VPC & Private DNS', category: 'net_skill', domain: 'networking', radius: 10, color: '#fde047', tag: 'INFRASTRUCTURE', level: 92, desc: 'AWS VPC CIDR subnetting, NAT gateways, stateful security groups & dnsmasq private DNS routing.' },

    // --- Production & Systems Sub-skills ---
    { id: 'sysdesign', label: 'System Design & Redis', category: 'tool_skill', domain: 'tools', radius: 10, color: '#6ee7b7', tag: 'DISTRIBUTED ARCH', level: 95, desc: 'Redis caching, microservices, load balancing, multi-stage Docker containerization & CAP theorem.' },
    { id: 'sql_analytics', label: 'Advanced SQL & Tableau', category: 'tool_skill', domain: 'tools', radius: 10, color: '#6ee7b7', tag: 'SQL & BI', level: 94, desc: 'Complex CTEs, window functions, analytics pipelines, parameter-driven dashboards & KPI intelligence.' },
    { id: 'devops_sec', label: 'CI/CD, Git & Security', category: 'tool_skill', domain: 'tools', radius: 10, color: '#6ee7b7', tag: 'DEVSECOPS', level: 93, desc: 'Automated GitHub Actions, JWT/RBAC security, token rotation, OOP SOLID patterns & clean code.' }
];

const skillLinks = [
    // Core links to pillars
    { source: 'adnan', target: 'ai' },
    { source: 'adnan', target: 'fullstack' },
    { source: 'adnan', target: 'comparch' },
    { source: 'adnan', target: 'networking' },
    { source: 'adnan', target: 'tools' },

    // AI sub-links
    { source: 'ai', target: 'langgraph' },
    { source: 'ai', target: 'groq' },
    { source: 'ai', target: 'streamlit' },
    { source: 'ai', target: 'langchain' },
    { source: 'ai', target: 'python' },

    // Full-Stack sub-links (Frontend, UI/UX, Backend, Database)
    { source: 'fullstack', target: 'react_next' },
    { source: 'fullstack', target: 'tailwind_ui' },
    { source: 'fullstack', target: 'node_ts' },
    { source: 'fullstack', target: 'db_sql_nosql' },

    // Modern Computer Architecture sub-links
    { source: 'comparch', target: 'verilog' },
    { source: 'comparch', target: 'riscv_pipe' },
    { source: 'comparch', target: 'systolic_ai' },
    { source: 'comparch', target: 'cache_mesi' },

    // Networking sub-links
    { source: 'networking', target: 'tcp_sockets' },
    { source: 'networking', target: 'cloud_vpc' },

    // Production & Systems sub-links
    { source: 'tools', target: 'sysdesign' },
    { source: 'tools', target: 'sql_analytics' },
    { source: 'tools', target: 'devops_sec' }
];

const domainFilterList = [
    { id: 'all', label: 'All Domains', color: '#ffffff', count: 18 },
    { id: 'ai', label: 'AI & ML Core', color: '#ff334b', count: 5 },
    { id: 'fullstack', label: 'Full-Stack Systems', color: '#38bdf8', count: 4 },
    { id: 'comparch', label: 'Computer Architecture', color: '#f97316', count: 4 },
    { id: 'networking', label: 'Cloud & Networks', color: '#fbbf24', count: 2 },
    { id: 'tools', label: 'Production & Systems', color: '#10b981', count: 3 }
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

        let width = 800;
        let height = 660;

        const coordMap = {
            adnan: { x: 0.50, y: 0.48 },

            // 5 Core Pillars
            ai: { x: 0.28, y: 0.28 },
            fullstack: { x: 0.74, y: 0.28 },
            comparch: { x: 0.25, y: 0.65 },
            networking: { x: 0.50, y: 0.70 },
            tools: { x: 0.75, y: 0.65 },

            // AI Sub-nodes (Top-Left - Generously Spaced Out Pentagon)
            langgraph: { x: 0.14, y: 0.14 },
            groq: { x: 0.36, y: 0.14 },
            streamlit: { x: 0.40, y: 0.28 },
            python: { x: 0.22, y: 0.44 },
            langchain: { x: 0.10, y: 0.30 },

            // Full-Stack Sub-nodes (Top-Right - Clean 4-Node Clutter-Free Matrix)
            tailwind_ui: { x: 0.60, y: 0.16 },
            react_next: { x: 0.86, y: 0.14 },
            db_sql_nosql: { x: 0.62, y: 0.36 },
            node_ts: { x: 0.88, y: 0.36 },

            // Computer Architecture Sub-nodes (Bottom-Left)
            verilog: { x: 0.10, y: 0.56 },
            riscv_pipe: { x: 0.10, y: 0.76 },
            systolic_ai: { x: 0.24, y: 0.88 },
            cache_mesi: { x: 0.35, y: 0.76 },

            // Networking Sub-nodes (Bottom-Center - Staggered Y to avoid text overlap)
            tcp_sockets: { x: 0.42, y: 0.84 },
            cloud_vpc: { x: 0.58, y: 0.90 },

            // Production & Systems Sub-nodes (Bottom-Right - Staggered Triangle)
            sql_analytics: { x: 0.68, y: 0.76 },
            devops_sec: { x: 0.78, y: 0.88 },
            sysdesign: { x: 0.88, y: 0.76 }
        };

        const calculateBaseCoords = (nodeId, w, h) => {
            const target = coordMap[nodeId] || { x: 0.5, y: 0.5 };
            const compressX = w < 420 ? 0.94 : (w < 580 ? 0.96 : 1.0);
            const compressY = h < 520 ? 0.96 : 1.0;
            let tx = target.x;
            if (tx !== 0.5) {
                tx = 0.5 + (tx - 0.5) * compressX;
            }
            let ty = target.y;
            if (ty !== 0.5) {
                ty = 0.5 + (ty - 0.5) * compressY;
            }
            return { x: w * tx, y: h * ty };
        };

        const nodes = skillNodes.map(n => {
            const { x, y } = calculateBaseCoords(n.id, 800, 600);
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

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            width = rect.width;
            height = rect.height;

            nodes.forEach(node => {
                const coords = calculateBaseCoords(node.id, width, height);
                node.baseX = coords.x;
                node.baseY = coords.y;
                if (draggedNode !== node) {
                    node.x = coords.x;
                    node.y = coords.y;
                }
            });
        };
        resize();
        window.addEventListener('resize', resize);

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
                    const r = node.radius * Math.max(0.1, node.scale);
                    const safeMargin = r + 12;
                    const rawX = node.baseX + Math.sin(node.angle * 1.1) * 4;
                    const rawY = node.baseY + Math.cos(node.angle * 1.5) * 4;
                    node.x = Math.max(safeMargin, Math.min(width - safeMargin, rawX));
                    node.y = Math.max(safeMargin, Math.min(height - safeMargin - 15, rawY));
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
                if (isCore || isSelectedDomain || isHovered) {
                    ctx.shadowColor = node.color;
                    ctx.shadowBlur = isCore ? 20 : (isSelectedDomain ? 24 : 18);
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
                ctx.shadowBlur = 0;

                // Monospace Text Label (Scaled smoothly for small phones & tablets)
                const isSmallPhone = width < 420;
                const isTablet = width < 560;
                const fontSize = isSmallPhone ? 7.8 : (isTablet ? 9.2 : 11.2);
                ctx.font = `${isHovered || isCore || isSelectedDomain ? '700' : '600'} ${fontSize}px 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                const labelText = isSelectedDomain ? `${node.label} [ACTIVE]` : node.label;
                const textWidth = ctx.measureText(labelText).width;
                const halfTextWidth = textWidth / 2;
                const sidePad = 10;
                // Clamp X so the label never clips off canvas left or right borders
                const clampedLabelX = Math.max(halfTextWidth + sidePad, Math.min(width - halfTextWidth - sidePad, node.x));
                const rawLabelY = node.y + r + (isSmallPhone ? 3 : 5);
                const clampedLabelY = Math.max(sidePad, Math.min(height - fontSize - sidePad, rawLabelY));

                if (isHovered || isCore || isSelectedDomain) {
                    ctx.shadowColor = '#000000';
                    ctx.shadowBlur = 6;
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fillStyle = (isHovered || isCore || isSelectedDomain) ? '#ffffff' : 'rgba(235, 240, 255, 0.85)';

                ctx.fillText(labelText, clampedLabelX, clampedLabelY);
                ctx.shadowBlur = 0;

                ctx.restore();
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

        observer.observe(canvas);

        render();

        return () => {
            observer.disconnect();
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
