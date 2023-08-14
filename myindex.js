const gameBoard = document.querySelector("#game-board");
const cpuBtn = document.querySelector(".yellow-btn");
const playerBtn = document.querySelector(".blue-btn");
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

const startGame = async (Mode, playerChoice) => {
  gameMenu.style.display = "none";
  gameStart.style.display = "flex";
  mode = Mode;

  if (Mode === "player") {
      playWithPlayer();
  } else if (Mode === "cpu") {
      playWithCpu();
      if (playerChoice === "x") {
      makeComputerMoveO(); 
    } else {
      makeComputerMoveX(); 
    }
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
 const isTerminalState = () => {
  checkXwin();
  checkOwin();
  const isDraw = freeBtnBox.length === 0 && !checkXwin() && !checkOwin();
  return checkXwin() || checkOwin() || isDraw;
};
const evaluate = () => {
  if (checkXwin()) return -100;
  if (checkOwin()) return 100;
  return 0; 
 
};
const minimax = (depth, isMaximizing, alpha, beta) => {
  if (isTerminalState() || depth >= 1) {
      const score = evaluate();
      return isMaximizing ? score - depth : score + depth;
  }    
  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (const index of freeBtnBox) {
      if (!xArray.includes(index) && !oArray.includes(index)) {
          const currentPlayer = isMaximizing ? "o" : "x";
          currentPlayer === "o" ? oArray.push(index) : xArray.push(index);

          const currentScore = minimax(depth + 1, !isMaximizing, alpha, beta);

          if (isMaximizing) {
              bestScore = Math.max(bestScore, currentScore);
              alpha = Math.max(alpha, bestScore);
          } else {
              bestScore = Math.min(bestScore, currentScore);
              beta = Math.min(beta, bestScore);
          }
          
          currentPlayer === "o" ? oArray.pop() : xArray.pop();

          // Alpha-beta pruning
          if (beta <= alpha) {
              break;
          }
      }
  }

  return bestScore;
};
const getBestMove = () => {
  let bestMove;
  let bestScore = -Infinity;
  const alpha = -Infinity;
  const beta = Infinity;

  for (const index of freeBtnBox) {
      if (!xArray.includes(index) && !oArray.includes(index)) {
          oArray.push(index);
          const score = minimax(0, false, alpha, beta);
          oArray.pop();

          if (score > bestScore) {
              bestScore = score;
              bestMove = index;
          }
      }
  }

  return bestMove;
};
const makeComputerMoveX = () => {
  if (mode === "cpu" && player1 === "o"  && !isTerminalState()) {
      const bestMove = getBestMove();
      const cpuButton = playButtons[bestMove];
      setTimeout(() => {
          cpuButton.click();
      }, 500); // Delay the computer's move for better UX
  }
};
const makeComputerMoveO = () => {
  if (mode === "cpu" && player1 === "x"  && !isTerminalState()) {
      const bestMove = getBestMove();
      const cpuButton = playButtons[bestMove];
      setTimeout(() => {
          cpuButton.click();
      }, 500); 
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
      if (turn === "o" && mode === "cpu") {
        makeComputerMoveO();
      }
      if (turn === "x" && mode === "cpu") {
        makeComputerMoveX();
      }
      checkWinner();
      ifDraw();
      onHoverEffects();
      event.target.onclick = null;
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

