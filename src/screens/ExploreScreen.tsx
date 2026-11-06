import React, { useState, useMemo } from 'react';
import { Property, FilterOptions } from '../types/property';
import { InteractiveMap } from '../components/InteractiveMap';
import { FilterModal } from '../components/FilterModal';

interface ExploreScreenProps {
  properties: Property[];
  selectedProperty: Property;
  onSelectProperty: (property: Property) => void;
  onNavigateToDetails: (property: Property) => void;
  onOpenWhatsApp: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  onNavigateToDetails,
  onOpenWhatsApp,
  favorites,
  onToggleFavorite,
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListeningMic, setIsListeningMic] = useState(false);

  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    searchQuery: '',
    category: 'all',
    maxPrice: 10000000,
    minSuites: 2,
    minGarage: 2,
    only360: false,
  });

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Category quick filter
      if (activeCategoryFilter === 'mansoes' && prop.category !== 'mansao') return false;
      if (activeCategoryFilter === 'apartamentos' && prop.category !== 'apartamento' && prop.category !== 'cobertura') return false;
      if (activeCategoryFilter === 'tour360' && !prop.hasVirtualTour) return false;
      if (activeCategoryFilter === 'condominio' && !prop.categoryLabel.toLowerCase().includes('condomínio') && !prop.exclusive) return false;

      // Advanced filters
      if (prop.price > advancedFilters.maxPrice) return false;
      if (prop.suites < advancedFilters.minSuites) return false;
      if (prop.garageSlots < advancedFilters.minGarage) return false;
      if (advancedFilters.only360 && !prop.hasVirtualTour) return false;

      // Search query filter (matches neighborhood, title, city)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesNeighborhood = prop.neighborhood.toLowerCase().includes(query);
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesCity = prop.city.toLowerCase().includes(query);
        if (!matchesNeighborhood && !matchesTitle && !matchesCity) return false;
      }

      return true;
    });
  }, [properties, activeCategoryFilter, advancedFilters, searchQuery]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleMicClick = () => {
    setIsListeningMic(true);
    // Simulating quick voice search
    setTimeout(() => {
      setSearchQuery('Andaiá');
      setIsListeningMic(false);
    }, 1200);
  };

  const isFavorite = favorites.includes(selectedProperty.id);

  return (
    <div className="flex flex-col w-full relative pb-28">
      {/* Top Interactive Control Bar */}
      <div className="px-4 py-2.5 flex flex-col gap-2.5 z-30 max-w-7xl mx-auto w-full">
        {/* Search Bar with Refined Filters Trigger */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#292a2d] border border-white/10 rounded-full flex items-center px-4 py-2.5 shadow-lg">
            <span className="material-symbols-outlined text-primary text-[20px] mr-2">
              search
            </span>
            <input
              className="bg-transparent text-white text-xs placeholder:text-[#d0c5af]/50 focus:outline-none w-full"
              placeholder="Buscar bairros: Urbis, Andaiá, Centro..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#c6c6cb] hover:text-white"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            ) : (
              <button
                onClick={handleMicClick}
                aria-label="Buscar por voz"
                className={`transition-colors cursor-pointer ${
                  isListeningMic ? 'text-primary animate-pulse' : 'text-[#c6c6cb] hover:text-primary'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
            )}
          </div>

          {/* Filter Modal Trigger Button */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            aria-label="Abrir filtros"
            className="bg-[#292a2d] hover:bg-[#343538] border border-white/10 text-primary p-2.5 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-[#121316]" />
          </button>
        </div>

        {/* Quick Pill Badges Filters (Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            type="button"
            className={`text-xs px-3.5 py-1.5 rounded-full shadow-md whitespace-nowrap transition-transform active:scale-95 cursor-pointer font-bold ${
              activeCategoryFilter === 'all'
                ? 'bg-primary text-[#3c2f00]'
                : 'bg-[#292a2d] text-[#c6c6cb] hover:bg-[#343538] border border-white/5'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveCategoryFilter('mansoes')}
            type="button"
            className={`text-xs px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer font-semibold ${
              activeCategoryFilter === 'mansoes'
                ? 'bg-primary text-[#3c2f00]'
                : 'bg-[#292a2d] text-[#c6c6cb] hover:bg-[#343538] border border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-primary">villa</span>
            Mansões &amp; Casas
          </button>
          <button
            onClick={() => setActiveCategoryFilter('apartamentos')}
            type="button"
            className={`text-xs px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer font-semibold ${
              activeCategoryFilter === 'apartamentos'
                ? 'bg-primary text-[#3c2f00]'
                : 'bg-[#292a2d] text-[#c6c6cb] hover:bg-[#343538] border border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-primary">apartment</span>
            Apartamentos Master
          </button>
          <button
            onClick={() => setActiveCategoryFilter('tour360')}
            type="button"
            className={`text-xs px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer font-semibold ${
              activeCategoryFilter === 'tour360'
                ? 'bg-primary text-[#3c2f00]'
                : 'bg-[#292a2d] text-primary hover:bg-[#343538] border border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">360</span>
            Tour 360° Ativo
          </button>
          <button
            onClick={() => setActiveCategoryFilter('condominio')}
            type="button"
            className={`text-xs px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer font-semibold ${
              activeCategoryFilter === 'condominio'
                ? 'bg-primary text-[#3c2f00]'
                : 'bg-[#292a2d] text-[#c6c6cb] hover:bg-[#343538] border border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-primary">shield</span>
            Condomínio Fechado
          </button>
        </div>
      </div>

      {/* Main View: Interactive Map OR List View */}
      {!isListView ? (
        <>
          {/* Interactive Dark Map Canvas */}
          <InteractiveMap
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            onSelectProperty={onSelectProperty}
            isListView={isListView}
            onToggleListView={() => setIsListView(!isListView)}
          />

          {/* Bottom Sheet Drawer: Selected Prime Property Details */}
          <div className="relative -mt-6 bg-[#1b1b1f] border-t border-[#4d4635]/40 rounded-t-3xl shadow-[0_-16px_40px_rgba(0,0,0,0.9)] px-4 pt-3 pb-8 z-30 flex flex-col gap-3 max-w-2xl mx-auto w-full">
            {/* Visual Sheet Grab Handle */}
            <div className="w-12 h-1.5 bg-[#4d4635] rounded-full mx-auto mb-1" />

            {/* Property Card Body */}
            <div className="bg-[#1f1f23] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              {/* Cover Image with Badges */}
              <div
                onClick={() => onNavigateToDetails(selectedProperty)}
                className="relative w-full h-48 overflow-hidden cursor-pointer group"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={selectedProperty.coverImage}
                  alt={selectedProperty.title}
                />
                {/* Virtual Tour Badge Overlay (Top Left) */}
                {selectedProperty.hasVirtualTour && (
                  <div className="absolute top-3 left-3 bg-[#0d0e11]/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-primary/30">
                    <span
                      className="material-symbols-outlined text-primary text-[16px] animate-spin"
                      style={{ animationDuration: '8s' }}
                    >
                      sync
                    </span>
                    <span className="font-bold text-[11px] text-primary tracking-wider uppercase">
                      {selectedProperty.featuredTag || '⭐ Tour Virtual 360° Disponível'}
                    </span>
                  </div>
                )}
                {/* Condominium / Exclusive Badge Overlay (Top Right) */}
                <div className="absolute top-3 right-3 bg-primary-container text-[#554300] px-2.5 py-1 rounded-full shadow text-[10px] uppercase font-bold tracking-wider">
                  {selectedProperty.exclusive ? 'Exclusividade' : 'Destaque'}
                </div>
                {/* Dark Gradient Scrim */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1f1f23] via-[#1f1f23]/40 to-transparent" />
              </div>

              {/* Property Typographic Data */}
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px] text-primary tracking-widest uppercase">
                      {selectedProperty.categoryLabel}
                    </span>
                    <h2
                      onClick={() => onNavigateToDetails(selectedProperty)}
                      className="font-serif text-xl sm:text-2xl text-white leading-snug cursor-pointer hover:text-primary transition-colors"
                    >
                      {selectedProperty.title}
                    </h2>
                    <div className="flex items-center gap-1 text-[#d0c5af] mt-0.5">
                      <span className="material-symbols-outlined text-[15px] text-primary">
                        location_on
                      </span>
                      <span className="text-xs">
                        {selectedProperty.neighborhood}, {selectedProperty.city}
                      </span>
                    </div>
                  </div>

                  {/* Bookmark / Favorite Button */}
                  <button
                    onClick={() => onToggleFavorite(selectedProperty.id)}
                    aria-label="Favoritar"
                    type="button"
                    className={`w-10 h-10 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                      isFavorite ? 'text-primary' : 'text-[#c6c6cb]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isFavorite ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                </div>

                {/* Architectural Metrics Grid */}
                <div className="grid grid-cols-4 gap-1.5 py-2.5 my-1 bg-[#292a2d]/70 rounded-xl px-2 border border-white/5">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">bed</span>
                      <span className="text-xs font-bold text-white">{selectedProperty.suites}</span>
                    </div>
                    <span className="text-[11px] text-[#c6c6cb]">Suítes</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">bathtub</span>
                      <span className="text-xs font-bold text-white">
                        {selectedProperty.bathrooms}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#c6c6cb]">Banh.</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">square_foot</span>
                      <span className="text-xs font-bold text-white">
                        {selectedProperty.areaM2}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#c6c6cb]">m² priv.</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">directions_car</span>
                      <span className="text-xs font-bold text-white">
                        {selectedProperty.garageSlots}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#c6c6cb]">Vagas</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#99907c] uppercase tracking-wider font-semibold">
                      Valor de Aquisição
                    </span>
                    <span className="font-serif text-2xl font-bold text-primary">
                      {formatPrice(selectedProperty.price)}
                    </span>
                  </div>
                  {selectedProperty.iptu && (
                    <span className="bg-[#292a2d] text-[#c6c6cb] px-2.5 py-1 rounded-full text-[10px] font-semibold border border-white/5">
                      {selectedProperty.iptu}
                    </span>
                  )}
                </div>

                {/* Action Buttons (360 Explorer & WhatsApp Concierge) */}
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {/* 360 Tour Button */}
                  <button
                    onClick={() => onNavigateToDetails(selectedProperty)}
                    type="button"
                    className="col-span-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer text-xs"
                  >
                    <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                    <span>Explorar em 360°</span>
                  </button>
                  {/* Direct WhatsApp Button */}
                  <button
                    onClick={() => onOpenWhatsApp(selectedProperty)}
                    aria-label="Contatar corretor no WhatsApp"
                    type="button"
                    className="col-span-2 bg-[#292a2d] hover:bg-[#343538] border border-white/10 text-white font-semibold py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors active:scale-98 cursor-pointer text-xs"
                  >
                    <span className="material-symbols-outlined text-[20px] text-primary">chat</span>
                    <span>Corretor</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* LIST VIEW MODE */
        <div className="px-4 max-w-4xl mx-auto w-full flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between py-1">
            <h2 className="font-serif text-xl text-white font-medium">
              Imóveis Selecionados ({filteredProperties.length})
            </h2>
            <button
              onClick={() => setIsListView(false)}
              className="text-xs text-primary flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">map</span>
              <span>Voltar ao Mapa</span>
            </button>
          </div>

          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-[#1f1f23] rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col sm:flex-row transition-all hover:border-primary/40"
            >
              <div
                onClick={() => onNavigateToDetails(prop)}
                className="relative w-full sm:w-64 h-48 sm:h-auto overflow-hidden cursor-pointer"
              >
                <img
                  src={prop.coverImage}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#0d0e11]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-primary font-bold">
                  {prop.featuredTag || 'Tour 360°'}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-primary font-bold uppercase tracking-wider">
                      {prop.categoryLabel}
                    </span>
                    <button
                      onClick={() => onToggleFavorite(prop.id)}
                      className={`text-sm ${
                        favorites.includes(prop.id) ? 'text-primary' : 'text-[#c6c6cb]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {favorites.includes(prop.id) ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>
                  <h3
                    onClick={() => onNavigateToDetails(prop)}
                    className="font-serif text-lg text-white font-medium hover:text-primary cursor-pointer mt-0.5"
                  >
                    {prop.title}
                  </h3>
                  <p className="text-xs text-[#d0c5af] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-xs text-primary">
                      location_on
                    </span>
                    {prop.neighborhood}, {prop.city}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#c6c6cb] bg-[#292a2d]/60 p-2 rounded-lg">
                  <span>
                    <strong className="text-white">{prop.suites}</strong> Suítes
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-white">{prop.areaM2}</strong> m²
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-white">{prop.garageSlots}</strong> Vagas
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif text-xl font-bold text-primary">
                    {formatPrice(prop.price)}
                  </span>
                  <button
                    onClick={() => onNavigateToDetails(prop)}
                    className="px-4 py-2 rounded-xl bg-primary text-[#3c2f00] text-xs font-bold hover:brightness-105 transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                    <span>Explorar 360°</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Advanced Filter Drawer Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={advancedFilters}
        onChangeFilters={setAdvancedFilters}
        totalFiltered={filteredProperties.length}
      />
    </div>
  );
};
