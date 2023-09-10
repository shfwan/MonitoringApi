import {
    get,
    getById,
    create,
    update,
    remove
} from '../model/kendaraan.model.js'

const getKendaraan = async () => {
    return await get()
}

const getKendaraanById = async (request) => {
    return await getById(request)
}

const createKendaraan = async (data) => {
    return await create(data)
}

const updateKendaraan = async (request) => {
    return await update(request)
}

const deleteKendaraan = async (request) => {
    return await remove(request)
}

export {
    getKendaraan,
    getKendaraanById,
    createKendaraan,
    updateKendaraan,
    deleteKendaraan
}