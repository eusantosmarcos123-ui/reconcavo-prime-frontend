import React, { useState } from 'react';
import { Property } from '../types/property';
import { PanoramaViewer } from '../components/PanoramaViewer';
import { ScheduleModal } from '../components/ScheduleModal';

interface PropertyDetailsScreenProps {
  property: Property;
  onOpenWhatsApp: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
}

export const PropertyDetailsScreen: React.FC<PropertyDetailsScreenProps> = ({
  property,
  onOpenWhatsApp,
  favorites,
  onToggleFavorite,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const isFavorite = favorites.includes(property.id);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col w-full pb-32">
      {/* 360 Spatial Panorama Viewer / WebXR Canvas */}
      <PanoramaViewer rooms={property.rooms360} height="480px" />

      {/* Property Details Content Body */}
      <div className="flex flex-col px-4 sm:px-6 max-w-4xl mx-auto w-full pt-6 space-y-6">
        {/* Header Information */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-bold text-primary uppercase tracking-widest font-mono">
              {property.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[18px]">star</span>
              <span className="text-xs font-semibold">
                {property.rating.toFixed(1)} ({property.ratingLabel || 'Imóvel Singular'})
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              {formatPrice(property.price)}
            </h2>
            <div className="text-xs text-[#d0c5af]">
              IPTU: {property.iptu || 'R$ 450/mês'} • Condomínio:{' '}
              {property.condoFee ? `R$ ${property.condoFee}/mês` : 'R$ 1.200/mês'}
            </div>
          </div>

          <div className="flex items-start justify-between gap-3 pt-1">
            <h3 className="font-serif text-2xl sm:text-3xl text-white leading-snug font-medium">
              {property.title}
            </h3>
            <button
              onClick={() => onToggleFavorite(property.id)}
              aria-label="Favoritar imóvel"
              type="button"
              className={`w-11 h-11 rounded-full bg-[#1f1f23] hover:bg-[#292a2d] border border-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isFavorite ? 'text-primary' : 'text-[#c6c6cb]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {isFavorite ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[#d0c5af] pt-1">
            <span className="material-symbols-outlined text-primary text-[20px]">pin_drop</span>
            <span className="text-sm">
              {property.neighborhood}, {property.city}
            </span>
          </div>
        </div>

        {/* Architectural Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#1b1b1f] border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-primary mb-2">
              <span className="material-symbols-outlined text-[24px]">bed</span>
              <span className="text-[10px] uppercase font-bold text-[#99907c]">Suítes</span>
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-white">{property.suites} Suítes</p>
              <p className="text-[11px] text-[#99907c]">Todas com Closet</p>
            </div>
          </div>

          <div className="bg-[#1b1b1f] border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-primary mb-2">
              <span className="material-symbols-outlined text-[24px]">straighten</span>
              <span className="text-[10px] uppercase font-bold text-[#99907c]">Área</span>
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-white">{property.areaM2} m²</p>
              <p className="text-[11px] text-[#99907c]">Área Construída</p>
            </div>
          </div>

          <div className="bg-[#1b1b1f] border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-primary mb-2">
              <span className="material-symbols-outlined text-[24px]">garage_home</span>
              <span className="text-[10px] uppercase font-bold text-[#99907c]">Garagem</span>
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-white">
                {property.garageSlots} Vagas
              </p>
              <p className="text-[11px] text-[#99907c]">Cobertas &amp; Tomada EV</p>
            </div>
          </div>

          <div className="bg-[#1b1b1f] border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-primary mb-2">
              <span className="material-symbols-outlined text-[24px]">waves</span>
              <span className="text-[10px] uppercase font-bold text-[#99907c]">Lazer</span>
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-white">Borda Infinita</p>
              <p className="text-[11px] text-[#99907c]">Piscina Aquecida</p>
            </div>
          </div>

          {/* Smart Home & Sustainability Card */}
          <div className="bg-[#1b1b1f] border border-white/5 p-4 rounded-2xl flex flex-col justify-between col-span-2 sm:col-span-4 shadow-sm">
            <div className="flex items-center justify-between text-primary mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px]">solar_power</span>
                <span className="material-symbols-outlined text-[24px]">home_iot_device</span>
              </div>
              <span className="text-[11px] text-primary font-bold uppercase tracking-wider">
                100% Autônomo
              </span>
            </div>
            <div>
              <p className="font-serif text-base font-semibold text-white mb-1">
                Sustentabilidade &amp; Smart Home
              </p>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                {property.smartHomeFeatures}
              </p>
            </div>
          </div>
        </div>

        {/* Memorial Descritivo & Conceito */}
        <div className="bg-[#1b1b1f] border border-white/5 p-5 rounded-2xl shadow-sm flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">auto_stories</span>
            <h4 className="font-serif text-lg text-white font-medium">
              Memorial Descritivo &amp; Conceito
            </h4>
          </div>
          {property.descriptionParagraphs.map((para, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Localização Privilegiada */}
        <div className="bg-[#1b1b1f] border border-white/5 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-serif text-base text-white font-medium">Localização Privilegiada</h4>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Zona Exclusiva
            </span>
          </div>
          <div className="w-full h-44 rounded-xl relative overflow-hidden border border-white/10 bg-[#0d0e11] flex items-center justify-center">
            {/* Architectural Grid visual */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="locGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0 40 L 40 40 M 40 0 L 40 40" fill="none" stroke="#292a2d" strokeWidth="1" />
                </pattern>
              </defs>
              <rect fill="#1b1b1f" width="100%" height="100%" />
              <rect fill="url(#locGrid)" width="100%" height="100%" />
              <path
                d="M0,80 Q100,50 200,90 T400,100"
                fill="none"
                stroke="#574500"
                strokeWidth="4"
              />
            </svg>

            {/* Glowing Center Badge */}
            <div className="relative z-10 px-4 py-2.5 rounded-full bg-[#1f1f23]/95 backdrop-blur-md border border-primary/40 flex items-center gap-2 shadow-2xl">
              <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
              <span className="text-xs text-white font-semibold">
                {property.neighborhood}, {property.city}
              </span>
            </div>
          </div>
        </div>

        {/* Broker Information Card */}
        <div className="bg-[#1b1b1f] border border-white/5 p-4 rounded-2xl shadow-sm flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                alt={property.broker.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/40"
                src={property.broker.avatarUrl}
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#1b1b1f]" />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h5 className="font-serif text-base text-white font-semibold truncate">
                  {property.broker.name}
                </h5>
                <div className="flex items-center text-primary">
                  <span className="material-symbols-outlined text-[16px]">star</span>
                  <span className="text-xs font-bold ml-0.5">{property.broker.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-xs text-[#c6c6cb] truncate">{property.broker.creci}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-emerald-400 font-medium">
                  Online agora • Resposta média: {property.broker.responseTime}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#1f1f23] p-3 rounded-xl flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <span className="text-xs text-white font-medium">Atendimento Consultivo Sigiloso</span>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase font-mono">
              Certificado
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Sticky Action Bar at Bottom */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121316]/95 backdrop-blur-2xl border-t border-white/5 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* WhatsApp Direct */}
          <button
            onClick={() => onOpenWhatsApp(property)}
            type="button"
            className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-bold text-xs"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span className="truncate">Conversar no WhatsApp</span>
          </button>

          {/* Schedule VIP Visit */}
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            type="button"
            className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary hover:brightness-105 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-bold text-xs"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            <span className="truncate">Agendar Visita</span>
          </button>
        </div>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        property={property}
      />
    </div>
  );
};
