import React from 'react';
import { ShieldAlert, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-worm-900/90 backdrop-blur-md border-b border-spice-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-spice-900/20 rounded-lg">
              <ShieldAlert className="h-6 w-6 text-spice-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-spice-50 tracking-tight">SHAI-HULUD<span className="text-spice-600">.HUNTER</span></h1>
              <p className="text-xs text-spice-400 font-mono">THREAT_INTEL_PORTAL_v2.0</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-900/20 border border-red-900/50 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-semibold text-red-400">ACTIVE THREAT</span>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Terminal className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};