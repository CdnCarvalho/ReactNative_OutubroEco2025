import { StyleSheet, Button } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Recebendo props do componente pai (index)
export function Header({ titulo, setTitulo }) {
  return (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.textHeader} type="title" >{titulo}</ThemedText>
      <ThemedText style={styles.textHeader} type="subtitle"> Entendendo Componentes </ThemedText>

      {/* Botão para alterar o título */}
      <Button
        title="Mudar Título"
        onPress={() => setTitulo("Título alterado com Props!")}
        color="#ccc"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#0458b3ff",
    alignItems: "center",
    width: "100%",
  },
  textHeader: {
    color: "#ffffff",
  }
});
