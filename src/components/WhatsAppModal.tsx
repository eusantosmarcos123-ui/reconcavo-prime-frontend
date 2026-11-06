import React, { useState } from 'react';
import { Property } from '../types/property';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  property,
}) => {
  const [customMessage, setCustomMessage] = useState(
    `Olá Carlos, gostaria de receber a apresentação confidencial e proposta de ${property.title} em Santo Antônio de Jesus.`
  );
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const phone = property.broker.phone || '5575998876543';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`;

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(customMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#1f1f23] border border-[#4d4635]/40 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </div>
            <h3 className="font-serif text-lg text-white font-medium">Concierge WhatsApp VIP</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-secondary hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Broker Bio in Modal */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#15171a] border border-white/5">
          <img
            src={property.broker.avatarUrl}
            alt={property.broker.name}
            className="w-12 h-12 rounded-full object-cover ring-1 ring-primary/40"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{property.broker.name}</h4>
            <p className="text-[11px] text-[#c6c6cb]">{property.broker.creci}</p>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Online agora • Resposta rápida
            </span>
          </div>
        </div>

        {/* Message Preview */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-[#d0c5af]">
            Mensagem personalizada para o corretor:
          </label>
          <textarea
            rows={3}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full bg-[#15171a] border border-white/10 text-white p-3 rounded-xl text-xs leading-relaxed outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleOpenWhatsApp}
            type="button"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Iniciar Conversa no WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl bg-[#292a2d] hover:bg-[#343538] text-[#c6c6cb] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isCopied ? 'check' : 'content_copy'}
            </span>
            <span>{isCopied ? 'Copiado!' : 'Copiar Texto da Mensagem'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
