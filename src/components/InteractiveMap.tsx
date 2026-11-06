import React, { useState } from 'react';
import { Property } from '../types/property';

interface InteractiveMapProps {
  properties: Property[];
  selectedProperty: Property;
  onSelectProperty: (property: Property) => void;
  isListView: boolean;
  onToggleListView: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  isListView,
  onToggleListView,
}) => {
  const [mapLayer, setMapLayer] = useState<'dark' | 'satellite' | 'topography'>('dark');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (clientX: number, clientY: number) => {
    setIsPanning(true);
    setStartPos({ x: clientX - panOffset.x, y: clientY - panOffset.y });
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isPanning) return;
    setPanOffset({
      x: Math.max(-120, Math.min(120, clientX - startPos.x)),
      y: Math.max(-80, Math.min(80, clientY - startPos.y)),
    });
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  const handleRecenter = () => {
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  const cycleLayer = () => {
    if (mapLayer === 'dark') setMapLayer('topography');
    else if (mapLayer === 'topography') setMapLayer('satellite');
    else setMapLayer('dark');
  };

  return (
    <div className="relative w-full h-[520px] overflow-hidden bg-[#0d0e11] select-none">
      {/* Floating View Switcher at top center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={onToggleListView}
          type="button"
          className="bg-[#343538]/95 hover:bg-[#38393c] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 transition-all active:scale-95 cursor-pointer backdrop-blur-xl"
        >
          <span className="material-symbols-outlined text-[18px] text-primary">
            {isListView ? 'map' : 'view_list'}
          </span>
          <span className="text-xs font-bold tracking-wide">
            {isListView ? 'Ver no Mapa' : 'Ver em Lista'}
          </span>
        </button>
      </div>

      {/* Map Control Tools (Top Right) */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
        <button
          onClick={handleRecenter}
          title="Recentralizar Mapa SAJ"
          type="button"
          className="w-10 h-10 rounded-full bg-[#1f1f23]/90 hover:bg-[#292a2d] border border-white/10 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-[19px] text-primary">navigation</span>
        </button>
        <button
          onClick={cycleLayer}
          title={`Camada Atual: ${mapLayer}`}
          type="button"
          className="w-10 h-10 rounded-full bg-[#1f1f23]/90 hover:bg-[#292a2d] border border-white/10 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-[19px]">layers</span>
        </button>
        <div className="flex flex-col rounded-full bg-[#1f1f23]/90 border border-white/10 overflow-hidden shadow-lg backdrop-blur-md">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
            className="w-10 h-8 text-white hover:text-primary flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            +
          </button>
          <div className="w-6 h-px bg-white/10 mx-auto" />
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
            className="w-10 h-8 text-white hover:text-primary flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            -
          </button>
        </div>
      </div>

      {/* Draggable Map Canvas Surface */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
        }}
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handlePointerUp}
      >
        {/* Stylized Architectural SVG Map */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern height="120" id="streetGrid" patternUnits="userSpaceOnUse" width="120">
              <path
                d="M 0 35 L 120 35 M 45 0 L 45 120 M 0 95 L 120 95 M 100 0 L 100 120"
                fill="none"
                stroke="#292a2d"
                strokeWidth="1.2"
              />
              <path
                d="M 0 35 Q 45 50 120 35"
                fill="none"
                opacity="0.4"
                stroke="#4d4635"
                strokeWidth="0.8"
              />
            </pattern>
            {/* Soft Radial Ambient Glow for Luxury Zones */}
            <radialGradient cx="54%" cy="48%" id="primeZoneGlow" r="45%">
              <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.14" />
              <stop offset="60%" stopColor="#d4af37" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#121316" stopOpacity="0" />
            </radialGradient>
            <radialGradient cx="20%" cy="30%" id="ruralGlow" r="35%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#121316" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Base Background */}
          <rect fill="#121316" height="100%" width="100%" />
          <rect fill="url(#streetGrid)" height="100%" width="100%" opacity={0.7} />

          {/* Glow Areas */}
          <circle cx="54%" cy="48%" fill="url(#primeZoneGlow)" r="180" />
          <circle cx="20%" cy="30%" fill="url(#ruralGlow)" r="140" />

          {/* Rio da Dona River Curve */}
          <path
            d="M-40,80 C120,90 140,240 280,310 C360,350 420,490 520,530"
            fill="none"
            opacity="0.3"
            stroke="#1e3a8a"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Primary Arterial Avenues (Bahia State Route BA-046 & SAJ Ring) */}
          <path
            d="M-20,180 C80,210 180,160 260,240 C340,320 390,440 460,520"
            fill="none"
            opacity="0.65"
            stroke="#574500"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M30,-20 C90,140 130,220 220,310 C320,400 420,410 460,420"
            fill="none"
            opacity="0.75"
            stroke="#343538"
            strokeWidth="5"
          />
          <path
            d="M120,480 C210,430 260,260 410,130"
            fill="none"
            opacity="0.4"
            stroke="#99907c"
            strokeDasharray="6,4"
            strokeWidth="1.8"
          />

          {/* Secondary streets */}
          <path d="M180,240 L350,180" fill="none" opacity="0.4" stroke="#4d4635" strokeWidth="2" />
          <path d="M220,310 L150,420" fill="none" opacity="0.4" stroke="#4d4635" strokeWidth="2" />
          <path d="M260,240 L420,280" fill="none" opacity="0.4" stroke="#4d4635" strokeWidth="2" />
        </svg>

        {/* Geographic Micro-Labels */}
        <div className="absolute top-20 left-6 text-[#99907c]/50 font-bold text-[10px] tracking-widest uppercase pointer-events-none">
          Urbis I &amp; II • SAJ
        </div>
        <div className="absolute top-28 right-8 text-[#99907c]/50 font-bold text-[10px] tracking-widest uppercase pointer-events-none">
          Alto Sobradinho
        </div>
        <div className="absolute bottom-40 left-8 text-[#99907c]/50 font-bold text-[10px] tracking-widest uppercase pointer-events-none">
          Andaiá Residencial
        </div>
        <div className="absolute top-12 left-1/3 text-[#99907c]/40 font-bold text-[10px] tracking-widest uppercase pointer-events-none">
          Centro Histórico • Praça Padre Mateus
        </div>

        {/* Interactive Property Pins */}
        {properties.map((prop) => {
          const isSelected = selectedProperty.id === prop.id;
          const { x, y } = prop.mapCoordinates;

          return (
            <div
              key={prop.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectProperty(prop);
              }}
              style={{ top: `${y}%`, left: `${x}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                isSelected ? 'z-30 scale-110' : 'z-20 hover:scale-105'
              }`}
            >
              {isSelected ? (
                /* SELECTED PIN: Golden Glow with Pulsing Aura Halo */
                <div className="flex flex-col items-center">
                  <div className="absolute -top-3 w-28 h-12 bg-primary/25 rounded-full blur-md animate-ping pointer-events-none" />
                  <div className="relative bg-primary text-on-primary px-3.5 py-1.5 rounded-full shadow-[0_4px_24px_rgba(242,202,80,0.5)] flex items-center gap-1.5 border border-[#ffe088]">
                    <span className="material-symbols-outlined text-[15px] font-bold text-[#3c2f00]">
                      star
                    </span>
                    <span className="text-xs font-bold text-[#3c2f00] tracking-tight whitespace-nowrap">
                      {prop.pinLabel}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#5312bd] animate-pulse" />
                  </div>
                  {/* Triangle Base Pointer */}
                  <div className="w-3 h-3 bg-primary rotate-45 -mt-1.5 shadow-md" />
                  <div className="w-2.5 h-2.5 bg-primary-container rounded-full mt-1 blur-[1px]" />
                </div>
              ) : (
                /* STANDARD LUXURY PIN */
                <div className="group flex flex-col items-center">
                  <div className="bg-[#292a2d]/95 group-hover:bg-[#d4af37] border border-white/10 group-hover:border-primary px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1 transition-colors">
                    <span className="text-xs font-bold text-white group-hover:text-[#3c2f00] whitespace-nowrap">
                      {prop.pinLabel}
                    </span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-[#292a2d] group-hover:bg-primary mx-auto -mt-0.5 rounded-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
