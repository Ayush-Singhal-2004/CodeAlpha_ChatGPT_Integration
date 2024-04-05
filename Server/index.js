import express from "express"
import 'dotenv/config'
import { Server } from 'socket.io';
import { createServer } from "node:http"
import cors from "cors"
import ChatGptPrompt from "./helper/chatgpt_query.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: true
});

const PORT = process.env.PORT;

app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("chatgpt-interaction", async(args) => {
        const output = await ChatGptPrompt(args);
        socket.emit("response", output);
    });

    socket.on("disconnect", () => {
        // console.log("User disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("Welcome user");
}); 

server.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`);
});