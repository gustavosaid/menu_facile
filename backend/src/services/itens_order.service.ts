import { prisma } from ".."

interface ItemDTO {
    id_Produto: number;
    quantidade: number;
    observacao?: string;
    precoUnit: number;
    seq: string;
}

export interface CreateOrderItemsRequest {
    id_Pedido: number;
    items: ItemDTO[];
}

export interface ItemRequest {
    id_Pedido: number;
}

//Criar itens do pedido
export const createItemOrderService = async (data: CreateOrderItemsRequest) => {
    const { id_Pedido, items } = data;

    if (!items || items.length === 0) {
        throw new Error("A lista de itens está vazia.");
    }

    const hasInvalidQuantity = items.some(item => item.quantidade <= 0);
    if (hasInvalidQuantity) {
        throw new Error("Todos os itens devem ter quantidade maior que zero.");
    }

    const itemsFormatted = items.map(item => ({
        id_Pedido: id_Pedido,      
        produto: item.id_Produto,  
        quantidade: item.quantidade,
        precoUnit: item.precoUnit,
        observacao: item.observacao || "", 
        seq: item.seq
    }));

    const createdItems = await prisma.itens_Orders.createMany({
        data: itemsFormatted
    });

    return createdItems;
}

//Listar itens do pedido por 
export const listItemsByOrderService = async ({ id_Pedido }: ItemRequest) => {

    const items = await prisma.itens_Orders.findMany({
        where: {
            id_Pedido: id_Pedido
        },
        include: {
            Product: {
                select: {
                    descricao: true,
                }
            }
        }
    })

    return items;
}