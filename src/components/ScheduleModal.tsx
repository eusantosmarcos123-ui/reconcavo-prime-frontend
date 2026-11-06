import React, { useState } from 'react';
import { Property } from '../types/property';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  property,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('15:00 Tarde');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#1f1f23] border border-[#4d4635]/40 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl flex flex-col space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              event_available
            </span>
            <h3 className="font-serif text-xl text-white font-medium">Agendamento Exclusivo</h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-full text-secondary hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="text-xs text-[#d0c5af] leading-relaxed">
          Selecione o melhor dia e período para sua recepção com degustação de boas-vindas na{' '}
          <strong className="text-primary font-semibold">{property.title}</strong> com o corretor{' '}
          {property.broker.name}.
        </p>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h4 className="font-serif text-lg text-white font-bold">Agendamento Confirmado!</h4>
            <p className="text-xs text-[#d0c5af] max-w-xs">
              Apresentação enviada via WhatsApp para o corretor Carlos Eduardo. Entraremos em contato
              para confirmar os detalhes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-white">Seu Nome Completo</label>
              <input
                required
                type="text"
                placeholder="Ex: Dr. Roberto Guimarães"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full bg-[#1b1b1f] border border-white/10 text-white px-3.5 py-2.5 rounded-xl outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-white">WhatsApp para Confirmação</label>
              <input
                required
                type="tel"
                placeholder="(75) 99999-9999"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                className="w-full bg-[#1b1b1f] border border-white/10 text-white px-3.5 py-2.5 rounded-xl outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-white">Data de Preferência</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#1b1b1f] border border-white/10 text-white px-3.5 py-2.5 rounded-xl outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-white">Horário Sugerido</label>
              <div className="grid grid-cols-3 gap-2">
                {['09:30 Manhã', '15:00 Tarde', '17:30 Pôr do Sol'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedTimeSlot === slot
                        ? 'bg-primary text-[#3c2f00] font-bold shadow-md'
                        : 'bg-[#1b1b1f] text-[#c6c6cb] hover:bg-[#292a2d]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-xs shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer mt-2"
            >
              Confirmar e Notificar Carlos
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
