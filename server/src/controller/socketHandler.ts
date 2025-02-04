import {Server} from "socket.io"
import {Server as HttpServer} from "http"

interface RoomData {
    [roomId : string]: string[]
}

const rooms: RoomData = {}
 
const initializeSocket = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`)

        //room joining
        socket.on("join_room", (roomId: string) => {
            socket.join(roomId)
            console.log(`User ${socket.id} joined room ${roomId}`);

            if (!rooms[roomId]){
                rooms[roomId] = []
            }
            rooms[roomId].push(socket.id)
            

            io.to(roomId).emit("user-joined", {userId: socket.id, roomUsers: rooms[roomId]})
        })

        //real time collab

        socket.on("send_code", ({roomId, code} : {roomId: string, code: string}) => {
            socket.to(roomId).emit("receive code", code);
        })

        //disconnection

        socket.on("disconnect", () => {
            for (const room in rooms) {
                rooms[room] = rooms[room].filter((id) => id!== socket.id);
                io.to(room).emit("user_left", socket.id);
            }

            console.log(`User disconnected: ${socket.id}`)
        })
    }) 

    return io;
}

export default initializeSocket;