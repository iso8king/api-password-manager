import Joi from "joi";

export const registerUserValidation = Joi.object({
    username : Joi.string().min(1).max(100).required(),
    password : Joi.string().min(1).max(100).required(),
    nama : Joi.string().required().max(100).min(1)
})

export const loginValidation = Joi.object({
    username : Joi.string().max(100).required(),
    password : Joi.string().required()
});