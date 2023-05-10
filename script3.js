
var socket = io()
let sockList = []
let gameSocks = {}
let board = document.querySelector(".board")
let player = document.querySelector(".player")
let current = document.querySelector(".currentPlayer")
let cur = document.querySelector("#name1")
let playAgain = document.querySelector("#playAgain")
let playNew = document.querySelector("#playNew")
let quit = document.querySelector("#playQuit")
let newgame = document.querySelector(".newgame")
let restart = document.querySelector(".restart")
let score1 = document.querySelector(".score1")
let score2 = document.querySelector(".score2")
let sidebar = document.querySelector("#sidebar")
let joinNew = document.querySelector("#joinNew")
let idBox = document.querySelector("#gameid")
let you = document.querySelector(".you")
let gamenum = document.querySelector(".gamenum")
let playerNum = 0


let box = 0, gmid = 0
let num1 = 0, num2 = 0
let winningArray = [
    [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10],
    [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
    [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
    [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
    [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
    [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
    [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
    [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
    [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
    [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
    [40, 32, 24, 16], [9, 17, 25, 33], [8, 16, 24, 32],
    [11, 17, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
    [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
    [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
];
let currentPlayer = 1
let pNum = 0
playNew.addEventListener("click", start)
joinNew.addEventListener("click", join)
quit.addEventListener("click", load)
document.addEventListener("DOMContentLoaded", loadDOM)

//load dom function

function loadDOM() {
    createBoard()
    player.innerHTML = currentPlayer
    let squares = document.querySelectorAll(".board div")
    Array.from(squares).forEach(square => {
        square.addEventListener("click", clickBox)
    })
    playAgain.addEventListener("click", reset)
}

// createBoard function

function createBoard() {
    for (let i = 0; i < 42; i++) {
        let div = document.createElement("div")
        div.setAttribute("data-id", i)
        div.className = "square"
        board.appendChild(div)
    }
}

//clickBoard function

function clickBox() {
    let squares = document.querySelectorAll(".board div")
    let click = parseInt(this.dataset.id)
    if (squares[click].classList.contains("game-over")) {
        alert("This game is over")
    }
    else if (click > 34 && click < 42 && !squares[click].classList.contains("taken")) {
        if (currentPlayer === 1) {
            pNum = parseInt(gamenum.innerHTML)
            if (currentPlayer === (gameSocks[pNum].indexOf(socket.id)) + 1) {
                currentPlayer = 2
                socket.emit('click-event', [currentPlayer, click])
                current.style.backgroundColor = "lightgreen"
                current.style.color = "black"
                player.innerHTML = currentPlayer
                this.className = "player-one taken"
            }
            else {
                alert("Now it is Player 1's turn")
            }
        } else if (currentPlayer === 2) {
            pNum = parseInt(gamenum.innerHTML)
            if (currentPlayer === (gameSocks[pNum].indexOf(socket.id)) + 1) {
                currentPlayer = 1
                socket.emit('click-event', [currentPlayer, click])
                current.style.backgroundColor = "red"
                current.style.color = "white"
                player.innerHTML = currentPlayer
                this.className = "player-two taken"
            }
            else {
                alert("Now it is Player 2's turn")
            }
        }
    }

    else if (squares[click + 7].classList.contains("taken") && !squares[click].classList.contains("taken")) {
        if (currentPlayer === 1) {
            pNum = parseInt(gamenum.innerHTML)
            if (currentPlayer === (gameSocks[pNum].indexOf(socket.id)) + 1) {
                    currentPlayer = 2
                    socket.emit('click-event', [currentPlayer, click])
                    current.style.backgroundColor = "lightgreen"
                    current.style.color = "black"
                    player.innerHTML = currentPlayer
                    this.className = "player-one taken"
                }
                else {
                    alert("Now it is Player 1's turn")
                }
        }
        else if (currentPlayer === 2) {
            pNum = parseInt(gamenum.innerHTML)
            if (currentPlayer === (gameSocks[pNum].indexOf(socket.id)) + 1) {
                currentPlayer = 1
                socket.emit('click-event', [currentPlayer, click])
                current.style.backgroundColor = "red"
                current.style.color = "white"
                player.innerHTML = currentPlayer
                this.className = "player-two taken"
            }
            else {
                alert("Now it is Player 2's turn")
            }
        }
        if (box === 42) {
            setTimeout(() => alert("boxes filled"), 300)
            setTimeout(() => restart.style.display = "flex", 500)
        }
    }
    else if (squares[click].classList.contains("taken")) {
        alert("This space is filled already")
    }
    else {
        alert("First fill up the bottom empty place")
    }
}

function gameover() {
    let squares = document.querySelectorAll(".board div")
    for (let i = 0; i < 42; i++) {
        if (!squares[i].classList.contains("taken")) {
            squares[i].className = "game-over"
        }
    }
}
//the checkResult function

function checkResult() {
    let squares = document.querySelectorAll(".board div")
    for (let y = 0; y < winningArray.length; y++) {
        let square = winningArray[y]
        let i = 0
        if (square.every(q => squares[q].classList.contains("player-one"))) {
            function change() {
                for (i = 0; i < 4; i++) {
                    if (squares[winningArray[y][i]].style.backgroundColor != "red") {
                        squares[winningArray[y][i]].style.backgroundColor = "red"
                        squares[winningArray[y][i]].innerHTML = "1"
                        squares[winningArray[y][i]].style.textAlign = "center"
                        squares[winningArray[y][i]].style.fontSize = "3vw";
                        squares[winningArray[y][i]].style.color = "red";
                    }
                    else { squares[winningArray[y][i]].style.backgroundColor = "black" }
                }
            }
            setInterval(change, 500)
            gameover()
            num1 = num1 + 1
            score1.innerHTML = num1
            new Audio('audios/audio_file_2.wav').play();
            setTimeout(() => alert("GAME OVER!!!\nPlayer 1 - Red wins"), 200)
            setTimeout(() => restart.style.display = "flex", 500)
        }
        if (square.every(q => squares[q].classList.contains("player-two"))) {
            function change() {
                for (i = 0; i < 4; i++) {
                    if (squares[winningArray[y][i]].style.backgroundColor != "lightgreen") {
                        squares[winningArray[y][i]].style.backgroundColor = "lightgreen"
                        squares[winningArray[y][i]].innerHTML = "2"
                        squares[winningArray[y][i]].style.textAlign = "center"
                        squares[winningArray[y][i]].style.fontSize = "3vw";
                        squares[winningArray[y][i]].style.color = "lightgreen";
                    }
                    else { squares[winningArray[y][i]].style.backgroundColor = "black" }
                }
            }
            setInterval(change, 500)
            gameover()
            num2 = num2 + 1
            score2.innerHTML = num2
            new Audio('audios/audio_file.wav').play();
            setTimeout(() => alert("GAME OVER!!!\nPlayer 2 - Green wins"), 200)
            setTimeout(() => restart.style.display = "flex", 500)
        }
    }
    let draw = 0;
    for (let i = 0; i < 42; i++) {
        if (squares[i].classList.contains("taken")) {
            draw = draw + 1
        }
    }
    if (draw === 42) {
        alert("Game over! It results a draw")
    }
}

function reset() {
    socket.emit('reset', playerNum)
}
function start() {
    socket.emit('start', socket.id)
    socket.on('start-msg', function([gameId, gameSock]) {
        gameSocks = gameSock;
        playerNum = (gameSock[gameId].indexOf(socket.id) + 1);
        gmid = gameId;
        you.innerHTML = "You are player " + playerNum;
        alert("New game started, Game Id: " + gameId);
        newgame.style.display = "None";
        board.style.zIndex = 1;
        board.style.opacity = '150%';
        sidebar.style.visibility = "visible";
        gamenum.innerHTML = gmid;
    });
    
}
function join() {
    gid = idBox.value;
    socket.emit('join', [gid, socket.id]);
    socket.on('join-msg', function([gameId, gameSock]) {
        gameSocks = gameSock;
        playerNum = (gameSock[gameId].indexOf(socket.id) + 1);
        gmid = gameId;
        you.innerHTML = "You are player " + playerNum;
        alert("Game joined, Game Id: " + gameId);
        newgame.style.display = "None";
        board.style.zIndex = 1;
        board.style.opacity = '150%';
        sidebar.style.visibility = "visible";
        gamenum.innerHTML = gmid;
    });
    
}
function load() {
    socket.emit('end', playerNum)
}

socket.on('update-player', function ([cur,clk]) {
    player.innerHTML = cur;
    currentPlayer = cur;
    let squares = document.querySelectorAll(".board div")
    if (cur === 2) { 
        current.style.backgroundColor = "lightgreen"
        current.style.color = "black"
        player.innerHTML = currentPlayer
        squares[clk].className = "player-one taken"
        checkResult()
    }
    if (cur === 1) {
        current.style.backgroundColor = "red"
        current.style.color = "white"
        player.innerHTML = currentPlayer
        squares[clk].className = "player-two taken"
        checkResult()
    }
});
socket.on('socket-list', function (sock) {
    sockList = sock;
});

socket.on('reset-msg', function (msg) {
    board.innerHTML = ""
    loadDOM()
    alert(msg)
});
socket.on('end-msg', function (msg) {
    alert(msg)
    window.location.reload();
});

