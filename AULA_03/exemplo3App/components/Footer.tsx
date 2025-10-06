import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function Footer() {
  return (
    <ThemedView style={styles.footer}>
      <ThemedText type="subtitle">Desenvolvido por Claudenir © 2025</ThemedText>
      <ThemedText type="default">
        React Native + Expo — Aula de introdução
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20,
    backgroundColor: "#16520eff",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#CCC",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});