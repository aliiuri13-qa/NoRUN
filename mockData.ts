import { WorkoutRoutine, WorkoutSession } from '../types';

export const initialRoutines: WorkoutRoutine[] = [
  {
    id: 'treino-a',
    letter: 'Treino A',
    name: 'Peito & Tríceps',
    focus: 'Foco em Hipertrofia',
    durationMinutes: 50,
    exerciseCount: 5,
    setCount: 18,
    suggestedTarget: 'Carga-alvo sugerida: +2.5kg no Supino',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB14-7ZBe1J-iSnsCT09f0-XmzlcsaEqrTAzpe4YY_smHAlaVtA6rTcCO6sWOmPTjUbaU05iFGNPWy5FEVmXezX8JA5uMvo6mIs9nBpTOePumFhqNWwKR6WFx9wcBz4HDH2nGdgziea_tvdbtQbaif3Jq0OUGhDIqJqZOrXCOuNV5JaBauWQ7-WfHHeJKlA5_y4HzgZOJI6VDUg_XEy5I0qv0zpi58mykNpsdVMBzG-SaT96dQxyKtcA',
    exercises: [
      {
        id: 'ex-1',
        name: 'Supino Reto com Barra',
        muscleGroup: 'Peitoral Maior',
        targetSets: 4,
        targetReps: '8-10 reps',
        pr: '100 kg × 6 reps',
        badge: 'Principal',
        tip: 'Retraia as escápulas na descida e acelere no ponto de travamento.',
        sets: [
          { id: 's1-1', setNumber: 1, previous: '80kg × 10', weight: 80, reps: 10, completed: true },
          { id: 's1-2', setNumber: 2, previous: '85kg × 10', weight: 85, reps: 10, completed: true },
          { id: 's1-3', setNumber: 3, previous: '90kg × 8', weight: 90, reps: 8, completed: false, targetRpe: 8.5 },
          { id: 's1-4', setNumber: 4, previous: '90kg × 8', weight: 90, reps: 8, completed: false, targetRpe: 9.0 }
        ]
      },
      {
        id: 'ex-2',
        name: 'Supino Inclinado c/ Halteres',
        muscleGroup: 'Peitoral Superior',
        targetSets: 3,
        targetReps: '10-12 reps',
        pr: '34 kg (cada lado) × 8 reps',
        tip: 'Mantenha os cotovelos a 45 graus para proteger a articulação do ombro.',
        sets: [
          { id: 's2-1', setNumber: 1, previous: '26kg × 12', weight: 28, reps: 12, completed: false },
          { id: 's2-2', setNumber: 2, previous: '28kg × 10', weight: 28, reps: 10, completed: false },
          { id: 's2-3', setNumber: 3, previous: '28kg × 10', weight: 28, reps: 10, completed: false }
        ]
      },
      {
        id: 'ex-3',
        name: 'Crossover Polia Média',
        muscleGroup: 'Peitoral Isolamento',
        targetSets: 3,
        targetReps: '12-15 reps',
        pr: '30 kg cabos × 12 reps',
        tip: 'Concentre no pico de contração no meio por 1 segundo a cada repetição.',
        sets: [
          { id: 's3-1', setNumber: 1, previous: '22.5kg × 15', weight: 25, reps: 15, completed: false },
          { id: 's3-2', setNumber: 2, previous: '25kg × 12', weight: 25, reps: 12, completed: false },
          { id: 's3-3', setNumber: 3, previous: '25kg × 12', weight: 25, reps: 12, completed: false }
        ]
      },
      {
        id: 'ex-4',
        name: 'Tríceps Testa Barra W',
        muscleGroup: 'Tríceps Braquial',
        targetSets: 4,
        targetReps: '10-12 reps',
        pr: '38 kg × 10 reps',
        tip: 'Fixe os cotovelos no mesmo eixo sem abrir excessivamente os braços.',
        sets: [
          { id: 's4-1', setNumber: 1, previous: '30kg × 12', weight: 32, reps: 12, completed: false },
          { id: 's4-2', setNumber: 2, previous: '32kg × 10', weight: 34, reps: 10, completed: false },
          { id: 's4-3', setNumber: 3, previous: '34kg × 10', weight: 34, reps: 10, completed: false },
          { id: 's4-4', setNumber: 4, previous: '34kg × 8', weight: 34, reps: 8, completed: false }
        ]
      },
      {
        id: 'ex-5',
        name: 'Tríceps Corda na Polia',
        muscleGroup: 'Tríceps Cabeça Lateral',
        targetSets: 4,
        targetReps: '12-15 reps',
        pr: '32 kg placa × 12 reps',
        badge: 'Drop-set final',
        tip: 'Abra a corda no final da extensão para ativação máxima da cabeça lateral.',
        sets: [
          { id: 's5-1', setNumber: 1, previous: '25kg × 15', weight: 25, reps: 15, completed: false },
          { id: 's5-2', setNumber: 2, previous: '28kg × 12', weight: 28, reps: 12, completed: false },
          { id: 's5-3', setNumber: 3, previous: '28kg × 12', weight: 28, reps: 12, completed: false },
          { id: 's5-4', setNumber: 4, previous: '28kg × 10', weight: 28, reps: 10, completed: false, isDropset: true }
        ]
      }
    ]
  },
  {
    id: 'treino-b',
    letter: 'Treino B',
    name: 'Costas & Bíceps',
    focus: 'Foco em Densidade & Tração',
    durationMinutes: 48,
    exerciseCount: 5,
    setCount: 16,
    suggestedTarget: 'Carga-alvo sugerida: +2.5kg na Remada Curvada',
    heroImage: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80',
    exercises: [
      {
        id: 'ex-b1',
        name: 'Puxada Alta com Barra Triângulo',
        muscleGroup: 'Dorsal e Redondo Maior',
        targetSets: 4,
        targetReps: '10-12 reps',
        pr: '85 kg × 8 reps',
        badge: 'Principal',
        tip: 'Inicie o movimento puxando com as costas e não com os braços.',
        sets: [
          { id: 'sb1-1', setNumber: 1, previous: '70kg × 12', weight: 70, reps: 12, completed: false },
          { id: 'sb1-2', setNumber: 2, previous: '75kg × 10', weight: 75, reps: 10, completed: false },
          { id: 'sb1-3', setNumber: 3, previous: '80kg × 8', weight: 80, reps: 8, completed: false },
          { id: 'sb1-4', setNumber: 4, previous: '80kg × 8', weight: 80, reps: 8, completed: false }
        ]
      },
      {
        id: 'ex-b2',
        name: 'Remada Baixa Polia',
        muscleGroup: 'Costas Médias',
        targetSets: 3,
        targetReps: '10-12 reps',
        pr: '75 kg × 10 reps',
        tip: 'Segure a contração por 1 segundo junto ao abdômen.',
        sets: [
          { id: 'sb2-1', setNumber: 1, previous: '60kg × 12', weight: 65, reps: 12, completed: false },
          { id: 'sb2-2', setNumber: 2, previous: '65kg × 10', weight: 70, reps: 10, completed: false },
          { id: 'sb2-3', setNumber: 3, previous: '70kg × 8', weight: 70, reps: 8, completed: false }
        ]
      },
      {
        id: 'ex-b3',
        name: 'Rosca Scott com Barra W',
        muscleGroup: 'Bíceps Braquial',
        targetSets: 3,
        targetReps: '10-12 reps',
        pr: '36 kg × 8 reps',
        tip: 'Não estenda totalmente no final para manter a tensão constante.',
        sets: [
          { id: 'sb3-1', setNumber: 1, previous: '28kg × 12', weight: 30, reps: 12, completed: false },
          { id: 'sb3-2', setNumber: 2, previous: '32kg × 10', weight: 32, reps: 10, completed: false },
          { id: 'sb3-3', setNumber: 3, previous: '34kg × 8', weight: 34, reps: 8, completed: false }
        ]
      }
    ]
  },
  {
    id: 'treino-c',
    letter: 'Treino C',
    name: 'Pernas & Abdômen',
    focus: 'Foco em Força Inferior',
    durationMinutes: 62,
    exerciseCount: 6,
    setCount: 20,
    suggestedTarget: 'Carga-alvo sugerida: +5kg no Agachamento Livre',
    heroImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    exercises: [
      {
        id: 'ex-c1',
        name: 'Agachamento Livre com Barra',
        muscleGroup: 'Quadríceps & Glúteos',
        targetSets: 4,
        targetReps: '8-10 reps',
        pr: '140 kg × 6 reps',
        badge: 'Principal',
        tip: 'Mantenha a pressão no meio dos pés e peito erguido.',
        sets: [
          { id: 'sc1-1', setNumber: 1, previous: '100kg × 10', weight: 110, reps: 10, completed: false },
          { id: 'sc1-2', setNumber: 2, previous: '120kg × 8', weight: 125, reps: 8, completed: false },
          { id: 'sc1-3', setNumber: 3, previous: '130kg × 6', weight: 135, reps: 6, completed: false },
          { id: 'sc1-4', setNumber: 4, previous: '135kg × 6', weight: 140, reps: 6, completed: false }
        ]
      }
    ]
  }
];

export const initialSessionsHistory: WorkoutSession[] = [
  {
    id: 'sess-today',
    dateStr: '2024-10-24',
    dateFormatted: 'HOJE • 08:30',
    dayBadge: 'HOJE',
    statusBadge: '1 PR BATIDO',
    statusBadgeType: 'pr',
    title: 'Peito & Tríceps',
    subtitle: 'Supino Reto + Paralelas + Crucifixo',
    durationMins: 52,
    totalWeightKg: 12840,
    totalSets: 18,
    category: 'Peito',
    rpe: 8.5,
    notes: 'Supino Reto subiu muito consistente hoje com 95kg. Ombros saudáveis sem dor. Tríceps no pump máximo.',
    calories: 410,
    prs: [
      {
        title: 'Supino Reto Barra',
        subtitle: 'Novo Recorde Pessoal',
        weight: '95 kg',
        change: '+5 kg PR'
      },
      {
        title: 'Fogo no Treino',
        subtitle: 'Consistência Semanal',
        weight: '4º Dia',
        change: 'Sequência de 18 dias'
      }
    ],
    completedExercises: [
      { num: '01', name: 'Supino Reto Barra', detail: '4 séries completadas', weight: '95 kg', weightBadge: 'PICO MAX' },
      { num: '02', name: 'Supino Inclinado Halteres', detail: '3 séries completadas', weight: '32 kg', weightBadge: 'CADA LADO' },
      { num: '03', name: 'Crossover Polia Média', detail: '3 séries completadas', weight: '25 kg', weightBadge: 'CABOS' },
      { num: '04', name: 'Tríceps Testa Barra W', detail: '4 séries completadas', weight: '34 kg', weightBadge: 'TOTAL' },
      { num: '05', name: 'Tríceps Corda Polia Alta', detail: '4 séries completadas', weight: '28 kg', weightBadge: 'PLACA' }
    ]
  },
  {
    id: 'sess-yesterday',
    dateStr: '2024-10-23',
    dateFormatted: 'ONTEM • 19:15',
    dayBadge: 'ONTEM',
    statusBadge: 'CONCLUÍDO',
    statusBadgeType: 'done',
    title: 'Costas & Bíceps',
    subtitle: 'Puxada Alta + Remada Baixa + Scott',
    durationMins: 48,
    totalWeightKg: 14100,
    totalSets: 16,
    category: 'Costas',
    rpe: 8.0,
    notes: 'Ótima pegada no triângulo. Bíceps respondeu muito bem com drop-set no Scott.',
    calories: 380,
    completedExercises: [
      { num: '01', name: 'Puxada Alta Triângulo', detail: '4 séries completadas', weight: '80 kg', weightBadge: 'PICO' },
      { num: '02', name: 'Remada Baixa Cabo', detail: '4 séries completadas', weight: '70 kg', weightBadge: 'CARGA' },
      { num: '03', name: 'Rosca Scott Barra W', detail: '4 séries completadas', weight: '34 kg', weightBadge: 'TOTAL' },
      { num: '04', name: 'Rosca Martelo Halteres', detail: '4 séries completadas', weight: '18 kg', weightBadge: 'CADA LADO' }
    ]
  },
  {
    id: 'sess-monday',
    dateStr: '2024-10-21',
    dateFormatted: 'SEGUNDA • 07:05',
    dayBadge: 'SEGUNDA',
    statusBadge: 'ALTA INTENSIDADE',
    statusBadgeType: 'intensity',
    title: 'Pernas & Abdômen',
    subtitle: 'Agachamento Livre + Leg 45° + Prancha',
    durationMins: 62,
    totalWeightKg: 18500,
    totalSets: 20,
    category: 'Pernas',
    rpe: 9.0,
    notes: 'Agachamento com amplitude completa até o paralelo. Pernas trêmulas no final.',
    calories: 520,
    completedExercises: [
      { num: '01', name: 'Agachamento Livre Barra', detail: '4 séries completadas', weight: '135 kg', weightBadge: 'PICO' },
      { num: '02', name: 'Leg Press 45 Graus', detail: '4 séries completadas', weight: '320 kg', weightBadge: 'CARGA' },
      { num: '03', name: 'Cadeira Extensora', detail: '4 séries completadas', weight: '75 kg', weightBadge: 'ISOLAMENTO' },
      { num: '04', name: 'Mesa Flexora', detail: '4 séries completadas', weight: '60 kg', weightBadge: 'ISOLAMENTO' },
      { num: '05', name: 'Elevação de Pernas', detail: '4 séries completadas', weight: 'PC', weightBadge: 'CORPO' }
    ]
  },
  {
    id: 'sess-friday',
    dateStr: '2024-10-18',
    dateFormatted: 'SEXTA PASSADA • 18:40',
    dayBadge: 'SEXTA',
    statusBadge: 'CONCLUÍDO',
    statusBadgeType: 'done',
    title: 'Ombros & Trapézio',
    subtitle: 'Desenvolvimento Militar + Elevação Lateral',
    durationMins: 45,
    totalWeightKg: 9800,
    totalSets: 15,
    category: 'Ombros',
    rpe: 7.5,
    notes: 'Elevação lateral com controle excêntrico de 3 segundos.',
    calories: 340,
    completedExercises: [
      { num: '01', name: 'Desenvolvimento Militar Barra', detail: '4 séries completadas', weight: '55 kg', weightBadge: 'PICO' },
      { num: '02', name: 'Elevação Lateral Halteres', detail: '4 séries completadas', weight: '14 kg', weightBadge: 'CADA LADO' },
      { num: '03', name: 'Crucifixo Inverso Polia', detail: '3 séries completadas', weight: '15 kg', weightBadge: 'CABOS' },
      { num: '04', name: 'Encolhimento com Halteres', detail: '4 séries completadas', weight: '36 kg', weightBadge: 'CADA LADO' }
    ]
  }
];

export const userProfileData = {
  name: 'Lucas Silva',
  email: 'lucas.silva@pulsefit.app',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_PExm6TlA1zij8kA2rdgL8EiJODpN6QQetz0lAVnKNp9vwG3ji7XkniwgfubiK2HQyBzClnFtDEnZ1l4jZdyR6OGSxFEQkAgCJNdmD3WKGOP1zDHSUpzDjI235ap8WxGE50BwtgE0ar19iSOVeRojHu6HNPwfY6Hy4MwQyclNb1stcq01IgzYTF174yxITbI2io48VvH_KgAku4JzMam7Dz3f2RI0e-CzsQuOgzOAetAYaZOpa_SU-A',
  badge: 'PRO ATHLETE',
  streakWeeks: 4,
  streakDays: 18,
  monthlyGoalPercent: 90,
  weightKg: 82.4,
  heightCm: 181,
  bodyFatPercent: 14.2,
  workoutsCompleted: 64,
  totalVolumeTon: 412.8,
  maxBenchPress: 100,
  maxSquat: 140,
  maxDeadlift: 180
};
