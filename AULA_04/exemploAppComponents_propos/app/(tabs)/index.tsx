import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "expo-router";

export default function HomeScreen() {
    // Estado para trocar os textos
  const [titulo, setTitulo] = useState("Meu Primeiro App");
  const [rodape, setRodape] = useState("Desenvolvido por Claudenir © 2025");
  return (
    <ThemedView style={styles.container}>
      <Header titulo={titulo} setTitulo={setTitulo} />

      <ThemedView style={styles.content}>
        <ThemedText type="title">Página Inicial</ThemedText>
        <ThemedText type="default">
          Agora vamos aprender sobre formulários!
        </ThemedText>

        {/* Navegação para a nova página */}
        <Link href="/formulario" style={styles.link}>
          Ir para o Formulário ➜
        </Link>
      </ThemedView>

      <Footer rodape={rodape} setRodape={setRodape} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
