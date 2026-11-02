import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Skills.css';

const skillCategories = [
    {
        id: 'aiml',
        name: 'Agentic AI & LLMs',
        icon: '🤖',
        color: '#00f0ff',
        skills: [
            { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
            { name: 'LangGraph', icon: 'https://img.icons8.com/color/48/000000/graph.png' },
            { name: 'RAG Architecture', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
            { name: 'Agentic Workflows', icon: 'https://cdn-icons-png.flaticon.com/512/10433/10433048.png' },
            { name: 'Groq API Acceleration', icon: 'https://console.groq.com/powered-by-groq-dark.svg' },
            { name: 'HuggingFace Ecosystem', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'Streamlit UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg' }
        ]
    },
    {
        id: 'deeplearning',
        name: 'Deep Learning & Neural Systems',
        icon: '🧠',
        color: '#ec4899',
        skills: [
            { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
            { name: 'Transformers & Attention', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
            { name: 'State-Space Models (Mamba)', icon: 'https://cdn-icons-png.flaticon.com/512/8644/8644474.png' },
            { name: 'Diffusion Models (DDPM)', icon: 'https://cdn-icons-png.flaticon.com/512/9991/9991874.png' },
            { name: 'Multimodal AI (CLIP)', icon: 'https://cdn-icons-png.flaticon.com/512/12222/12222560.png' },
            { name: 'LLM Alignment (DPO/RLHF)', icon: 'https://cdn-icons-png.flaticon.com/512/11542/11542475.png' },
            { name: 'Edge AI (QLoRA / INT4)', icon: 'https://cdn-icons-png.flaticon.com/512/9581/9581977.png' },
            { name: 'CNNs & Computer Vision', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
            { name: 'RNNs & LSTMs', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
            { name: 'Autoencoders & VAEs', icon: 'https://cdn-icons-png.flaticon.com/512/10061/10061730.png' },
            { name: 'Graph Neural Networks', icon: 'https://img.icons8.com/color/48/000000/graph.png' }
        ]
    },
    {
        id: 'advml',
        name: 'Advanced Machine Learning',
        icon: '🔬',
        color: '#14b8a6',
        skills: [
            { name: 'From-Scratch ML Math', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
            { name: 'Gradient Descent (SGD)', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
            { name: 'Time Series & ARIMA', icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920349.png' },
            { name: 'Gaussian Mixtures (GMM)', icon: 'https://cdn-icons-png.flaticon.com/512/8644/8644474.png' },
            { name: 'Decision Trees & CART', icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png' },
            { name: 'Logistic & Softmax (MLE)', icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' },
            { name: 'OLS Multiple Regression', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png' },
            { name: 'Model Diagnostics (VIF)', icon: 'https://cdn-icons-png.flaticon.com/512/3208/3208676.png' },
            { name: 'Regularization (L1/L2)', icon: 'https://cdn-icons-png.flaticon.com/512/1541/1541400.png' },
            { name: 'K-Means++ Clustering', icon: 'https://img.icons8.com/color/48/000000/graph.png' },
            { name: 'PCA Dimensionality', icon: 'https://cdn-icons-png.flaticon.com/512/1265/1265757.png' }
        ]
    },
    {
        id: 'comparch',
        name: 'Modern Computer Architecture',
        icon: '🖥️',
        color: '#f97316',
        skills: [
            { name: 'Verilog & GTKWave', icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png' },
            { name: 'RISC-V & MIPS32', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png' },
            { name: '5-Stage Pipelining', icon: 'https://cdn-icons-png.flaticon.com/512/3178/3178283.png' },
            { name: 'Cache Hierarchy & AMAT', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
            { name: 'Multicore & MESI', icon: 'https://img.icons8.com/color/48/000000/graph.png' },
            { name: 'Hardware Atomics (CAS)', icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png' },
            { name: 'GPU SIMT Architecture', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nvidia/nvidia-original.svg' },
            { name: 'TPU Systolic Arrays', icon: 'https://cdn-icons-png.flaticon.com/512/8644/8644474.png' },
            { name: 'SIMD Vectorization', icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' },
            { name: 'Virtual Memory & TLBs', icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png' },
            { name: 'Hardware Security', icon: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png' }
        ]
    },
    {
        id: 'networking',
        name: 'Computer Networks & Cloud',
        icon: '🌐',
        color: '#38bdf8',
        skills: [
            { name: 'OSI & TCP/IP Stack', icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png' },
            { name: 'AWS VPC & Subnetting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
            { name: 'Wireshark Analysis', icon: 'https://cdn.simpleicons.org/wireshark/1679A7' },
            { name: 'Socket Programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'HTTP/3 & TLS Security', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png' },
            { name: 'DNS & AWS Route 53', icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885449.png' },
            { name: 'Routing (OSPF, BGP)', icon: 'https://cdn-icons-png.flaticon.com/512/3178/3178283.png' },
            { name: 'Load Balancers (ALB/NLB)', icon: 'https://cdn-icons-png.flaticon.com/512/1541/1541400.png' },
            { name: 'Security Groups & NACLs', icon: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png' },
            { name: 'VPNs & WireGuard', icon: 'https://cdn.simpleicons.org/wireguard/88171A' },
            { name: 'Cisco Packet Tracer', icon: 'https://cdn.simpleicons.org/cisco/1BA0D7' },
            { name: 'CloudFront CDN', icon: 'https://cdn.simpleicons.org/amazonwebservices/FF9900' },
            { name: 'VPC Flow Logs & ICMP', icon: 'https://cdn-icons-png.flaticon.com/512/3208/3208676.png' }
        ]
    },
    {
        id: 'fullstack',
        name: 'Full-Stack Systems',
        icon: '💻',
        color: '#c084fc',
        skills: [
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'JavaScript (ES6+)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
            { name: 'Prisma ORM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
            { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
        ]
    },
    {
        id: 'data',
        name: 'Data & Analytics',
        icon: '📊',
        color: '#ffb703',
        skills: [
            { name: 'SQL Querying', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg' },
            { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
            { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
            { name: 'Tableau', icon: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
            { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
            { name: 'MS Excel & Sheets', icon: 'https://img.icons8.com/color/48/000000/microsoft-excel-2019.png' }
        ]
    },
    {
        id: 'tools',
        name: 'Production & Tools',
        icon: '⚡',
        color: '#34d399',
        skills: [
            { name: 'System Design', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png' },
            { name: 'OOP & SOLID', icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png' },
            { name: 'REST APIs & JWT', icon: 'https://jwt.io/img/pic_logo.svg' },
            { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'Vercel Deployment', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
            { name: 'Figma UI/UX', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
            { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' }
        ]
    }
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState('all');

    const activeCategory = skillCategories.find(c => c.id === activeTab);
    const displayedSkills = activeTab === 'all'
        ? skillCategories.flatMap(c => c.skills)
        : activeCategory ? activeCategory.skills : [];

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
                        Tech Stack
                    </span>
                    <h2 className="heading-lg">The Secret Sauce</h2>
                    <p className="skills-subtitle">
                        A curated selection of modern technologies and frameworks, engineered for high performance, structural reliability, and seamless digital experiences.
                    </p>
                </motion.div>

                {/* Category Tab Selector */}
                <div className="skills-tabs-container">
                    <button
                        className={`skills-tab ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        🌐 All Competencies
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

                {/* Skills Grid */}
                <motion.div className="skills-display-grid" layout>
                    <AnimatePresence mode="popLayout">
                        {displayedSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="skill-card glass-panel"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: index * 0.02 }}
                                whileHover={{ y: -4, scale: 1.05 }}
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
