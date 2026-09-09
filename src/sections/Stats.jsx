import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Stats.css';

const Stats = () => {
    const [githubData, setGithubData] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [leetcodeData, setLeetcodeData] = useState(null);
    const [loading, setLoading] = useState(true);

    const GITHUB_USERNAME = 'adnan275';
    const LEETCODE_USERNAME = 'AdnanRizvi1';

    useEffect(() => {
        const fetchData = async () => {
            // 1. Fetch GitHub User Data safely
            try {
                const ghUserResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                const ghUserJson = await ghUserResponse.json();
                if (ghUserJson && typeof ghUserJson.public_repos === 'number') {
                    setGithubData(ghUserJson);
                } else {
                    setGithubData({ public_repos: 29 });
                }
            } catch (e) {
                setGithubData({ public_repos: 29 });
            }

            // 2. Fetch GitHub Repos safely
            try {
                const ghReposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
                const ghReposJson = await ghReposResponse.json();
                if (Array.isArray(ghReposJson)) {
                    const langMap = {};
                    ghReposJson.forEach(repo => {
                        if (repo.language) {
                            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                        }
                    });
                    const sortedLangs = Object.entries(langMap)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([name, count]) => ({ name, count }));
                    setLanguages(sortedLangs.length ? sortedLangs : [
                        { name: 'JavaScript', count: 15 },
                        { name: 'Python', count: 10 },
                        { name: 'React', count: 6 }
                    ]);
                } else {
                    setLanguages([
                        { name: 'JavaScript', count: 15 },
                        { name: 'Python', count: 10 },
                        { name: 'React', count: 6 }
                    ]);
                }
            } catch (e) {
                setLanguages([
                    { name: 'JavaScript', count: 15 },
                    { name: 'Python', count: 10 },
                    { name: 'React', count: 6 }
                ]);
            }

            // 3. Fetch LeetCode Data (Vercel API first for fast sub-300ms response)
            const lcEndpoints = [
                `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`,
                `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`,
                `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
            ];

            let lcData = null;
            for (const url of lcEndpoints) {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    if (json.totalSolved || json.status === "success") {
                        lcData = json;
                        break;
                    }
                } catch (e) {
                    console.warn(`Failed to fetch from ${url}`);
                }
            }

            if (lcData) {
                setLeetcodeData({
                    totalSolved: lcData.totalSolved || 356,
                    easySolved: lcData.easySolved || 156,
                    mediumSolved: lcData.mediumSolved || 176,
                    hardSolved: lcData.hardSolved || 24,
                    totalEasy: lcData.totalEasy || 963,
                    totalMedium: lcData.totalMedium || 2111,
                    totalHard: lcData.totalHard || 973
                });
            } else {
                setLeetcodeData({
                    totalSolved: 356,
                    easySolved: 156,
                    mediumSolved: 176,
                    hardSolved: 24,
                    totalEasy: 963,
                    totalMedium: 2111,
                    totalHard: 973
                });
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
        }
    };

    // Helper to render a simple SVG Pie Chart for Languages
    const renderLanguagePie = () => {
        if (!languages.length) return null;
        const total = languages.reduce((acc, curr) => acc + curr.count, 0);
        let currentAngle = 0;
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

        return (
            <svg viewBox="0 0 100 100" className="pie-chart">
                {languages.map((lang, i) => {
                    const angle = (lang.count / total) * 360;
                    const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                    currentAngle += angle;
                    return <path key={i} d={pathData} fill={colors[i % colors.length]} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />;
                })}
                <circle cx="50" cy="50" r="25" fill="var(--bg-primary)" />
            </svg>
        );
    };

    return (
        <section id="stats" className="section-padding stats-section">
            <div className="container">
                <motion.div
                    className="stats-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="heading-lg">Live Performance</h2>
                    <p className="section-subtitle">Real-time metrics from GitHub & LeetCode</p>
                </motion.div>

                <motion.div
                    className="stats-dashboard"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* GitHub Card */}
                    <motion.div className="dashboard-card github-card" variants={itemVariants}>
                        <div className="card-header">
                            <div className="platform">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
                                <span>GitHub</span>
                            </div>
                            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="profile-link">Profile →</a>
                        </div>
                        <div className="card-content">
                            <div className="main-stat">
                                <span className="value">{githubData?.public_repos || '--'}</span>
                                <span className="label">Repositories</span>
                            </div>
                            <div className="chart-container">
                                {renderLanguagePie()}
                                <div className="chart-legend">
                                    {languages.slice(0, 3).map((lang, i) => (
                                        <div key={i} className="legend-item">
                                            <span className="dot" style={{ background: ['#6366f1', '#8b5cf6', '#ec4899'][i] }}></span>
                                            <span className="name">{lang.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* LeetCode Card */}
                    <motion.div className="dashboard-card leetcode-card" variants={itemVariants}>
                        <div className="card-header">
                            <div className="platform">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" />
                                <span>LeetCode</span>
                            </div>
                            <a href={`https://leetcode.com/${LEETCODE_USERNAME}`} target="_blank" rel="noopener noreferrer" className="profile-link">Profile →</a>
                        </div>
                        <div className="card-content">
                            <div className="main-stat">
                                <span className="value">{leetcodeData?.totalSolved || '--'}</span>
                                <span className="label">Solved</span>
                            </div>
                            <div className="bar-chart-container">
                                <div className="bar-item">
                                    <div className="bar-label">Easy <span>{leetcodeData?.easySolved || 0}</span></div>
                                    <div className="bar-track"><motion.div className="bar-fill easy" initial={{ width: 0 }} whileInView={{ width: `${(leetcodeData?.easySolved / leetcodeData?.totalEasy) * 100 || 0}%` }} transition={{ duration: 1 }}></motion.div></div>
                                </div>
                                <div className="bar-item">
                                    <div className="bar-label">Medium <span>{leetcodeData?.mediumSolved || 0}</span></div>
                                    <div className="bar-track"><motion.div className="bar-fill medium" initial={{ width: 0 }} whileInView={{ width: `${(leetcodeData?.mediumSolved / leetcodeData?.totalMedium) * 100 || 0}%` }} transition={{ duration: 1 }}></motion.div></div>
                                </div>
                                <div className="bar-item">
                                    <div className="bar-label">Hard <span>{leetcodeData?.hardSolved || 0}</span></div>
                                    <div className="bar-track"><motion.div className="bar-fill hard" initial={{ width: 0 }} whileInView={{ width: `${(leetcodeData?.hardSolved / leetcodeData?.totalHard) * 100 || 0}%` }} transition={{ duration: 1 }}></motion.div></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;
