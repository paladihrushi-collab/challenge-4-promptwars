export default function Simulations() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Simulations</h2>
          <p className="text-zinc-400 mt-1">Run predictive models on crowd flow and tactical strategies.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg px-6 py-2 transition-colors">
          Run New Simulation
        </button>
      </header>

      <div className="glass-panel p-6">
        <div className="aspect-[21/9] bg-green-900/10 border border-green-500/20 rounded-xl relative overflow-hidden flex flex-col items-center justify-center">
          {/* Fake Field Placeholder */}
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`, 
            backgroundSize: '20px 20px' 
          }}></div>
          
          <div className="z-10 text-center">
            <svg className="w-16 h-16 text-zinc-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2-1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
            </svg>
            <h3 className="text-xl font-bold text-zinc-500">No Active Simulation</h3>
            <p className="text-sm text-zinc-600 mt-2">Select a scenario from the sidebar to begin.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="glass-panel p-5 cursor-pointer hover:bg-white/5 transition-colors border-l-4 border-l-cyan-500">
          <h4 className="font-semibold text-white">Emergency Evacuation</h4>
          <p className="text-sm text-zinc-400 mt-1">Predictive pathing for Gate 1-4 full clear.</p>
        </div>
        <div className="glass-panel p-5 cursor-pointer hover:bg-white/5 transition-colors border-l-4 border-l-blue-500">
          <h4 className="font-semibold text-white">Half-time Congestion</h4>
          <p className="text-sm text-zinc-400 mt-1">Simulate concession stand bottleneck formations.</p>
        </div>
        <div className="glass-panel p-5 cursor-pointer hover:bg-white/5 transition-colors border-l-4 border-l-zinc-700">
          <h4 className="font-semibold text-white">Custom Scenario</h4>
          <p className="text-sm text-zinc-400 mt-1">Configure your own agent variables.</p>
        </div>
      </div>
    </div>
  );
}
