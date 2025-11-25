import { useState, useEffect } from "react";

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Estados do Formulário
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); // Ingredientes
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null); // O arquivo bruto
  const [fileName, setFileName] = useState("Nenhum arquivo escolhido"); // Texto visual

  // 1. BUSCAR DADOS INICIAIS
  async function fetchData() {
    try {
      const [resProd, resCat] = await Promise.all([
        fetch("http://localhost:3333/product"),
        fetch("http://localhost:3333/category")
      ]);
      
      setProducts(await resProd.json());
      setCategories(await resCat.json());
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Função para pegar a imagem do input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
    }
  };

  // 2. CRIAR PRODUTO (Enviando como FormData)
  async function handleCreateProduct(e) {
    e.preventDefault();
    
    // Validação simples
    if (!name || !price || !categoryId || !image) {
      alert("Preencha todos os campos e selecione uma foto!");
      return;
    }

    try {
      // CRIA O PACOTE DE DADOS (Multipart)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category_id", categoryId);
      formData.append("file", image); // 'file' tem que bater com o nome na rota do backend

      const res = await fetch("http://localhost:3333/product", {
        method: "POST",
        // NÃO colocar Content-Type header aqui, o navegador faz automático para arquivos
        body: formData
      });

      if (res.ok) {
        alert("Produto cadastrado com sucesso!");
        // Limpa o formulário
        setName("");
        setPrice("");
        setDescription("");
        setCategoryId("");
        setImage(null);
        setFileName("Nenhum arquivo escolhido");
        
        // Limpa o input de arquivo visualmente (hackzinho do DOM)
        document.getElementById("file-upload").value = ""; 
        
        fetchData(); // Recarrega a lista
      } else {
        const errData = await res.json();
        alert(`Erro: ${errData.error || "Erro ao criar produto"}`);
      }
    } catch (error) {
      console.error("Erro", error);
      alert("Erro de conexão com o servidor");
    }
  }

  // 3. DELETAR PRODUTO
  async function handleDeleteProduct(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await fetch(`http://localhost:3333/product/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  }

  // Helper para mostrar nome da categoria
  const getCategoryName = (prod) => {
    const catId = prod.id_categoria || prod.categoriaId;
    const cat = categories.find(c => c.id_Categoria === catId);
    return cat ? cat.descricao : "Sem Categoria";
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2 className="section-title">Gestão de Produtos</h2>
        <p className="section-subtitle">Cadastre seus lanches, bebidas e porções.</p>
      </div>

      {/* FORMULÁRIO DE CADASTRO */}
      <div className="add-form-container">
        <form onSubmit={handleCreateProduct} className="product-form">
          
          <div className="form-row">
            <div className="form-group">
              <label>Nome do Produto</label>
              <input 
                type="text" className="form-input" placeholder="Ex: X-Bacon"
                value={name} onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Preço (R$)</label>
              <input 
                type="number" className="form-input" placeholder="0.00"
                value={price} onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoria</label>
              <select 
                className="form-input" 
                value={categoryId} onChange={e => setCategoryId(e.target.value)}
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map(cat => (
                  <option key={cat.id_Categoria} value={cat.id_Categoria}>
                    {cat.descricao}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Foto do Produto</label>
              <div className="file-input-wrapper">
                <label htmlFor="file-upload" className="file-input-label">
                  📁 {fileName}
                </label>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="file-input-hidden"
                  onChange={handleImageChange}
                  accept="image/*" // Aceita apenas imagens
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Ingredientes / Descrição</label>
            <textarea 
              className="form-input" rows="2" placeholder="Ex: Pão, hambúrguer, queijo..."
              value={description} onChange={e => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="form-btn full-width">
            CADASTRAR PRODUTO
          </button>
        </form>
      </div>

      {/* LISTA DE PRODUTOS CADASTRADOS */}
      <div className="products-list-grid">
        {products.map(prod => (
          <div key={prod.id_Produto} className="product-admin-card">
            
            <button 
              onClick={() => handleDeleteProduct(prod.id_Produto)} 
              className="btn-delete-floating" title="Excluir"
            >
              ✕
            </button>

            <img 
              // URL da imagem vinda do backend
              src={prod.foto ? `http://localhost:3333/uploads/${prod.foto}` : "/placeholder.png"} 
              alt={prod.descricao} 
              className="prod-admin-img"
            />
            
            <div className="prod-admin-info">
              <h4>{prod.descricao}</h4>
              <span className="prod-cat-badge">
                {getCategoryName(prod)}
              </span>
              <span className="prod-price">R$ {Number(prod.preco).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}