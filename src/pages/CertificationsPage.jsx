import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Certifications.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { certifications } from '../data/certifications';

const CertificationsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="certifications-page">
            <Navbar />
            <div className="certifications-container">
                <motion.div
                    className="certifications-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>My Certifications</h1>
                </motion.div>

                <div className="cert-timeline">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            className="cert-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="cert-logo-container">
                                <div className="cert-logo-wrapper">
                                    <img
                                        src={cert.logo}
                                        alt={cert.logoAlt || cert.issuer}
                                        className={`cert-logo ${cert.logoClass || ''}`.trim()}
                                    />
                                </div>
                            </div>
                            <div className="cert-content">
                                <h3 className="cert-title">{cert.title}</h3>
                                <div className="cert-issuer">{cert.issuer}</div>
                                <div className="cert-date">{cert.date}</div>
                                <p className="cert-description">{cert.description}</p>

                                <div className="cert-features">
                                    <h4>Features Worked on</h4>
                                    <ul>
                                        {cert.features.map((feature, fIndex) => (
                                            <li key={fIndex}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="view-credential"
                                >
                                    View Credential →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CertificationsPage;
