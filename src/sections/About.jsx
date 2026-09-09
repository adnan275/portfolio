import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import '../styles/Three.css';

const About = () => {
    const milestones = [
        {
            title: "01. The Foundations",
            content: "Started my journey by mastering the core of the web—<strong>HTML, CSS, and JavaScript</strong>. Built a solid foundation in computer science principles and discovered a passion for creating digital solutions."
        },
        {
            title: "02. The Logic & DSA",
            content: "Deep-dived into <strong>Data Structures and Algorithms</strong> to sharpen my problem-solving skills. Solved <strong>400+ problems</strong> across LeetCode and other platforms, mastering optimization and clean logic."
        },
        {
            title: "03. Full-Stack Mastery",
            content: "Transitioned to building production-grade applications using the <strong>MERN stack, Prisma, and SQL</strong>. Focused on <strong>OOP and SOLID</strong> principles to ensure scalable and maintainable architecture."
        },
        {
            title: "04. AI & Intelligence",
            content: "Explored the world of <strong>Generative AI</strong>, specializing in <strong>RAG (Retrieval-Augmented Generation)</strong> and <strong>Agentic Workflows</strong> using LangChain. Built systems that can think and act autonomously."
        },
        {
            title: "05. Data & Analytics",
            content: "Mastered <strong>Data Analytics & Visualization</strong> using <strong>SQL, Scikit-learn, Tableau, and Excel</strong>. Built <strong>ETL pipelines, EDA, Data Cleaning</strong>, and dashboards with <strong>KPI Design</strong>, while developing robust <strong>REST APIs</strong>."
        },
        {
            title: "06. The Future: Scale",
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

                {/* Journey Section: Full Width */}
                <div className="journey-section">
                    <motion.h2
                        className="heading-lg"
                        style={{ marginBottom: '4rem', textAlign: 'center' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        My Journey
                    </motion.h2>

                    <div className="journey-timeline">
                        <div className="timeline-line"></div>
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <div className="timeline-dot">
                                    <div className="dot-inner"></div>
                                </div>
                                <div className="timeline-card card-3d">
                                    <div className="card-number">{index + 1}</div>
                                    <h4>{milestone.title}</h4>
                                    <p dangerouslySetInnerHTML={{ __html: milestone.content }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
