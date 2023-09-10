import {
    getAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
} from "../service/admin.service.js"



const get = async (req, res, next) => {
    try {
        const response = await getAdmin()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const response = await getAdminById(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const request = req.body
        const response = await createAdmin(request)

        res.status(201).json({
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const request = req.body
        const response = await updateAdmin(request)
        res.status(200).json({
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const response = await deleteAdmin(req.body)
        res.status(200).json({
            data: response
        })
    } catch (error) {
        next(error)
    }
}

export default {
    get,
    getById,
    create,
    update,
    remove
}