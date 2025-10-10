import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header />

      {/* Área do conteúdo */}
      <ThemedView style={styles.content}>
        <ThemedText type="title">Tela Principal</ThemedText>
      </ThemedView>

      <Footer />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // ocupa o espaço entre header e footer
    alignItems: "center",
    justifyContent: "center", // centraliza no meio da tela
  },
});