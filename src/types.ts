export type TabType = 'hoje' | 'treino' | 'resultados' | 'historico';

export interface ExerciseSet {
  id: string;
  setNumber: number;
  previous: string;
  weight: number;
  reps: number;
  completed: boolean;
  isWarmup?: boolean;
  isDropset?: boolean;
  targetRpe?: number;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: string;
  pr: string;
  badge?: string;
  tip?: string;
  sets: ExerciseSet[];
  maxWeight?: number;
}

export interface WorkoutRoutine {
  id: string;
  letter: string;
  name: string;
  focus: string;
  durationMinutes: number;
  exerciseCount: number;
  setCount: number;
  suggestedTarget: string;
  heroImage: string;
  exercises: Exercise[];
}

export interface AthleteProfile {
  name: string;
  email: string;
  avatar: string;
  badge: string;
  weightKg: number;
  heightCm: number;
  bodyFatPercent?: number;
  goal: string;
  streakDays: number;
  streakWeeks: number;
  monthlyGoalPercent: number;
  creatineStreak?: number;
  lastCreatineDate?: string;
  maxBenchPress?: number;
  maxSquat?: number;
  maxDeadlift?: number;
}

export interface CreatineCheckin {
  date: string;
  taken: boolean;
  dosageGrams: number;
  timeStr?: string;
}

export interface WorkoutSession {
  id: string;
  dateStr: string;
  dateFormatted: string;
  dayBadge?: string;
  statusBadge?: string;
  statusBadgeType?: 'pr' | 'intensity' | 'done';
  title: string;
  subtitle: string;
  durationMins: number;
  totalWeightKg: number;
  totalSets: number;
  rpe?: number;
  notes?: string;
  calories?: number;
  category: 'Peito' | 'Costas' | 'Pernas' | 'Ombros' | 'Braços' | 'Geral';
  prs?: { title: string; subtitle: string; weight: string; change: string }[];
  completedExercises?: {
    num: string;
    name: string;
    detail: string;
    weight: string;
    weightBadge?: string;
  }[];
}
