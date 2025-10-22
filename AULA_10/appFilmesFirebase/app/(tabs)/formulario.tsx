// Importa os recursos do React Native e os componentes personalizados
import { useState } from "react";
import { StyleSheet, TextInput, Button, View, ScrollView, Alert } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "expo-router";

// ====================== FIREBASE ======================

// Importa as funções principais do Firebase
import { initializeApp } from "firebase/app";                // inicializa o app Firebase
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
// getFirestore → conecta ao banco de dados Firestore
// collection → acessa uma coleção (semelhante a uma tabela)
// addDoc → adiciona (insere) um novo documento nessa coleção

// === CONFIGURAÇÃO DO FIREBASE ===
// Este objeto identifica o seu projeto dentro da plataforma Firebase.
// Você encontra esses dados no console do Firebase, em "Configurações do projeto".
const firebaseConfig = {
  apiKey: "AIzaSyB27juMVsvBBU45bvODUuFZ-zIvgwvCLFU",
  authDomain: "filmesapp-6adfd.firebaseapp.com",
  projectId: "filmesapp-6adfd",
  storageBucket: "filmesapp-6adfd.firebasestorage.app",
  messagingSenderId: "646556067415",
  appId: "1:646556067415:web:79d58356c302f8fe05a512",
  measurementId: "G-8QRHJ2MCK7",
};

// Inicializa a conexão com o Firebase
// Isso faz com que o app React Native “conheça” o seu projeto online
const app = initializeApp(firebaseConfig);

// Conecta ao banco de dados Firestore (nuvem do Firebase)
const db = getFirestore(app);

// ======================================================


// === COMPONENTE PRINCIPAL ===
export default function FormularioScreen() {
  // Cabeçalho e rodapé (apenas textos de exibição)
  const [titulo, setTitulo] = useState("Componente Header");
  const [rodape, setRodape] = useState("Desenvolvido por SENAC © 2025");

  // Estados para guardar o conteúdo digitado nos campos do formulário
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [duracao, setDuracao] = useState("");
  const [capa, setCapa] = useState("");

  // === Função que salva o filme no Firestore ===
  const salvarFilme = async () => {
    // Verifica se todos os campos foram preenchidos
    if (!nome || !genero || !duracao || !capa) {
      Alert.alert("Atenção", "Preencha todos os campos antes de salvar!");
      return; // sai da função se algum estiver vazio
    }

    try {
      // Cria um novo documento dentro da coleção "filmes"
      // Cada filme é um documento contendo campos e valores
      await addDoc(collection(db, "filmes"), {
        Nome: nome,
        Genero: genero,
        Duracao: duracao,
        Capa: capa,
      });

      // Exibe uma mensagem de sucesso
      Alert.alert("Sucesso", "Filme cadastrado com sucesso!");

      // Limpa os campos após o cadastro
      setNome("");
      setGenero("");
      setDuracao("");
      setCapa("");
    } catch (erro) {
      // Caso ocorra algum erro, mostra no console e alerta o usuário
      console.error("Erro ao cadastrar filme: ", erro);
      Alert.alert("Erro", "Não foi possível cadastrar o filme.");
    }
  };

  // === INTERFACE VISUAL DO FORMULÁRIO ===
  return (
    <ThemedView style={styles.container}>
      <Header titulo={titulo} setTitulo={setTitulo} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="title">Cadastro de Filme</ThemedText>

        {/* Campos de entrada de dados */}
        <TextInput
          style={styles.input}
          placeholder="Nome do filme"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Gênero"
          value={genero}
          onChangeText={setGenero}
        />
        <TextInput
          style={styles.input}
          placeholder="Duração (ex: 2h 15min)"
          value={duracao}
          onChangeText={setDuracao}
        />
        <TextInput
          style={styles.input}
          placeholder="URL da capa"
          value={capa}
          onChangeText={setCapa}
        />

        {/* Botão para salvar o filme no Firestore */}
        <Button title="Salvar Filme" onPress={salvarFilme} color="#007AFF" />

        {/* Link de navegação de volta à Home */}
        <Link href="/" style={styles.link}>
          ← Voltar para a Home
        </Link>
      </ScrollView>

      <Footer rodape={rodape} setRodape={setRodape} />
    </ThemedView>
  );
}

// === ESTILOS ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    gap: 20,
    paddingBottom: 80,
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "#F5F5F5",
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
