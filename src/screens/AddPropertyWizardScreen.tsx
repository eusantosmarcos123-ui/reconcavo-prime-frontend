import React, { useState } from 'react';
import { Property } from '../types/property';

interface AddPropertyWizardScreenProps {
  onPublishSuccess: (newProperty: Partial<Property>) => void;
  onCancel: () => void;
}

export const AddPropertyWizardScreen: React.FC<AddPropertyWizardScreenProps> = ({
  onPublishSuccess,
  onCancel,
}) => {
  const [address, setAddress] = useState('Av. Ursicino Pinto de Queiroz, Centro');
  const [price, setPrice] = useState('1.850.000');
  const [condoFee, setCondoFee] = useState('950,00');
  const [areaM2, setAreaM2] = useState('340');
  const [suites, setSuites] = useState('4');
  const [whatsapp, setWhatsapp] = useState('(75) 99887-6543');
  const [isGyroVRBox, setIsGyroVRBox] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishFeedback, setPublishFeedback] = useState<string | null>(null);

  // Mapped rooms state
  const [mappedRooms, setMappedRooms] = useState([
    {
      id: 'r1',
      title: 'Sala Principal / Living',
      specs: '4 Hotspots • Resolução 8K',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBvfpzZIWe7BpnJVFMSR4czkNU0PdcNvL1kv86ZWxCtxoeQZWqzIFAjn3nKRKu7ztqLyesAWE-FW1o71DU6pIiMUl-SAnh3PUazdOe95XrTmtHewKFa1wJnUNMPcG0Qj4LLc1opBRSAGjtQHoTx9oq8-dqQY6u24xuKaT3DGxdO3qz-DRX-4d967g33HqzTA7LDkU3yTtXkkoFAc7LpAkTua4gnQewCLuij-zWxKBbP83iN9pihV902qA',
    },
    {
      id: 'r2',
      title: 'Suíte Master',
      specs: '2 Hotspots • Vista Sacada',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD3DUTDfPHrbUlUxkd9ZIxaC2pYLn6nBgxIjjdm_cY481ZyPiEolnBI9yAH3R7w5qujgvc4kFnsL9iugBAFTfVE3iqAiXOcWdant9q_FjBSFPqcvY9cNDuQEfZkTMwBQcDPSt0QViYbfFOQ4Pr8RHa1Z6yqI-dumsetAs53j-6dQ3xn6KtWRhVAP7OCGXjXrJjPyZV_B9-rYkkr7Q0o52Y4Nqj0eyI2zDaHcJ7A-seyinwVdabP8ykA_w',
    },
  ]);

  const handleAddRoom = () => {
    const newRoom = {
      id: `r-${Date.now()}`,
      title: 'Área Gourmet & Adega',
      specs: '3 Hotspots • Alta Definição',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAcUTQyaVMvJRzTjebEjVvbnQkk58ptepnI5-uLS4-iw2rI8l2_3salblwB_x2jJqvGKM-FdbeBB1oIIJtWFSOIu3pTAzXhBnzq5BQMh2jmMpY4cF6MIyeF3YuYjju1qQU2C58OlZ2YW08xLlP4XYVnJ8pHj4u0aE75XNwwPVqnYAJ44nfxnvn17f3OFqe-7UqbaTzmPOyyJ3IQx0MBbQiUPLK3WWipfdiGbeDVtztfmraLTrVNhCiG2g',
    };
    setMappedRooms([...mappedRooms, newRoom]);
  };

  const handleRemoveRoom = (id: string) => {
    setMappedRooms(mappedRooms.filter((r) => r.id !== id));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishFeedback('Imóvel e Tour 360° Publicados com Sucesso!');

      setTimeout(() => {
        onPublishSuccess({
          title: `Residência ${address.split(',')[0]}`,
          neighborhood: 'Centro / Zona Nobre',
          city: 'Santo Antônio de Jesus • BA',
          price: Number(price.replace(/\D/g, '')) || 1850000,
          suites: Number(suites) || 4,
          areaM2: Number(areaM2) || 340,
          garageSlots: 4,
        });
      }, 1400);
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-3xl mx-auto px-4 py-2 space-y-5">
      {/* Stepper Progress Bar */}
      <div className="px-4 py-3 bg-[#1f1f23] border border-white/5 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between gap-1 mb-2">
          {/* Step 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            </div>
            <span className="text-[10px] font-bold text-[#c6c6cb] uppercase font-mono">1. Básicos</span>
          </div>

          <div className="h-0.5 w-6 bg-primary/50 rounded-full -mt-4" />

          {/* Step 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            </div>
            <span className="text-[10px] font-bold text-[#c6c6cb] uppercase font-mono">2. Local</span>
          </div>

          <div className="h-0.5 w-6 bg-primary rounded-full -mt-4" />

          {/* Step 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[#3c2f00] mb-1 shadow-[0_0_12px_rgba(242,202,80,0.5)]">
              <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase font-mono">3. 360° VR</span>
          </div>

          <div className="h-0.5 w-6 bg-[#343538] rounded-full -mt-4" />

          {/* Step 4 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-7 h-7 rounded-full bg-[#292a2d] flex items-center justify-center text-secondary mb-1">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
            </div>
            <span className="text-[10px] font-bold text-[#99907c] uppercase font-mono">4. Revisão</span>
          </div>
        </div>

        <div className="w-full bg-[#292a2d] h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full rounded-full transition-all duration-500 w-3/4" />
        </div>
      </div>

      {/* Section 1: Localização & Geocodificação */}
      <section className="bg-[#1f1f23] border border-white/5 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#292a2d] flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">pin_drop</span>
          </div>
          <div>
            <h2 className="font-serif text-base sm:text-lg text-white font-medium">
              Localização &amp; Geocodificação
            </h2>
            <p className="text-xs text-[#99907c]">Santo Antônio de Jesus • Bahia</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <label className="text-xs font-semibold text-[#d0c5af]">Endereço ou Condomínio</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#99907c] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#15171a] border border-white/10 text-white pl-10 pr-10 py-3 rounded-xl text-xs focus:outline-none focus:border-primary transition-colors"
              placeholder="Ex: Condomínio Jardim das Mangueiras"
            />
            <button
              onClick={() => setAddress('Av. Ursicino Pinto de Queiroz, Centro, SAJ - BA')}
              type="button"
              className="material-symbols-outlined absolute right-3 text-primary text-[20px] cursor-pointer hover:scale-110 transition-transform"
            >
              my_location
            </button>
          </div>
        </div>

        {/* Pin Location Map Visual */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-[#99907c] uppercase font-mono">
              Ajuste Fino de Posição
            </span>
            <span className="text-primary flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[15px]">touch_app</span> Arraste o pin
            </span>
          </div>

          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 bg-[#0d0e11] group">
            <svg
              className="absolute inset-0 w-full h-full opacity-50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="wizardMapGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 0 60 L 60 60 M 60 0 L 60 60" fill="none" stroke="#292a2d" strokeWidth="1" />
                </pattern>
              </defs>
              <rect fill="#15171a" width="100%" height="100%" />
              <rect fill="url(#wizardMapGrid)" width="100%" height="100%" />
              <path
                d="M -20,100 Q 150,40 300,120 T 600,140"
                fill="none"
                stroke="#574500"
                strokeWidth="5"
              />
            </svg>

            {/* Pulsing Pin in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center animate-bounce">
                <span className="material-symbols-outlined text-[38px] text-primary drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                  location_on
                </span>
                <div className="w-3 h-1.5 bg-black/60 rounded-full blur-[1px] -mt-1" />
              </div>
              <div className="mt-2 bg-[#292a2d]/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                S.A.J. Coordenadas Fixadas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Tour Virtual 360° & WebXR */}
      <section className="bg-[#1f1f23] border border-white/5 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">360</span>
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg text-white font-medium">
                Tour Virtual 360° &amp; WebXR
              </h2>
              <p className="text-xs text-primary font-medium">Diferencial Recôncavo Prime</p>
            </div>
          </div>
          <span className="bg-primary/10 border border-primary/30 text-primary px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-[13px]">auto_awesome</span> Imersivo
          </span>
        </div>

        {/* Upload Box */}
        <div
          onClick={handleAddRoom}
          className="mt-1 bg-[#15171a] rounded-xl p-5 flex flex-col items-center text-center cursor-pointer hover:bg-[#292a2d] transition-colors border-2 border-dashed border-primary/40 shadow-inner group"
        >
          <div className="w-12 h-12 rounded-full bg-[#1f1f23] group-hover:scale-110 flex items-center justify-center text-primary mb-2 shadow-sm transition-transform">
            <span className="material-symbols-outlined text-[26px]">camera</span>
          </div>
          <h3 className="text-sm font-semibold text-white">
            Upload de Panoramas Equirretangulares
          </h3>
          <p className="text-xs text-[#99907c] max-w-sm mt-1">
            Arraste e solte arquivos formato 2:1 (JPG/PNG em 4K ou 8K) gerados por Insta360, Ricoh Theta
            ou Matterport.
          </p>
          <button
            type="button"
            className="mt-3 px-4 py-2 rounded-xl bg-[#292a2d] text-primary text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px]">file_upload</span> Selecionar
            Arquivos 360°
          </button>
        </div>

        {/* Mapped Rooms List */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#99907c] uppercase font-mono">
              Cômodos Mapeados ({mappedRooms.length})
            </span>
            <span className="text-[#bea4ff] font-medium">Spatial WebXR Ativo</span>
          </div>

          {mappedRooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#15171a] border border-white/5 rounded-xl p-2.5 flex items-center gap-3 shadow-sm"
            >
              <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" src={room.image} alt={room.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="material-symbols-outlined absolute bottom-1 right-1 text-primary text-[14px]">
                  360
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{room.title}</h4>
                <p className="text-[11px] text-[#99907c] truncate">{room.specs}</p>
                <div className="flex items-center gap-1 text-primary text-[10px] font-bold mt-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span> Hotspots OK
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Configurar Hotspots"
                  className="w-8 h-8 rounded-lg bg-[#292a2d] hover:bg-[#343538] flex items-center justify-center text-[#c6c6cb] hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">tune</span>
                </button>
                <button
                  onClick={() => handleRemoveRoom(room.id)}
                  type="button"
                  title="Remover Cômodo"
                  className="w-8 h-8 rounded-lg bg-[#292a2d] hover:bg-red-900/40 flex items-center justify-center text-red-400 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddRoom}
            type="button"
            className="w-full py-3 rounded-xl bg-[#292a2d] text-primary text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#343538] active:scale-[0.98] transition-all cursor-pointer border border-white/5"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            + Adicionar Cômodo 360°
          </button>
        </div>

        {/* Gyro & VR Switch */}
        <div className="mt-1 bg-[#15171a] rounded-xl p-3 flex items-center justify-between gap-3 border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">screen_rotation</span>
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Giroscópio &amp; VR Box</span>
              <span className="text-[11px] text-[#99907c] block">
                Sensor de movimento e óculos 3D imersivo
              </span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={isGyroVRBox}
              onChange={(e) => setIsGyroVRBox(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#292a2d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#3c2f00] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-sm" />
          </label>
        </div>
      </section>

      {/* Section 3: Dados Comerciais & Corretor */}
      <section className="bg-[#1f1f23] border border-white/5 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#292a2d] flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">monetization_on</span>
          </div>
          <div>
            <h2 className="font-serif text-base sm:text-lg text-white font-medium">
              Dados Comerciais &amp; Corretor
            </h2>
            <p className="text-xs text-[#99907c]">Parâmetros de negociação e atendimento</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
            <label className="text-xs font-semibold text-[#d0c5af]">Valor de Venda</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-secondary text-xs">R$</span>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#15171a] border border-white/10 text-white pl-10 pr-3 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
            <label className="text-xs font-semibold text-[#d0c5af]">Condomínio Mensal</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-secondary text-xs">R$</span>
              <input
                type="text"
                value={condoFee}
                onChange={(e) => setCondoFee(e.target.value)}
                className="w-full bg-[#15171a] border border-white/10 text-white pl-10 pr-3 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#d0c5af]">Metragem Útil</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={areaM2}
                onChange={(e) => setAreaM2(e.target.value)}
                className="w-full bg-[#15171a] border border-white/10 text-white px-3 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-primary"
              />
              <span className="absolute right-3 text-[#99907c] text-xs">m²</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#d0c5af]">Suítes</label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={suites}
                onChange={(e) => setSuites(e.target.value)}
                className="w-full bg-[#15171a] border border-white/10 text-white px-3 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-primary"
              />
              <span className="material-symbols-outlined absolute right-3 text-[#99907c] text-[18px]">
                bed
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <label className="text-xs font-semibold text-[#d0c5af]">
            WhatsApp de Destino para Leads Exclusivos
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-primary text-[20px] pointer-events-none">
              chat
            </span>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-[#15171a] border border-white/10 text-white pl-10 pr-10 py-3 rounded-xl text-xs font-bold focus:outline-none focus:border-primary"
            />
            <span className="material-symbols-outlined absolute right-3 text-primary text-[20px]">
              verified
            </span>
          </div>
          <p className="text-[11px] text-[#99907c]">
            Notificações imediatas com ficha do cliente interessado no tour.
          </p>
        </div>
      </section>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 -mx-4 px-4 py-3 bg-[#121316]/95 backdrop-blur-xl border-t border-white/5 flex flex-col gap-2 shadow-[0_-8px_20px_rgba(0,0,0,0.6)]">
        {publishFeedback ? (
          <div className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{publishFeedback}</span>
          </div>
        ) : (
          <>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              type="button"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-fixed-dim via-primary to-primary-container text-[#3c2f00] text-xs font-bold shadow-[0_4px_16px_rgba(242,202,80,0.35)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform cursor-pointer"
            >
              {isPublishing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                  <span>Processando Esferas 360° &amp; WebXR...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
                  <span>Publicar Imóvel com Tour 360°</span>
                </>
              )}
            </button>

            <button
              onClick={onCancel}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-[#1f1f23] text-[#c6c6cb] text-xs font-semibold hover:text-white hover:bg-[#292a2d] transition-colors text-center cursor-pointer"
            >
              Salvar Rascunho &amp; Voltar
            </button>
          </>
        )}
      </div>
    </div>
  );
};
