import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/configFirebase";

// Função para adicionar um novo filme
export const adicionarFilme = async (filme) => {
  try {
    const docRef = await addDoc(collection(db, "filmes"), filme);
    console.log("Filme cadastrado com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao cadastrar filme:", error);
  }
};

// Função para listar todos os filmes
export const listarFilmes = async () => {
  try {
    const snapshot = await getDocs(collection(db, "filmes"));
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return lista;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
};
