import {
    get,
    getById,
    create,
} from '../model/lokasiKehadiran.model.js'

const getLokasiKehadiran = async () => {
    return await get()
}

const getLokasiKehadiranById = async (request) => {
    return await getById(request)
}

const createLokasiKehadiran = async (data) => {
    return await create(data)
}


export {
    getLokasiKehadiran,
    getLokasiKehadiranById,
    createLokasiKehadiran,
}