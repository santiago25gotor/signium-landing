import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Inicialización EAGERLY en el cliente: Firebase empieza a leer la sesión
// guardada (IndexedDB) en cuanto este módulo se importa, no cuando el
// componente monta. Esto recorta ~300-600 ms del "Cargando…" en páginas
// protegidas porque onAuthStateChanged ya tiene el usuario cuando el
// AuthProvider añade el listener.
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

if (typeof window !== "undefined") {
  _app  = getApps().length ? getApp() : initializeApp(config);
  _auth = getAuth(_app);
  // browserLocalPersistence ya es el comportamiento por defecto en la web,
  // no hace falta llamar a setPersistence.
}

export function getFirebaseApp(): FirebaseApp {
  if (!_app) _app = getApps().length ? getApp() : initializeApp(config);
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (typeof window === "undefined") {
    throw new Error("getFirebaseAuth() solo debe llamarse en el navegador");
  }
  if (!_auth) _auth = getAuth(getFirebaseApp());
  return _auth;
}

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
