import {
    get,
    getById,
    create,
    update,
    remove
} from '../model/waktu.model.js'

const getWaktu = async () => {
    return await get()
}

const getWaktuById = async (request) => {
    return await getById(request)
}

const createWaktu = async (request) => {
    return await create(request)
}

const updateWaktu = async (request) => {
    return await update(request)
}

const deleteWaktu = async (request) => {
    return await remove(request)
}

export {
    getWaktu,
    getWaktuById,
    createWaktu,
    updateWaktu,
    deleteWaktu
}