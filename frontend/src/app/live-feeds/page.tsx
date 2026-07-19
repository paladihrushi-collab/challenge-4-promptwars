export default function LiveFeeds() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Live Camera Feeds</h2>
          <p className="text-zinc-400 mt-1">Multi-angle stadium computer vision stream.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-cyan-500">
            <option>All Sectors</option>
            <option>Sector 1 (North)</option>
            <option>Sector 2 (East)</option>
            <option>Sector 3 (South)</option>
            <option>Sector 4 (West)</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-cyan-500">
            <option>Model: YOLOv8</option>
            <option>Model: OpenPose</option>
            <option>Model: Custom Crowd</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((cam) => (
          <div key={cam} className="glass-panel overflow-hidden group">
            <div className="bg-zinc-900/50 p-2 border-b border-white/5 flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-300">Cam {cam} - Sector {cam}</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="aspect-video bg-zinc-950 relative border-b border-white/5 overflow-hidden">
              <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700`}></div>
              {/* Simulated CV Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-2 py-1 bg-black/50 rounded border border-white/10 text-xs text-zinc-500 font-mono">NO MOTION DETECTED</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
