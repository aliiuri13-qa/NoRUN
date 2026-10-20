import React, { useState, useEffect } from 'react';
import { WorkoutRoutine, Exercise, ExerciseSet } from '../types';

interface WorkoutFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  routineToEdit?: WorkoutRoutine | null;
  onSaveRoutine: (routine: WorkoutRoutine) => void;
}

const MUSCLE_GROUPS = [
  'Peitoral Maior',
  'Peitoral Superior',
  'Peitoral Isolamento',
  'Dorsal',
  'Costas Médias',
  'Trapézio',
  'Quadríceps',
  'Posterior de Coxa',
  'Glúteos',
  'Panturrilha',
  'Deltóide Anterior/Médio',
  'Deltóide Lateral',
  'Deltóide Posterior',
  'Bíceps',
  'Tríceps',
  'Abdômen & Core',
];

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
];

export const WorkoutFormModal: React.FC<WorkoutFormModalProps> = ({
  isOpen,
  onClose,
  routineToEdit,
  onSaveRoutine,
}) => {
  const [letter, setLetter] = useState('Treino A');
  const [name, setName] = useState('');
  const [focus, setFocus] = useState('Hipertrofia');
  const [durationMinutes, setDurationMinutes] = useState(50);
  const [suggestedTarget, setSuggestedTarget] = useState('Foco em execução controlada e progressão');
  const [heroImage, setHeroImage] = useState(PRESET_COVERS[0]);
  const [exercises, setExercises] = useState<
    {
      id: string;
      name: string;
      muscleGroup: string;
      targetSets: number;
      targetReps: string;
      weight: number;
      badge: string;
      tip: string;
    }[]
  >([]);

  useEffect(() => {
    if (routineToEdit) {
      setLetter(routineToEdit.letter);
      setName(routineToEdit.name);
      setFocus(routineToEdit.focus);
      setDurationMinutes(routineToEdit.durationMinutes);
      setSuggestedTarget(routineToEdit.suggestedTarget);
      setHeroImage(routineToEdit.heroImage || PRESET_COVERS[0]);
      setExercises(
        routineToEdit.exercises.map((ex) => ({
          id: ex.id,
          name: ex.name,
          muscleGroup: ex.muscleGroup,
          targetSets: ex.targetSets,
          targetReps: ex.targetReps,
          weight: ex.sets[0]?.weight || 20,
          badge: ex.badge || '',
          tip: ex.tip || '',
        }))
      );
    } else {
      // Default new routine template with 2 starter exercises
      setLetter('Treino Novo');
      setName('Músculos Alvo');
      setFocus('Hipertrofia');
      setDurationMinutes(45);
      setSuggestedTarget('Foco em sobrecarga progressiva');
      setHeroImage(PRESET_COVERS[0]);
      setExercises([
        {
          id: `ex-new-1-${Date.now()}`,
          name: 'Exercício 1',
          muscleGroup: 'Peitoral Maior',
          targetSets: 4,
          targetReps: '8-10 reps',
          weight: 40,
          badge: 'Principal',
          tip: 'Movimento cadenciado com boa amplitude.',
        },
        {
          id: `ex-new-2-${Date.now()}`,
          name: 'Exercício 2',
          muscleGroup: 'Tríceps',
          targetSets: 3,
          targetReps: '10-12 reps',
          weight: 20,
          badge: '',
          tip: '',
        },
      ]);
    }
  }, [routineToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: `ex-custom-${Date.now()}`,
        name: `Novo Exercício ${exercises.length + 1}`,
        muscleGroup: 'Peitoral Maior',
        targetSets: 3,
        targetReps: '10-12 reps',
        weight: 20,
        badge: '',
        tip: '',
      },
    ]);
  };

  const handleRemoveExercise = (index: number) => {
    if (exercises.length <= 1) {
      alert('O treino deve conter pelo menos 1 exercício.');
      return;
    }
    setExercises(exercises.filter((_, idx) => idx !== index));
  };

  const handleUpdateExercise = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Informe o nome do treino.');
      return;
    }
    if (exercises.length === 0) {
      alert('Adicione pelo menos 1 exercício ao treino.');
      return;
    }

    // Build complete WorkoutRoutine structure
    const totalSets = exercises.reduce((acc, curr) => acc + (curr.targetSets || 3), 0);

    const builtExercises: Exercise[] = exercises.map((ex, exIdx) => {
      const generatedSets: ExerciseSet[] = Array.from({ length: ex.targetSets || 3 }).map((_, sIdx) => ({
        id: `s-${ex.id}-${sIdx + 1}`,
        setNumber: sIdx + 1,
        previous: `${ex.weight}kg × ${ex.targetReps.split('-')[0] || 10}`,
        weight: ex.weight,
        reps: parseInt(ex.targetReps.split('-')[0]) || 10,
        completed: false,
        targetRpe: 8.5,
      }));

      return {
        id: ex.id || `ex-${exIdx + 1}`,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        targetSets: ex.targetSets,
        targetReps: ex.targetReps,
        pr: `${ex.weight} kg × ${ex.targetReps}`,
        badge: ex.badge || undefined,
        tip: ex.tip || undefined,
        sets: generatedSets,
      };
    });

    const newRoutine: WorkoutRoutine = {
      id: routineToEdit ? routineToEdit.id : `treino-custom-${Date.now()}`,
      letter: letter.trim() || 'Treino',
      name: name.trim(),
      focus: focus.trim() || 'Geral',
      durationMinutes: durationMinutes || 45,
      exerciseCount: builtExercises.length,
      setCount: totalSets,
      suggestedTarget: suggestedTarget.trim() || 'Boa execução e constância',
      heroImage,
      exercises: builtExercises,
    };

    onSaveRoutine(newRoutine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#161b29] border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#00d2ff]/15 text-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">fitness_center</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-white font-bold text-[17px]">
                {routineToEdit ? 'Editar Treino' : 'Cadastrar Novo Treino'}
              </h3>
              <p className="font-body-sm text-[#859399]">Configure os exercícios e metas da rotina</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#242a38] text-[#859399] hover:text-white flex items-center justify-center active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto py-4 space-y-4">
          {/* General Routine Info */}
          <div className="p-3.5 rounded-xl bg-[#1a1f2d] border border-white/5 space-y-3">
            <span className="font-label-caps text-[10px] text-[#00d2ff] uppercase font-bold tracking-wider">
              Identificação do Treino
            </span>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">Letra / Sigla</label>
                <input
                  type="text"
                  required
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  placeholder="Treino A"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-2.5 text-[13px] font-bold text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="space-y-1 col-span-2">
                <label className="text-[11px] text-[#bbc9cf]">Nome do Treino (Músculos)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Peito & Tríceps"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-3 text-[13px] font-bold text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">Foco</label>
                <input
                  type="text"
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  placeholder="Ex: Hipertrofia"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-3 text-[13px] text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#bbc9cf]">Duração Média (minutos)</label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 45)}
                  placeholder="50"
                  className="w-full h-10 rounded-lg bg-[#0d1320] px-3 text-[13px] text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#bbc9cf]">Meta Sugerida / Observação</label>
              <input
                type="text"
                value={suggestedTarget}
                onChange={(e) => setSuggestedTarget(e.target.value)}
                placeholder="Ex: Carga-alvo sugerida: +2.5kg no Supino"
                className="w-full h-10 rounded-lg bg-[#0d1320] px-3 text-[13px] text-white border border-white/10 focus:outline-none focus:border-[#00d2ff]"
              />
            </div>

            {/* Cover Images Preset */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] text-[#bbc9cf]">Foto de Capa</label>
              <div className="flex gap-2">
                {PRESET_COVERS.map((cov, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setHeroImage(cov)}
                    className={`h-11 flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                      heroImage === cov ? 'border-[#00d2ff] scale-105' : 'border-white/10 opacity-60'
                    }`}
                  >
                    <img src={cov} alt="Capa" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exercises Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-[11px] text-[#00d2ff] uppercase font-bold tracking-wider">
                Exercícios do Treino ({exercises.length})
              </span>
              <button
                type="button"
                onClick={handleAddExercise}
                className="flex items-center gap-1 text-[12px] text-[#00d2ff] hover:text-white font-bold bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 px-2.5 py-1 rounded-lg border border-[#00d2ff]/30 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Adicionar Exercício</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="p-3 rounded-xl bg-[#1a1f2d] border border-white/5 space-y-2 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-6 h-6 rounded-md bg-[#242a38] text-[#00d2ff] text-[11px] font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        required
                        value={exercise.name}
                        onChange={(e) => handleUpdateExercise(index, 'name', e.target.value)}
                        placeholder="Nome do Exercício"
                        className="w-full h-8 rounded bg-[#0d1320] px-2 text-[13px] font-semibold text-white border border-white/10 focus:border-[#00d2ff]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(index)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center active:scale-95 transition-all"
                      title="Excluir exercício"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-2 space-y-0.5">
                      <label className="text-[10px] text-[#859399]">Grupo Muscular</label>
                      <select
                        value={exercise.muscleGroup}
                        onChange={(e) => handleUpdateExercise(index, 'muscleGroup', e.target.value)}
                        className="w-full h-8 rounded bg-[#0d1320] px-1 text-[11px] text-white border border-white/10"
                      >
                        {MUSCLE_GROUPS.map((mg) => (
                          <option key={mg} value={mg} className="bg-[#161b29]">
                            {mg}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-0.5">
                      <label className="text-[10px] text-[#859399]">Séries</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={exercise.targetSets}
                        onChange={(e) =>
                          handleUpdateExercise(index, 'targetSets', parseInt(e.target.value) || 3)
                        }
                        className="w-full h-8 rounded bg-[#0d1320] px-1 text-center text-[12px] font-bold text-white border border-white/10"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <label className="text-[10px] text-[#859399]">Reps</label>
                      <input
                        type="text"
                        value={exercise.targetReps}
                        onChange={(e) => handleUpdateExercise(index, 'targetReps', e.target.value)}
                        placeholder="8-10 reps"
                        className="w-full h-8 rounded bg-[#0d1320] px-1 text-center text-[11px] text-white border border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-0.5">
                      <label className="text-[10px] text-[#859399]">Carga Alvo (kg)</label>
                      <input
                        type="number"
                        value={exercise.weight}
                        onChange={(e) =>
                          handleUpdateExercise(index, 'weight', parseFloat(e.target.value) || 0)
                        }
                        className="w-full h-8 rounded bg-[#0d1320] px-1 text-center text-[12px] font-bold text-[#00d2ff] border border-white/10"
                      />
                    </div>

                    <div className="space-y-0.5 col-span-2">
                      <label className="text-[10px] text-[#859399]">Tag Especial (opcional)</label>
                      <input
                        type="text"
                        value={exercise.badge}
                        onChange={(e) => handleUpdateExercise(index, 'badge', e.target.value)}
                        placeholder="Ex: Principal, Drop-set"
                        className="w-full h-8 rounded bg-[#0d1320] px-2 text-[11px] text-white border border-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[10px] text-[#859399]">Dica de Execução (opcional)</label>
                    <input
                      type="text"
                      value={exercise.tip}
                      onChange={(e) => handleUpdateExercise(index, 'tip', e.target.value)}
                      placeholder="Ex: Retraia as escápulas e controle a descida..."
                      className="w-full h-8 rounded bg-[#0d1320] px-2 text-[11px] text-[#bbc9cf] border border-white/10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl bg-[#242a38] hover:bg-[#2f3543] text-[#bbc9cf] font-headline-sm text-[14px] font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-[1.5] h-12 rounded-xl bg-[#00d2ff] hover:bg-[#a5e7ff] text-[#003543] font-headline-sm text-[14px] font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">save</span>
              <span>{routineToEdit ? 'Atualizar Treino' : 'Salvar Novo Treino'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
