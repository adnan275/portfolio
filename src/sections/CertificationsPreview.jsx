import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { certifications } from '../data/certifications';
import '../styles/CertificationsPreview.css';

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }
    })
};

const CertificationsPreview = () => {
    return (
        <section id="certifications" className="section-padding cert-preview-section">
            <div className="container">
                <motion.div
                    className="cert-preview-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="heading-lg">Certifications</h2>
                    <p className="section-subtitle">Credentials from Oracle, AWS, and Deloitte simulations</p>
                </motion.div>

                <div className="cert-preview-grid">
                    {certifications.map((cert, index) => (
                        <motion.a
                            key={cert.title}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cert-preview-card glass-panel"
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="cert-preview-logo-wrap">
                                <img
                                    src={cert.logo}
                                    alt={cert.logoAlt || cert.issuer}
                                    className={`cert-preview-logo ${cert.logoClass || ''}`.trim()}
                                />
                            </div>
                            <h3 className="cert-preview-title">{cert.title}</h3>
                            <p className="cert-preview-meta">{cert.issuer} · {cert.date.replace('Issued: ', '')}</p>
                            <span className="cert-preview-link">View credential →</span>
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    className="cert-preview-footer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link to="/certifications" className="cert-preview-all">
                        See full details →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CertificationsPreview;
