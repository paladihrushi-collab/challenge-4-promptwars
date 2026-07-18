"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Leaflet needs to be dynamically imported because it uses window/document
const Map = dynamic(
  () => import('./LocalMapComponent'),
  { ssr: false }
);

interface StadiumMapProps {
  zones: any[];
}

export default function StadiumMap({ zones = [] }: StadiumMapProps) {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-md p-3 rounded-xl border border-gray-700 shadow-xl">
        <h3 className="font-bold text-white mb-2">Live Heatmap</h3>
        <div className="flex flex-col gap-2 text-sm">
          <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Normal</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Busy</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Critical</span>
        </div>
      </div>
      <Map zones={zones} />
    </div>
  );
}