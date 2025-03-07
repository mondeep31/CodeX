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
    socket.on("join_room", ({ roomId, userName }) => {
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
      socket.to(roomId).emit("user_joined", socket.id);
      
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
      const otherUsers = rooms[roomId].users.filter(u => u.id !== socket.id);
      if (otherUsers.length > 0) {
        socket.emit("user_connected", { userName: otherUsers[0].name });
        socket.to(roomId).emit("user_connected", { userName });
      }

      // Send current code and language to the new user
      socket.emit("receive_code", rooms[roomId].code);
      socket.emit("language_changed", rooms[roomId].language);

      socket.on("disconnect", () => {
        socket.to(roomId).emit("user_disconnected");
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

    // Handle video call signaling
    socket.on("offer", ({ offer, roomId }) => {
      socket.to(roomId).emit("offer", { 
        offer, 
        from: socket.id 
      });
    });

    socket.on("answer", ({ answer, roomId }) => {
      socket.to(roomId).emit("answer", { 
        answer, 
        from: socket.id 
      });
    });

    socket.on("ice-candidate", ({ candidate, roomId }) => {
      socket.to(roomId).emit("ice-candidate", { 
        candidate, 
        from: socket.id 
      });
    });

    // Handle chat messages
    socket.on("send_message", ({ roomId, userName, message }) => {
      io.to(roomId).emit("receive_message", {
        userName,
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
          room.users.splice(userIndex, 1);
          io.to(roomId).emit("user_disconnected", socket.id);

          io.to(roomId).emit("room_info", {
            id: roomId,
            name: room.name,
            host: room.users[0]?.name || "",
            participants: room.users.map((u) => u.name),
          });

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