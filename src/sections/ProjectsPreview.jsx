import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/ProjectsPreview.css';

const projects = [
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
        image: '/projects/rps.png',
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
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="projects-horizontal-track"
                        style={{ x }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="project-scroll-card"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    delay: index * 0.05,
                                    duration: 0.5
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                onClick={() => window.open(project.link, '_blank')}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="scroll-card-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="scroll-card-overlay">
                                        <h3>{project.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
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
