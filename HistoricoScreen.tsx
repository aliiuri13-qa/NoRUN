import React, { useState } from 'react';
import { WorkoutSession } from '../types';

interface HistoricoScreenProps {
  sessions: WorkoutSession[];
  onOpenReportModal: () => void;
  onGoToHome?: () => void;
}

export const HistoricoScreen: React.FC<HistoricoScreenProps> = ({
  sessions,
  onOpenReportModal,
  onGoToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'evolution'>('calendar');
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos os treinos');
  const [selectedSessionDetail, setSelectedSessionDetail] = useState<WorkoutSession | null>(null);
  const [showToast, setShowToast] = useState(false);

  const filters = ['Todos os treinos', 'Peito', 'Costas', 'Pernas', 'Ombros'];

  const filteredSessions = sessions.filter((s) => {
    if (selectedFilter === 'Todos os treinos') return true;
    return s.category === selectedFilter || s.title.includes(selectedFilter);
  });

  const totalVolumeKg = sessions.reduce((acc, s) => acc + (s.totalWeightKg || 0), 0);
  const totalSetsCount = sessions.reduce((acc, s) => acc + (s.totalSets || 0), 0);

  const handleTriggerReport = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onOpenReportModal();
    }, 900);
  };

  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  const capitalizedMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

  return (
    <div className="flex flex-col w-full pb-28 max-w-md mx-auto pt-1">
      {/* Interactive Top Action & Page Framing */}
      <div className="px-4 pt-1 pb-2 flex items-center justify-between">
        <div>
          <span className="font-label-caps text-[11px] text-[#00d2ff] tracking-wider uppercase font-bold">
            Analytics de Treino
          </span>
          <h2 className="font-headline-xl-mobile text-[26px] text-white font-bold leading-tight">
            Histórico &amp; Evolução
          </h2>
        </div>
        {sessions.length > 0 && (
          <button
            onClick={handleTriggerReport}
            id="exportBtn"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#242a38] active:bg-[#333948] text-[#00d2ff] text-[13px] font-semibold rounded-xl shadow-md transition-all active:scale-95 border border-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
            <span>Relatório</span>
          </button>
        )}
      </div>

      {/* Segmented View Mode Switcher */}
      <div className="px-4 mb-3">
        <div className="grid grid-cols-2 p-1 bg-[#161b29] rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('calendar')}
            id="tabCalendar"
            className={`py-2 rounded-lg font-label-interactive text-[13px] flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'calendar'
                ? 'bg-[#00d2ff] text-[#003543] font-bold shadow-sm'
                : 'text-[#bbc9cf] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Calendário</span>
          </button>
          <button
            onClick={() => setActiveTab('evolution')}
            id="tabExercise"
            className={`py-2 rounded-lg font-label-interactive text-[13px] flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'evolution'
                ? 'bg-[#00d2ff] text-[#003543] font-bold shadow-sm'
                : 'text-[#bbc9cf] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>Evolução Cargas</span>
          </button>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        /* Interactive Calendar Block */
        <div className="px-4 mb-3">
          <div className="bg-[#1a1f2d] rounded-2xl p-4 shadow-md border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-white font-bold text-[16px]">
                  {capitalizedMonth}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#00d2ff]/15 text-[#00d2ff] text-[10px] font-label-caps font-bold">
                  {sessions.length} {sessions.length === 1 ? 'TREINO SALVO' : 'TREINOS SALVOS'}
                </span>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-label-caps text-[10px] text-[#859399] mb-2">
              <span>DOM</span>
              <span>SEG</span>
              <span>TER</span>
              <span>QUA</span>
              <span>QUI</span>
              <span>SEX</span>
              <span>SÁB</span>
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 text-center font-label-caps text-[11px]">
              {Array.from({ length: 28 }).map((_, idx) => {
                const dayNum = idx + 1;
                const isToday = dayNum === new Date().getDate();
                const hasSession = sessions.length > 0 && dayNum <= sessions.length;

                return (
                  <div
                    key={idx}
                    className={`py-1.5 rounded-lg text-center relative transition-all ${
                      isToday
                        ? 'bg-[#00d2ff] text-[#003543] font-bold shadow-md shadow-[#00d2ff]/20'
                        : hasSession
                        ? 'bg-[#242a38] text-white border border-white/5'
                        : 'bg-[#161b29]/50 text-[#859399]'
                    }`}
                  >
                    <span>{dayNum.toString().padStart(2, '0')}</span>
                    {hasSession && !isToday && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00d2ff]" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Consistency Footer */}
            <div className="mt-3 pt-2 bg-[#080e1b]/60 rounded-xl px-3 py-2 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#69f6b9] text-[18px]">
                  local_fire_department
                </span>
                <span className="font-body-sm text-[12px] text-white">
                  Registros: <strong className="text-[#69f6b9]">{sessions.length} treinos</strong>
                </span>
              </div>
              <span className="font-label-caps text-[10px] text-[#bbc9cf]">
                Total: {totalSetsCount} séries
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Evolução Cargas Breakdown */
        <div className="px-4 mb-3">
          <div className="bg-[#1a1f2d] rounded-2xl p-4 shadow-md border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-white font-bold text-[16px]">Progresso de Carga</span>
              <span className="font-label-caps text-[#69f6b9] font-bold text-[11px]">
                {totalVolumeKg > 0 ? `${(totalVolumeKg / 1000).toFixed(1)}t acumulado` : 'Em evolução'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-[#242a38] border border-[#00d2ff]/30 text-center">
                <span className="font-label-caps text-[9px] text-[#00d2ff] uppercase block font-bold">
                  Volume Total
                </span>
                <span className="font-metric-value-md text-white font-bold text-[15px]">
                  {totalVolumeKg.toLocaleString('pt-BR')} kg
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#242a38] border border-white/5 text-center">
                <span className="font-label-caps text-[9px] text-[#bbc9cf] uppercase block font-bold">
                  Sessões
                </span>
                <span className="font-metric-value-md text-white font-bold text-[15px]">
                  {sessions.length}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#242a38] border border-white/5 text-center">
                <span className="font-label-caps text-[9px] text-[#bbc9cf] uppercase block font-bold">
                  Séries
                </span>
                <span className="font-metric-value-md text-white font-bold text-[15px]">
                  {totalSetsCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Volume Summary Card */}
      {sessions.length > 0 && (
        <div className="px-4 mb-3">
          <div className="bg-[#1a1f2d] rounded-2xl p-4 shadow-md border border-white/5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-label-caps text-[10px] text-[#bbc9cf] uppercase font-semibold">
                  Volume Total Acumulado Real
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-metric-value-lg text-[26px] text-white font-bold">
                    {totalVolumeKg.toLocaleString('pt-BR')}
                  </span>
                  <span className="font-label-caps text-[12px] text-[#00d2ff] font-bold">KG</span>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#48d99e]/20 text-[#69f6b9]">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span className="font-label-caps text-[11px] font-bold">Ativo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Chips Row */}
      {sessions.length > 0 && (
        <div className="px-4 mb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {filters.map((chip) => {
              const isActive = selectedFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setSelectedFilter(chip)}
                  className={`filter-chip flex-shrink-0 px-3 py-1.5 rounded-full font-label-interactive text-[13px] transition-all ${
                    isActive
                      ? 'bg-[#00d2ff] text-[#003543] font-bold shadow-sm'
                      : 'bg-[#242a38] text-[#bbc9cf] hover:text-white border border-white/5'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline Sessions List */}
      <div className="px-4 flex flex-col gap-2.5 mb-6">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[11px] text-[#bbc9cf] uppercase font-bold">
            Sessões Registradas
          </span>
          <span className="font-label-caps text-[10px] text-[#00d2ff] font-bold">
            {filteredSessions.length} Registros
          </span>
        </div>

        {filteredSessions.length === 0 ? (
          /* Empty State for Clean Real History */
          <div className="p-6 rounded-2xl bg-[#1a1f2d] border border-white/5 text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#00d2ff]/10 text-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">fitness_center</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-headline-sm text-white font-bold text-[16px]">
                Nenhum treino registrado ainda
              </h4>
              <p className="font-body-sm text-[#859399] text-[13px] max-w-xs">
                Inicie seu treino do dia e registre as séries para acompanhar sua evolução de cargas e volume aqui.
              </p>
            </div>
            {onGoToHome && (
              <button
                onClick={onGoToHome}
                className="mt-1 px-4 py-2 rounded-xl bg-[#00d2ff] text-[#003543] font-headline-sm text-[13px] font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-md"
              >
                <span>Ir para Treino do Dia</span>
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              </button>
            )}
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSessionDetail(session)}
              className="group relative bg-[#1a1f2d] rounded-2xl p-4 shadow-md active:bg-[#242a38] transition-all cursor-pointer border border-white/5 hover:border-white/20"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-pulse" />
                  <span className="font-label-caps text-[11px] text-[#00d2ff] font-bold">
                    {session.dateFormatted}
                  </span>
                </div>

                <span className="font-label-caps text-[10px] text-[#69f6b9] font-bold bg-[#69f6b9]/15 px-2 py-0.5 rounded">
                  {session.statusBadge || 'CONCLUÍDO'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline-sm text-[16px] text-white font-semibold">
                    {session.title}
                  </h3>
                  <p className="font-body-sm text-[12px] text-[#bbc9cf] mt-0.5">
                    {session.subtitle}
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#859399] group-hover:text-[#00d2ff] transition-colors">
                  chevron_right
                </span>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2 bg-[#080e1b]/50 rounded-xl p-2.5 border border-white/5">
                <div className="flex flex-col">
                  <span className="font-label-caps text-[9px] text-[#859399]">DURAÇÃO</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-[#859399]">schedule</span>
                    <span className="font-metric-value-md text-white text-[15px] font-bold">
                      {session.durationMins}m
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[9px] text-[#859399]">CARGA TOTAL</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-[#00d2ff]">fitness_center</span>
                    <span className="font-metric-value-md text-white text-[15px] font-bold">
                      {session.totalWeightKg.toLocaleString('pt-BR')}
                      <span className="text-[10px] text-[#bbc9cf] ml-0.5">kg</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[9px] text-[#859399]">VOLUME</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-[#859399]">repeat</span>
                    <span className="font-metric-value-md text-white text-[15px] font-bold">
                      {session.totalSets}
                      <span className="text-[10px] text-[#bbc9cf] ml-0.5">sets</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Session Drilldown Detail Modal */}
      {selectedSessionDetail && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#161b29] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <span className="font-label-caps text-[10px] text-[#00d2ff] uppercase font-bold">
                  {selectedSessionDetail.dateFormatted}
                </span>
                <h3 className="font-headline-sm text-white font-bold text-[18px]">
                  {selectedSessionDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSessionDetail(null)}
                className="w-8 h-8 rounded-lg bg-[#242a38] text-[#859399] flex items-center justify-center hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-[#1a1f2d] text-center border border-white/5">
                  <span className="font-label-caps text-[9px] text-[#859399] block">DURAÇÃO</span>
                  <span className="font-metric-value-md text-white font-bold text-[16px]">
                    {selectedSessionDetail.durationMins} min
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1a1f2d] text-center border border-white/5">
                  <span className="font-label-caps text-[9px] text-[#859399] block">CARGA TOTAL</span>
                  <span className="font-metric-value-md text-[#00d2ff] font-bold text-[16px]">
                    {selectedSessionDetail.totalWeightKg.toLocaleString('pt-BR')} kg
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1a1f2d] text-center border border-white/5">
                  <span className="font-label-caps text-[9px] text-[#859399] block">SÉRIES</span>
                  <span className="font-metric-value-md text-[#69f6b9] font-bold text-[16px]">
                    {selectedSessionDetail.totalSets}
                  </span>
                </div>
              </div>

              {selectedSessionDetail.notes && (
                <div className="p-3 rounded-xl bg-[#080e1b] border border-white/5">
                  <span className="font-label-caps text-[10px] text-[#859399] uppercase block mb-1">
                    Anotações da Sessão
                  </span>
                  <p className="font-body-sm text-[#dde2f5] text-[13px] italic">
                    "{selectedSessionDetail.notes}"
                  </p>
                </div>
              )}

              {selectedSessionDetail.completedExercises && (
                <div className="space-y-1.5">
                  <span className="font-label-caps text-[10px] text-[#859399] uppercase font-bold block">
                    Exercícios Executados
                  </span>
                  {selectedSessionDetail.completedExercises.map((ex) => (
                    <div
                      key={ex.num}
                      className="p-2.5 rounded-xl bg-[#1a1f2d] flex justify-between items-center border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#242a38] text-[#00d2ff] text-[11px] font-bold flex items-center justify-center">
                          {ex.num}
                        </span>
                        <div>
                          <span className="font-body-md text-white text-[13px] font-semibold block">
                            {ex.name}
                          </span>
                          <span className="text-[11px] text-[#bbc9cf]">{ex.detail}</span>
                        </div>
                      </div>
                      <span className="font-metric-value-md text-[#00d2ff] font-bold text-[14px]">
                        {ex.weight}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedSessionDetail(null)}
              className="w-full h-11 rounded-xl bg-[#242a38] text-white font-headline-sm text-[13px] font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Micro-interaction Feedback Toast */}
      <div
        id="exportToast"
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl bg-[#242a38]/95 backdrop-blur-md text-white font-label-interactive text-[13px] flex items-center gap-2 shadow-2xl border border-[#00d2ff]/30 transition-all duration-300 z-50 pointer-events-none ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <span className="material-symbols-outlined text-[#69f6b9] text-[18px]">check_circle</span>
        <span>Relatório pronto para exportação!</span>
      </div>
    </div>
  );
};
