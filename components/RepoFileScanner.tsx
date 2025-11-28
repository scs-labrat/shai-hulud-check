import React, { useState } from 'react';
import { FileCode, AlertTriangle, CheckCircle, Code, Copy, ShieldAlert } from 'lucide-react';
import { COMPROMISED_PACKAGES } from '../constants';

export const RepoFileScanner: React.FC = () => {
  const [code, setCode] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'clean' | 'infected' | 'warning' | null;
    findings: string[];
  }>({ status: null, findings: [] });

  const handleScan = () => {
    if (!code.trim()) return;

    const findings: string[] = [];
    const lowerCode = code.toLowerCase();

    // 1. Dependency Analysis (JSON Parsing)
    let jsonParsed = false;
    try {
      const pkg = JSON.parse(code);
      jsonParsed = true;
      const dependencies = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
        ...pkg.optionalDependencies
      };

      const foundCompromised = Object.keys(dependencies).filter(dep => 
        COMPROMISED_PACKAGES.includes(dep)
      );

      if (foundCompromised.length > 0) {
        findings.push(`CRITICAL: Compromised dependencies found: ${foundCompromised.join(', ')}`);
      }
    } catch (e) {
      // Not valid JSON, ignore parsing errors and fall back to string scanning
    }

    // 2. Pattern Matching (Strings)
    
    // Preinstall execution vector
    if (lowerCode.includes('"preinstall"') && lowerCode.includes('setup_bun.js')) {
      findings.push('CRITICAL: Malicious "preinstall" script executing "setup_bun.js" detected.');
    }

    // Bun Environment payload
    if (lowerCode.includes('bun_environment.js')) {
      findings.push('CRITICAL: Reference to "bun_environment.js" payload found.');
    }

    // Runner Registration
    if (lowerCode.includes('sha1hulud') && (lowerCode.includes('runner') || lowerCode.includes('--name'))) {
      findings.push('CRITICAL: Attempt to register self-hosted runner "SHA1HULUD".');
    }

    // Persistence Vector
    if (lowerCode.includes('discussion.yaml') || (lowerCode.includes('on:') && lowerCode.includes('discussion_comment'))) {
      findings.push('HIGH: Suspicious discussion workflow trigger detected (Persistence Vector).');
    }

    // Cloud/Secret files
    if (lowerCode.includes('cloud.json') && lowerCode.includes('trufflesecrets.json')) {
      findings.push('HIGH: References to exfiltration target files (cloud.json, truffleSecrets.json).');
    }

    // 3. Determine Status
    if (findings.length > 0) {
      // Determine severity
      const isCritical = findings.some(f => f.startsWith('CRITICAL'));
      setScanResult({ status: isCritical ? 'infected' : 'warning', findings });
    } else if (lowerCode.includes('bun') && lowerCode.includes('install')) {
      setScanResult({ 
        status: 'warning', 
        findings: ['WARNING: "bun" installation detected. While valid, verify this is intentional as Shai-Hulud abuses this tool.'] 
      });
    } else {
      setScanResult({ status: 'clean', findings: [] });
    }
  };

  const loadExample = () => {
    const example = `{
  "name": "vulnerable-package",
  "version": "1.0.0",
  "dependencies": {
    "posthog-js": "1.0.0",
    "@zapier/ai-actions": "latest"
  },
  "scripts": {
    "start": "node index.js",
    "preinstall": "node setup_bun.js"
  }
}`;
    setCode(example);
  };

  return (
    <div className="bg-worm-800 border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full">
      <div className="p-6 border-b border-stone-800 bg-stone-900/50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-spice-100 flex items-center gap-2">
            <FileCode className="h-5 w-5 text-spice-500" />
            Repository File Scanner
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            Paste content from <code className="text-spice-400">package.json</code> or <code className="text-spice-400">workflows</code> to check dependencies & scripts.
          </p>
        </div>
        <button 
          onClick={loadExample}
          className="text-xs text-stone-500 hover:text-spice-400 flex items-center gap-1 transition-colors"
        >
          <Copy size={12} /> Load Malicious Sample
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="relative flex-1 min-h-[200px]">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`// Paste file content here...\n\n"dependencies": {\n  "posthog-js": "..."\n}`}
            className="w-full h-full bg-stone-950 border border-stone-700 text-stone-300 font-mono text-sm rounded-lg p-4 focus:ring-2 focus:ring-spice-600 focus:border-transparent outline-none resize-none"
            spellCheck={false}
          />
          <Code className="absolute top-4 right-4 text-stone-700 pointer-events-none" size={20} />
        </div>

        <button
          onClick={handleScan}
          disabled={!code.trim()}
          className="mt-4 w-full bg-spice-700 hover:bg-spice-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-spice-900/20"
        >
          <ShieldAlert size={18} />
          Scan Code Content
        </button>

        {scanResult.status && (
          <div className={`mt-6 p-4 rounded-lg border animation-fade-in ${
            scanResult.status === 'infected' 
              ? 'bg-red-950/30 border-red-900/50' 
              : scanResult.status === 'warning'
                ? 'bg-orange-950/30 border-orange-900/50'
                : 'bg-emerald-950/30 border-emerald-900/50'
          }`}>
            <div className="flex items-start gap-3">
              {scanResult.status === 'infected' ? (
                <AlertTriangle className="h-6 w-6 text-red-500 shrink-0" />
              ) : scanResult.status === 'warning' ? (
                <AlertTriangle className="h-6 w-6 text-orange-500 shrink-0" />
              ) : (
                <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
              )}
              
              <div className="w-full">
                <h3 className={`font-bold text-lg ${
                  scanResult.status === 'infected' ? 'text-red-200' : 
                  scanResult.status === 'warning' ? 'text-orange-200' : 'text-emerald-200'
                }`}>
                  {scanResult.status === 'infected' ? 'THREAT DETECTED' : 
                   scanResult.status === 'warning' ? 'SUSPICIOUS PATTERN' : 'CLEAN'}
                </h3>
                
                {scanResult.findings.length > 0 ? (
                  <ul className="mt-2 space-y-1">
                    {scanResult.findings.map((finding, idx) => (
                      <li key={idx} className="text-sm font-mono text-stone-300 flex items-start gap-2 break-all">
                        <span className="text-red-500 mt-1 shrink-0">»</span> <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-emerald-200/80 mt-1">
                    No known Shai-Hulud signatures or compromised packages detected in the provided code.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};