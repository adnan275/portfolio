import React, { useState, useEffect } from 'react';

const TypingAnimation = ({
    texts = [
        'an AI/ML Engineer',
        'a Full-Stack Developer',
        'a System Designer',
        'an Algorithmic Problem Solver',
        'a UI/UX Designer'
    ],
    typingSpeed = 85,
    deletingSpeed = 45,
    pauseDuration = 2200
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
        <span className="typing-container">
            <span className="typing-text">{currentText}</span>
        </span>
    );
};

export default TypingAnimation;
