import React, { useState } from 'react';
import { KNOWN_IOCS } from '../constants';
import { Search, AlertTriangle, CheckCircle, FileWarning } from 'lucide-react';

export const IOCChecker: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<'clean' | 'infected' | null>(null);
  const [matchDetails, setMatchDetails] = useState<string | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const searchTerm = input.trim();
    
    const found = KNOWN_IOCS.find(ioc => 
      ioc.value.toLowerCase() === searchTerm.toLowerCase() ||
      searchTerm.includes(ioc.value) // Handle cases where user pastes a full command
    );

    if (found) {
      setResult('infected');
      setMatchDetails(`${found.type} Match: ${found.value} (${found.description})`);
    } else {
      setResult('clean');
      setMatchDetails(null);
    }
  };

  return (
    <div className="bg-worm-800 border border-stone-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-stone-800 bg-stone-900/50">
        <h2 className="text-lg font-semibold text-spice-100 flex items-center gap-2">
          <Search className="h-5 w-5 text-spice-500" />
          Artifact Scanner
        </h2>
        <p className="text-sm text-stone-400 mt-1">
          Enter a file hash (SHA1), filename, or process command line argument to check against known Shai-Hulud signatures.
        </p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleCheck} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 3d7570d14d34b0ba137d502f042b27b0f37a59fa or bun_environment.js"
            className="flex-1 bg-stone-950 border border-stone-700 text-stone-200 text-sm rounded-lg focus:ring-2 focus:ring-spice-600 focus:border-transparent p-3 font-mono outline-none transition-all placeholder-stone-600"
          />
          <button
            type="submit"
            className="bg-spice-700 hover:bg-spice-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-spice-900/20"
          >
            Scan
          </button>
        </form>

        {result && (
          <div className={`mt-6 p-4 rounded-lg border flex items-start gap-3 animation-fade-in ${
            result === 'infected' 
              ? 'bg-red-950/30 border-red-900/50 text-red-200' 
              : 'bg-emerald-950/30 border-emerald-900/50 text-emerald-200'
          }`}>
            {result === 'infected' ? (
              <AlertTriangle className="h-6 w-6 text-red-500 shrink-0" />
            ) : (
              <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
            )}
            <div>
              <h3 className="font-bold text-lg">
                {result === 'infected' ? 'INDICATOR OF COMPROMISE DETECTED' : 'No Direct Match Found'}
              </h3>
              <p className="text-sm opacity-90 mt-1">
                {result === 'infected' 
                  ? 'This artifact matches known signatures of the Shai-Hulud attack. Immediate isolation required.'
                  : 'The input did not match current known signatures. Ensure you are scanning SHA1 hashes or exact filenames.'}
              </p>
              {matchDetails && (
                <div className="mt-3 p-2 bg-black/40 rounded font-mono text-xs border border-red-900/30">
                  {matchDetails}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Known IOC List</h3>
          <div className="bg-stone-950/50 rounded-lg border border-stone-800 overflow-hidden">
            <div className="max-h-48 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-stone-900 text-stone-400 sticky top-0">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Value</th>
                    <th className="p-3 text-right">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  {KNOWN_IOCS.map((ioc, idx) => (
                    <tr key={idx} className="hover:bg-stone-800/50 transition-colors group">
                      <td className="p-3 text-spice-400">{ioc.type}</td>
                      <td className="p-3 truncate max-w-[200px] group-hover:break-all group-hover:whitespace-normal">{ioc.value}</td>
                      <td className="p-3 text-right text-stone-500">{ioc.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};