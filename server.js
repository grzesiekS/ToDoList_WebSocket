const express = require('express');
const socket = require('socket.io');

const app = express();

const tasks = [];

app.use((req, res) => {
    console.log('Not found...');
});

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    socket.on('updateData', () => {
        socket.to(socket.id).emit('updateData', tasks);
    });
});