import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { publicRouter } from "../routes/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import cors from "cors";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { passwordRouter } from "../routes/api.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
export const web = express();
web.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

web.use('/assets', express.static(path.join(__dirname, '../../assets')));


web.use(cors(corsOptions));
web.use(express.json());
web.use(cookieParser());
web.use(publicRouter)
web.use(passwordRouter)

web.use(errorMiddleware)


