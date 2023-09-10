import {
    getLokasi,
    getLokasiById,
    createLokasi,
    updateLokasi,
    deleteLokasi
} from "../service/lokasi.service.js"



const get = async (req, res, next) => {
    try {
        const response = await getdLokasi()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const response = await getdLokasiById(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const request = req.body
        const response = await createdLokasi(request)

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
        const response = await updatedLokasi(request)
        res.status(200).json({
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const response = await deletedLokasi(req.body)
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