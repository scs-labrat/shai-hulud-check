# Shai-Hulud Hunter (Threat Intel Portal)

**Shai-Hulud Hunter** is a specialized threat intelligence dashboard designed to help security teams and developers detect, analyze, and remediate the **Shai-Hulud 2.0** NPM supply chain attack. 

This application provides real-time artifact scanning, dependency analysis against known compromised packages, and an AI-powered assistant for threat context, based on the SentinelOne Flash Report (Nov 2025).

## 🚀 Features

- **IOC Artifact Scanner**: Check SHA1 hashes, filenames, and command-line arguments against known indicators of compromise.
- **Repository File Scanner**: Deep scan `package.json` files for compromised dependencies and malicious `preinstall` scripts.
- **AI Threat Analyst**: Interactive chat interface powered by Google Gemini 2.5 Flash to answer specific technical questions about the attack.
- **Impact Visualization**: Visual breakdown of the attack surface and risk severity.
- **Remediation Checklist**: Step-by-step guide to securing your environment.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gen AI SDK (`@google/genai`)
- **Visualization**: Recharts
- **Icons**: Lucide React
- **Build Tooling**: Vite (Recommended)

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **Google Gemini API Key**: Required for the AI Chatbot feature. You can get one at [Google AI Studio](https://aistudio.google.com/).

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shai-hulud-hunter.git
cd shai-hulud-hunter
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project to store your API key.

```bash
touch .env
```

Add the following line to the `.env` file:

```env
API_KEY=your_google_gemini_api_key_here
```

> **Note**: The application uses `process.env.API_KEY`. Ensure your build tool (like Vite) is configured to expose this, or use `VITE_API_KEY` and update `services/geminiService.ts` accordingly if using Vite's default env handling.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🛡️ Usage Guide

### Scanning Dependencies
1. Navigate to the **Repository File Scanner**.
2. Open your project's `package.json` file.
3. Copy the entire content and paste it into the scanner.
4. Click **Scan Code Content**.
5. Review the results for **CRITICAL** or **HIGH** alerts regarding compromised package versions.

### Checking IOCs
1. Use the **Artifact Scanner** on the left.
2. Enter a suspect file hash (SHA1) or filename (e.g., `bun_environment.js`).
3. The system will alert you if it matches known malware signatures.

### AI Assistance
1. Use the **Wayfinder AI Analyst** chat on the right.
2. Ask questions like:
   - *"How does the persistence mechanism work?"*
   - *"What specific cloud secrets are targeted?"*
   - *"List all compromised packages."*

## ⚠️ Disclaimer

This tool is provided for **defensive and educational purposes only**. It contains references to known malware artifacts. Do not execute or download the actual malware samples mentioned in the reports. Always perform analysis in an isolated sandbox environment.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
