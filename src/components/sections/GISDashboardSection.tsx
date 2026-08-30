import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ShieldCheck, Eye, Terminal } from 'lucide-react';
import { GIS_LOCATIONS } from '../../data/projectData';
import { GISLocation } from '../../types';
import L from 'leaflet';

export const GISDashboardSection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<GISLocation>(GIS_LOCATIONS[0]);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [selectedObject, setSelectedObject] = useState<GISLocation['objects'][0] | null>(GIS_LOCATIONS[0].objects[0]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [selectedLocation.lat, selectedLocation.lng],
        zoom: selectedLocation.zoom,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
      }).addTo(map);

      L.control.attribution({ position: 'bottomright' })
        .addAttribution('Esri World Imagery')
        .addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([selectedLocation.lat, selectedLocation.lng], selectedLocation.zoom);
    }
  }, [selectedLocation]);

  return (
    <section id="gis" className="w-full py-24 bg-[#080808] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] font-bold">04</span>
            <h2 className="text-sm font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Interactive Map
            </h2>
          </div>
          <h3 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white uppercase">
            EXPLORE THE<br/>
            <span className="text-[#00F0FF] text-glow-cyan">REAL WORLD.</span>
          </h3>
          <p className="text-sm text-neutral-300 font-sans leading-relaxed mt-4 max-w-2xl">
            Select a location below to pan the map. Our AI analyzes these regions to identify structures, military assets, and geographical features with high confidence.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {GIS_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => {
                setSelectedLocation(loc);
                setSelectedObject(loc.objects[0]);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedLocation.id === loc.id
                  ? 'bg-[#00F0FF] text-black font-bold shadow-lg shadow-[#00F0FF]/20'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-[#0e0e0e] border border-white/10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE FEED ONLINE</span>
            </div>

            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                showHeatmap
                  ? 'bg-[#FF334F]/20 text-[#FF334F] border-[#FF334F]'
                  : 'bg-white/5 text-neutral-400 border-white/10'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>AI SCAN {showHeatmap ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden border border-white/15 bg-black">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              <div className="absolute top-4 left-4 z-[400] p-3 rounded-xl bg-black/85 border border-white/15 backdrop-blur-md text-xs font-mono space-y-1 pointer-events-none">
                <div className="text-[#00F0FF] font-bold">{selectedLocation.name}</div>
                <div className="text-[10px] text-neutral-300">
                  LAT: {selectedLocation.lat.toFixed(4)} N | LNG: {selectedLocation.lng.toFixed(4)} E
                </div>
              </div>

              {showHeatmap && (
                <div className="absolute inset-0 z-[300] pointer-events-none opacity-20 mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent"></div>
              )}
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl bg-black border border-white/15 flex flex-col text-xs font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-neutral-400 uppercase font-bold">AI INSPECTOR</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>

              {selectedObject ? (
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase">IDENTIFIED TARGET</div>
                    <div className="text-base font-bold font-display text-white">{selectedObject.name}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">CLASSIFICATION:</span>
                      <span className="text-white uppercase font-bold">{selectedObject.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">CONFIDENCE:</span>
                      <span className="text-[#00F0FF] font-bold">{selectedObject.confidence}%</span>
                    </div>
                  </div>
                  
                  <p className="text-neutral-500 text-[10px] mt-4 leading-relaxed">
                    * The AI automatically scans this region using enhanced 2.5m resolution to detect features that are normally invisible to standard satellites.
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-neutral-500">
                  Select a location to view AI details.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
