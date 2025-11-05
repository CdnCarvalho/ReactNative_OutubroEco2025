// import { Header } from "@/components/Header";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { ThemedView } from "@/components/themed-view";

// ================= CONFIG FIREBASE ====================
import { db } from "@/config/firebaseConfig";
import { collection, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";


// ================== COMPONENTE PRINCIPAL ==============
export default function ListaFilmes() {  
  // Estados 
  const [titulo, setTitulo] = useState("TopFilmes");
  const [filmes, setFilmes] = useState([]); // Guarda a lista de filmes buscada no banco
  const [editandoId, setEditandoId] = useState(null); // Guarda o id do filme que está sendo editado
  const [dadosEditados, setDadosEditados] = useState({}); // Guarda os dados temporários do formulário de edição

  // === BUSCAR FILMES (TEMPO REAL) ===
  // O useEffect é executado automaticamente quando o componente é carregado na tela.
  // Usamos onSnapshot para receber atualizações em tempo real do Firestore.
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "filmes"), (snapshot) => {
      // "snapshot.docs" traz todos os registros
      // Aqui usamos o map para transformar cada documento em um objeto mais simples
      const lista = snapshot.docs.map((docSnap) => {
        const dados = docSnap.data();

        // Montamos um objeto "filme" mais organizado,
        // verificando se os campos vêm com a primeira letra maiúscula ou minúscula
        return {
          id: docSnap.id, // id gerado automaticamente pelo Firestore
          nome: dados.Nome || dados.nome || "—", // mostra o nome ou um traço se estiver vazio
          genero: dados.Genero || dados.genero || "—",
          duracao: dados.Duracao || dados.duracao || "—",
          poster: dados.Capa || dados.poster || "",
        };
      });

      // Atualiza o estado com a lista de filmes obtida
      setFilmes(lista);
    });

    // Remove listener ao desmontar o componente
    return () => unsubscribe();
  }, []); // o [] indica que o useEffect só roda uma vez (quando a tela carrega)

  // === EXCLUIR FILME ===
  // Esta função é chamada quando o usuário clica em "Excluir"
  async function excluirFilme(id) {
    // Mostra uma caixa de confirmação na tela
    Alert.alert("Confirmar", "Deseja excluir este filme?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive", // botão vermelho
        onPress: async () => {
          try {
            // Deleta o documento do Firestore com base no ID
            await deleteDoc(doc(db, "filmes", id));

            // A lista será atualizada automaticamente pelo onSnapshot
            Alert.alert("Sucesso", "Filme excluído com sucesso!");
          } catch (erro) {
            console.error("Erro ao excluir:", erro);
            Alert.alert("Erro", "Não foi possível excluir o filme.");
          }
        },
      },
    ]);
  }

  // === EDITAR / SALVAR FILME ===
  // Essa função faz duas coisas:
  // - Se o usuário estiver editando, salva as alterações no Firestore
  // - Caso contrário, apenas habilita a edição do filme selecionado
  async function editarOuSalvarFilme(id) {
    // Se o ID clicado for o mesmo que está em edição, significa que o usuário quer salvar
    if (editandoId === id) {
      try {
        // Cria uma referência ao documento no Firestore
        const ref = doc(db, "filmes", id);

        // Atualiza o registro no banco com os dados digitados
        await updateDoc(ref, {
          Nome: dadosEditados.nome,
          Genero: dadosEditados.genero,
          Duracao: dadosEditados.duracao,
          Capa: dadosEditados.poster,
        });

        // Limpa o modo de edição
        setEditandoId(null);
        setDadosEditados({});

        Alert.alert("Sucesso", "Filme atualizado no Firestore!");
      } catch (erro) {
        console.error("Erro ao atualizar:", erro);
        Alert.alert("Erro", "Não foi possível salvar as alterações.");
      }
    } else {
      // Se ainda não estiver editando, entra no modo de edição
      // Localiza o filme que o usuário clicou em "Editar"
      const filmeSelecionado = filmes.find((f) => f.id === id);

      // Marca o ID como sendo o filme em edição
      setEditandoId(id);

      // Preenche os campos de texto com os dados atuais do filme
      setDadosEditados(filmeSelecionado);
    }
  }

  // === FUNÇÃO PARA CONTROLAR CAMPOS DE TEXTO ===
  // Sempre que o usuário digita algo, esta função é chamada.
  // "campo" é o nome do dado (ex: nome, gênero, duração)
  // "valor" é o texto digitado.
  function handleChange(campo, valor) {
    // Atualiza o objeto "dadosEditados" sem apagar os outros campos
    // "prev" é o estado anterior (os dados digitados antes)
    // o operador "..." copia os valores anteriores e só troca o campo que mudou
    setDadosEditados((prev) => ({ ...prev, [campo]: valor }));
  }

  // === INTERFACE ===
  return (
    <ThemedView style={styles.container}>
      {/* <Header titulo={titulo} setTitulo={setTitulo} /> */}
      <ScrollView >
        <ThemedView style={styles.linkContainer}>
          <Link href="/" >
            <Text style={[{ color: "#007bff", marginBottom: 20 }, styles.link]}> Voltar à principal</Text>
          </Link>
        </ThemedView>
        <Text style={styles.titulo}>Lista de Filmes</Text>

        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <View key={filme.id} style={styles.card}>
              {/* Se estiver no modo de edição, mostra os campos de texto */}
              {editandoId === filme.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={dadosEditados.nome}
                    placeholder="Nome"
                    onChangeText={(valor) => handleChange("nome", valor)}
                  />
                  <TextInput
                    style={styles.input}
                    value={dadosEditados.genero}
                    placeholder="Gênero"
                    onChangeText={(valor) => handleChange("genero", valor)}
                  />
                  <TextInput
                    style={styles.input}
                    value={dadosEditados.duracao}
                    placeholder="Duração"
                    onChangeText={(valor) => handleChange("duracao", valor)}
                  />
                  <TextInput
                    style={styles.inputMenor}
                    value={dadosEditados.poster}
                    placeholder="Link do poster"
                    onChangeText={(valor) => handleChange("poster", valor)}
                  />
                </>
              ) : (
                <>
                  {/* Caso contrário, apenas mostra os textos */}
                  <Text style={styles.texto}> Nome: {filme.nome}</Text>
                  <Text style={styles.texto}> Gênero: {filme.genero}</Text>
                  <Text style={styles.texto}> Duração: {filme.duracao}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.link}
                  >
                    {filme.poster}
                  </Text>
                </>
              )}

              {/* Botões de editar/salvar e excluir */}
              <View style={styles.botoes}>
                <Button
                  title={editandoId === filme.id ? "Salvar" : "Editar"}
                  onPress={() => editarOuSalvarFilme(filme.id)}
                  color="#007bff"
                />
                <View style={{ width: 10 }} />
                <Button
                  title="Excluir"
                  onPress={() => excluirFilme(filme.id)}
                  color="#dc3545"
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.vazio}>Nenhum filme encontrado no Firestore.</Text>
        )}
      </ScrollView>
    </ThemedView>
  );
}


// === ESTILOS ===
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
  card: {
    backgroundColor: "#2b2d31",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    gap: 5
  },
  texto: {
    color: "#e0e0e0",
    marginBottom: 6,
  },
  linkContainer: {
    alignItems: 'center',
    padding: 30,
  },
  link: {    
    color: "#fff",
    textDecorationLine: "none",
    marginTop: 5,
    fontWeight: "light",
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: "#3a3b3f",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    width: "100%",
  },
  inputMenor: {
    backgroundColor: "#3a3b3f",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    width: "70%",
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  vazio: {
    color: "#bbb",
    textAlign: "center",
    marginTop: 20,
  },
});
