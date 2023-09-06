import prismaClient from "../app/database.js"

const get = async () => {
    return await prismaClient.recordKehadiran.findMany()
}

const getById = async (id) => {
    return await prismaClient.recordKehadiran.findMany({
        where: {
            id: id
        }
    })
}

export {
    get,
    getById,
}