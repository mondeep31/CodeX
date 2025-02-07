import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const roomRouter = express.Router();

interface Room {
  id: string;
  name: string;
  createdAt: Date;
}

const rooms: Room[] = [];

roomRouter.post('/create-room', (req, res) => {
  try {
    const roomID = uuidv4();
    const newRoom: Room = {
      id: roomID,
      name: req.body.roomName || "Coding Session",
      createdAt: new Date(),
    };
    
    rooms.push(newRoom);
    console.log(`Room created: ${roomID}`);
    
    res.status(201).json({
      success: true,
      roomID,
      room: newRoom,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create room",
    });
  }
});

roomRouter.post('/join-room', (req, res) => {
  try {
    const { roomId } = req.body;
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      res.status(200).json({
        success: true,
        message: "Successfully joined the room",
        room,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join room",
    });
  }
});

export default roomRouter;