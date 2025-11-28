import React from 'react';
import { Header } from './components/Header';
import { IOCChecker } from './components/IOCChecker';
import { RepoFileScanner } from './components/RepoFileScanner';
import { ChatBot } from './components/ChatBot';
import { ImpactChart } from './components/ImpactChart';
import { ThreatDashboard } from './components/ThreatDashboard';

function App() {
  return (
    <div className="min-h-screen bg-worm-900 text-stone-200 font-sans selection:bg-spice-900 selection:text-white pb-12">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Section */}
        <div className="mb-10 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-spice-600/5 rounded-full blur-3xl -z-10"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Detecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-spice-400 to-red-500">Shai-Hulud</span> 2.0
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-stone-400">
            A comprehensive intelligence portal for the latest NPM supply chain worm targeting cloud infrastructure and GitHub runners.
          </p>
        </div>

        <ThreatDashboard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Scanner & Tools */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <IOCChecker />
                <RepoFileScanner />
            </div>
            
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Remediation Checklist</h3>
              <ul className="space-y-3">
                {[
                  "Rotate all cloud credentials (AWS, Azure, GCP) immediately.",
                  "Revoke and regenerate GitHub Personal Access Tokens (PATs) and SSH keys.",
                  "Inspect 'package.json' for unknown preinstall scripts.",
                  "Check GitHub organization settings for unauthorized self-hosted runners named 'SHA1HULUD'.",
                  "Remove affected packages (Postman, Zapier, AsyncAPI wrappers) and pin to safe versions.",
                  "Enable hardware-based MFA for all CI/CD accounts."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-spice-500 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - AI & Stats */}
          <div className="space-y-8 flex flex-col">
            <ChatBot />
            <div className="flex-1">
              <ImpactChart />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-900 mt-12 py-8 text-center text-stone-600 text-sm">
        <p>&copy; 2025 Wayfinder Threat Intelligence. TLP: GREEN. All rights reserved.</p>
        <p className="mt-2 text-xs">Analysis based on SentinelOne Flash Report (Nov 25, 2025).</p>
      </footer>
    </div>
  );
}

export default App;