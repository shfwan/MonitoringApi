import prismaClient from "../app/database.js"
import { ResponseError } from "../error/response.error.js"

const get = async () => {
    return await prismaClient.userProfile.findMany({
        include: {
            user: true
        }
    })
}

const getById = async (request) => {
    const checkSupirInDatabase = await prismaClient.userProfile.count({
        where: {
            id: request.id
        }
    })

    if (checkSupirInDatabase !== 1) {
        throw new ResponseError(404,"User Profile Not Found")
    }

    return await prismaClient.userProfile.findFirst({
        where: {
            id: request.id
        }, 
        select: {
            id: true,
            bio: true,
            foto: true,
            user: {
                include: {
                    supir: {
                        include: true
                    }
                }
            },
            kehadiran: true
        }
    })
}

const update = async (request) => {
    const response = await getById(request)
    return await prismaClient.userProfile.update({
        where: {
            id: response.id
        },
        data: request,
        select: {
            id: true,
            userId: true,
            foto: true,
            bio: true,
        }
    })
}

export {
    get,
    getById,
    update,
}