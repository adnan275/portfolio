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

// Comprehensive Knowledge Base built directly from Adnan's Actual Projects, Systems & Bio
const KNOWLEDGE_BASE = {
    bio: {
        keywords: [
            'who is adnan', 'who is adnan rizvi', 'about adnan', 
            'who is he', 'bio', 'introduction', 'tell me about adnan', 
            'background', 'who are you', 'what is your name', 'profile',
            'adnan kaun hai', 'koun hai', 'introduce yourself', 'summary', 'overview'
        ],
        response: "**Adnan Rizvi** is a **Software Engineer & AI Systems Developer** with **2+ Years** of hands-on experience architecting autonomous AI agents, privacy-centric RAG engines, 3D web interfaces, and high-throughput backends.\n\n" +
            "• **Academic Rigor**: Pursuing B.Tech in Computer Science & AI at **Newton School of Technology (NST) / Rishihood University**.\n" +
            "• **Quantitative Finance**: Achieved **Gold Level in WorldQuant Challenge®** (WorldQuant BRAIN), engineering high-performance predictive trading Alphas.\n" +
            "• **Algorithmic Mastery**: Solved **400+ DSA problems** across LeetCode, mastering runtime efficiency, dynamic programming, and clean OOP/SOLID patterns.\n" +
            "• **Flagship Inventions**: Built **Sentinel (Local AI File Organizer)**, **NeuraX (Vector DB & RAG Engine)**, and **LangGraph EV Charging AI**.\n" +
            "• **End-to-End Stack**: From low-level silicon logic (**Verilog HDL, RISC-V**) and **AWS Cloud Networks (VPC, Route 53)** to modern **React 19, PyTorch, and LangChain**.\n\n" +
            "🔗 Explore his [Featured Projects](/projects), inspect verified [Certifications](/certifications), or get in touch via [Contact Form](#contact).",
        chips: ['🏆 WorldQuant Gold', '🚀 Flagship Projects', '🤖 Agentic AI & RAG', '⚡ LeetCode 400+ DSA', '💼 Why Hire Adnan?']
    },
    greetings: {
        keywords: [
            'hi', 'hello', 'hey', 'greetings', 'namaste', 'whaddup', 'sup', 
            'what can you do', 'help', 'bot', 'assistant', 'kaise ho', 'kya haal hai', 'start'
        ],
        response: "Hello & welcome! 👋 I am **Adnan's Neural AI Assistant**.\n\nI can give you in-depth answers about Adnan's **code architecture**, **live systems**, and **technical competencies**:\n\n" +
            "• 🤖 **AI & LLM Systems**: Sentinel (Offline Agent), NeuraX (Vector DB), LangGraph EV Agent\n" +
            "• ⚡ **Problem Solving**: 400+ LeetCode DSA solutions, algorithms, and system architecture\n" +
            "• 🖥️ **Computer Architecture**: Verilog HDL, RISC-V, 5-stage CPU pipelining, and GPU/TPU accelerators\n" +
            "• 🌐 **Cloud & Networking**: Multi-tier AWS VPCs, CIDR subnetting, ALB/NLB, and Wireshark diagnostics\n" +
            "• 💼 **Full-Stack & Hiring**: React 19, Node.js, Prisma, work history, and direct contact\n\n" +
            "What would you like to explore first?",
        chips: ['👤 Who is Adnan?', '💼 Why Hire Adnan?']
    },
    sentinel: {
        keywords: [
            'sentinel', 'file organizer', 'local ai', 'ollama', 'tauri', 'rust', 'privacy',
            'offline ai', 'plan before execute', 'file organization'
        ],
        response: "🤖 **Sentinel — AI-Powered Local File Organization Agent**\n\n" +
            "Sentinel is a local-first, privacy-focused desktop AI agent that scans, semantically classifies, and reorganizes unorganized local drives without sending any sensitive data to external clouds.\n\n" +
            "• **Architecture**: Powered by local LLMs via **Ollama** using an innovative **Plan-Before-Execute** safety pattern—users preview and approve the complete file operations graph before execution.\n" +
            "• **Tech Stack**: Python, FastAPI, Next.js, Rust, Tauri desktop wrapper, Ollama, SQLModel\n" +
            "• **Key Feature**: Zero data egress; sub-second semantic clustering of documents, images, and code repositories.\n\n" +
            "🔗 Try the [Sentinel Live Demo](https://sentinel-ten-black.vercel.app/) or view the [Sentinel GitHub Repo](https://github.com/adnan275/sentinel).",
        chips: ['🧠 NeuraX Vector DB', '⚡ EV Charging AI', '🚀 All Projects']
    },
    neurax: {
        keywords: [
            'neurax', 'vector db', 'vector database', 'embeddings', 'hnsw', 'llama 3.2', 
            'nomic', 'rag engine', 'pca visualization', 'similarity search', 'kd-tree'
        ],
        response: "🧠 **NeuraX — Custom Vector Database & RAG Engine**\n\n" +
            "NeuraX is an ultra-fast, privacy-centric vector database built from first principles to store, index, and query 768-dimensional vector embeddings locally.\n\n" +
            "• **Indexing Engine**: Custom implementations of **HNSW (Hierarchical Navigable Small World)** and **KD-Tree** indexing algorithms alongside pure NumPy cosine similarity.\n" +
            "• **Real-Time Visualizer**: Features a live **PCA (Principal Component Analysis)** canvas projection that maps 768D semantic clusters down into interactive 2D coordinates.\n" +
            "• **RAG Pipeline**: Offline document ingestion and contextual question answering via Llama 3.2 and Nomic Embed.\n" +
            "• **Tech Stack**: Python, FastAPI, NumPy, Hugging Face Spaces, Ollama, HNSW\n\n" +
            "🔗 Explore the live [NeuraX Hugging Face Space](https://huggingface.co/spaces/rizzzvi/NeuraX) or check the [NeuraX GitHub](https://github.com/adnan275/NeuraX).",
        chips: ['🤖 Sentinel AI Agent', '⚡ EV Charging AI', '🚀 All Projects']
    },
    evcharging: {
        keywords: [
            'ev', 'ev charging', 'langgraph', 'chromadb', 'station', 'groq', 'agentic', 
            'geospatial', 'xgboost', 'wait time', 'charging station'
        ],
        response: "⚡ **AI EV Charging Station Intelligence Agent**\n\n" +
            "An autonomous multi-agent system built with **LangGraph** that tackles EV range anxiety and real-world station queues across a dataset of **240,000+ global charging stations**.\n\n" +
            "• **Multi-Agent State Graph**: Orchestrates three specialized agents:\n" +
            "   1. *Geospatial Vector Agent*: Sub-50ms proximity retrieval via ChromaDB.\n" +
            "   2. *XGBoost Predictive Agent*: Real-time wait-time and availability forecasting.\n" +
            "   3. *Suitability Recommendation Agent*: Matches vehicle plug specs with charging speeds.\n" +
            "• **Speed**: Fast LLM reasoning powered by **Groq LPU API**.\n" +
            "• **Tech Stack**: Python, LangGraph, LangChain, Groq, ChromaDB, XGBoost, Streamlit, Docker\n\n" +
            "🔗 Launch the live [EV Charging Agent Space](https://huggingface.co/spaces/rizzzvi/ev-charging-agent) or view the [GitHub Source](https://github.com/adnan275/ev-charging-agent).",
        chips: ['🧠 NeuraX Vector DB', '🤖 Sentinel AI Agent', '🚀 All Projects']
    },
    zync: {
        keywords: ['zync', 'video call', 'video calling', 'stream api', 'webrtc', 'chat app', 'meetings'],
        response: "📹 **Zync — Real-Time Video Collaboration Platform**\n\n" +
            "A high-availability video calling and team collaboration platform designed for seamless communications with near-zero latency.\n\n" +
            "• **Production Metrics**: Successfully handled **15,000+ video calls** and **50,000+ messages** with a verified `<0.1% error rate`.\n" +
            "• **Capabilities**: 1-on-1 and group video meetings, real-time screen sharing, chat threads, and JWT authentication.\n" +
            "• **Tech Stack**: React 19, Node.js, Express, MongoDB, Stream API, TailwindCSS, JWT\n\n" +
            "🔗 Test the live app: [Zync Live Demo](https://zync-five.vercel.app/login) or view the [GitHub Repo](https://github.com/adnan275/zync).",
        chips: ['💼 GigFlow Marketplace', '🛍️ Presento Treasure', '🚀 All Projects']
    },
    presento: {
        keywords: ['presento', 'presento treasure', 'ecommerce', 'e-commerce', 'shop', 'cart', 'checkout', 'store'],
        response: "🛍️ **Presento Treasure — High-Performance E-Commerce Engine**\n\n" +
            "A full-stack commercial e-commerce solution architected for sub-80ms product catalog lookups and frictionless checkout.\n\n" +
            "• **Key Engineering**: Optimized database schemas using **Prisma ORM & MySQL (Aiven)** with custom indexing, slashing catalog search latency to `<80ms` across 10,000+ products.\n" +
            "• **Security**: Robust Role-Based Access Control (RBAC), JWT sessions, and automated email order pipelines.\n" +
            "• **Tech Stack**: React, Node.js, Express, MySQL, Prisma, Cloudinary, Nodemailer\n\n" +
            "🔗 Visit the store: [Presento Live Platform](https://fullstack-presento-swaj.vercel.app/).",
        chips: ['💼 GigFlow Marketplace', '📹 Zync Platform', '🚀 All Projects']
    },
    gigflow: {
        keywords: ['gigflow', 'marketplace', 'freelance', 'socket.io', 'realtime market', 'orders', 'gigs'],
        response: "💼 **GigFlow — Real-Time Freelance Services Marketplace**\n\n" +
            "A multi-tenant marketplace platform connecting digital creators with clients, featuring instant real-time contract negotiations.\n\n" +
            "• **Real-Time Architecture**: Built with **Socket.io** bidirectional WebSocket channels for zero-refresh bid updates, messaging, and order lifecycle state transitions.\n" +
            "• **Tech Stack**: React, Node.js, Express, MongoDB, Socket.io, JWT\n\n" +
            "🔗 Check out the live app: [GigFlow Live Platform](https://service-hive-zeta.vercel.app/).",
        chips: ['🛍️ Presento Treasure', '📹 Zync Platform', '🚀 All Projects']
    },
    best_project: {
        keywords: [
            'best project', 'best projects', 'top project', 'top projects', 
            'best project of adnan', 'best work', 'top work', 'flagship project', 
            'flagship projects', 'best ai project', 'standout project', 'main project',
            'most impressive project', 'greatest project', 'favorite project', 
            'sabse accha project', 'sabse best project', 'best app', 'number 1 project',
            'star project'
        ],
        response: "Adnan's #1 standout flagship system is **Sentinel** — an autonomous, privacy-focused local AI desktop agent:\n\n" +
            "• 🤖 **Sentinel (Local AI Agent)**: Local-first file organization agent running local LLMs via **Ollama**, **FastAPI**, **Next.js**, and **Rust/Tauri**. Features a safety-first **Plan-Before-Execute** pattern where users preview and approve the entire file operations graph before execution with zero cloud data egress.\n" +
            "  🔗 [Sentinel Live Demo](https://sentinel-ten-black.vercel.app/) | [GitHub Repository](https://github.com/adnan275/sentinel)\n\n" +
            "Other top tier flagship engineering systems built by Adnan:\n" +
            "• 🧠 **NeuraX (Vector DB & RAG)**: Built from first principles in Python/NumPy with custom HNSW indexing, 768D vector search, and a real-time 2D PCA semantic projection. ([HF Space](https://huggingface.co/spaces/rizzzvi/NeuraX))\n" +
            "• ⚡ **EV Charging Multi-Agent**: LangGraph state graph predicting station availability and wait times across 240,000+ stations with sub-50ms Groq LPU inference. ([HF Space](https://huggingface.co/spaces/rizzzvi/ev-charging-agent))\n\n" +
            "Which project would you like to explore deeper?",
        chips: ['🤖 Sentinel AI Agent', '🧠 NeuraX Vector DB', '⚡ EV Charging AI', '🚀 All Projects']
    },
    projects: {
        keywords: [
            'project', 'projects', 'portfolio', 'work', 'built', 'apps', 'chess', 
            'neural', 'stockfish', 'rag', 'github', 'demo', 'kya banaya hai', 
            'list projects', 'all projects', 'flagship', 'show projects'
        ],
        response: "Here is an overview of Adnan's **flagship production systems**:\n\n" +
            "1. **🤖 Sentinel (Local AI Agent)**: Offline file organizer with Ollama, Tauri & Rust. ([Live Demo](https://sentinel-ten-black.vercel.app/))\n" +
            "2. **🧠 NeuraX (Vector DB & RAG)**: 768D embeddings, HNSW indexing & live 2D PCA canvas. ([HF Space](https://huggingface.co/spaces/rizzzvi/NeuraX))\n" +
            "3. **⚡ EV Charging AI Agent**: LangGraph multi-agent system across 240,000+ stations. ([HF Space](https://huggingface.co/spaces/rizzzvi/ev-charging-agent))\n" +
            "4. **📹 Zync Video Platform**: 15k+ calls, 50k+ messages with <0.1% error rate. ([Live Demo](https://zync-five.vercel.app/login))\n" +
            "5. **🛍️ Presento Treasure**: E-commerce with sub-80ms Prisma queries. ([Live Demo](https://fullstack-presento-swaj.vercel.app/))\n" +
            "6. **💼 GigFlow Marketplace**: Real-time freelance market via Socket.io. ([Live Demo](https://service-hive-zeta.vercel.app/))\n\n" +
            "🔗 See full architecture diagrams & case studies on the [Projects Page](/projects)!",
        chips: ['🤖 Sentinel AI Agent', '🧠 NeuraX Vector DB', '⚡ EV Charging AI', '💼 Why Hire Adnan?']
    },
    dsa: {
        keywords: [
            'dsa', 'leetcode', 'algorithms', 'data structures', 'problem solving', 
            'logic', 'solid', 'oop', 'code', '400+', 'competitive programming', 
            'dynamic programming', 'trees', 'graphs'
        ],
        response: "Adnan has a rigorous foundation in **Data Structures, Algorithms & Clean Architecture**:\n\n" +
            "• **400+ LeetCode Problems Solved**: Consistent mastery across Dynamic Programming, Graph Traversals (Dijkstra, BFS/DFS), Trees, Heaps, and Slidding Windows.\n" +
            "• **Optimization Obsession**: Strong instinct for time/space complexity trade-offs, minimizing allocations, and memory locality.\n" +
            "• **Software Engineering Principles**: Strict adherence to **SOLID design principles**, Object-Oriented patterns, and modular decoupling.\n\n" +
            "🔗 Check out code repositories on [GitHub](https://github.com/adnan275) or view the [My Journey Section](#about).",
        chips: ['🚀 Flagship Projects', '🧠 Deep Learning Stack', '👤 Who is Adnan?']
    },
    aiml: {
        keywords: [
            'ai', 'ml', 'machine learning', 'deep learning', 'dl', 'transformers', 
            'mamba', 'ssm', 'diffusion', 'ddpm', 'clip', 'dpo', 'rlhf', 'qlora', 
            'quantization', 'pytorch', 'scikit', 'llm', 'rag', 'nlp', 'computer vision', 
            'cnn', 'lstm', 'python', 'huggingface', 'vector', 'neural', 'langchain', 
            'langgraph', 'agentic', 'ollama'
        ],
        response: "Adnan's **Deep Learning & Foundation Intelligence Stack**:\n\n" +
            "• **Modern Neural Architectures**: Transformers (Multi-Head Self-Attention, ViT), State-Space Models (**Mamba/SSMs** for linear-time sequence modeling), Diffusion Models (**DDPM**), and Multimodal **CLIP**.\n" +
            "• **LLM Post-Training & Alignment**: Direct Preference Optimization (**DPO**), RLHF, Reward Modeling, and Compute Scaling Laws (MMLU / GPQA evaluations).\n" +
            "• **Edge AI & Quantization**: INT4/INT8 compression with **QLoRA** and Quantization-Aware Modular Reasoning (QAMR) for mobile & edge inference.\n" +
            "• **Agentic AI & Production RAG**: Stateful agent graphs using **LangGraph**, **ChromaDB**, **Groq**, and **PyTorch**.\n\n" +
            "🔗 Explore live interactive cards in the [Skills Section](#skills)!",
        chips: ['🧠 NeuraX Vector DB', '🤖 Sentinel AI Agent', '🔬 From-Scratch ML', '🖥️ Computer Architecture']
    },
    advml: {
        keywords: [
            'advanced machine learning', 'aml', 'from scratch', 'gmm', 'gaussian mixture', 
            'arima', 'time series', 'forecasting', 'vif', 'multicollinearity', 
            'homoscedasticity', 'cart', 'decision tree', 'random forest', 'gradient descent', 
            'sgd', 'ols', 'linear regression', 'logistic regression', 'mle', 'lasso', 'ridge', 
            'regularization', 'pca', 'kmeans', 'acf', 'pacf'
        ],
        response: "Adnan's **Advanced Machine Learning & From-Scratch Mathematical Rigor**:\n\n" +
            "• **From-Scratch Algorithmic Implementation**: Custom NumPy code for OLS Multiple Regression, Logistic Regression with MLE, CART Decision Trees, and Gaussian Mixture Models (**GMM**) for soft clustering.\n" +
            "• **Time Series & Forecasting**: Trend/seasonality decomposition, autocorrelation (ACF/PACF) analysis, and AR/MA/ARIMA modeling with Statsmodels.\n" +
            "• **Statistical Diagnostics & Regularization**: Multicollinearity elimination via Variance Inflation Factor (**VIF**), residual homoscedasticity tests, L1/L2 shrinkage (Lasso vs Ridge), and PCA dimensionality reduction.\n\n" +
            "🔗 View all competencies in the [Skills Section](#skills)!",
        chips: ['🧠 Deep Learning Stack', '🖥️ Computer Architecture', '🌐 Computer Networks']
    },
    architecture: {
        keywords: [
            'architecture', 'computer architecture', 'modern computer architecture', 
            'verilog', 'gtkwave', 'riscv', 'risc-v', 'mips', 'pipelining', 'pipeline', 
            'hazard', 'cache', 'amat', 'mesi', 'multicore', 'atomic', 'gpu', 'simt', 
            'tpu', 'systolic array', 'simd', 'avx', 'spectre', 'meltdown', 'hardware', 
            'silicon', 'digital logic', 'fpga'
        ],
        response: "Adnan's **Modern Computer Architecture & Low-Level Silicon Stack**:\n\n" +
            "• **Digital Design & ISAs**: Circuit modeling in **Verilog HDL**, waveform verification via GTKWave, testbenches, and **RISC-V / MIPS32** assembly programming.\n" +
            "• **CPU Pipelining & Datapaths**: 5-stage CPU datapath (IF→ID→EX→MEM→WB), hazard resolution (RAW/WAW/WAR), branch prediction, and CPI optimization.\n" +
            "• **Memory Hierarchy & AMAT**: L1/L2/L3 cache architectures, N-way set associativity, LRU replacement, cache-blocked matrix multiply, and virtual memory TLBs.\n" +
            "• **Multicore & Accelerators**: Cache coherence (**MESI protocol**), lock-free atomic primitives (CAS/`__atomic_fetch_add`), GPU streaming multiprocessors (SIMT), and TPU systolic arrays.\n\n" +
            "🔗 See how hardware meets AI in the [Skills Section](#skills)!",
        chips: ['🌐 Computer Networks', '🧠 Deep Learning Stack', '🚀 Flagship Projects']
    },
    networking: {
        keywords: [
            'network', 'networking', 'computer networks', 'vpc', 'subnets', 'subnetting', 
            'cidr', 'wireshark', 'packet tracer', 'tcp', 'udp', 'dns', 'route 53', 
            'alb', 'nlb', 'load balancer', 'security group', 'nacl', 'vpn', 'wireguard', 
            'ipsec', 'bgp', 'ospf', 'socket', 'osi', 'aws networking', 'cloudfront'
        ],
        response: "Adnan's **Computer Networks & AWS Cloud Architecture Stack**:\n\n" +
            "• **AWS Cloud Infrastructure**: Multi-tier **Amazon VPC** design, public/private subnets, CIDR math, NAT Gateways, Internet Gateways, Route Tables, and **Route 53** routing policies (latency, failover, geo).\n" +
            "• **Traffic Management & Security**: Elastic Load Balancing (**ALB** Layer 7, **NLB** Layer 4), stateful Security Groups, stateless NACLs, AWS WAF, and ACM TLS/SSL auto-renewal.\n" +
            "• **Layered Protocols & Diagnostics**: OSI & TCP/IP stacks, HTTP/3, TLS handshakes, TCP 3-way handshakes, AIMD flow control, and deep packet captures with **Wireshark**.\n" +
            "• **Sockets & Tunnels**: Python TCP/UDP socket programming, Site-to-Site VPNs, and WireGuard tunneling.\n\n" +
            "🔗 Explore the cloud network stack in the [Skills Section](#skills)!",
        chips: ['🖥️ Computer Architecture', '💻 Full-Stack Systems', '🚀 Flagship Projects']
    },
    fullstack: {
        keywords: [
            'skill', 'skills', 'stack', 'tech', 'fullstack', 'frontend', 'backend', 
            'react', 'node', 'express', 'javascript', 'typescript', 'css', 'three', 
            'webgl', 'database', 'postgres', 'docker', 'vite', 'sql', 'mern', 
            'prisma', 'mongodb', 'kya kya ata hai'
        ],
        response: "Adnan's **Full-Stack Systems & Web Architecture**:\n\n" +
            "• **Frontend UI/UX**: React 19, TypeScript, Modern ES6+, Three.js / React Three Fiber (3D WebGL), Framer Motion, TailwindCSS\n" +
            "• **Backend & APIs**: Node.js, Express, Python, FastAPI, RESTful architecture, WebSockets / Socket.io, JWT auth\n" +
            "• **Databases & ORMs**: Prisma ORM, PostgreSQL, MySQL, MongoDB, Redis caching, vector databases\n" +
            "• **DevOps & Tooling**: Docker, Git/GitHub, Linux system admin, Vercel CI/CD\n\n" +
            "🔗 Filter all competencies interactively in the [Skills Section](#skills).",
        chips: ['🤖 Agentic AI & RAG', '🌐 Computer Networks', '💼 Why Hire Adnan?']
    },
    systemdesign: {
        keywords: [
            'system design', 'system architecture', 'scalability', 'distributed systems', 
            'high availability', 'microservices', 'load balancing', 'caching', 'redis', 
            'database sharding', 'horizontal scaling', 'fault tolerance', 'acid', 'scale', 
            'rate limiting', 'message queues', 'kafka', 'latency', 'high throughput',
            'scaling', 'system design ata hai', 'system design skills'
        ],
        response: "🏗️ **System Design & High-Scalability Engineering**:\n\n" +
            "Adnan approaches system design with a rigorous distributed systems mindset:\n" +
            "• **Horizontal Scaling & Load Balancing**: Tiered traffic distribution using AWS Application Load Balancers (ALB) and Network Load Balancers (NLB) with health check failover.\n" +
            "• **Low-Latency Caching**: Multi-level cache topologies with **Redis** (cache-aside, write-through patterns) and CDN edge caching to slash p99 latencies.\n" +
            "• **Data Tier Architectures**: Relational schema optimization with **Prisma & MySQL** (indexing, foreign key constraints, connection pooling) and decoupled NoSQL storage with MongoDB.\n" +
            "• **Fault-Tolerance & State Management**: Idempotent API endpoints, WebSocket connection state preservation, and atomic transactions ensuring ACID compliance.\n\n" +
            "🔗 See real production implementations in [Featured Projects](/projects)!",
        chips: ['🌐 AWS & Cloud Networks', '🚀 Flagship Projects', '💼 Why Hire Adnan?']
    },
    journey: {
        keywords: [
            'journey', 'timeline', 'milestones', 'story', 'phases', 'background', 
            'evolution', 'career path', 'how did you start', 'my journey', 'phases of journey',
            'adnan journey', 'safarnama', 'history'
        ],
        response: "Adnan's **Engineering Journey in 9 Phases**:\n\n" +
            "1. **Foundations**: Web basics (HTML, CSS, JS) and core CS.\n" +
            "2. **Logic & DSA**: 400+ LeetCode problems & algorithmic optimization.\n" +
            "3. **Full-Stack**: Production MERN systems, Prisma, and SOLID design.\n" +
            "4. **Networks & Cloud**: AWS VPCs, Route 53, ALBs, and Wireshark diagnostics.\n" +
            "5. **Computer Architecture**: Verilog HDL, RISC-V, 5-stage CPU pipelining, and GPU/TPUs.\n" +
            "6. **Advanced ML**: From-scratch NumPy algorithms, ARIMA forecasting, and VIF diagnostics.\n" +
            "7. **Deep Learning**: PyTorch Transformers, Mamba SSMs, Diffusion, and DPO.\n" +
            "8. **Agentic AI**: Autonomous LangGraph multi-agent workflows and local RAG.\n" +
            "9. **The Future**: High-scale System Design and high-performance computing.\n\n" +
            "🔗 View the complete visual timeline in the [My Journey Section](#about).",
        chips: ['👤 Who is Adnan?', '🚀 Flagship Projects', '💼 Why Hire Adnan?']
    },
    worldquant: {
        keywords: [
            'worldquant', 'world quant', 'brain', 'worldquant brain', 'alpha', 'alphas', 
            'quant', 'quantitative finance', 'worldquant challenge', 'gold level', 
            'silver level', 'bronze level', 'nitish maini', 'sharpe ratio', 'turnover',
            'algorithmic trading', 'trading algorithm', 'quantitative'
        ],
        response: "🏆 **WorldQuant Challenge® — Gold Level Achievement**\n\n" +
            "Adnan reached **Gold Level** in the global **WorldQuant Challenge®** organized by **WorldQuant BRAIN** (Authorized & presented by Nitish Maini, Chief Strategy Officer of WorldQuant):\n\n" +
            "• **Quantitative Alpha Engineering**: Formulated predictive mathematical trading formulas (Alphas) using time-series operators (`ts_rank`, `ts_regression`, `ts_corr`) and cross-sectional operators (`group_neutralize`).\n" +
            "• **Institutional Standards**: Backtested across 5+ years of historical market data meeting strict institutional risk thresholds—high Sharpe Ratio, low turnover (<70%), and non-correlation (<0.7).\n" +
            "• **Progressive Milestones**: Consecutively cleared **Bronze Level, Silver Level, and Gold Level** credentials.\n\n" +
            "🔗 Direct Certificate Credentials:\n" +
            "• [View Gold Certificate](/certificates/worldquant-challenge-gold.pdf)\n" +
            "• [View Silver Certificate](/certificates/worldquant-challenge-silver.pdf)\n" +
            "• [View Bronze Certificate](/certificates/worldquant-challenge-bronze.pdf)\n\n" +
            "Or view all credentials on the [Certifications Page](/certifications)!",
        chips: ['📜 All Certifications', '🔬 From-Scratch ML', '🚀 Flagship Projects', '💼 Why Hire Adnan?']
    },
    certifications: {
        keywords: [
            'certification', 'certifications', 'certificate', 'certificates', 
            'credential', 'credentials', 'worldquant', 'world quant', 'gold level', 'silver level', 'bronze level', 
            'jpmorgan', 'oracle', 'aws', 'anthropic', 'claude', 'certificates dikhao'
        ],
        response: "Adnan holds industry-accredited credentials from premier quantitative and technology institutions:\n\n" +
            "• 🏆 **WorldQuant Challenge® (Gold, Silver & Bronze Levels)**: WorldQuant BRAIN — Quantitative Alpha modeling, market-neutral simulation, and backtesting. ([View Gold Certificate](/certificates/worldquant-challenge-gold.pdf))\n" +
            "• 💼 **JPMorgan Chase Investment Banking**: Job Simulation covering M&A analysis, DCF financial models, and valuation.\n" +
            "• ☁️ **Oracle Cloud Infrastructure 2025 AI Foundations Associate**: Supervised/unsupervised AI, CNN/LSTM architectures, and cloud deployments.\n" +
            "• 🌐 **AWS Solutions Architecture**: Scalable cloud architectures, Elastic Beanstalk, and multi-tier systems.\n" +
            "• 🤖 **Claude Code & Claude 101**: Anthropic agentic coding and prompt engineering.\n\n" +
            "🔗 View all verified certificate documents and badges on the [Certifications Page](/certifications)!",
        chips: ['🏆 WorldQuant BRAIN', '🚀 Flagship Projects', '🧠 Deep Learning Stack', '👤 Who is Adnan?']
    },
    education: {
        keywords: [
            'education', 'college', 'university', 'degree', 'btech', 'csai', 
            'nst', 'newton school', 'rishihood', 'academics', 'gpa', 'study', 
            'where do you study', 'qualification', 'qualifications', 'kaha padhte ho', 
            'kis college me', 'school', 'batch', 'student'
        ],
        response: "🎓 **Academic Background**:\n\n" +
            "• **Degree**: Bachelor of Technology (B.Tech) in **Computer Science & Artificial Intelligence**\n" +
            "• **Institution**: **Newton School of Technology (NST) / Rishihood University**\n" +
            "• **Timeline**: Batch 2024 – 2028 (Currently in Semester 5)\n" +
            "• **Focus Areas**: Advanced Machine Learning, Deep Learning, Modern Computer Architecture, Computer Networks & AWS Cloud, Distributed Systems.\n\n" +
            "🔗 Learn more about his learning path in the [My Journey Section](#about).",
        chips: ['👤 Who is Adnan?', '🚀 Flagship Projects', '✉️ Contact Details']
    },
    experience: {
        keywords: [
            'experience', 'work', 'job', 'role', 'company', 'career', 'history', 
            'internship', 'years', 'total experience', 'kitna experience hai', 'work exp'
        ],
        response: "Adnan's **Software & AI Engineering Background**:\n\n" +
            "• **2+ Years Experience**: Designing and deploying production-grade AI agents, RAG engines, 3D interactive web applications, and scalable APIs.\n" +
            "• **10+ Delivered Systems**: Highlights include Sentinel (Local AI Agent), NeuraX (Vector DB), EV Charging Agent (LangGraph), and Zync Video Platform (15,000+ sessions).\n" +
            "• **Core Strengths**: Fast shipping velocity, low-latency architecture, clean maintainable code, and deep hardware-to-application understanding.\n\n" +
            "🔗 View the detailed career timeline in the [Experience Section](#experience).",
        chips: ['🚀 Flagship Projects', '💼 Why Hire Adnan?', '✉️ Contact Details']
    },
    location: {
        keywords: [
            'location', 'where are you from', 'where is he based', 'where do you live', 
            'city', 'delhi', 'sonipat', 'india', 'remote work', 'relocate', 'relocation', 
            'availability', 'open to work', 'kaha rehta hai', 'kaha se ho', 'address'
        ],
        response: "📍 **Location & Work Availability**:\n\n" +
            "• **Base Location**: **Delhi NCR / Sonipat, India**\n" +
            "• **Work Preference**: Open for **Remote worldwide** as well as **On-site / Hybrid** positions.\n" +
            "• **Relocation**: Fully open to relocate for compelling engineering roles and high-impact teams.\n" +
            "• **Current Status**: Actively open to Software Engineering, AI/ML Developer, and Distributed Systems roles.\n\n" +
            "🔗 Connect directly via [Contact Form](#contact) or email [adnan.rizvi2004@gmail.com](mailto:adnan.rizvi2004@gmail.com).",
        chips: ['💼 Why Hire Adnan?', '✉️ Contact Details', '📄 Resume Overview']
    },
    socials: {
        keywords: [
            'github', 'linkedin', 'twitter', 'x', 'social', 'socials', 'profiles', 
            'handles', 'social links', 'repo', 'github link', 'linkedin profile', 
            'social media', 'github repo'
        ],
        response: "🌐 **Adnan's Official Developer Profiles**:\n\n" +
            "• 🐙 **GitHub**: [github.com/adnan275](https://github.com/adnan275) — Check out open-source repos, agent graphs, and code repositories.\n" +
            "• 💼 **LinkedIn**: [linkedin.com/in/adnan-rizvi](https://linkedin.com) — Connect professionally, inspect recommendations, and send a message.\n" +
            "• 📧 **Email**: [adnan.rizvi2004@gmail.com](mailto:adnan.rizvi2004@gmail.com) — Fast response within 12–24 hours.\n" +
            "• 📞 **Direct Phone**: **765-209-2174**\n\n" +
            "Feel free to connect or drop a note!",
        chips: ['✉️ Contact Details', '📄 Resume Overview', '💼 Why Hire Adnan?']
    },
    contact: {
        keywords: [
            'contact', 'email', 'reach', 'phone', 'call', 'message', 'talk', 
            'connect', 'number', 'mail', 'adnan.rizvi2004@gmail.com', 
            '765-209-2174', 'kaise contact karein', 'phone number', 'email id', 'contact form',
            'contact details', 'sampark'
        ],
        response: "Here are Adnan's **direct contact channels**:\n\n" +
            "• 📧 **Email**: [adnan.rizvi2004@gmail.com](mailto:adnan.rizvi2004@gmail.com)\n" +
            "• 📞 **Direct Phone**: **765-209-2174**\n" +
            "• 💼 **LinkedIn Profile**: [linkedin.com/in/adnan-rizvi](https://linkedin.com)\n" +
            "• 🐙 **GitHub Repos**: [github.com/adnan275](https://github.com/adnan275)\n" +
            "• ✉️ **Direct Form**: Send a quick note directly via the [Contact Form](#contact)\n\n" +
            "Adnan typically responds within 12–24 hours!",
        chips: ['💼 Why Hire Adnan?', '🚀 Flagship Projects', '👤 Who is Adnan?']
    },
    resume: {
        keywords: [
            'resume', 'cv', 'curriculum vitae', 'download resume', 'pdf resume', 
            'resume link', 'resume bhejo', 'resume chahiye', 'adnan resume'
        ],
        response: "📄 **Adnan Rizvi's Resume Overview**:\n\n" +
            "• **Role**: Software Engineer & AI Systems Developer\n" +
            "• **Education**: B.Tech Computer Science & AI (NST / Rishihood University)\n" +
            "• **Skills**: PyTorch, LangGraph, Python, FastAPI, React 19, Node.js, Prisma, AWS, Verilog, 400+ LeetCode DSA\n" +
            "• **Proven Deliverables**: Sentinel, NeuraX Vector DB, EV Charging AI, Zync Platform\n\n" +
            "🔗 Need a copy of his full PDF resume? Drop an email to [adnan.rizvi2004@gmail.com](mailto:adnan.rizvi2004@gmail.com) or ping him through the [Contact Form](#contact)!",
        chips: ['✉️ Contact Details', '💼 Why Hire Adnan?', '🚀 Flagship Projects']
    },
    hire: {
        keywords: [
            'why hire', 'hire', 'recruiter', 'job', 'opportunity', 'relocate', 
            'full-time', 'remote', 'interview', 'salary', 'hire karna hai', 
            'available for work', 'hire adnan', 'why should we hire'
        ],
        response: "Why you should hire **Adnan Rizvi**:\n\n" +
            "1. 🚀 **Proven Shipping Track Record**: Has built and deployed production systems (Sentinel local AI, NeuraX 768D Vector DB, LangGraph multi-agent systems, and 15k+ call video platforms).\n" +
            "2. ⚡ **400+ LeetCode DSA Rigor**: Sharp algorithmic thinking, rapid problem resolution, low memory overhead, and clean OOP/SOLID architectural logic.\n" +
            "3. 🌐 **Hardware-to-Cloud Full Breadth**: Rare ability to traverse the entire engineering spectrum—from **Verilog & RISC-V silicon datapaths** up to **AWS cloud networks**, scalable backends, and responsive React 19 UIs.\n" +
            "4. 🏎️ **Speed & Autonomy**: Takes ownership of problems from specification to production deployment with high velocity.\n\n" +
            "🔗 Ready to schedule an interview or discuss an opportunity? Send a message via [Contact Form](#contact) or email [adnan.rizvi2004@gmail.com](mailto:adnan.rizvi2004@gmail.com)!",
        chips: ['✉️ Contact Details', '🚀 Flagship Projects', '🧠 AI/ML Stack']
    }
};

export default function NeuralAIChatbot() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: "Hello & welcome! 👋 I am **Adnan's Neural AI Assistant**.\n\nWhether you're exploring his **flagship AI projects (Sentinel, NeuraX)**, reviewing his **400+ LeetCode DSA background**, or looking to **hire / connect**, I am here with instant architectural answers.\n\nClick a suggestion chip below or type any question to get started!",
            timestamp: getFormattedTime(),
            chips: [
                '👤 Who is Adnan?',
                '💼 Why Hire Adnan?'
            ]
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

    // Helper to sanitize and normalize query strings
    const cleanText = (str) => {
        return (str || '')
            .toLowerCase()
            .replace(/[^\w\s\+\#\-\.\/]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };

    // Fast Local NLP Intent Engine
    const findBestResponse = (rawQuery) => {
        const cleanQuery = cleanText(rawQuery);
        if (!cleanQuery) return KNOWLEDGE_BASE.greetings;

        // 1. Direct High-Precision Intent Routing (Handles specific questions instantly)
        // Best / Flagship Projects
        if (/\b(best project|best projects|top project|top projects|flagship project|flagship projects|best work|star project|standout project|main project|favorite project|sabse accha project|sabse best project)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.best_project;
        }

        // General Projects / Portfolio
        if (/\b(project|projects|portfolio|built|apps|kya banaya hai|what has he built|what did he make|github repos|github projects)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.projects;
        }

        // Sentinel AI Agent
        if (/\b(sentinel|file organizer|local ai agent|offline agent|tauri|ollama)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.sentinel;
        }

        // NeuraX Vector DB
        if (/\b(neurax|vector db|vector database|embeddings|hnsw|rag engine)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.neurax;
        }

        // EV Charging Multi-Agent
        if (/\b(ev|charging|charging station|langgraph agent|ev agent)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.evcharging;
        }

        // Why Hire
        if (/\b(hire|why hire|hire adnan|why should we hire|recruiter|interview|work with)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.hire;
        }

        // Contact / Email
        if (/\b(contact|email|phone|reach|call|message|touch)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.contact;
        }

        // Bio / Who is Adnan
        if (/\b(who is adnan|who are you|about adnan|introduce yourself|adnan kaun hai|tell me about yourself|tell me about adnan|bio|background|profile|intro)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.bio;
        }

        // DSA & LeetCode
        if (/\b(dsa|leetcode|algorithms|problem solving|400\+|competitive programming|dynamic programming)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.dsa;
        }

        // Greetings
        if (/^(hi|hello|hey|namaste|morning|evening|sup|start|help)$/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.greetings;
        }

        // 2. Normalized Token-Scoring Engine
        const normalizedQuery = cleanQuery
            .replace(/\b(tell me about|what is|what are|show me|list all|can you tell me|do you know|give me|what are the)\b/g, ' ')
            .replace(/\b(adnan|rizvi|adnans|adnan's|of adnan|by adnan|for adnan|his)\b/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const queryTokens = (normalizedQuery || cleanQuery).split(' ').filter(Boolean);

        let bestCategory = null;
        let highestScore = 0;

        Object.keys(KNOWLEDGE_BASE).forEach((category) => {
            const data = KNOWLEDGE_BASE[category];
            let categoryScore = 0;

            data.keywords.forEach((keyword) => {
                const lowerKeyword = cleanText(keyword);
                if (!lowerKeyword) return;

                // Exact match bonus (both clean and normalized)
                if (cleanQuery === lowerKeyword || (normalizedQuery && normalizedQuery === lowerKeyword)) {
                    categoryScore += 160;
                }
                // Exact phrase included in query
                else if (cleanQuery.includes(lowerKeyword) || (normalizedQuery && normalizedQuery.includes(lowerKeyword))) {
                    categoryScore += 40 + lowerKeyword.length * 3;
                }
                // Keyword contains full clean query
                else if (lowerKeyword.includes(cleanQuery) && cleanQuery.length > 3) {
                    categoryScore += 25 + cleanQuery.length * 2;
                }

                // Token-by-token scoring
                const keywordTokens = lowerKeyword.split(' ').filter(Boolean);
                queryTokens.forEach((qToken) => {
                    if (keywordTokens.includes(qToken)) {
                        categoryScore += qToken.length <= 3 ? 20 : 14;
                    } else if (qToken.length > 3 && lowerKeyword.includes(qToken)) {
                        categoryScore += 8;
                    }
                });
            });

            if (categoryScore > highestScore) {
                highestScore = categoryScore;
                bestCategory = data;
            }
        });

        // Intent confidence threshold
        if (highestScore >= 12 && bestCategory) {
            return bestCategory;
        }

        // Conversational fallbacks
        if (/\b(college|university|degree|study|nst|rishihood)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.education;
        }
        if (/\b(who|about|bio|profile|intro|creator|developer)\b/.test(cleanQuery)) {
            return KNOWLEDGE_BASE.bio;
        }

        return {
            response: `I couldn't find an exact match for **"${rawQuery.slice(0, 35)}"**, but here are key areas you can ask me about:\n\n` +
                "• 🚀 **Flagship AI**: [Sentinel](https://sentinel-ten-black.vercel.app/) (Local Agent), [NeuraX](https://huggingface.co/spaces/rizzzvi/NeuraX) (Vector DB), [EV Agent](https://huggingface.co/spaces/rizzzvi/ev-charging-agent) (LangGraph)\n" +
                "• ⚡ **Algorithms**: **400+ LeetCode DSA** solutions & clean OOP/SOLID design\n" +
                "• 🖥️ **Hardware & Networks**: Verilog HDL, RISC-V CPU pipelining, and AWS VPC cloud networking\n" +
                "• 💼 **Hiring & Background**: 2+ years shipping experience, B.Tech CS & AI at Newton School of Technology (NST)\n\n" +
                "Click any topic chip below or rephrase your question:",
            chips: ['👤 Who is Adnan?', '🚀 Flagship Projects', '🤖 Agentic AI & RAG', '🖥️ Verilog & Architecture', '🌐 AWS & Cloud Networks', '⚡ 400+ LeetCode DSA', '💼 Why Hire Adnan?']
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
                <span className="trigger-label">{isOpen ? 'Close' : 'AI Assistant'}</span>
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
                                        <span className="version-tag">v3.0</span>
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
                            <span><IoTerminalOutline /> Engine: Neural-Portfolio-v3.0</span>
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
                                                        onClick={() => handleSendMessage(chip.replace(/^[^\p{L}\p{N}]+/u, '').trim())}
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
                                placeholder="Ask anything (e.g. Sentinel, Verilog, 400+ DSA, AWS, System Design)..."
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
