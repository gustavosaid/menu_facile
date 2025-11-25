import batata from "../assets/pictures/batata.png";
import hamburguer from "../assets/pictures/hamburguer.png";
import coca from "../assets/pictures/coca.png";


export const entradas = [
  {
    id: 1,
    name: "Batata Frita",
    price: "R$ 30,00",
    description: "Porção de 250g, crocante e salgadinha.",
    image: batata,
    ingredients: ["Batata selecionada", "Sal grosso", "Azeite", "Alecrim fresco"],
  },
  {
    id: 2,
    name: "Batata Frita",
    price: "R$ 28,00",
    description: "Porção de 250g, crocante e salgadinha.",
    image: batata,
    ingredients: ["Batata selecionada", "Sal grosso", "Azeite", "Alecrim fresco"],
  },
];

export const sanduiches = [
  {
    id: 1,
    name: "Bandido",
    price: "R$ 30,00",
    description:
      "Smash Burger crocante nas bordas, queijo derretido e maionese caseira.",
    image: hamburguer,
    ingredients: [
      "Pão artesanal de brioche",
      "Hambúrguer Smash de picanha",
      "Queijo coalho derretido",
      "Maionese caseira de alho e limão",
      "Molho de pimenta de cheiro com mel",
      "Cebola roxa caramelizada",
      "Folhas de rúcula",
    ],
  },
  {
    id: 2,
    name: "Zorrero",
    price: "R$ 30,00",
    description: "Smash Burger suculento com toque picante.",
    image: hamburguer,
    ingredients: [
      "Pão artesanal",
      "Hambúrguer de carne bovina",
      "Queijo cheddar",
      "Molho chipotle",
      "Cebola caramelizada",
      "Alface",
    ],
  },
  {
    id: 3,
    name: "Pequi",
    price: "R$ 30,00",
    description: "Smash Burger com toque regional de pequi.",
    image: hamburguer,
    ingredients: [
      "Pão artesanal",
      "Hambúrguer de carne bovina",
      "Queijo coalho",
      "Molho de pequi",
      "Alface",
      "Tomate",
    ],
  },
];

export const bebidas = [
  {
    id: 1,
    name: "Coca-Cola",
    price: "R$ 8,00",
    description: "Coca 2L geladinha.",
    image: coca,
    ingredients: ["Água gaseificada", "Açúcar", "Corante caramelo", "Cafeína"],
  },
  {
    id: 2,
    name: "Coca-Cola",
    price: "R$ 8,00",
    description: "Coca 2L geladinha.",
    image: coca,
    ingredients: ["Água gaseificada", "Açúcar", "Corante caramelo", "Cafeína"],
  },
];

export const productsData = {
  entradas,
  sanduiches,
  bebidas,
};
