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
            content: "Deep-dived into <strong>Data Structures and Algorithms</strong> to sharpen my problem-solving skills. Solved <strong>350+ problems</strong> across LeetCode and other platforms, mastering optimization and clean logic."
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
            title: "05. The Future: Scale",
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

                {/* Skills Section: Full Width */}
                <div className="skills-section">
                    <div className="skills-wrapper">
                        <motion.h2
                            className="heading-lg"
                            style={{ textAlign: 'center', marginBottom: '4rem' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            The Secret Sauce
                        </motion.h2>
                        <motion.div
                            className="skills-grid transform-3d"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                        >
                            {[
                                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                                { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                                { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                                { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
                                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                                { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
                                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                                { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg' },
                                { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
                                { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                                { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
                                { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg' },
                                { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
                                { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
                                { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
                                { name: 'Tableau', icon: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
                                { name: 'Excel', icon: 'https://img.icons8.com/color/48/000000/microsoft-excel-2019.png' },
                                { name: 'Spreadsheet', icon: 'https://img.icons8.com/color/48/000000/google-sheets.png' },
                                { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
                                { name: 'LangGraph', icon: 'https://img.icons8.com/color/48/000000/graph.png' },
                                { name: 'Notion', icon: 'https://cdn.simpleicons.org/notion/000000' },
                                { name: 'Groq', icon: 'https://console.groq.com/powered-by-groq-dark.svg' },
                                { name: 'HuggingFace', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
                                { name: 'LLMs', icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' },
                                { name: 'RAG', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
                                { name: 'Agentic AI', icon: 'https://cdn-icons-png.flaticon.com/512/10433/10433048.png' },
                                { name: 'SOLID', icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png' },
                                { name: 'OOP', icon: 'https://cdn-icons-png.flaticon.com/512/1149/1149168.png' },
                                { name: 'System Design', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png' },
                                { name: 'JWT', icon: 'https://jwt.io/img/pic_logo.svg' },
                                { name: 'Nodemailer', icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png' },
                                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                                { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
                                { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                                { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
                                { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' }
                            ]
                                .map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        className="skill-item card-3d gpu-accelerated"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotateY: 10,
                                            rotateX: 5,
                                            z: 20,
                                            transition: { duration: 0.1 }
                                        }}
                                    >
                                        <img src={skill.icon} alt={skill.name} className="skill-icon" />
                                        <span className="skill-name">{skill.name}</span>
                                    </motion.div>
                                ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
