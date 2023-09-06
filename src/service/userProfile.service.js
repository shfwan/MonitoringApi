import {
    get,
    getById,
    update,
} from "../model/userProfile.model.js";

const getProfile = async () => {
    return await get()
}

const getByIdProfile = async (request) => {
    return await getById(request)
}

const updateProfile = async (request) => {
    return await update(request)
}

export {
    getProfile,
    getByIdProfile,
    updateProfile
}