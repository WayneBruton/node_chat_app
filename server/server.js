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

    // socket.emit('newMessage', {
    //     from: 'bob@example.com',
    //     text: 'Hey dude its me again!!!',
    //     createdAt: 123123
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage:', message);
        IO.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        } )
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on Port ${port} `);
});

