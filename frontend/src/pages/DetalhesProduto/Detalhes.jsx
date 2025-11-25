import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import "./styleDetalhes.css";
import { useCart } from "../../contexts/CardContent";

export default function Detalhes() {
  const { categoria, id_Produto } = useParams();
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const res = await fetch(`http://localhost:3333/get/product/${id_Produto}`);
        if (!res.ok) throw new Error("Erro ao buscar produto");
        const data = await res.json();
        setProduto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduto();
  }, [id_Produto]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // --- MUDANÇA AQUI: Passamos a quantidade direto para o contexto ---
  const handleAddToCart = () => {
    addItemToCart(produto, quantity);
    navigate("/lancheira");
  };

  if (loading) return <div className="app-container"><Header backTo={`/lista/${categoria}`} /><p style={{padding:20}}>Carregando...</p></div>;
  if (error) return <div className="app-container"><Header backTo={`/lista/${categoria}`} /><p className="error" style={{padding:20}}>Erro: {error}</p></div>;
  if (!produto) return <div className="app-container"><Header backTo={`/lista/${categoria}`} /><p className="not-found" style={{padding:20}}>Produto não encontrado.</p></div>;

  const parseIngredientes = (ingredientes) => ingredientes ? ingredientes.split(",").map(i => i.trim()) : [];

  return (
    <div className="app-container">
      <Header backTo={`/lista/${categoria}`} />
      <div className="product-container">
        <div className="product-image-wrapper">
          <img className="product-image" src={produto.foto ? `http://localhost:3333/uploads/${produto.foto}` : "/placeholder.png"} alt={produto.descricao} />
        </div>
        <div className="product-details">
          <h1 className="product-title">{produto.descricao}</h1>
          <p className="product-price">R$ {produto.preco}</p>
          <p className="product-description">{produto.ingredientes}</p>
          
          {produto.ingredientes && (
            <div className="ingredients-section">
              <h2 className="ingredients-title">Ingredientes</h2>
              <ul className="ingredients-list">
                {parseIngredientes(produto.ingredientes).map((ing, index) => <li key={index}>{ing}</li>)}
              </ul>
            </div>
          )}

          <div className="actions-container">
            <div className="quantity-selector">
              <button onClick={decrement} className="qty-btn minus">-</button>
              <span className="qty-value">{quantity}</span>
              <button onClick={increment} className="qty-btn plus">+</button>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Adicionar à Lancheira</button>
          </div>
        </div>
      </div>
    </div>
  );
}