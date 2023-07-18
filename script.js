

function newstart(){
    var noMoves=document.getElementById("moves").innerHTML;
    noMoves=0;

    document.getElementById("moves").innerHTML=noMoves;

    var timesec=document.getElementById("seconds").innerHTML;
    timesec=0;
    document.getElementById("seconds").innerHTML = 0;

    generatenew();
    alert("Use the mouse to move the tiles.");
}

function isSolvable(board) {
    var inversions = 0;
    var blankRow = 0;
    for (var i = 0; i < board.length; i++) {
        if (board[i] === 0) {
            blankRow = Math.floor(i / 4) + 1;
            continue;
        }
        for (var j = i + 1; j < board.length; j++) {
            if (board[j] !== 0 && board[i] > board[j]) {
                inversions++;
            }
        }
    }
    return (blankRow % 2 === 0) === (inversions % 2 === 0);
}



function generatenew() {
    
    stopTimer();
    resetTimer();

    var k = 1;
    for (var i = 1; i <= 4; i++) {
      for (var j = 1; j <= 4; j++) {
        var cellId = "cell" + i + j;
        document.getElementById(cellId).innerHTML = k;
        k++;
      }
    }
    document.getElementById("cell44").innerHTML = "";
  
    for (var m = 1; m <= 4; m++) {
      for (var l = 1; l <= 4; l++) {
        var a = Math.floor(Math.random() * 4) + 1;
        var b = Math.floor(Math.random() * 4) + 1;
        var cellId1 = "cell" + m + l;
        var cellId2 = "cell" + a + b;
        swapTiles(cellId1, cellId2);
      }
    }
    return;

    if(isSolvable(generatenew())){
        return;
    }
    else{
        generatenew();
    }
  }
 
  
  function swapTiles(cellId1, cellId2) {
    var temp = document.getElementById(cellId1).innerHTML;
    document.getElementById(cellId1).innerHTML = document.getElementById(cellId2).innerHTML;
    document.getElementById(cellId2).innerHTML = temp;
  }


//time functn___________________________________________________________________________________________________
var seconds = 0;
var timerInterval;

// Function to start the timer
function startTimer() {
  stopTimer(); 
  var timerElement = document.getElementById("seconds");
  timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    seconds++;
    timerElement.textContent = seconds;
  }
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Function to reset the timer
function resetTimer() {
  seconds = 0;
  document.getElementById("seconds").textContent = seconds;
}

  

// clicks________________________________________________________________________________________
function clicktile(row, column) {

    if(seconds===0){
        startTimer();
    }

    var cellId = "cell" + row + column;
    var value = document.getElementById(cellId).innerHTML;
    var emptyCellId = "";
  
    //  right
    if (column < 4) {
      var rightCellId = "cell" + row + (column + 1);
      if (document.getElementById(rightCellId).innerHTML === "") {
        emptyCellId = rightCellId;
      }
    }
  
    //  left
    if (column > 1) {
      var leftCellId = "cell" + row + (column - 1);
      if (document.getElementById(leftCellId).innerHTML === "") {
        emptyCellId = leftCellId;
      }
    }
  
    // above
    if (row > 1) {
      var aboveCellId = "cell" + (row - 1) + column;
      if (document.getElementById(aboveCellId).innerHTML === "") {
        emptyCellId = aboveCellId;
      }
    }
  
    // below
    if (row < 4) {
      var belowCellId = "cell" + (row + 1) + column;
      if (document.getElementById(belowCellId).innerHTML === "") {
        emptyCellId = belowCellId;
      }
    }
  
    if (emptyCellId !== "") {
      swapTiles(emptyCellId, cellId);

      var moveElement = document.getElementById("moves");
      var currentmove = parseInt(moveElement.innerHTML, 10); // Parse the value as an integer
      var newmove = currentmove + 1;
      moveElement.innerHTML = newmove;
    }

    if(checkwin()){
        lastmessage();
    }
  }
   
//_________________________________________________________________________________________________

//WIN CONDITION

function checkwin(){
    var cellId = "cell"+ i+j;
    var k=1;
    for(var i=0; i<=4; i++){
        for(var j=0; j<=4; j++){
            if(document.getElementById(cellId)===k){
                k++;
            }
        }
    }
    if(k>=15){
        return 1;
    }
    else{
        return 0;
    }
}

function lastmessage(){
    function showCompletionMessage(moves) {
        var confirmation = confirm(`
          <div class="alert-message">
            Congratulations! You completed the game in ${moves} moves.
            Would you like to start a new game?
            <button class="new-game-button" onclick="newstart()">New Game</button>
          </div>
        `);
        if (confirmation) {
          newstart();
        }
      }
      
}