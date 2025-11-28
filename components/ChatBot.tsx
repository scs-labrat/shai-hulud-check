import React, { useState, useRef, useEffect } from 'react';
import { analyzeThreatQuery } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Bot, Send, User, Loader2 } from 'lucide-react';

export const ChatBot: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'I am the Wayfinder AI Assistant. I have analyzed the Shai-Hulud Worm 2.0 report. Ask me about infection vectors, remediation steps, or specific technical details.',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const responseText = await analyzeThreatQuery(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-worm-800 border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
      <div className="p-4 border-b border-stone-800 bg-stone-900/50 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-spice-100 flex items-center gap-2">
          <Bot className="h-5 w-5 text-spice-500" />
          Wayfinder AI Analyst
        </h2>
        <span className="text-xs px-2 py-1 rounded bg-spice-900/30 text-spice-400 border border-spice-900/50">Gemini 2.5 Flash</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-950/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              msg.role === 'user' ? 'bg-stone-700' : 'bg-spice-900'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-spice-200" />}
            </div>
            <div
              className={`max-w-[80%] rounded-lg p-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-stone-800 text-stone-100'
                  : 'bg-spice-950/40 border border-spice-900/20 text-stone-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-spice-500 text-sm ml-11">
            <Loader2 className="animate-spin h-4 w-4" />
            <span className="animate-pulse">Analyzing report data...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-stone-900/50 border-t border-stone-800">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about Shai-Hulud specifics..."
            className="flex-1 bg-stone-950 border border-stone-700 text-stone-200 text-sm rounded-lg focus:ring-2 focus:ring-spice-600 focus:border-transparent p-3 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-spice-700 hover:bg-spice-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};