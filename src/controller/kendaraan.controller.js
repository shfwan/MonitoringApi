import {
    getKendaraan,
    getKendaraanById,
    createKendaraan,
    updateKendaraan,
    deleteKendaraan
} from "../service/kendaraan.service.js"



const get = async (req, res, next) => {
    try {
        const response = await getKendaraan()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const response = await getKendaraanById(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const request = req.body
        const response = await createKendaraan(request)

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
        const response = await updateKendaraan(request)
        res.status(200).json({
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const response = await deleteKendaraan(req.body)
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