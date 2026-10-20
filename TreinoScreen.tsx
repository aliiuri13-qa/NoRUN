import React, { useState } from 'react';
import { WorkoutRoutine } from '../types';

interface TreinoScreenProps {
  currentRoutine: WorkoutRoutine;
  workoutSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  restSeconds: number;
  onAddRestTime: (seconds: number) => void;
  onSkipRest: () => void;
  onFinishWorkout: () => void;
  onOpenPlateCalculator: (currentWeight: number) => void;
  activeExerciseIndex: number;
  setActiveExerciseIndex: (index: number) => void;
  onUpdateExerciseSet: (
    exerciseIndex: number,
    setIndex: number,
    updates: { weight?: number; reps?: number; completed?: boolean }
  ) => void;
  onAddSetToExercise: (exerciseIndex: number) => void;
}

export const TreinoScreen: React.FC<TreinoScreenProps> = ({
  currentRoutine,
  workoutSeconds,
  isTimerRunning,
  onToggleTimer,
  restSeconds,
  onAddRestTime,
  onSkipRest,
  onFinishWorkout,
  onOpenPlateCalculator,
  activeExerciseIndex,
  setActiveExerciseIndex,
  onUpdateExerciseSet,
  onAddSetToExercise,
}) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const currentExercise = currentRoutine.exercises[activeExerciseIndex] || currentRoutine.exercises[0];

  // Calculate overall completed exercises
  const totalExercises = currentRoutine.exercises.length;
  const completedExercisesCount = currentRoutine.exercises.filter((ex) =>
    ex.sets.every((s) => s.completed)
  ).length;
  const progressPercent = Math.round(
    ((completedExercisesCount + (activeExerciseIndex > 0 ? 0.4 : 0)) / totalExercises) * 100
  );

  // Active set inside current exercise (first uncompleted set, or last set)
  const activeSetIndex = Math.max(
    0,
    currentExercise.sets.findIndex((s) => !s.completed)
  );
  const activeSet = currentExercise.sets[activeSetIndex] || currentExercise.sets[0];

  const handleNextExercise = () => {
    if (activeExerciseIndex < totalExercises - 1) {
      setActiveExerciseIndex(activeExerciseIndex + 1);
    } else {
      onFinishWorkout();
    }
  };

  const handleCompleteActiveSet = (setIdx: number) => {
    const targetSet = currentExercise.sets[setIdx];
    const newCompleted = !targetSet.completed;
    onUpdateExerciseSet(activeExerciseIndex, setIdx, { completed: newCompleted });
    if (newCompleted) {
      // Trigger rest timer
      onAddRestTime(90);
    }
  };

  const handleAdjustWeight = (delta: number) => {
    const newWeight = Math.max(0, (activeSet.weight || 0) + delta);
    onUpdateExerciseSet(activeExerciseIndex, activeSetIndex, { weight: newWeight });
  };

  const handleAdjustReps = (delta: number) => {
    const newReps = Math.max(1, (activeSet.reps || 1) + delta);
    onUpdateExerciseSet(activeExerciseIndex, activeSetIndex, { reps: newReps });
  };

  // Next exercise preview
  const nextExercise = currentRoutine.exercises[activeExerciseIndex + 1];
  const subsequentExercise = currentRoutine.exercises[activeExerciseIndex + 2];

  return (
    <div className="flex flex-col w-full text-[#dde2f5] select-none pb-32 max-w-md mx-auto pt-1">
      {/* Ambient Gym Glow Backing */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-44 bg-[#00d2ff]/10 blur-[80px] pointer-events-none rounded-full" />

        {/* Active Session Tracker Bar */}
        <div className="px-4 pt-1 pb-2 flex flex-col gap-2">
          <div className="flex items-center justify-between bg-[#161b29] rounded-xl px-3.5 py-2.5 shadow-md border border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#242a38] text-[#00d2ff]">
                {isTimerRunning && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#69f6b9] animate-ping absolute" />
                )}
                <span
                  className={`w-2 h-2 rounded-full relative ${
                    isTimerRunning ? 'bg-[#69f6b9]' : 'bg-amber-400'
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-[10px] uppercase text-[#bbc9cf] flex items-center gap-1 font-semibold">
                  Treino Ativo • {currentRoutine.name}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span
                    id="session-timer"
                    className="font-display-timer-mobile text-[24px] font-bold text-[#a5e7ff] tracking-tight"
                  >
                    {formatTime(workoutSeconds)}
                  </span>
                  <span className="font-label-caps text-[10px] text-[#859399]">
                    {isTimerRunning ? 'EM ANDAMENTO' : 'PAUSADO'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTimer}
                aria-label={isTimerRunning ? 'Pausar Sessão' : 'Retomar Sessão'}
                className="w-10 h-10 rounded-lg bg-[#242a38] hover:bg-[#2f3543] flex items-center justify-center text-white transition-transform active:scale-95 border border-white/5"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isTimerRunning ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button
                onClick={onFinishWorkout}
                id="btn-finish-modal"
                className="px-3 h-10 rounded-lg bg-[#0053db] hover:bg-[#00d2ff] hover:text-[#003543] text-white font-headline-sm text-[13px] font-bold flex items-center gap-1 transition-all active:scale-95 shadow-sm"
              >
                <span>Finalizar</span>
                <span className="material-symbols-outlined text-[16px]">flag</span>
              </button>
            </div>
          </div>

          {/* Overall Workout Progress Ring / Bar */}
          <div className="bg-[#1a1f2d] rounded-xl p-3 shadow-sm flex flex-col gap-1.5 border border-white/5">
            <div className="flex justify-between items-center text-body-sm text-[13px]">
              <span className="text-[#bbc9cf] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00d2ff] text-[18px]">fitness_center</span>
                Progresso Geral
              </span>
              <span className="font-label-caps text-[11px] font-bold text-[#00d2ff]">
                {completedExercisesCount} de {totalExercises} concluídos ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-[#2f3543] rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-[#00d2ff] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,210,255,0.7)]"
                style={{ width: `${Math.min(100, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Rest Timer Strip (Dynamic Banner) */}
      <div className="px-4 my-1">
        <div className="relative overflow-hidden rounded-xl bg-[#242a38] p-3 shadow-lg flex items-center justify-between border border-white/5">
          {/* Progress fill */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#00d2ff]/15 transition-all duration-300 pointer-events-none"
            style={{ width: `${Math.min(100, (restSeconds / 90) * 100)}%` }}
          />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00d2ff]/20 flex items-center justify-center text-[#00d2ff]">
              <span className="material-symbols-outlined text-[20px] animate-pulse">timer</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] uppercase text-[#bbc9cf]">
                Descanso Sugerido
              </span>
              <div className="flex items-center gap-2">
                <span
                  id="rest-timer-display"
                  className="font-metric-value-md text-[20px] text-[#a5e7ff] font-bold"
                >
                  {restSeconds > 0 ? formatTime(restSeconds) : 'PRONTO!'}
                </span>
                <span className="text-body-sm text-[#859399] text-[12px]">
                  • Próx: Série {activeSetIndex + 1}
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-1.5">
            <button
              onClick={() => onAddRestTime(30)}
              id="btn-add-time"
              className="h-8 px-2.5 rounded-lg bg-[#2f3543] hover:bg-[#333948] text-[#a5e7ff] font-label-caps text-[11px] font-bold active:scale-95 transition-all flex items-center gap-0.5 border border-white/5"
            >
              +30s
            </button>
            <button
              onClick={onSkipRest}
              id="btn-skip-rest"
              className="h-8 px-2.5 rounded-lg bg-[#2f3543]/70 hover:bg-[#2f3543] text-[#bbc9cf] font-label-caps text-[11px] active:scale-95 transition-all border border-white/5"
            >
              Pular
            </button>
          </div>
        </div>
      </div>

      {/* Main Active Exercise Container */}
      <section className="px-4 mt-2 flex flex-col gap-3">
        <div className="bg-[#1a1f2d] rounded-2xl p-4 shadow-md flex flex-col gap-3 relative overflow-hidden border border-white/5">
          {/* Glow Accent Header */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d2ff] via-[#0053db] to-[#00d2ff] opacity-80" />

          {/* Exercise Details Header */}
          <div className="flex items-start justify-between pt-1">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#00d2ff]/15 text-[#00d2ff] text-[10px] font-label-caps uppercase font-bold">
                  Exercício {activeExerciseIndex + 1} de {totalExercises}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#2f3543] text-[#bbc9cf] text-[10px] font-label-caps uppercase">
                  {currentExercise.muscleGroup}
                </span>
              </div>
              <h2 className="font-headline-lg text-[22px] font-bold text-white">
                {currentExercise.name}
              </h2>
              <div className="flex items-center gap-1.5 text-body-sm text-[#bbc9cf] mt-0.5 text-[13px]">
                <span className="material-symbols-outlined text-[#69f6b9] text-[16px]">emoji_events</span>
                <span>
                  Recorde Pessoal: <strong className="text-[#69f6b9] font-label-caps">{currentExercise.pr}</strong>
                </span>
              </div>
            </div>

            {/* Exercise Quick Menu */}
            <button
              onClick={() => onOpenPlateCalculator(activeSet.weight || 90)}
              aria-label="Mais Opções"
              className="w-10 h-10 rounded-lg bg-[#242a38] hover:bg-[#2f3543] text-[#bbc9cf] hover:text-[#00d2ff] flex items-center justify-center active:scale-95 transition-all border border-white/5"
              title="Calculadora e opções"
            >
              <span className="material-symbols-outlined">calculate</span>
            </button>
          </div>

          {/* Ergonomic One-Handed Logging Table */}
          <div className="flex flex-col gap-1.5">
            {/* Table Column Headers */}
            <div className="grid grid-cols-12 gap-1 px-2 py-1 text-center font-label-caps text-[11px] text-[#859399] uppercase tracking-wider">
              <span className="col-span-2 text-left">Série</span>
              <span className="col-span-3 text-left">Anterior</span>
              <span className="col-span-3">Carga (kg)</span>
              <span className="col-span-2">Reps</span>
              <span className="col-span-2 text-right">Feito</span>
            </div>

            {/* Render all sets */}
            {currentExercise.sets.map((set, sIdx) => {
              const isActive = sIdx === activeSetIndex;
              const isCompleted = set.completed;

              if (isCompleted) {
                // Completed set row
                return (
                  <div
                    key={set.id}
                    className="grid grid-cols-12 gap-1 items-center bg-[#161b29]/70 rounded-lg px-2 py-2 min-h-[48px] text-body-sm border border-white/5"
                  >
                    <div className="col-span-2 flex items-center gap-1 font-label-caps font-bold text-[#bbc9cf]">
                      <span className="w-5 h-5 rounded-full bg-[#242a38] flex items-center justify-center text-[10px]">
                        {set.setNumber}
                      </span>
                    </div>
                    <div className="col-span-3 text-left font-label-caps text-[#859399] text-[12px]">
                      {set.previous}
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <span className="font-metric-value-md text-white text-[16px] font-bold">
                        {set.weight}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="font-metric-value-md text-white text-[16px] font-bold">
                        {set.reps}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button
                        onClick={() => handleCompleteActiveSet(sIdx)}
                        className="w-10 h-9 rounded-lg bg-[#48d99e] text-[#003824] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                      </button>
                    </div>
                  </div>
                );
              }

              if (isActive) {
                // ACTIVE SET ROW
                return (
                  <div
                    key={set.id}
                    className="relative grid grid-cols-12 gap-1 items-center bg-[#242a38] rounded-xl p-2 min-h-[58px] shadow-lg shadow-[#00d2ff]/10 border border-[#00d2ff]/40 overflow-hidden"
                  >
                    {/* Active Set Edge Luminescent Marker */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00d2ff]" />

                    <div className="col-span-2 pl-2 flex flex-col justify-center">
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-lg bg-[#00d2ff] text-[#003543] font-label-caps font-bold flex items-center justify-center text-[11px] shadow-sm">
                          {set.setNumber}
                        </span>
                      </div>
                      <span className="font-label-caps text-[9px] text-[#00d2ff] uppercase font-bold mt-0.5">
                        Alvo
                      </span>
                    </div>

                    <div className="col-span-3 text-left flex flex-col justify-center">
                      <span className="font-label-caps text-[11px] text-[#bbc9cf] font-semibold">
                        {set.previous}
                      </span>
                      <span className="font-label-caps text-[9px] text-[#859399]">
                        Meta RPE {set.targetRpe || 8.5}
                      </span>
                    </div>

                    {/* Weight Stepper */}
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="flex items-center bg-[#0d1320] rounded-lg p-0.5 w-full justify-between border border-white/5">
                        <button
                          onClick={() => handleAdjustWeight(-2.5)}
                          className="w-6 h-8 flex items-center justify-center text-[#00d2ff] hover:bg-[#2f3543] rounded active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span
                          id="current-weight-val"
                          className="font-metric-value-md text-[17px] text-[#00d2ff] font-bold"
                        >
                          {set.weight}
                        </span>
                        <button
                          onClick={() => handleAdjustWeight(2.5)}
                          className="w-6 h-8 flex items-center justify-center text-[#00d2ff] hover:bg-[#2f3543] rounded active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Reps Stepper */}
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="flex items-center bg-[#0d1320] rounded-lg p-0.5 w-full justify-between border border-white/5">
                        <button
                          onClick={() => handleAdjustReps(-1)}
                          className="w-5 h-8 flex items-center justify-center text-[#00d2ff] hover:bg-[#2f3543] rounded active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span
                          id="current-reps-val"
                          className="font-metric-value-md text-[17px] text-[#00d2ff] font-bold"
                        >
                          {set.reps}
                        </span>
                        <button
                          onClick={() => handleAdjustReps(1)}
                          className="w-5 h-8 flex items-center justify-center text-[#00d2ff] hover:bg-[#2f3543] rounded active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Log CTA */}
                    <div className="col-span-2 flex justify-end">
                      <button
                        onClick={() => handleCompleteActiveSet(sIdx)}
                        id="btn-complete-active-set"
                        className="w-11 h-10 rounded-lg bg-[#00d2ff] text-[#003543] font-bold flex items-center justify-center active:scale-95 shadow-md shadow-[#00d2ff]/25 transition-all hover:bg-[#a5e7ff]"
                        title="Concluir série"
                      >
                        <span className="material-symbols-outlined text-[24px]">done_all</span>
                      </button>
                    </div>
                  </div>
                );
              }

              // Pending set row
              return (
                <div
                  key={set.id}
                  className="grid grid-cols-12 gap-1 items-center bg-[#080e1b]/60 rounded-lg px-2 py-2 min-h-[48px] opacity-70 border border-white/5"
                >
                  <div className="col-span-2 flex items-center gap-1 font-label-caps font-bold text-[#859399]">
                    <span className="w-5 h-5 rounded-full bg-[#242a38] flex items-center justify-center text-[10px]">
                      {set.setNumber}
                    </span>
                  </div>
                  <div className="col-span-3 text-left font-label-caps text-[#859399] text-[12px]">
                    {set.previous}
                  </div>
                  <div className="col-span-3 flex justify-center">
                    <span className="font-label-caps text-[#859399] text-[14px]">--</span>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span className="font-label-caps text-[#859399] text-[14px]">--</span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => handleCompleteActiveSet(sIdx)}
                      className="w-10 h-9 rounded-lg bg-[#242a38] hover:bg-[#2f3543] text-[#859399] flex items-center justify-center active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Weight Plate Chips (One-Tap Increment) */}
          <div className="flex items-center justify-between px-2 pt-1 pb-1">
            <span className="font-label-caps text-[11px] text-[#859399]">Ajuste rápido (+kg):</span>
            <div className="flex gap-1.5">
              {[1.25, 2.5, 5, 10].map((inc) => (
                <button
                  key={inc}
                  onClick={() => handleAdjustWeight(inc)}
                  className="px-2.5 py-1 rounded-lg bg-[#242a38] hover:bg-[#2f3543] text-[#00d2ff] font-label-caps text-[11px] font-bold active:scale-95 transition-transform border border-white/5"
                >
                  +{inc}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row inside Exercise Card */}
          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <button
              onClick={() => onAddSetToExercise(activeExerciseIndex)}
              id="btn-add-set"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#242a38] hover:bg-[#2f3543] text-[#00d2ff] font-label-interactive text-body-sm active:scale-95 transition-transform border border-white/5"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span className="font-semibold text-[13px]">Adicionar Série</span>
            </button>
            <button
              onClick={() => setShowHistoryModal(true)}
              className="flex items-center gap-1 text-[#bbc9cf] hover:text-[#00d2ff] font-label-interactive text-body-sm active:scale-95 transition-colors text-[13px]"
            >
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
              <span>Histórico &amp; PRs</span>
            </button>
          </div>
        </div>

        {/* Motivational Delight SnackBar / Form Tip */}
        <div className="bg-[#161b29] rounded-xl p-3 flex items-center gap-3 shadow-sm border border-white/5">
          <div className="w-9 h-9 rounded-lg bg-[#b4c5ff]/15 text-[#b4c5ff] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-white font-bold text-[14px]">
              Mantenha a explosão
            </span>
            <span className="text-body-sm text-[#bbc9cf] text-[12px] leading-tight mt-0.5">
              {currentExercise.tip || 'Retraia as escápulas na descida e acelere no ponto de travamento.'}
            </span>
          </div>
        </div>

        {/* Next Upcoming Exercise Preview */}
        {nextExercise && (
          <div className="flex flex-col gap-2 pt-1">
            <span className="font-label-caps text-[10px] uppercase text-[#859399] px-1 font-semibold">
              Próximo da Sequência
            </span>
            <div
              onClick={() => setActiveExerciseIndex(activeExerciseIndex + 1)}
              className="bg-[#161b29] rounded-xl p-3.5 shadow-sm flex items-center justify-between hover:bg-[#1a1f2d] transition-all cursor-pointer border border-white/5 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#242a38] flex items-center justify-center text-[#00d2ff]">
                  <span className="material-symbols-outlined text-[24px]">fitness_center</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-caps text-[10px] uppercase text-[#b4c5ff] font-bold">
                    Exercício {activeExerciseIndex + 2} de {totalExercises}
                  </span>
                  <h3 className="font-headline-sm text-[15px] font-semibold text-white">
                    {nextExercise.name}
                  </h3>
                  <span className="text-body-sm text-[#bbc9cf] text-[12px]">
                    {nextExercise.targetSets} séries programadas • {nextExercise.targetReps}
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#242a38] flex items-center justify-center text-[#bbc9cf]">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            {/* Exercise 5 Mini Preview if available */}
            {subsequentExercise && (
              <div
                onClick={() => setActiveExerciseIndex(activeExerciseIndex + 2)}
                className="bg-[#080e1b]/80 rounded-xl py-2 px-3 flex items-center justify-between text-[#859399] border border-white/5 cursor-pointer hover:bg-[#161b29]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-label-caps text-[10px]">#{activeExerciseIndex + 3}</span>
                  <span className="font-body-md text-body-sm text-[#bbc9cf] text-[12px]">
                    {subsequentExercise.name}
                  </span>
                </div>
                <span className="font-label-caps text-[10px] text-[#859399]">
                  {subsequentExercise.targetSets} séries
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Sticky Bottom Interactive Dock (Ergonomic Thumb Anchor) */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-[#080e1b]/95 backdrop-blur-xl border-t border-white/5 shadow-[0_-8px_24px_rgba(0,0,0,0.6)] z-40">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <button
            onClick={() => onOpenPlateCalculator(activeSet.weight || 90)}
            className="flex-1 h-12 rounded-xl bg-[#242a38] hover:bg-[#2f3543] text-[#00d2ff] font-headline-sm text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-white/5"
          >
            <span className="material-symbols-outlined text-[20px]">calculate</span>
            <span>Calculadora Anilhas</span>
          </button>
          <button
            onClick={handleNextExercise}
            id="btn-next-exercise"
            className="flex-[1.5] h-12 rounded-xl bg-[#00d2ff] hover:bg-[#a5e7ff] text-[#003543] font-headline-sm text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-[#00d2ff]/25 active:scale-95 transition-all"
          >
            <span>
              {activeExerciseIndex < totalExercises - 1
                ? 'Próximo Exercício'
                : 'Concluir Treino'}
            </span>
            <span className="material-symbols-outlined text-[20px]">
              {activeExerciseIndex < totalExercises - 1 ? 'arrow_forward' : 'emoji_events'}
            </span>
          </button>
        </div>
      </div>

      {/* Exercise PRs and History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#161b29] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#69f6b9]">emoji_events</span>
                <div>
                  <h3 className="font-headline-sm text-white font-bold text-[16px]">
                    Histórico • {currentExercise.name}
                  </h3>
                  <span className="text-[11px] text-[#859399]">Recorde: {currentExercise.pr}</span>
                </div>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-lg bg-[#242a38] text-[#859399] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-2.5 overflow-y-auto">
              <div className="p-3 rounded-xl bg-[#1a1f2d] flex justify-between items-center border border-white/5">
                <div>
                  <span className="font-label-caps text-[10px] text-[#00d2ff] uppercase block">
                    17 Out 2024 (Último Treino)
                  </span>
                  <span className="font-headline-sm text-white text-[14px]">
                    4 séries • 80kg, 85kg, 90kg, 90kg
                  </span>
                </div>
                <span className="font-label-caps text-[#69f6b9] font-bold text-[12px]">RPE 8.5</span>
              </div>
              <div className="p-3 rounded-xl bg-[#1a1f2d] flex justify-between items-center border border-white/5">
                <div>
                  <span className="font-label-caps text-[10px] text-[#859399] uppercase block">
                    10 Out 2024
                  </span>
                  <span className="font-headline-sm text-white text-[14px]">
                    4 séries • 80kg, 82.5kg, 87.5kg, 87.5kg
                  </span>
                </div>
                <span className="font-label-caps text-[#bbc9cf] font-bold text-[12px]">RPE 8.0</span>
              </div>
              <div className="p-3 rounded-xl bg-[#1a1f2d] flex justify-between items-center border border-white/5">
                <div>
                  <span className="font-label-caps text-[10px] text-[#859399] uppercase block">
                    03 Out 2024
                  </span>
                  <span className="font-headline-sm text-white text-[14px]">
                    4 séries • 75kg, 80kg, 85kg, 85kg
                  </span>
                </div>
                <span className="font-label-caps text-[#bbc9cf] font-bold text-[12px]">RPE 7.5</span>
              </div>
            </div>

            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full h-11 rounded-xl bg-[#242a38] text-white font-headline-sm text-[13px] font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
