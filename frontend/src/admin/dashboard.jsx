import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./styleDashboard.css";

// --- IMPORT DAS ABAS ---
import CategoriesTab from "./tabs/categoriaTab"; 
import ProductsTab from "./tabs/productsTab";
import QrCodeTab from "./tabs/qrCodeTab"

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ativos');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // BUSCAR PEDIDOS
  async function fetchOrders() {
    try {
      const res = await fetch("http://localhost:3333/order");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
      setLoading(false);
    }
  }

  // FECHAR PEDIDO
  async function handleCloseOrder(id) {
    if(!confirm("Tem certeza que deseja encerrar este pedido?")) return;
    try {
      await fetch("http://localhost:3333/order/finish", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: id })
      });
      fetchOrders(); 
    } catch (error) {
      console.error("Erro ao fechar", error);
    }
  }

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // CÁLCULOS
  const activeOrders = orders.filter(o => !o.fechado);
  const historyOrders = orders.filter(o => o.fechado);

  const calculateTotal = (order) => {
    return order.Itens_Orders 
      ? order.Itens_Orders.reduce((acc, item) => acc + (item.precoUnit * item.quantidade), 0)
      : 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="admin-wrapper">
      
      <aside className="sidebar no-print">
        <div className="brand-title">MENU FACILE</div>
        <nav className="nav-group">
          <button className={`nav-item ${activeTab === 'ativos' ? 'active' : ''}`} onClick={() => setActiveTab('ativos')}>PEDIDOS ATIVOS</button>
          
          {/* AGORA É UM BOTÃO DE ABA, NÃO MAIS UM LINK */}
          <button className={`nav-item ${activeTab === 'qr' ? 'active' : ''}`} onClick={() => setActiveTab('qr')}>GERAR QR CODE</button>
          
          <button className={`nav-item ${activeTab === 'historico' ? 'active' : ''}`} onClick={() => setActiveTab('historico')}>HISTÓRICO</button>
          
          <div style={{height:1, background:'#E5E7EB', margin: '12px 0'}}></div>
          <span style={{fontSize: 11, color:'#9CA3AF', paddingLeft: 16, fontWeight:700, marginBottom:4}}>GESTÃO</span>
          
          <button className={`nav-item ${activeTab === 'categorias' ? 'active' : ''}`} onClick={() => setActiveTab('categorias')}>CATEGORIAS</button>
          <button className={`nav-item ${activeTab === 'produtos' ? 'active' : ''}`} onClick={() => setActiveTab('produtos')}>PRODUTOS</button>
        </nav>
      </aside>

      <main className="main-content">
        
        {activeTab !== 'categorias' && activeTab !== 'produtos' && activeTab !== 'qr' && (
            <div className="stats-container">
            <div className="stat-card">
                <h2 className="stat-number">{orders.length}</h2>
                <p className="stat-label">TOTAIS</p>
            </div>
            <div className="stat-card">
                <h2 className="stat-number" style={{color: '#10B981'}}>{activeOrders.length}</h2>
                <p className="stat-label">ABERTOS</p>
            </div>
            <div className="stat-card">
                <h2 className="stat-number" style={{color: '#6B7280'}}>{historyOrders.length}</h2>
                <p className="stat-label">FECHADOS</p>
            </div>
            </div>
        )}

        {/* --- RENDERIZAÇÃO DAS ABAS --- */}

        {/* 1. PEDIDOS ATIVOS */}
        {activeTab === 'ativos' && (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr><th>MESA / ID</th><th>ITENS</th><th>TOTAL</th><th style={{textAlign: 'right'}}>AÇÕES</th></tr>
              </thead>
              <tbody>
                {activeOrders.length === 0 ? (
                  <tr><td colSpan="4" className="empty-state">Nenhum pedido ativo.</td></tr>
                ) : (
                  activeOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className="table-info">
                          <span className="table-number">{order.mesa === 0 ? "BALCÃO" : `MESA ${order.mesa}`}</span>
                          <span className="order-id">#{order.id}</span>
                        </div>
                      </td>
                      <td><span className="items-count">{order.Itens_Orders?.length || 0} itens</span></td>
                      <td><strong className="price-text">R$ {calculateTotal(order).toFixed(2)}</strong></td>
                      <td style={{textAlign: 'right'}}>
                        <div className="action-buttons">
                          <button className="btn-icon view" onClick={() => setSelectedOrder(order)} title="Ver Detalhes">👁️‍🗨️</button>
                          <button className="btn-icon close" onClick={() => handleCloseOrder(order.id)} title="Encerrar">✔</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. HISTÓRICO */}
        {activeTab === 'historico' && (
          <div className="history-list">
             {historyOrders.length === 0 ? <p className="empty-state">Histórico vazio.</p> : historyOrders.map(order => (
                <div key={order.id} className="history-row" onClick={() => setSelectedOrder(order)}>
                    <div>
                        <strong>{order.mesa === 0 ? "Balcão" : `Mesa ${order.mesa}`}</strong>
                        <span style={{fontSize: 12, color: '#999', marginLeft: 8}}>{formatDate(order.date)} • #{order.id}</span>
                    </div>
                    <div>R$ {calculateTotal(order).toFixed(2)}</div>
                </div>
             ))}
          </div>
        )}

        {/* 3. GERADOR QR CODE */}
        {activeTab === 'qr' && <QrCodeTab />}

        {/* 4. CATEGORIAS */}
        {activeTab === 'categorias' && <CategoriesTab />}

        {/* 5. PRODUTOS */}
        {activeTab === 'produtos' && <ProductsTab />}

      </main>

      {/* --- MODAL DE DETALHES --- */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedOrder.mesa === 0 ? "Pedido Balcão" : `Mesa ${selectedOrder.mesa}`}</h2>
              <button className="close-modal" onClick={() => setSelectedOrder(null)}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-id">ID: {selectedOrder.id}</p>
              <ul className="modal-items-list">
                {selectedOrder.Itens_Orders?.map((item) => (
                  <li key={item.id_item} className="modal-item">
                    <div className="modal-item-qty">{item.quantidade}x</div>
                    <div className="modal-item-info">
                      <strong>{item.Product?.descricao || "Produto"}</strong>
                      {item.observacao && <p className="obs">Obs: {item.observacao}</p>}
                    </div>
                    <div className="modal-item-price">R$ {(item.precoUnit * item.quantidade).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
              <div className="modal-footer">
                <span>Total:</span><strong>R$ {calculateTotal(selectedOrder).toFixed(2)}</strong>
              </div>
            </div>
            {!selectedOrder.fechado && (
                <button className="modal-action-btn" onClick={() => { handleCloseOrder(selectedOrder.id); setSelectedOrder(null); }}>Encerrar Pedido Agora</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}