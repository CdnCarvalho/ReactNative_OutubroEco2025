// // components/Header.tsx
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useEffect, useState } from "react";
// // import { onAuthStateChanged, signOut } from "firebase/auth";
// // import { auth } from "@/config/firebaseConfig";
// import { router } from "expo-router";

// export function Header({ titulo }) {
//   const [usuario, setUsuario] = useState(null);

//   // Subscribes ao estado de autenticação (montagem do componente)
//   // onAuthStateChanged chama o callback sempre que o usuário loga/desloga.
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       // `user` será null, se ninguém estiver logado, ou será um objeto, se houver usuário
//       setUsuario(user);
//     });

//     // limpa o listener, quando o componente desmontar
//     return () => unsubscribe();
//   }, []);

//   // Função que trata o clique do botão
//   // Se contiver um usuário -> faz logout; se não -> vai para a tela de login.
//   const handlePress = async () => {
//     if (usuario) {
//       // se estiver logado, fazer logout
//       try {
//         await signOut(auth);
//         router.replace("/login");
//       } catch (erro) {
//         console.error("Erro ao sair:", erro);
//       }
//     } else {
//       // se não estiver logado, vai para a tela de login
//       router.replace("/login");
//     }
//   };

//   // Extrai apenas a parte antes do @ (nickname)
//   const nickname = usuario ? String(usuario.email).split("@")[0] : "";

//   return (
//     <View style={styles.header}>
//       <View style={styles.userArea}>
//         {/* Renderização explícita do nickname:
//             Mostra só se `usuario` EXISTIR  */}
//         {usuario ? (
//           <Text style={styles.nickname}>{nickname}</Text>
//         ) : (
//           <View />
//         )}

//         {/* Botão com a função handler no estilo condicional */}
//         <TouchableOpacity
//           onPress={handlePress}
//           style={[
//             styles.botao,
//             usuario ? styles.botaoSair : styles.botaoEntrar,  // css 
//           ]}
//         >
//           <Text style={styles.textoBotao}>{usuario ? "Sair" : "Entrar"}</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.tituloContainer}>
//         <Text style={styles.titulo}>{titulo}</Text>
//       </View>
//     </View>
//   );
// }

// /* === Estilos (mantive o seu CSS) === */
// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#020203ff", // grafite escuro
//     paddingTop: 80,
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#333",
//   },
//   userArea: {
//     position: "absolute",
//     right: 20,
//     top: 50,
//     alignItems: "center",
//   },
//   nickname: {
//     color: "#FFF",
//     fontSize: 12,
//     marginBottom: 5,
//   },
//   botao: {
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//     borderRadius: 7,
//   },
//   botaoEntrar: {
//     backgroundColor: "#007AFF",
//   },
//   botaoSair: {
//     backgroundColor: "#FF3B30",
//   },
//   textoBotao: {
//     color: "#FFF",
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   tituloContainer: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   titulo: {
//     color: "#FFF",
//     fontSize: 40,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });
