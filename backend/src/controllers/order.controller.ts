import {request, response} from 'express';
import { createOrderService, readAllOrderService, readOrderByIdService, OrderRequest, updateOrderService } from '../services/order.service';

//Criar um novo pedido
export const createOrderController = async (req = request, res = response) => {

    try{

        const orderData: OrderRequest = req.body;
        const newOrder = await createOrderService(orderData);
        return res.status(201).json(newOrder);

    } catch (error) {

        return res.status(500).json({message: 'Erro ao criar pedido', error});

    }
}

//Listar todos os pedidos
export const readAllOrderController = async (req = request, res = response) => {

    try {
        const orders = await readAllOrderService();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({message: 'Erro ao listar pedidos', error});
    }
}

//Listar pedido por ID
export const readOrderByIdController = async (req = request, res = response) => {
    try {
        const id = Number(req.params.id);
        const order = await readOrderByIdService(id);
        if (!order) {
            return res.status(404).json({message: 'Pedido não encontrado'});
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({message: 'Erro ao buscar pedido', error});
    }
}

//Atualizar status do pedido
export const updateOrderController = async (req = request, res = response) => {
    try {

        const { order_id } = req.body;
        const id = Number(order_id);

        if (!id) {
            return res.status(400).json({ message: 'ID do pedido é obrigatório' });
        }

        const updatedOrder = await updateOrderService(id);

        if (!updatedOrder) {
            return res.status(404).json({message: 'Pedido não encontrado'});
        }
        
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json({message: 'Erro ao atualizar pedido', error});
    }
}

