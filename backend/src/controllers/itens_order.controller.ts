import { Request, Response } from 'express'; // Importe Request e Response com letra maiúscula (Tipos)
import { createItemOrderService, listItemsByOrderService, CreateOrderItemsRequest } from '../services/itens_order.service';

//Criar itens do pedido
export const createItensOrderController = async (req: Request, res: Response) => {
    try {
        const itensOrderData: CreateOrderItemsRequest = req.body;
        
        const newItensOrder = await createItemOrderService(itensOrderData);
        
        return res.status(201).json(newItensOrder);
    } catch (error: any) { 
        return res.status(500).json({ 
            message: 'Erro ao criar item de pedido', 
            error: error.message 
        });
    }
}

//Listar itens do pedido por ID do pedido
export const readAllItensOrderController = async (req: Request, res: Response) => {
    try {
        const id_Pedido = Number(req.params.id_Pedido);
        if (isNaN(id_Pedido)) {
            return res.status(400).json({ message: "ID do pedido inválido" });
        }

        const itensOrders = await listItemsByOrderService({ id_Pedido });
        
        return res.status(200).json(itensOrders);
    } catch (error: any) {
        return res.status(500).json({ 
            message: 'Erro ao listar itens de pedido', 
            error: error.message 
        });
    }
}