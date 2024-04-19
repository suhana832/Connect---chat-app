document.addEventListener('DOMContentLoaded', () => {
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
e.preventDefault();
const message = messageInput.value;
append(`You: ${message}`,'right');
socket.emit('send',message);
messageInput.value =''
})

const Username = prompt("Enter your name to Join");
socket.emit('new-user-joined', Username);

socket.on('user-joined', Username =>{
append(`${Username} joined the chat`,`right`)
});

socket.on('receive', Username =>{
    append(`${Username.name}:${Username.message}`,'left')
    });

});