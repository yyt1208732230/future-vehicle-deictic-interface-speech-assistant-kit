const express = require('express');
const os = require('os');
const http = require('http');
const app = express();
const server = http.createServer(app);
const options = {
    cors: true,
    origins: ['http://127.0.0.1:8080', 'http://127.0.0.1:9398', 'http://127.0.0.1:3000','http://121.37.234.166:3000'],
}
const io = require('socket.io')(server, options);

// APIs
app.use(express.static('dist'));
app.get('/api/getProjName', (req, res) => {
    console.log('api call')
    res.send({ name: os.userInfo().username })
});

var globalRoom = 'laurence'

// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

io.on('connection', (socket) => {
    console.log(`a user connected - ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('audio trigger', (msg) => {
        console.log('AI: ' + msg);
    });
    socket.on("join_room", (data) => {
        console.log(`a user join room - : "${data}" ${socket.id}`);
        globalRoom = data;
        socket.join(data);
    });
    socket.on("leave_room", (data) => {
        console.log(`a user leave room - : "${data}" ${socket.id}`);
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("send_soundid", (data) => {
        socket.to(data.room).emit("receive_speech", data);
        console.log(`soundId sent ${data.soundId}`)
    });
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Speech Backend now listening on port ${process.env.PORT || 8080}!`);
});