import Joi from 'joi'

const createKehadiranSakit = Joi.object({
    description: Joi.string().max(500).required()
})

const createKehadiranIzin = Joi.object({
    description: Joi.string().max(500).required()
})

export {
    createKehadiranIzin,
    createKehadiranSakit
}