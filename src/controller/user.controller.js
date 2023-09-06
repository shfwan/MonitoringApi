import { logger } from "../app/logging.js"
import auth from "../middleware/auth.js"
import {
    getService,
    getByIdService,
    logOutService,
    registerService,
    loginService,
    updateService,
    phoneNumber,
} from "../service/user.service.js"

const get = async (req, res, next) => {
    try {
        const response = await getService()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const response = await getByIdService(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body
        logger.info(request)
        const response = await loginService(request)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const checkPhoneNumber = async (req, res, next) => {
    try {
        const requestPhoneNumber = req.body
        logger.info(requestPhoneNumber)
        const response = await phoneNumber(requestPhoneNumber)
        
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    try {
        const response = await registerService(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const createPassword = req.body        
        const response = await updateService(createPassword)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const logOut = async (req, res, next) => {
    try {
        const response = await logOutService(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)    }
}



export default {
    register,
    login,
    checkPhoneNumber,
    updatePassword,
    logOut,
    get,
    getById
}