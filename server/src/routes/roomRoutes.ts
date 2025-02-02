import express from 'express';
import {v4 as uuidv4} from 'uuid';

const roomRouter = express.Router();

roomRouter.post('/create-room', (req, res) => {
    const roomID = uuidv4();
    console.log(roomID)
    res.status(201).json({
        roomID
    })
})

roomRouter.post('/join-room', (req,res) => {

})

export default roomRouter;