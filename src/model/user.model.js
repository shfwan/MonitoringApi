import prismaClient from "../app/database.js"
import { ResponseError } from "../error/response.error.js"
import { checkLoginPhoneNumber, registerValidate, loginValidate, updatePasswordValidate } from "../validation/user.validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"
import imagesRandom from "../../assets/images.js"
import {v4 as uuid} from 'uuid'
import { logger } from "../app/logging.js"

const get = async () => {
    return await prismaClient.user.findMany()
}

const getById = async (request) => {
    const checkUserInDatabase = await prismaClient.user.count({
        where: {
            username: request.username
        }
    })

    if (checkUserInDatabase !== 1) {
        throw new ResponseError(404, "User not found")
    }
    return await prismaClient.user.findFirst({
        where: {
            username: request.username
        },
        select: {
            id:true,
            username: true,
            password: true
        }
    })
}

const register = async (request) => {
    const user = validate(registerValidate, request)
    
    const checkUserInDatabase = await prismaClient.user.findFirst({
        where: {
            username: request.username,
        },
        select: {
            id: true
        }
    })

    return await prismaClient.user.update({
        where: {
            id: checkUserInDatabase.id,
        },
        data: {
            password: await bcrypt.hash(user.password, 10),
            token: uuid().toString(),
            userProfile: {
                create: {
                    foto: `/assets${imagesRandom}`
                }
            }
        },
        select: {
            id: true,
            username: true,
            password: true,
            token: true
        }
    })

}

const deleteModel = async (request) => {
    const user = await getById(request)
    return await prismaClient.user.delete({
        where: {
            id: user.id
        }
    })
}

const checkPhoneNumber = async (request) => {
    const phoneNumber = validate(checkLoginPhoneNumber, request)

    if(!phoneNumber) {
        throw new ResponseError(400, "Invalid phone number")
    }

    const totalSupirInDatabase = await prismaClient.supir.count({
        where: {
            phoneNumber: request.phoneNumber
        }
    })

    if (totalSupirInDatabase !== 1) {
        throw new ResponseError(404, "Phone Number Not Registered")
    }
    
    const findPhoneNumber = await prismaClient.supir.findFirst({
        where: {
            phoneNumber: request.phoneNumber
        },
        select: {
            id: true,
            name: true
        }
    })

    const checkUserRegistered = await prismaClient.user.count({
        where: {
            supirId: findPhoneNumber.id
        }
    })

    if (checkUserRegistered !== 1) {
        return await prismaClient.user.create({
            data: {
                supirId: findPhoneNumber.id,
                username: findPhoneNumber.name,
                password: null,
                
            }
        })
    }


    return await prismaClient.user.findFirst({
        where: {
            supirId: findPhoneNumber.id
        },
        select: {
            id: true,
            username: true,
            password: true,
        }
    })
}

const login = async (request) => {
    const loginRequest = validate(loginValidate, request)

    if (!loginRequest) {
        throw new ResponseError(401, "Password Wrong")
    }

    const checkUserInDatabase = await prismaClient.user.count({
        where: {
            username: loginRequest.username,
        }
    })

    logger.info(`status : ${checkUserInDatabase}`)

    if (checkUserInDatabase !== 1 ) {
        throw new ResponseError(404, "User not registered")
    }

    const user = await prismaClient.user.findFirst({
        where: {
            username: loginRequest.username
        },
        select: {
            id: true,
            username: true,
            password: true,
            token: true
        }
    })
    
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

    if(!isPasswordValid) {
        throw new ResponseError(401, "Password Wrong")
    }

    if(user.token !== null) {
        throw new ResponseError(400, "User already logged in")
    }
    
    return prismaClient.user.update({
        where: {
            id: user.id
        },
        data: {
            token: uuid().toString(),
        },
        select: {
            id: true,
            token: true
        }
    })
}

const logOut = async (request) => {
    const checkTokenExist = await prismaClient.user.count({
        where: {
            id: request.id,
            token: request.token
        }
    })

    if (checkTokenExist !== 1) {
        throw new ResponseError(404, "Your not allowed")
    }
    logger.info(request)
    return await prismaClient.user.update({
        where: {
            id: request.id,
        },
        data: {
            token: null,
            updatedAt: null
        },
        select: {
            id: true,
            token: true
        }
    })
}

const updatePassword = async (request) => {
    const user = await validate(updatePasswordValidate, request)
    
    if(!user) {
        throw new ResponseError(400,"Max password length 255")
    }

    return await prismaClient.user.update({
        where: {
            id: request.id
        },
        data: {
            password: await bcrypt.hash(user.password,10)
        }
    })
}

export {
    get,
    getById,
    deleteModel,
    register,
    login,
    logOut,
    checkPhoneNumber,
    updatePassword
}