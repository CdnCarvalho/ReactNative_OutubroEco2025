// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { db } from "@/config/configFirebase";
import { collection, addDoc } from "firebase/firestore";


// Coloque aqui os dados que o Firebase te deu
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seuapp.firebaseapp.com",
  projectId: "seuapp",
  storageBucket: "seuapp.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefghijk"
};

// Inicializa o Firebase com essa configuração
const app = initializeApp(firebaseConfig);

// Exporta a instância para ser usada em outros arquivos
export default app;

// Inicializa o Firestore e exporta
export const db = getFirestore(app);
