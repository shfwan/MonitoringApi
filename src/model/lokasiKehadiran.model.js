import prismaClient from "../app/database.js"

export const get = async () => {
    return await prismaClient.lokasiKehadiran.findMany()
}

export const getById = async (request) => {
    return await prismaClient.lokasiKehadiran.findFirst({
        where: {
            id: request.id
        }
    })
}

export const create = async (request) => {
    return await prismaClient.lokasiKehadiran.create({
        data: request
    })
}
