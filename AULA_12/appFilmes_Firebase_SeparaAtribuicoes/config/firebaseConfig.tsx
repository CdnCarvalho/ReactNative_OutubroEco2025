// config/firebaseConfig.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Configuração padrão do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB27juMVsvBBU45bvODUuFZ-zIvgwvCLFU",
  authDomain: "filmesapp-6adfd.firebaseapp.com",
  projectId: "filmesapp-6adfd",
  storageBucket: "filmesapp-6adfd.firebasestorage.app",
  messagingSenderId: "646556067415",
  appId: "1:646556067415:web:79d58356c302f8fe05a512",
  measurementId: "G-8QRHJ2MCK7",
};

// Inicializa o app e o banco
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db };
