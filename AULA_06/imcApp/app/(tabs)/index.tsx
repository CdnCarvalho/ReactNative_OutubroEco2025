import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  // SafeAreaView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Componente principal
export default function App() {
  // Estados com tipagem explícita
  const [altura, setAltura] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [imc, setImc] = useState<string>("");

  // Função para calcular o IMC
  const calcularIMC = (): void => {
    const alturaFloat = parseFloat(altura);
    const weightFloat = parseFloat(peso);

    if (
      isNaN(alturaFloat) ||
      isNaN(weightFloat) ||
      alturaFloat <= 0 ||
      weightFloat <= 0
    ) {
      Alert.alert("Por favor, insira valores válidos para peso e altura.");
      return;
    }

    const imcCalc = weightFloat / Math.pow(alturaFloat, 2);
    setImc("Seu IMC: " + imcCalc.toFixed(2));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Logo */}
        {/* <View style={styles.logo}>
          <Image
            style={styles.imageLogo}
            source={require("./app/assets/logo.png")}
          />
        </View> */}

        {/* Título */}
        <Text style={styles.title}>Cálcula IMC</Text>

        {/* Campo Altura */}
        <TextInput
          style={styles.inputForm}
          placeholder="Altura (ex.: 1.70)"
          value={altura}
          onChangeText={setAltura}
          keyboardType="numeric"
        />

        {/* Campo Peso */}
        <TextInput
          style={styles.inputForm}
          placeholder="Peso (ex.: 67.2)"
          value={peso}
          onChangeText={setPeso}
          keyboardType="numeric"
        />

        {/* Botão */}
        <TouchableOpacity style={styles.btnSubmitForm} onPress={calcularIMC}>
          <Text style={styles.txtSubmitForm}>Calcular</Text>
        </TouchableOpacity>

        {/* Resultado */}
        <TextInput
          style={styles.inputForm}
          placeholder="Seu IMC é"
          value={imc}
          editable={false}
        />

        {/* Lista de classificação */}
        <View style={styles.list}>
          {[
            { range: "Menor que 18,5", status: "Magreza" },
            { range: "Entre 18,5 e 24,9", status: "Normal" },
            { range: "Entre 25,0 e 29,9", status: "Sobrepeso" },
            { range: "Entre 30,0 e 39,9", status: "Obesidade" },
            { range: "Maior que 40,0", status: "Obesidade Grave" },
          ].map((item, index) => (
            <View key={index} style={styles.rowData}>
              <Text style={styles.imc}>{item.range}</Text>
              <Text style={styles.classification}>{item.status}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

// Estilos 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030303ff",
  },
  logo: {
    paddingVertical: 30,
  },
  imageLogo: {
    width: 100,
    height: 100,
  },
    title: {
    fontSize: 40,
    color: "#1d6834ff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputForm: {
    backgroundColor: "#f5f5f5",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 18,
    borderRadius: 6,
    padding: 10,
  },
  btnSubmitForm: {
    backgroundColor: "#1d6834ff",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    marginBottom: 30,
  },
  txtSubmitForm: {
    color: "#f5f5f5",
    fontSize: 22,
  },
  list: {
    width: "100%",
  },
  rowData: {
    backgroundColor: "#139748ff",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imc: {
    fontSize: 16,
    color: "#c7f5c7ff",
  },
  classification: {
    fontSize: 16,
    color: "#c7f5c7ff",
  },
});
