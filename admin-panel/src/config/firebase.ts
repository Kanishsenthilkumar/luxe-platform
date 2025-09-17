import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string
};

let app;
let authExport;
let dbExport;
let storageExport;

try {
  app = initializeApp(firebaseConfig);
  authExport = getAuth(app);
  dbExport = getFirestore(app);
  storageExport = getStorage(app);
} catch (e) {
  console.error('Failed to initialize Firebase (admin-panel). Check API key restrictions and env values.', e, firebaseConfig);
}

export const auth = authExport!;
export const db = dbExport!;
export const storage = storageExport!;

export default app!;
