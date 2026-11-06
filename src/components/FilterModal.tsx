import React from 'react';
import { FilterOptions } from '../types/property';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onChangeFilters: (newFilters: FilterOptions) => void;
  totalFiltered: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onChangeFilters,
  totalFiltered,
}) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1b1b1f] border-t border-[#4d4635]/50 rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pt-4 pb-10 flex flex-col gap-5 shadow-2xl">
        {/* Grab bar */}
        <div className="w-12 h-1 bg-[#4d4635] rounded-full mx-auto" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-mono">
              Filtros Avançados
            </span>
            <h3 className="font-serif text-2xl text-white font-medium">Refinar Imóveis</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-white transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white">Faixa Máxima de Investimento</label>
            <span className="text-sm font-bold text-primary">{formatPrice(filters.maxPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#99907c] pb-1">
            <span>R$ 1.500.000</span>
            <span>R$ 10.000.000+</span>
          </div>
          <input
            className="w-full accent-[#f2ca50] cursor-pointer h-2 bg-[#343538] rounded-lg"
            max={10000000}
            min={1500000}
            step={250000}
            type="range"
            value={filters.maxPrice}
            onChange={(e) =>
              onChangeFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
          />
        </div>

        {/* Suites Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white">Mínimo de Suítes</label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onChangeFilters({ ...filters, minSuites: num })}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filters.minSuites === num
                    ? 'bg-primary text-[#3c2f00] shadow-md'
                    : 'bg-[#292a2d] text-[#c6c6cb] hover:bg-[#343538]'
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Private Garage Slots */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white">Vagas de Garagem</label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 3, 4, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onChangeFilters({ ...filters, minGarage: num })}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filters.minGarage === num
                    ? 'bg-primary text-[#3c2f00] shadow-md'
                    : 'bg-[#292a2d] text-[#c6c6cb] hover:bg-[#343538]'
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Tour 360 Feature Switch */}
        <div className="flex items-center justify-between p-3.5 bg-[#1f1f23] rounded-xl border border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[22px]">view_in_ar</span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Apenas com Tour 360°</span>
              <span className="text-[11px] text-[#99907c]">Navegação imersiva em tempo real</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={filters.only360}
            onChange={(e) => onChangeFilters({ ...filters, only360: e.target.checked })}
            className="w-5 h-5 accent-primary cursor-pointer rounded"
          />
        </div>

        {/* Reset & Apply Actions */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() =>
              onChangeFilters({
                searchQuery: '',
                category: 'all',
                maxPrice: 10000000,
                minSuites: 2,
                minGarage: 2,
                only360: false,
              })
            }
            type="button"
            className="py-3.5 px-4 rounded-xl bg-[#292a2d] hover:bg-[#343538] text-[#c6c6cb] text-xs font-bold transition-colors cursor-pointer"
          >
            Limpar
          </button>
          <button
            onClick={onClose}
            type="button"
            className="flex-1 bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-bold py-3.5 rounded-xl shadow-[0_4px_16px_rgba(242,202,80,0.3)] active:scale-[0.98] transition-all cursor-pointer text-center"
          >
            Aplicar Filtros ({totalFiltered} Imóveis)
          </button>
        </div>
      </div>
    </div>
  );
};
