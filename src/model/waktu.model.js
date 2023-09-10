import prismaClient from "../app/database.js"

export const get = async () => {
    return await prismaClient.waktu.findMany()
}

export const getById = async (request) => {
    return await prismaClient.waktu.findFirst({
        where: {
            id: request.id
        }
    })
}

export const create = async (request) => {
    return await prismaClient.waktu.create({
        data: request
    })
}

export const update = async (request) => {
    return await prismaClient.waktu.update({
        where: {
            authorId: request.id
        },
        data: request
    })
}

export const remove = async (request) => {
    return await prismaClient.waktu.remove({
        where: {
            authorId: request.id
        },
        data: request
    })
}