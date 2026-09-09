import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Skills.css';

const skillCategories = [
    {
        id: 'aiml',
        name: 'AI & ML Core',
        icon: '🤖',
        color: '#00f0ff',
        skills: [
            { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
            { name: 'LangGraph', icon: 'https://img.icons8.com/color/48/000000/graph.png' },
            { name: 'RAG Architecture', icon: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png' },
            { name: 'LLMs Integration', icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' },
            { name: 'Groq API', icon: 'https://console.groq.com/powered-by-groq-dark.svg' },
            { name: 'HuggingFace', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg' },
            { name: 'Agentic AI', icon: 'https://cdn-icons-png.flaticon.com/512/10433/10433048.png' }
        ]
    },
    {
        id: 'fullstack',
        name: 'Full-Stack Systems',
        icon: '💻',
        color: '#c084fc',
        skills: [
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'JavaScript (ES6+)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
            { name: 'Prisma ORM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
            { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
        ]
    },
    {
        id: 'data',
        name: 'Data & Analytics',
        icon: '📊',
        color: '#ffb703',
        skills: [
            { name: 'SQL Querying', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg' },
            { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
            { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
            { name: 'Tableau', icon: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
            { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
            { name: 'MS Excel', icon: 'https://img.icons8.com/color/48/000000/microsoft-excel-2019.png' },
            { name: 'Google Sheets', icon: 'https://img.icons8.com/color/48/000000/google-sheets.png' }
        ]
    },
    {
        id: 'tools',
        name: 'Production & Tools',
        icon: '⚡',
        color: '#34d399',
        skills: [
            { name: 'System Design', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620971.png' },
            { name: 'OOP & SOLID', icon: 'https://cdn-icons-png.flaticon.com/512/2592/2592317.png' },
            { name: 'REST APIs & JWT', icon: 'https://jwt.io/img/pic_logo.svg' },
            { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'Vercel Deployment', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
            { name: 'Figma UI/UX', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
            { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' }
        ]
    }
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState('all');

    const activeCategory = skillCategories.find(c => c.id === activeTab);
    const displayedSkills = activeTab === 'all'
        ? skillCategories.flatMap(c => c.skills)
        : activeCategory ? activeCategory.skills : [];

    return (
        <section id="skills" className="section-padding skills-section">
            <div className="container">
                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="skills-badge">
                        <span className="badge-dot"></span>
                        Tech Stack
                    </span>
                    <h2 className="heading-lg">Secret Sauce</h2>
                    <p className="skills-subtitle">
                        A curated selection of modern technologies and frameworks, engineered for high performance, structural reliability, and seamless digital experiences.
                    </p>
                </motion.div>

                {/* Category Tab Selector */}
                <div className="skills-tabs-container">
                    <button
                        className={`skills-tab ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        🌐 All Competencies
                    </button>
                    {skillCategories.map(cat => (
                        <button
                            key={cat.id}
                            className={`skills-tab ${activeTab === cat.id ? 'active' : ''}`}
                            style={{ '--tab-color': cat.color }}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            <span>{cat.icon}</span> {cat.name}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <motion.div className="skills-display-grid" layout>
                    <AnimatePresence mode="popLayout">
                        {displayedSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="skill-card glass-panel"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: index * 0.02 }}
                                whileHover={{ y: -4, scale: 1.05 }}
                            >
                                <img src={skill.icon} alt={skill.name} className="skill-card-icon" />
                                <span className="skill-card-name">{skill.name}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
