import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['hero', 'about', 'work', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/', type: 'route' },
        { name: 'About', href: '#about', type: 'hash' },
        { name: 'Projects', href: '/projects', type: 'route' },
        { name: 'Contact', href: '#contact', type: 'hash' },
    ];

    const handleNavClick = (href) => {
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container nav-content">
                <motion.div
                    className="logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <span className="logo-text">Portfolio</span>
                    <span className="dot">.</span>
                </motion.div>

                <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link, index) => (
                        link.type === 'route' ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`nav-link ${location.pathname === link.href ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                                <span className="nav-link-underline"></span>
                            </Link>
                        ) : (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(link.href);
                                }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.4 }}
                            >
                                {link.name}
                                <span className="nav-link-underline"></span>
                            </motion.a>
                        )
                    ))}
                </div>

                <button
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;

