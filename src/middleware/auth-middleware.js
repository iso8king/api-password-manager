import jwt from "jsonwebtoken"
import { responseError } from "../error/response-error.js"

export const authMiddleware = async(req,res,next) => {
    
    try {
         const cookie = req.cookies.accessToken;
        if(!cookie) throw new responseError(403, "Unauthorized, Please Login First!")
        const tokenDecrypt = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        req.user = tokenDecrypt
        req.user.accessToken = cookie
        next()
    } catch (e) {
        next(e)
    }
}