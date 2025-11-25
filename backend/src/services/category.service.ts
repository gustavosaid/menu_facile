
import { prisma } from ".."

export interface CategoryCreate {
    descricao: string
}

export interface CategoryReturn extends CategoryCreate{
    id_Categoria:number
}

interface CategoryUpdate {
    descricao: string
}
 
//Grava um servico novo
export const createCategoryService = async({descricao}:CategoryCreate): Promise<CategoryReturn> => {
    const newCategory: CategoryReturn = await prisma.category.create({
        data:{
            descricao
        }
    })
    return newCategory
}

//Retorna todas as categorias
export const ReadAllCategoryService = async():Promise<CategoryReturn[]> => {
    return await prisma.category.findMany()
}

//Retorna produtos de uma determinada categoria
export const ReadAllCategoryProductService = async (id_Categoria: number): Promise<any[]> => {
  const categoryWithProducts = await prisma.category.findUnique({
    where: {
      id_Categoria: id_Categoria,
    },
    include: {
      Product: true, 
    },
  });

  if (!categoryWithProducts) {
    return []; 
  }

  return categoryWithProducts.Product;
};

//Atualiza uma determinada categoria
export const updateCategoryService = async(id_Categoria:number,data:CategoryUpdate):Promise<CategoryReturn> => {
    const category: CategoryReturn = await prisma.category.update({
        where:{
            id_Categoria
        },
        data
    })
    return category
}

//Bloquer para nao apagar a category sem categoria all

//when delet category => 
//update no tabela products para deixar o campo categoria null
// set category of all products default 

// chamar o update product setar eles na categoria geral

//Deleta categoria


export const deleteCategoryService = async (id_Categoria: number): Promise<CategoryReturn> => {

  const result = await prisma.$transaction(async (prisma) => {

    await prisma.product.updateMany({
      where: { id_categoria: id_Categoria },
      data: { id_categoria: 1 }, 
    });

    const category: CategoryReturn = await prisma.category.delete({
      where: { id_Categoria },
    });

    return category;
  });

  return result;
};