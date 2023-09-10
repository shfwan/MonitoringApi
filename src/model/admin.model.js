import prismaClient from "../app/database.js"
import { ResponseError } from "../error/response.error.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from 'uuid'
import { validate } from "../validation/validation.js"
import { loginValidate } from "../validation/user.validation.js"

export const get = async () => {
    return await prismaClient.admin.findMany()
}

export const getById = async (request) => {
    const checkDataInDatabase = await prismaClient.admin.count({
        where: {
            id: request.id,
        }
    })
    
    if(checkDataInDatabase !== 1) {
        throw new ResponseError(404, "Admin Not Found")
    }
    
    return await prismaClient.admin.findFirst({
        where: {
            id: request.id
        },
        select: true
    })
}

export const loginAdmin = async (request) => {
    const loginRequest = validate(loginValidate, request)

    if (!loginRequest) {
        throw new ResponseError(401, "Password Wrong")
    }

    const checkUserInDatabase = await prismaClient.admin.count({
        where: {
            username: loginRequest.username,
        }
    })

    if (checkUserInDatabase !== 1 ) {
        throw new ResponseError(404, "Admin not registered")
    }

    const admin = await prismaClient.admin.findFirst({
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
    
    const isPasswordValid = await bcrypt.compare(loginRequest.password, admin.password)

    if(!isPasswordValid) {
        throw new ResponseError(401, "Password Wrong")
    }

    if(user.token !== null) {
        throw new ResponseError(400, "Admin already logged in")
    }
    
    return prismaClient.admin.update({
        where: {
            id: admin.id
        },
        data: {
            token: uuid().toString(),
        },
        select: {
            id: true,
            username: true,
            token: true
        }
    })
}

export const create = async (request) => {
    const password = bcrypt.hash(request.password, 10)
    request.password = password
    return await prismaClient.admin.create({
        where: {
            id: admin.id,
        },
        data: request,
        select: true
    })
}

export const update = async (request) => {
    const admin = await getById(request)
    return await prismaClient.admin.update({
        where: {
            id: admin.id,
        },
        data: request,
        select: true
    })
}

export const remove = async (request) => {
    const admin = await getById(request)

    await prismaClient.lokasi.delete({
        where: {
            authorId: admin.id
        }
    })

    await prismaClient.waktu.delete({
        where: {
            authorId: admin.id
        }
    })

    return await prismaClient.admin.delete({
        where: {
            id: admin.id,
        },
        select: true
    })
}