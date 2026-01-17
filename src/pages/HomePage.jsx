import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import ProjectsPreview from '../sections/ProjectsPreview';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

function HomePage() {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Hero />
                <About />
                <ProjectsPreview />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
