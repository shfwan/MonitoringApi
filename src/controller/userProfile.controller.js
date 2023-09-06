import { logger } from "../app/logging.js"
import {
    getProfile,
    getByIdProfile,
    updateProfile
} from "../service/userProfile.service.js"

const get = async (req, res, next) => {
    try {
        const response = await getProfile()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        logger.info(req.body)
        const response = await getByIdProfile(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const request = req.body
        request.foto = "/" + (req.file.path).replace("\\", "/")

        const response = await updateProfile(request)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}


export default{
    get,
    getById,
    update,
}