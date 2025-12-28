import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
    return (
        <section id="about" className="section-padding about-section">
            <div className="container">
                <div className="about-grid">
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="heading-lg" style={{ marginBottom: '2rem' }}>About Me</h2>
                        <p>
                            I’m a <strong>Full Stack Developer</strong> passionate about building high-performance web applications.
                            Currently, I’m focused on mastering <strong>React, Node.js, and modern UI/UX principles</strong> to create seamless digital experiences.
                        </p>
                        <p>
                            I love <strong>solving complex problems</strong> with clean code and believe in <strong>continuous learning</strong>.
                            Whether it's frontend aesthetics or backend logic, I enjoy working across the full stack.
                        </p>

                        <div className="skills-wrapper">
                            <h3>Tech Stack</h3>
                            <motion.div
                                className="skills-grid"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                            >
                                {[
                                    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                                    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                                    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                                    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                                    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
                                    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                                    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
                                    { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
                                    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                                    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                                    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
                                    { name: 'JWT', icon: 'https://jwt.io/img/pic_logo.svg' },
                                    { name: 'Nodemailer', icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png' },
                                    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                                    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
                                    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                                    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
                                    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                                    { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' },
                                    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' }
                                ].map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        className="skill-item"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img src={skill.icon} alt={skill.name} className="skill-icon" />
                                        <span className="skill-name">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-visual"
                        initial={{ opacity: 0, x: 30, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="visual-card">
                            <div className="window-controls">
                                <span></span><span></span><span></span>
                            </div>
                            <div className="code-block">
                                <pre>
                                    <code>
                                        {`const developer = {
  name: 'Adnan',
  role: 'Full Stack Dev',
  passion: 'Building scalable apps',
  status: 'Open to work'
};`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <div className="gradient-orb"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
