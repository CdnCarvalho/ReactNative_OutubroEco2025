import { StyleSheet, Button } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Recebendo props do componente pai
export function Footer({ rodape, setRodape }) {
  return (
    <ThemedView style={styles.footer}>
      <ThemedText type="subtitle" style={styles.textRodape}>{rodape}</ThemedText>
      <ThemedText type="default" style={{ color: "#fff", fontSize: 14, textAlign: "center" }}>
        React Native + Expo — Aula de introdução {"\n"}
        Componente de Rodapé
      </ThemedText>

      {/* Botão que altera o texto do rodapé */}
      <Button
        title="Alterar Rodapé"
        onPress={() => setRodape("Rodapé alterado com sucesso!")}
        color="#ccc"
      />
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
  textRodape: {
    color: "#FFF",
  }
});
