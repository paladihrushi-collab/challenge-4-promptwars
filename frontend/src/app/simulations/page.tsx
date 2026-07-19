"use client";

import { useState, useEffect } from "react";

export default function Simulations() {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const startSimulation = (scenario: string) => {
    setActiveSimulation(scenario);
    setIsSimulating(true);
    setProgress(0);
    setLogs([`Initializing ${scenario} simulation...`]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (Math.random() * 5 + 2);
          
          if (next >= 25 && prev < 25) setLogs(l => [...l, "Generating agent crowd distribution..."]);
          if (next >= 50 && prev < 50) setLogs(l => [...l, "Running physics and pathfinding models..."]);
          if (next >= 75 && prev < 75) setLogs(l => [...l, "Compiling bottleneck probabilities..."]);
          if (next >= 98 && prev < 98) setLogs(l => [...l, "Finalizing report..."]);
          
          if (next >= 100) {
            setIsSimulating(false);
            setLogs(l => [...l, "Simulation Complete!"]);
            return 100;
          }
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isSimulating, progress]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Simulations</h2>
          <p className="text-zinc-400 mt-1">Run predictive models on crowd flow and tactical strategies.</p>
        </div>
        <button 
          onClick={() => startSimulation("Custom Parameter")}
          disabled={isSimulating}
          className={`font-semibold rounded-lg px-6 py-2 transition-colors ${
            isSimulating ? "bg-emerald-900 text-emerald-500 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-400 text-black"
          }`}
        >
          {isSimulating ? "Running..." : "Run New Simulation"}
        </button>
      </header>

      <div className="glass-panel p-6">
        <div className="aspect-[21/9] bg-green-900/10 border border-green-500/20 rounded-xl relative overflow-hidden flex flex-col items-center justify-center">
          {/* Fake Field Placeholder */}
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`, 
            backgroundSize: '20px 20px' 
          }}></div>
          
          <div className="z-10 w-full h-full flex flex-col items-center justify-center p-8">
            {!activeSimulation ? (
              <div className="text-center">
                <svg className="w-16 h-16 text-zinc-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2-1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                </svg>
                <h3 className="text-xl font-bold text-zinc-500">No Active Simulation</h3>
                <p className="text-sm text-zinc-600 mt-2">Select a scenario from the sidebar to begin.</p>
              </div>
            ) : (
              <div className="w-full max-w-2xl bg-black/60 p-6 rounded-xl border border-white/10 backdrop-blur-md animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-emerald-400">{activeSimulation}</h3>
                  <span className="text-xs font-mono text-zinc-400">{progress.toFixed(0)}%</span>
                </div>
                
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-lg font-mono text-xs text-emerald-500/70 h-32 overflow-y-auto flex flex-col gap-1 border border-white/5">
                  {logs.map((log, i) => (
                    <div key={i}>{'>'} {log}</div>
                  ))}
                  {isSimulating && (
                    <div className="animate-pulse">{'>'} _</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div 
          onClick={() => startSimulation("Emergency Evacuation")}
          className="glass-panel p-5 cursor-pointer hover:bg-white/5 transition-colors border-l-4 border-l-cyan-500 group"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">Emergency Evacuation</h4>
          </div>
          <p className="text-sm text-zinc-400 mt-1">Predictive pathing for Gate 1-4 full clear.</p>
        </div>
        
        <div 
          onClick={() => startSimulation("Half-time Congestion")}
          className="glass-panel p-5 cursor-pointer hover:bg-white/5 transition-colors border-l-4 border-l-blue-500 group"
        >
          <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">Half-time Congestion</h4>
          <p className="text-sm text-zinc-400 mt-1">Simulate concession stand bottleneck formations.</p>
        </div>
        
        <div 
          onClick={() => startSimulation("Custom Scenario")}
          className="glass-panel p-5 cursor-pointer hover:bg-white/5 transition-colors border-l-4 border-l-zinc-700 group"
        >
          <h4 className="font-semibold text-white group-hover:text-zinc-400 transition-colors">Custom Scenario</h4>
          <p className="text-sm text-zinc-400 mt-1">Configure your own agent variables.</p>
        </div>
      </div>
    </div>
  );
}
