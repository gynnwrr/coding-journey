//to select an HTML element (# is used to find the id)
const gameBoard = document.querySelector("#gameboard") //const - constant variable (cannot reassigned)
const infoDisplay = document.querySelector("#info")

//the board - array of 9 boxes
const startCells = [
    "","","",
    "","","",
    "","","",
]
/*alternative: to avoid doing manually, use
const startCells = Array(9).fill('');*/

let ajuNice = new Audio("aju nice.mp3")

let go = "circle"
infoDisplay.textContent = "Circle goes first"

function createBoard(){
    //loops through an array called startCells
    //for each item (cell), it also gives the position (index)
    startCells.forEach((cell, index) => {

        //represent 1 cell
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index
        cellElement.addEventListener("click", addGo)
        //.append - to add element (cellElement) into the gameBoard
        gameBoard.append(cellElement)
    })
}
createBoard()

function addGo(e){
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go == "circle" ? "cross" : "circle"
    /* same syntax with
        if (go === "circle") {
            go = "cross";
            } else {
            go = "circle";
            }*/
    infoDisplay.textContent = "It is now " + go + "'s go!"
    e.target.removeEventListener("click", addGo) //if the box is clicked, you can't click it again
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll(".square") //all with the class of 'square'
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array =>{
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"))
    
        if (circleWins){
            ajuNice.play()
            infoDisplay.textContent = "Circle Wins!!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        }
    })

    winningCombos.forEach(array =>{
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"))
    
        if (crossWins){
            ajuNice.play()
            infoDisplay.textContent = "Cross Wins!!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))

        }
    })

    const isDraw = Array.from(allSquares).every(square => square.firstChild);
    if (isDraw) {
        infoDisplay.textContent = "It's a draw! Let's play again!";
    }

}

