const path = require('path');//comes with node and does not need to be installed
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var IO = socketIO(server);

app.use(express.static(publicPath));

IO.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to ChatApp'));

    //sends to everyone except new user above
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage:', message);
        IO.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server!');
    });

    socket.on('createLocationMessage',(coords) => {
        IO.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on Port ${port} `);
});

