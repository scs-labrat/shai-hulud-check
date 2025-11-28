import React from 'react';
import { Target, Lock, Server, GitBranch, AlertOctagon } from 'lucide-react';

export const ThreatDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-stone-400 text-sm font-medium">Threat Level</span>
          <AlertOctagon className="text-red-500 h-5 w-5" />
        </div>
        <div className="text-2xl font-bold text-white">HIGH / CRITICAL</div>
        <div className="text-xs text-red-400 mt-1">Immediate remediation required</div>
      </div>

      <div className="bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-stone-400 text-sm font-medium">Infection Vector</span>
          <Target className="text-spice-500 h-5 w-5" />
        </div>
        <div className="text-2xl font-bold text-white">NPM Preinstall</div>
        <div className="text-xs text-spice-400 mt-1">Supply Chain Injection</div>
      </div>

      <div className="bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-stone-400 text-sm font-medium">Exfiltration</span>
          <Lock className="text-blue-500 h-5 w-5" />
        </div>
        <div className="text-2xl font-bold text-white">Cloud Secrets</div>
        <div className="text-xs text-blue-400 mt-1">AWS, Azure, GCP, GitHub</div>
      </div>

      <div className="bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-stone-400 text-sm font-medium">Persistence</span>
          <GitBranch className="text-purple-500 h-5 w-5" />
        </div>
        <div className="text-2xl font-bold text-white">Self-Hosted Runners</div>
        <div className="text-xs text-purple-400 mt-1">Discussion.yaml Vulnerability</div>
      </div>
    </div>
  );
};