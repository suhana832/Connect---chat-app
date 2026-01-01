
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Create a Socket.IO server instance with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // Allow requests from this origin
    methods: ["GET", "POST"] // Allow only specified methods
  }
});

const users = {};
// Event listener for incoming connections
io.on('connection', socket => {
    // If any new user joins, let other users connected to the server should know.
    socket.on('new-user-joined', name => {
        if (name) {
        console.log("New user" , name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    }
    });
    // If someone send a message, gos to everyone on the server.
    socket.on('send', message=> {
       socket.broadcast.emit('receive',{message: message, name:users[socket.id]})
    });

    // If someone leaves the chat, everybody knows about it.
    socket.on('disconnect', message=> {
      socket.broadcast.emit('leave', users[socket.id]);
      delete users[socket.id];
   });
   
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});
