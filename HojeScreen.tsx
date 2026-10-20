import React, { useState } from 'react';
import { WorkoutRoutine, AthleteProfile, CreatineCheckin } from '../types';

interface HojeScreenProps {
  currentRoutine: WorkoutRoutine;
  athleteProfile: AthleteProfile;
  creatineCheckin: CreatineCheckin;
  onToggleCreatine: (taken: boolean, dosage?: number) => void;
  onStartWorkout: () => void;
  onOpenWorkoutSwitcher: () => void;
  onOpenCreateWorkout: () => void;
  onOpenAthleteProfile: () => void;
  onOpenWeightModal: () => void;
  onSelectExerciseToView?: (exerciseIndex: number) => void;
}

export const HojeScreen: React.FC<HojeScreenProps> = ({
  currentRoutine,
  athleteProfile,
  creatineCheckin,
  onToggleCreatine,
  onStartWorkout,
  onOpenWorkoutSwitcher,
  onOpenCreateWorkout,
  onOpenAthleteProfile,
  onOpenWeightModal,
  onSelectExerciseToView,
}) => {
  const [selectedDose, setSelectedDose] = useState<number>(creatineCheckin.dosageGrams || 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  const handleCreatineClick = () => {
    onToggleCreatine(!creatineCheckin.taken, selectedDose);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 space-y-4 max-w-md mx-auto pt-2">
      {/* Greeting Header & Firebase Cloud Badge */}
      <section className="flex flex-col pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00d2ff] text-[18px]">bolt</span>
              <span className="font-label-caps text-[11px] text-[#00d2ff] uppercase tracking-widest font-bold">
                Sessão Programada
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#48d99e]/15 text-[#69f6b9] font-label-caps text-[9px] font-bold flex items-center gap-0.5 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#69f6b9] animate-pulse" />
                Firebase Cloud
              </span>
            </div>
            <h1 className="font-headline-xl-mobile text-[28px] text-white tracking-tight mt-0.5 font-bold">
              {greeting}, {athleteProfile.name}!
            </h1>
          </div>
          <button
            onClick={onOpenAthleteProfile}
            aria-label="Editar Perfil"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[#242a38] text-[#00d2ff] hover:bg-[#2f3543] active:scale-95 transition-all shadow-md border border-white/5"
            title="Editar Cadastro do Atleta"
          >
            <span className="material-symbols-outlined text-[22px]">manage_accounts</span>
          </button>
        </div>
        <p className="font-body-md text-[#bbc9cf] text-[14px] mt-0.5">
          {athleteProfile.goal ? `Meta: ${athleteProfile.goal}` : 'Pronto para superar seus limites hoje?'}
        </p>
      </section>

      {/* 💥 CREATINE CHECK-IN WIDGET (Prominently on Home Screen) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1f2d] via-[#161b29] to-[#0d1320] p-4 shadow-xl border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                creatineCheckin.taken
                  ? 'bg-[#48d99e]/20 text-[#69f6b9] shadow-[0_0_12px_rgba(105,246,185,0.4)]'
                  : 'bg-[#00d2ff]/15 text-[#00d2ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {creatineCheckin.taken ? 'check_circle' : 'medication'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[15px] font-bold text-white flex items-center gap-1.5">
                Check-in de Creatina
                {creatineCheckin.taken && (
                  <span className="px-1.5 py-0.2 rounded bg-[#48d99e]/20 text-[#69f6b9] font-label-caps text-[9px] font-bold">
                    TOMADO
                  </span>
                )}
              </span>
              <span className="font-body-sm text-[12px] text-[#bbc9cf]">
                {creatineCheckin.taken
                  ? `${creatineCheckin.dosageGrams || 5}g registrados hoje • Parabéns!`
                  : 'Mantenha a saturação muscular em dia'}
              </span>
            </div>
          </div>

          {/* Dosage picker when not taken */}
          {!creatineCheckin.taken && (
            <div className="flex items-center gap-1 bg-[#0d1320] p-1 rounded-lg border border-white/5">
              {[3, 5, 10].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedDose(g)}
                  className={`px-1.5 py-0.5 rounded font-label-caps text-[10px] font-bold transition-all ${
                    selectedDose === g
                      ? 'bg-[#00d2ff] text-[#003543]'
                      : 'text-[#859399] hover:text-white'
                  }`}
                >
                  {g}g
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleCreatineClick}
            className={`w-full h-11 rounded-xl font-headline-sm text-[13px] font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md ${
              creatineCheckin.taken
                ? 'bg-[#48d99e] text-[#003824] hover:bg-[#69f6b9]'
                : 'bg-[#00d2ff] text-[#003543] hover:bg-[#a5e7ff] shadow-[0_0_16px_rgba(0,210,255,0.3)]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {creatineCheckin.taken ? 'done_all' : 'task_alt'}
            </span>
            <span>
              {creatineCheckin.taken
                ? `Creatina Tomada Hoje (${creatineCheckin.dosageGrams || 5}g) • Toque para desmarcar`
                : `Marcar que Tomei Creatina Hoje (${selectedDose}g)`}
            </span>
          </button>
        </div>
      </section>

      {/* Hero Highlight Card: Treino do Dia */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#242a38] via-[#1a1f2d] to-[#080e1b] p-4 shadow-xl border border-white/5">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#00d2ff]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-48 h-48 bg-[#0053db]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-3">
          {/* Badges Row */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00d2ff]/15 text-[#00d2ff] border border-[#00d2ff]/20">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              <span className="font-label-caps text-[10px] uppercase font-bold tracking-wider">
                {currentRoutine.focus}
              </span>
            </div>
            <button
              onClick={onOpenWorkoutSwitcher}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2f3543] text-[#bbc9cf] hover:text-[#00d2ff] hover:bg-[#333948] transition-colors active:scale-95 border border-white/5"
              type="button"
              title="Trocar treino de hoje"
            >
              <span className="font-label-caps text-[10px] uppercase tracking-wider font-semibold">
                Trocar Treino do Dia
              </span>
              <span className="material-symbols-outlined text-[14px]">sync_alt</span>
            </button>
          </div>

          {/* Workout Title & Meta */}
          <div className="flex flex-col">
            <span className="font-label-caps text-[11px] text-[#00d2ff] uppercase font-bold tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#69f6b9] inline-block" />
              Treino do Dia
            </span>
            <h2 className="font-headline-lg text-[24px] text-white font-bold tracking-tight mt-0.5">
              {currentRoutine.letter} • {currentRoutine.name}
            </h2>
            <div className="flex items-center gap-2 text-[#bbc9cf] mt-1.5 text-body-sm text-[13px]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#00d2ff]">schedule</span>
                <span>{currentRoutine.durationMinutes} min</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#00d2ff]">fitness_center</span>
                <span>{currentRoutine.exerciseCount} exercícios</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#00d2ff]">repeat</span>
                <span>{currentRoutine.setCount} séries</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Representation */}
          <div className="relative w-full h-32 rounded-xl overflow-hidden mt-1 shadow-inner border border-white/5">
            <img
              className="w-full h-full object-cover"
              alt="Capa do treino"
              src={
                currentRoutine.heroImage ||
                'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080e1b]/95 via-[#080e1b]/40 to-transparent flex items-end p-2.5">
              <span className="font-label-caps text-[10px] text-[#00d2ff] uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
                {currentRoutine.suggestedTarget}
              </span>
            </div>
          </div>

          {/* Massive Pulsing CTA Button */}
          <button
            onClick={onStartWorkout}
            id="start-workout-btn"
            type="button"
            className="relative group w-full h-14 rounded-xl bg-gradient-to-r from-[#0053db] via-[#00d2ff] to-[#00d2ff] text-[#003543] font-headline-md text-[18px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,210,255,0.4)] active:scale-[0.98] transition-all overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span
              className="material-symbols-outlined text-[28px] text-[#003543] animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            <span className="tracking-wide">Iniciar Treino</span>
          </button>
        </div>
      </section>

      {/* Cadastrável: Peso Corporal & Métricas Rápidas */}
      <section className="flex flex-col space-y-2 rounded-2xl bg-[#1a1f2d] p-4 shadow-md border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00d2ff] text-[20px]">scale</span>
            <span className="font-headline-sm text-white font-semibold">Peso Corporal</span>
          </div>
          <button
            onClick={onOpenWeightModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#242a38] hover:bg-[#2f3543] text-[#00d2ff] font-label-caps text-[10px] font-bold transition-all border border-white/5"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            <span>Registrar Peso</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div
            onClick={onOpenWeightModal}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#242a38] cursor-pointer hover:bg-[#2f3543] transition-colors border border-white/5"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2f3543] flex items-center justify-center text-[#00d2ff]">
              <span className="material-symbols-outlined text-[18px]">monitor_weight</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-caps text-[10px] text-[#bbc9cf] uppercase">Peso Atual</span>
              <span className="font-metric-value-md text-[17px] text-white truncate font-bold">
                {athleteProfile.weightKg} kg
              </span>
            </div>
          </div>

          <div
            onClick={onOpenAthleteProfile}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#242a38] cursor-pointer hover:bg-[#2f3543] transition-colors border border-white/5"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2f3543] flex items-center justify-center text-[#69f6b9]">
              <span className="material-symbols-outlined text-[18px]">fitness_center</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-caps text-[10px] text-[#bbc9cf] uppercase">Carga Supino</span>
              <span className="font-metric-value-md text-[17px] text-[#69f6b9] truncate font-bold">
                {athleteProfile.maxBenchPress || 90} kg
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Preview List with Registered Weights */}
      <section className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00d2ff] text-[20px]">list_alt</span>
            <h3 className="font-headline-sm text-white font-semibold">
              Exercícios e Cargas do Treino ({currentRoutine.exercises.length})
            </h3>
          </div>
          <button
            onClick={onOpenWorkoutSwitcher}
            className="font-label-caps text-[11px] text-[#00d2ff] uppercase hover:underline"
          >
            Gerenciar
          </button>
        </div>

        <div className="flex flex-col space-y-2">
          {currentRoutine.exercises.map((exercise, idx) => (
            <div
              key={exercise.id}
              onClick={() => onSelectExerciseToView && onSelectExerciseToView(idx)}
              className="flex items-center justify-between p-3 rounded-xl bg-[#1a1f2d] hover:bg-[#242a38] transition-all cursor-pointer border border-white/5 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#2f3543] text-[#00d2ff] flex items-center justify-center font-metric-value-md text-[16px] font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-lg text-white font-semibold truncate text-[15px]">
                    {exercise.name}
                  </span>
                  <div className="flex items-center gap-1 text-[#bbc9cf] text-[12px] font-body-sm">
                    <span className="text-[#00d2ff] font-medium">{exercise.targetSets} séries</span>
                    <span>•</span>
                    <span>{exercise.targetReps}</span>
                    <span className="text-[#859399]">({exercise.muscleGroup})</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-metric-value-md text-[14px] text-white font-bold bg-[#0d1320] px-2 py-0.5 rounded border border-white/5">
                  {exercise.sets[0]?.weight || 20} kg
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#859399]">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cadastros & Gestão Shortcuts */}
      <section className="flex flex-col space-y-2 pt-1">
        <span className="font-label-caps text-[11px] text-[#bbc9cf] uppercase px-0.5 font-bold">
          Cadastros &amp; Personalização
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenCreateWorkout}
            className="flex flex-col items-start p-3.5 rounded-xl bg-[#1a1f2d] text-left hover:bg-[#242a38] transition-all active:scale-95 border border-white/5"
            type="button"
          >
            <div className="w-8 h-8 rounded-lg bg-[#242a38] text-[#00d2ff] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <span className="font-headline-sm text-white text-[15px] font-bold">Cadastrar Treino</span>
            <span className="font-body-sm text-[#bbc9cf] text-[12px] mt-0.5">Criar rotina e exercícios</span>
          </button>

          <button
            onClick={onOpenAthleteProfile}
            className="flex flex-col items-start p-3.5 rounded-xl bg-[#1a1f2d] text-left hover:bg-[#242a38] transition-all active:scale-95 border border-white/5"
            type="button"
          >
            <div className="w-8 h-8 rounded-lg bg-[#242a38] text-[#69f6b9] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <span className="font-headline-sm text-white text-[15px] font-bold">Cadastro do Atleta</span>
            <span className="font-body-sm text-[#bbc9cf] text-[12px] mt-0.5">Métricas e informações</span>
          </button>
        </div>
      </section>
    </div>
  );
};
