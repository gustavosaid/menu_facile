import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Estado para guardar a mesa. Começa como 0 (Balcão/Sem mesa)
  const [tableNumber, setTableNumber] = useState(0);

  // Ao carregar a página, verifica se tem ?mesa=X na URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mesaUrl = params.get('mesa'); 
    
    if (mesaUrl) {
      const mesaNum = Number(mesaUrl);
      setTableNumber(mesaNum);
      // Salva no navegador para não perder se o cliente atualizar a página
      localStorage.setItem('mesa_id', mesaNum); 
    } else {
      // Se não tem na URL, tenta recuperar da memória
      const savedMesa = localStorage.getItem('mesa_id');
      if (savedMesa) setTableNumber(Number(savedMesa));
    }
  }, []);

  // --- FUNÇÕES DO CARRINHO ---
  const addItemToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id_Produto);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id_Produto
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          id: product.id_Produto,
          name: product.descricao,
          price: product.preco,
          image: product.foto ? `http://localhost:3333/uploads/${product.foto}` : "/placeholder.png",
          quantity: quantity
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const decreaseItemQuantity = (id) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const increaseItemQuantity = (id) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    tableNumber, // EXPORTANDO O NÚMERO DA MESA
    addItemToCart,
    removeItemFromCart,
    decreaseItemQuantity,
    increaseItemQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};