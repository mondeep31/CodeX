import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { CORS_CONFIG } from "../config";
import { RoomData } from "../types/types";

const rooms: RoomData = {};

const setupSocketController = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: CORS_CONFIG
  });

  io.on("connection", (socket) => {
    // Store user name in socket data for easy access
    let currentUserName = "";

    socket.on("join_room", ({ roomId, userName }) => {
      // Store userName in a variable accessible to other event handlers
      currentUserName = userName;
      
      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          name: "Coding Session",
          users: [],
          code: "",
          language: "javascript", // Default language
        };
      }
      
      socket.join(roomId);
      
      const userExists = rooms[roomId].users.some((u) => u.id === socket.id);
      if (!userExists) {
        const user = { id: socket.id, name: userName };
        rooms[roomId].users.push(user);
      }
      
      // Send room info to all users
      io.to(roomId).emit("room_info", {
        id: roomId,
        name: rooms[roomId].name,
        host: rooms[roomId].users[0]?.name || "",
        participants: rooms[roomId].users.map((u) => u.name),
      });
      
      // Notify all users in the room about the user names
      socket.to(roomId).emit("user_joined", { 
        socketId: socket.id, 
        userName: userName 
      });
      
      // Send other connected users' info to the new user
      const otherUsers = rooms[roomId].users.filter(u => u.id !== socket.id);
      if (otherUsers.length > 0) {
        // Send all existing users to the new user
        socket.emit("existing_users", otherUsers.map(user => ({
          socketId: user.id,
          userName: user.name
        })));
      }
      
      // Send current code and language to the new user
      socket.emit("receive_code", rooms[roomId].code);
      socket.emit("language_changed", rooms[roomId].language);
    });
    
    // Handle video call signaling
    socket.on("offer", ({ offer, roomId, target }) => {
      // Find user name from socket ID
      const sender = rooms[roomId]?.users.find(u => u.id === socket.id);
      
      socket.to(target || roomId).emit("offer", { 
        offer,
        from: socket.id,
        fromUserName: sender?.name || currentUserName
      });
    });
    
    socket.on("answer", ({ answer, roomId, target }) => {
      // Find user name from socket ID
      const sender = rooms[roomId]?.users.find(u => u.id === socket.id);
      
      socket.to(target || roomId).emit("answer", { 
        answer,
        from: socket.id,
        fromUserName: sender?.name || currentUserName
      });
    });
    
    socket.on("ice-candidate", ({ candidate, roomId, target }) => {
      socket.to(target || roomId).emit("ice-candidate", { 
        candidate,
        from: socket.id
      });
    });
    
    // Handle code updates
    socket.on("send_code", ({ roomId, code }) => {
      if (rooms[roomId]) {
        rooms[roomId].code = code;
        socket.to(roomId).emit("receive_code", code);
      }
    });
    
    // Handle language changes
    socket.on("change_language", ({ roomId, language }) => {
      if (rooms[roomId]) {
        rooms[roomId].language = language;
        io.to(roomId).emit("language_changed", language);
      }
    });
    
    // Handle code execution results
    socket.on("execution_result", ({ roomId, result, error }) => {
      io.to(roomId).emit("execution_result", { result, error });
    });
    
    // Handle chat messages
    socket.on("send_message", ({ roomId, message }) => {
      // Get user name from the rooms data structure
      const sender = rooms[roomId]?.users.find(u => u.id === socket.id);
      const userName = sender?.name || currentUserName || "Anonymous";
      
      io.to(roomId).emit("receive_message", {
        userName,
        userId: socket.id, // Include sender ID so client can distinguish own messages
        message,
        timestamp: new Date().toISOString(),
      });
    });
    
    // Handle disconnection
    socket.on("disconnect", () => {
      for (const roomId in rooms) {
        const room = rooms[roomId];
        const userIndex = room.users.findIndex((u) => u.id === socket.id);
        
        if (userIndex !== -1) {
          // Get user before removing from array
          const disconnectedUser = room.users[userIndex];
          
          // Remove user from room
          room.users.splice(userIndex, 1);
          
          // Notify about disconnection with user info
          io.to(roomId).emit("user_disconnected", {
            socketId: socket.id,
            userName: disconnectedUser.name
          });
          
          // Update room info
          io.to(roomId).emit("room_info", {
            id: roomId,
            name: room.name,
            host: room.users[0]?.name || "",
            participants: room.users.map((u) => u.name),
          });
          
          // Clean up empty rooms
          if (room.users.length === 0) {
            delete rooms[roomId];
          }
        }
      }
    });
  });
  
  return io;
};

export default setupSocketController;