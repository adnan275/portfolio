import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import NeuralGraph from '../components/NeuralGraph';
import Experience from '../sections/Experience';
import Stats from '../sections/Stats';
import CertificationsPreview from '../sections/CertificationsPreview';
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
                <NeuralGraph />
                <Experience />
                <Stats />
                <CertificationsPreview />
                {/* <ProjectsPreview /> */}
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
