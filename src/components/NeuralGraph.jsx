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
        color: '#ff334b',
        radius: 12
    },
    {
        id: 'fullstack',
        label: 'Full-Stack Systems',
        category: 'pillar',
        color: '#38bdf8',
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
        color: '#10b981',
        radius: 12
    },

    // AI Pillar Sub-nodes (Clickable Projects)
    {
        id: 'harmonix',
        domain: 'ai',
        label: 'HarmoniX',
        category: 'project',
        color: '#fb7185',
        radius: 9,
        title: 'HarmoniX — Multimodal Music Emotion Perception & Deep Intelligence',
        description: 'Multimodal Deep Learning system integrating 2D Convolutional Spectroscopy (Mel-Spectrograms) with Late-Fusion Neural Networks and Grad-CAM visual interpretability to decode audio emotional valence & arousal without human listening.',
        tags: ['PyTorch', 'Deep Learning', 'Audio Spectroscopy', 'Librosa', 'Grad-CAM', 'Late Fusion', 'Streamlit'],
        link: 'https://harmonix-studio.streamlit.app/',
        image: '/projects/harmonix.png',
        github: 'https://github.com/adnan275/HarmoniX',
        details: {
            problem: 'How can an autonomous AI model accurately predict human emotional response to music without human listening? Traditional evaluation requires subjective human listening, while raw 1D sound waveforms are noisy and unstructured. The solution decomposes continuous audio waves into 128-band 2D Mel-Spectrograms (frequency-time representations) and acoustic physics features (MFCCs, spectral contrast, chroma) so convolutional vision networks can "see" and predict musical valence and arousal objectively.',
            solution: 'Engineered HarmoniX: converts raw acoustic signals into 128-band Mel-Spectrograms processed by 2D CNN vision backbones, fused with acoustic physics latents via Late-Fusion networks. Integrated layer-wise Signed Grad-CAM heatmaps that visually pinpoint the exact frequency-time segments that trigger emotional valence and arousal shifts, achieving SOTA test R² = 0.527 on the PMEmo dataset.',
            features: [
                'Predicts audio emotion without listening by decomposing waveforms into 128-band 2D Mel-Spectrograms',
                'Dual-branch multimodal architecture: 2D Spectrogram CNN + Dense Acoustic Physics Feature Extractor',
                'Explainable AI: Layer-wise Signed Grad-CAM heatmaps pinpointing affective frequency bands in real time',
                'Continuous 2D Valence-Arousal plane emotion mapping with sub-second inference on Streamlit Cloud'
            ],
            techStack: ['PyTorch', 'Librosa', 'NumPy', 'Streamlit', 'SoundFile', 'SciPy', 'Matplotlib', 'Grad-CAM']
        }
    },
    {
        id: 'affinix',
        domain: 'ai',
        label: 'Affinix AI',
        category: 'project',
        color: '#fb7185',
        radius: 8,
        title: 'Affinix — Autonomous AI Career & Job Matching Platform',
        description: 'Autonomous multi-hop agent platform for job-resume matching featuring episodic memory, hybrid search (Okapi BM25 + Dense Vectors with Reciprocal Rank Fusion), and automated applicant ranking.',
        tags: ['Python', 'FastAPI', 'LangGraph', 'Hybrid Search', 'Reciprocal Rank Fusion', 'ChromaDB', 'Next.js'],
        link: 'https://affinix-n89g.onrender.com',
        image: '/projects/affinix.png',
        github: 'https://github.com/adnan275/Affinix',
        details: {
            problem: 'Traditional applicant tracking systems (ATS) rely on naive keyword matching, discarding qualified candidates due to lexical phrasing differences while recruiters spend hours on manual screening.',
            solution: 'Developed Affinix, an autonomous multi-hop agentic engine that combines Okapi BM25 sparse keyword scoring with dense 768D embeddings using Reciprocal Rank Fusion (RRF) and an episodic memory graph to match talent accurately.',
            features: [
                'Multi-hop agent workflow evaluating technical competencies, seniority fit, and compensation bands',
                'Hybrid retrieval combining Okapi BM25 and dense semantic embeddings via Reciprocal Rank Fusion (RRF)',
                'Episodic memory graph storing applicant history and hiring feedback loops',
                'High-throughput asynchronous REST API built with FastAPI and containerized on Render'
            ],
            techStack: ['Python', 'FastAPI', 'LangGraph', 'ChromaDB', 'NumPy', 'Docker', 'Uvicorn', 'Render']
        }
    },
    {
        id: 'sentinel',
        domain: 'ai',
        label: 'Sentinel AI',
        category: 'project',
        color: '#fb7185',
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
        color: '#fb7185',
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
        color: '#fb7185',
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
        color: '#7dd3fc',
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
        color: '#7dd3fc',
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
        color: '#7dd3fc',
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
        id: 'cloudpulse',
        domain: 'fullstack',
        label: 'CloudPulse',
        category: 'project',
        color: '#7dd3fc',
        radius: 8,
        title: 'CloudPulse — Private Network Service Platform & Infrastructure Telemetry',
        description: 'Distributed enterprise network service platform simulating multi-machine cloud infrastructure with private DNS, edge reverse proxying, TLS 1.3 termination, round-robin load balancing, and packet telemetry.',
        tags: ['JavaScript', 'Node.js', 'Nginx', 'TLS 1.3', 'TCP/IP', 'Wireshark', 'dnsmasq', 'Render'],
        link: 'https://cloudpulse-hba3.onrender.com/',
        image: '/projects/cloudpulse.png',
        github: 'https://github.com/adnan275/CloudPulse',
        details: {
            problem: 'Directly exposing backend servers wastes CPU on redundant TLS handshakes, hardcoded IPs break scalability without private DNS, traffic clogs single instances without load balancing, and missing cache validation wastes network bandwidth.',
            solution: 'Engineered CloudPulse across a physical 3-machine LAN: configured private DNS (dnsmasq on UDP 53), deployed an Nginx edge proxy terminating TLS 1.3, implemented round-robin load balancing across decoupled Node.js nodes, and enabled HTTP 304 caching—all verified packet-by-packet via Wireshark.',
            features: [
                'Private DNS Resolution: dnsmasq on UDP 53 resolving local domains to the gateway',
                'Edge Reverse Proxy: Nginx terminating TLS 1.3, offloading crypto compute from backends',
                'Round-Robin Balancing: Evenly distributes requests across Node.js compute instances',
                'HTTP 304 Caching: Eliminates bandwidth waste using ETag & Last-Modified validation',
                'Wireshark Verified: Packet-level capture of DNS, TCP 3-way handshakes, and TLS exchanges',
                'Live NOC Terminal: Interactive telemetry dashboard deployed on Render'
            ],
            techStack: ['JavaScript', 'Node.js', 'Express', 'Nginx', 'TLS 1.3', 'TCP/IP', 'dnsmasq', 'Wireshark', 'Render']
        }
    },

    // Data Pillar Sub-nodes (Clickable Projects)
    {
        id: 'bi_portfolio',
        label: 'BI Portfolio',
        category: 'project',
        color: '#fde047',
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
        color: '#fde047',
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
        id: 'tensorax',
        domain: 'projects',
        label: 'TensoraX',
        category: 'project',
        color: '#6ee7b7',
        radius: 9,
        title: 'TensoraX — 2D Mesh Systolic Array Matrix Multiplication Accelerator',
        description: 'Cycle-accurate 2D mesh systolic array GEMM hardware accelerator modeled in Verilog HDL for deep learning tensor operations, featuring parameterized processing elements and testbench verification.',
        tags: ['Verilog HDL', 'Computer Architecture', 'Systolic Array', 'GEMM Acceleration', 'Digital Logic', 'GTKWave', 'FPGA'],
        link: 'https://github.com/adnan275/TensoraX',
        image: '/projects/tensorax.png',
        github: 'https://github.com/adnan275/TensoraX',
        details: {
            problem: 'Dense matrix multiplication (GEMM) is the fundamental computational bottleneck of modern deep neural network inference. On standard CPUs and GPUs, repeatedly fetching matrix operands from off-chip DRAM creates severe memory bandwidth saturation and excessive energy dissipation. The challenge is designing hardware that streams matrix data rhythmically across processing elements without repeated DRAM read/write cycles.',
            solution: 'Architected TensoraX in Verilog HDL—a parameterized 2D mesh systolic array hardware accelerator where Processing Elements (PEs) pass activations and weights horizontally and vertically across an N×N spatial grid, maximizing local data reuse, eliminating buffer stalls, and achieving O(N) DRAM memory traffic reduction.',
            features: [
                'Parameterized N×N systolic array mesh with multiply-accumulate (MAC) processing elements',
                'Synchronous pipelined dataflow minimizing global memory read/write cycles to O(N)',
                'Cycle-accurate verification against NumPy golden matrix models using Icarus Verilog & GTKWave waveforms',
                'Synthesizable RTL design ready for open-source EDA toolchains (Yosys) and FPGA deployment'
            ],
            techStack: ['Verilog HDL', 'GTKWave', 'Icarus Verilog', 'Digital Logic', 'Computer Architecture', 'RTL Synthesis']
        }
    },
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
    }
];

const initialLinks = [
    { source: 'adnan', target: 'ai' },
    { source: 'adnan', target: 'fullstack' },
    { source: 'adnan', target: 'data' },
    { source: 'adnan', target: 'projects' },

    { source: 'ai', target: 'harmonix' },
    { source: 'ai', target: 'affinix' },
    { source: 'ai', target: 'sentinel' },
    { source: 'ai', target: 'neurax' },
    { source: 'ai', target: 'ev_agent' },

    { source: 'fullstack', target: 'presento' },
    { source: 'fullstack', target: 'gigflow' },
    { source: 'fullstack', target: 'zync' },
    { source: 'fullstack', target: 'cloudpulse' },

    { source: 'data', target: 'bi_portfolio' },
    { source: 'data', target: 'socratic' },

    { source: 'projects', target: 'tensorax' },
    { source: 'projects', target: 'livesitter' }
];

const nodeDomainMap = {
    harmonix: 'ai',
    affinix: 'ai',
    sentinel: 'ai',
    neurax: 'ai',
    ev_agent: 'ai',
    presento: 'fullstack',
    gigflow: 'fullstack',
    zync: 'fullstack',
    cloudpulse: 'fullstack',
    bi_portfolio: 'data',
    socratic: 'data',
    tensorax: 'projects',
    livesitter: 'projects'
};

const domainMeta = {
    all: { label: 'ALL DOMAINS', color: '#ffffff', count: 13 },
    ai: { label: 'AI & ML CORE', color: '#00f0ff', count: 5 },
    fullstack: { label: 'FULL-STACK SYSTEMS', color: '#c084fc', count: 4 },
    data: { label: 'DATA & ANALYTICS', color: '#fbbf24', count: 2 },
    projects: { label: 'PRODUCTION ENGINEERING', color: '#34d399', count: 2 }
};

const NeuralGraph = () => {
    const canvasRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeDomain, setActiveDomain] = useState('all');
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
        let animationFrameId;

        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
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
                harmonix: { x: 0.18, y: 0.18 },
                neurax: { x: 0.32, y: 0.18 },
                sentinel: { x: 0.11, y: 0.32 },
                affinix: { x: 0.12, y: 0.44 },
                ev_agent: { x: 0.20, y: 0.52 },

                // Full-Stack Sub-nodes (Top-Right Quadrant - Clear of right border)
                gigflow: { x: 0.68, y: 0.18 },
                cloudpulse: { x: 0.84, y: 0.20 },
                presento: { x: 0.86, y: 0.34 },
                zync: { x: 0.82, y: 0.48 },

                // Data Sub-nodes (Bottom-Left Quadrant)
                bi_portfolio: { x: 0.15, y: 0.76 },
                socratic: { x: 0.36, y: 0.86 },

                // Production Sub-nodes (Bottom-Right Quadrant - Clear of right border)
                tensorax: { x: 0.65, y: 0.82 },
                livesitter: { x: 0.82, y: 0.76 }
            };

            const target = coordMap[n.id] || { x: 0.5, y: 0.5 };
            let tx = target.x;
            // On narrower screens, compress X slightly towards center to avoid edge text clipping
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
                    if (node.opacity < 0.2) continue; // Skip collapsed nodes
                    const dx = mouseX - node.x;
                    const dy = mouseY - node.y;
                    if (Math.sqrt(dx * dx + dy * dy) < node.radius + 14) {
                        found = node;
                        break;
                    }
                }
                hoveredId = found ? found.id : null;
                const isClickable = found && (found.category === 'project' || found.category === 'pillar' || found.id === 'adnan');
                canvas.style.cursor = isClickable ? 'pointer' : 'default';
            }
        };

        const handleMouseDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseDownPos = { x: e.clientX, y: e.clientY };

            for (const node of nodes) {
                if (node.opacity < 0.2) continue;
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                if (Math.sqrt(dx * dx + dy * dy) < node.radius + 14) {
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
                    if (node.opacity < 0.2) continue;
                    const dx = clickX - node.x;
                    const dy = clickY - node.y;
                    if (Math.sqrt(dx * dx + dy * dy) < node.radius + 14) {
                        if (node.category === 'project') {
                            setSelectedProject(node);
                            setIsModalOpen(true);
                        } else if (node.category === 'pillar') {
                            // Toggle domain on pillar click
                            const next = activeDomainRef.current === node.id ? 'all' : node.id;
                            setActiveDomain(next);
                            activeDomainRef.current = next;
                        } else if (node.id === 'adnan') {
                            // Reset to all on center click
                            setActiveDomain('all');
                            activeDomainRef.current = 'all';
                        }
                        break;
                    }
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
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        let time = 0;

        const render = () => {
            time += 0.01;
            ctx.clearRect(0, 0, width, height);

            const curDomain = activeDomainRef.current;

            // Update node visibility, opacity & physics positions
            nodes.forEach((node) => {
                const isDomainMatch = curDomain === 'all' || 
                                      node.id === 'adnan' || 
                                      node.category === 'pillar' || 
                                      nodeDomainMap[node.id] === curDomain;

                const targetOpacity = isDomainMatch ? 1 : 0;
                const targetScale = isDomainMatch ? 1 : 0.1;
                node.opacity += (targetOpacity - node.opacity) * 0.16;
                node.scale += (targetScale - node.scale) * 0.16;

                if (node !== draggedNode) {
                    node.angle += node.speed;
                    const r = node.radius * Math.max(0.1, node.scale);
                    const safeMargin = r + 12;
                    const rawX = node.baseX + Math.sin(node.angle * 1.2) * 6;
                    const rawY = node.baseY + Math.cos(node.angle * 1.6) * 6;
                    node.x = Math.max(safeMargin, Math.min(width - safeMargin, rawX));
                    node.y = Math.max(safeMargin, Math.min(height - safeMargin - 15, rawY));
                }
            });

            // Calculate active links
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

            // Draw Links
            initialLinks.forEach((link, idx) => {
                const s = nodes.find(n => n.id === link.source);
                const t = nodes.find(n => n.id === link.target);
                if (!s || !t) return;

                const linkOpacity = Math.min(s.opacity, t.opacity);
                if (linkOpacity < 0.04) return;

                const isCoreLink = s.id === 'adnan' || t.id === 'adnan';
                const isDomainBranch = curDomain !== 'all' && (s.id === curDomain || t.id === curDomain);
                const isHoveredPath = activeLinkIndices.has(idx);
                const isLinkActive = isCoreLink || isDomainBranch || isHoveredPath;

                const activeColor = isHoveredPath ? (s.color === '#ffffff' ? t.color : s.color) : (isDomainBranch ? (t.color || s.color) : s.color);

                ctx.save();
                ctx.globalAlpha = linkOpacity;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(t.x, t.y);

                if (isHoveredPath || isDomainBranch) {
                    ctx.strokeStyle = activeColor;
                    ctx.lineWidth = 2.6;
                    ctx.shadowColor = activeColor;
                    ctx.shadowBlur = 16;
                } else if (isCoreLink) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
                    ctx.lineWidth = 1.6;
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 8;
                } else {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
                    ctx.lineWidth = 1;
                    ctx.shadowBlur = 0;
                }
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Glowing Action Potential Impulse Signal
                if (isLinkActive && linkOpacity > 0.4) {
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
                    grad.addColorStop(1, (isHoveredPath || isDomainBranch) ? activeColor : (s.color || '#ffffff'));

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
                    ctx.shadowColor = (isHoveredPath || isDomainBranch) ? activeColor : (s.color || '#ffffff');
                    ctx.shadowBlur = isHoveredPath ? 20 : 14;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
                ctx.restore();
            });

            // Draw Nodes
            nodes.forEach((node) => {
                if (node.opacity < 0.05) return;

                ctx.save();
                ctx.globalAlpha = node.opacity;

                const isHovered = node.id === hoveredId;
                const isCore = node.id === 'adnan';
                const isPillar = node.category === 'pillar';
                const isSelectedDomain = curDomain === node.id;
                const r = node.radius * Math.max(0.1, node.scale);

                // Continuous Pulsing White Halo Ring for Central Node
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
                    // Outer Concentric Ring for Pillars
                    const ringRadius = r + (isSelectedDomain ? (14 + Math.sin(time * 4) * 3) : (isHovered ? 12 : 8));
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
                    ctx.arc(node.x, node.y, r + 10, 0, Math.PI * 2);
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

                // Clean Monospace Text Label (Responsive font scaling & boundary clamp)
                const isSmallPhone = width < 420;
                const isTablet = width < 560;
                const fontSize = isSmallPhone ? 7.2 : (isTablet ? 8.2 : 10.2);
                ctx.font = `${isHovered || isCore || isSelectedDomain ? '700' : '600'} ${fontSize}px 'Fira Code', 'JetBrains Mono', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                const labelText = isSelectedDomain ? `${node.label} [ACTIVE]` : node.label;
                const textWidth = ctx.measureText(labelText).width;
                const halfTextWidth = textWidth / 2;
                const sidePad = 10;
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
                animationFrameId = requestAnimationFrame(render);
            }
        };

        let isVisible = true;
        const observer = new IntersectionObserver(([entry]) => {
            const nextVisible = entry.isIntersecting;
            if (nextVisible && !isVisible) {
                isVisible = true;
                cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(render);
            } else if (!nextVisible && isVisible) {
                isVisible = false;
                cancelAnimationFrame(animationFrameId);
            }
        }, { threshold: 0.05 });

        observer.observe(canvas);

        render();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="work" className="section-padding neural-graph-section">
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
                        Curated Systems
                    </span>
                    <h2 className="heading-lg">System Architecture & Projects</h2>
                    <p className="neural-subtitle">
                        Select production systems and deep learning architectures—curated strictly for engineering depth. Click any node to explore case studies.
                    </p>
                </motion.div>

                {/* Horizontal Domain Filter Toolbar (Above Canvas - Zero Node Overlap) */}
                <div className="skills-filter-toolbar">
                    <button
                        className={`filter-chip ${activeDomain === 'all' ? 'active' : ''}`}
                        onClick={() => handleDomainToggle('all')}
                        style={{ '--chip-color': '#ffffff' }}
                    >
                        <span className="chip-dot" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
                        <span className="chip-text">All Domains</span>
                        <span className="chip-count">{domainMeta.all.count}</span>
                    </button>
                    <button
                        className={`filter-chip ${activeDomain === 'ai' ? 'active' : ''}`}
                        onClick={() => handleDomainToggle('ai')}
                        style={{ '--chip-color': '#ff334b' }}
                    >
                        <span className="chip-dot" style={{ backgroundColor: '#ff334b', boxShadow: '0 0 8px #ff334b' }}></span>
                        <span className="chip-text">AI & ML Core</span>
                        <span className="chip-count">{domainMeta.ai.count}</span>
                    </button>
                    <button
                        className={`filter-chip ${activeDomain === 'fullstack' ? 'active' : ''}`}
                        onClick={() => handleDomainToggle('fullstack')}
                        style={{ '--chip-color': '#38bdf8' }}
                    >
                        <span className="chip-dot" style={{ backgroundColor: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }}></span>
                        <span className="chip-text">Full-Stack</span>
                        <span className="chip-count">{domainMeta.fullstack.count}</span>
                    </button>
                    <button
                        className={`filter-chip ${activeDomain === 'data' ? 'active' : ''}`}
                        onClick={() => handleDomainToggle('data')}
                        style={{ '--chip-color': '#fbbf24' }}
                    >
                        <span className="chip-dot" style={{ backgroundColor: '#fbbf24', boxShadow: '0 0 8px #fbbf24' }}></span>
                        <span className="chip-text">Data & Analytics</span>
                        <span className="chip-count">{domainMeta.data.count}</span>
                    </button>
                    <button
                        className={`filter-chip ${activeDomain === 'projects' ? 'active' : ''}`}
                        onClick={() => handleDomainToggle('projects')}
                        style={{ '--chip-color': '#10b981' }}
                    >
                        <span className="chip-dot" style={{ backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                        <span className="chip-text">Production Eng</span>
                        <span className="chip-count">{domainMeta.projects.count}</span>
                    </button>
                </div>

                <div className="graph-container glass-panel">
                    {/* Top Left Meta Tag (Dynamic Active Domain Indicator) */}
                    <div className="graph-system-meta">
                        <span className="meta-prefix">System Architecture:</span>
                        <span className="meta-code"> AGENTIC_NEURAL_TOPOLOGY_V2 // {domainMeta[activeDomain]?.label || 'CORE'}</span>
                        <span className="meta-instruction"> — Click domain pillars or buttons to filter</span>
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


