import { prismaClient } from "../application/database.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validate } from "../validation/validate.js";
import { responseError } from "../error/response-error.js";
import { stringify } from "uuid";
import { loginValidation, registerUserValidation } from "../validation/user-validation.js";

function generateJWT(data, secret_token, duration){
    return jwt.sign(data , secret_token, {expiresIn : duration})
}

const register = async(request)=>{
    const user = validate(registerUserValidation, request);
    
    user.password = await bcrypt.hash(user.password, 10);

    const registerUser = await prismaClient.users.create({
        data : user,
        select : {
            id : true,
            nama : true,
            username : true
        }
    });

    return registerUser
}

const login = async(request)=>{
    request = validate(loginValidation, request)

    const user = await prismaClient.users.findUnique({
        where : {
            username : request.username
        },
        select : {
            id : true,
            nama : true,
            username : true,
            password : true
        }
    });

    if(!user) throw new responseError(403, "Akun Kredensial Salah")
    const passwordCheck = await bcrypt.compare(request.password, user.password)
    if(!passwordCheck) throw new responseError(403, "Akun Kredensial Salah")
    
    const data = {
        id : user.id,
        username : user.username,
        nama : user.nama
    }

    const token_access = generateJWT(data, process.env.ACCESS_TOKEN_SECRET, '1h')
    data.token_access = token_access
    return data
}

export default{
    register,login
}