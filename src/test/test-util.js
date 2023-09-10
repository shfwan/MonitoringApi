import prismaClient from "../app/database.js"
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export const createSupirData = async () => {
    return await prismaClient.supir.create({
        data: {
            name: "Ongko",
            alamat: "Galunggung",
            phoneNumber: "081218987160",
        }
    })
}

export const getAllSupirData = async () => {
    return await prismaClient.supir.findFirst()
}


export const getSupirDataByName = async () => {
    const supir = await getAllSupirData()
    return await prismaClient.supir.findFirst({
        where: {
            name: supir.name
        },
        select: {
            id: true,
            name: true,
            alamat: true,
            phoneNumber: true,
        }
    })
}

export const removeSupirDataByName = async () => {
    return await prismaClient.supir.deleteMany()
}

export const getUserByName = async () => {
    const supir = await getAllSupirData()
    return await prismaClient.user.findFirst({
        where: {
            supirId: supir.id,
            username: supir.name,
        },
        select: {
            id: true,
            username: true,
            password: true,
            role: true,
            token: true
        }
    })
}


export const register = async () => {
    const supir = await getAllSupirData()
    return await prismaClient.user.create({
        data: {
            supirId: supir.id,
            username: supir.name,
            password: await bcrypt.hash("Ongko123", 10)
        }
    })
}

export const logOut = async () => {
    const user = await getUserByName()
    return await prismaClient.user.update({
        where: {
            username: user.username
        },
        data: {
            token: null
        }
    })
}

export const removeUserDataByName = async () => {
    return await prismaClient.user.deleteMany()
}

export const removeUserProfile = async () => {
    return await prismaClient.userProfile.deleteMany()
}



