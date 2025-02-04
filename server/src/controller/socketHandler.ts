
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

interface User {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
  users: User[];
  code: string;
  language: string;
}

interface RoomData {
  [roomId: string]: Room;
}

const rooms: RoomData = {};

const initializeSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", ({ roomId, userName }) => {
      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          name: "Coding Session",
          users: [],
          code: "",
          language: "java",
        };
      }

      const userExists = rooms[roomId].users.some((u) => u.id === socket.id);
      if (userExists) return;

      const user = { id: socket.id, name: userName };
      rooms[roomId].users.push(user);
      socket.join(roomId);

      // Send room info to all users
      io.to(roomId).emit("room_info", {
        id: roomId,
        name: rooms[roomId].name,
        host: rooms[roomId].users[0]?.name || "",
        participants: rooms[roomId].users.map((u) => u.name),
      });

      // Send current code and language to the new user
      socket.emit("receive_code", rooms[roomId].code);
      socket.emit("language_changed", rooms[roomId].language);
    });

    socket.on("send_code", ({ roomId, code }) => {
      if (rooms[roomId]) {
        rooms[roomId].code = code;
        socket.to(roomId).emit("receive_code", code);
      }
    });

    socket.on("change_language", ({ roomId, language }) => {
      if (rooms[roomId]) {
        rooms[roomId].language = language;
        io.to(roomId).emit("language_changed", language);
      }
    });

    socket.on("disconnect", () => {
      for (const roomId in rooms) {
        const room = rooms[roomId];
        const userIndex = room.users.findIndex((u) => u.id === socket.id);

        if (userIndex !== -1) {
          room.users.splice(userIndex, 1);

          // Notify other users
          io.to(roomId).emit("user_left", {
            userId: socket.id,
            roomUsers: room.users,
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

export default initializeSocket;