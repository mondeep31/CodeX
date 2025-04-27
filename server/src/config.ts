import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const CORS_CONFIG ={
    origin: FRONTEND_URL,
    methods: ["GET", "POST"]
}