import app from  "./app"
import {PORT} from "./config";
import { createServer } from "http";
import initializeSocket from "./controller/socketHandler";

const httpServer = createServer(app);

initializeSocket(httpServer);


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})