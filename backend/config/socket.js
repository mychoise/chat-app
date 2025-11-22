import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-sabin.netlify.app",
    credentials: true,
  },
});




const userSocketMap = new Map();

export function getReceiverSocketId(userId) {
  console.log("userId is", userSocketMap)
  return userSocketMap.get(userId);
}

io.on("connection", (socket) => {

  const userId = socket.handshake.query.userId; //This is used to get userId
    userSocketMap.set(userId, socket.id);
  io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
         userSocketMap.delete(userId);
    io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  });
});

export { io, server, app };
