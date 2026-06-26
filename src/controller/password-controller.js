import passwordService from "../service/password-service.js";

const savePassword = async(req,res,next)=>{
    try {
        const request = req.body;
        const user_id = req.user.id;
        request.url_gambar = req.file.filename

        const result = await passwordService.createPassword(user_id, request)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)        
    }
}

const updateSavedPassword = async(req,res,next)=>{
    try {
        const request = req.body
        request.id = req.params.id_password

        const result = await passwordService.updateSavedPassword(request)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)        
    }
}

const readAllPassword = async(req,res,next)=>{
    try {
        const id_user = req.user.id
        const result = await passwordService.readAllPassword(id_user)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e)        
    }
}

const deletePassword = async(req,res,next)=>{
    try {
        const id_user = req.user.id
        const id_password = req.params.id_password
        const result = await passwordService.deletePassword(id_password, id_user)
        res.status(200).json({
            data : "OK"
        })
    } catch (e) {
        next(e)        
    }
}

export default{
    savePassword,updateSavedPassword,readAllPassword,deletePassword
}