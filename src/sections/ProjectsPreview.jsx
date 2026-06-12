import React, { useRef, useState } from 'react';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/ProjectsPreview.css';
import '../styles/Three.css';

const projects = [
    {
        title: 'Socratic Study Buddy',
        description: 'AI-powered Socratic tutor with intelligent guardrails',
        tags: ['Flask', 'Python', 'OpenAI API'],
        image: '/projects/socratic-buddy.png',
        link: 'https://socratic-study-buddy.vercel.app/'
    },
    {
        title: 'Data & BI Portfolio',
        description: 'ETL pipelines & Tableau business dashboards',
        tags: ['Python', 'SQL', 'Tableau'],
        image: '/projects/dva-portfolio.png',
        link: 'https://github.com/adnan275/dva_portfolio'
    },
    {
        title: 'GigFlow',
        description: 'Real-time freelance marketplace',
        tags: ['React', 'Node.js', 'MongoDB'],
        image: '/projects/service-hive.png',
        link: 'https://service-hive-zeta.vercel.app/'
    },
    {
        title: 'Livesitter',
        description: 'RTSP livestream overlay app',
        tags: ['React', 'FFmpeg', 'MongoDB'],
        image: '/projects/livesitter.png',
        link: 'https://livesitter-woad.vercel.app/'
    },
    {
        title: 'Zync',
        description: 'Video calling platform',
        tags: ['React', 'Node.js', 'Stream'],
        image: '/projects/zync.png',
        link: 'https://zync-five.vercel.app/login'
    },
    {
        title: 'Presento Treasure',
        description: 'E-commerce platform',
        tags: ['React', 'MySQL', 'Express'],
        image: '/projects/presento.png',
        link: 'https://fullstack-presento-swaj.vercel.app/'
    },
    {
        title: 'Taskly',
        description: 'Task management app',
        tags: ['React', 'Firebase'],
        image: '/projects/taskly-real.png',
        link: 'https://auth-taskly.vercel.app/'
    },
    {
        title: 'Stone Paper Scissors',
        description: 'Interactive game',
        tags: ['JavaScript', 'HTML'],
        image: '/projects/rps-update.png',
        link: 'https://stone-paper-scissors-blue-pi.vercel.app/'
    },
    {
        title: 'Password Strength Checker',
        description: 'Password validation utility',
        tags: ['JavaScript', 'HTML'],
        image: '/projects/password.png',
        link: 'https://password-strength-checker-psi-one.vercel.app/'
    },
    {
        title: 'Capstone Project',
        description: 'Full-stack web solution',
        tags: ['HTML', 'CSS', 'JavaScript'],
        image: '/projects/capstone-real.jpg',
        link: 'https://s-w-project-sigma.vercel.app/'
    }
];

const ProjectCard = ({ project, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [imgLoaded, setImgLoaded] = useState(false);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const row = Math.floor(index / 4);
    const isEvenRow = row % 2 === 0;

    return (
        <motion.div
            className="project-scroll-card card-3d gpu-accelerated"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{
                opacity: 0,
                y: isEvenRow ? 50 : -50,
                rotateY: isEvenRow ? -15 : 15,
                z: -50
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                z: 0
            }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
                delay: (index % 4) * 0.1,
                duration: 0.6,
                ease: [0.22, 0.61, 0.36, 1]
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                cursor: 'pointer'
            }}
            whileHover={{
                scale: 1.05,
                z: 50,
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 20px 30px -15px rgba(99, 102, 241, 0.4)',
            }}
            onClick={() => window.open(project.link, '_blank')}
        >
            <div className="scroll-card-image" style={{ transform: "translateZ(30px)" }}>
                <div className={`img-skeleton${imgLoaded ? ' hidden' : ''}`} />
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className={imgLoaded ? 'loaded' : ''}
                    onLoad={() => setImgLoaded(true)}
                />
                <div className="scroll-card-overlay" style={{ transform: "translateZ(20px)" }}>
                    <h3>{project.title}</h3>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsPreview = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);

    return (
        <section id="work" className="projects-preview-section" ref={containerRef}>
            <div className="container-full">
                <motion.div
                    className="preview-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="heading-lg">Checkout my Projects</h2>
                    <p className="preview-subtitle">
                        Created stunning user interfaces with React, making websites that look great and work smoothly for real-life projects.
                    </p>
                </motion.div>

                <motion.div
                    className="horizontal-scroll-container"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="projects-horizontal-track"
                        style={{ x }}
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} />
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="view-all-container"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/projects" className="view-all-btn">
                        View All Projects →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsPreview;
