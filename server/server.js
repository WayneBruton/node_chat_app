const path = require('path');//comes with node and does not need to be installed
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var IO = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

IO.on('connection', (socket) => {
    console.log('New user connected');

    

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        //socket.leave('The Office Fans')

        //io.emit -> io.to('The Office Fans').emit
        //socket.broadcast.emit --> socket.broadcast.to('Same as above).emit
        //socket.emit
        IO.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to ChatApp'));
        //sends to everyone except new user above
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage:', message);
        IO.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage',(coords) => {
        IO.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            IO.to(user.room).emit('updateUserList', users.getUserList(user.room));
            IO.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on Port ${port} `);
});

