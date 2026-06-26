import Joi from "joi";

export const savePasswordValidation = Joi.object({
    nama : Joi.string().max(100).required().min(1),
    password : Joi.string().max(100).min(1).required(),
    deskripsi : Joi.string().required().min(1),
    url_gambar : Joi.string().max(100).required()
})

export const updateSavedPasswordValidation = Joi.object({
    nama : Joi.string().max(100).optional().min(1),
    password : Joi.string().max(100).min(1).optional(),
    deskripsi : Joi.string().optional().min(1),
    id : Joi.string().required().max(36)
})
