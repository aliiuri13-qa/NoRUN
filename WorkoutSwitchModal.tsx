import React from 'react';
import { WorkoutRoutine } from '../types';

interface WorkoutSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  routines: WorkoutRoutine[];
  currentRoutineId: string;
  onSelectRoutine: (routineId: string) => void;
  onOpenCreateRoutine: () => void;
  onOpenEditRoutine: (routine: WorkoutRoutine) => void;
  onDeleteRoutine: (routineId: string) => void;
}

export const WorkoutSwitchModal: React.FC<WorkoutSwitchModalProps> = ({
  isOpen,
  onClose,
  routines,
  currentRoutineId,
  onSelectRoutine,
  onOpenCreateRoutine,
  onOpenEditRoutine,
  onDeleteRoutine,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#161b29] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#0053db]/30 text-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">fitness_center</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-white font-bold text-[17px]">
                Gestão de Treinos
              </h3>
              <p className="font-body-sm text-[#859399]">Selecione o treino do dia ou cadastre novos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#242a38] text-[#859399] hover:text-white flex items-center justify-center active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Top Action: Create New Workout */}
        <div className="pt-3 pb-1">
          <button
            onClick={() => {
              onClose();
              onOpenCreateRoutine();
            }}
            className="w-full h-11 rounded-xl bg-[#00d2ff]/15 hover:bg-[#00d2ff]/25 text-[#00d2ff] font-headline-sm text-[13px] font-bold flex items-center justify-center gap-2 border border-[#00d2ff]/30 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Cadastrar Novo Treino</span>
          </button>
        </div>

        {/* Routine Cards List */}
        <div className="overflow-y-auto py-3 space-y-3">
          {routines.map((routine) => {
            const isSelected = routine.id === currentRoutineId;
            return (
              <div
                key={routine.id}
                className={`p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-[#1a1f2d] border-[#00d2ff] shadow-lg shadow-[#00d2ff]/10'
                    : 'bg-[#1a1f2d]/60 border-white/5 hover:border-white/20 hover:bg-[#1a1f2d]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-[#00d2ff] text-[#003543] font-label-caps text-[10px] font-bold rounded-bl-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#003543] animate-pulse" />
                    TREINO DO DIA
                  </div>
                )}

                <div className="flex items-start justify-between pr-24">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#00d2ff] uppercase font-bold tracking-wider">
                      {routine.letter}
                    </span>
                    <h4 className="font-headline-sm text-white text-[16px] font-bold mt-0.5">
                      {routine.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-body-sm text-[#bbc9cf] text-[12px]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#00d2ff] text-[14px]">schedule</span>
                    {routine.durationMinutes} min
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#00d2ff] text-[14px]">exercise</span>
                    {routine.exerciseCount} exercícios
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#00d2ff] text-[14px]">repeat</span>
                    {routine.setCount} séries
                  </span>
                </div>

                {routine.suggestedTarget && (
                  <p className="font-body-sm text-[#859399] text-[11px] italic truncate">
                    {routine.suggestedTarget}
                  </p>
                )}

                {/* Exercises quick preview chips */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {routine.exercises.slice(0, 3).map((ex, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#0d1320] text-[#bbc9cf] text-[10px] font-body-sm truncate max-w-[140px]"
                    >
                      {ex.name}
                    </span>
                  ))}
                  {routine.exercises.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded bg-[#0d1320] text-[#00d2ff] text-[10px] font-label-caps">
                      +{routine.exercises.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenEditRoutine(routine);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#242a38] hover:bg-[#2f3543] text-[#bbc9cf] hover:text-white font-label-interactive text-[11px] flex items-center gap-1 transition-colors"
                      title="Editar Exercícios"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      <span>Editar</span>
                    </button>
                    {routines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Tem certeza que deseja excluir o treino "${routine.letter} - ${routine.name}"?`)) {
                            onDeleteRoutine(routine.id);
                          }
                        }}
                        className="px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-label-interactive text-[11px] flex items-center gap-0.5 transition-colors"
                        title="Excluir Treino"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                      </button>
                    )}
                  </div>

                  {!isSelected ? (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectRoutine(routine.id);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-[#0053db] hover:bg-[#00d2ff] text-white hover:text-[#003543] font-headline-sm text-[12px] font-bold flex items-center gap-1 transition-all active:scale-95 shadow-sm"
                    >
                      <span>Treinar Hoje</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-label-caps text-[#69f6b9] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                      Ativo para hoje
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
