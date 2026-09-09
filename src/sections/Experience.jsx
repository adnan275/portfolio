import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Experience.css';

const experiences = [
    {
        role: 'Full-Stack Developer (Freelance)',
        company: 'Presento Treasure',
        period: 'Oct 2025',
        type: 'Freelance Project',
        github: 'https://github.com/adnan275/fullstack_presento',
        live: 'https://fullstack-presento-swaj.vercel.app/',
        techStack: ['React', 'JavaScript', 'Node.js', 'Express', 'Prisma', 'MySQL (Aiven)', 'JWT', 'Cloudinary', 'Nodemailer', 'Vercel'],
        highlights: [
            'Engineered a full-stack e-commerce platform handling order placement, catalog browsing, and cart management.',
            'Architected Express REST APIs using concurrent Prisma queries, cutting overall checkout pipeline latency by 40%.',
            'Indexed MySQL schemas for 10,000+ items to reach sub-80 ms search latency and secured routes via JWT/RBAC.'
        ]
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section-padding experience-section">
            <div className="container">
                <motion.div
                    className="experience-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="heading-lg">Work Experience</h2>
                    <p className="experience-subtitle">
                        Hands-on client engineering & full-stack development
                    </p>
                </motion.div>

                <div className="experience-list">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="experience-card glass-panel"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <div className="exp-card-header">
                                <div>
                                    <div className="exp-role-row">
                                        <h3 className="exp-role">{exp.role}</h3>
                                        <span className="exp-badge">{exp.type}</span>
                                    </div>
                                    <h4 className="exp-company">{exp.company}</h4>
                                </div>
                                <div className="exp-meta">
                                    <span className="exp-period">{exp.period}</span>
                                    <div className="exp-links">
                                        <a href={exp.github} target="_blank" rel="noopener noreferrer" className="exp-link">
                                            GitHub ↗
                                        </a>
                                        <a href={exp.live} target="_blank" rel="noopener noreferrer" className="exp-link live">
                                            Live Demo ↗
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="exp-tech-stack">
                                {exp.techStack.map((tech, i) => (
                                    <span key={i} className="tech-pill">{tech}</span>
                                ))}
                            </div>

                            <ul className="exp-highlights">
                                {exp.highlights.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
