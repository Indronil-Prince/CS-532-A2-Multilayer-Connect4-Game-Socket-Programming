const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));
app.get('/connect4.html');
const PORT = 3000;

server.listen(PORT, function () {
    console.log('listening on *:' + PORT);
});

var game = 0;
var cur = 0;
var gamesock = {};
var sock = [];

io.on('connection', function (socket) {
    console.log('a user has connected!');
    sock.push(socket.id);
    console.log(sock);
    io.emit('socket-list', sock);
    socket.on('disconnect', function () {
        console.log('user disconnected');
        sock = sock.filter(function (item) {
            return item !== socket.id;
        });
        console.log(sock);
        io.emit('socket-list', sock);
    });

    socket.on('click-event', function ([currentPlayer,click]) {
        cur = currentPlayer;
        clk = click;
        io.emit('update-player', [cur,clk]);

    });

    socket.on('start', function (id) {
            game = game + 1;
            gamesock[game] = [id];
            io.emit('start-msg', [game, gamesock]);
    });
    socket.on('join', function([game, id]) {
        gamesock[game].push(id);
        io.emit('join-msg', [game, gamesock]);
    });
    socket.on('reset', function (playerReset) {
        if (playerReset) {
            io.emit('reset-msg', "Game restarted by player " + playerReset);
        }
    });
    socket.on('end', function (playerEnd) {
        if (playerEnd) {
            io.emit('end-msg', "Game ended by player " + playerEnd);
        }
    });
    });