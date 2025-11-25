import { Link } from "react-router-dom";
import "./Header.css";

// Adicionamos a prop 'onSearch'
const Header = ({ backTo = null, onSearch }) => {
  return (
    <header className="header">
      {/* Botão voltar */}
      {backTo ? (
        <Link to={backTo} className="back-button">
          <span className="back-arrow">‹</span>
        </Link>
      ) : (
        <div className="back-button-placeholder" style={{width: 32}}></div> // Espaço vazio para alinhar se não tiver botão
      )}

      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Pesquisar produto..." 
          className="search-input"
          onChange={(e) => onSearch && onSearch(e.target.value)} 
        />
      </div>

      <Link to="/lancheira" className="cart-button">
        <span className="cart-icon">🛒</span>
      </Link>
    </header>
  );
};

export default Header;