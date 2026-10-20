import React, { useState } from 'react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reportText = `🏆 No RUN Analytics - Resumo Mensal
Atleta: Alison
🔥 Dias Ativos & Consistência
🏋️ Volume Total Acumulado Registrado
🎯 Meta Mensal em Progresso
Sincronizado via No RUN Cloud`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#161b29] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#00d2ff]/15 text-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-white font-bold">Relatório de Evolução</h3>
              <p className="font-body-sm text-[#859399]">Exportar dados &amp; compartilhamento</p>
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
          {/* Visual Share Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1a1f2d] via-[#111a2e] to-[#080e1b] border border-[#00d2ff]/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d2ff]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-[15px] font-bold text-[#00d2ff]">No RUN</span>
                <span className="font-label-caps text-[9px] text-[#bbc9cf] uppercase">Analytics</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#69f6b9]/15 text-[#69f6b9] font-label-caps text-[10px] font-bold">
                OUTUBRO 2024
              </span>
            </div>

            <div className="space-y-1 mb-3">
              <span className="font-label-caps text-[10px] text-[#859399] uppercase">Volume Total Acumulado</span>
              <div className="flex items-baseline gap-2">
                <span className="font-metric-value-lg text-[26px] text-white font-bold">55.240</span>
                <span className="font-label-caps text-[#00d2ff] text-[13px]">KG</span>
                <span className="text-[#69f6b9] font-label-caps text-[11px] font-bold ml-auto">+14.2%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
              <div>
                <span className="font-label-caps text-[9px] text-[#859399] block">DIAS ATIVOS</span>
                <span className="font-metric-value-md text-white text-[15px] font-bold">18 dias</span>
              </div>
              <div>
                <span className="font-label-caps text-[9px] text-[#859399] block">SEQUÊNCIA</span>
                <span className="font-metric-value-md text-[#69f6b9] text-[15px] font-bold">4 sem.</span>
              </div>
              <div>
                <span className="font-label-caps text-[9px] text-[#859399] block">META MENSAL</span>
                <span className="font-metric-value-md text-[#00d2ff] text-[15px] font-bold">90%</span>
              </div>
            </div>
          </div>

          {/* Raw Text Box */}
          <div className="p-3 rounded-xl bg-[#080e1b] border border-white/5 font-mono text-[11px] text-[#bbc9cf] whitespace-pre-wrap leading-relaxed select-all">
            {reportText}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 h-12 rounded-xl bg-[#0053db] hover:bg-[#00d2ff] text-white hover:text-[#003543] font-headline-sm font-bold text-[14px] flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>
          <button
            onClick={() => {
              handleCopy();
              alert('Relatório pronto para compartilhamento social!');
              onClose();
            }}
            className="flex-1 h-12 rounded-xl bg-[#00d2ff] hover:bg-[#a5e7ff] text-[#003543] font-headline-sm font-bold text-[14px] flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
