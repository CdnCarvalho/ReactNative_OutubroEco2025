import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// === CONFIGURAÇÃO DIRETA DO FIREBASE ===
const firebaseConfig = {
  apiKey: "AIzaSyCt7ID0Ij1cGyIRjTljHdYJFqB2DHGBHfY",
  authDomain: "agenda-8c238.firebaseapp.com",
  projectId: "agenda-8c238",
  storageBucket: "agenda-8c238.firebasestorage.app",
  messagingSenderId: "729010801813",
  appId: "1:729010801813:web:8352785022d5b5feffdf9c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AdicionarContato() {
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  async function salvarContato() {
    try {
      await addDoc(collection(db, "cadastro"), {
        nome,
        tel,
        email,
      });

      Alert.alert("Sucesso", "Contato adicionado à agenda!");
      setNome("");
      setTel("");
      setEmail("");
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
      Alert.alert("Erro", "Não foi possível salvar o contato.");
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.titulo}>Novo Contato</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={tel}
        onChangeText={setTel}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button title="Salvar" onPress={salvarContato} color="#007bff" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1f22",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#2b2d31",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});