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
            description: "Through this certification, I built a solid base in AI and machine learning. I can now compare cloud AI options, explain the pros and cons in plain language, and tie technical choices back to what the business actually needs.",
            features: [
                "Looked at different AI approaches and picked what fits the problem best before anyone starts building",
                "Explained supervised vs. unsupervised learning in simple words so planning meetings stay clear and on track",
                "Understood when CNN, RNN, or LSTM models are a good fit, so model talks do not go in the wrong direction",
                "Connected everyday AI tasks to the right Oracle Cloud AI/ML and Generative AI tools for faster early planning"
            ],
            link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=F849F73637C4CF1C1F23E9BA34AE5C598DCF237047134BD04EE9CEA24CF0794B",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg"
        },
        {
            title: "AWS Solutions Architecture Job Simulation",
            issuer: "Forage (in partnership with AWS APAC)",
            date: "Issued: Jul 2025",
            description: "In this AWS job simulation, I worked on a client-style brief like a real solutions architect. I designed a simple hosting plan that can scale, chose Elastic Beanstalk for the approach, and explained costs and trade-offs so a non-technical client could understand and decide.",
            features: [
                "Designed a hosting setup that can handle more users over time without adding extra tools the project does not need",
                "Chose Elastic Beanstalk to keep deployment simpler and leave a clear path to grow when traffic increases",
                "Split costs into easy parts so the client could see what each option would cost before committing budget",
                "Wrote a clear architecture summary with trade-offs, so the team could review it and move forward with confidence"
            ],
            link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_gbKsYnojnyDafzmWA_1753680026076_completion_certificate.pdf",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
        },
        {
            title: "Deloitte Australia - Cyber Job Simulation",
            issuer: "Forage",
            date: "Issued: Jun 2025",
            description: "In this Deloitte cyber simulation, I worked through a security scenario step by step. I reviewed logs, thought about whether a breach could have happened, and wrote notes on what to check first so the team could act faster.",
            features: [
                "Went through log data line by line to spot logins, access, or actions that did not match normal behavior",
                "Worked through a practice incident and gave my view on whether a breach was likely and why",
                "Ranked the most suspicious events first so response time went to the signals that mattered most",
                "Wrote a short triage note with findings and next steps, so others could pick up the investigation easily"
            ],
            link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_Q9Sqv4dBgSM4igcCq_1751281708262_completion_certificate.pdf",
            logo: "/logos/deloitte.svg",
            logoAlt: "Deloitte",
            logoClass: "cert-logo-wide"
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
