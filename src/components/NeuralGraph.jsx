import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCaseStudy from './ProjectCaseStudy';
import '../styles/NeuralGraph.css';

const initialNodes = [
    {
        id: 'adnan',
        label: 'ADNAN RIZVI',
        category: 'core',
        color: '#ffffff',
        radius: 16
    },

    // Domain Pillars (Non-clickable category: 'pillar')
    {
        id: 'ai',
        label: 'AI & ML Core',
        category: 'pillar',
        color: '#00f0ff',
        radius: 12
    },
    {
        id: 'fullstack',
        label: 'Full-Stack Systems',
        category: 'pillar',
        color: '#c084fc',
        radius: 12
    },
    {
        id: 'data',
        label: 'Data & Analytics',
        category: 'pillar',
        color: '#fbbf24',
        radius: 12
    },
    {
        id: 'projects',
        label: 'Production Engineering',
        category: 'pillar',
        color: '#34d399',
        radius: 12
    },

    // AI Pillar Sub-nodes (Clickable Projects)
    {
        id: 'sentinel',
        label: 'Sentinel AI',
        category: 'project',
        color: '#38bdf8',
        radius: 8,
        title: 'Sentinel — AI-Powered File Organization',
        description: 'Local-first AI agent that scans, classifies, and organizes files using a plan-before-execute flow. Built with a focus on safety and privacy, running offline via local LLMs.',
        tags: ['Python', 'FastAPI', 'Next.js', 'Rust', 'Tauri', 'Ollama', 'SQLModel'],
        link: 'https://sentinel-ten-black.vercel.app/',
        image: '/projects/sentinel.png',
        github: 'https://github.com/adnan275/sentinel',
        details: {
            problem: 'Traditional file organization is manual and time-consuming, while cloud AI solutions pose privacy risks for sensitive local documents.',
            solution: 'Sentinel uses local LLMs (via Ollama) to analyze file contents and metadata, executing a "Plan-then-Execute" flow where users review organization plans before files are modified.',
            features: [
                'Local-first AI (Zero data leaves your local machine)',
                'Intelligent file classification and semantic folder creation',
                'Plan-before-execute safety and preview approval mechanism',
                'Cross-platform lightweight desktop wrapper using Tauri & Rust'
            ],
            techStack: ['Python', 'FastAPI', 'Next.js', 'Rust', 'Tauri', 'Ollama', 'SQLModel']
        }
    },
    {
        id: 'neurax',
        label: 'NeuraX Vector DB',
        category: 'project',
        color: '#38bdf8',
        radius: 8,
        title: 'NeuraX — Vector DB & RAG Engine',
        description: 'Privacy-centric Vector Database and RAG engine supporting 768D embeddings with HNSW/KD-Tree indexing and real-time PCA visualization.',
        tags: ['Python', 'FastAPI', 'NumPy', 'JS', 'Hugging Face', 'Ollama (Llama 3.2)', 'HNSW'],
        link: 'https://huggingface.co/spaces/rizzzvi/NeuraX',
        image: '/projects/neurax.png',
        github: 'https://github.com/adnan275/NeuraX',
        details: {
            problem: 'Most cloud vector databases introduce external API latency, recurring costs, and privacy concerns when indexing sensitive documents.',
            solution: 'Engineered a custom vector database from scratch using NumPy for similarity search, complete with a real-time PCA visualizer to project 768D vectors into interactive 2D space.',
            features: [
                'Custom HNSW and KD-Tree vector spatial indexing',
                'Supports 768D embeddings generated via Nomic Embed & Llama 3.2',
                'Real-time Principal Component Analysis (PCA) 2D canvas visualization',
                'Local RAG pipeline for secure, offline document QA'
            ],
            techStack: ['Python', 'FastAPI', 'NumPy', 'JavaScript', 'Hugging Face', 'Ollama', 'HNSW']
        }
    },
    {
        id: 'ev_agent',
        label: 'EV Charging Agent',
        category: 'project',
        color: '#38bdf8',
        radius: 8,
        title: 'AI EV Charging Station Intelligence',
        description: 'Autonomous Agentic AI system using LangGraph for charger suitability prediction, wait time forecasting, and geospatial retrieval over 240,000+ stations.',
        tags: ['Python', 'LangGraph', 'LangChain', 'Groq', 'ChromaDB', 'XGBoost', 'Streamlit', 'Docker'],
        link: 'https://huggingface.co/spaces/rizzzvi/ev-charging-agent',
        image: '/projects/ev-charging-agent.png',
        github: 'https://github.com/adnan275/ev-charging-agent',
        details: {
            problem: 'EV drivers suffer from range anxiety and unpredictable wait times due to static charging station directory maps.',
            solution: 'An autonomous multi-agent system built with LangGraph orchestrating a Geospatial Agent, an XGBoost Prediction Agent for wait times, and a Suitability Agent.',
            features: [
                'Multi-agent workflow orchestration using LangGraph state graphs',
                'Wait time forecasting model trained with XGBoost',
                'Geospatial vector search across 240,000+ global EV charging stations',
                'Interactive Streamlit UI with Docker containerized deployment'
            ],
            techStack: ['Python', 'LangGraph', 'LangChain', 'Groq', 'ChromaDB', 'XGBoost', 'Streamlit', 'Docker']
        }
    },

    // Full-Stack Pillar Sub-nodes (Clickable Projects)
    {
        id: 'presento',
        label: 'Presento Treasure',
        category: 'project',
        color: '#e879f9',
        radius: 8,
        title: 'Presento Treasure — E-commerce Platform',
        description: 'Full-stack freelance e-commerce platform built with modular Express APIs, role-based auth, and sub-80ms search performance.',
        tags: ['React', 'Node.js', 'MySQL', 'Express', 'Prisma', 'JWT'],
        link: 'https://fullstack-presento-swaj.vercel.app/',
        image: '/projects/presento.png',
        github: 'https://github.com/adnan275/fullstack_presento',
        details: {
            problem: 'The client required a custom e-commerce solution capable of handling high-velocity catalog searches and secure user authorization.',
            solution: 'Engineered a full-stack platform using Prisma ORM with MySQL (Aiven) indexing for sub-80ms queries, reducing overall checkout pipeline latency by 40%.',
            features: [
                'Role-based access control (JWT/RBAC) with secure session handling',
                'Sub-80ms catalog search latency across 10,000+ inventory items',
                '40% overall latency reduction in full checkout pipeline',
                'Cloudinary media management & Nodemailer transactional emails'
            ],
            techStack: ['React', 'Node.js', 'MySQL (Aiven)', 'Express', 'Prisma', 'JWT', 'Cloudinary']
        }
    },
    {
        id: 'gigflow',
        label: 'GigFlow',
        category: 'project',
        color: '#e879f9',
        radius: 8,
        title: 'GigFlow — Real-Time Freelance Marketplace',
        description: 'Real-time freelance marketplace platform for posting gigs, bidding, and live messaging powered by Socket.io.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'TailwindCSS'],
        link: 'https://service-hive-zeta.vercel.app/',
        image: '/projects/service-hive.png',
        github: 'https://github.com/adnan275/service-hive',
        details: {
            problem: 'Conventional freelance platforms rely on polling, causing delayed client-freelancer communications and slow bid updates.',
            solution: 'Built a high-performance marketplace with real-time bidding and instant messaging using Socket.io and Framer Motion micro-interactions.',
            features: [
                'Real-time competitive bidding system with live updates',
                'Instant peer-to-peer messaging via Socket.io websockets',
                'Custom dual dashboards for client project posting & freelancer bids',
                'Smooth reactive transitions built with Framer Motion'
            ],
            techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'TailwindCSS', 'Framer Motion']
        }
    },
    {
        id: 'zync',
        label: 'Zync Platform',
        category: 'project',
        color: '#e879f9',
        radius: 8,
        title: 'Zync — Video Calling Platform',
        description: 'Real-time video calling platform with 15,000+ calls, 50,000+ messages, 98% user satisfaction, and <0.1% error rate.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stream', 'JWT'],
        link: 'https://zync-five.vercel.app/login',
        image: '/projects/zync.png',
        github: 'https://github.com/adnan275/zync',
        details: {
            problem: 'Developing a reliable, low-latency video communication service that scales across network conditions is technically challenging.',
            solution: 'Leveraged GetStream.io WebRTC infrastructure combined with a custom Node.js backend for authentication, room creation, and persistent message history.',
            features: [
                'HD real-time video/audio calling with dynamic video grid',
                'In-call live chat and reaction sharing',
                'JWT authentication and protected session routes',
                'Powered 15,000+ video calls with under 0.1% connection failure'
            ],
            techStack: ['React', 'Node.js', 'Express', 'Stream API', 'MongoDB', 'JWT']
        }
    },
    {
        id: 'taskly',
        label: 'Taskly',
        category: 'project',
        color: '#e879f9',
        radius: 8,
        title: 'Taskly — Task Manager',
        description: 'Auth-based Task Manager for organizing personal workflows with real-time Firebase syncing.',
        tags: ['React', 'Firebase', 'Auth', 'JavaScript'],
        link: 'https://auth-taskly.vercel.app/',
        image: '/projects/taskly-real.png',
        github: 'https://github.com/adnan275/auth-taskly',
        details: {
            problem: 'Users need a simple, fast, and reliable way to sync tasks across devices without complex setups.',
            solution: 'Utilized Firebase for real-time data synchronization and seamless Google/Email authentication.',
            features: ['Real-time task syncing', 'Google Authentication', 'Drag-and-drop organization', 'Offline support'],
            techStack: ['React', 'Firebase', 'Firestore', 'Context API']
        }
    },
    {
        id: 'capstone',
        label: 'Capstone Project',
        category: 'project',
        color: '#e879f9',
        radius: 8,
        title: 'Capstone Project — Full Stack Web',
        description: 'Comprehensive web solution demonstrating full-stack capabilities and modern layout design.',
        tags: ['CSS', 'HTML', 'JavaScript'],
        link: 'https://s-w-project-sigma.vercel.app/',
        image: '/projects/capstone-real.jpg',
        github: 'https://github.com/adnan275/s-w-project',
        details: {
            problem: 'Integrating multiple web technologies into a cohesive application.',
            solution: 'Developed a web platform focusing on semantic HTML, modern CSS layouts, and interactive JS components.',
            features: ['Responsive multi-page layout', 'Interactive data displays', 'Form validation logic'],
            techStack: ['HTML5', 'CSS3', 'JavaScript']
        }
    },

    // Data Pillar Sub-nodes (Clickable Projects)
    {
        id: 'bi_portfolio',
        label: 'BI Portfolio',
        category: 'project',
        color: '#fcd34d',
        radius: 8,
        title: 'Data Analytics & BI Portfolio',
        description: 'Consolidated data intelligence portfolio showcasing end-to-end ETL pipelines, EDA, and interactive Tableau dashboards.',
        tags: ['Python', 'SQL', 'Tableau', 'ETL Pipelines', 'Dashboard Design', 'EDA'],
        link: 'https://dva-portfolio-theta.vercel.app/',
        image: '/projects/dva-portfolio.png',
        github: 'https://github.com/adnan275/dva_portfolio',
        details: {
            problem: 'Businesses struggle to convert raw uncleaned data into clear risk predictors and pricing intelligence.',
            solution: 'Built a unified data intelligence suite featuring automated Python ETL scripts, statistical profiling, and interactive Tableau dashboards.',
            features: [
                'Automated Python & SQL pipelines for missing value imputation & outlier removal',
                'Loan Default Risk Analysis mapping Loan-to-Value (LTV) and Debt-to-Income (DTI)',
                'Interactive Tableau dashboards with parameter-driven KPI filters',
                'Marketplace trend analytics showcasing sales distribution'
            ],
            techStack: ['Python', 'SQL', 'Tableau', 'Pandas', 'ETL', 'EDA']
        }
    },
    {
        id: 'socratic',
        label: 'Socratic Tutor',
        category: 'project',
        color: '#fcd34d',
        radius: 8,
        title: 'Socratic Study Buddy',
        description: 'AI-powered Socratic tutor with intelligent guardrails that guides learning through questions rather than direct answers.',
        tags: ['Flask', 'Python', 'OpenAI API', 'JavaScript', 'CSS3', 'Vercel'],
        link: 'https://socratic-study-buddy.vercel.app/',
        image: '/projects/socratic-buddy.png',
        github: 'https://github.com/adnan275/socratic-study-buddy',
        details: {
            problem: 'Students often copy direct AI outputs without understanding core principles or developing problem-solving skills.',
            solution: 'Designed a tutor that applies the Socratic method, asking guided questions and enforcing system guardrails to prevent answer disclosure.',
            features: [
                'Guarded prompt engineering enforcing Socratic learning flow',
                'Contextual follow-up question synthesis',
                'Session persistence for subject review',
                'Lightweight Flask backend deployed on Vercel'
            ],
            techStack: ['Flask', 'Python', 'OpenAI API', 'JavaScript', 'CSS3', 'Vercel']
        }
    },

    // Production Engineering Sub-nodes (Clickable Projects)
    {
        id: 'livesitter',
        label: 'Livesitter',
        category: 'project',
        color: '#6ee7b7',
        radius: 8,
        title: 'Livesitter — RTSP Video Overlay System',
        description: 'Full-stack RTSP livestream overlay application with draggable/resizable overlays rendered in real-time.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'FFmpeg', 'HLS.js'],
        link: 'https://livesitter-woad.vercel.app/',
        image: '/projects/livesitter.png',
        github: 'https://github.com/adnan275/livesitter',
        details: {
            problem: 'Superimposing dynamic text and graphical overlays on live RTSP camera feeds usually requires proprietary broadcast software.',
            solution: 'Developed a browser-based livestream editor allowing users to place draggable overlays onto live streams powered by FFmpeg and HLS.js.',
            features: [
                'Interactive draggable & resizable overlay positioning canvas',
                'Real-time backend stream processing with FFmpeg transcoding',
                'Persistent overlay placement schema stored in MongoDB',
                'Low-latency HLS video player integration'
            ],
            techStack: ['React', 'Node.js', 'FFmpeg', 'HLS.js', 'MongoDB', 'Express']
        }
    },
    {
        id: 'qr',
        label: 'QR Scanner',
        category: 'project',
        color: '#6ee7b7',
        radius: 8,
        title: 'QR Scanner & Generator',
        description: 'Utility tool to scan and generate QR codes instantly with camera integration.',
        tags: ['JavaScript', 'API', 'Tool', 'HTML', 'CSS'],
        link: 'https://qr-scanner-ten-tawny.vercel.app/',
        image: '/projects/qr-new.png',
        github: 'https://github.com/adnan275/qr-scanner',
        details: {
            problem: 'Finding a clean, ad-free tool to quickly generate or scan QR codes.',
            solution: 'Built a lightweight utility using the QR Code API for generation and browser scanning.',
            features: ['Instant QR generation', 'Camera-based scanning', 'Clean interface'],
            techStack: ['JavaScript', 'QR API', 'HTML5', 'CSS3']
        }
    },
    {
        id: 'password',
        label: 'Password Checker',
        category: 'project',
        color: '#6ee7b7',
        radius: 8,
        title: 'Password Strength Checker',
        description: 'Real-time password validation utility for security awareness and entropy measurement.',
        tags: ['JavaScript', 'RegEx', 'HTML', 'CSS'],
        link: 'https://password-strength-checker-psi-one.vercel.app/',
        image: '/projects/password.png',
        github: 'https://github.com/adnan275/password-strength-checker',
        details: {
            problem: 'Lack of immediate feedback on password vulnerability.',
            solution: 'Real-time validation tool checking passwords against complexity rules as user types.',
            features: ['Real-time entropy calculation', 'Visual strength indicator', 'Zero-data storage'],
            techStack: ['JavaScript', 'RegEx', 'HTML5', 'CSS3']
        }
    },
    {
        id: 'rps',
        label: 'Stone Paper Scissors',
        category: 'project',
        color: '#6ee7b7',
        radius: 8,
        title: 'Stone Paper Scissors Game',
        description: 'Interactive game with score tracking and responsive state machine UI.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://stone-paper-scissors-blue-pi.vercel.app/',
        image: '/projects/rps-update.png',
        github: 'https://github.com/adnan275/stone-paper-scissors-blue-pi',
        details: {
            problem: 'Creating engaging state-managed games in vanilla JS.',
            solution: 'Implemented a clean state machine in vanilla JS to handle rounds and scores.',
            features: ['Score persistence', 'Interactive animations', 'AI opponent'],
            techStack: ['JavaScript', 'HTML5', 'CSS3']
        }
    }
];

const initialLinks = [
    { source: 'adnan', target: 'ai' },
    { source: 'adnan', target: 'fullstack' },
    { source: 'adnan', target: 'data' },
    { source: 'adnan', target: 'projects' },

    { source: 'ai', target: 'sentinel' },
    { source: 'ai', target: 'neurax' },
    { source: 'ai', target: 'ev_agent' },

    { source: 'fullstack', target: 'presento' },
    { source: 'fullstack', target: 'gigflow' },
    { source: 'fullstack', target: 'zync' },
    { source: 'fullstack', target: 'taskly' },
    { source: 'fullstack', target: 'capstone' },

    { source: 'data', target: 'bi_portfolio' },
    { source: 'data', target: 'socratic' },

    { source: 'projects', target: 'livesitter' },
    { source: 'projects', target: 'qr' },
    { source: 'projects', target: 'password' },
    { source: 'projects', target: 'rps' },

    // Cross Mesh Connections
    { source: 'sentinel', target: 'neurax' },
    { source: 'presento', target: 'zync' },
    { source: 'ev_agent', target: 'bi_portfolio' },
    { source: 'taskly', target: 'gigflow' },
    { source: 'qr', target: 'livesitter' }
];

const NeuralGraph = () => {
    const canvasRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;

        const nodes = initialNodes.map((n) => {
            const coordMap = {
                adnan: { x: 0.50, y: 0.50 },

                // Pillars (Inner Core Ring)
                ai: { x: 0.33, y: 0.38 },
                fullstack: { x: 0.67, y: 0.38 },
                data: { x: 0.33, y: 0.62 },
                projects: { x: 0.67, y: 0.62 },

                // AI Sub-nodes (Top-Left Quadrant)
                sentinel: { x: 0.12, y: 0.32 },
                neurax: { x: 0.28, y: 0.20 },
                ev_agent: { x: 0.15, y: 0.48 },

                // Full-Stack Sub-nodes (Top-Right Quadrant - Clear of right border)
                presento: { x: 0.86, y: 0.32 },
                gigflow: { x: 0.68, y: 0.18 },
                zync: { x: 0.83, y: 0.48 },
                taskly: { x: 0.72, y: 0.30 },
                capstone: { x: 0.89, y: 0.44 },

                // Data Sub-nodes (Bottom-Left Quadrant)
                bi_portfolio: { x: 0.15, y: 0.76 },
                socratic: { x: 0.36, y: 0.86 },

                // Production Sub-nodes (Bottom-Right Quadrant - Clear of right border)
                livesitter: { x: 0.82, y: 0.72 },
                qr: { x: 0.88, y: 0.80 },
                password: { x: 0.74, y: 0.88 },
                rps: { x: 0.85, y: 0.92 }
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
                angle: Math.random() * Math.PI * 2,
                speed: 0.0015 + Math.random() * 0.0015
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
                    const dx = mouseX - node.x;
                    const dy = mouseY - node.y;
                    if (Math.sqrt(dx * dx + dy * dy) < node.radius + 12) {
                        found = node;
                        break;
                    }
                }
                hoveredId = found ? found.id : null;
                const isClickable = found && found.category === 'project';
                canvas.style.cursor = isClickable ? 'pointer' : 'default';
            }
        };

        const handleMouseDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseDownPos = { x: e.clientX, y: e.clientY };

            for (const node of nodes) {
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                if (Math.sqrt(dx * dx + dy * dy) < node.radius + 12) {
                    draggedNode = node;
                    break;
                }
            }
        };

        const handleMouseUp = (e) => {
            const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);

            // If mouse released with minimal drag distance, count as a Node Click!
            if (dist < 6) {
                const rect = canvas.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                for (const node of nodes) {
                    const dx = clickX - node.x;
                    const dy = clickY - node.y;
                    if (Math.sqrt(dx * dx + dy * dy) < node.radius + 14) {
                        // Strictly only open modal for actual projects (category === 'project')
                        if (node.category === 'project') {
                            setSelectedProject(node);
                            setIsModalOpen(true);
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
            time += 0.01;
            ctx.clearRect(0, 0, width, height);

            nodes.forEach((node) => {
                if (node !== draggedNode) {
                    node.angle += node.speed;
                    node.x = node.baseX + Math.sin(node.angle * 1.2) * 6;
                    node.y = node.baseY + Math.cos(node.angle * 1.6) * 6;
                }
            });

            // Calculate full network branch path for hovered/selected node
            const activeLinkIndices = new Set();
            if (hoveredId) {
                initialLinks.forEach((link, idx) => {
                    if (link.source === hoveredId || link.target === hoveredId) {
                        activeLinkIndices.add(idx);
                        const otherId = link.source === hoveredId ? link.target : link.source;

                        // Connect parent pillar back to adnan central core
                        initialLinks.forEach((pLink, pIdx) => {
                            if (
                                (pLink.source === 'adnan' && pLink.target === otherId) ||
                                (pLink.target === 'adnan' && pLink.source === otherId)
                            ) {
                                activeLinkIndices.add(pIdx);
                            }
                        });
                    }
                });
            }

            initialLinks.forEach((link, idx) => {
                const s = nodes.find(n => n.id === link.source);
                const t = nodes.find(n => n.id === link.target);
                if (!s || !t) return;

                const isCoreLink = s.id === 'adnan' || t.id === 'adnan';
                const isHoveredPath = activeLinkIndices.has(idx);
                const isLinkActive = isCoreLink || isHoveredPath;

                const activeColor = isHoveredPath ? (s.color === '#ffffff' ? t.color : s.color) : s.color;

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(t.x, t.y);

                if (isHoveredPath) {
                    ctx.strokeStyle = activeColor;
                    ctx.lineWidth = 2.8;
                    ctx.shadowColor = activeColor;
                    ctx.shadowBlur = 18;
                } else if (isCoreLink) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
                    ctx.lineWidth = 1.5;
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 8;
                } else {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
                    ctx.lineWidth = 1;
                    ctx.shadowBlur = 0;
                }
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Glowing Action Potential Impulse Signal along Active Path
                if (isLinkActive) {
                    const speedMultiplier = isHoveredPath ? 0.35 : 0.22;
                    const progress = (time * speedMultiplier + (s.x % 7)) % 1;
                    const px = s.x + (t.x - s.x) * progress;
                    const py = s.y + (t.y - s.y) * progress;

                    const tailLength = 0.18;
                    const tailProgress = Math.max(0, progress - tailLength);
                    const tx = s.x + (t.x - s.x) * tailProgress;
                    const ty = s.y + (t.y - s.y) * tailProgress;

                    const grad = ctx.createLinearGradient(tx, ty, px, py);
                    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
                    grad.addColorStop(1, isHoveredPath ? activeColor : (s.color || '#ffffff'));

                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.lineTo(px, py);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = isHoveredPath ? 4.2 : 2.5;
                    ctx.stroke();

                    // Glowing Neuron Impulse Head
                    ctx.beginPath();
                    ctx.arc(px, py, isHoveredPath ? 4.5 : 3, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = isHoveredPath ? activeColor : (s.color || '#ffffff');
                    ctx.shadowBlur = isHoveredPath ? 20 : 14;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            nodes.forEach((node) => {
                const isHovered = node.id === hoveredId;
                const isCore = node.id === 'adnan';

                // Continuous Pulsing White Halo Ring for Central Node
                if (isCore) {
                    const pulseRadius = node.radius + 10 + Math.sin(time * 3) * 4;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 1.8;
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 18;
                    ctx.globalAlpha = 0.75;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                    ctx.shadowBlur = 0;
                } else if (node.category === 'pillar' || isHovered) {
                    // Outer Concentric Ring for Pillars & Hovered Nodes
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.radius + (isHovered ? 14 : 10), 0, Math.PI * 2);
                    ctx.strokeStyle = node.color;
                    ctx.lineWidth = isHovered ? 2 : 1;
                    ctx.globalAlpha = isHovered ? 0.8 : 0.35;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                // Inner Glowing Circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius / (isCore ? 1.5 : 1.8), 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.shadowColor = node.color;
                ctx.shadowBlur = isCore ? 20 : (isHovered ? 24 : 8);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Clean Monospace Text Label (Responsive font scaling)
                const fontSize = width < 520 ? 9.5 : 11;
                ctx.font = `${isHovered || isCore ? '700' : '600'} ${fontSize}px 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                const labelY = node.y + node.radius + 6;

                // Subtle text shadow for crisp legibility
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 8;
                ctx.fillStyle = isHovered || isCore ? '#ffffff' : 'rgba(235, 240, 255, 0.85)';
                ctx.fillText(node.label, node.x, labelY);
                ctx.shadowBlur = 0;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="neural-graph" className="section-padding neural-graph-section">
            <div className="container">
                <motion.div
                    className="neural-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="heading-lg">Interactive Project Architecture</h2>
                    <p className="neural-subtitle">
                        Neural topology mapping AI/ML models, agentic workflows, and full-stack systems. Click any node to explore case studies & live demos.
                    </p>
                </motion.div>

                <div className="graph-container glass-panel">
                    {/* Top Left Meta Tag (High-Tech Systems Architecture Label) */}
                    <div className="graph-system-meta">
                        System Architecture: AGENTIC_NEURAL_TOPOLOGY_V2 // CS_AIML
                    </div>

                    {/* Top Right Legend Box (All 4 CS & Engineering Pillars) */}
                    <div className="graph-legend-card">
                        <div className="legend-item">
                            <span className="legend-dot" style={{ backgroundColor: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }}></span>
                            <span className="legend-label">AI & ML Core</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot" style={{ backgroundColor: '#c084fc', boxShadow: '0 0 8px #c084fc' }}></span>
                            <span className="legend-label">Full-Stack Systems</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot" style={{ backgroundColor: '#fbbf24', boxShadow: '0 0 8px #fbbf24' }}></span>
                            <span className="legend-label">Data & Analytics</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot" style={{ backgroundColor: '#34d399', boxShadow: '0 0 8px #34d399' }}></span>
                            <span className="legend-label">Production Engineering</span>
                        </div>
                    </div>

                    <canvas ref={canvasRef} className="graph-canvas" />
                </div>
            </div>

            <ProjectCaseStudy
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default NeuralGraph;


