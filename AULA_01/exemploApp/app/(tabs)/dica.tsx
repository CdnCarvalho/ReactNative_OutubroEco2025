import { StyleSheet, Image } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";

export default function DicaScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Dica Rápida</ThemedText>

      <ThemedText type="subtitle" style={styles.text}>
        Sempre use componentes do template quando possível, eles já vêm
        estilizados e facilitam a criação de telas consistentes.
      </ThemedText>

      {/* Imagem da web */}
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <Link href="/">
        <ThemedText type="link"> Voltar para a Home</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },
  text: {
    textAlign: "center",
  },
    image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
});