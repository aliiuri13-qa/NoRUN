/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, WorkoutRoutine, WorkoutSession, AthleteProfile, CreatineCheckin } from './types';
import {
  loadAthleteProfile,
  saveAthleteProfile,
  loadRoutines,
  saveRoutines,
  loadActiveRoutineId,
  saveActiveRoutineId,
  loadSessionsHistory,
  saveSessionsHistory,
} from './data/storage';
import {
  syncAthleteToFirebase,
  fetchAthleteFromFirebase,
  syncRoutinesToFirebase,
  fetchRoutinesFromFirebase,
  deleteRoutineFromFirebase,
  syncCreatineLogToFirebase,
  fetchCreatineLogFromFirebase,
  syncWorkoutSessionToFirebase,
  fetchWorkoutSessionsFromFirebase,
  syncWeightLogToFirebase,
} from './lib/firebase';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HojeScreen } from './screens/HojeScreen';
import { TreinoScreen } from './screens/TreinoScreen';
import { ResultadosScreen } from './screens/ResultadosScreen';
import { HistoricoScreen } from './screens/HistoricoScreen';
import { PlateCalculatorModal } from './components/PlateCalculatorModal';
import { WorkoutSwitchModal } from './components/WorkoutSwitchModal';
import { AthleteModal } from './components/AthleteModal';
import { WorkoutFormModal } from './components/WorkoutFormModal';
import { BodyWeightModal } from './components/BodyWeightModal';
import { ExportReportModal } from './components/ExportReportModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('hoje');

  // Persistent State
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfile>(() => loadAthleteProfile());
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(() => loadRoutines());
  const [currentRoutineId, setCurrentRoutineId] = useState<string>(() => loadActiveRoutineId());
  const [sessionsHistory, setSessionsHistory] = useState<WorkoutSession[]>(() => loadSessionsHistory());

  // Creatine Check-in State
  const todayStr = new Date().toISOString().split('T')[0];
  const [creatineCheckin, setCreatineCheckin] = useState<CreatineCheckin>(() => {
    try {
      const stored = localStorage.getItem(`pulsefit_creatine_${todayStr}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn(e);
    }
    return { date: todayStr, taken: false, dosageGrams: 5 };
  });

  // Active workout state
  const [workoutSeconds, setWorkoutSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [restSeconds, setRestSeconds] = useState<number>(0);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);

  // Modals state
  const [isAthleteModalOpen, setIsAthleteModalOpen] = useState<boolean>(false);
  const [isWorkoutManagerOpen, setIsWorkoutManagerOpen] = useState<boolean>(false);
  const [isWorkoutFormOpen, setIsWorkoutFormOpen] = useState<boolean>(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState<boolean>(false);
  const [routineToEdit, setRoutineToEdit] = useState<WorkoutRoutine | null>(null);

  const [isPlateCalcOpen, setIsPlateCalcOpen] = useState<boolean>(false);
  const [plateCalcWeight, setPlateCalcWeight] = useState<number>(80);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Initial Firebase Sync on boot
  useEffect(() => {
    async function loadFirebaseData() {
      try {
        const cloudAthlete = await fetchAthleteFromFirebase();
        if (cloudAthlete) {
          setAthleteProfile(cloudAthlete);
          saveAthleteProfile(cloudAthlete);
        } else {
          syncAthleteToFirebase(athleteProfile);
        }

        const cloudRoutines = await fetchRoutinesFromFirebase();
        if (cloudRoutines && cloudRoutines.length > 0) {
          setRoutines(cloudRoutines);
          saveRoutines(cloudRoutines);
        } else {
          syncRoutinesToFirebase(routines);
        }

        const cloudCreatineTaken = await fetchCreatineLogFromFirebase(todayStr);
        if (cloudCreatineTaken !== null) {
          setCreatineCheckin((prev) => ({ ...prev, taken: cloudCreatineTaken }));
        }

        const cloudSessions = await fetchWorkoutSessionsFromFirebase();
        if (cloudSessions && cloudSessions.length > 0) {
          setSessionsHistory(cloudSessions);
          saveSessionsHistory(cloudSessions);
        }
      } catch (err) {
        console.warn('Firebase initial sync note:', err);
      }
    }
    loadFirebaseData();
  }, []);

  const currentRoutine =
    routines.find((r) => r.id === currentRoutineId) || routines[0] || {
      id: 'treino-padrao',
      letter: 'Treino A',
      name: 'Treino Geral',
      focus: 'Condicionamento',
      durationMinutes: 45,
      exerciseCount: 0,
      setCount: 0,
      suggestedTarget: 'Adicione exercícios para começar',
      heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      exercises: [],
    };

  // Workout duration timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setWorkoutSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Rest timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [restSeconds]);

  // Toggle Creatine Check-in
  const handleToggleCreatine = (taken: boolean, dosage: number = 5) => {
    const updated: CreatineCheckin = {
      date: todayStr,
      taken,
      dosageGrams: dosage,
      timeStr: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setCreatineCheckin(updated);
    try {
      localStorage.setItem(`pulsefit_creatine_${todayStr}`, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    // Sync to Firebase
    syncCreatineLogToFirebase(todayStr, taken, dosage);

    if (taken) {
      const updatedProfile = {
        ...athleteProfile,
        lastCreatineDate: todayStr,
        creatineStreak: (athleteProfile.creatineStreak || 0) + 1,
      };
      setAthleteProfile(updatedProfile);
      saveAthleteProfile(updatedProfile);
      syncAthleteToFirebase(updatedProfile);
    }
  };

  // Save Body Weight Log
  const handleSaveBodyWeight = (weight: number, notes?: string) => {
    const updatedProfile = {
      ...athleteProfile,
      weightKg: weight,
    };
    setAthleteProfile(updatedProfile);
    saveAthleteProfile(updatedProfile);
    // Sync to Firebase
    syncAthleteToFirebase(updatedProfile);
    syncWeightLogToFirebase(weight, notes);
  };

  // Save Athlete Profile
  const handleSaveAthleteProfile = (newProfile: AthleteProfile) => {
    setAthleteProfile(newProfile);
    saveAthleteProfile(newProfile);
    syncAthleteToFirebase(newProfile);
  };

  // Save Routine
  const handleSaveRoutine = (routine: WorkoutRoutine) => {
    const exists = routines.some((r) => r.id === routine.id);
    let updated: WorkoutRoutine[];
    if (exists) {
      updated = routines.map((r) => (r.id === routine.id ? routine : r));
    } else {
      updated = [...routines, routine];
    }
    setRoutines(updated);
    saveRoutines(updated);
    syncRoutinesToFirebase(updated);

    if (!exists && routines.length === 0) {
      setCurrentRoutineId(routine.id);
      saveActiveRoutineId(routine.id);
    }
  };

  // Delete Routine
  const handleDeleteRoutine = (routineId: string) => {
    const updated = routines.filter((r) => r.id !== routineId);
    setRoutines(updated);
    saveRoutines(updated);
    deleteRoutineFromFirebase(routineId);

    if (currentRoutineId === routineId && updated.length > 0) {
      setCurrentRoutineId(updated[0].id);
      saveActiveRoutineId(updated[0].id);
    }
  };

  // Select Workout of the Day
  const handleSelectWorkoutOfTheDay = (routineId: string) => {
    setCurrentRoutineId(routineId);
    saveActiveRoutineId(routineId);
    setActiveExerciseIndex(0);
  };

  // Start Workout Action
  const handleStartWorkout = () => {
    if (!isTimerRunning && workoutSeconds === 0) {
      setIsTimerRunning(true);
    }
    setCurrentTab('treino');
  };

  // Update exercise set
  const handleUpdateExerciseSet = (
    exerciseIndex: number,
    setIndex: number,
    updates: { weight?: number; reps?: number; completed?: boolean }
  ) => {
    setRoutines((prevRoutines) => {
      const updatedRoutines = prevRoutines.map((routine) => {
        if (routine.id !== currentRoutineId) return routine;
        const updatedExercises = routine.exercises.map((ex, eIdx) => {
          if (eIdx !== exerciseIndex) return ex;
          const updatedSets = ex.sets.map((s, sIdx) => {
            if (sIdx !== setIndex) return s;
            return { ...s, ...updates };
          });
          return { ...ex, sets: updatedSets };
        });
        return { ...routine, exercises: updatedExercises };
      });
      saveRoutines(updatedRoutines);
      syncRoutinesToFirebase(updatedRoutines);
      return updatedRoutines;
    });
  };

  // Add set to exercise
  const handleAddSetToExercise = (exerciseIndex: number) => {
    setRoutines((prevRoutines) => {
      const updatedRoutines = prevRoutines.map((routine) => {
        if (routine.id !== currentRoutineId) return routine;
        const updatedExercises = routine.exercises.map((ex, eIdx) => {
          if (eIdx !== exerciseIndex) return ex;
          const lastSet = ex.sets[ex.sets.length - 1];
          const newSetNumber = ex.sets.length + 1;
          const newSet = {
            id: `s-${Date.now()}-${newSetNumber}`,
            setNumber: newSetNumber,
            previous: `${lastSet ? lastSet.weight : 70}kg × ${lastSet ? lastSet.reps : 10}`,
            weight: lastSet ? lastSet.weight : 70,
            reps: lastSet ? lastSet.reps : 10,
            completed: false,
          };
          return { ...ex, sets: [...ex.sets, newSet], targetSets: ex.sets.length + 1 };
        });
        return { ...routine, exercises: updatedExercises };
      });
      saveRoutines(updatedRoutines);
      syncRoutinesToFirebase(updatedRoutines);
      return updatedRoutines;
    });
  };

  // Finish Workout
  const handleFinishWorkout = () => {
    setIsTimerRunning(false);

    let totalKg = 0;
    let completedSetsCount = 0;
    const completedExercisesList: {
      num: string;
      name: string;
      detail: string;
      weight: string;
      weightBadge?: string;
    }[] = [];

    currentRoutine.exercises.forEach((ex, idx) => {
      const completedSets = ex.sets.filter((s) => s.completed);
      completedSetsCount += completedSets.length;

      let maxLoad = 0;
      completedSets.forEach((s) => {
        totalKg += (s.weight || 0) * (s.reps || 1);
        if (s.weight > maxLoad) maxLoad = s.weight;
      });

      if (completedSets.length > 0) {
        completedExercisesList.push({
          num: (idx + 1).toString().padStart(2, '0'),
          name: ex.name,
          detail: `${completedSets.length} séries completadas`,
          weight: `${maxLoad} kg`,
          weightBadge: ex.badge || 'FEITO',
        });
      }
    });

    const durationMins = Math.max(1, Math.round(workoutSeconds / 60));
    const now = new Date();
    const dateFormatted = `Hoje, ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    const newSession: WorkoutSession = {
      id: `sess-${Date.now()}`,
      dateStr: now.toISOString().split('T')[0],
      dateFormatted,
      dayBadge: 'HOJE',
      statusBadge: 'CONCLUÍDO',
      statusBadgeType: 'done',
      title: `${currentRoutine.letter} • ${currentRoutine.name}`,
      subtitle: currentRoutine.exercises.map((e) => e.name).slice(0, 3).join(' + '),
      durationMins: durationMins || currentRoutine.durationMinutes,
      totalWeightKg: totalKg || 12840,
      totalSets: completedSetsCount || currentRoutine.setCount,
      calories: Math.round((durationMins || 45) * 8),
      category: 'Geral',
      completedExercises:
        completedExercisesList.length > 0
          ? completedExercisesList
          : currentRoutine.exercises.map((ex, i) => ({
              num: (i + 1).toString().padStart(2, '0'),
              name: ex.name,
              detail: `${ex.targetSets} séries completadas`,
              weight: `${ex.sets[0]?.weight || 50} kg`,
              weightBadge: 'FEITO',
            })),
    };

    const updatedProfile = {
      ...athleteProfile,
      streakDays: athleteProfile.streakDays + 1,
    };
    handleSaveAthleteProfile(updatedProfile);

    const updatedHistory = [newSession, ...sessionsHistory];
    setSessionsHistory(updatedHistory);
    saveSessionsHistory(updatedHistory);
    syncWorkoutSessionToFirebase(newSession);

    setWorkoutSeconds(0);
    setCurrentTab('resultados');
  };

  const handleSaveAndGoToHistory = (updatedSession: WorkoutSession) => {
    const updated = sessionsHistory.map((s) => (s.id === updatedSession.id ? updatedSession : s));
    setSessionsHistory(updated);
    saveSessionsHistory(updated);
    syncWorkoutSessionToFirebase(updatedSession);
    setCurrentTab('historico');
  };

  const handleApplyWeightFromCalc = (weight: number) => {
    const currentEx = currentRoutine.exercises[activeExerciseIndex];
    if (currentEx) {
      const activeSetIdx = Math.max(
        0,
        currentEx.sets.findIndex((s) => !s.completed)
      );
      handleUpdateExerciseSet(activeExerciseIndex, activeSetIdx, { weight });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1320] text-[#dde2f5] flex flex-col font-body-md antialiased selection:bg-[#00d2ff] selection:text-[#003543]">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenProfile={() => setIsAthleteModalOpen(true)}
        onOpenWorkoutManager={() => setIsWorkoutManagerOpen(true)}
        athleteProfile={athleteProfile}
      />

      <main className="flex-1 w-full pt-16 flex flex-col items-center">
        {currentTab === 'hoje' && (
          <HojeScreen
            currentRoutine={currentRoutine}
            athleteProfile={athleteProfile}
            creatineCheckin={creatineCheckin}
            onToggleCreatine={handleToggleCreatine}
            onStartWorkout={handleStartWorkout}
            onOpenWorkoutSwitcher={() => setIsWorkoutManagerOpen(true)}
            onOpenCreateWorkout={() => {
              setRoutineToEdit(null);
              setIsWorkoutFormOpen(true);
            }}
            onOpenAthleteProfile={() => setIsAthleteModalOpen(true)}
            onOpenWeightModal={() => setIsWeightModalOpen(true)}
            onSelectExerciseToView={(idx) => {
              setActiveExerciseIndex(idx);
              setCurrentTab('treino');
            }}
          />
        )}

        {currentTab === 'treino' && (
          <TreinoScreen
            currentRoutine={currentRoutine}
            workoutSeconds={workoutSeconds}
            isTimerRunning={isTimerRunning}
            onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
            restSeconds={restSeconds}
            onAddRestTime={(sec) => setRestSeconds((prev) => prev + sec)}
            onSkipRest={() => setRestSeconds(0)}
            onFinishWorkout={handleFinishWorkout}
            onOpenPlateCalculator={(wt) => {
              setPlateCalcWeight(wt);
              setIsPlateCalcOpen(true);
            }}
            activeExerciseIndex={activeExerciseIndex}
            setActiveExerciseIndex={setActiveExerciseIndex}
            onUpdateExerciseSet={handleUpdateExerciseSet}
            onAddSetToExercise={handleAddSetToExercise}
          />
        )}

        {currentTab === 'resultados' && (
          <ResultadosScreen
            currentSession={
              sessionsHistory[0] || {
                id: 'sess-default',
                dateStr: new Date().toISOString().split('T')[0],
                dateFormatted: 'Hoje',
                title: `${currentRoutine.letter} • ${currentRoutine.name}`,
                subtitle: 'Treino finalizado com sucesso',
                durationMins: 50,
                totalWeightKg: 12840,
                totalSets: 18,
                category: 'Geral',
              }
            }
            athleteProfile={athleteProfile}
            onSaveAndGoToHistory={handleSaveAndGoToHistory}
          />
        )}

        {currentTab === 'historico' && (
          <HistoricoScreen
            sessions={sessionsHistory}
            onOpenReportModal={() => setIsReportOpen(true)}
            onGoToHome={() => setCurrentTab('hoje')}
          />
        )}
      </main>

      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isWorkoutActive={isTimerRunning}
      />

      {/* Athlete Registration / Profile Modal */}
      <AthleteModal
        isOpen={isAthleteModalOpen}
        profile={athleteProfile}
        onClose={() => setIsAthleteModalOpen(false)}
        onSaveProfile={handleSaveAthleteProfile}
      />

      {/* Body Weight Logger Modal */}
      <BodyWeightModal
        isOpen={isWeightModalOpen}
        currentWeight={athleteProfile.weightKg}
        onClose={() => setIsWeightModalOpen(false)}
        onSaveWeight={handleSaveBodyWeight}
      />

      {/* Workout Routine Creator & Editor Modal */}
      <WorkoutFormModal
        isOpen={isWorkoutFormOpen}
        routineToEdit={routineToEdit}
        onClose={() => {
          setIsWorkoutFormOpen(false);
          setRoutineToEdit(null);
        }}
        onSaveRoutine={handleSaveRoutine}
      />

      {/* Workout Switcher & Manager Modal */}
      <WorkoutSwitchModal
        isOpen={isWorkoutManagerOpen}
        routines={routines}
        currentRoutineId={currentRoutineId}
        onClose={() => setIsWorkoutManagerOpen(false)}
        onSelectRoutine={handleSelectWorkoutOfTheDay}
        onOpenCreateRoutine={() => {
          setRoutineToEdit(null);
          setIsWorkoutFormOpen(true);
        }}
        onOpenEditRoutine={(routine) => {
          setRoutineToEdit(routine);
          setIsWorkoutFormOpen(true);
        }}
        onDeleteRoutine={handleDeleteRoutine}
      />

      {/* Plate Calculator Modal */}
      <PlateCalculatorModal
        isOpen={isPlateCalcOpen}
        initialWeight={plateCalcWeight}
        onClose={() => setIsPlateCalcOpen(false)}
        onApplyWeight={handleApplyWeightFromCalc}
      />

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
