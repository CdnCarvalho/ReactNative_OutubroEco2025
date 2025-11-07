import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router"; // Importa corretamente o Link

// === CONFIG FIREBASE ===
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

export default function ListaAgenda() {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    async function buscarContatos() {
      try {
        const querySnapshot = await getDocs(collection(db, "cadastro"));
        const lista = querySnapshot.docs.map((docSnap) => {
          const dados = docSnap.data();
          return {
            id: docSnap.id,
            nome: dados.nome || "—",
            tel: dados.tel || "—",
            email: dados.email || "—"
          };
        });
        setContatos(lista);
      } catch (erro) {
        console.error("Erro ao buscar contatos:", erro);
      }
    }

    buscarContatos();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.titulo}>Agenda de Contatos</Text>

      {/* Link para adicionar novo contato */}
      <View style={styles.linkContainer}>
        <Link href="/adicionar">
          <Text style={styles.link}>Adicionar novo contato</Text>
        </Link>
      </View>

      <ScrollView>
        {contatos.length > 0 ? (
          contatos.map((contato) => (
            <View key={contato.id} style={styles.card}>
              <Text style={styles.texto}>Nome: {contato.nome}</Text>
              <Text style={styles.texto}>Telefone: {contato.tel}</Text>
              <Text style={styles.texto}>Email: {contato.email}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.vazio}>Nenhum contato encontrado.</Text>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1f22",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  linkContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  link: {
    color: "#00bfff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "#2b2d31",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    gap: 5,
  },
  texto: {
    color: "#e0e0e0",
    marginBottom: 6,
  },
  vazio: {
    color: "#bbb",
    textAlign: "center",
    marginTop: 20,
  },
});