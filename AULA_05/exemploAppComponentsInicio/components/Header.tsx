import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function Header() {
  return (
    <ThemedView style={styles.header}>
      <ThemedText type="title" style={{ color: "#fff", fontSize: 18 }}> Componente Header "Cabeçalho"</ThemedText>
      <ThemedText type="subtitle" style={{ color: "#fff", fontSize: 18 }}> Entendendo Componentes </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#007AFF",
    alignItems: "center",
    width: "100%",
  },
});