import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Skills.css';

const skillCategories = [
    {
        id: 'aiml',
        name: 'Agentic AI & LLMs',
        icon: '🤖',
        color: '#00f0ff',
        tagline: 'Autonomous multi-agent workflows, local RAG pipelines & LLM reasoning',
        skills: [
            { name: 'LangGraph', icon: 'https://img.icons8.com/color/48/000000/graph.png' },
            { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
            { name: 'RAG Architecture', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
            { name: 'Agentic Workflows', icon: 'https://cdn-icons-png.flaticon.com/512/10433/10433048.png' },
            { name: 'Groq LPU Acceleration', icon: 'https://console.groq.com/powered-by-groq-dark.svg' },
            { name: 'Hugging Face Ecosystem', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
        ]
    },
    {
        id: 'deeplearning',
        name: 'Deep Learning & Neural Systems',
        icon: '🧠',
        color: '#ec4899',
        tagline: 'Modern neural architectures, linear sequence modeling & alignment',
        skills: [
            { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
            { name: 'Transformers & Attention', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
            { name: 'Mamba (State-Space Models)', icon: 'https://cdn-icons-png.flaticon.com/512/8644/8644474.png' },
            { name: 'Diffusion Models (DDPM)', icon: 'https://cdn-icons-png.flaticon.com/512/9991/9991874.png' },
            { name: 'Multimodal AI (CLIP)', icon: 'https://cdn-icons-png.flaticon.com/512/12222/12222560.png' },
            { name: 'QLoRA & INT4 Quantization', icon: 'https://cdn-icons-png.flaticon.com/512/9581/9581977.png' }
        ]
    },
    {
        id: 'advml',
        name: 'Advanced Machine Learning',
        icon: '🔬',
        color: '#14b8a6',
        tagline: 'From-scratch mathematical algorithms, statistical diagnostics & time-series',
        skills: [
            { name: 'NumPy ML (From Scratch)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
            { name: 'Time Series ARIMA & ACF', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920349.png' },
            { name: 'Gaussian Mixtures (GMM)', icon: 'https://cdn-icons-png.flaticon.com/512/8644/8644474.png' },
            { name: 'CART Decision Trees', icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png' },
            { name: 'Gradient Descent (SGD)', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
            { name: 'PCA Dimensionality & VIF', icon: 'https://cdn-icons-png.flaticon.com/512/1265/1265757.png' }
        ]
    },
    {
        id: 'comparch',
        name: 'Computer Architecture & Silicon',
        icon: '🖥️',
        color: '#f97316',
        tagline: 'Hardware description, CPU datapaths, cache hierarchy & accelerators',
        skills: [
            { name: 'Verilog HDL & GTKWave', icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png' },
            { name: '5-Stage CPU Pipelining', icon: 'https://cdn-icons-png.flaticon.com/512/3178/3178283.png' },
            { name: 'RISC-V & MIPS32 ISAs', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png' },
            { name: 'Cache AMAT & Associativity', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
            { name: 'Multicore MESI Coherence', icon: 'https://img.icons8.com/color/48/000000/graph.png' },
            { name: 'GPU SIMT & TPU Arrays', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nvidia/nvidia-original.svg' }
        ]
    },
    {
        id: 'networking',
        name: 'Computer Networks & Cloud',
        icon: '🌐',
        color: '#38bdf8',
        tagline: 'Multi-tier AWS VPCs, routing policies, protocol analysis & diagnostics',
        skills: [
            { name: 'AWS Multi-Tier VPC & CIDR', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
            { name: 'Load Balancers (ALB/NLB)', icon: 'https://cdn-icons-png.flaticon.com/512/1541/1541400.png' },
            { name: 'Route 53 DNS & CloudFront', icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885449.png' },
            { name: 'TCP/IP & Python Sockets', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'Wireshark Packet Analysis', icon: 'https://cdn.simpleicons.org/wireshark/1679A7' },
            { name: 'Security Groups & NACLs', icon: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png' }
        ]
    },
    {
        id: 'fullstack',
        name: 'Full-Stack Systems',
        icon: '💻',
        color: '#c084fc',
        tagline: 'High-availability web applications, scalable backends & databases',
        skills: [
            { name: 'React 19', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Node.js & Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'TypeScript / ES6+', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
            { name: 'Prisma ORM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
            { name: 'MySQL & PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'MongoDB & Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
        ]
    },
    {
        id: 'tools',
        name: 'System Design & DevOps',
        icon: '⚡',
        color: '#34d399',
        tagline: 'Production architectures, containerization, CI/CD & clean design',
        skills: [
            { name: 'System Architecture & Scale', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png' },
            { name: 'Docker & Microservices', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'OOP & SOLID Principles', icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png' },
            { name: 'REST APIs & WebSockets', icon: 'https://jwt.io/img/pic_logo.svg' },
            { name: 'Git & GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'Vercel Deployment', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' }
        ]
    }
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState('all');

    const activeCategory = skillCategories.find(c => c.id === activeTab);

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
                        Engineering Core
                    </span>
                    <h2 className="heading-lg">The Secret Sauce</h2>
                    <p className="skills-subtitle">
                        Core technical competencies engineered for high performance, architectural rigor, and production reliability.
                    </p>
                </motion.div>

                {/* Category Tab Selector */}
                <div className="skills-tabs-container">
                    <button
                        className={`skills-tab ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        🌐 Core Pillars Overview
                    </button>
                    {skillCategories.map(cat => (
                        <button
                            key={cat.id}
                            className={`skills-tab ${activeTab === cat.id ? 'active' : ''}`}
                            style={{ '--tab-color': cat.color }}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            <span>{cat.icon}</span> {cat.name}
                        </button>
                    ))}
                </div>

                {/* Content View: Structured Pillars Overview vs Category Drilldown */}
                <AnimatePresence mode="wait">
                    {activeTab === 'all' ? (
                        <motion.div
                            key="pillars-overview"
                            className="skills-pillars-grid"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25 }}
                        >
                            {skillCategories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="pillar-card"
                                    style={{ '--pillar-color': cat.color }}
                                    onClick={() => setActiveTab(cat.id)}
                                >
                                    <div className="pillar-header">
                                        <div 
                                            className="pillar-icon-wrap" 
                                            style={{ 
                                                background: `${cat.color}15`, 
                                                borderColor: `${cat.color}45`, 
                                                color: cat.color 
                                            }}
                                        >
                                            <span>{cat.icon}</span>
                                        </div>
                                        <div className="pillar-title-block">
                                            <h3 className="pillar-title">{cat.name}</h3>
                                            <p className="pillar-tagline">{cat.tagline}</p>
                                        </div>
                                    </div>

                                    <div className="pillar-tags">
                                        {cat.skills.map((skill, sIdx) => (
                                            <span key={sIdx} className="pillar-tag">
                                                <img
                                                    src={skill.icon}
                                                    alt=""
                                                    className="pillar-tag-icon"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pillar-footer">
                                        <span className="pillar-explore-hint">Explore domain →</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            className="skills-display-grid"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeCategory && activeCategory.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="skill-card"
                                    style={{ '--card-accent': activeCategory.color }}
                                >
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="skill-card-icon"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                    <span className="skill-card-name">{skill.name}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Skills;
