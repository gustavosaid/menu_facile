//Todas as rotas
import { Router } from "express";
import { createCategoryController, DeleteCategoryController, readAllCategoryController, readProductCategoryController, updateCategoryController } from "../controllers/category.controller";
import { createProductController, deleteProductController, readAllProductController, readOneProductController, updateProductController } from "../controllers/product.controller";
import { createStatusController, deleteStatusController, realAllStatusController, updateStatusController } from "../controllers/status.controller";
import { createItensOrderController, readAllItensOrderController } from "../controllers/itens_order.controller";
import { createOrderController, readAllOrderController, readOrderByIdController,updateOrderController } from "../controllers/order.controller";


import multer from "multer";
import uploadConfig from "../config/multer"; // Importe a config que criamos

import { authUserController, createUserController } from "../controllers/user.controller";

export const routes: Router = Router()

const upload = multer(uploadConfig);

//Rotas do category
routes.post('/category',createCategoryController)
routes.get('/category',readAllCategoryController)
routes.patch('/category/:id',updateCategoryController)
routes.delete('/category/:id',DeleteCategoryController)
routes.get('/category/:id/product',readProductCategoryController)

//Products
//routes.post('/product',createProductController)
routes.post('/product', upload.single('file'), createProductController);
routes.get('/product',readAllProductController)
routes.patch('/product/:id',updateProductController)
routes.delete('/product/:id',deleteProductController)
routes.get('/get/product/:id',readOneProductController)

//Status
routes.post('/status',createStatusController)
routes.get('/status',realAllStatusController)
routes.delete('/status/:id',deleteStatusController)
routes.put('/status/:id',updateStatusController)

//Itens do pedido
routes.post('/itens-order',createItensOrderController)
routes.get('/itens-order/:id_Pedido',readAllItensOrderController)

//Orders
routes.post('/order',createOrderController)
routes.get('/order',readAllOrderController)
routes.get('/order/:id',readOrderByIdController)
routes.put('/order/finish',updateOrderController)

//Login
routes.post('/login', authUserController); 
routes.post('/users', createUserController);