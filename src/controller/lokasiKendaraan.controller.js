import {
    getLokasiKendaraan,
    getLokasiKendaraanById,
    createLokasiKendaraan,
    updateLokasiKendaraan,
} from "../service/lokasiKendaraan.service.js"



const get = async (req, res, next) => {
    try {
        const response = await getLokasiKendaraan()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const response = await getLokasiKendaraanById(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const request = req.body
        const response = await createLokasiKendaraan(request)

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
        const response = await updateLokasiKendaraan(request)
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
}