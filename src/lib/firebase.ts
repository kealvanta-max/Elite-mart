import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
  type Auth,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  type Firestore,
  type DocumentData,
  type DocumentSnapshot,
  type QueryConstraint,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

function initializeFirebase() {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
}

try {
  initializeFirebase();
  console.log('[Firebase] Initialized successfully');
} catch (error) {
  console.error('[Firebase] Initialization failed:', error);
}

const googleProvider = new GoogleAuthProvider();

// ============================================
// Typed Firestore Helpers
// ============================================

export async function getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
  if (!db) throw new Error('Firestore not initialized');
  const snap = await getDoc(doc(db, collectionName, docId));
  return snap.exists() ? (snap.data() as T) : null;
}

export async function getDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<(T & { id: string })[]> {
  if (!db) throw new Error('Firestore not initialized');
  const q = query(collection(db, collectionName), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T & { id: string }));
}

export async function setDocument<T extends Record<string, unknown>>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> {
  if (!db) throw new Error('Firestore not initialized');
  await setDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

export async function addDocument<T extends Record<string, unknown>>(
  collectionName: string,
  data: T
): Promise<string> {
  if (!db) throw new Error('Firestore not initialized');
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updateDocument(
  collectionName: string,
  docId: string,
  data: Record<string, unknown>
): Promise<void> {
  if (!db) throw new Error('Firestore not initialized');
  await updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  if (!db) throw new Error('Firestore not initialized');
  await deleteDoc(doc(db, collectionName, docId));
}

export async function batchWrite(
  operations: Array<{ type: 'set' | 'update' | 'delete'; collection: string; id: string; data?: Record<string, unknown> }>
): Promise<void> {
  if (!db) throw new Error('Firestore not initialized');
  const batch = writeBatch(db);
  for (const op of operations) {
    const ref = doc(db, op.collection, op.id);
    if (op.type === 'set' && op.data) batch.set(ref, op.data, { merge: true });
    else if (op.type === 'update' && op.data) batch.update(ref, op.data);
    else if (op.type === 'delete') batch.delete(ref);
  }
  await batch.commit();
}

export {
  app,
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  type FirebaseUser,
  type Firestore,
  type DocumentData,
  type DocumentSnapshot,
};

export type User = FirebaseUser;
