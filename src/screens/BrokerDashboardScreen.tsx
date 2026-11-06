import React, { useState } from 'react';
import { Property } from '../types/property';
import { BROKER_DEFAULT } from '../data/properties';

interface BrokerDashboardScreenProps {
  properties: Property[];
  onOpenAddProperty: () => void;
  onNavigateToDetails: (property: Property) => void;
}

export const BrokerDashboardScreen: React.FC<BrokerDashboardScreenProps> = ({
  properties,
  onOpenAddProperty,
  onNavigateToDetails,
}) => {
  const [activeDay, setActiveDay] = useState<string>('Sáb');
  const [conciergeCalled, setConciergeCalled] = useState(false);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `Confira o tour virtual 360° exclusivo de ${title} no Recôncavo Prime!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link do tour 360° copiado para a área de transferência!');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-4xl mx-auto px-4 py-2 space-y-4">
      {/* Header / Corretor Greeting Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1f1f23] border border-white/10 p-5 shadow-xl">
        {/* Glow gradient accent in corner */}
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider font-mono">
                Corretor Prime Ativo
              </span>
            </div>
            <h2 className="font-serif text-2xl text-white font-medium truncate">
              Olá, Carlos Eduardo
            </h2>
            <p className="text-xs text-[#c6c6cb] truncate mt-0.5">
              {BROKER_DEFAULT.creci} • Especialista Alto Padrão
            </p>
          </div>

          {/* Quick Access Switch / Mini Tier Badge */}
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0d0e11] text-primary text-[11px] font-bold tracking-wide shadow-sm border border-primary/30">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Tier Ouro
            </span>
            <span className="text-xs text-[#99907c] mt-1.5 text-right">SAJ &amp; Região</span>
          </div>
        </div>

        {/* Live Opportunity Notification Banner */}
        <div className="mt-4 p-3 rounded-xl bg-[#1b1b1f]/90 border border-white/5 flex items-center justify-between gap-2 transition-all">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </div>
            <p className="text-xs text-white truncate">
              Novo lead via WhatsApp em{' '}
              <strong className="text-primary font-semibold">Mansão Alphaville</strong>
            </p>
          </div>
          <span className="text-[10px] text-[#99907c] whitespace-nowrap">há 15m</span>
        </div>
      </div>

      {/* Quick CTA: Cadastrar Imóvel 360 */}
      <button
        onClick={onOpenAddProperty}
        type="button"
        className="w-full relative overflow-hidden group rounded-2xl p-0.5 bg-gradient-to-r from-primary via-primary-fixed to-primary-container shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
      >
        <div className="w-full h-full bg-[#0d0e11]/85 backdrop-blur-md group-hover:bg-transparent rounded-[14px] p-3.5 flex items-center justify-between transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-[#3c2f00] flex items-center justify-center shadow-md shrink-0">
              <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-white group-hover:text-[#3c2f00] transition-colors leading-tight">
                Cadastrar Novo Imóvel
              </span>
              <span className="text-xs text-primary group-hover:text-[#554300] transition-colors">
                Com Tour Virtual WebXR • Câmera 360°
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary group-hover:text-[#3c2f00] text-[20px] transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </div>
      </button>

      {/* Metrics Bento Grid (4 Cards) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-[#99907c] uppercase tracking-widest font-mono">
            Resumo Operacional (30D)
          </span>
          <span className="text-xs text-primary flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            Outubro
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Metric 1: Visitas 360 */}
          <div className="rounded-xl bg-[#1f1f23] border border-white/5 p-3 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
              </div>
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                +34%
              </span>
            </div>
            <div className="mt-3">
              <span className="font-serif text-2xl text-white font-bold tracking-tight">2.840</span>
              <p className="text-[11px] text-[#99907c] truncate">Visitas 360° Imersivas</p>
            </div>
          </div>

          {/* Metric 2: Leads WhatsApp */}
          <div className="rounded-xl bg-[#1f1f23] border border-white/5 p-3 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">forum</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                Ativo
              </span>
            </div>
            <div className="mt-3">
              <span className="font-serif text-2xl text-white font-bold tracking-tight">48</span>
              <p className="text-[11px] text-[#99907c] truncate">Leads no WhatsApp</p>
            </div>
          </div>

          {/* Metric 3: Imóveis Ativos */}
          <div className="rounded-xl bg-[#1f1f23] border border-white/5 p-3 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">apartment</span>
              </div>
              <span className="text-[11px] text-[#c6c6cb]">Em alta</span>
            </div>
            <div className="mt-3">
              <span className="font-serif text-2xl text-white font-bold tracking-tight">14</span>
              <p className="text-[11px] text-[#99907c] truncate">Imóveis no Catálogo</p>
            </div>
          </div>

          {/* Metric 4: Carteira Total */}
          <div className="rounded-xl bg-[#1f1f23] border border-white/5 p-3 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#292a2d] flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">monetization_on</span>
              </div>
              <span className="text-[10px] font-bold text-primary uppercase font-mono">VGVs</span>
            </div>
            <div className="mt-3">
              <span className="font-serif text-2xl text-primary font-bold tracking-tight">
                R$ 38.5M
              </span>
              <p className="text-[11px] text-[#99907c] truncate">Valor em Carteira</p>
            </div>
          </div>
        </div>
      </div>

      {/* VR Engagement Analytics Mini Chart */}
      <div className="rounded-xl bg-[#1f1f23] border border-white/5 p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-serif text-base text-white font-semibold">Pico de Visitações VR</h3>
            <p className="text-xs text-[#99907c]">Finais de semana registram 62% do engajamento</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold border border-primary/20">
            WebXR Live
          </span>
        </div>

        {/* Lightweight SVG Interactive Bar Chart */}
        <div className="w-full pt-3">
          <div className="flex items-end justify-between gap-2 h-28 px-2 border-b border-white/10 pb-2">
            {[
              { day: 'Seg', height: '24%', visits: 180, isPeak: false },
              { day: 'Ter', height: '32%', visits: 240, isPeak: false },
              { day: 'Qua', height: '38%', visits: 290, isPeak: false },
              { day: 'Qui', height: '44%', visits: 340, isPeak: false },
              { day: 'Sex', height: '65%', visits: 510, isPeak: false },
              { day: 'Sáb', height: '95%', visits: 820, isPeak: true },
              { day: 'Dom', height: '85%', visits: 740, isPeak: true },
            ].map((col) => {
              const isSelected = activeDay === col.day;
              return (
                <div
                  key={col.day}
                  onClick={() => setActiveDay(col.day)}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
                >
                  <div
                    style={{ height: col.height }}
                    className={`w-full max-w-[24px] rounded-t-md transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary shadow-[0_0_12px_rgba(242,202,80,0.6)]'
                        : col.isPeak
                        ? 'bg-primary/70 group-hover:bg-primary'
                        : 'bg-[#343538] group-hover:bg-[#4d4635]'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold ${
                      isSelected ? 'text-primary' : 'text-[#c6c6cb]'
                    }`}
                  >
                    {col.day}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="pt-2 text-center text-xs text-[#d0c5af]">
            Dia selecionado: <strong className="text-primary">{activeDay}</strong> — pico de
            interesse em experiências imersivas VR Box e visitas agendadas.
          </div>
        </div>
      </div>

      {/* Section: Meus Imóveis Cadastrados */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg text-white font-medium">Meus Imóveis</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#292a2d] text-[#c6c6cb] text-[11px] font-semibold">
              {properties.length} no Catálogo
            </span>
          </div>
          <button
            onClick={onOpenAddProperty}
            className="text-xs text-primary font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
            type="button"
          >
            + Cadastrar
          </button>
        </div>

        {/* Property 1 */}
        {properties.slice(0, 3).map((prop, idx) => (
          <div
            key={prop.id}
            className="rounded-2xl bg-[#1f1f23] border border-white/5 overflow-hidden shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <div className="relative w-full h-36">
              <img
                className="w-full h-full object-cover"
                src={prop.coverImage}
                alt={prop.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f23] via-[#1f1f23]/30 to-transparent" />

              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0d0e11]/90 backdrop-blur-md text-primary text-[10px] uppercase font-bold shadow-sm border border-primary/30">
                  <span className="material-symbols-outlined text-[13px] text-primary">
                    view_in_ar
                  </span>
                  Tour 360 Ativo
                </span>
              </div>

              <div className="absolute bottom-2 left-3 right-3 flex items-baseline justify-between">
                <span className="font-serif text-lg text-primary font-bold">
                  {formatPrice(prop.price)}
                </span>
                <span className="text-xs text-[#d0c5af] font-medium">
                  {prop.suites} Suítes • {prop.areaM2}m²
                </span>
              </div>
            </div>

            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <h4
                  onClick={() => onNavigateToDetails(prop)}
                  className="font-serif text-sm font-semibold text-white truncate cursor-pointer hover:text-primary"
                >
                  {prop.title}
                </h4>
                <span className="text-[10px] font-bold text-primary uppercase">
                  {prop.exclusive ? 'Exclusividade' : 'Destaque'}
                </span>
              </div>

              {/* Performance subline */}
              <div className="flex items-center justify-between pt-1 text-xs text-[#99907c]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">visibility</span>
                    {idx === 0 ? '1.2k visualizações' : idx === 1 ? '890 visualizações' : '450 visualizações'}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <span className="material-symbols-outlined text-[15px]">forum</span>
                    {idx === 0 ? '19 leads' : idx === 1 ? '12 leads' : '6 leads'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(prop.title)}
                    title="Compartilhar Tour 360"
                    type="button"
                    className="w-8 h-8 rounded-full bg-[#292a2d] hover:bg-[#343538] text-primary flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">share</span>
                  </button>
                  <button
                    onClick={() => onNavigateToDetails(prop)}
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-primary text-[#3c2f00] text-xs font-bold hover:brightness-105 cursor-pointer"
                  >
                    Ver Imóvel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tool Bar / Corretor Support Drawer Trigger */}
      <div className="p-3.5 rounded-xl bg-[#1b1b1f] border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-tight">Concierge do Corretor</p>
            <p className="text-[11px] text-[#99907c]">Suporte dedicado a captações VR</p>
          </div>
        </div>
        <button
          onClick={() => {
            setConciergeCalled(true);
            setTimeout(() => setConciergeCalled(false), 2500);
          }}
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-[#292a2d] hover:bg-primary hover:text-[#3c2f00] text-primary text-xs font-bold transition-colors cursor-pointer"
        >
          {conciergeCalled ? 'Conectando...' : 'Chamar'}
        </button>
      </div>
    </div>
  );
};
