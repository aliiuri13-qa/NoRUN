import React, { useState } from 'react';
import { WorkoutSession, AthleteProfile } from '../types';

interface ResultadosScreenProps {
  currentSession: WorkoutSession;
  athleteProfile: AthleteProfile;
  onSaveAndGoToHistory: (updatedSession: WorkoutSession) => void;
}

export const ResultadosScreen: React.FC<ResultadosScreenProps> = ({
  currentSession,
  athleteProfile,
  onSaveAndGoToHistory,
}) => {
  const [selectedRpe, setSelectedRpe] = useState<number>(currentSession.rpe || 8.5);
  const [rpeLabel, setRpeLabel] = useState<string>('RPE 8.5 • Intenso');
  const [notes, setNotes] = useState<string>(
    currentSession.notes || 'Treino executado com foco e boa cadência em todas as séries.'
  );
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const rpeOptions = [
    { value: 6, label: 'Leve', display: 'RPE 6 • Leve' },
    { value: 7, label: 'Médio', display: 'RPE 7 • Moderado' },
    { value: 8, label: 'Forte', display: 'RPE 8 • Desafiador' },
    { value: 8.5, label: 'Intenso', display: 'RPE 8.5 • Intenso' },
    { value: 10, label: 'Máx', display: 'RPE 10 • Falha Total' },
  ];

  const handleSelectRpe = (val: number, display: string) => {
    setSelectedRpe(val);
    setRpeLabel(display);
  };

  const handleSaveWorkout = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        onSaveAndGoToHistory({
          ...currentSession,
          rpe: selectedRpe,
          notes,
        });
      }, 700);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-28 gap-4 max-w-md mx-auto pt-1">
      {/* Dynamic Glow Celebration Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#242a38] via-[#1a1f2d] to-[#161b29] p-4 shadow-xl mx-4 border border-white/5">
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#00d2ff]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#0053db]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2">
          {/* Tag / Badge */}
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#00d2ff]/15 text-[#00d2ff] border border-[#00d2ff]/20">
            <span className="material-symbols-outlined text-[16px] animate-pulse">local_fire_department</span>
            <span className="font-label-caps text-[10px] uppercase tracking-wider font-bold">
              Treino Concluído com Sucesso!
            </span>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col mt-0.5">
            <h1 className="font-headline-xl-mobile text-[26px] text-white tracking-tight font-bold">
              Excelente desempenho, {athleteProfile.name}!
            </h1>
            <div className="flex items-center gap-1.5 mt-1 text-[#bbc9cf] font-body-sm text-[13px]">
              <span className="material-symbols-outlined text-[15px] text-[#00d2ff]">event_available</span>
              <span>{currentSession.dateFormatted}</span>
              <span className="w-1 h-1 rounded-full bg-[#859399]" />
              <span className="text-[#00d2ff] font-medium">{currentSession.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics 2x2 Grid */}
      <div className="px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[11px] text-[#bbc9cf] uppercase font-bold tracking-wider">
            Resumo da Carga de Trabalho
          </span>
          <span className="font-label-caps text-[11px] text-[#00d2ff] font-bold">Treino Salvo</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Metric 1: Tempo Total */}
          <div className="flex flex-col p-3.5 rounded-xl bg-[#1a1f2d] hover:bg-[#242a38] transition-colors shadow-md border border-white/5">
            <div className="flex items-center justify-between text-[#00d2ff] mb-1">
              <span className="material-symbols-outlined text-[20px]">timer</span>
              <span className="font-label-caps text-[10px] text-[#859399]">DURAÇÃO</span>
            </div>
            <span className="font-metric-value-lg text-[26px] text-white font-bold">
              {currentSession.durationMins}
              <span className="text-body-md text-[#bbc9cf] ml-1 text-[14px]">min</span>
            </span>
            <span className="text-body-sm text-[#bbc9cf] mt-0.5 text-[12px]">Tempo total de treino</span>
          </div>

          {/* Metric 2: Volume Total */}
          <div className="flex flex-col p-3.5 rounded-xl bg-[#1a1f2d] hover:bg-[#242a38] transition-colors shadow-md border border-white/5">
            <div className="flex items-center justify-between text-[#00d2ff] mb-1">
              <span className="material-symbols-outlined text-[20px]">fitness_center</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#48d99e]/20 text-[#69f6b9] font-label-caps text-[9px] font-bold">
                VOLUME
              </span>
            </div>
            <span className="font-metric-value-lg text-[26px] text-white font-bold">
              {currentSession.totalWeightKg.toLocaleString('pt-BR')}
              <span className="text-body-md text-[#bbc9cf] ml-1 text-[14px]">kg</span>
            </span>
            <span className="text-body-sm text-[#69f6b9] mt-0.5 flex items-center gap-0.5 text-[12px] font-medium">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> Tonelagem acumulada
            </span>
          </div>

          {/* Metric 3: Séries Concluídas */}
          <div className="flex flex-col p-3.5 rounded-xl bg-[#1a1f2d] hover:bg-[#242a38] transition-colors shadow-md border border-white/5">
            <div className="flex items-center justify-between text-[#00d2ff] mb-1">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
              <span className="font-label-caps text-[10px] text-[#69f6b9] font-bold">100% FEITO</span>
            </div>
            <span className="font-metric-value-lg text-[26px] text-white font-bold">
              {currentSession.totalSets}
              <span className="text-body-md text-[#bbc9cf] ml-1 text-[14px]">séries</span>
            </span>
            <span className="text-body-sm text-[#bbc9cf] mt-0.5 text-[12px]">Executadas na sessão</span>
          </div>

          {/* Metric 4: Calorias */}
          <div className="flex flex-col p-3.5 rounded-xl bg-[#1a1f2d] hover:bg-[#242a38] transition-colors shadow-md border border-white/5">
            <div className="flex items-center justify-between text-[#00d2ff] mb-1">
              <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
              <span className="font-label-caps text-[10px] text-[#859399]">ESTIMADO</span>
            </div>
            <span className="font-metric-value-lg text-[26px] text-white font-bold">
              {currentSession.calories || Math.round(currentSession.durationMins * 7.5)}
              <span className="text-body-md text-[#bbc9cf] ml-1 text-[14px]">kcal</span>
            </span>
            <span className="text-body-sm text-[#bbc9cf] mt-0.5 text-[12px]">Gasto energético</span>
          </div>
        </div>
      </div>

      {/* Exercises Logged List */}
      <div className="px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[11px] text-[#bbc9cf] uppercase font-bold">
            Exercícios Realizados
          </span>
          <span className="font-label-caps text-[11px] text-[#859399]">Carga Registrada</span>
        </div>

        <div className="flex flex-col gap-1 rounded-xl bg-[#1a1f2d] p-2 shadow-md border border-white/5">
          {currentSession.completedExercises && currentSession.completedExercises.length > 0 ? (
            currentSession.completedExercises.map((item) => (
              <div
                key={item.num}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#242a38] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#2f3543] flex items-center justify-center text-[#00d2ff] font-label-caps text-[12px] font-bold shrink-0">
                    {item.num}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-white truncate text-[14px] font-semibold">
                      {item.name}
                    </span>
                    <span className="font-body-sm text-[#bbc9cf] text-[12px]">{item.detail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="font-metric-value-md text-white font-bold text-[15px]">
                      {item.weight}
                    </span>
                    {item.weightBadge && (
                      <span className="font-label-caps text-[10px] text-[#00d2ff] font-semibold">
                        {item.weightBadge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-[#859399] text-[13px]">
              Exercícios registrados com sucesso.
            </div>
          )}
        </div>
      </div>

      {/* Interactive Feedback & Reflection Section */}
      <div className="px-4 flex flex-col gap-2">
        <span className="font-label-caps text-[11px] text-[#bbc9cf] uppercase font-bold">
          Como foi o treino hoje?
        </span>
        <div className="p-4 rounded-xl bg-[#1a1f2d] shadow-md flex flex-col gap-3 border border-white/5">
          {/* RPE Selector */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-body-sm text-white text-[13px]">
              <span className="font-medium">Percepção de Esforço (RPE)</span>
              <span className="font-label-caps text-[#00d2ff] font-bold" id="rpe-display">
                {rpeLabel}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {rpeOptions.map((opt) => {
                const isSelected = selectedRpe === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectRpe(opt.value, opt.display)}
                    type="button"
                    className={`rpe-btn h-11 rounded-lg font-label-caps flex flex-col items-center justify-center transition-all active:scale-95 border ${
                      isSelected
                        ? 'bg-[#00d2ff] text-[#003543] font-bold shadow-md border-[#00d2ff]'
                        : 'bg-[#242a38] text-[#bbc9cf] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-[13px] font-bold">{opt.value}</span>
                    <span className={`text-[9px] ${isSelected ? 'opacity-90 font-bold' : 'opacity-70'}`}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workout Notes Field */}
          <div className="flex flex-col gap-1">
            <label className="text-body-sm text-[#bbc9cf] text-[13px]" htmlFor="workout-note">
              Anotações do Treino
            </label>
            <div className="relative">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                id="workout-note"
                rows={3}
                placeholder="Ex: Como se sentiu, dores, recuperação..."
                className="w-full rounded-lg bg-[#080e1b] p-3 text-white font-body-md text-[13px] placeholder:text-[#859399] focus:outline-none focus:ring-1 focus:ring-[#00d2ff] resize-none transition-colors border border-white/5"
              />
              <div className="absolute bottom-2.5 right-2.5 text-[#00d2ff] pointer-events-none">
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Bottom Action Sticky Pill Container */}
      <div className="px-4 flex flex-col gap-1.5 pt-1">
        <button
          onClick={handleSaveWorkout}
          id="btn-save-share"
          type="button"
          disabled={saveStatus !== 'idle'}
          className={`w-full h-14 rounded-xl font-headline-sm text-[16px] font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all cursor-pointer ${
            saveStatus === 'saved'
              ? 'bg-[#48d99e] text-[#003824]'
              : 'bg-[#0053db] hover:bg-[#00d2ff] text-white hover:text-[#003543]'
          }`}
        >
          {saveStatus === 'saving' && (
            <>
              <span className="material-symbols-outlined text-[24px] animate-spin">sync</span>
              <span>Salvando no Histórico...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
              <span>Treino Salvo com Sucesso!</span>
            </>
          )}
          {saveStatus === 'idle' && (
            <>
              <span className="material-symbols-outlined text-[24px]">save</span>
              <span>Salvar no Histórico &amp; Finalizar</span>
            </>
          )}
        </button>

        <p className="text-center text-body-sm text-[#859399] text-[12px]">
          Dados armazenados com segurança no seu dispositivo
        </p>
      </div>
    </div>
  );
};
