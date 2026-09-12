import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    IoSparkles, 
    IoClose, 
    IoPaperPlane, 
    IoTrashOutline, 
    IoHardwareChipOutline,
    IoTerminalOutline,
    IoPersonOutline,
    IoChevronDown,
    IoArrowForward,
    IoOpenOutline
} from 'react-icons/io5';
import '../styles/NeuralAIChatbot.css';

// Comprehensive Knowledge Base built directly from Adnan's Actual Projects & Bio
const KNOWLEDGE_BASE = {
    bio: {
        keywords: [
            'adnan', 'who is adnan', 'adnan rizvi', 'who is adnan rizvi', 'about adnan', 
            'who is he', 'bio', 'about', 'introduction', 'tell me about adnan', 
            'background', 'who are you', 'what is your name', 'profile', 'software engineer'
        ],
        response: "**Adnan Rizvi** is a **Software Engineer & AI Systems Developer** with **2+ Years** of experience building high-performance AI agents, RAG engines, 3D web interfaces, and scalable full-stack backends.\n\n" +
            "• **Key Highlights**: Built **Sentinel (Local AI Agent)**, **NeuraX (Vector DB & RAG Engine)**, and **LangGraph EV Charging AI**.\n" +
            "• **Problem Solving**: Solved **400+ DSA problems** on LeetCode focusing on optimization and OOP/SOLID principles.\n" +
            "• **Tech Stack**: PyTorch, LangChain, FastAPI, React 19, Three.js, Node.js, PostgreSQL, Docker\n\n" +
            "🔗 Check out his [Featured Projects](/projects), explore his [AI & Web Stack](#skills), or send a message via [Contact Form](#contact).",
        chips: ['🚀 Featured Projects', '🧠 NeuraX & AI Engine', '🤖 Sentinel AI Agent', '✉️ Contact Details']
    },
    greetings: {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'namaste', 'whaddup', 'sup', 'what can you do', 'help', 'bot', 'assistant'],
        response: "Hello & welcome! 👋 I am **Adnan's AI Assistant**, built specifically to assist you in exploring his work, code architecture, and experience.\n\nWhether you're reviewing his **live AI projects (Sentinel & NeuraX)**, checking his **400+ LeetCode DSA background**, or looking to **connect directly**, I am here to help you!\n\nTap a suggestion below or ask me anything!",
        chips: ['👤 Who is Adnan?', '🚀 Flagship Projects', '🧠 NeuraX Vector DB', '🤖 Sentinel AI']
    },
    sentinel: {
        keywords: ['sentinel', 'file organizer', 'local ai', 'ollama', 'tauri', 'rust', 'privacy'],
        response: "🤖 **Sentinel — AI-Powered File Organization Agent**\n\n" +
            "Local-first privacy AI agent that scans, classifies, and organizes files using a plan-before-execute flow. Runs 100% offline using local LLMs (Ollama).\n\n" +
            "• **Tech Stack**: Python, FastAPI, Next.js, Rust, Tauri, Ollama, SQLModel\n" +
            "• **Live Demo**: [Sentinel Live Demo](https://sentinel-ten-black.vercel.app/)",
        chips: ['🧠 NeuraX Vector DB', '⚡ EV Charging AI', '🚀 All Projects']
    },
    neurax: {
        keywords: ['neurax', 'vector db', 'vector database', 'embeddings', 'hnsw', 'llama 3.2', 'nomic', 'rag engine'],
        response: "🧠 **NeuraX — Vector Database & RAG Engine**\n\n" +
            "Privacy-centric Vector Database and RAG engine supporting 768D embeddings with HNSW/KD-Tree indexing and real-time PCA visualization for secure local AI retrieval.\n\n" +
            "• **Tech Stack**: Python, FastAPI, NumPy, Hugging Face, Ollama (Llama 3.2), Nomic Embed, HNSW\n" +
            "• **Live Hugging Face Space**: [NeuraX Space](https://huggingface.co/spaces/rizzzvi/NeuraX)",
        chips: ['🤖 Sentinel AI Agent', '⚡ EV Charging AI', '🚀 All Projects']
    },
    evcharging: {
        keywords: ['ev', 'ev charging', 'langgraph', 'chromadb', 'station', 'groq', 'agentic', 'geospatial'],
        response: "⚡ **AI EV Charging Station Intelligence**\n\n" +
            "Autonomous Agentic AI system using LangGraph for charger suitability prediction, wait time forecasting, and geospatial retrieval over 240,000+ charging stations.\n\n" +
            "• **Tech Stack**: Python, LangGraph, LangChain, Groq, ChromaDB, XGBoost, Streamlit, Docker\n" +
            "• **Live Demo**: [EV Charging Agent Space](https://huggingface.co/spaces/rizzzvi/ev-charging-agent)",
        chips: ['🧠 NeuraX Vector DB', '🤖 Sentinel AI Agent', '🚀 All Projects']
    },
    zync: {
        keywords: ['zync', 'video call', 'video calling', 'stream', 'chat app'],
        response: "📹 **Zync — Real-Time Video Calling Platform**\n\n" +
            "Real-time video calling & messaging platform that powered 15,000+ video calls and 50,000+ messages with <0.1% error rate.\n\n" +
            "• **Tech Stack**: React, Node.js, Express, MongoDB, Stream API, JWT\n" +
            "• **Live App**: [Zync Live Demo](https://zync-five.vercel.app/login)",
        chips: ['💼 GigFlow Marketplace', '🛍️ Presento Treasure', '🚀 All Projects']
    },
    projects: {
        keywords: ['project', 'projects', 'portfolio', 'work', 'built', 'apps', 'chess', 'neural', 'stockfish', 'rag', 'github', 'demo', 'sentinel', 'neurax', 'gigflow', 'zync', 'presento'],
        response: "Here are Adnan's **actual flagship projects**:\n\n" +
            "1. **🤖 Sentinel (AI File Organizer)**: Privacy-centric local AI agent running Ollama & Tauri.\n" +
            "   🔗 [Live Demo](https://sentinel-ten-black.vercel.app/)\n" +
            "2. **🧠 NeuraX (Vector DB & RAG Engine)**: 768D embeddings with HNSW indexing.\n" +
            "   🔗 [HuggingFace Space](https://huggingface.co/spaces/rizzzvi/NeuraX)\n" +
            "3. **⚡ EV Charging AI Agent**: LangGraph agent over 240,000+ stations.\n" +
            "   🔗 [HuggingFace Space](https://huggingface.co/spaces/rizzzvi/ev-charging-agent)\n" +
            "4. **🛍️ Presento Treasure**: E-commerce with sub-80ms catalog search.\n" +
            "   🔗 [Live Demo](https://fullstack-presento-swaj.vercel.app/)\n" +
            "5. **💼 GigFlow Marketplace**: Real-time freelance market with Socket.io.\n" +
            "   🔗 [Live Demo](https://service-hive-zeta.vercel.app/)\n" +
            "6. **📹 Zync Video Calling**: Real-time video web app with 15k+ calls.\n" +
            "   🔗 [Live Demo](https://zync-five.vercel.app/login)\n\n" +
            "🔗 See full cards & specs on the [Projects Page](/projects).",
        chips: ['🤖 Sentinel AI Agent', '🧠 NeuraX Vector DB', '⚡ EV Charging AI']
    },
    dsa: {
        keywords: ['dsa', 'leetcode', 'algorithms', 'data structures', 'problem solving', 'logic', 'solid', 'oop', 'code'],
        response: "Adnan has a strong foundation in **Data Structures & Algorithms**:\n\n" +
            "• **LeetCode & Problem Solving**: Solved **400+ algorithmic problems** covering Dynamic Programming, Graphs, Trees, and System Optimization.\n" +
            "• **Architecture Principles**: Applies **OOP** (Object-Oriented Programming) and **SOLID principles** for clean, maintainable code.\n\n" +
            "🔗 Explore his project code repositories on [GitHub Profile](https://github.com).",
        chips: ['🚀 Featured Projects', '🧠 AI/ML Stack', '👤 Who is Adnan?']
    },
    aiml: {
        keywords: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'pytorch', 'tensorflow', 'scikit', 'llm', 'rag', 'nlp', 'computer vision', 'deep learning', 'model', 'python', 'huggingface', 'vector', 'neural', 'langchain', 'agentic', 'ollama', 'chromadb'],
        response: "Adnan's **AI/ML & Generative Intelligence Architecture**:\n\n" +
            "• **Generative AI & LLMs**: RAG Pipelines (NeuraX Vector DB), Agentic AI Workflows (LangGraph EV Agent), Ollama, Llama 3.2, LangChain, ChromaDB\n" +
            "• **Frameworks & ML**: PyTorch, TensorFlow, Scikit-Learn, XGBoost, OpenCV, NumPy, Pandas\n" +
            "• **Deployment & MLOps**: FastAPI, Docker, Hugging Face Spaces, Model Optimization\n\n" +
            "🔗 View interactive skill graph in the [Skills & Neural Section](#skills).",
        chips: ['🤖 Sentinel AI Agent', '🧠 NeuraX Vector DB', '✉️ Contact Details']
    },
    fullstack: {
        keywords: ['skill', 'skills', 'stack', 'tech', 'fullstack', 'frontend', 'backend', 'react', 'node', 'express', 'javascript', 'typescript', 'css', 'three', 'webgl', 'database', 'postgres', 'docker', 'vite', 'sql', 'mern', 'prisma', 'mongodb'],
        response: "Adnan's **Full-Stack & Web Architecture**:\n\n" +
            "• **Frontend**: React 19, TypeScript, JavaScript, Three.js / R3F, Framer Motion, TailwindCSS\n" +
            "• **Backend & APIs**: Node.js, Express, Python, FastAPI, Prisma, MySQL, MongoDB, Socket.io, WebSockets\n" +
            "• **DevOps & Tools**: PostgreSQL, Redis, Docker, Git/GitHub, Linux, Vercel\n\n" +
            "🔗 Check out the interactive [Skills & Neural Graph](#skills).",
        chips: ['🧠 AI/ML Stack', '💼 Experience', '🚀 Featured Projects']
    },
    experience: {
        keywords: ['experience', 'work', 'job', 'role', 'company', 'career', 'history', 'internship', 'background', 'years'],
        response: "Adnan's **Software & AI Engineering Background**:\n\n" +
            "• **2+ Years Experience**: Building production web applications, RAG engines, 3D visualizers, and AI agents.\n" +
            "• **10+ Systems Delivered**: End-to-end full-stack architectures, Sentinel AI Organizer, Zync Video Calling, and Data Analytics dashboards.\n" +
            "• **Focus**: Latency optimization, clean maintainable code, and scalable architecture.\n\n" +
            "🔗 View full career details in the [Experience Section](#experience).",
        chips: ['👤 Who is Adnan?', '🚀 Featured Projects', '✉️ Contact Details']
    },
    contact: {
        keywords: ['contact', 'email', 'reach', 'hire', 'linkedin', 'github', 'phone', 'message', 'talk', 'connect', 'social', 'number', 'mail', 'adnan.rizvi2004@gmail.com', '765-209-2174'],
        response: "Here are Adnan's direct contact details:\n\n" +
            "• 📧 **Email**: [adnan.rizvi2004@gmail.com](mailto:adnan.rizvi2004@gmail.com)\n" +
            "• 📞 **Phone**: **765-209-2174**\n" +
            "• ✉️ **Message**: Send a note directly via the [Contact Form](#contact)\n" +
            "• 🐙 **GitHub**: [GitHub Profile](https://github.com)\n" +
            "• 💼 **LinkedIn**: [LinkedIn Profile](https://linkedin.com)",
        chips: ['🚀 Featured Projects', '⚡ Why Hire Adnan?', '👤 Who is Adnan?']
    },
    hire: {
        keywords: ['why hire', 'hire', 'recruiter', 'job', 'opportunity', 'relocate', 'full-time', 'remote', 'interview', 'salary'],
        response: "Why hire **Adnan Rizvi**?\n\n" +
            "✅ **Proven AI Systems**: Built production AI agents (Sentinel, NeuraX Vector DB, LangGraph EV Agent).\n" +
            "✅ **400+ LeetCode DSA Problems**: Sharp algorithmic thinking, clean OOP logic, and low-latency coding.\n" +
            "✅ **Full-Stack Proficiency**: Mastery from React 19 / Three.js UI to Node.js / FastAPI & Docker backends.\n\n" +
            "🔗 Contact Adnan directly via the [Contact Form](#contact) or email [adnan.rizvi2004@gmail.com](mailto:adnan.rizvi2004@gmail.com)!",
        chips: ['✉️ Contact Details', '🚀 Featured Projects', '🧠 AI/ML Stack']
    }
};

export default function NeuralAIChatbot() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: "Hello & welcome! 👋 I am **Adnan's AI Assistant**, built specifically to assist you in exploring his work, code architecture, and experience.\n\nWhether you're exploring his **live AI projects (Sentinel, NeuraX)**, reviewing his **400+ LeetCode DSA background**, or looking to **connect directly**, I am here to help you!\n\nClick a suggestion chip below or type any question to get started!",
            timestamp: getFormattedTime(),
            chips: ['👤 Who is Adnan?', '🚀 Flagship Projects', '🤖 Sentinel AI Agent', '🧠 NeuraX Vector DB']
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [unreadCount, setUnreadCount] = useState(1);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    function getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
            const timer = setTimeout(() => {
                scrollToBottom();
            }, 60);
            setTimeout(() => inputRef.current?.focus(), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, messages, isTyping]);

    const handleLinkClick = (e, url) => {
        e.preventDefault();
        if (url.startsWith('#')) {
            const targetId = url.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (url.startsWith('/')) {
            navigate(url);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    // Fast Local NLP Intent Engine
    const findBestResponse = (query) => {
        const cleanQuery = query.toLowerCase().trim();
        const tokens = cleanQuery.split(/\s+/);
        
        let bestCategory = null;
        let highestScore = 0;

        Object.keys(KNOWLEDGE_BASE).forEach(category => {
            const data = KNOWLEDGE_BASE[category];
            let categoryScore = 0;

            data.keywords.forEach(keyword => {
                const lowerKeyword = keyword.toLowerCase();
                if (cleanQuery.includes(lowerKeyword)) {
                    categoryScore += lowerKeyword.length * 3;
                }
                tokens.forEach(token => {
                    if (token.length > 2 && lowerKeyword.includes(token)) {
                        categoryScore += token.length * 1.5;
                    }
                });
            });

            if (categoryScore > highestScore) {
                highestScore = categoryScore;
                bestCategory = data;
            }
        });

        if (highestScore > 3 && bestCategory) {
            return bestCategory;
        }

        if (cleanQuery.includes('who') || cleanQuery.includes('adnan') || cleanQuery.includes('about') || cleanQuery.includes('bio')) {
            return KNOWLEDGE_BASE.bio;
        }

        return {
            response: "**Adnan Rizvi** is a **Software Engineer & AI Developer** (2+ Years Exp, 400+ LeetCode DSA, 10+ Projects).\n\n" +
                "Here are key projects you can ask me about:\n" +
                "• **🤖 Sentinel**: AI File Organizer Agent ([Live Demo](https://sentinel-ten-black.vercel.app/))\n" +
                "• **🧠 NeuraX**: Vector DB & RAG Engine ([HuggingFace Space](https://huggingface.co/spaces/rizzzvi/NeuraX))\n" +
                "• **⚡ EV Charging AI**: LangGraph agent ([HuggingFace Space](https://huggingface.co/spaces/rizzzvi/ev-charging-agent))\n\n" +
                "🔗 Explore all projects on the [Projects Page](/projects) or send a message via [Contact Form](#contact).",
            chips: ['👤 Who is Adnan?', '🚀 Flagship Projects', '🤖 Sentinel AI Agent', '✉️ Contact Details']
        };
    };

    const handleSendMessage = (textToSend) => {
        const text = textToSend || inputValue;
        if (!text.trim()) return;

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: text.trim(),
            timestamp: getFormattedTime()
        };

        setMessages(prev => [...prev, userMsg]);
        if (!textToSend) setInputValue('');
        setIsTyping(true);
        setTimeout(scrollToBottom, 50);

        setTimeout(() => {
            const aiData = findBestResponse(text);
            setIsTyping(false);

            const aiMsgId = Date.now() + 1;
            const fullText = aiData.response;
            const latency = Math.floor(Math.random() * 8) + 8;

            // Add placeholder AI message
            const newAiMsg = {
                id: aiMsgId,
                sender: 'ai',
                text: '',
                timestamp: getFormattedTime(),
                chips: [],
                isStreaming: true,
                latency: latency
            };

            setMessages(prev => [...prev, newAiMsg]);

            let charIdx = 0;
            const chunkSize = 2; // type 2 characters per tick
            const tickSpeed = 12; // 12ms tick rate for natural speed

            const typeInterval = setInterval(() => {
                charIdx += chunkSize;
                const currentText = fullText.slice(0, charIdx);

                setMessages(prev => prev.map(msg => {
                    if (msg.id === aiMsgId) {
                        return { ...msg, text: currentText };
                    }
                    return msg;
                }));

                scrollToBottom();

                if (charIdx >= fullText.length) {
                    clearInterval(typeInterval);
                    setMessages(prev => prev.map(msg => {
                        if (msg.id === aiMsgId) {
                            return { ...msg, text: fullText, chips: aiData.chips, isStreaming: false };
                        }
                        return msg;
                    }));
                    setTimeout(scrollToBottom, 100);
                }
            }, tickSpeed);

        }, 450);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                id: Date.now(),
                sender: 'ai',
                text: "Memory cleared. Ask me anything about **Adnan's actual projects** (**Sentinel**, **NeuraX**, **Zync**)!",
                timestamp: getFormattedTime(),
                chips: ['👤 Who is Adnan?', '🚀 Flagship Projects', '🧠 NeuraX Vector DB']
            }
        ]);
    };

    // Helper to render bold text, markdown links [text](url), and `code` with typewriter cursor
    const renderFormattedText = (text, isStreaming = false) => {
        if (!text) return null;
        const lines = text.split('\n');

        return lines.map((line, idx) => {
            const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
            const parts = line.split(regex);

            const formattedLine = parts.map((part, pIdx) => {
                if (!part) return null;

                // Check markdown link [label](url)
                const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
                if (linkMatch) {
                    const label = linkMatch[1];
                    const url = linkMatch[2];
                    return (
                        <a
                            key={pIdx}
                            href={url}
                            className="ai-chat-link"
                            onClick={(e) => handleLinkClick(e, url)}
                        >
                            <span>{label}</span>
                            <IoOpenOutline className="link-icon" />
                        </a>
                    );
                }

                // Check bold **text**
                if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
                    return <strong key={pIdx} className="ai-highlight">{part.slice(2, -2)}</strong>;
                }

                // Check inline code `code`
                if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
                    return <code key={pIdx} className="ai-inline-code">{part.slice(1, -1)}</code>;
                }

                return part;
            });

            const isLastLine = idx === lines.length - 1;

            return (
                <span key={idx} className="msg-line">
                    {formattedLine}
                    {isStreaming && isLastLine && <span className="typewriter-cursor">▋</span>}
                    {idx < lines.length - 1 && <br />}
                </span>
            );
        });
    };

    return (
        <div className="neural-chatbot-wrapper">
            {/* Floating Trigger Button */}
            <motion.button
                className={`neural-chatbot-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Toggle Neural AI Assistant"
            >
                <div className="trigger-icon-container">
                    {isOpen ? <IoClose className="close-icon" /> : <IoSparkles className="sparkle-icon" />}
                </div>
                <span className="trigger-label">{isOpen ? 'Close' : 'AI Co-Pilot'}</span>
                {!isOpen && unreadCount > 0 && (
                    <span className="unread-badge">{unreadCount}</span>
                )}
                <div className="pulse-ring"></div>
            </motion.button>

            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="neural-chatbot-window glass-panel"
                        data-lenis-prevent
                        initial={{ opacity: 0, y: 30, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.92 }}
                        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="header-left">
                                <div className="ai-avatar">
                                    <IoHardwareChipOutline className="avatar-chip" />
                                    <span className="online-indicator"></span>
                                </div>
                                <div className="header-title">
                                    <div className="title-row">
                                        <h3>Neural Assistant</h3>
                                        <span className="version-tag">v2.4</span>
                                    </div>
                                    <p className="subtitle">
                                        <span className="live-dot">●</span> ONLINE | AI Agent Active
                                    </p>
                                </div>
                            </div>
                            <div className="header-actions">
                                <button className="icon-btn clear-btn" onClick={clearChat} title="Clear Chat">
                                    <IoTrashOutline />
                                </button>
                                <button className="icon-btn chatbot-close-btn" onClick={() => setIsOpen(false)} title="Minimize">
                                    <IoChevronDown />
                                </button>
                            </div>
                        </div>

                        {/* Telemetry Bar */}
                        <div className="telemetry-bar">
                            <span><IoTerminalOutline /> Engine: Neural-Portfolio-v2.4</span>
                            <span>Latency: 12ms</span>
                        </div>

                        {/* Message Stream */}
                        <div className="chatbot-messages" ref={chatContainerRef} data-lenis-prevent>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    className={`message-row ${msg.sender}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="avatar-icon">
                                        {msg.sender === 'ai' ? <IoSparkles /> : <IoPersonOutline />}
                                    </div>
                                    <div className="message-content-wrapper">
                                        <div className="message-bubble">
                                            <div className="message-text">
                                                {renderFormattedText(msg.text, msg.isStreaming)}
                                            </div>
                                            <div className="message-meta">
                                                <span className="timestamp">{msg.timestamp}</span>
                                                {msg.latency && (
                                                    <span className="latency-tag">⚡ {msg.latency}ms</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Suggestion Chips */}
                                        {msg.chips && msg.chips.length > 0 && (
                                            <div className="chips-container">
                                                {msg.chips.map((chip, cIdx) => (
                                                    <button
                                                        key={cIdx}
                                                        className="chip-btn"
                                                        onClick={() => handleSendMessage(chip.replace(/^[\u2700-\u27BF\u1F300-\u1F9FF]\s*/, ''))}
                                                    >
                                                        {chip}
                                                        <IoArrowForward className="chip-arrow" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    className="message-row ai typing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="avatar-icon">
                                        <IoSparkles />
                                    </div>
                                    <div className="message-bubble typing-bubble">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="typing-text">Neural inference running...</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="chatbot-input-container">
                            <input
                                ref={inputRef}
                                type="text"
                                className="chatbot-input"
                                placeholder="Ask about Sentinel, NeuraX, Zync, EV Charging AI..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <motion.button
                                className="send-btn"
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <IoPaperPlane />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
