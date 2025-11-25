import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home/App.jsx";
import Lista from "./pages/ListaVejaMais/Lista.jsx";
import Detalhes from "./pages/DetalhesProduto/Detalhes.jsx";
import Lancheira from "./pages/Lancheira/Lancheira.jsx";
import PedConf from "./pages/PedidoConfirmado/PedConf.jsx";
import Conta from "./pages/Conta/Conta.jsx";
import Pagamento from "./pages/SelecionarPagamento/Pagamento.jsx";
import { CartProvider } from './contexts/CardContent.jsx'
import { PrivateRoutes } from "./components/privateRoutes.jsx";

//Admin
import Dashboard from "./admin/dashboard.jsx";
import Login from "./pages/login/login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/lista/:categoria" element={<Lista />} />
          <Route path="/detalhes/:categoria/:id_Produto" element={<Detalhes />} />
          <Route path="/lancheira" element={<Lancheira />} />
          <Route path="/pedConf" element={<PedConf />} />
          <Route path="/conta" element={<Conta/>} />
          <Route path="/pagamento" element={<Pagamento/>} />
          {/* Rotas Admin */}
            <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);