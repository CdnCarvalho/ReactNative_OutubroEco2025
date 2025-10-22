// Importa bibliotecas do React Native e componentes personalizados
import { useEffect, useState } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "expo-router";

// ====================== FIREBASE ======================

// Importa as funções do Firebase necessárias
import { initializeApp } from "firebase/app";                // inicializa o app Firebase
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
// getFirestore → conecta ao banco Firestore
// collection → acessa uma coleção (tabela de dados)
// getDocs → busca todos os documentos dessa coleção

// === CONFIGURAÇÃO DO FIREBASE (fora do componente) ===
// Esses dados vêm do painel do Firebase (Configurações do projeto → SDK)
// Eles identificam qual é o SEU projeto na nuvem
const firebaseConfig = {
  apiKey: "AIzaSyB27juMVsvBBU45bvODUuFZ-zIvgwvCLFU",
  authDomain: "filmesapp-6adfd.firebaseapp.com",
  projectId: "filmesapp-6adfd",
  storageBucket: "filmesapp-6adfd.firebasestorage.app",
  messagingSenderId: "646556067415",
  appId: "1:646556067415:web:79d58356c302f8fe05a512",
  measurementId: "G-8QRHJ2MCK7",
};

// Inicializa o Firebase com as informações acima
// Isso “liga” o aplicativo ao seu projeto no console do Firebase
const app = initializeApp(firebaseConfig);

// Cria a conexão com o banco de dados Firestore
// A constante `db` será usada para ler ou gravar dados nas coleções do Firebase
const db = getFirestore(app);

// ====================== COMPONENTE PRINCIPAL ======================

export default function HomeScreen() {
  // Estados (variáveis reativas)
  const [titulo, setTitulo] = useState("Componente Header");
  const [rodape, setRodape] = useState("Desenvolvido por SENAC © 2025");
  const [filme, setFilme] = useState([]); // guardará os filmes vindos do Firebase

  // === BUSCAR FILMES DO FIRESTORE ===
  // useEffect executa automaticamente quando o componente é montado
  useEffect(() => {
    async function carregarFilmes() {
      try {
        // Busca todos os documentos da coleção "filmes"
        // (essa coleção deve existir no Firestore)
        const querySnapshot = await getDocs(collection(db, "filmes"));
        console.log(`${querySnapshot.size} filmes encontrados.`)
        
        // Transforma os documentos em um array de objetos JS
        const lista = querySnapshot.docs.map((doc) => {
          const dados = doc.data(); // dados do documento
          console.log(`Filme encontrado [${doc.id}]:`, dados);
          // Retorna um objeto contendo o ID e os dados do filme
          return { id: doc.id, ...dados };
        });

        // Atualiza o estado do componente com a lista de filmes
        setFilme(lista);
      } catch (erro) {
        console.error("Erro ao buscar filmes:", erro);
      }
    }

    carregarFilmes(); // chama a função assim que o componente abre
  }, []);
  

  // =========== INTERFACE VISUAL ==============
  return (
    <ThemedView style={[styles.container, { backgroundColor: "#f0f0f0" }]}>
      <Header titulo={titulo} setTitulo={setTitulo} />

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={{ fontSize: 40, marginTop:60, marginBottom: 20 }}>
          Filmes em destaque
        </ThemedText>

        {/* Percorre o array de filmes vindos do Firebase e mostra cada um na tela */}
        {filme.map((filme, index) => (
          <ThemedView key={index} style={styles.card}>
            <Image source={{ uri: filme.Capa }} style={styles.capa} />
            <ThemedView style={styles.info}>
              <ThemedText type="subtitle">Nome: {filme.Nome}</ThemedText>
              <ThemedText type="default">Duração: {filme.Duracao}</ThemedText>
              <ThemedText type="default">Gênero: {filme.Genero}</ThemedText>
            </ThemedView>
          </ThemedView>
        ))}

        {/* Link para outra página */}
        <Link href="/formulario" style={styles.link}>
          Ir para o Formulário
        </Link>
      </ScrollView>

      {/* <Footer rodape={rodape} setRodape={setRodape} /> */}
    </ThemedView>
  );
}

// ======== ESTILOS VISUAIS ========
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#000",
  },
  card: {
    width: "95%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginVertical: 20,
    flexDirection: "column",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  capa: {
    width: "100%",
    height: 800,
    resizeMode: "cover",
  },
  info: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});


const filmes = [
  {
    nome: "Vingadores: Ultimato",
    duracao: "3h 02min",
    genero: "Ação / Ficção Científica",
    capa: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_UF894,1000_QL80_.jpg",
  },
  
  {
    nome: "Inception",
    duracao: "2h 28min",
    genero: "Ficção científica",
    capa: "https://m.media-amazon.com/images/I/71iDkRVDZNL.jpg",
  },
  {
    nome: "Interestelar",
    duracao: "2h 49min",
    genero: "Ficção científica",
    capa: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._AC_SY741_.jpg",
  },
  {
    nome: "Batman: O Cavaleiro das Trevas",
    duracao: "2h 32min",
    genero: "Ação",
    capa: "https://img.elo7.com.br/product/zoom/46CCBC1/poster-filme-batman-o-cavaleiro-das-trevas-a2-60x42-cm-lo02-decoracao-quarto-nerd.jpg",
  },
];