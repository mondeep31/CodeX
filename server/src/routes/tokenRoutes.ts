import { StreamChat } from "stream-chat";
import express from "express";
import dotenv from "dotenv"

dotenv.config();


export const tokenRouter = express.Router();

const client = StreamChat.getInstance(
    process.env.REACT_APP_STREAM_API_KEY || "",
    process.env.REACT_APP_STREAM_API_SECRET || ""
    

)

tokenRouter.post("/get-token", (req,res) => {
    const {userId} = req.body;
    if (!userId){
        res.status(400).json({
            error: "User ID is required"
        })
        return;
    }

    const token = client.createToken(userId);
    res.json({token});
})


