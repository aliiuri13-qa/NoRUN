import React, { useState } from 'react';

interface PlateCalculatorModalProps {
  initialWeight?: number;
  isOpen: boolean;
  onClose: () => void;
  onApplyWeight?: (weight: number) => void;
}

interface PlateDef {
  weight: number;
  color: string;
  textColor: string;
  height: string;
  count: number;
}

export const PlateCalculatorModal: React.FC<PlateCalculatorModalProps> = ({
  initialWeight = 90,
  isOpen,
  onClose,
  onApplyWeight,
}) => {
  const [totalWeight, setTotalWeight] = useState<number>(initialWeight);
  const [barWeight, setBarWeight] = useState<number>(20);

  if (!isOpen) return null;

  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
  const plateStyles: Record<number, { color: string; textColor: string; height: string }> = {
    25: { color: 'bg-red-600 border-red-500', textColor: 'text-white', height: 'h-24' },
    20: { color: 'bg-blue-600 border-blue-400', textColor: 'text-white', height: 'h-22' },
    15: { color: 'bg-amber-500 border-amber-300', textColor: 'text-slate-900', height: 'h-20' },
    10: { color: 'bg-emerald-600 border-emerald-400', textColor: 'text-white', height: 'h-16' },
    5: { color: 'bg-slate-200 border-slate-300', textColor: 'text-slate-900', height: 'h-14' },
    2.5: { color: 'bg-slate-700 border-slate-500', textColor: 'text-white', height: 'h-12' },
    1.25: { color: 'bg-cyan-500 border-cyan-300', textColor: 'text-slate-900', height: 'h-10' },
  };

  // Calculate per side
  const remainder = Math.max(0, totalWeight - barWeight);
  let sideWeight = remainder / 2;
  const platesNeeded: PlateDef[] = [];

  let tempWeight = sideWeight;
  availablePlates.forEach((p) => {
    const count = Math.floor(tempWeight / p);
    if (count > 0) {
      platesNeeded.push({
        weight: p,
        count,
        color: plateStyles[p].color,
        textColor: plateStyles[p].textColor,
        height: plateStyles[p].height,
      });
      tempWeight = Math.round((tempWeight - count * p) * 100) / 100;
    }
  });

  const handleApply = () => {
    if (onApplyWeight) {
      onApplyWeight(totalWeight);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#161b29] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#00d2ff]/15 flex items-center justify-center text-[#00d2ff]">
              <span className="material-symbols-outlined text-[20px]">calculate</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-white font-bold">Calculadora de Anilhas</h3>
              <p className="font-body-sm text-[#859399]">Distribuição por lado na barra</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#242a38] text-[#859399] hover:text-white flex items-center justify-center active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 space-y-4">
          {/* Target Weight Controller */}
          <div className="p-4 rounded-xl bg-[#1a1f2d] border border-white/5 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-[#bbc9cf] uppercase text-[11px]">Carga Total Alvo</span>
              <span className="font-label-caps text-[#00d2ff] font-bold text-[12px]">
                {sideWeight.toFixed(1)} kg / lado
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 mt-1">
              <button
                onClick={() => setTotalWeight(Math.max(barWeight, totalWeight - 5))}
                className="w-12 h-12 rounded-xl bg-[#242a38] text-[#00d2ff] hover:bg-[#2f3543] font-bold flex items-center justify-center text-[22px] active:scale-95"
              >
                -
              </button>
              <div className="flex items-baseline gap-1">
                <span className="font-metric-value-lg text-[36px] text-white font-bold leading-none">
                  {totalWeight}
                </span>
                <span className="font-label-caps text-[#00d2ff] text-[16px] font-semibold">KG</span>
              </div>
              <button
                onClick={() => setTotalWeight(totalWeight + 5)}
                className="w-12 h-12 rounded-xl bg-[#242a38] text-[#00d2ff] hover:bg-[#2f3543] font-bold flex items-center justify-center text-[22px] active:scale-95"
              >
                +
              </button>
            </div>

            {/* Quick Weight Presets */}
            <div className="flex gap-1.5 justify-center pt-2 overflow-x-auto">
              {[60, 80, 90, 100, 120, 140].map((w) => (
                <button
                  key={w}
                  onClick={() => setTotalWeight(w)}
                  className={`px-2.5 py-1 rounded-lg font-label-caps text-[11px] font-bold transition-all ${
                    totalWeight === w
                      ? 'bg-[#00d2ff] text-[#003543]'
                      : 'bg-[#242a38] text-[#bbc9cf] hover:text-white'
                  }`}
                >
                  {w}kg
                </button>
              ))}
            </div>
          </div>

          {/* Bar Type Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="font-label-caps text-[#859399] uppercase text-[10px]">Peso da Barra</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { weight: 20, name: 'Olímpica 20kg' },
                { weight: 15, name: 'Feminina 15kg' },
                { weight: 10, name: 'Barra W 10kg' },
              ].map((b) => (
                <button
                  key={b.weight}
                  onClick={() => setBarWeight(b.weight)}
                  className={`py-2 px-1 rounded-xl font-label-caps text-[10px] text-center border transition-all ${
                    barWeight === b.weight
                      ? 'bg-[#0053db] text-white border-[#00d2ff] font-bold'
                      : 'bg-[#1a1f2d] text-[#bbc9cf] border-white/5 hover:border-white/20'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Barbell Representation */}
          <div className="p-4 rounded-xl bg-[#080e1b] border border-white/5 flex flex-col items-center">
            <span className="font-label-caps text-[10px] text-[#859399] uppercase mb-3">
              Visualização de 1 Lado da Barra
            </span>
            <div className="w-full flex items-center justify-center h-28 relative">
              {/* Bar Sleeve / Collar */}
              <div className="h-4 bg-slate-400 rounded-l-md w-16 shadow-inner" />
              <div className="h-10 w-2.5 bg-slate-300 rounded-sm border-r-2 border-slate-600 shadow-md" />

              {/* Plates Stack */}
              <div className="flex items-center gap-1 pl-1">
                {platesNeeded.length === 0 ? (
                  <span className="font-body-sm text-[#859399] italic">Apenas a barra</span>
                ) : (
                  platesNeeded.map((p, idx) => (
                    <div key={idx} className="flex gap-1">
                      {Array.from({ length: p.count }).map((_, cIdx) => (
                        <div
                          key={cIdx}
                          className={`w-6 ${p.height} ${p.color} border rounded-sm flex items-center justify-center shadow-lg transition-transform hover:scale-105`}
                          title={`${p.weight} kg`}
                        >
                          <span
                            className={`font-label-caps text-[9px] font-bold ${p.textColor} rotate-90 whitespace-nowrap`}
                          >
                            {p.weight}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
              <div className="h-3 bg-slate-500 rounded-r-md flex-1 max-w-16 shadow-inner" />
            </div>

            {/* List breakdown */}
            <div className="w-full mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
              <div className="text-left">
                <span className="font-body-sm text-[#859399] block text-[11px]">Por Cada Lado:</span>
                <span className="font-headline-sm text-[#00d2ff] font-bold text-[15px]">
                  {sideWeight.toFixed(1)} kg
                </span>
              </div>
              <div className="text-right">
                <span className="font-body-sm text-[#859399] block text-[11px]">Total Anilhas:</span>
                <span className="font-headline-sm text-white font-bold text-[15px]">
                  {platesNeeded.reduce((acc, p) => acc + p.count * 2, 0)} un.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleApply}
            className="w-full h-12 rounded-xl bg-[#00d2ff] text-[#003543] font-headline-sm font-bold text-[15px] flex items-center justify-center gap-2 active:scale-98 shadow-lg shadow-[#00d2ff]/20 transition-all hover:bg-[#a5e7ff]"
          >
            <span className="material-symbols-outlined text-[20px]">check</span>
            <span>Usar {totalWeight} kg no Exercício</span>
          </button>
        </div>
      </div>
    </div>
  );
};
