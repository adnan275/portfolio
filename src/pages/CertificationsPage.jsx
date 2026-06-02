import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Certifications.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CertificationsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const certifications = [
        {
            title: "Oracle Cloud Infrastructure 2025 – AI Foundations Associate",
            issuer: "Oracle",
            date: "Issued: Oct 2025",
            description: "Gained foundational understanding of AI, ML, Deep Learning, supervised/unsupervised learning, CNN/RNN/LSTM models, and Oracle Cloud’s AI/ML and Generative AI services.",
            features: [
                "Foundational AI & ML concepts",
                "Deep Learning models (CNN, RNN, LSTM)",
                "Oracle Cloud AI/ML services",
                "Generative AI implementation"
            ],
            link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=F849F73637C4CF1C1F23E9BA34AE5C598DCF237047134BD04EE9CEA24CF0794B",
            logo: "https://logo.clearbit.com/oracle.com"
        },
        {
            title: "AWS Solutions Architecture Job Simulation",
            issuer: "Forage (in partnership with AWS APAC)",
            date: "Issued: Jul 2025",
            description: "Designed a simple and scalable hosting architecture using AWS Elastic Beanstalk, and communicated the solution and cost model clearly to a non-technical client.",
            features: [
                "Scalable architecture design",
                "AWS Elastic Beanstalk implementation",
                "Cost modeling and client communication",
                "Cloud infrastructure best practices"
            ],
            link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_gbKsYnojnyDafzmWA_1753680026076_completion_certificate.pdf",
            logo: "https://logo.clearbit.com/aws.amazon.com"
        },
        {
            title: "Deloitte Australia - Cyber Job Simulation",
            issuer: "Forage",
            date: "Issued: Jun 2025",
            description: "Performed log analysis to detect suspicious activity, assessed potential cyber breaches, and developed skills in network security, anomaly detection, and forensic investigation through a Deloitte Cyber Job Simulation.",
            features: [
                "Log analysis and threat detection",
                "Cyber breach assessment",
                "Network security and anomaly detection",
                "Forensic investigation techniques"
            ],
            link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_Q9Sqv4dBgSM4igcCq_1751281708262_completion_certificate.pdf",
            logo: "https://logo.clearbit.com/deloitte.com"
        }
    ];

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
                                    <img src={cert.logo} alt={cert.issuer} className="cert-logo" />
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
