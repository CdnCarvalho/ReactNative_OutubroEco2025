import { useState } from "react";
import { StyleSheet, TextInput, Button, View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "expo-router";

export default function FormularioScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // Adiciona o nome e e-mail no vetor
  const adicionarUsuario = () => {
    setUsuarios([...usuarios, { nome, email }]);
    setNome("");
    setEmail("");
  };

  return (
    <ThemedView style={styles.container}>
      <Header titulo="Cadastro Simples" />

      <ThemedView style={styles.content}>
        <ThemedText type="title">Formulário</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o e-mail"
          value={email}
          onChangeText={setEmail}
        />

        <Button title="Adicionar" onPress={adicionarUsuario} color="#007AFF" />

        {/* Mostra o que foi armazenado */}
        {usuarios.map((user, index) => (
          <View key={index} style={styles.item}>
            <ThemedText type="default" style={{color: "#0c0c0c"}}>
              {user.nome} - {user.email}
            </ThemedText>
          </View>
        ))}

        {/* Link para voltar */}
        <Link href="/" style={styles.link}>
          ← Voltar para a Home
        </Link>
      </ThemedView>

      <Footer rodape="React Native + Expo — Aula prática" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    gap: 40,
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "#F5F5F5",
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#E6F0FF",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    width: "90%",
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
