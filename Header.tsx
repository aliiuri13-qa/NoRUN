import React from 'react';
import { TabType, AthleteProfile } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenProfile: () => void;
  onOpenWorkoutManager?: () => void;
  athleteProfile: AthleteProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenProfile,
  onOpenWorkoutManager,
  athleteProfile,
}) => {
  const titles: Record<TabType, string> = {
    hoje: 'Hoje',
    treino: 'Treino',
    resultados: 'Resultados',
    historico: 'Histórico',
  };

  const isTreino = currentTab === 'treino';

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#080e1b]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
      <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {isTreino ? (
            <button
              onClick={() => onSelectTab('hoje')}
              aria-label="Voltar para Hoje"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#242a38]/80 text-[#dde2f5] hover:text-[#00d2ff] hover:bg-[#2f3543] transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
          ) : null}

          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onSelectTab('hoje')}
          >
            <img
              alt="No RUN Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHKN1u_aeC6bOojYh-ZkJ_JL8oDCycUnc4N3vq8BH3nmSrveMY4avBhWqkFyNBqFa7R9mPkBvSrIr1uOk_J5jU-qrQ5yYA4OfmKQlg9kJaMsn4sr8aygn9WEcGQS8VpnL39m5X3eX_D8S3Hu1WVdo_occMHD2KPtgLob61L27KLCVz8QhfZbpJg9QEaDxuUXuX6nJ3I_WfY6YQ279j_5MhvmeIjJDp5LseJjBYxCMox7mkP38n16u0CQ"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-[16px] font-bold tracking-tight text-[#00d2ff] leading-none">
                No RUN
              </span>
              <span className="font-label-caps text-[11px] text-[#bbc9cf] uppercase tracking-wider">
                {titles[currentTab]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Workout manager button */}
          {onOpenWorkoutManager && (
            <button
              onClick={onOpenWorkoutManager}
              className="px-2.5 py-1.5 rounded-lg bg-[#242a38] hover:bg-[#2f3543] text-[#00d2ff] font-label-interactive text-[12px] font-bold flex items-center gap-1 border border-white/5 active:scale-95 transition-all"
              title="Gerenciar / Cadastrar Treinos"
            >
              <span className="material-symbols-outlined text-[16px]">list_alt</span>
              <span>Treinos</span>
            </button>
          )}

          {/* Athlete profile trigger */}
          <button
            onClick={onOpenProfile}
            aria-label="Abrir Perfil do Atleta"
            className="w-10 h-10 rounded-full flex items-center justify-center p-0.5 bg-[#242a38] hover:ring-2 hover:ring-[#00d2ff] transition-all active:scale-95 relative"
            title={`${athleteProfile.name} • Perfil do Atleta`}
          >
            <img
              alt={athleteProfile.name}
              className="w-8 h-8 rounded-full object-cover"
              src={athleteProfile.avatar}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#69f6b9] border-2 border-[#0d1320]" />
          </button>
        </div>
      </div>
    </header>
  );
};
