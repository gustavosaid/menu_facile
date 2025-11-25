import { useState, useEffect } from "react";
import "../styleDashboard.css"; // Reaproveita o CSS do Dashboard

export default function CategoriesTab() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. BUSCAR CATEGORIAS
  async function fetchCategories() {
    try {
      const res = await fetch("http://localhost:3333/category");
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. CRIAR CATEGORIA
  async function handleAddCategory(e) {
    e.preventDefault();
    if (!newCategoryName) return;

    try {
      const res = await fetch("http://localhost:3333/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descricao: newCategoryName }) // Verifique se seu backend espera 'name' ou 'descricao'
      });

      if (res.ok) {
        setNewCategoryName(""); // Limpa o input
        fetchCategories(); // Atualiza a lista
      } else {
        alert("Erro ao criar categoria");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 3. DELETAR CATEGORIA
  async function handleDeleteCategory(id) {
    if (!confirm("Tem certeza? Isso pode afetar produtos dessa categoria.")) return;

    try {
      await fetch(`http://localhost:3333/category/${id}`, {
        method: "DELETE"
      });
      fetchCategories();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  }

  return (
    <div className="tab-content">
      <h2 className="section-title">Gestão de Categorias</h2>

      {/* Formulário de Adicionar */}
      <div className="add-form-container">
        <form onSubmit={handleAddCategory} className="simple-form">
          <input 
            type="text" 
            placeholder="Nome da nova categoria (Ex: Bebidas)" 
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-btn">
            + ADICIONAR
          </button>
        </form>
      </div>

      {/* Lista de Categorias */}
      <div className="categories-list">
        {categories.length === 0 ? (
          <p className="empty-state">Nenhuma categoria cadastrada.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id_Categoria} className="category-card">
              <span className="category-name">{cat.descricao || cat.name}</span>
              <div className="category-actions">
                <span className="product-count">
                   {/* Se seu backend trouxer a contagem de produtos, mostre aqui */}
                   ID: {cat.id_Categoria}
                </span>
                <button 
                  onClick={() => handleDeleteCategory(cat.id_Categoria)} 
                  className="btn-icon close"
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}