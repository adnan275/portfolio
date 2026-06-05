import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

const LenisProvider = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Handle anchor links
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (!target) return;

            const href = target.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                lenis.scrollTo(element, {
                    offset: -80,
                    duration: 1.5,
                });
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
};

export default LenisProvider;
