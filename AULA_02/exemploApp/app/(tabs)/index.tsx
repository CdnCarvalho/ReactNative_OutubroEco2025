import { StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from "expo-router";
import { HelloWave } from '@/components/hello-wave';
import { useState } from "react";

export default function HomeScreen() {
  const [mensagem, setMensagem] = useState("Seja bem-vindo!");
  return (
    // <ThemedView style={styles.container}>
    //   <ThemedText type="title">Olá, React Native!</ThemedText>
    //   <ThemedText type="subtitle">Primeiro app com Expo 🚀</ThemedText> 

    //   {/* Componente HelloWave para animação */}
    //   <HelloWave /> 

    //   * Aqui usamos Platform.select
    //   <ThemedText type="subtitle">
    //     Atalho para abrir ferramentas de desenvolvedor:{' '}
    //     <ThemedText type="defaultSemiBold">
    //       {Platform.select({
    //         ios: 'cmd + d',
    //         android: 'cmd + m',
    //         web: 'F12',
    //         default: 'desconhecido',
    //       })}
    //     </ThemedText>
    //   </ThemedText>
    // </ThemedView>

      <ThemedView style={styles.container}>
      <ThemedText type="title">React Native! </ThemedText>
      <ThemedText type="subtitle">{mensagem}</ThemedText>

      {/* Botão improvisado usando Text (já que não tem Button nativo aqui) */}
      <ThemedText
        style={styles.button}
        onPress={() => setMensagem("Você clicou no botão")}
      >
        Clique aqui
      </ThemedText>

      {/* Link para outra página */}
      <Link href="/test">
        <ThemedText type="link">Ir para página de teste </ThemedText>
      </Link>
      <Link href="/dica">
        <ThemedText type="link"> Ir para a dica rápida</ThemedText>
      </Link>
    </ThemedView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12, // espaço entre elementos
  },
    button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
});