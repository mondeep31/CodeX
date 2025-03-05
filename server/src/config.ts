import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT || 8080;

export const CORS_CONFIG ={
    origin: "*",
    methods: ["GET", "POST"]
}