// config/firebaseConfig.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";


// Configuração padrão do Firebase
const firebaseConfig = {
  // Sua chave API



};

// Inicializa o app e o banco
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db };  // Exporta o banco de dados
