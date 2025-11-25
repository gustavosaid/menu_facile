import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./styleLancheira.css";
import { useCart } from "../../contexts/CardContent";

export default function Lancheira() {
  const navigate = useNavigate();
  const { 
    cartItems, 
    increaseItemQuantity, 
    decreaseItemQuantity, 
    removeItemFromCart,
    clearCart,
    tableNumber // Pegamos o número da mesa do Contexto
  } = useCart();

  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // --- FUNÇÃO QUE MANDA O PEDIDO PRO BACKEND ---
  async function handleFinishOrder() {
    if (cartItems.length === 0) return;

    setLoading(true);

    try {
      // 1. Define a mesa
      // Se 'tableNumber' for 0 ou null, envia 0 (Balcão/Sem mesa)
      const mesaFinal = tableNumber || 0;

      // 2. CRIAR O PEDIDO (POST /order)
      const orderRes = await fetch("http://localhost:3333/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mesa: mesaFinal, 
          status: 1 
        })
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        throw new Error(errorData.message || "Erro ao criar pedido");
      }
      
      const orderData = await orderRes.json();
      const orderId = orderData.id; 

      // 3. CRIAR OS ITENS (POST /itens-order)
      const itemsPayload = cartItems.map((item, index) => ({
        id_Produto: item.id,
        quantidade: item.quantity,
        precoUnit: item.price, 
        observacao: observation, 
        seq: String(index + 1) 
      }));

      const itemsRes = await fetch("http://localhost:3333/itens-order", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_Pedido: orderId,
          items: itemsPayload
        })
      });

      if (!itemsRes.ok) {
         throw new Error("Erro ao adicionar itens");
      }

      // 4. SUCESSO!
      clearCart(); 
      navigate("/pedConf"); 

    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao realizar o pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lancheira-page">
      <Header backTo="/" />

      <div className="lancheira-container">
        
        {/* Título Dinâmico: Mostra "MESA X" se tiver mesa, ou só "LANCHEIRA" */}
        <h2 className="lancheira-title">
            {tableNumber > 0 ? `MESA ${tableNumber}` : "LANCHEIRA"}
        </h2>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Sua lancheira está vazia.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img className="item-image" src={item.image} alt={item.name} />
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">R$ {item.price.toFixed(2)}</p>
                </div>

                <div className="item-quantity-control">
                  <button onClick={() => decreaseItemQuantity(item.id)} className="cart-qty-btn">-</button>
                  <span className="cart-qty-value">{item.quantity}</span>
                  <button onClick={() => increaseItemQuantity(item.id)} className="cart-qty-btn">+</button>
                </div>

                <button onClick={() => removeItemFromCart(item.id)} className="trash-button" title="Remover">
                    🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <div className="observation-section">
          <h3 className="observation-title">Alguma observação?</h3>
          <textarea
            placeholder="Ex. Tirar cebola, hambúrguer mal passado"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="observation-textarea"
            rows={3}
          />
        </div>

        <div className="total-section">
          <h2 className="total-text">TOTAL: R${total.toFixed(2)}</h2>
        </div>

        <Link to="/" className="add-items-button">
          + Adicionar mais itens
        </Link>
      </div>

      <div className="lancheira-footer">
        {cartItems.length > 0 ? (
          <button 
            onClick={handleFinishOrder} 
            className="order-button"
            disabled={loading} 
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "ENVIANDO..." : "FAZER PEDIDO"}
          </button>
        ) : (
          <span className="order-button" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            FAZER PEDIDO
          </span>
        )}
      </div>
    </div>
  );
}