import {
    getWaktu,
    getWaktuById,
    createWaktu,
    updateWaktu,
    deleteWaktu
} from "../service/waktu.service.js"



const get = async (req, res, next) => {
    try {
        const response = await getWaktu()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const response = await getWaktuById(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const request = req.body
        const response = await createWaktu(request)

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
        const response = await updateWaktu(request)
        res.status(200).json({
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const response = await deleteWaktu(req.body)
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