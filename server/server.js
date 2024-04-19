const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
});

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});
