import { useState } from "react";
import { Link } from "react-router-dom";
import "./styleConta.css";

export default function Conta() {
  // Estado com itens da conta (pode ser vazio ou preenchido)
  const [contaItems, setContaItems] = useState([]);

  // Total calculado de forma segura
  const total = contaItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="conta-page">
      <div className="conta-container">
        <h2 className="conta-title">Minha conta</h2>

        {/* Lista de itens */}
        <div className="conta-items">
          {contaItems.length === 0 ? (
            <p className="empty-conta">Sua conta está vazia.</p>
          ) : (
            contaItems.map((item) => (
              <div key={item.id || Math.random()} className="conta-item">
                <img
                  className="item-image"
                  src={item.image || "https://via.placeholder.com/64"}
                  alt={item.name || "Produto"}
                />
                <div className="item-details">
                  <h3 className="item-name">{item.name || "Produto"}</h3>
                  <p className="item-price">
                    R${(item.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        <div className="total-section">
          <h2 className="total-text">TOTAL: R${total.toFixed(2)}</h2>
        </div>

        {/* Botões */}
        <div className="action-buttons">
          <Link to="/" className="add-items-button">
            Voltar ao Menu
          </Link>

          <Link to="/pagamento" className="order-button">
            Escolher Método de Pagamento
          </Link>
        </div>
      </div>
    </div>
  );
}
