document.addEventListener('DOMContentLoaded', () => {
const socket = io('http://localhost:8000');

// Get Dom elements
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
// Audio to play while the message comes.
var audio = new Audio('Ting.mp3');


// funstion that will append the container.
const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
    audio.play();
}
}

// ask new user for the name
const name = prompt("Enter your name to Join");
socket.emit('new-user-joined', name);

// to show, user joined
socket.on('user-joined', name =>{
append(`${name} joined the chat`,`right`)
});

// to show whose message is it
socket.on('receive', data =>{
    append(`${data.name}:${data.message}`,'left')
    });

// to show who left
socket.on('leave', name =>{
append(`${name} left the chat`,'right')});    

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value =''
    })

});
