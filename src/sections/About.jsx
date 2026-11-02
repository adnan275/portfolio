import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import '../styles/Three.css';

const About = () => {
    const milestones = [
        {
            title: "01. The Foundations",
            color: "#38bdf8",
            tag: "Core Web & CS",
            content: "Mastered core computer science and web engineering principles—<strong>HTML, CSS, and modern JavaScript</strong>, establishing a strong base for scalable software solutions."
        },
        {
            title: "02. The Logic & DSA",
            color: "#6366f1",
            tag: "400+ Solved",
            content: "Deep-dived into <strong>Data Structures & Algorithms</strong>, solving <strong>400+ problems</strong> across LeetCode, mastering runtime complexity, memory optimization, and clean logic."
        },
        {
            title: "03. Full-Stack Mastery",
            color: "#c084fc",
            tag: "MERN & SQL",
            content: "Built production-grade web systems with <strong>React, Node.js, Express, Prisma, and SQL</strong>, implementing <strong>OOP and SOLID</strong> design patterns for high maintainability."
        },
        {
            title: "04. Networks & Cloud Infrastructure",
            color: "#0ea5e9",
            tag: "AWS & Protocols",
            content: "Engineered cloud infrastructure on <strong>AWS</strong>—mastering <strong>VPC architecture, CIDR subnetting, ALB load balancers, and Route 53</strong>, alongside packet diagnostics with <strong>Wireshark & Sockets</strong>."
        },
        {
            title: "05. Modern Computer Architecture",
            color: "#f97316",
            tag: "Silicon & Hardware",
            content: "Bridged software with silicon—designing logic in <strong>Verilog HDL</strong>, analyzing <strong>5-stage CPU pipelining, RISC-V/MIPS ISA</strong>, and hardware accelerators across <strong>multicore MESI, GPUs, and TPU arrays</strong>."
        },
        {
            title: "06. Advanced Machine Learning",
            color: "#14b8a6",
            tag: "From-Scratch ML",
            content: "Implemented ML algorithms from scratch in <strong>NumPy</strong>—mastering <strong>OLS, GMM clustering, CART decision trees, Time Series ARIMA forecasting</strong>, and statistical <strong>VIF diagnostics</strong>."
        },
        {
            title: "07. Deep Learning & Neural Systems",
            color: "#ec4899",
            tag: "PyTorch & Transformers",
            content: "Designed deep neural architectures in <strong>PyTorch</strong>—mastering <strong>Transformers, Mamba SSMs, Diffusion DDPM, Multimodal CLIP</strong>, and post-training via <strong>DPO & QLoRA quantization</strong>."
        },
        {
            title: "08. Agentic AI & Intelligence",
            color: "#00f0ff",
            tag: "Autonomous Agents",
            content: "Explored the world of <strong>Generative AI</strong>, specializing in <strong>RAG (Retrieval-Augmented Generation)</strong> and autonomous <strong>Agentic Workflows</strong> using LangChain & LangGraph."
        },
        {
            title: "09. The Future: System Design & Scale",
            color: "#ffb703",
            tag: "Scale & Architecture",
            content: "Currently mastering <strong>System Design</strong> and high-performance computing. My goal is to bridge the gap between robust engineering and cutting-edge AI to build technology that impacts millions."
        }
    ];

    return (
        <section id="about" className="section-padding about-section">
            <div className="container">
                {/* Intro Section: Text + Visual Card */}
                <div className="about-intro-grid perspective-container">
                    <motion.div
                        className="about-intro-content"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="heading-lg" style={{ marginBottom: '2rem' }}>About Me</h2>
                        <p>
                            I'm a <strong>Software Engineer</strong> passionate about building high-performance applications and intelligent systems.
                            My approach combines strong engineering fundamentals with a curiosity for cutting-edge AI technologies.
                        </p>
                        <p>
                            Whether it's architecting scalable backends or developing agentic AI workflows, I focus on writing <strong>clean, maintainable code</strong> that solves real-world problems at scale.
                        </p>
                        <div className="about-quick-stats">
                            <div className="quick-stat-item">
                                <span className="stat-number">2+ Years</span>
                                <span className="stat-label">Software & AI Engineering</span>
                            </div>
                            <div className="quick-stat-item">
                                <span className="stat-number">10+ Projects</span>
                                <span className="stat-label">AI & Full-Stack Systems</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-visual perspective-container"
                        initial={{ opacity: 0, x: 30, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="visual-card card-3d hover-lift-3d gpu-accelerated">
                            <div className="window-controls">
                                <span></span><span></span><span></span>
                            </div>
                            <div className="code-block">
                                <pre>
                                    <code>
                                        {`const developer = {
  name: 'Adnan',
  role: 'Software Engineer',
  focus: 'Full Stack & AI',
  passion: 'Scalable Systems'
};`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <div className="gradient-orb float-3d"></div>
                    </motion.div>
                </div>

                {/* Journey Section: Compact Responsive Grid */}
                <div className="journey-section">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                            My Journey
                        </h2>
                        <p className="journey-subtitle">
                            Evolution from fundamental logic and full-stack systems to cloud architecture, silicon hardware, and cutting-edge intelligence.
                        </p>
                    </motion.div>

                    <div className="journey-grid">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className="journey-card"
                                style={{
                                    '--phase-color': milestone.color,
                                    '--phase-glow': `${milestone.color}33`,
                                    '--phase-bg': `${milestone.color}12`
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.04
                                }}
                                whileHover={{ y: -5, scale: 1.015 }}
                            >
                                <div className="journey-card-glow" />
                                <div className="journey-card-top-line" />

                                <div className="journey-card-header">
                                    <div className="journey-badge-group">
                                        <span className="journey-step-badge">
                                            <span className="step-glow"></span>
                                            Phase {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="journey-tag-pill">{milestone.tag}</span>
                                    </div>
                                    <span className="journey-step-number">0{index + 1}</span>
                                </div>

                                <h4 className="journey-card-title">{milestone.title.replace(/^\d+\.\s*/, '')}</h4>
                                <p dangerouslySetInnerHTML={{ __html: milestone.content }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
