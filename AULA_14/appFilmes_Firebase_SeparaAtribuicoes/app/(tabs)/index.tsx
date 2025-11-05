// Importa bibliotecas do React Native e componentes personalizados
// import { Header } from "@/components/Header";
import { useState, useCallback } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
// import { Footer } from "@/components/Footer";

// ====================== FIREBASE ======================
// Importa o banco Firestore configurado
import { db } from "@/config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// ====================== COMPONENTE PRINCIPAL ======================
export default function HomeScreen() {
  const [titulo, setTitulo] = useState("TopFilmes");
  const [filme, setFilme] = useState([]); // guarda filmes do Firestore
  // const [rodape, setRodape] = useState("Desenvolvido por SENAC © 2025");

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
      {/* <Header titulo={titulo} setTitulo={setTitulo} /> */}

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
