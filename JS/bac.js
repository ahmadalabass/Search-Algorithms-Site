document.addEventListener("DOMContentLoaded", createBoard);

function createBoard() {
    const table = document.getElementById("sudoku-board");
    table.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "9";
            input.id = `cell-${i}-${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function getBoardValues() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let value = document.getElementById(`cell-${i}-${j}`).value;
            row.push(value ? parseInt(value) : 0);
        }
        board.push(row);
    }
    return board;
}

function setBoardValues(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`cell-${i}-${j}`).value = board[i][j] !== 0 ? board[i][j] : "";
        }
    }
}

function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }
    
    let startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudokuHelper(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudokuHelper(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    let board = getBoardValues();
    if (solveSudokuHelper(board)) {
        setBoardValues(board);
    } else {
        alert("لا يوجد حل لهذا الجدول!");
    }
}
