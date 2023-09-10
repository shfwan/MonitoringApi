import prismaClient from "../app/database.js"

export const get = async () => {
    return await prismaClient.lokasiKendaraan.findMany()
}

export const getById = async (request) => {
    return await prismaClient.lokasiKendaraan.findFirst({
        where: {
            id: request.id
        }
    })
}

export const create = async (request) => {
    return await prismaClient.lokasiKendaraan.create({
        data: request
    })
}

export const update = async (request) => {
    return await prismaClient.lokasiKendaraan.update({
        data: request
    })
}