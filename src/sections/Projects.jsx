import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Projects.css';

const projects = [
    {
        title: 'Zync',
        description: 'Real-time video calling platform with 15,000+ calls, 50,000+ messages, 98% satisfaction, <0.1% error rate.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stream', 'JWT'],
        link: 'https://zync-five.vercel.app/login',
        image: '/projects/zync.png'
    },
    {
        title: 'Presento Treasure',
        description: 'Startup-grade E-commerce with modular API, role-based auth, and core commerce logic.',
        tags: ['React', 'Node.js', 'MySql', 'Express'],
        link: 'https://fullstack-presento-swaj.vercel.app/',
        image: '/projects/presento.png'
    },
    {
        title: 'Taskly',
        description: 'Auth-based Task Manager for organizing personal workflows.',
        tags: ['React', 'Firebase', 'Auth', 'JavaScript'],
        link: 'https://auth-taskly.vercel.app/',
        image: '/projects/taskly-real.png'
    },
    {
        title: 'Stone Paper Scissors',
        description: 'Interactive game with score tracking and responsive UI.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://stone-paper-scissors-blue-pi.vercel.app/',
        image: '/projects/rps.png'
    },
    {
        title: 'Password Strength Checker',
        description: 'Real-time password validation utility for security awareness.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://password-strength-checker-psi-one.vercel.app/',
        image: '/projects/password.png'
    },
    {
        title: 'Capstone Project',
        description: 'Comprehensive web solution demonstrating full-stack capabilities.',
        tags: ['CSS', 'HTML', 'JavaScript'],
        link: 'https://s-w-project-sigma.vercel.app/',
        image: '/projects/capstone-real.jpg'
    },
    {
        title: 'QR Scanner & Generator',
        description: 'Utility tool to scan and generate QR codes instantly.',
        tags: ['JavaScript', 'API', 'Tool', 'HTML', 'CSS'],
        link: 'https://qr-scanner-ten-tawny.vercel.app/',
        image: '/projects/qr.png'
    }
];

const ProjectCard = ({ project, variants }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            className="project-card glass-panel"
            variants={variants}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`,
                transition: 'transform 0.1s ease-out'
            }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
        >
            <div className="card-image">
                {project.image ? (
                    <img src={project.image} alt={project.title} className="project-img" />
                ) : (
                    <div className="placeholder-img"></div>
                )}
            </div>
            <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-tags">
                    {project.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-link">View Project &rarr;</a>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 20 } }
    };

    return (
        <section id="work" className="section-padding">
            <div className="container">
                <motion.h2
                    className="heading-lg"
                    style={{ marginBottom: '3rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Checkout My Projects
                </motion.h2>

                <motion.div
                    className="projects-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} variants={item} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
