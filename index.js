const gameBoard = document.querySelector("#game-board");
const playButtons = document.querySelectorAll(".play-btn");
const choiceXorO = document.querySelectorAll(".x-button,.o-button");
const gameMenu = document.querySelector("#game-menu");
const gameStart = document.querySelector("#start-game");
const xScoreText = document.querySelector("#x-score-text");
const oScoreText = document.querySelector("#o-score-text");
const xScore = document.querySelector("#x-score");
const oScore = document.querySelector("#o-score");
const turnInfoImage = document.querySelector("#turn-box img");
const modal = document.querySelector("#modal");
const modalInfoText = document.querySelector(".result-info-text");
const modalIcon = document.querySelector(".icon-result img");
const modalResultText = document.querySelector(".result-text");



let player1 = "x";
let mode = "cup";
let turn = "x";
let freeBtnBox = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xArray = [];
let oArray = [];
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
};

const checkXwin = () => {
  return winnerCombinations.find(combination => 
   combination.every(button => xArray.includes(button))
  );

};
const onWinX = () => {
  modal.style.display = "inline";
  modalIcon.src ="./assets/icon-x.svg";
  modalResultText.style.color = "#31C3BD";
  gameBoard.style.backgroundColor = " #000";
  gameBoard.style.opacity = "0.5";
  
  if(player1 === "x"){
    modalInfoText.textContent = "you won!";
  }else{
    modalInfoText.textContent = modalResultText.textContent;
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
        }
    }
};

const clickFunction = () => {
    for (let index = 0; index < playButtons.length; index++){
        playButtons[index].onclick  = (event) => {
            event.target.classList.remove("xHover");
            event.target.classList.remove("oHover");

            const spliceIndex = freeBtnBox.indexOf(index);
            freeBtnBox.splice(spliceIndex, 1);


            const icon = document.createElement("img");
            icon.classList.add("players-icon");
            if( turn === "x"){
                icon.src = "./assets/icon-x.svg";
                event.target.append(icon);
                xArray.push(index);
                const win =  checkXwin();
               if(win){
                onWinX();
                 return;
               }
                turn = "o";
                turnInfoImage.src="./assets/icon-o-small.svg";
            }else{
                icon.src = "./assets/icon-o.svg";
                event.target.append(icon);
                oArray.push(index);
                turn = "x";
                turnInfoImage.src="./assets/icon-x-gray.svg";
            }
            onHoverEffects();
            event.target.onclick = null;
       };
    }
} 
const startGame = (Mode) => {
     gameMenu.style.display = "none";
     gameStart.style.display ="flex"
     mode = Mode;
     onHoverEffects();
     clickFunction();
           if(Mode === "player") {
            if (player1 === "x") {
              xScoreText.textContent = "X (P1)";
              oScoreText.textContent = "O (P2)";
            } else {
              xScoreText.textContent = "X (P2)";
              oScoreText.textContent = "O (P1)";
            }
          } else {
            if (player1 === "x") {
              xScoreText.textContent = "X (YOU)";
              oScoreText.textContent = "O (CPU)";
            } else {
              xScoreText.textContent = "X (CPU)";
              oScoreText.textContent = "O (YOU)";
            }
          }
        };