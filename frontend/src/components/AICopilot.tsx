"use client";

import React, { useState } from 'react';
import { Send, Bot, ShieldAlert, Navigation } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  confidence?: number;
  actions?: string[];
}

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'StadiumMind Copilot online. How can I assist you with operations?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Connect to our AI Engine /query endpoint
      let aiUrl = process.env.NEXT_PUBLIC_AI_ENGINE_URL || 'http://localhost:8001';
      if (aiUrl && !aiUrl.startsWith('http')) {
        aiUrl = `https://${aiUrl}`;
      }
      const res = await fetch(`${aiUrl}/query?query=${encodeURIComponent(userMsg)}`, {
        method: 'POST'
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: data.response,
        confidence: data.confidence,
        actions: data.recommended_actions
      }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Error connecting to AI Engine.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50">
      <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-gray-900/80">
        <Bot className="text-emerald-400 w-6 h-6" />
        <h3 className="font-semibold">AI Operations Copilot</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col max-w-[85%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
            <div className={`p-3 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'}`}>
              {m.content}
            </div>
            {m.confidence && (
              <span className="text-xs text-emerald-400 mt-1 ml-1 font-mono">
                Confidence: {(m.confidence * 100).toFixed(1)}%
              </span>
            )}
            {m.actions && m.actions.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                {m.actions.map((act, j) => (
                  <button key={j} className="text-xs bg-gray-800 hover:bg-gray-700 border border-emerald-500/30 text-emerald-300 py-1.5 px-3 rounded text-left transition-colors">
                    Execute: {act}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="self-start bg-gray-800 text-gray-400 p-3 rounded-2xl rounded-bl-none border border-gray-700 animate-pulse">
            Analyzing operational data...
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-800 bg-gray-900/80">
        <div className="relative">
          <input 
            type="text" 
            className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Ask about crowd, emergencies, etc..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}