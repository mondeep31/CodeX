import express from 'express';
import {v4 as uuidv4} from 'uuid';

const roomRouter = express.Router();

// In-memory storage for rooms
const rooms: { id: string }[] = []; // arr to store id

roomRouter.post('/create-room', (req, res) => {
    const roomID = uuidv4();
    rooms.push({ id: roomID }); // storing id
    console.log(roomID)
    res.status(201).json({
        roomID
    })
})

roomRouter.post('/join-room', (req,res) => {
    const { roomId } = req.body; 

    // Check if the room exists
    const roomExists = rooms.some(room => room.id === roomId); 

    if (roomExists) {
        res.status(200).json({
            message: "Successfully joined the room",
            roomId
        });
    } else {
        res.status(404).json({
            message: "Room not found"
        });
    }
})

export default roomRouter;