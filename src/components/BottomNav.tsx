import React from 'react';

interface BottomNavProps {
  currentTab: 'explore' | 'tours360' | 'favorites' | 'broker';
  onSelectTab: (tab: 'explore' | 'tours360' | 'favorites' | 'broker') => void;
  favoritesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  favoritesCount = 0,
}) => {
  const tabs = [
    { id: 'explore' as const, label: 'Explorar', icon: 'explore' },
    { id: 'tours360' as const, label: 'Imóveis 360°', icon: 'view_in_ar' },
    { id: 'favorites' as const, label: 'Favoritos', icon: 'favorite', badge: favoritesCount },
    { id: 'broker' as const, label: 'Corretor', icon: 'business_center' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#121316]/95 backdrop-blur-xl border-t border-white/5 shadow-[0_-8px_32px_rgba(0,0,0,0.7)]">
      <div className="flex justify-around items-center h-18 max-w-lg mx-auto px-4">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              type="button"
              className={`relative flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all duration-300 cursor-pointer ${
                isActive ? 'text-primary font-bold scale-105' : 'text-[#c6c6cb] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">{tab.icon}</span>
              <span className="text-[11px] font-medium tracking-tight">{tab.label}</span>

              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-primary text-[#3c2f00] text-[9px] font-bold flex items-center justify-center shadow-md">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
