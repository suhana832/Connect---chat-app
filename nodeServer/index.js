// const { Socket } = require("socket.io");

// this is node server entrypoint, which will handle socket Io connections
const io = require ('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', userName => {
        console.log("New user" , userName);
        users[socket.id] =userName;
        socket.broadcast.emit('user-joined', userName);
    });

    socket.on('send', message=> {
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]})
    });
})
