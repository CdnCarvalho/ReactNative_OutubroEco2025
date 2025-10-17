import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Picker } from "@react-native-picker/picker"; 
// npm install @react-native-picker/picker

export default function CalculadoraScreen() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [operacao, setOperacao] = useState("adicao");
  const [resultado, setResultado] = useState("");

  // Validação: aceita apenas números com ou sem separadores
  const validarNumero = (texto) => {
    return /^(\d{1,3}(\.\d{3})*(,\d+)?|\d+(,\d+)?)$/.test(texto);
  };

  // Função principal: realiza o cálculo
  const calcular = () => {
    let resposta;

    // Verifica se o que foi digitado é válido
    if (!validarNumero(numero1) || !validarNumero(numero2)) {
      setResultado("Informe apenas números válidos. Use (,) para decimais.");
      return;
    }

    // Converte texto em número decimal (remove pontos e troca vírgula por ponto)
    const n1 = parseFloat(numero1.replace(/\./g, "").replace(",", "."));
    const n2 = parseFloat(numero2.replace(/\./g, "").replace(",", "."));

    // Define a operação
    switch (operacao) {
      case "adicao":
        resposta = n1 + n2;
        break;
      case "subtracao":
        resposta = n1 - n2;
        break;
      case "multiplicacao":
        resposta = n1 * n2;
        break;
      case "divisao":
        resposta = n2 !== 0 ? n1 / n2 : "Impossível dividir por 0";
        break;
      case "modulo":
        resposta = n2 !== 0 ? n1 % n2 : "Impossível calcular módulo por 0";
        break;
      case "exponenciacao":
        resposta = Math.pow(n1, n2);
        break;
      default:
        resposta = "Operação inválida";
    }

    exibirResultado(resposta);
  };

  // Limpa os campos
  const limpar = () => {
    setNumero1("");
    setNumero2("");
    setResultado("");
  };

  // Mostra o resultado formatado
  const exibirResultado = (resposta) => {
    if (typeof resposta === "number" && !isNaN(resposta)) {
      const formatado = resposta.toFixed(2).toString().replace(".", ",");
      setResultado(formatado);
    } else {
      setResultado(resposta);
    }
  };

  return (
    <ThemedView style={estilos.container}>
      {/* <Header titulo={titulo} setTitulo={setTitulo} /> */}

      <ThemedView style={estilos.conteudo}>
        <ThemedText type="title" style={{marginBottom: 20}}> Calculadora </ThemedText>

        <TextInput
          style={estilos.input}
          placeholder="Número 1"
          value={numero1}
          onChangeText={setNumero1}
          keyboardType="numeric"
        />


        <ThemedText style={estilos.legenda}>
          Use (,) para separar decimais
        </ThemedText>

        
        <View style={estilos.caixaSelecao}>
          <Picker
            selectedValue={operacao}
            onValueChange={(itemValue) => setOperacao(itemValue)}
            style={estilos.picker}
          >
            <Picker.Item label="Adição" value="adicao" />
            <Picker.Item label="Subtração" value="subtracao" />
            <Picker.Item label="Multiplicação" value="multiplicacao" />
            <Picker.Item label="Divisão" value="divisao" />
            <Picker.Item label="Módulo" value="modulo" />
            <Picker.Item label="Exponenciação" value="exponenciacao" />
          </Picker>
        </View>


        <TextInput
          style={estilos.input}
          placeholder="Número 2"
          value={numero2}
          onChangeText={setNumero2}
          keyboardType="numeric"
        />

        {/* Calcular */}
        <TouchableOpacity style={estilos.btCalcular} onPress={calcular}>
          <ThemedText style={estilos.btTexto}>Calcular</ThemedText>
        </TouchableOpacity>

        {/* btlimpar */}
        <TouchableOpacity style={estilos.btLimpar} onPress={limpar}>
          <ThemedText style={estilos.btTexto}>Limpar</ThemedText>
        </TouchableOpacity>

        {/* mostrar resultado */}
        {resultado !== "" && (
          <ThemedText style={estilos.resultado}>
            Resultado: {resultado}
          </ThemedText>
        )}
      </ThemedView>

      {/* <Footer rodape={rodape} setRodape={setRodape} /> */}
    </ThemedView>
  );
}

// 🎨 Estilos
const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  legenda: {
    color: "#4fbd5c",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  caixaSelecao: {
    width: "80%",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#198c17",
    color: "#fff",
    padding: 20,
    fontSize: 16,
  },
  btCalcular: {
    width: "80%",
    backgroundColor: "#198c17",
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    alignItems: "center",
  },
  btLimpar: {
    width: "80%",
    backgroundColor: "#394b49",
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  btTexto: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  resultado: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});