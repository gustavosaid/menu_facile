
import { Request, Response } from "express"
import { createProductService,deleteProdutService,ProductReturn, ReadAllProductService,ReadOneProductService,updateProductService  } from "../services/product.service"


export const createProductController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "A foto do produto é obrigatória" });
        }

        const { filename: banner } = req.file;
        const { name, price, description, category_id } = req.body;

        const product = await createProductService({
            descricao: name,
            preco: Number(price),          
            ingredientes: description,
            id_categoria: Number(category_id), 
            foto: banner 
        });

        return res.status(201).json(product);

    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Erro ao adicionar o produto' });
    }
}


 
//Pega todos os produtos
export const readAllProductController = async(req: Request, res:Response):Promise<Response> => {
    
    try{
        const products: ProductReturn[] = await ReadAllProductService()
        return res.status(200).json(products)
    }catch(error){
        return res.status(500).json({message:'Erro ao buscar os produto'})
    }

}
 
//Pega um produto
export const readOneProductController = async(req:Request,res:Response):Promise<Response> => {

    const {id} = req.params
    
    try{
        const product: ProductReturn = await ReadOneProductService(Number(id))
        return res.status(200).json(product)
    }catch(error){
        return res.status(500).json({message:'Erro ao buscar este produto especifico'})
    }

}

//Atualiza os produtos
export const updateProductController = async(req:Request,res:Response):Promise<Response> => {

    const {id} = req.params

    try{
        const product: ProductReturn = await updateProductService(Number(id),req.body)
        return res.status(200).json(product)
    }catch(error){
        return res.status(500).json({message:'Erro ao atualizar o produto'})
    }

}

//Deleta produto
export const deleteProductController = async(req:Request,res:Response):Promise<Response> => {

    const { id } = req.params

    try{
        const product: ProductReturn = await deleteProdutService(Number(id))
        return res.status(200).json(product)
    }catch(error){
        return res.status(500).json({message:'Erro ao deletar o produto'})
    }
    
}
