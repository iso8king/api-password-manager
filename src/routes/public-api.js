import express from 'express'
import userController from '../controller/user-controller.js'
import { upload } from '../application/multer.js'

const publicRouter = express.Router()

publicRouter.post('/api/users/register' , userController.register)
publicRouter.post('/api/users/login' , userController.login)
publicRouter.delete('/api/users/logout' , userController.logout)

export {
    publicRouter
}