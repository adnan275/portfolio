import React, { useState, useEffect } from 'react';

const TypingAnimation = ({
    texts = ['Full-Stack Developer', 'Problem Solver', 'Creative Thinker'],
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000
}) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fullText = texts[currentTextIndex];

        if (isPaused) {
            const pauseTimer = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseDuration);
            return () => clearTimeout(pauseTimer);
        }

        if (!isDeleting && currentText === fullText) {
            setIsPaused(true);
            return;
        }

        if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            return;
        }

        const timeout = setTimeout(() => {
            setCurrentText(prev => {
                if (isDeleting) {
                    return fullText.substring(0, prev.length - 1);
                } else {
                    return fullText.substring(0, prev.length + 1);
                }
            });
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className="typing-text">
            {currentText}
            <span className="typing-cursor">|</span>
        </span>
    );
};

export default TypingAnimation;
