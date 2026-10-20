import React, { useState } from 'react';

interface BodyWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeight: number;
  onSaveWeight: (weight: number, notes?: string) => void;
}

export const BodyWeightModal: React.FC<BodyWeightModalProps> = ({
  isOpen,
  onClose,
  currentWeight,
  onSaveWeight,
}) => {
  const [weight, setWeight] = useState<number>(currentWeight || 78.5);
  const [notes, setNotes] = useState<string>('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWeight(weight, notes);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-[#161b29] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#00d2ff]/15 text-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">scale</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-white font-bold text-[16px]">
                Registrar Peso Corporal
              </h3>
              <p className="font-body-sm text-[#859399]">Acompanhe sua evolução na balança</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#242a38] text-[#859399] hover:text-white flex items-center justify-center active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="p-4 rounded-xl bg-[#1a1f2d] border border-white/5 flex flex-col items-center gap-2">
            <span className="font-label-caps text-[#859399] uppercase text-[10px]">Peso de Hoje</span>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setWeight((prev) => Math.max(30, Math.round((prev - 0.2) * 10) / 10))}
                className="w-10 h-10 rounded-xl bg-[#242a38] text-[#00d2ff] font-bold text-[20px] flex items-center justify-center active:scale-95"
              >
                -
              </button>
              <div className="flex items-baseline gap-1">
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-24 text-center font-metric-value-lg text-[32px] text-white font-bold bg-transparent border-b border-[#00d2ff] focus:outline-none"
                />
                <span className="font-label-caps text-[#00d2ff] text-[16px] font-bold">KG</span>
              </div>
              <button
                type="button"
                onClick={() => setWeight((prev) => Math.round((prev + 0.2) * 10) / 10)}
                className="w-10 h-10 rounded-xl bg-[#242a38] text-[#00d2ff] font-bold text-[20px] flex items-center justify-center active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#bbc9cf]">Observação (em jejum, pós-treino, etc.)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Pela manhã em jejum"
              className="w-full h-10 rounded-lg bg-[#0d1320] px-3 text-[13px] text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-[#242a38] hover:bg-[#2f3543] text-[#bbc9cf] font-headline-sm text-[13px] font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-[1.5] h-11 rounded-xl font-headline-sm text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all ${
                saved
                  ? 'bg-[#48d99e] text-[#003824]'
                  : 'bg-[#00d2ff] hover:bg-[#a5e7ff] text-[#003543]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {saved ? 'check_circle' : 'save'}
              </span>
              <span>{saved ? 'Salvo no Firebase!' : 'Salvar Peso'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
