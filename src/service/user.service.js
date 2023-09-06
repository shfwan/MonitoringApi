import {
    get,
    getById,
    deleteModel,
    register,
    login,
    logOut,
    checkPhoneNumber,
} from "../model/user.model.js";

const getService = async () => {
    return await get()
}

const getByIdService = async (request) => {
    return await getById(request)
}

const loginService = async (request) => {
    return await login(request)
}

const logOutService = async (request) => {
    return await logOut(request)
}

const phoneNumber = async (phoneNumber) => {
    return await checkPhoneNumber(phoneNumber)
}

const registerService = async (request) => {
    return await register(request)
}


const updateService = async (createPassword) => {
    return await update(supirId, createPassword)
}
const removeUser = async (id) => {
    return await deleteModel(id)
}



export { 
    getService,
    getByIdService,
    loginService,
    logOutService,
    updateService,
    removeUser,
    registerService,
    phoneNumber,
}
