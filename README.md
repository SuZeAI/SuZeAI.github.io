# Vu Thanh Tuyen (SuZeAI) - Personal Portfolio

<p align="center">
  <a href="https://github.com/SuZeAI"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://www.linkedin.com/in/suzeai/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://x.com/suzeai"><img src="https://img.shields.io/badge/Twitter/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter/X" /></a>
  <a href="mailto:tuyenvt455@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

This repository hosts the source code for my personal developer portfolio website: **[SuZeAI.github.io](https://SuZeAI.github.io)**. Built using **React (v19)**, **Vite**, and **Tailwind CSS (v4)**, it acts as a modern, interactive showcase of my journey as an AI Research Engineer, my publications, and open-source contributions.

---

## 🌟 About Me
I am an **AI Research Engineer** and **LLM/NLP Specialist** based in Hanoi, Vietnam. My expertise covers the development of Large Language Model (LLM) agents, Multi-Agent frameworks, Graph Neural Networks (GNNs), and scalable system architectures (MLOps & LLMOps). I am passionate about solving complex system-level problems and building production-ready AI applications.

- **Current Focus:** Researching and deploying state-of-the-art LLM agents and multi-agent systems at **FPT Corporation**.
- **Academic Mentorship:** Serving as Academic Advisor for PAYT (PTIT AI Club) to guide student research in NLP & agentic frameworks.
- **Open Source:** Proud contributor to [crewAI](https://github.com/crewAIInc/crewAI) (PR #3856, introducing streaming support for real-time agent execution).

---

## 🛠️ Tech Stack & Skills

- **Programming:** Python, C, C++, Java, JavaScript, TypeScript
- **Machine Learning & Deep Learning:** PyTorch, TensorFlow, Keras, Scikit-learn, DeepSpeed, Unsloth, Hugging Face Transformers
- **LLM & NLP:** LLaMA, Mistral, Qwen, RoBERTa, Sentence-BERT, RAG, Prompt & Context Engineering
- **Agent Frameworks:** crewAI, LangChain, Model Context Protocol (MCP)
- **MLOps & DevOps:** Git, Linux, Docker, Apache Airflow, MLflow, MinIO, MySQL, GitHub Actions

---

## 💼 Professional Experience

### **AI Research Engineer** @ **FPT Corporation**
*March 2026 – Present | Hanoi, Vietnam*
- Research and deploy state-of-the-art LLM agents and multi-agent frameworks.
- Architect scalable, secure enterprise AI solutions.

### **AI Research Engineer** @ **HBLAB Joint Stock Company**
*May 2025 – March 2026 | Hanoi, Vietnam*
- **Extractor Date Agent:** Developed a Japanese medical-date extraction agent using OpenAI API, achieving 87% accuracy with custom evaluation metrics.
- **GenQuestion Agent:** Built automated QA testcase generators from project specs, reducing QA workloads significantly (rated 9/10 by QA Leads).
- **AI-Project System:** Built a multi-role agent network (PM, Tester, Coder) integrated with GitLab & Google Drive via Model Context Protocol (MCP) to automate project workflows.
- **Agent Dependency:** Designed an agent to construct code graphs and map repository dependency info.

### **AI Research Assistant** @ **PTIT IEC Lab & Naver Lab**
*September 2023 – Present | Hanoi, Vietnam*
- **Android Malware Detection:** Co-led research utilizing GNNs and fine-tuned Word2Vec call-graph embeddings to classify malware, reaching a **98.8% F1-score**.
- **Smart Contract Auditing:** Designed a graph fusion model (AST + CFG + DFG) to classify vulnerabilities in Solidity contracts. Published in *ICT Express (Q1 Journal)*.

### **AI Research Engineer** @ **Viettel Cyber Security**
*December 2023 – May 2025 | Hanoi, Vietnam*
- **Code Vulnerability Detection:** Built graph-based models (AST, CFG, DFG) using PyTorch Lightning & Torch Geometric to spot software vulnerabilities.
- **LLM Finetuning:** Executed SFT, DPO, and RLHF on LLaMA (7B, 8B, 17B) with DeepSpeed/Unsloth on A100 GPUs.
- **MLOps Pipelines:** Constructed automated LLM training & evaluation pipelines using Airflow, MLflow, and MinIO.

---

## 📚 Publications

1. **GraphFusionVulDetect: Graph Fusion Detection in Smart Contracts**  
   *Venue:* ICT Express (Q1 Journal) - Published (2025)  
   *Summary:* Fused AST, CFG, and DFG representations into heterogeneous graphs to detect Solidity contract bugs, improving recall by 14% over baseline models.

2. **SlideGen: Multi-Agent LLM Slide Template Generator**  
   *Venue:* FAIR Conference - Published (2025)  
   *Summary:* Introduced a multi-agent planning pipeline that converts documents to slides using Gemini function calling and VLM design verification.

3. **Android Malware Detection via Call Graphs & GNNs**  
   *Venue:* PTIT Academy Journal - Published (2024)  
   *Summary:* Fused code semantics with structural control flow call graphs to identify malicious Android APKs.

---

## 🏆 Key Achievements

- **First Prize National** - Olympic AI National (OlpAI'25)
- **Top 5 Northern Region / Top 16 Vietnam** - Olympic AI Northern Region (OlpAI'25)
- **3rd Prize** - AI Challenge PTIT (2024)
- **Top 100** - Thucchien.ai Hackathon (2023)
- **Excellent Academic Scholarship** - Posts and Telecommunications Institute of Technology (PTIT)
- **Australia & Vietnam Scholarship Recipient** (2025)

---

## 🚀 Featured Projects

- **[SlideGen Core / SlideGenFunctionCalling](https://github.com/SuZeAI/SlideGenFunctionCalling)**: An automated presentation generator converting documents to slides using Gemini & VLMs.
- **[slide-genie](https://github.com/SuZeAI/slide-genie) & [slidegen-studio](https://github.com/SuZeAI/slidegen-studio)**: Production-ready React frontends built to optimize user slide-editing workflows.
- **[crewAI (Open Source Contributor)](https://github.com/crewAIInc/crewAI)**: Contributed streaming support and execution stability features to the core crewAI library.
- **[Detect Android Malware](https://github.com/SuZeAI/Detect_Androi_Malware)**: APK malware classification leveraging BERT/RoBERTa features and call graphs.

---

## ⚙️ Running the Portfolio Locally

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone the repository
```bash
git clone https://github.com/SuZeAI/SuZeAI.github.io.git
cd SuZeAI.github.io
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to view the portfolio.

### 4. Build for production
```bash
npm run build
```
This will compile the optimized production assets into the `dist/` directory.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
