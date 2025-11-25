
import { Product } from "@prisma/client"
import { prisma } from ".."

export interface ProductCreate {
    descricao: string
    preco: number
    id_categoria:number
    ingredientes: string
    foto?: string | null;
}

export interface ProductReturn extends ProductCreate{
    id_Produto:number
}

interface ProductUpdate {
    descricao: string
    preco: number
    id_categoria:number
    ingredientes: string
    foto: string
}


//Grava um Produto novo
export const createProductService = async({descricao,preco,id_categoria,ingredientes,foto}:ProductCreate): Promise<ProductReturn> => {
    const newProduct: ProductReturn = await prisma.product.create({
        data:{
            descricao,
            preco,
            id_categoria,
            ingredientes,
            foto
        }
    })
    return newProduct
}

//Pega todos os produtos
export const ReadAllProductService = async():Promise<ProductReturn[]> => {
    return await prisma.product.findMany()
}

//Buscando um produto
export const ReadOneProductService = async(id_Produto:number):Promise<Product> => {
    return await prisma.product.findUniqueOrThrow({
        where:{
            id_Produto
        }
    })
}

//Atualiza os produtos
export const updateProductService = async(id_Produto:number,data:ProductUpdate):Promise<ProductReturn> =>{
    const product: ProductReturn = await prisma.product.update({
        where:{
            id_Produto
        },
        data
    })
    return product
}


//Deleta algum produto
export const deleteProdutService = async(id_Produto:number):Promise<ProductReturn> => {
    const delProduct: ProductReturn = await prisma.product.delete({
        where:{
            id_Produto
        }
    })
    return delProduct
}