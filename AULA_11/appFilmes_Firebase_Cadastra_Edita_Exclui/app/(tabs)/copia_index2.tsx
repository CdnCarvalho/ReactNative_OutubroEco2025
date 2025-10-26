// import { useEffect, useState } from "react";
// import { StyleSheet, Image, ScrollView } from "react-native";
// import { ThemedView } from "@/components/themed-view";
// import { ThemedText } from "@/components/themed-text";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { Link } from "expo-router";
// import { collection, getDocs } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";

// export default function HomeScreen() {
//   // Estado para trocar os textos
//   const [titulo, setTitulo] = useState("Componente Header");
//   const [rodape, setRodape] = useState("Desenvolvido por SENAC © 2025");
//   const [filemes, setFilmes] = useState([])
//   // Configurações Firebase
//   const firebaseConfig = {
//     apiKey: "AIzaSyB27juMVsvBBU45bvODUuFZ-zIvgwvCLFU",
//     authDomain: "filmesapp-6adfd.firebaseapp.com",
//     projectId: "filmesapp-6adfd",
//     storageBucket: "filmesapp-6adfd.firebasestorage.app",
//     messagingSenderId: "646556067415",
//     appId: "1:646556067415:web:79d58356c302f8fe05a512",
//     measurementId: "G-8QRHJ2MCK7"
//   };

//   const app = initializeApp(firebaseConfig)
//   const db = getFirestore(app)

//   useEffect(() => {
//     const querySnapshot = await getDocs(collection(db, "filmes"));
//     querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     setFilmes(doc.data())
// });
//   }, [])
  
//   //   // Lista de filmes (simulada)
//   // const filmes = [
//   //   {
//   //     nome: "Vingadores: Ultimato",
//   //     duracao: "3h 02min",
//   //     genero: "Ação / Ficção Científica",
//   //     capa: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_UF894,1000_QL80_.jpg",
//   //   },
    
//   //   {
//   //     nome: "Inception",
//   //     duracao: "2h 28min",
//   //     genero: "Ficção científica",
//   //     capa: "https://m.media-amazon.com/images/I/71iDkRVDZNL.jpg",
//   //   },
//   //   {
//   //     nome: "Interestelar",
//   //     duracao: "2h 49min",
//   //     genero: "Ficção científica",
//   //     capa: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._AC_SY741_.jpg",
//   //   },
//   //   {
//   //     nome: "Batman: O Cavaleiro das Trevas",
//   //     duracao: "2h 32min",
//   //     genero: "Ação",
//   //     capa: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
//   //   },
//   // ];

  
//   return (
//     <ThemedView style={[styles.container, { backgroundColor: "#f0f0f0" }]}>
//       <Header titulo={titulo} setTitulo={setTitulo} />

//       <ScrollView contentContainerStyle={styles.content}>
//         <ThemedText type="title" style={{ marginBottom: 10 }}>
//           Filmes em destaque
//         </ThemedText>

//         {/* Cards dos filmes */}
//         {filmes.map((filme, index) => (
//           <ThemedView key={index} style={styles.card}>
//             <Image source={{ uri: filme.capa }} style={styles.capa} />
//             <ThemedView style={styles.info}>
//               <ThemedText type="subtitle">{filme.nome}</ThemedText>
//               <ThemedText type="default">⏱ {filme.duracao}</ThemedText>
//               <ThemedText type="default">🎭 {filme.genero}</ThemedText>
//             </ThemedView>
//           </ThemedView>
//         ))}

//         {/* Link para outra página */}
//         <Link href="/formulario" style={styles.link}>
//           Ir para o Formulário
//         </Link>
//       </ScrollView>

//       <Footer rodape={rodape} setRodape={setRodape} />
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   card: {
//     width: "85%", // não ocupa toda a largura
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     marginVertical: 10,
//     flexDirection: "row",
//     overflow: "hidden",
//     elevation: 5, // sombra no Android
//     shadowColor: "#000", // sombra no iOS
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//   },
//   capa: {
//     width: 100,
//     height: 150,
//   },
//   info: {
//     flex: 1,
//     padding: 10,
//     justifyContent: "center",
//   },
//   link: {
//     marginTop: 20,
//     fontSize: 16,
//     color: "#007AFF",
//     textDecorationLine: "underline",
//   },
// });
