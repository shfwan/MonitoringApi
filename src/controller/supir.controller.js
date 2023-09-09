import { logger } from "../app/logging.js"
import {
    getSupir,
    getSupirById,
    createSupir,
    updateSupir,
    deleteSupir
} from "../service/supir.service.js"



const get = async (req, res, next) => {
    try {
        const response = await getSupir()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const response = await getSupirById(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const request = req.body
        const response = await createSupir(request)

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
        const response = await updateSupir(request)
        res.status(200).json({
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const response = await deleteSupir(req.body)
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