import {
    get,
    getById,
    create,
    update,
    remove
} from '../model/lokasi.model.js'

const getLokasi = async () => {
    return await get()
}

const getLokasiById = async (request) => {
    return await getById(request)
}

const createLokasi = async (data) => {
    return await create(data)
}

const updateLokasi = async (request) => {
    return await update(request)
}

const deleteLokasi = async (request) => {
    return await remove(request)
}

export {
    getLokasi,
    getLokasiById,
    createLokasi,
    updateLokasi,
    deleteLokasi
}