import { StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { HelloWave } from '@/components/hello-wave';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Olá, React Native!</ThemedText>
      <ThemedText type="subtitle">Primeiro app com Expo</ThemedText>

      {/* Componente HelloWave para animação */}
      <HelloWave />

      {/* Aqui usamos Platform.select */}
      <ThemedText type="subtitle">
        Atalho para abrir ferramentas de desenvolvedor:{' '}
        <ThemedText type="defaultSemiBold">
          {Platform.select({
            ios: 'cmd + d',
            android: 'cmd + m',
            web: 'F12',
            default: 'desconhecido',
          })}
        </ThemedText>
      </ThemedText>
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
});