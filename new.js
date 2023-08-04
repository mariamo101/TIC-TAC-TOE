
const gameBoard = document.querySelector("#game-board");
const cpuBtn = document.querySelector("yellow-btn");
const playerBtn = document.querySelector("blue-btn");
const playButtons = document.querySelectorAll(".play-btn");
const choiceXorO = document.querySelectorAll(".x-button,.o-button");
const choiceX = document.querySelector(".x-button");
const choiceO = document.querySelector(".o-button");
const gameMenu = document.querySelector("#game-menu");
const gameStart = document.querySelector("#start-game");
const xScoreText = document.querySelector("#x-score-text");
const oScoreText = document.querySelector("#o-score-text");
const xScore = document.querySelector("#x-score");
const oScore = document.querySelector("#o-score");
const tieScoreElement = document.querySelector("#tie-score");
const turnInfoImage = document.querySelector("#turn-box img");
const modal = document.querySelector("#modal");
const modalTie = document.querySelector("#modal-tie");
const modalRestart = document.querySelector("#modal-restart");
const modalInfoText = document.querySelector(".result-info-text");
const modalIcon = document.querySelector(".icon-result img");
const modalResultText = document.querySelector(".result-text");


let freeBtnBox = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let player1 = "x";
let mode = "cpu";
let turn = "x";
let xArray = [];
let oArray = [];
let Xscore = 0;
let tieScore = 0;
let Oscore = 0;



let winnerCombinations = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const startGame = (Mode) => {
    gameMenu.style.display = "none";
    gameStart.style.display ="flex";
    mode = Mode;
    console.log(mode);
     if(Mode === "player") {
     playWithPlayer();
     }
     if(Mode === "cpu"){
      playWithCpu();
     }
     onHoverEffects();
     clickFunction();
    
};

const activateChoice = (icon) => {
    if (icon === "x"){
        choiceXorO[0].classList.add("active");
        choiceXorO[1].classList.remove("active");
        player1 = "x";
    }else{
        choiceXorO[1].classList.add("active");
        choiceXorO[0].classList.remove("active");
        player1 = "o";
    }
    console.log(player1);
};
const playWithPlayer = () =>{
    if (player1 === "x") {
      xScoreText.textContent = "X (P1)";
      oScoreText.textContent = "O (P2)";
    } else {
      xScoreText.textContent = "X (P2)";
      oScoreText.textContent = "O (P1)";
    };
};
const playWithCpu = () =>{
if (player1 === "o") {
  xScoreText.textContent = "X (CPU)";
  oScoreText.textContent = "O (YOU)";
} else{
  xScoreText.textContent = "X (YOU)";
  oScoreText.textContent = "O (CPU)";
}
};
const onHoverEffects = () => {
    for (let index = 0; index < freeBtnBox.length; index++) {
        const playButtonsIndex =  freeBtnBox[index];
        if( turn === "x"){
        playButtons[playButtonsIndex].classList.add("xHover");
        playButtons[playButtonsIndex].classList.remove("oHover");
        }else{
            playButtons[playButtonsIndex].classList.add("oHover");
            playButtons[playButtonsIndex].classList.remove("xHover");
        };
    };      
};
const clickFunction = () => {
    for (let index = 0; index < playButtons.length; index++) {
      playButtons[index].style.backgroundColor = "#1F3641";
      playButtons[index].innerHTML = "";
  
      playButtons[index].onclick = (event) => {
        event.target.classList.remove("xHover");
        event.target.classList.remove("oHover");
        const spliceIndex = freeBtnBox.indexOf(index);
        freeBtnBox.splice(spliceIndex, 1);
        const icon = document.createElement("img");
        icon.classList.add("players-icon");
  
        if (turn === "x") {
          icon.src = "./assets/icon-x.svg";
          event.target.append(icon);
          xArray.push(index);
          turn = "o";
          turnInfoImage.src = "./assets/icon-o-small.svg";
        } else {
          icon.src = "./assets/icon-o.svg";
          event.target.append(icon);
          oArray.push(index);
          turn = "x";
          turnInfoImage.src = "./assets/icon-x-gray.svg";
        }
  
        checkWinner();
        ifDraw();
        onHoverEffects();
        event.target.onclick = null;
  
        // Computer's move
        if (mode === "cpu" && turn === "o" && !isTerminalState()) {
          const bestMove = getBestMove();
          const cpuButton = playButtons[bestMove];
          setTimeout(() => {
            cpuButton.click();
          }, 500); // Delay the computer's move for better UX
        }
      };
    }
  };
  
const checkXwin = () => {
    return winnerCombinations.find(combination => 
     combination.every(button => xArray.includes(button))
    );
  };
 const checkOwin = () => {
    return winnerCombinations.find(combination => 
     combination.every(button => oArray.includes(button))
    );
  };
 const ifWinX = () => {
    modal.style.display = "inline";
    modalIcon.src ="./assets/icon-x.svg";
    modalResultText.style.color ="#31C3BD";
    Xscore++;
    xScore.textContent = Xscore;
    console.log(xScore.textContent);
  
    if(player1 === "x"){
      modalInfoText.textContent = "you won!";
    }else{
      modalInfoText.textContent = modalResultText.textContent;
    };
  }; 
 const ifWinO = () => { 
    modal.style.display = "inline";
    modalIcon.src ="./assets/icon-o.svg";
    modalResultText.style.color ="#F2B137";
    Oscore++;
    oScore.textContent = Oscore;
  
    if(player1 !== "x"){
      modalInfoText.textContent = "you won!";
    }else{
      modalInfoText.textContent = modalInfoText.textContent;
    };
  };
const checkWinner = () =>{
    const winnerX = checkXwin();
  if( winnerX === checkXwin()){
    if(winnerX){
    ifWinX();
    winningStyle(winnerX);
    return;
};
  }
 const winnerO = checkOwin();
  if( winnerO === checkOwin()){
        if(winnerO){
        ifWinO();
        winningStyle(winnerO);
        return;
        };
       };
    };
    const ifDraw = () => {
        if (xArray.length + oArray.length === 9 && !checkXwin() && !checkOwin()) {
          modalTie.style.display = "inline";
          tieScore++;
          tieScoreElement.textContent = tieScore;
        }
      };
      
const winningStyle = (array) =>{
    if( turn === "o"){
      playButtons[array[0]].style.backgroundColor = "#31C3BD";
      playButtons[array[1]].style.backgroundColor = "#31C3BD";
      playButtons[array[2]].style.backgroundColor = "#31C3BD";   
      playButtons[array[0]].firstElementChild.src ="./assets/icon-x-dark-gray.svg";
      playButtons[array[1]].firstElementChild.src ="./assets/icon-x-dark-gray.svg";
      playButtons[array[2]].firstElementChild.src ="./assets/icon-x-dark-gray.svg";
   
    } 
    if( turn === "x"){
      playButtons[array[0]].style.backgroundColor = "#F2B137";
      playButtons[array[1]].style.backgroundColor = "#F2B137";
      playButtons[array[2]].style.backgroundColor = "#F2B137"; 
      playButtons[array[0]].firstElementChild.src ="./assets/icon-o-dark-gray.svg";
      playButtons[array[1]].firstElementChild.src ="./assets/icon-o-dark-gray.svg";
      playButtons[array[2]].firstElementChild.src ="./assets/icon-o-dark-gray.svg";
   }
};
const reset = () => {
    xScore.textContent = 0;
    oScore.textContent = 0;
    tieScoreElement.textContent = 0;   
    turn = "x";
    freeBtnBox = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    xArray = [];
    oArray = [];
    modal.style.display = "none";
    modalTie.style.display = "none";     
};
const quit = () => {
    reset();
    Xscore = 0;
    tieScore = 0;
    Oscore = 0;
    gameStart.style.display = "none";
    gameMenu.style.display = "inline";
    xScore.textContent = 0;
    oScore.textContent = 0;
    tieScoreElement.textContent = 0;     
};
const nextRound = () => {
  turn = "x";
  freeBtnBox = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  xArray = [];
  oArray = [];
  modal.style.display = "none";
  modalTie.style.display = "none";    
  startGame(mode);      
};
const openRestartModal = () => {
modalRestart.style.display = "inline";
};
const Close = () =>{
modalRestart.style.display = "none";
};
const restartF = () =>{
modalRestart.style.display = "none";
Xscore = 0;
tieScore = 0;
Oscore = 0;
xScoreText.textContent = 0;
oScoreText.textContent = 0;
reset();
startGame(mode);
modalRestart.style.display = "none";
}; 



// This function checks if the current state is a terminal state (win, lose, draw)
// This function checks if the current state is a terminal state (win, lose, draw)
const isTerminalState = () => {
    // Check if X has won
    checkXwin();
    
    // Check if O has won
    checkOwin();
  
    // Check for a draw
    const isDraw = freeBtnBox.length === 0 && !checkXwin() && !checkOwin();
  
    return checkXwin() || checkOwin() || isDraw;
  };

  
  // This function evaluates the current state for the maximizing player (O)
  const evaluate = () => {
    // Assuming the computer is O and wants to maximize its score
    if (player1 === "x") {
      if (isTerminalState()) {
        if (checkXwin()) return -10;
        if (checkOwin()) return 10;
        return 0; // Draw
      }
    } else {
      if (isTerminalState()) {
        if (checkXwin()) return 10;
        if (checkOwin()) return -10;
        return 0; // Draw
      }
    }
  
    return null; // The game is not over yet
  };
  
  // The minimax function itself
  const minimax = (depth, isMaximizing) => {
    if (isTerminalState()) {
      return evaluate();
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const index of freeBtnBox) {
        if (!xArray.includes(index) && !oArray.includes(index)) {
          // Simulate a move for O
          oArray.push(index);
          const currentScore = minimax(depth + 1, false);
          bestScore = Math.max(bestScore, currentScore);
          oArray.pop(); // Undo the move
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const index of freeBtnBox) {
        if (!xArray.includes(index) && !oArray.includes(index)) {
          // Simulate a move for X
          xArray.push(index);
          const currentScore = minimax(depth + 1, true);
          bestScore = Math.min(bestScore, currentScore);
          xArray.pop(); // Undo the move
        }
      }
      return bestScore;
    }
  };
  
  
  // This function returns the best move for the computer
  const getBestMove = () => {
    let bestMove;
    let bestScore = -Infinity;
    for (const index of freeBtnBox) {
      // Simulate a move for O
      oArray.push(index);
      const score = minimax(0, false);
      oArray.pop(); // Undo the move
  
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
    return bestMove;
  };
  