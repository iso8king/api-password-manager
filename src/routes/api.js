import express from 'express'
import { upload } from '../application/multer.js'
import { authMiddleware } from '../middleware/auth-middleware.js'
import passwordController from '../controller/password-controller.js'

const passwordRouter = express.Router()

passwordRouter.post('/api/password_manager/create', [authMiddleware, upload.single("url_gambar")], passwordController.savePassword)
passwordRouter.patch('/api/password_manager/:id_password/update', [authMiddleware], passwordController.updateSavedPassword)
passwordRouter.get('/api/password_manager/get', [authMiddleware], passwordController.readAllPassword)
passwordRouter.delete('/api/password_manager/:id_password/delete', [authMiddleware], passwordController.deletePassword)

export {
    passwordRouter
}