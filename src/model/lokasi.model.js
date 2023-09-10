import prismaClient from "../app/database.js"

export const get = async () => {
    return await prismaClient.lokasi.findMany()
}

export const getById = async (request) => {
    return await prismaClient.lokasi.findFirst({
        where: {
            id: request.id
        }
    })
}

export const create = async (request) => {
    return await prismaClient.lokasi.create({
        data: request
    })
}

export const update = async (request) => {
    return await prismaClient.lokasi.update({
        where: {
            authorId: request.id
        },
        data: request
    })
}

export const remove = async (request) => {
    return await prismaClient.lokasi.delete({
        where: {
            authorId: request.id
        },
        data: request
    })
}
