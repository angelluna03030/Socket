import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "http";

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 3000
    },
});

io.on("connection", (socket) => {
  console.log("a user has connected");

  socket.on("disconnect", () => {
    console.log("a user has disconnected");
  });
  socket.on("emit message", (e) => {
    console.log(e);
  });
  socket.on("emit message", (e) => {
    io.emit("emit message", e);
  });
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

app.use(logger("dev"));

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
