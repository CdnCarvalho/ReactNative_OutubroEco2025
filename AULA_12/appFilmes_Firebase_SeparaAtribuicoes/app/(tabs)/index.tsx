// Importa bibliotecas do React Native e componentes personalizados
import { useState, useCallback } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";


// Criar o arquivo "@/config/firebaseConfig"

// ====================== FIREBASE ======================
// Importa o banco Firestore configurado
import { db } from "@/config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore"; 

// // React Navigation hook para foco da tela
// // npx expo install @react-navigation/native

// // === CONFIGURAÇÃO DO FIREBASE ===
// const firebaseConfig = {
//   apiKey: "AIzaSyB27juMVsvBBU45bvODUuFZ-zIvgwvCLFU",
//   authDomain: "filmesapp-6adfd.firebaseapp.com",
//   projectId: "filmesapp-6adfd",
//   storageBucket: "filmesapp-6adfd.firebasestorage.app",
//   messagingSenderId: "646556067415",
//   appId: "1:646556067415:web:79d58356c302f8fe05a512",
//   measurementId: "G-8QRHJ2MCK7",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// ====================== COMPONENTE PRINCIPAL ======================
export default function HomeScreen() {
  const [titulo, setTitulo] = useState("Componente Header");
  const [rodape, setRodape] = useState("Desenvolvido por SENAC © 2025");
  const [filme, setFilme] = useState([]); // guarda filmes do Firestore

  // === BUSCAR FILMES AO RECEBER FOCO ===
  useFocusEffect(
    useCallback(() => {
      async function carregarFilmes() {
        try {
          const querySnapshot = await getDocs(collection(db, "filmes"));
          const lista = querySnapshot.docs.map((doc) => {
            const dados = doc.data();
            return { id: doc.id, ...dados };
          });
          setFilme(lista); // atualiza o estado com os filmes do Firestore
        } catch (erro) {
          console.error("Erro ao buscar filmes:", erro);
        }
      }

      carregarFilmes(); // chama a função toda vez que a tela recebe foco
    }, []) // useCallback garante que a função não seja recriada a cada render
  );

  // =========== INTERFACE VISUAL ==============
  return (
    <ThemedView style={[styles.container, { backgroundColor: "#f0f0f0" }]}>
      <Header titulo={titulo} setTitulo={setTitulo} />

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={{ fontSize: 40, marginTop:60, marginBottom: 20 }}>
          Filmes em destaque
        </ThemedText>

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

        {/* Links para navegação */}
        <Link href="/formulario" style={styles.link}>
          Adicionar filmes
        </Link>
        <Link href="/editar" style={styles.link}>
          Editar filmes
        </Link>
      </ScrollView>

      {/* <Footer rodape={rodape} setRodape={setRodape} /> */}
    </ThemedView>
  );
}

// ======== ESTILOS VISUAIS ========
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { alignItems: "center", paddingVertical: 20, backgroundColor: "#000" },
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
  capa: { width: "100%", height: 800, resizeMode: "cover" },
  info: { padding: 25, alignItems: "center", justifyContent: "center", gap: 10 },
  link: { marginTop: 20, fontSize: 16, color: "#007AFF", textDecorationLine: "underline" },
});
