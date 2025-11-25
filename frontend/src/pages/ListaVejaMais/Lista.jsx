import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import "./styleLista.css";

const Lista = () => {
  const { categoria  } = useParams();
  const [produto, setProdutos] = useState([]); // Inicializa como array vazio
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para controlar erros

  // Função para buscar os produtos da categoria
  async function fetchProductsDaCategoria() {
    try {
      const res = await fetch(`http://localhost:3333/category/${categoria}/product`);
      if (!res.ok) {
        throw new Error(`Erro ao buscar produtos: ${res.statusText}`);
      }
      const produtosData = await res.json();
      setProdutos(produtosData); // Atualiza o estado com os dados dos produtos
      setLoading(false);
    } catch (error) {
      setError(error.message); // Caso haja algum erro
    }
  }

  // Usar useEffect para buscar os produtos quando a categoria mudar
  useEffect(() => {
    fetchProductsDaCategoria(); // Chama a função para buscar os dados do produto
  }, [categoria]);

  // Exibição de carregamento
  if (loading) {
    return (
      <div className="app-container">
        <Header backTo={`/lista/${categoria}`} />
        <p>Carregando...</p>
      </div>
    );
  }

  // Se houve erro na requisição
  if (error) {
    return (
      <div className="app-container">
        <Header backTo={`/lista/${categoria}`} />
        <p className="error">Erro ao carregar os produtos: {error}</p>
      </div>
    );
  }

return (
    <div className="lista-page"> 
      <Header backTo="/" />
      <main className="lista-container">
        
        <div className="lista-items-wrapper"> 
          {produto.map((prod) => (
            <div key={prod.id_Produto} className="lista-item-row"> 
              
              {/* MUDANÇA AQUI:
                A imagem (img) agora é o primeiro item, 
                sem uma div em volta dela.
              */}
              <img
                className="lista-item-image"
                src={prod.foto ? `http://localhost:3333/uploads/${prod.foto}` : "/placeholder.png"}
                alt={prod.descricao}
              />
              
              {/* Info no meio */}
              <div className="lista-item-info-col">
                <h3 className="lista-item-name">{prod.descricao}</h3>
                <p className="lista-item-price">R$ {prod.preco}</p>
              </div>
              
              {/* Botão à direita */}
              <Link
                to={`/detalhes/${categoria}/${prod.id_Produto}`}
                className="lista-item-button"
              >
                Detalhes
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


export default Lista;
