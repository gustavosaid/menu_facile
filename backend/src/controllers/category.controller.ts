import { Request, Response } from "express"
import { CategoryReturn, createCategoryService, ReadAllCategoryService,updateCategoryService,deleteCategoryService, ReadAllCategoryProductService } from "../services/category.service"
import { ProductReturn } from "../services/product.service"

//Grava dados
export const createCategoryController = async (req: Request,res:Response):Promise<Response> => {

    const newCategory: CategoryReturn = await createCategoryService(req.body)

    return res.status(201).json(newCategory)
}
 
//Ler dados
export const readAllCategoryController = async (req: Request,res:Response):Promise<Response> => {

    const categorys: CategoryReturn[] = await ReadAllCategoryService()
    return res.status(200).json(categorys)
}

//Traz a categoria e seus produtos relacionados
export const readProductCategoryController = async(req: Request, res:Response):Promise<Response> => {

    const { id } = req.params
    const products: ProductReturn[] = await ReadAllCategoryProductService(Number(id))
    return res.status(200).json(products)
    
}

//Atualiza
export const updateCategoryController = async(req: Request,res:Response):Promise<Response> => {

    const { id } = req.params

    const event: CategoryReturn = await updateCategoryService(Number(id),req.body)

    return res.status(200).json(event)
}

//delete 
export const DeleteCategoryController = async(req:Request, res: Response):Promise<Response> => {

    const { id } = req.params

    if( Number(id) != 1){
        try{
            const delCategory: CategoryReturn = await deleteCategoryService(Number(id))
            return res.status(200).json(delCategory)
        }catch(error){
            return res.status(500).json({ message: 'Erro ao deletar a categoria'});
        }

    }else{
        return res.status(403).json({message:'Não é permitido deletar esta categoria'}) //Retorno o erro 403 para nao deixar apagar o id === 1
    }

}
