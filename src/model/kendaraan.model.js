import prismaClient from "../app/database.js"
import { ResponseError } from "../error/response.error.js"

export const get = async () => {
    return await prismaClient.kendaraan.findMany({
        include: {
            lokasiKendaraan: true
        }
    })
}
export const getById = async (request) => {
    const checkDataInDatabase = await prismaClient.kendaraan.count({
        where: {
            id: request.id
        }
    })
    
    if(checkDataInDatabase !== 1) {
        throw new ResponseError(404, "Kendaraan not found")
    }
    
    return await prismaClient.kendaraan.findFirst({
        where: {
            id: request.id
        },
        select: true
    })
}

export const create = async (request) => {
    
    const totalKendaraanInDatabase = await prismaClient.kendaraan.count({
        where: {
            platNomor: request.platNomor
        }
    })

    
    if (totalKendaraanInDatabase === 1 ) {
        throw new ResponseError(409, "Plat Nomor sudah terdaftar")
    }

    return await prismaClient.kendaraan.create({
        data: request,
        select: true
    })
}

export const update = async (request) => {
    const kendaraan = await getById(request)

    return await prismaClient.kendaraan.update({
        where: {
            id: kendaraan.id,
        },
        data: request,
        select: true
    })
}

export const remove = async (request) => {
    const kendaraan = await getById(request)

    await prismaClient.lokasiKendaraan.delete({
        where: {
            kendaraanId: kendaraan.id
        }
    })

    return await prismaClient.kendaraan.delete({
        where: {
            id: kendaraan.id
        },
        select: true
    })
}