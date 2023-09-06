import Joi from 'joi'

const addSupirData = Joi.object({
    name: Joi.string().max(255).required(),
    alamat: Joi.string().max(255).required(),
    phoneNumber: Joi.string().max(255).required()
})

const updateSupirData = Joi.object({
    name: Joi.string().max(255).required(),
    alamat: Joi.string().max(255).required(),
    phoneNumber: Joi.string().max(255).required()
})

export {
    addSupirData,
    updateSupirData
}