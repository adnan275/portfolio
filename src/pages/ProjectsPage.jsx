import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCaseStudy from '../components/ProjectCaseStudy';
import ParticleBackground3D from '../components/ParticleBackground3D';
import '../styles/ProjectsPage.css';
import '../styles/Projects.css';

const projects = [
    {
        title: 'Sentinel — AI-Powered File Organization',
        description: 'Local-first AI agent that scans, classifies, and organizes files using a plan-before-execute flow. Built with a focus on safety and privacy, it runs entirely offline using local LLMs.',
        tags: ['Python', 'FastAPI', 'Next.js', 'Rust', 'Tauri', 'Ollama', 'SQLModel'],
        link: 'https://sentinel-ten-black.vercel.app/',
        image: '/projects/sentinel.png',
        github: 'https://github.com/adnan275/sentinel',
        details: {
            problem: 'Traditional file organization is manual, time-consuming, and often leads to cluttered digital workspaces. Cloud-based AI solutions pose privacy risks for sensitive local documents.',
            solution: 'Sentinel uses local LLMs (via Ollama) to analyze file contents and metadata, creating a logical directory structure. It follows a "Plan-then-Execute" flow where users approve the organization plan before any files are moved.',
            features: ['Local-first AI (No data leaves your machine)', 'Intelligent file classification', 'Plan-before-execute safety mechanism', 'Cross-platform support with Tauri & Rust'],
            techStack: ['Python', 'FastAPI', 'Next.js', 'Rust', 'Tauri', 'Ollama', 'SQLModel']
        }
    },
    {
        title: 'NeuraX — Vector DB & RAG Engine',
        description: 'Privacy-centric Vector Database and RAG engine supporting 768D embeddings with HNSW/KD-Tree indexing and real-time PCA visualization for secure local AI retrieval.',
        tags: ['Python', 'Flask', 'NumPy', 'Ollama', 'Llama 3.2', 'Nomic Embed', 'Vanilla JS', 'HTML5 Canvas'],
        link: 'https://huggingface.co/spaces/rizzzvi/NeuraX',
        image: '/projects/neurax.png',
        github: 'https://github.com/adnan275/NeuraX',
        details: {
            problem: 'Most RAG (Retrieval-Augmented Generation) systems rely on cloud vector databases, which can be slow and compromise data privacy. Visualizing high-dimensional embeddings is also a challenge.',
            solution: 'NeuraX implements a custom vector database from scratch using NumPy for efficient similarity searches. It includes a real-time PCA (Principal Component Analysis) visualizer to project 768D embeddings into 2D space.',
            features: ['Custom HNSW/KD-Tree indexing', '768D Vector support', 'Real-time PCA Visualization', 'Local RAG pipeline with Llama 3.2'],
            techStack: ['Python', 'Flask', 'NumPy', 'Ollama', 'Llama 3.2', 'Nomic Embed', 'Vanilla JS', 'HTML5 Canvas']
        }
    },
    {
        title: 'AI EV Charging Station Intelligence',
        description: 'Autonomous Agentic AI system using LangGraph for charger suitability prediction, wait time forecasting, and geospatial retrieval over 240,000+ stations.',
        tags: ['Python', 'LangGraph', 'LangChain', 'Groq', 'ChromaDB', 'XGBoost', 'Streamlit', 'Docker'],
        link: 'https://huggingface.co/spaces/rizzzvi/ev-charging-agent',
        image: '/projects/ev-charging-agent.png',
        github: 'https://github.com/adnan275/ev-charging-agent',
        details: {
            problem: 'EV owners face "range anxiety" and unpredictable wait times at charging stations. Existing maps often lack real-time intelligence and suitability predictions.',
            solution: 'An autonomous agent built with LangGraph that orchestrates multiple specialized agents: a Geospatial Agent for location, a Prediction Agent (XGBoost) for wait times, and a Suitability Agent for charger matching.',
            features: ['Multi-agent orchestration with LangGraph', 'Wait time forecasting with XGBoost', 'Geospatial search over 240k stations', 'RAG-enhanced station insights'],
            techStack: ['Python', 'LangGraph', 'LangChain', 'Groq', 'ChromaDB', 'XGBoost', 'Streamlit', 'Docker']
        }
    },
    {
        title: 'Data Analytics & BI Portfolio',
        description: 'A consolidated data intelligence portfolio showcasing end-to-end ETL pipelines, exploratory data analysis (EDA), and interactive Tableau/BI dashboards for financial risk and market intelligence.',
        tags: ['Python', 'SQL', 'Tableau', 'ETL Pipelines', 'Dashboard Design', 'EDA'],
        link: 'https://dva-portfolio-theta.vercel.app/',
        image: '/projects/dva-portfolio.png',
        github: 'https://github.com/adnan275/dva_portfolio',
        details: {
            problem: 'Businesses often struggle to interpret raw, messy data at scale, resulting in fragmented insights, pricing inefficiencies, and inaccurate risk forecasting.',
            solution: 'Built a unified data intelligence portfolio demonstrating complete data lifecycles (Ask → Prepare → Process → Analyze → Share). Features automated ETL pipelines, data cleaning using Python, SQL querying, and interactive Tableau dashboards (such as Loan Risk Analysis and Amazon Market Intelligence) designed for user-centric storytelling.',
            features: [
                'ETL Pipelines: Python & SQL scripts to clean, impute values, and transform datasets.',
                'Exploratory Data Analysis (EDA): Outlier detection, correlation analysis, and statistical profiling.',
                'Visual Dashboards: Purposeful Tableau designs highlighting key KPIs, filters, and actionable business trends.',
                'Compound Risk Metrics: Evaluates Loan-to-Value (LTV) and Debt-to-Income (DTI) predictors.'
            ],
            techStack: ['Python', 'SQL', 'Tableau', 'Pandas', 'ETL', 'EDA', 'Git']
        }
    },
    {
        title: 'Socratic Study Buddy',
        description: 'AI-powered Socratic tutor with intelligent guardrails that guides learning through questions, not answers. Features context retrieval and session management.',
        tags: ['Flask', 'Python', 'OpenAI API', 'JavaScript', 'CSS3', 'Vercel'],
        link: 'https://socratic-study-buddy.vercel.app/',
        image: '/projects/socratic-buddy.png',
        github: 'https://github.com/adnan275/socratic-study-buddy',
        details: {
            problem: 'Students often rely on AI to give them direct answers, which hinders deep learning and critical thinking.',
            solution: 'A tutor that uses the Socratic method to guide students toward answers by asking probing questions. It includes guardrails to prevent the AI from simply "giving away" the solution.',
            features: ['Socratic questioning logic', 'Context-aware tutoring', 'Session persistence', 'Intelligent guardrails'],
            techStack: ['Flask', 'Python', 'OpenAI API', 'JavaScript', 'CSS3', 'Vercel']
        }
    },
    {
        title: 'GigFlow',
        description: 'Real-time freelance marketplace platform for posting gigs, bidding, and live messaging with Socket.io integration.',
        tags: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
        link: 'https://service-hive-zeta.vercel.app/',
        image: '/projects/service-hive.png',
        github: 'https://github.com/adnan275/service-hive',
        details: {
            problem: 'Freelance platforms often lack real-time interaction, leading to slow communication between clients and freelancers.',
            solution: 'A high-performance marketplace with real-time bidding and instant messaging powered by Socket.io. Features a smooth, modern UI built with Framer Motion.',
            features: ['Real-time bidding system', 'Instant messaging with Socket.io', 'Role-based dashboards', 'Secure payment simulation'],
            techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'TailwindCSS']
        }
    },
    {
        title: 'Livesitter',
        description: 'Full-stack RTSP livestream overlay application with draggable/resizable text and image overlays in real-time with persistent storage.',
        tags: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'FFmpeg', 'HLS.js'],
        link: 'https://livesitter-woad.vercel.app/',
        image: '/projects/livesitter.png',
        github: 'https://github.com/adnan275/livesitter',
        details: {
            problem: 'Adding dynamic overlays to RTSP streams usually requires complex OBS setups or expensive hardware.',
            solution: 'A web-based solution that allows users to add draggable and resizable overlays directly onto a livestream using FFmpeg for stream processing and HLS.js for playback.',
            features: ['Draggable/Resizable overlays', 'Real-time stream processing', 'Persistent overlay storage', 'Low-latency HLS playback'],
            techStack: ['React', 'Node.js', 'FFmpeg', 'HLS.js', 'MongoDB']
        }
    },
    {
        title: 'Zync — Video Calling Platform',
        description: 'Real-time video calling platform with 15,000+ calls, 50,000+ messages, 98% satisfaction, <0.1% error rate.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stream', 'JWT'],
        link: 'https://zync-five.vercel.app/login',
        image: '/projects/zync.png',
        github: 'https://github.com/adnan275/zync',
        details: {
            problem: 'Building a reliable, low-latency video communication platform that scales is technically challenging and often expensive.',
            solution: 'Leveraged GetStream.io for robust WebRTC infrastructure combined with a custom Node.js backend for user management and messaging.',
            features: ['High-quality video/audio calls', 'Real-time chat integration', 'JWT-based secure authentication', 'Call history and analytics'],
            techStack: ['React', 'Node.js', 'Express', 'Stream API', 'MongoDB']
        }
    },
    {
        title: 'Presento Treasure — E-commerce',
        description: 'Startup-grade E-commerce with modular API, role-based auth, and core commerce logic.',
        tags: ['React', 'Node.js', 'MySql', 'Express'],
        link: 'https://fullstack-presento-swaj.vercel.app/',
        image: '/projects/presento.png',
        github: 'https://github.com/adnan275/fullstack-presento',
        details: {
            problem: 'Many e-commerce solutions are either too simple or overly complex for startups to customize.',
            solution: 'Built a modular, scalable e-commerce engine with a clean separation between the React frontend and the MySQL-backed Express API.',
            features: ['Role-based access control', 'Dynamic product management', 'Secure checkout flow', 'Order tracking system'],
            techStack: ['React', 'Node.js', 'MySQL', 'Express', 'Sequelize']
        }
    },
    {
        title: 'Taskly — Task Manager',
        description: 'Auth-based Task Manager for organizing personal workflows.',
        tags: ['React', 'Firebase', 'Auth', 'JavaScript'],
        link: 'https://auth-taskly.vercel.app/',
        image: '/projects/taskly-real.png',
        github: 'https://github.com/adnan275/auth-taskly',
        details: {
            problem: 'Users need a simple, fast, and reliable way to sync tasks across devices without complex setups.',
            solution: 'Utilized Firebase for real-time data synchronization and seamless Google/Email authentication.',
            features: ['Real-time task syncing', 'Google Authentication', 'Drag-and-drop organization', 'Offline support'],
            techStack: ['React', 'Firebase', 'Firestore', 'Context API']
        }
    },
    {
        title: 'Stone Paper Scissors',
        description: 'Interactive game with score tracking and responsive UI.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://stone-paper-scissors-blue-pi.vercel.app/',
        image: '/projects/rps-update.png',
        github: 'https://github.com/adnan275/stone-paper-scissors-blue-pi',
        details: {
            problem: 'Creating engaging, state-managed games using only vanilla JavaScript requires careful DOM manipulation and logic.',
            solution: 'Implemented a clean state machine in vanilla JS to handle game rounds, score tracking, and UI updates.',
            features: ['Score persistence', 'Interactive animations', 'Responsive game board', 'AI opponent logic'],
            techStack: ['JavaScript', 'HTML5', 'CSS3']
        }
    },
    {
        title: 'Password Strength Checker',
        description: 'Real-time password validation utility for security awareness.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://password-strength-checker-psi-one.vercel.app/',
        image: '/projects/password.png',
        github: 'https://github.com/adnan275/password-strength-checker',
        details: {
            problem: 'Users often use weak passwords because they lack immediate feedback on security vulnerabilities.',
            solution: 'A real-time validation tool that checks passwords against complexity rules (entropy, patterns, length) as the user types.',
            features: ['Real-time entropy calculation', 'Visual strength indicator', 'Security best-practice tips', 'Zero-data-storage privacy'],
            techStack: ['JavaScript', 'RegEx', 'HTML5', 'CSS3']
        }
    },
    {
        title: 'Capstone Project — Full Stack Web',
        description: 'Comprehensive web solution demonstrating full-stack capabilities.',
        tags: ['CSS', 'HTML', 'JavaScript'],
        link: 'https://s-w-project-sigma.vercel.app/',
        image: '/projects/capstone-real.jpg',
        github: 'https://github.com/adnan275/s-w-project',
        details: {
            problem: 'Integrating multiple disparate web technologies into a cohesive, professional-grade application.',
            solution: 'Developed a comprehensive web platform focusing on semantic HTML, modern CSS layouts, and interactive JS components.',
            features: ['Responsive multi-page layout', 'Interactive data displays', 'Form validation logic', 'Performance optimized assets'],
            techStack: ['HTML5', 'CSS3', 'JavaScript', 'Modern Web APIs']
        }
    },
    {
        title: 'QR Scanner & Generator',
        description: 'Utility tool to scan and generate QR codes instantly.',
        tags: ['JavaScript', 'API', 'Tool', 'HTML', 'CSS'],
        link: 'https://qr-scanner-ten-tawny.vercel.app/',
        image: '/projects/qr-new.png',
        github: 'https://github.com/adnan275/qr-scanner',
        details: {
            problem: 'Finding a clean, ad-free tool to quickly generate or scan QR codes can be difficult.',
            solution: 'Built a lightweight, fast utility using the QR Code API for generation and browser-based scanning capabilities.',
            features: ['Instant QR generation', 'Camera-based scanning', 'Downloadable QR images', 'Clean, ad-free interface'],
            techStack: ['JavaScript', 'QR API', 'HTML5', 'CSS3']
        }
    }
];

const ProjectCard = ({ project, variants, onViewDetails }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [imgLoaded, setImgLoaded] = useState(false);

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
                    <>
                        <div className={`img-skeleton${imgLoaded ? ' hidden' : ''}`} />
                        <img
                            src={project.image}
                            alt={project.title}
                            className={`project-img${imgLoaded ? ' loaded' : ''}`}
                            loading="lazy"
                            onLoad={() => setImgLoaded(true)}
                        />
                    </>
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
                <div className="card-actions">
                    <button
                        className="card-link case-study-trigger"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(project);
                        }}
                    >
                        View Details
                    </button>
                    <div className="card-links-right">
                        <span className="separator">✦</span>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-link">GitHub</a>
                        <span className="separator">✦</span>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-link">Demo</a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

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
        <div className="projects-page">
            <div className="projects-background">
                <ParticleBackground3D particleCount={300} />
                <div className="glow-blob glow-blob-1"></div>
                <div className="glow-blob glow-blob-2"></div>
                <div className="grid-overlay"></div>
            </div>
            <Navbar />
            <main className="projects-main">
                <div className="container">
                    <Link to="/" className="back-link">
                        ← Back to Home
                    </Link>
                    <motion.div
                        className="page-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="heading-xl">All Projects</h1>
                        <p className="page-subtitle">
                            A collection of my work showcasing Agentic AI systems, full-stack development, UI/UX design, and problem-solving skills.
                        </p>
                    </motion.div>

                    <motion.div
                        className="projects-grid"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                project={project}
                                variants={item}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </motion.div>
                </div>
            </main>
            <ProjectCaseStudy
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <Footer />
        </div>
    );
};

export default ProjectsPage;
