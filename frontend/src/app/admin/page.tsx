"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Users, ShieldAlert, ThermometerSun, AlertTriangle, CheckCircle2 } from 'lucide-react';
import StadiumMap from '@/components/StadiumMap';
import AICopilot from '@/components/AICopilot';

interface ZoneData {
  zone_id: string;
  name: string;
  density: number;
  status: string;
}

interface EmergencyAlert {
  id: string;
  timestamp: number;
  camera: string;
  type: string;
  location: string;
  severity: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [zones, setZones] = useState<ZoneData[]>([]);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    // Generate a random client ID for WebSocket
    const clientId = Math.random().toString(36).substring(7);
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
    const ws = new WebSocket(`${wsUrl}/ws/${clientId}`);

    ws.onopen = () => setWsConnected(true);
    ws.onclose = () => setWsConnected(false);
    
    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'crowd_update') {
          setZones(payload.data.zones);
        } else if (payload.type === 'emergency_alert') {
          setAlerts(prev => [payload.data, ...prev].slice(0, 10)); // keep last 10
        }
      } catch (e) {
        console.error("Failed to parse WS message", e);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <Activity className="text-blue-500 w-8 h-8" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            StadiumMind AI
          </h1>
        </div>
        
        <nav className="flex-1 space-y-4">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-gray-800'}`}>
            <Activity className="w-5 h-5" /> Overview
          </button>
          <button onClick={() => setActiveTab('crowd')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'crowd' ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-gray-800'}`}>
            <Users className="w-5 h-5" /> Crowd Intelligence
          </button>
          <button onClick={() => setActiveTab('emergency')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'emergency' ? 'bg-red-600/20 text-red-400' : 'hover:bg-gray-800'}`}>
            <ShieldAlert className="w-5 h-5" /> Emergency Protocol
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col">
        <header className="h-16 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md flex items-center px-6 justify-between">
          <h2 className="text-xl font-semibold capitalize">{activeTab} Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${wsConnected ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
              <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
              {wsConnected ? 'Live Sync Active' : 'Offline'}
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </div>
        </header>

        <div className="flex-1 p-6 flex gap-6 overflow-hidden">
          {/* Main View Area */}
          <div className="flex-1 rounded-xl bg-gray-900/50 border border-gray-800 overflow-hidden relative shadow-2xl flex flex-col">
            {activeTab === 'overview' && <StadiumMap zones={zones} />}
            
            {activeTab === 'crowd' && (
              <div className="p-6 overflow-y-auto h-full">
                <h3 className="text-xl font-bold mb-6">Real-Time Zone Densities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {zones.map(z => (
                    <div key={z.zone_id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg">{z.name}</div>
                        <div className="text-gray-400 text-sm">Status: {z.status}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${z.status === 'Critical' ? 'text-red-500' : z.status === 'Busy' ? 'text-yellow-500' : 'text-green-500'}`}>
                          {(z.density * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                  {zones.length === 0 && <div className="text-gray-400">Waiting for telemetry...</div>}
                </div>
              </div>
            )}
            
            {activeTab === 'emergency' && (
              <div className="p-6 overflow-y-auto h-full">
                <h3 className="text-xl font-bold mb-6 text-red-400 flex items-center gap-2">
                  <AlertTriangle /> Active AI Alerts
                </h3>
                <div className="flex flex-col gap-4">
                  {alerts.map(a => (
                    <div key={a.id} className="bg-red-950/30 border border-red-500/50 p-4 rounded-xl flex gap-4 items-start">
                      <div className="bg-red-500/20 p-3 rounded-full text-red-400">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-red-400 text-lg">{a.type}</h4>
                          <span className="text-xs font-mono text-gray-500">
                            {new Date(a.timestamp * 1000).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-gray-300 mt-1">Location: <span className="text-white">{a.location}</span></div>
                        <div className="text-gray-300">Camera: <span className="font-mono">{a.camera}</span> | Severity: <span className="text-red-400 font-bold">{a.severity}</span></div>
                      </div>
                      <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm rounded-lg flex items-center gap-2 transition-colors">
                        <CheckCircle2 className="w-4 h-4" /> Resolve
                      </button>
                    </div>
                  ))}
                  {alerts.length === 0 && (
                    <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-4">
                      <ShieldAlert className="w-12 h-12 text-gray-700" />
                      No active emergency alerts.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* AI Copilot Panel */}
          <div className="w-96 rounded-xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl flex flex-col overflow-hidden">
            <AICopilot />
          </div>
        </div>
      </main>
    </div>
  );
}