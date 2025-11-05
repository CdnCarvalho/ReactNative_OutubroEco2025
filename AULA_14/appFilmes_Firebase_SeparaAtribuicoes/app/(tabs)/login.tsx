import { ThemedText } from "@/components/themed-text";
import { auth } from "@/config/firebaseConfig";
import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";


// === COMPONENTE PRINCIPAL ===
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha!");
      return;
    }

    try {
        console.log("Tentando fazer login com email:", email)
      const userCredenciais = await signInWithEmailAndPassword(auth, email, senha);
      const usuario = userCredenciais.user;
      console.log("Usuário logado:", usuario.email);
      console.log("Usuário logado:", userCredenciais);
      Alert.alert("Bem-vindo!", "Login realizado com sucesso.");
      router.replace("/formulario"); // redireciona após login
    } catch (erro: any) {
        console.error("Erro no login:", erro);
        switch (erro.code) {
            case "auth/user-not-found":
            Alert.alert("Erro", "Usuário não encontrado.");
            break;
            case "auth/wrong-password":
            Alert.alert("Erro", "Senha incorreta.");
            break;
            case "auth/invalid-email":
            Alert.alert("Erro", "E-mail inválido.");
            break;
            default:
            Alert.alert("Erro", "Ocorreu um erro no login.");
        }
        }
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title">Acesso Administrativo</ThemedText>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} color="#007AFF" />

      <Link href="/" style={styles.link}>
        ← Voltar para a página inicial
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  link: {
    marginTop: 20,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
