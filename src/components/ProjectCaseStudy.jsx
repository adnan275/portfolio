import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoOpenOutline, IoCodeSlashOutline, IoBulbOutline, IoRocketOutline, IoLogoGithub } from 'react-icons/io5';
import { useLenis } from './LenisProvider';
import '../styles/ProjectCaseStudy.css';

const ProjectCaseStudy = ({ project, isOpen, onClose }) => {
    const lenisRef = useLenis();
    const [rotateX, setRotateX] = React.useState(0);
    const [rotateY, setRotateY] = React.useState(0);

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

    useEffect(() => {
        const lenis = lenisRef?.current;
        if (!lenis) return;

        if (isOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }

        return () => {
            lenis.start();
        };
    }, [isOpen, lenisRef]);

    if (!project) return null;

    const { title, description, image, link, tags, details } = project;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="case-study-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="case-study-modal glass-panel"
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <button className="close-btn" onClick={onClose} aria-label="Close">
                            <IoClose size={24} />
                        </button>

                        <div className="case-study-content">
                            <div className="case-study-header">
                                <div className="header-info">
                                    <h2 className="gradient-text">{title}</h2>
                                    <div className="case-study-tags">
                                        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                    </div>
                                </div>
                                <div className="header-actions">
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                        <span>Demo</span>
                                        <IoOpenOutline />
                                    </a>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                                        <span>GitHub</span>
                                        <IoLogoGithub />
                                    </a>
                                </div>
                            </div>

                            <div className="case-study-body">
                                <div
                                    className="case-study-image"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                                        transition: 'transform 0.1s ease-out'
                                    }}
                                >
                                    <img src={image} alt={title} />
                                </div>

                                <div className="case-study-grid">
                                    <section className="case-study-section">
                                        <div className="section-title">
                                            <IoBulbOutline className="icon" />
                                            <h3>The Problem</h3>
                                        </div>
                                        <p>{details?.problem || description}</p>
                                    </section>

                                    <section className="case-study-section">
                                        <div className="section-title">
                                            <IoRocketOutline className="icon" />
                                            <h3>The Solution</h3>
                                        </div>
                                        <p>{details?.solution || "Implemented a robust full-stack solution focusing on performance, scalability, and user experience."}</p>
                                    </section>

                                    <section className="case-study-section full-width">
                                        <div className="section-title">
                                            <IoCodeSlashOutline className="icon" />
                                            <h3>Key Features</h3>
                                        </div>
                                        <ul className="features-list">
                                            {(details?.features || tags).map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectCaseStudy;
