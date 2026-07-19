export default function AIInsights() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">AI Insights</h2>
          <p className="text-zinc-400 mt-1">LangGraph Agent analysis and historical anomaly detection.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-zinc-300 transition-colors">
          Export Log (CSV)
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 h-[400px] flex flex-col justify-center items-center">
            <h3 className="text-zinc-500 mb-2">Crowd Density vs Time (Placeholder)</h3>
            <div className="w-full h-48 border-b-2 border-l-2 border-zinc-700 relative">
              {/* Fake Chart */}
              <div className="absolute bottom-0 left-[10%] w-[10%] h-[30%] bg-cyan-500/20 border-t border-cyan-500"></div>
              <div className="absolute bottom-0 left-[30%] w-[10%] h-[50%] bg-cyan-500/20 border-t border-cyan-500"></div>
              <div className="absolute bottom-0 left-[50%] w-[10%] h-[80%] bg-red-500/20 border-t border-red-500"></div>
              <div className="absolute bottom-0 left-[70%] w-[10%] h-[40%] bg-cyan-500/20 border-t border-cyan-500"></div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h3 className="text-white font-semibold mb-4">Agent Reasoning Trace</h3>
            <div className="space-y-4 border-l border-zinc-700 pl-4 ml-2">
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-cyan-400"></span>
                <p className="text-sm text-zinc-300">CV Model detected density spike in Sector 3.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-blue-400"></span>
                <p className="text-sm text-zinc-300">LangGraph Event Classifier categorized as: <span className="text-blue-400 font-mono">CONGESTION_WARNING</span></p>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-emerald-400"></span>
                <p className="text-sm text-zinc-300">Recommended Action: Open Gate 3B overflow exits.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 h-[600px] overflow-y-auto">
          <h3 className="text-white font-semibold mb-4">Recent Events Log</h3>
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="p-3 bg-zinc-900/50 rounded-lg text-sm border border-white/5">
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span>{10 - i} min ago</span>
                  <span>ID: EVT-{8391 - i}</span>
                </div>
                <p className="text-zinc-300">Standard tracking ping received from {i % 2 === 0 ? 'Sector 2' : 'Sector 4'}. Baseline normal.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
