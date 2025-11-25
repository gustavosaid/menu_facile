"use client"
import { Link } from "react-router-dom";
import "./stylePagamento.css"

export default function Pagamento() {
  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        {/* Header */}
        <h1 className="payment-header">SELECIONAR PAGAMENTO</h1>

        {/* Payment Options */}
        <div className="payment-options">
          <Link to="/pagamento/credito" className="payment-button">
            CRÉDITO
          </Link>

          <Link to="/pagamento/debito" className="payment-button">
            DÉBITO
          </Link>

          <Link to="/pagamento/pix" className="payment-button">
            PIX
          </Link>

          <Link to="/pagamento/dinheiro" className="payment-button">
            DINHEIRO
          </Link>

          {/* Botão voltar ao menu */}
          <Link to="/" className="payment-button back-button">
            VOLTAR AO MENU
          </Link>
        </div>
      </div>
    </div>
  )
}
