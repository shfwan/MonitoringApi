import {
    get,
    getById,
    create,
    update,
} from '../model/lokasiKendaraan.model.js'

const getLokasiKendaraan = async () => {
    return await get()
}

const getLokasiKendaraanById = async (request) => {
    return await getById(request)
}

const createLokasiKendaraan = async (request) => {
    return await create(request)
}

const updateLokasiKendaraan = async (request) => {
    return await update(request)
}


export {
    getLokasiKendaraan,
    getLokasiKendaraanById,
    createLokasiKendaraan,
    updateLokasiKendaraan,
}