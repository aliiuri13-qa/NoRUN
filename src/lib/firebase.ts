import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { AthleteProfile, WorkoutRoutine, WorkoutSession } from '../types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL */
export const auth = getAuth(app);

// Test Firestore Connection on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or connecting...');
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

// ----------------- Data Sync Services -----------------

const ATHLETE_DOC_ID = 'current_athlete';

export async function syncAthleteToFirebase(profile: AthleteProfile): Promise<void> {
  const path = `athletes/${ATHLETE_DOC_ID}`;
  try {
    await setDoc(doc(db, 'athletes', ATHLETE_DOC_ID), {
      ...profile,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function fetchAthleteFromFirebase(): Promise<AthleteProfile | null> {
  const path = `athletes/${ATHLETE_DOC_ID}`;
  try {
    const snap = await getDoc(doc(db, 'athletes', ATHLETE_DOC_ID));
    if (snap.exists()) {
      return snap.data() as AthleteProfile;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
  return null;
}

export async function syncRoutinesToFirebase(routines: WorkoutRoutine[]): Promise<void> {
  try {
    for (const r of routines) {
      await setDoc(doc(db, 'routines', r.id), {
        ...r,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'routines');
  }
}

export async function deleteRoutineFromFirebase(routineId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'routines', routineId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `routines/${routineId}`);
  }
}

export async function fetchRoutinesFromFirebase(): Promise<WorkoutRoutine[]> {
  try {
    const snap = await getDocs(collection(db, 'routines'));
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as WorkoutRoutine);
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'routines');
  }
  return [];
}

export async function syncCreatineLogToFirebase(
  date: string,
  taken: boolean,
  dosageGrams: number = 5
): Promise<void> {
  const logId = `creatine_${date.replace(/[^a-zA-Z0-9_]/g, '_')}`;
  const path = `creatineLogs/${logId}`;
  try {
    await setDoc(doc(db, 'creatineLogs', logId), {
      athleteId: ATHLETE_DOC_ID,
      date,
      taken,
      dosageGrams,
      takenAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function fetchCreatineLogFromFirebase(date: string): Promise<boolean | null> {
  const logId = `creatine_${date.replace(/[^a-zA-Z0-9_]/g, '_')}`;
  const path = `creatineLogs/${logId}`;
  try {
    const snap = await getDoc(doc(db, 'creatineLogs', logId));
    if (snap.exists()) {
      const data = snap.data();
      return Boolean(data.taken);
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
  return null;
}

export async function syncWorkoutSessionToFirebase(session: WorkoutSession): Promise<void> {
  const path = `workoutSessions/${session.id}`;
  try {
    await setDoc(doc(db, 'workoutSessions', session.id), {
      ...session,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function fetchWorkoutSessionsFromFirebase(): Promise<WorkoutSession[]> {
  try {
    const snap = await getDocs(collection(db, 'workoutSessions'));
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as WorkoutSession);
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'workoutSessions');
  }
  return [];
}

export async function syncWeightLogToFirebase(weightKg: number, notes?: string): Promise<void> {
  const dateStr = new Date().toISOString().split('T')[0];
  const logId = `weight_${Date.now()}`;
  const path = `weightLogs/${logId}`;
  try {
    await setDoc(doc(db, 'weightLogs', logId), {
      athleteId: ATHLETE_DOC_ID,
      weightKg,
      date: dateStr,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}
