import { AthleteProfile, WorkoutRoutine, WorkoutSession } from '../types';

export const DEFAULT_ATHLETE_PROFILE: AthleteProfile = {
  name: 'Alison',
  email: 'alison@geovendas.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  badge: 'ATLETA',
  weightKg: 78.5,
  heightCm: 178,
  bodyFatPercent: 14.5,
  goal: 'Hipertrofia & Força',
  streakDays: 1,
  streakWeeks: 1,
  monthlyGoalPercent: 10,
  maxBenchPress: 90,
  maxSquat: 120,
  maxDeadlift: 150,
};

export const DEFAULT_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'treino-a',
    letter: 'Treino A',
    name: 'Peito & Tríceps',
    focus: 'Hipertrofia',
    durationMinutes: 50,
    exerciseCount: 4,
    setCount: 15,
    suggestedTarget: 'Foco em progressão de carga no supino',
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    exercises: [
      {
        id: 'ex-1',
        name: 'Supino Reto com Barra',
        muscleGroup: 'Peitoral Maior',
        targetSets: 4,
        targetReps: '8-10 reps',
        pr: '90 kg × 8 reps',
        badge: 'Principal',
        tip: 'Retraia as escápulas na descida e acelere no ponto de travamento.',
        sets: [
          { id: 's1-1', setNumber: 1, previous: '70kg × 10', weight: 70, reps: 10, completed: false },
          { id: 's1-2', setNumber: 2, previous: '75kg × 10', weight: 75, reps: 10, completed: false },
          { id: 's1-3', setNumber: 3, previous: '80kg × 8', weight: 80, reps: 8, completed: false, targetRpe: 8.5 },
          { id: 's1-4', setNumber: 4, previous: '80kg × 8', weight: 80, reps: 8, completed: false, targetRpe: 9.0 },
        ],
      },
      {
        id: 'ex-2',
        name: 'Supino Inclinado com Halteres',
        muscleGroup: 'Peitoral Superior',
        targetSets: 4,
        targetReps: '10-12 reps',
        pr: '28 kg × 10 reps',
        tip: 'Mantenha os cotovelos a 45 graus para proteger a articulação do ombro.',
        sets: [
          { id: 's2-1', setNumber: 1, previous: '24kg × 12', weight: 24, reps: 12, completed: false },
          { id: 's2-2', setNumber: 2, previous: '26kg × 10', weight: 26, reps: 10, completed: false },
          { id: 's2-3', setNumber: 3, previous: '26kg × 10', weight: 26, reps: 10, completed: false },
          { id: 's2-4', setNumber: 4, previous: '26kg × 10', weight: 26, reps: 10, completed: false },
        ],
      },
      {
        id: 'ex-3',
        name: 'Crossover na Polia Média',
        muscleGroup: 'Peitoral Isolamento',
        targetSets: 3,
        targetReps: '12-15 reps',
        pr: '25 kg × 12 reps',
        tip: 'Concentre no pico de contração no meio por 1 segundo a cada repetição.',
        sets: [
          { id: 's3-1', setNumber: 1, previous: '20kg × 15', weight: 20, reps: 15, completed: false },
          { id: 's3-2', setNumber: 2, previous: '22.5kg × 12', weight: 22.5, reps: 12, completed: false },
          { id: 's3-3', setNumber: 3, previous: '25kg × 12', weight: 25, reps: 12, completed: false },
        ],
      },
      {
        id: 'ex-4',
        name: 'Tríceps Corda na Polia',
        muscleGroup: 'Tríceps',
        targetSets: 4,
        targetReps: '12-15 reps',
        pr: '28 kg × 12 reps',
        badge: 'Drop-set final',
        tip: 'Abra a corda no final da extensão para ativação máxima.',
        sets: [
          { id: 's4-1', setNumber: 1, previous: '22kg × 15', weight: 22, reps: 15, completed: false },
          { id: 's4-2', setNumber: 2, previous: '25kg × 12', weight: 25, reps: 12, completed: false },
          { id: 's4-3', setNumber: 3, previous: '25kg × 12', weight: 25, reps: 12, completed: false },
          { id: 's4-4', setNumber: 4, previous: '28kg × 10', weight: 28, reps: 10, completed: false, isDropset: true },
        ],
      },
    ],
  },
  {
    id: 'treino-b',
    letter: 'Treino B',
    name: 'Costas & Bíceps',
    focus: 'Densidade & Tração',
    durationMinutes: 48,
    exerciseCount: 4,
    setCount: 15,
    suggestedTarget: 'Foco em puxadas completas e controle de escápula',
    heroImage: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80',
    exercises: [
      {
        id: 'ex-b1',
        name: 'Puxada Alta no Pulley',
        muscleGroup: 'Dorsal',
        targetSets: 4,
        targetReps: '10-12 reps',
        pr: '75 kg × 10 reps',
        badge: 'Principal',
        tip: 'Puxe direcionando os cotovelos aos quadris.',
        sets: [
          { id: 'sb1-1', setNumber: 1, previous: '60kg × 12', weight: 60, reps: 12, completed: false },
          { id: 'sb1-2', setNumber: 2, previous: '65kg × 10', weight: 65, reps: 10, completed: false },
          { id: 'sb1-3', setNumber: 3, previous: '70kg × 10', weight: 70, reps: 10, completed: false },
          { id: 'sb1-4', setNumber: 4, previous: '70kg × 8', weight: 70, reps: 8, completed: false },
        ],
      },
      {
        id: 'ex-b2',
        name: 'Remada Baixa com Triângulo',
        muscleGroup: 'Costas Médias',
        targetSets: 4,
        targetReps: '10-12 reps',
        pr: '70 kg × 10 reps',
        tip: 'Mantenha a coluna neutra e esmague as escápulas.',
        sets: [
          { id: 'sb2-1', setNumber: 1, previous: '55kg × 12', weight: 55, reps: 12, completed: false },
          { id: 'sb2-2', setNumber: 2, previous: '60kg × 10', weight: 60, reps: 10, completed: false },
          { id: 'sb2-3', setNumber: 3, previous: '65kg × 10', weight: 65, reps: 10, completed: false },
          { id: 'sb2-4', setNumber: 4, previous: '65kg × 8', weight: 65, reps: 8, completed: false },
        ],
      },
      {
        id: 'ex-b3',
        name: 'Rosca Direta com Barra W',
        muscleGroup: 'Bíceps',
        targetSets: 4,
        targetReps: '10-12 reps',
        pr: '32 kg × 10 reps',
        tip: 'Cotovelos firmes ao lado do tronco.',
        sets: [
          { id: 'sb3-1', setNumber: 1, previous: '24kg × 12', weight: 24, reps: 12, completed: false },
          { id: 'sb3-2', setNumber: 2, previous: '28kg × 10', weight: 28, reps: 10, completed: false },
          { id: 'sb3-3', setNumber: 3, previous: '30kg × 10', weight: 30, reps: 10, completed: false },
          { id: 'sb3-4', setNumber: 4, previous: '30kg × 8', weight: 30, reps: 8, completed: false },
        ],
      },
      {
        id: 'ex-b4',
        name: 'Rosca Martelo com Halteres',
        muscleGroup: 'Braquial & Antebraço',
        targetSets: 3,
        targetReps: '12 reps',
        pr: '16 kg × 12 reps',
        tip: 'Pegada neutra constante em toda amplitude.',
        sets: [
          { id: 'sb4-1', setNumber: 1, previous: '12kg × 12', weight: 12, reps: 12, completed: false },
          { id: 'sb4-2', setNumber: 2, previous: '14kg × 12', weight: 14, reps: 12, completed: false },
          { id: 'sb4-3', setNumber: 3, previous: '16kg × 10', weight: 16, reps: 10, completed: false },
        ],
      },
    ],
  },
  {
    id: 'treino-c',
    letter: 'Treino C',
    name: 'Pernas & Ombros',
    focus: 'Força & Simetria',
    durationMinutes: 55,
    exerciseCount: 4,
    setCount: 16,
    suggestedTarget: 'Amplitude completa no agachamento e controle na descida',
    heroImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    exercises: [
      {
        id: 'ex-c1',
        name: 'Agachamento Livre com Barra',
        muscleGroup: 'Quadríceps & Glúteos',
        targetSets: 4,
        targetReps: '8-10 reps',
        pr: '110 kg × 8 reps',
        badge: 'Principal',
        tip: 'Mantenha a pressão no meio dos pés e peito erguido.',
        sets: [
          { id: 'sc1-1', setNumber: 1, previous: '80kg × 10', weight: 80, reps: 10, completed: false },
          { id: 'sc1-2', setNumber: 2, previous: '90kg × 8', weight: 90, reps: 8, completed: false },
          { id: 'sc1-3', setNumber: 3, previous: '100kg × 8', weight: 100, reps: 8, completed: false },
          { id: 'sc1-4', setNumber: 4, previous: '100kg × 6', weight: 100, reps: 6, completed: false },
        ],
      },
      {
        id: 'ex-c2',
        name: 'Leg Press 45°',
        muscleGroup: 'Pernas Geral',
        targetSets: 4,
        targetReps: '10-12 reps',
        pr: '240 kg × 10 reps',
        tip: 'Pés na largura dos ombros, não bloqueie os joelhos.',
        sets: [
          { id: 'sc2-1', setNumber: 1, previous: '180kg × 12', weight: 180, reps: 12, completed: false },
          { id: 'sc2-2', setNumber: 2, previous: '200kg × 10', weight: 200, reps: 10, completed: false },
          { id: 'sc2-3', setNumber: 3, previous: '220kg × 10', weight: 220, reps: 10, completed: false },
          { id: 'sc2-4', setNumber: 4, previous: '220kg × 10', weight: 220, reps: 10, completed: false },
        ],
      },
      {
        id: 'ex-c3',
        name: 'Desenvolvimento Militar com Halteres',
        muscleGroup: 'Deltóide Anterior/Médio',
        targetSets: 4,
        targetReps: '10-12 reps',
        pr: '22 kg × 10 reps',
        tip: 'Mantenha o core firme sem hiperestender a lombar.',
        sets: [
          { id: 'sc3-1', setNumber: 1, previous: '16kg × 12', weight: 16, reps: 12, completed: false },
          { id: 'sc3-2', setNumber: 2, previous: '18kg × 10', weight: 18, reps: 10, completed: false },
          { id: 'sc3-3', setNumber: 3, previous: '20kg × 10', weight: 20, reps: 10, completed: false },
          { id: 'sc3-4', setNumber: 4, previous: '20kg × 8', weight: 20, reps: 8, completed: false },
        ],
      },
      {
        id: 'ex-c4',
        name: 'Elevação Lateral com Halteres',
        muscleGroup: 'Deltóide Lateral',
        targetSets: 4,
        targetReps: '12-15 reps',
        pr: '12 kg × 12 reps',
        tip: 'Eleve até a altura dos ombros com controle na descida.',
        sets: [
          { id: 'sc4-1', setNumber: 1, previous: '10kg × 15', weight: 10, reps: 15, completed: false },
          { id: 'sc4-2', setNumber: 2, previous: '10kg × 12', weight: 10, reps: 12, completed: false },
          { id: 'sc4-3', setNumber: 3, previous: '12kg × 12', weight: 12, reps: 12, completed: false },
          { id: 'sc4-4', setNumber: 4, previous: '12kg × 10', weight: 12, reps: 10, completed: false },
        ],
      },
    ],
  },
];

const STORAGE_KEYS = {
  PROFILE: 'pulsefit_athlete_profile_v1',
  ROUTINES: 'pulsefit_routines_v1',
  ACTIVE_ROUTINE: 'pulsefit_active_routine_id_v1',
  SESSIONS: 'pulsefit_sessions_history_v1',
};

export function loadAthleteProfile(): AthleteProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Erro ao ler perfil do localStorage', e);
  }
  return DEFAULT_ATHLETE_PROFILE;
}

export function saveAthleteProfile(profile: AthleteProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.warn('Erro ao salvar perfil no localStorage', e);
  }
}

export function loadRoutines(): WorkoutRoutine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Erro ao ler rotinas do localStorage', e);
  }
  return DEFAULT_ROUTINES;
}

export function saveRoutines(routines: WorkoutRoutine[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));
  } catch (e) {
    console.warn('Erro ao salvar rotinas no localStorage', e);
  }
}

export function loadActiveRoutineId(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_ROUTINE);
    if (raw) return raw;
  } catch (e) {
    console.warn('Erro ao ler treino ativo', e);
  }
  return 'treino-a';
}

export function saveActiveRoutineId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROUTINE, id);
  } catch (e) {
    console.warn('Erro ao salvar treino ativo', e);
  }
}

export function loadSessionsHistory(): WorkoutSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Erro ao ler histórico', e);
  }
  // Start with clean initial history
  return [];
}

export function saveSessionsHistory(sessions: WorkoutSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (e) {
    console.warn('Erro ao salvar histórico', e);
  }
}
