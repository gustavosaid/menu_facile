import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styleLogin.css"; // Vamos criar o CSS logo abaixo

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      // Ajuste a rota conforme seu backend (/login ou /session)
      const response = await fetch("http://localhost:3333/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      // --- AQUI É O PULO DO GATO ---
      // Salvamos o token no navegador do usuário
      localStorage.setItem("@menufacile:token", data.token);
      localStorage.setItem("@menufacile:user", JSON.stringify(data.name));

      // Redireciona para o Admin
      navigate("/admin");

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">MENU FACILE</h1>
        <p className="login-subtitle">Acesso Administrativo</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" 
              placeholder="admin@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="login-btn">ENTRAR</button>
        </form>
      </div>
    </div>
  );
}