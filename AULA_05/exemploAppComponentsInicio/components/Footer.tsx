import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function Footer() {
  return (
    <ThemedView style={styles.footer}>
      <ThemedText type="subtitle" style={{ color: "#fff", fontSize: 18 }}>
        Desenvolvido por SENAC © 2025
      </ThemedText>
      <ThemedText type="default" style={{ color: "#fff", fontSize: 18 }}>
        React Native + Expo — Aula de introdução  Componente de Rodapé
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