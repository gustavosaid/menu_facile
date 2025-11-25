import { prisma } from ".."

export interface OrderRequest {
    mesa: number;
    status: number;
}

export interface OrderResponse {
    id: number; 
    mesa: number;
    status: number;
    fechado: boolean;
    date: Date;
}

//Grava um pedido novo
export const createOrderService = async (data: OrderRequest): Promise<OrderResponse> => {

    const { mesa, status } = data;

    const newOrder = await prisma.order.create({
        data: {
            mesa,
            status,
            fechado: false 
        }
    });
    
    return newOrder;
}

//Listar todos os pedidos
export const readAllOrderService = async (): Promise<OrderResponse[]> => {
    return await prisma.order.findMany({
        
        orderBy:{
            date: 'desc'
                },
        include:{
            Itens_Orders:{
                include:{
                    Product:true
            }
            },
        }
    });
}

//Listar pedido por ID
export const readOrderByIdService = async (id: number): Promise<OrderResponse | null> => {
    return await prisma.order.findUnique({
        where: {
            id
        }
    });
}

//Atualizar status do pedido para finalizado
export const updateOrderService = async (id: number): Promise<OrderResponse | null> => {

    const existingOrder = await prisma.order.findUnique({
        where: {
            id
        }
    });

    if (!existingOrder) {
        return null;
    }

    return await prisma.order.update({
        where: {
            id
        },
        data: {
            status:4,
            fechado:true
        }
    });
}



