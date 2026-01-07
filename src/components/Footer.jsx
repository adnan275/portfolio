import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container footer-content">
                <div className="copyright">
                    © {new Date().getFullYear()} Portfolio. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
