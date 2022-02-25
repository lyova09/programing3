var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

app.listen(3000, function () {
    console.log("Example is running on port 3000");
});
function generator(matLen, gr, grEat, pr, t,gh) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gh; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 9;
    }
}
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < t; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
         x = x;
         y = y;
        if (matrix[x][y] == 0 ||matrix[x][y] > 0) {
            matrix[x][y] = 6;
        }
         x = x+1;
         y = y;
        if (matrix[x][y] == 0 ||matrix[x][y] > 0) {
            matrix[x][y] = 7;
        }
         x = x-2 ;
         y = y;
        if (matrix[x][y] == 0 ||matrix[x][y] > 0) {
            matrix[x][y] = 7;
        }
         x = x+1 ;
         y = y+1;
        if (matrix[x][y] == 0 ||matrix[x][y] > 0  ) {
            matrix[x][y] = 7;
        }
        x = x ;
         y = y-2;
        if (matrix[x][y] == 0 ||matrix[x][y] > 0  ) {
            matrix[x][y] = 7;
        }

    }
    return matrix;
 }

 matrix = generator(50, 150, 35, 10, 7,15)

io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(5)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new Predator(x, y)
                predatorArr.push(gr)
            }else if (matrix[y][x] == 8) {
                let gr = new Whater(x, y)
                whaterArr.push(gr)
            }
        }
    }
}

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater)

            }
        }
    }

    io.sockets.emit('send matrix', matrix)


}


function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)

io.on('connection', function () {
    createObject(matrix)
})