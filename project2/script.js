var socket = io();

side = 30

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
let side = 10;

let matrix = generator(50, 150, 35, 10, 7,15)
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let watherArr = []
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

function nkarel(matrix) {
    console.log(matrix);
    
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        var obj = matrix[y][x];
        if (obj == 1) {
            fill("green");
            rect(x * side, y * side, side, side)
        }
        else if (obj == 2) {
            fill("yellow");
            rect(x * side, y * side, side, side);
        }
    }
}

}

// function draw() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {

//             if (matrix[y][x] == 1) {
//                 fill("green");
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("#acacac");
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("yellow")
//             }
//             else if (matrix[y][x] == 5) {
//                 fill("red")
//             }
//             else if (matrix[y][x] == 6) {
//                 fill("orange")
//             }
//             else if (matrix[y][x] == 7) {
//                 fill("magenta")
//             }
//             else if (matrix[y][x] == 9) {
//                 fill("purple")
//             }
//             rect(x * side, y * side, side, side);
//         }
//
//    }
setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let j in grassEaterArr) {
        grassEaterArr[j].mul()
        grassEaterArr[j].eat()
    }
    for (let p in predatorArr) {
        predatorArr[p].mul()
        predatorArr[p].eat()
    }