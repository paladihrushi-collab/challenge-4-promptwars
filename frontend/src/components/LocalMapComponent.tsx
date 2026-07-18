"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ZoneData {
  zone_id: string;
  name: string;
  density: number;
  status: string;
}

interface LocalMapProps {
  zones: ZoneData[];
}

export default function LocalMapComponent({ zones = [] }: LocalMapProps) {
  // MetLife Stadium coordinates
  const position: L.LatLngExpression = [40.8136, -74.0759];

  // Hardcode coordinates for our simulated zones
  const zoneLocations: Record<string, [number, number]> = {
    'gate-1': [40.8145, -74.0765],
    'gate-2': [40.8125, -74.0745],
    'gate-3': [40.8130, -74.0775],
    'lot-e': [40.8105, -74.0755],
    'lot-g': [40.8155, -74.0750],
    'section-100': [40.8136, -74.0759] // center
  };

  const getColor = (status: string) => {
    if (status === 'Critical') return '#ef4444'; // red-500
    if (status === 'Busy') return '#eab308';     // yellow-500
    return '#22c55e';                            // green-500
  };

  return (
    <MapContainer 
      center={position} 
      zoom={16} 
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {zones.map((zone) => {
        const coords = zoneLocations[zone.zone_id];
        if (!coords) return null;
        
        return (
          <CircleMarker 
            key={zone.zone_id}
            center={coords} 
            radius={zone.zone_id.includes('section') ? 40 : 20}
            pathOptions={{ 
              color: getColor(zone.status),
              fillColor: getColor(zone.status),
              fillOpacity: 0.6,
              weight: 2
            }}
          >
            <Popup>
              <div className="font-sans text-sm">
                <strong>{zone.name}</strong><br/>
                Status: {zone.status}<br/>
                Density: {(zone.density * 100).toFixed(1)}%
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}