import {
    get,
    getById,
    loginAdmin,
    create,
    update,
    remove
} from '../model/admin.model.js'

const getAdmin = async () => {
    return await get()
}

const getAdminById = async (request) => {
    return await getById(request)
}

const loginService = async (request) => {
    return await loginAdmin(request)
}

const createAdmin = async (data) => {
    return await create(data)
}

const updateAdmin = async (request) => {
    return await update(request)
}

const deleteAdmin = async (request) => {
    return await remove(request)
}

export {
    getAdmin,
    getAdminById,
    loginService,
    createAdmin,
    updateAdmin,
    deleteAdmin
}