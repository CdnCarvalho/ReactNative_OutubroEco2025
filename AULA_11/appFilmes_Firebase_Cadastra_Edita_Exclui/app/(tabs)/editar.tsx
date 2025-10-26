import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB27juMVsvBBU45bvODUuFZ-zIvgwvCLFU",
  authDomain: "filmesapp-6adfd.firebaseapp.com",
  projectId: "filmesapp-6adfd",
  storageBucket: "filmesapp-6adfd.firebasestorage.app",
  messagingSenderId: "646556067415",
  appId: "1:646556067415:web:79d58356c302f8fe05a512",
  measurementId: "G-8QRHJ2MCK7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ListaFilmes() {
  const [filmes, setFilmes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [dadosEditados, setDadosEditados] = useState({});

  // === BUSCA OS FILMES ===
  useEffect(() => {
    async function buscarFilmes() {
      const querySnapshot = await getDocs(collection(db, "filmes"));
      const lista = querySnapshot.docs.map((docSnap) => {
        const dados = docSnap.data();
        return {
          id: docSnap.id,
          nome: dados.nome || dados.Nome || "—",
          genero: dados.genero || dados.Genero || "—",
          duracao: dados.duracao || dados.Duracao || "—",
          poster: dados.poster || dados.Capa || "",
        };
      });
      setFilmes(lista);
    }

    buscarFilmes();
  }, []);

  // === FUNÇÃO EXCLUIR ===
  async function excluirFilme(id) {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este filme?");
    if (!confirmacao) return;

    try {
      await deleteDoc(doc(db, "filmes", id));
      setFilmes((prev) => prev.filter((f) => f.id !== id));
      alert("🎬 Filme excluído com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir filme:", erro);
      alert("❌ Ocorreu um erro ao excluir o filme.");
    }
  }

  // === FUNÇÃO EDITAR / SALVAR ===
  async function editarOuSalvarFilme(id) {
    if (editandoId === id) {
      // SALVAR NO FIRESTORE
      try {
        const ref = doc(db, "filmes", id);

        // Envia para o Firestore respeitando os campos originais
        await updateDoc(ref, {
          Nome: dadosEditados.nome,
          Genero: dadosEditados.genero,
          Duracao: dadosEditados.duracao,
          Capa: dadosEditados.poster,
        });

        // Atualiza também no estado local
        setFilmes((prev) =>
          prev.map((f) => (f.id === id ? { ...f, ...dadosEditados } : f))
        );

        setEditandoId(null);
        setDadosEditados({});
        alert("✅ Filme atualizado com sucesso no Firestore!");
      } catch (erro) {
        console.error("Erro ao atualizar:", erro);
        alert("❌ Erro ao salvar alterações no Firestore.");
      }
    } else {
      // ENTRAR EM MODO DE EDIÇÃO
      const filmeSelecionado = filmes.find((f) => f.id === id);
      setEditandoId(id);
      setDadosEditados(filmeSelecionado);
    }
  }

  // === CAPTURA ALTERAÇÕES NOS CAMPOS ===
  function handleChange(campo, valor) {
    setDadosEditados((prev) => ({ ...prev, [campo]: valor }));
  }

  // === INTERFACE ===
  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>🎬 Lista de Filmes</h2>

      <div style={styles.scrollContainer}>
        <table style={styles.tabela}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Gênero</th>
              <th style={styles.th}>Duração</th>
              <th style={styles.th}>Poster</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.length > 0 ? (
              filmes.map((filme) => (
                <tr key={filme.id}>
                  {/* Nome */}
                  <td style={styles.td}>
                    {editandoId === filme.id ? (
                      <input
                        type="text"
                        value={dadosEditados.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                        style={styles.input}
                      />
                    ) : (
                      filme.nome
                    )}
                  </td>

                  {/* Gênero */}
                  <td style={styles.td}>
                    {editandoId === filme.id ? (
                      <input
                        type="text"
                        value={dadosEditados.genero}
                        onChange={(e) => handleChange("genero", e.target.value)}
                        style={styles.input}
                      />
                    ) : (
                      filme.genero
                    )}
                  </td>

                  {/* Duração */}
                  <td style={styles.td}>
                    {editandoId === filme.id ? (
                      <input
                        type="text"
                        value={dadosEditados.duracao}
                        onChange={(e) => handleChange("duracao", e.target.value)}
                        style={styles.input}
                      />
                    ) : (
                      filme.duracao
                    )}
                  </td>

                  {/* Poster */}
                  <td style={styles.td}>
                    {editandoId === filme.id ? (
                      <input
                        type="text"
                        value={dadosEditados.poster}
                        onChange={(e) => handleChange("poster", e.target.value)}
                        style={styles.input}
                        placeholder="URI da imagem"
                      />
                    ) : filme.poster ? (
                      <img
                        src={filme.poster}
                        alt={filme.nome}
                        style={styles.imagem}
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Botões */}
                  <td style={styles.td}>
                    <button
                      style={styles.btnEditar}
                      onClick={() => editarOuSalvarFilme(filme.id)}
                    >
                      {editandoId === filme.id ? "Salvar" : "Editar"}
                    </button>
                    <button
                      style={styles.btnExcluir}
                      onClick={() => excluirFilme(filme.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.vazio}>
                  Nenhum filme encontrado no Firestore.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// === ESTILOS ===
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1e1f22",
    minHeight: "100vh",
  },
  titulo: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#ffffff",
  },
  scrollContainer: {
    overflowX: "auto",
    maxWidth: "100%",
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    padding: 10,
    scrollbarWidth: "thin",
    scrollbarColor: "#555 #1C1C1C",
  },
  tabela: {
    minWidth: 600,
    borderCollapse: "collapse",
    width: "100%",
  },
  thead: {
    backgroundColor: "#2b2d31",
  },
  th: {
    backgroundColor: "#333",
    color: "#FFF",
    padding: 12,
    textAlign: "left",
    borderBottom: "2px solid #444",
  },
  td: {
    padding: 10,
    color: "#DDD",
    borderBottom: "1px solid #333",
  },
  imagem: {
    width: "70px",
    borderRadius: "8px",
  },
  input: {
    width: "100%",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #666",
    backgroundColor: "#2b2d31",
    color: "#fff",
  },
  btnEditar: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "6px",
  },
  btnExcluir: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  vazio: {
    textAlign: "center",
    color: "#bbb",
    padding: "20px",
  },
};
