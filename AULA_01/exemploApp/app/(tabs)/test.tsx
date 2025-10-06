import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TestPage() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Página de Teste</ThemedText>
      <ThemedText type="subtitle">
        Esta é uma página de teste aberta em outra porta.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
