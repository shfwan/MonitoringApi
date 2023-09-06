import {
    get,
    getById,
    create,
    update,
    deleteModel
} from '../model/supir.model.js'

const getSupir = async () => {
    return await get()
}

const getSupirById = async (request) => {
    return await getById(request)
}

const createSupir = async (data) => {
    return await create(data)
}

const updateSupir = async (request) => {
    return await update(request)
}

const deleteSupir = async (request) => {
    return await deleteModel(request)
}

export {
    getSupir,
    getSupirById,
    createSupir,
    updateSupir,
    deleteSupir
}