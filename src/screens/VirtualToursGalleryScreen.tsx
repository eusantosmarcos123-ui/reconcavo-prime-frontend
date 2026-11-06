import React, { useState } from 'react';
import { Property } from '../types/property';
import { PanoramaViewer } from '../components/PanoramaViewer';

interface VirtualToursGalleryScreenProps {
  properties: Property[];
  onSelectPropertyDetails: (property: Property) => void;
  onOpenWhatsApp: (property: Property) => void;
}

export const VirtualToursGalleryScreen: React.FC<VirtualToursGalleryScreenProps> = ({
  properties,
  onSelectPropertyDetails,
  onOpenWhatsApp,
}) => {
  const propertiesWith360 = properties.filter((p) => p.hasVirtualTour);
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);
  const activeProperty = propertiesWith360[activePropertyIndex] || propertiesWith360[0];

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col w-full pb-28 space-y-4">
      {/* Top Banner */}
      <div className="px-4 max-w-4xl mx-auto w-full pt-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[11px] font-bold text-primary uppercase font-mono tracking-wider">
                Spatial WebXR Experience
              </span>
            </div>
            <h2 className="font-serif text-2xl text-white font-medium">
              Imóveis 360° Recôncavo
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold font-mono">
            {propertiesWith360.length} Tours Ativos
          </span>
        </div>
      </div>

      {/* Main Active 360 Canvas */}
      {activeProperty && (
        <div className="relative w-full">
          <PanoramaViewer
            key={activeProperty.id}
            rooms={activeProperty.rooms360}
            height="440px"
          />

          {/* Quick HUD overlay with active property name and direct jump */}
          <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-30">
            <div className="bg-[#1f1f23]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">
                  {activeProperty.categoryLabel} • {activeProperty.neighborhood}
                </span>
                <h3 className="font-serif text-lg font-semibold text-white">
                  {activeProperty.title}
                </h3>
                <span className="font-serif text-xl font-bold text-primary">
                  {formatPrice(activeProperty.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectPropertyDetails(activeProperty)}
                  type="button"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-[#3c2f00] text-xs font-bold hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>Ver Ficha Completa</span>
                </button>
                <button
                  onClick={() => onOpenWhatsApp(activeProperty)}
                  type="button"
                  className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other 360 Properties Selector Carousel */}
      <div className="px-4 max-w-4xl mx-auto w-full pt-4 space-y-3">
        <h4 className="font-serif text-base text-white font-medium">
          Alternar Mansões com Tour 360°
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {propertiesWith360.map((prop, idx) => {
            const isCurrent = idx === activePropertyIndex;
            return (
              <div
                key={prop.id}
                onClick={() => setActivePropertyIndex(idx)}
                className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all border ${
                  isCurrent
                    ? 'bg-[#292a2d] border-primary shadow-lg ring-1 ring-primary'
                    : 'bg-[#1f1f23] border-white/5 hover:bg-[#292a2d]/80'
                }`}
              >
                <img
                  src={prop.coverImage}
                  alt={prop.title}
                  className="w-16 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-primary uppercase font-mono">
                    {prop.rooms360.length} Cômodos 360°
                  </span>
                  <h5 className="text-xs font-bold text-white truncate">{prop.title}</h5>
                  <p className="text-[11px] text-[#c6c6cb]">{formatPrice(prop.price)}</p>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isCurrent ? 'bg-primary text-[#3c2f00]' : 'bg-[#15171a] text-[#c6c6cb]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isCurrent ? 'play_arrow' : '360'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
