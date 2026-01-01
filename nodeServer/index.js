const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Socket.IO with deployment-safe CORS
const io = new Server(server, {
  cors: {
    origin: "*",   // allow all origins (safe for demo projects)
    methods: ["GET", "POST"]
  }
});

const users = {};

io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  socket.on("new-user-joined", (name) => {
    if (name) {
      users[socket.id] = name;
      socket.broadcast.emit("user-joined", name);
    }
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id]
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", users[socket.id]);
    delete users[socket.id];
  });
});

// ✅ Correct PORT handling
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
