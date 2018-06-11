const path = require('path');//comes with node and does not need to be installed
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var IO = socketIO(server);

app.use(express.static(publicPath));

IO.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {//sends only to user that has just logged on
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {//sends to everyone except new user above
        from: 'Admin',
        text: 'New User has joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage:', message);
        IO.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // socket.broadcast.emit('newMessage', {//socket broadcast exactly the same as before except it sends to everyone except the sender
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on Port ${port} `);
});

