import {
    hadirService,
    pulangService,
    sakitService,
    izinService,
    getKehadiranService
} from "../service/kehadiran.service.js"

const getAllKehadiran = async (req, res, next) => {
    try {
        const response = await getKehadiranService()
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
}

const absenHadir = async (req, res, next) => {
    try {
        const response = await hadirService(req.body)

        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
}

const absenPulang = async (req, res, next) => {
    try {
        const response = await pulangService(req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
}

const absenSakit = async (req, res, next) => {
    try {
        
        const response = await sakitService(req.body)
        res.status(201).json({
            message: 'Success absen',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const absenIzin = async (req, res, next) => {
    try {
        
        const response = await izinService(req.body)
        res.status(201).json({
            message: 'Success absen',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

export default {
    absenHadir,
    absenPulang,
    absenSakit,
    absenIzin,
    getAllKehadiran
}