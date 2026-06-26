import { prismaClient } from "../application/database.js";
import crypto from "crypto";
import { validate } from "../validation/validate.js";
import { responseError } from "../error/response-error.js";
import {
    savePasswordValidation,
    updateSavedPasswordValidation
} from "../validation/password-validation.js";

const algorithm = "aes-256-cbc";

const key = crypto
    .createHash("sha256")
    .update(process.env.CRYPTO_SECRET)
    .digest();

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        algorithm,
        key,
        iv
    );

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (encryptedText) => {
    const parts = encryptedText.split(":");

    const iv = Buffer.from(parts[0], "hex");

    const encrypted = parts[1];

    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        iv
    );

    let decrypted = decipher.update(
        encrypted,
        "hex",
        "utf8"
    );

    decrypted += decipher.final("utf8");

    return decrypted;
};

const createPassword = async (user_id, request) => {
    request = validate(savePasswordValidation, request);

    request.password = encrypt(request.password);
    
    const data = {
        ...request,
        user_id
    };

    return prismaClient.password_manager.create({
        data
    });
};

const updateSavedPassword = async (request) => {
    request = validate(updateSavedPasswordValidation, request);

    const data = {};

    const field = ["nama", "deskripsi"];

    for (const f of field) {
        if (request[f] !== undefined && request[f] !== "undefined") {
            data[f] = request[f];
        }
    }

    if (request.password) {
        data.password = encrypt(request.password);
    }

    return prismaClient.password_manager.update({
        where: {
            id: request.id
        },
        data
    });
};

const readAllPassword = async (user_id) => {
    const passwords = await prismaClient.password_manager.findMany({
        where: {
            user_id
        }
    });

    return passwords.map((item) => ({
        ...item,
        password: decrypt(item.password)
    }));
};

const readPassword = async (id, user_id) => {
    const password = await prismaClient.password_manager.findFirst({
        where: {
            id,
            user_id
        }
    });

    if (!password) {
        throw new responseError(404, "Password tidak ditemukan");
    }

    return {
        ...password,
        password: decrypt(password.password)
    };
};

const deletePassword = async (id, user_id) => {
    const password = await prismaClient.password_manager.findFirst({
        where: {
            id,
            user_id
        }
    });

    if (!password) {
        throw new responseError(404, "Password tidak ditemukan");
    }

    await prismaClient.password_manager.delete({
        where: {
            id
        }
    });
};

export default {
    createPassword,
    updateSavedPassword,
    readAllPassword,
    readPassword,
    deletePassword
};