import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Skills.css';

const skillCategories = [
    {
        id: 'featured',
        name: 'Featured Core',
        icon: '⚡',
        color: '#00f0ff'
    },
    {
        id: 'aiml',
        name: 'Agentic AI & LLMs',
        icon: '🤖',
        color: '#00f0ff'
    },
    {
        id: 'deeplearning',
        name: 'Deep Learning',
        icon: '🧠',
        color: '#ec4899'
    },
    {
        id: 'advml',
        name: 'Advanced ML',
        icon: '🔬',
        color: '#14b8a6'
    },
    {
        id: 'comparch',
        name: 'Silicon & Arch',
        icon: '🖥️',
        color: '#f97316'
    },
    {
        id: 'networking',
        name: 'Cloud & Networks',
        icon: '🌐',
        color: '#38bdf8'
    },
    {
        id: 'fullstack',
        name: 'Full-Stack Web',
        icon: '💻',
        color: '#c084fc'
    },
    {
        id: 'tools',
        name: 'System Design',
        icon: '🏗️',
        color: '#34d399'
    }
];

const allSkillsData = [
    // --- Agentic AI & LLMs ---
    {
        name: 'LangGraph',
        category: 'aiml',
        color: '#00f0ff',
        tag: 'MULTI-AGENT',
        icon: 'https://img.icons8.com/color/48/000000/graph.png',
        desc: 'Stateful multi-agent cyclic graphs, memory persistence & human-in-the-loop workflows.',
        spec: 'LangGraph v0.2+',
        level: 96,
        isFeatured: true
    },
    {
        name: 'LangChain & RAG',
        category: 'aiml',
        color: '#00f0ff',
        tag: 'RAG PIPELINE',
        icon: 'https://cdn.simpleicons.org/langchain/1C3C3C',
        desc: 'Semantic retrieval architectures, dense embeddings, document chunking & vector search.',
        spec: 'LangChain Ecosystem',
        level: 94,
        isFeatured: true
    },
    {
        name: 'Groq LPU Engine',
        category: 'aiml',
        color: '#00f0ff',
        tag: 'INFERENCE',
        icon: 'https://console.groq.com/powered-by-groq-dark.svg',
        desc: 'Ultra-low latency LLM acceleration for real-time autonomous reasoning loops.',
        spec: 'Sub-50ms TTFT',
        level: 92,
        isFeatured: false
    },
    {
        name: 'Hugging Face',
        category: 'aiml',
        color: '#00f0ff',
        tag: 'FOUNDATION',
        icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
        desc: 'Model hub deployments, custom tokenizers, Spaces hosting & open-source LLM integration.',
        spec: 'Transformers Hub',
        level: 90,
        isFeatured: false
    },
    {
        name: 'Python Systems',
        category: 'aiml',
        color: '#00f0ff',
        tag: 'CORE ENGINE',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        desc: 'Asynchronous FastAPI microservices, numerical vector pipelines & agent backends.',
        spec: 'Python 3.12+',
        level: 98,
        isFeatured: true
    },

    // --- Deep Learning & Neural Systems ---
    {
        name: 'PyTorch',
        category: 'deeplearning',
        color: '#ec4899',
        tag: 'AUTOGRAD',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
        desc: 'Custom neural layers, dynamic computational graphs, loss engineering & CUDA backprop.',
        spec: 'PyTorch 2.x',
        level: 95,
        isFeatured: true
    },
    {
        name: 'Transformers & Attention',
        category: 'deeplearning',
        color: '#ec4899',
        tag: 'ATTENTION',
        icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
        desc: 'Scaled dot-product multi-head attention, positional encodings & Vision Transformers.',
        spec: 'Self-Attention',
        level: 92,
        isFeatured: true
    },
    {
        name: 'Mamba (State-Space)',
        category: 'deeplearning',
        color: '#ec4899',
        tag: 'LINEAR TIME',
        icon: 'https://cdn-icons-png.flaticon.com/512/8644/8644474.png',
        desc: 'Selective parameter State-Space Models for linear-time complexity over long contexts.',
        spec: 'S4 / Mamba-2',
        level: 88,
        isFeatured: false
    },
    {
        name: 'Diffusion (DDPM)',
        category: 'deeplearning',
        color: '#ec4899',
        tag: 'GENERATIVE',
        icon: 'https://cdn-icons-png.flaticon.com/512/9991/9991874.png',
        desc: 'Forward Markov noise schedules, reverse denoising diffusion & U-Net architectures.',
        spec: 'DDPM / DDIM',
        level: 86,
        isFeatured: false
    },
    {
        name: 'Multimodal AI (CLIP)',
        category: 'deeplearning',
        color: '#ec4899',
        tag: 'CROSS-MODAL',
        icon: 'https://cdn-icons-png.flaticon.com/512/12222/12222560.png',
        desc: 'Joint vision-language representations and contrastive pre-training embeddings.',
        spec: 'CLIP / ViT',
        level: 88,
        isFeatured: false
    },
    {
        name: 'QLoRA & Quantization',
        category: 'deeplearning',
        color: '#ec4899',
        tag: 'EFFICIENCY',
        icon: 'https://cdn-icons-png.flaticon.com/512/9581/9581977.png',
        desc: 'INT4 NormalFloat parameter-efficient fine-tuning, Low-Rank Adaptation & memory optimization.',
        spec: 'BitsAndBytes',
        level: 90,
        isFeatured: true
    },

    // --- Advanced Machine Learning & Math ---
    {
        name: 'NumPy ML (From Scratch)',
        category: 'advml',
        color: '#14b8a6',
        tag: 'FIRST PRINCIPLES',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
        desc: 'Pure mathematical derivations of OLS, Logistic Regression, MLE & Decision Trees.',
        spec: 'Linear Algebra',
        level: 96,
        isFeatured: true
    },
    {
        name: 'Time Series & ARIMA',
        category: 'advml',
        color: '#14b8a6',
        tag: 'FORECASTING',
        icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920349.png',
        desc: 'Stationarity transformation, ACF/PACF autocorrelation diagnostics & ARIMA forecasting.',
        spec: 'Statsmodels',
        level: 90,
        isFeatured: false
    },
    {
        name: 'Gaussian Mixtures (GMM)',
        category: 'advml',
        color: '#14b8a6',
        tag: 'CLUSTERING',
        icon: 'https://cdn-icons-png.flaticon.com/512/8644/8644474.png',
        desc: 'Soft probabilistic density estimation and clustering via Expectation-Maximization (EM).',
        spec: 'EM Algorithm',
        level: 88,
        isFeatured: false
    },
    {
        name: 'CART Decision Trees',
        category: 'advml',
        color: '#14b8a6',
        tag: 'ENSEMBLES',
        icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png',
        desc: 'Gini impurity, entropy gain calculations, recursive binary splitting & pruning.',
        spec: 'CART / Trees',
        level: 92,
        isFeatured: false
    },
    {
        name: 'Gradient Descent (SGD)',
        category: 'advml',
        color: '#14b8a6',
        tag: 'OPTIMIZATION',
        icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png',
        desc: 'Stochastic gradients, momentum vectors, Adam optimization & convex loss navigation.',
        spec: 'SGD / Adam',
        level: 94,
        isFeatured: false
    },
    {
        name: 'Model Diagnostics (VIF/PCA)',
        category: 'advml',
        color: '#14b8a6',
        tag: 'DIAGNOSTICS',
        icon: 'https://cdn-icons-png.flaticon.com/512/1265/1265757.png',
        desc: 'Multicollinearity mitigation via VIF, eigen-decomposition & PCA dimensionality reduction.',
        spec: 'VIF / SVD',
        level: 92,
        isFeatured: true
    },

    // --- Computer Architecture & Silicon ---
    {
        name: 'Verilog HDL & GTKWave',
        category: 'comparch',
        color: '#f97316',
        tag: 'SILICON DESIGN',
        icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png',
        desc: 'RTL circuit modeling, finite state machines, testbench waveforms & GTKWave inspection.',
        spec: 'IEEE 1364 HDL',
        level: 92,
        isFeatured: true
    },
    {
        name: '5-Stage CPU Pipelining',
        category: 'comparch',
        color: '#f97316',
        tag: 'PROCESSOR',
        icon: 'https://cdn-icons-png.flaticon.com/512/3178/3178283.png',
        desc: 'IF→ID→EX→MEM→WB datapath engineering, data hazard forwarding units & branch handling.',
        spec: 'CPI Optimization',
        level: 94,
        isFeatured: true
    },
    {
        name: 'RISC-V & MIPS32 ISAs',
        category: 'comparch',
        color: '#f97316',
        tag: 'INSTRUCTION SET',
        icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png',
        desc: 'Register file structures, ALU control units, assembly decoding & memory-mapped I/O.',
        spec: 'RV32I Core',
        level: 90,
        isFeatured: false
    },
    {
        name: 'Cache AMAT & Associativity',
        category: 'comparch',
        color: '#f97316',
        tag: 'MEMORY HIERARCHY',
        icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png',
        desc: 'N-way set associativity, LRU replacement, write-through/back & AMAT latency optimization.',
        spec: 'L1/L2/L3 Cache',
        level: 92,
        isFeatured: false
    },
    {
        name: 'Multicore MESI Coherence',
        category: 'comparch',
        color: '#f97316',
        tag: 'COHERENCE',
        icon: 'https://img.icons8.com/color/48/000000/graph.png',
        desc: 'Cache snooping protocols, write-invalidate logic & hardware atomic primitives (CAS).',
        spec: 'MESI Protocol',
        level: 88,
        isFeatured: false
    },
    {
        name: 'GPU SIMT & TPU Arrays',
        category: 'comparch',
        color: '#f97316',
        tag: 'HARDWARE ACCEL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nvidia/nvidia-original.svg',
        desc: 'Warp scheduling, SIMT thread divergence analysis & 2D systolic array matrix engines.',
        spec: 'SIMT / Systolic',
        level: 88,
        isFeatured: true
    },

    // --- Computer Networks & AWS Cloud ---
    {
        name: 'AWS Multi-Tier VPC',
        category: 'networking',
        color: '#38bdf8',
        tag: 'CLOUD ARCH',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        desc: 'Public/private CIDR subnetting, Internet/NAT Gateways, Route Tables & security topology.',
        spec: 'Amazon VPC',
        level: 95,
        isFeatured: true
    },
    {
        name: 'Elastic Load Balancers',
        category: 'networking',
        color: '#38bdf8',
        tag: 'TRAFFIC',
        icon: 'https://cdn-icons-png.flaticon.com/512/1541/1541400.png',
        desc: 'Layer 7 Application Load Balancers (ALB) and Layer 4 NLBs with health-check failover.',
        spec: 'AWS ALB / NLB',
        level: 92,
        isFeatured: true
    },
    {
        name: 'Route 53 & CloudFront',
        category: 'networking',
        color: '#38bdf8',
        tag: 'DNS & CDN',
        icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885449.png',
        desc: 'Latency-based & failover DNS routing, ACM TLS/SSL auto-renewal & global edge caching.',
        spec: 'Global CDN',
        level: 90,
        isFeatured: false
    },
    {
        name: 'TCP/IP & Socket Programming',
        category: 'networking',
        color: '#38bdf8',
        tag: 'PROTOCOLS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        desc: 'Low-level Python TCP/UDP sockets, 3-way handshakes, AIMD flow control & sliding windows.',
        spec: 'Raw Sockets',
        level: 94,
        isFeatured: false
    },
    {
        name: 'Wireshark Diagnostics',
        category: 'networking',
        color: '#38bdf8',
        tag: 'ANALYSIS',
        icon: 'https://cdn.simpleicons.org/wireshark/1679A7',
        desc: 'Deep packet inspection, TCP segment retransmissions triage & TLS negotiation analysis.',
        spec: 'Deep Inspection',
        level: 92,
        isFeatured: true
    },
    {
        name: 'Security Groups & NACLs',
        category: 'networking',
        color: '#38bdf8',
        tag: 'VPC SECURITY',
        icon: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png',
        desc: 'Stateful instance firewalls, stateless subnet NACL rules & zero-trust network boundaries.',
        spec: 'Zero Trust',
        level: 92,
        isFeatured: false
    },

    // --- Full-Stack & Systems ---
    {
        name: 'React 19 & Modern Web',
        category: 'fullstack',
        color: '#c084fc',
        tag: 'FRONTEND',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        desc: 'Concurrent rendering, Server Actions, modern hooks architecture & responsive glass UIs.',
        spec: 'React 19 Core',
        level: 96,
        isFeatured: true
    },
    {
        name: 'Node.js & Express',
        category: 'fullstack',
        color: '#c084fc',
        tag: 'API BACKEND',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        desc: 'Asynchronous event loops, RESTful microservices, JWT authentication & secure middleware.',
        spec: 'Node.js v20+',
        level: 94,
        isFeatured: true
    },
    {
        name: 'TypeScript / ES6+',
        category: 'fullstack',
        color: '#c084fc',
        tag: 'TYPE SAFETY',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        desc: 'Strict type contracts, generic interfaces, and clean maintainable scalable codebases.',
        spec: 'Strict TS',
        level: 92,
        isFeatured: false
    },
    {
        name: 'Prisma ORM & SQL',
        category: 'fullstack',
        color: '#c084fc',
        tag: 'DATA ACCESS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
        desc: 'Type-safe relational modeling, ACID transactions, relation queries & sub-80ms lookups.',
        spec: 'Prisma / MySQL',
        level: 94,
        isFeatured: true
    },
    {
        name: 'MongoDB & NoSQL',
        category: 'fullstack',
        color: '#c084fc',
        tag: 'DOC STORE',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        desc: 'Flexible schema aggregation pipelines, compound indexing & high-throughput document stores.',
        spec: 'MongoDB Atlas',
        level: 90,
        isFeatured: false
    },
    {
        name: 'WebSockets (Socket.io)',
        category: 'fullstack',
        color: '#c084fc',
        tag: 'REAL-TIME',
        icon: 'https://cdn.simpleicons.org/socketdotio/010101',
        desc: 'Full-duplex bidirectional communication for live collaboration, bids & instant notifications.',
        spec: 'Socket.io Core',
        level: 92,
        isFeatured: false
    },

    // --- System Design & DevOps ---
    {
        name: 'System Design & Scale',
        category: 'tools',
        color: '#34d399',
        tag: 'HIGH SCALE',
        icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png',
        desc: 'Horizontal scalability, stateless microservices, read-replicas & fault-tolerant topologies.',
        spec: 'Distributed Arch',
        level: 95,
        isFeatured: true
    },
    {
        name: 'Docker Containers',
        category: 'tools',
        color: '#34d399',
        tag: 'CONTAINER',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        desc: 'Multi-stage Docker builds, isolated runtime environments & lightweight deployment images.',
        spec: 'Docker Engine',
        level: 92,
        isFeatured: true
    },
    {
        name: 'OOP & SOLID Principles',
        category: 'tools',
        color: '#34d399',
        tag: 'PATTERNS',
        icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png',
        desc: 'Strict object-oriented patterns, interface segregation, single-responsibility & clean code.',
        spec: 'Clean Arch',
        level: 96,
        isFeatured: false
    },
    {
        name: 'Redis In-Memory Cache',
        category: 'tools',
        color: '#34d399',
        tag: 'CACHING',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
        desc: 'Cache-aside strategies, distributed rate limiting, session stores & sub-millisecond lookups.',
        spec: 'Redis 7',
        level: 90,
        isFeatured: false
    },
    {
        name: 'Git & GitHub Actions',
        category: 'tools',
        color: '#34d399',
        tag: 'CI / CD',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        desc: 'Automated CI/CD pipelines, semantic testing, branch protection & production deployments.',
        spec: 'CI/CD Automation',
        level: 94,
        isFeatured: false
    }
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState('featured');

    const displayedSkills = activeTab === 'featured'
        ? allSkillsData.filter(s => s.isFeatured)
        : allSkillsData.filter(s => s.category === activeTab);

    return (
        <section id="skills" className="section-padding skills-section">
            <div className="container">
                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="skills-badge">
                        <span className="badge-dot"></span>
                        Engineering Matrix
                    </span>
                    <h2 className="heading-lg">The Secret Sauce</h2>
                    <p className="skills-subtitle">
                        Architectural competencies engineered for high throughput, silicon-to-cloud breadth, and autonomous intelligence.
                    </p>
                </motion.div>

                {/* Cybernetic Category Tabs */}
                <div className="skills-tabs-container">
                    {skillCategories.map(cat => (
                        <button
                            key={cat.id}
                            className={`skills-tab ${activeTab === cat.id ? 'active' : ''}`}
                            style={{ '--tab-color': cat.color }}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            <span className="tab-icon">{cat.icon}</span>
                            <span className="tab-name">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Cybernetic Skills Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="cyber-skills-grid"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                    >
                        {displayedSkills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className="cyber-skill-card"
                                style={{
                                    '--skill-color': skill.color,
                                    '--skill-glow': `${skill.color}25`
                                }}
                            >
                                <div className="cyber-card-top-line"></div>
                                <div className="cyber-card-radial-glow"></div>

                                <div className="cyber-card-header">
                                    <div className="cyber-icon-wrap">
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="cyber-icon-img"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <span className="cyber-badge-tag">{skill.tag}</span>
                                </div>

                                <div className="cyber-card-body">
                                    <h4 className="cyber-skill-title">{skill.name}</h4>
                                    <p className="cyber-skill-desc">{skill.desc}</p>
                                </div>

                                <div className="cyber-card-footer">
                                    <div className="cyber-telemetry-meter">
                                        <div className="meter-track">
                                            <div
                                                className="meter-fill"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="cyber-spec-tag">{skill.spec}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Skills;
