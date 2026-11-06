import React from 'react';
import { Property } from '../types/property';

interface FavoritesScreenProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onNavigateToDetails: (property: Property) => void;
  onNavigateToExplore: () => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onNavigateToDetails,
  onNavigateToExplore,
}) => {
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-4xl mx-auto px-4 py-2 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="material-symbols-outlined text-primary text-[18px]">favorite</span>
            <span className="text-[11px] font-bold text-primary uppercase font-mono tracking-wider">
              Coleção Privada
            </span>
          </div>
          <h2 className="font-serif text-2xl text-white font-medium">Meus Imóveis Favoritos</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#1f1f23] text-xs font-bold text-primary border border-white/10 font-mono">
          {favoriteProperties.length} Salvos
        </span>
      </div>

      {favoriteProperties.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#1f1f23] text-[#99907c] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">favorite_border</span>
          </div>
          <h3 className="font-serif text-lg text-white font-medium">
            Nenhum imóvel favoritado ainda
          </h3>
          <p className="text-xs text-[#99907c] max-w-xs">
            Ao explorar o mapa ou os tours 360°, clique no ícone de coração para salvar suas mansões
            favoritas.
          </p>
          <button
            onClick={onNavigateToExplore}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-primary text-[#3c2f00] text-xs font-bold shadow-md hover:brightness-105 transition-transform active:scale-95 cursor-pointer"
          >
            Explorar Mapa de Santo Antônio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoriteProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-[#1f1f23] border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div className="relative w-full h-44 overflow-hidden group cursor-pointer" onClick={() => onNavigateToDetails(prop)}>
                <img
                  src={prop.coverImage}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(prop.id);
                  }}
                  className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-primary flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
                <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-primary font-bold">
                  {prop.rooms360.length} Cômodos 360°
                </div>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-primary uppercase font-mono">
                  {prop.categoryLabel}
                </span>
                <h4
                  onClick={() => onNavigateToDetails(prop)}
                  className="font-serif text-base font-semibold text-white truncate cursor-pointer hover:text-primary"
                >
                  {prop.title}
                </h4>
                <p className="text-xs text-[#99907c]">
                  {prop.neighborhood}, {prop.city}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="font-serif text-lg font-bold text-primary">
                    {formatPrice(prop.price)}
                  </span>
                  <button
                    onClick={() => onNavigateToDetails(prop)}
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-primary text-[#3c2f00] text-xs font-bold hover:brightness-105 cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                    <span>Tour 360°</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
