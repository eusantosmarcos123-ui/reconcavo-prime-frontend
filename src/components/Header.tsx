import React from 'react';
import { BROKER_DEFAULT } from '../data/properties';

interface HeaderProps {
  currentScreen: 'explore' | 'details' | 'tours360' | 'favorites' | 'broker' | 'addProperty';
  onNavigate: (screen: 'explore' | 'details' | 'tours360' | 'favorites' | 'broker' | 'addProperty') => void;
  onBack?: () => void;
  screenTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  screenTitle,
}) => {
  const showBackButton = currentScreen === 'details' || currentScreen === 'addProperty';

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#121316]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_12px_rgba(0,0,0,0.6)]">
      <div className="h-16 px-4 max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section: Back Button + Logo + Title */}
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button
              onClick={onBack}
              aria-label="Voltar"
              type="button"
              className="w-10 h-10 flex items-center justify-center text-primary hover:text-[#ffe088] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </button>
          )}

          <div
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            {/* Recôncavo Prime Icon/Logo */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#121316] rounded-[6px] flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  diamond
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              {screenTitle ? (
                <h1 className="font-serif text-base sm:text-lg font-medium text-white truncate max-w-[170px] sm:max-w-xs">
                  {screenTitle}
                </h1>
              ) : (
                <>
                  <span className="font-bold text-[11px] text-primary tracking-widest uppercase">
                    Recôncavo Prime
                  </span>
                  <div className="flex items-center gap-0.5 text-[#d0c5af]">
                    <span className="material-symbols-outlined text-[13px] text-primary">
                      location_on
                    </span>
                    <span className="text-xs text-[#c6c6cb] truncate max-w-[140px]">
                      Santo Antônio de Jesus, BA
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Status Kicker + Broker Profile Avatar */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white leading-tight">
              {currentScreen === 'broker' ? 'Painel Corretor' : 'Explorar'}
            </span>
            <span className="text-[11px] text-primary font-medium">Alto Padrão</span>
          </div>

          <button
            onClick={() => onNavigate('broker')}
            aria-label="Perfil Corretor"
            type="button"
            className="relative w-10 h-10 rounded-full p-0.5 ring-1 ring-primary/40 hover:ring-2 hover:ring-primary transition-all cursor-pointer"
          >
            <img
              alt="Carlos Eduardo Mendonça"
              src={BROKER_DEFAULT.avatarUrl}
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#121316]" />
          </button>
        </div>
      </div>
    </header>
  );
};
