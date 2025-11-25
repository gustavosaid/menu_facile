import { prisma } from ".."

export interface StatusCreate{
    descricao:string
}

export interface StatusReturn extends StatusCreate{
    id_Status: Number
}

//Grava um status novo
export const createStatusService = async({descricao}:StatusCreate): Promise<StatusReturn> => {
    const newStatus: StatusReturn = await prisma.status.create({
        data:{
            descricao
        }
    })
    return newStatus
}

//Pegar todos os status
export const readAllStatusService = async():Promise<StatusReturn[]> => {
    return await prisma.status.findMany()
}

//Deleta Status
export const deleteStatusService = async(id_Status:number):Promise<StatusReturn> => {
    const delStatus: StatusReturn = await prisma.status.delete({
        where:{
            id_Status
        }
    })
    return delStatus
}

//Atualiza Status
export const updateStatusService = async(id:number,data:StatusReturn):Promise<StatusReturn> => {

    const exists = await prisma.status.findUnique({ where: { id_Status: id }})

     if (!exists) throw new Error("Status não encontrado");

    const updatedStatus: StatusReturn = await prisma.status.update({
        where:{
            id_Status: id
        },
        data:{
            descricao: data.descricao
        }
    })
    return updatedStatus
}   