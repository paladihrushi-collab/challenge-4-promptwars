import AICopilot from "@/components/AICopilot";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      
      {/* Header section */}
      <header className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Overview</h2>
          <p className="text-zinc-400 mt-1">Live stadium analytics and computer vision monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-emerald-400">System Online</span>
        </div>
      </header>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5">
          <p className="text-sm font-medium text-zinc-400 mb-1">Active Cameras</p>
          <p className="metric-value">24<span className="text-lg text-zinc-500 ml-1">/24</span></p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm font-medium text-zinc-400 mb-1">Detected Persons</p>
          <p className="metric-value">1,482</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm font-medium text-zinc-400 mb-1">AI Events Processed</p>
          <p className="metric-value">8,391</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm font-medium text-zinc-400 mb-1">Simulation Accuracy</p>
          <p className="metric-value text-emerald-400">94.2%</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        
        {/* Left Column - Live Feed (Takes up 2 cols on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel overflow-hidden">
            <div className="bg-zinc-900/50 p-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                Main Stadium Feed
              </h3>
              <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30">LIVE</span>
            </div>
            
            {/* Fake Video Player Placeholder */}
            <div className="aspect-video bg-black relative flex items-center justify-center border-y border-white/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
              
              {/* CV Bounding Box Mockup */}
              <div className="absolute top-[30%] left-[40%] w-[15%] h-[25%] border-2 border-cyan-400 bg-cyan-400/10 rounded-sm"></div>
              <div className="absolute top-[26%] left-[40%] bg-cyan-400 text-black text-[10px] font-bold px-1 rounded-sm">Player: 87%</div>

              <div className="absolute top-[45%] left-[65%] w-[10%] h-[20%] border-2 border-emerald-400 bg-emerald-400/10 rounded-sm"></div>
              <div className="absolute top-[41%] left-[65%] bg-emerald-400 text-black text-[10px] font-bold px-1 rounded-sm">Ball: 99%</div>

            </div>
            <div className="p-4 bg-zinc-900/30 text-sm text-zinc-400 flex justify-between">
              <span>Cam: Sector 4 North</span>
              <span>Model: YOLOv8-Stadium</span>
            </div>
          </div>
        </div>

        {/* Right Column - AI Copilot stream */}
        <div className="glass-panel flex flex-col h-[500px] lg:h-[600px] overflow-hidden">
          <AICopilot />
        </div>

      </div>
    </div>
  );
}
