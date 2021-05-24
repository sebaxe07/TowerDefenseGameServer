const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
let players = [];
var conta = 0

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);
    if (players.length === 1) {
        io.emit("isPlayerA");
    }
    if (players.length === 2) {
        io.emit("Start");
    }


    socket.on("turretPlaced", function (gameObject, isPlayerA, dropzone) {
        io.emit("turretPlaced", gameObject, isPlayerA, dropzone);
    })

    socket.on("enemyADD", function (key, sprite, isPlayerA, camino) {
        console.log("Emitido")
        io.emit("enemyADD",key, sprite, isPlayerA, camino);
    })

    socket.on("upgradeTurret", function (x, y, lvl, name, forC, damage) {
        console.log("recibido")
        io.emit("upgradeTurret", x, y, lvl, name, forC, damage);
    })

    socket.on("newRound", function () {
        conta += 1
        console.log("nueva 1")

        if(conta === 2){
            conta = 0
            console.log("newRound")
            io.emit("newRound");
        }
        
    })

    socket.on("gameover", function () {
        console.log("gameover")
       
        io.emit("gameover");
        
    })


    socket.on("disconnect", function () {
        console.log("A user disconnected: " + socket.id)
        players = players.filter(player => player !== socket.id)
    })
});

http.listen(3000, function () {
    console.log('Server started!');
});