import {
    getLokasiKehadiran,
    getLokasiKehadiranById,
    createLokasiKehadiran,
} from "../service/lokasiKehadiran.service.js"



const get = async (req, res, next) => {
    try {
        const response = await getLokasiKehadiran()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const response = await getLokasiKehadiranById(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const request = req.body
        const response = await createLokasiKehadiran(request)

        res.status(201).json({
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
}