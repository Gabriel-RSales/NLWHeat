import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io"

import { router } from "./router"

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log(`Usuário conectado com ${socket.id}`);
});

app.use(express.json());

app.use(router);

app.get("/github", (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_C}`
    );
});

app.get("/signin/callback", (req, res) => {
    const { code } = req.query;

    return res.json(code);
});

export { serverHttp, io }