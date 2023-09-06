import prismaClient from "../app/database.js"
import { logger } from "../app/logging.js"
import { ResponseError } from "../error/response.error.js"
import { addSupirData, updateSupirData } from "../validation/supir.validation.js"
import { validate } from "../validation/validation.js"

const get = async () => {
    return await prismaClient.supir.findMany({
        include: {
            user: {
                include: {
                    userProfile: true
                }
            }
        }
    })
}

const getById = async (request) => {    
    const checkSupirInDatabase = await prismaClient.supir.count({
        where: {
            id: request.id
        }
    })
    
    if (checkSupirInDatabase !== 1) {
        throw new ResponseError(404, "Supir Not Found")
    }

    return await prismaClient.supir.findFirst({
        where: {
            id: request.id
        },
        include: {
            user: {
                include: {
                    userProfile: true
                }
            }
        }
    })
}

const create = async (request) => {
    const supir = validate(addSupirData, request)

    const totalSupirInDatabase = await prismaClient.supir.count({
        where: {
            name: request.name
        }
    })

    const data = {}
    
    if (totalSupirInDatabase === 1 ) {
        throw new ResponseError(409, "Conflict")
    }

    if (supir.name) {
        data.name = supir.name
        data.alamat = supir.alamat
        data.phoneNumber = supir.phoneNumber
    }

    return await prismaClient.supir.create({
        data: data,
        select: {
            id: true,
            name: true,
            alamat: true,
            phoneNumber: true,
        }
    })
}

const update = async (request) => {
    const totalSupirInDatabase = await prismaClient.supir.count({
        where: {
            id: request.id
        }
    })

    if (totalSupirInDatabase !== 1 ){
        throw new ResponseError(404, "Not Found")
    }

    return await prismaClient.supir.update({
        where: {
            id: request.id
        },
        data: request,
        select: {
            id: true,
            name: true,
            alamat: true,
            phoneNumber: true
        }
    })
}

const deleteModel = async (request) => {
    const supir = await getById(request)
    const user = await prismaClient.user.findFirst({
        where: {
            supirId: supir.id
        },
        select: true
    })
    const userProfile = await prismaClient.userProfile.findFirst({
        where: {
            userId: user.id
        },
        select: true
    })
    const kehadiran = await prismaClient.kehadiran.findFirst({
        where: {
            userProfileId: userProfile.id
        }, select: true
    })

    await prismaClient.kehadiran.deleteMany({
        where: {
            id: kehadiran.id
        }
    })

    await prismaClient.userProfile.delete({
        where: {
            id: userProfile.id
        }
    })
    
    await prismaClient.user.delete({
        where: {
            id: user.id
        }
    })
    
    return await prismaClient.supir.delete({
        where: {
            id: supir.id
        }
    })
}

export { 
    get,
    getById,
    create,
    update,
    deleteModel
}