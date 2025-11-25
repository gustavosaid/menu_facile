import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./style.css";

const App = () => {
  const [categorias, setCategorias] = useState([]);
  const [produtosPorCategoria, setProdutosPorCategoria] = useState({});
  const [loading, setLoading] = useState(true);
  
  // NOVO: Estado para guardar o texto da busca
  const [termoBusca, setTermoBusca] = useState("");

  // Componente ProductCard (Mantido igual, só simplifiquei pro exemplo)
  const ProductCard = ({ product, categoria }) => {
    const imageUrl = product.foto 
      ? `http://localhost:3333/uploads/${product.foto}` 
      : "/placeholder.png";

    return (
      <Link to={`/detalhes/${categoria}/${product.id_Produto}`} className="product-card-link">
        <div className="product-card">
          <div className="product-image-container">
             <img src={imageUrl} alt={product.descricao} className="product-image" />
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.descricao}</h3>
            <p className="product-price">R$ {product.preco}</p>
            <p className="product-description">{product.ingredientes}</p>
          </div>
        </div>
      </Link>
    );
  };

  // Componente Section atualizado para receber produtos filtrados
  const Section = ({ title, products, categoriaId }) => {
    // Se não tiver produtos (por causa do filtro), não mostra a seção
    if (products.length === 0) return null;

    return (
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">{title}</h2>
          </div>
          <Link to={`/lista/${categoriaId}`} className="see-more">
            Veja Mais <span className="arrow-right">›</span>
          </Link>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id_Produto}
              product={product}
              categoria={categoriaId}
            />
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const resCategorias = await fetch("http://localhost:3333/category");
        const categoriasData = await resCategorias.json();
        setCategorias(categoriasData);

        const produtosFetch = categoriasData.map(async (categoria) => {
          const resProdutos = await fetch(`http://localhost:3333/category/${categoria.id_Categoria}/product`);
          const produtos = await resProdutos.json();
          return { categoriaId: categoria.id_Categoria, produtos };
        });

        const produtosResults = await Promise.all(produtosFetch);
        const produtosMap = {};
        produtosResults.forEach(({ categoriaId, produtos }) => {
          produtosMap[categoriaId] = produtos;
        });

        setProdutosPorCategoria(produtosMap);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="app">
      {/* Passamos a função setTermoBusca para o Header.
          Tudo que digitar lá, vai atualizar o estado 'termoBusca' aqui.
      */}
      <Header onSearch={(texto) => setTermoBusca(texto)} />

      <main>
        {categorias.length > 0 ? (
          categorias.map((categoria) => {
            // 1. Pega os produtos dessa categoria
            const produtosDaCategoria = produtosPorCategoria[categoria.id_Categoria] || [];

            // 2. FILTRA os produtos com base no que foi digitado
            const produtosFiltrados = produtosDaCategoria.filter((produto) => 
              produto.descricao.toLowerCase().includes(termoBusca.toLowerCase())
            );

            // 3. Passa apenas os filtrados para a Section
            return (
              <Section
                key={categoria.id_Categoria}
                title={categoria.descricao}
                products={produtosFiltrados} // Passa a lista filtrada
                categoriaId={categoria.id_Categoria}
              />
            );
          })
        ) : (
          <p>Nenhuma categoria encontrada.</p>
        )}
      </main>
    </div>
  );
};

export default App;