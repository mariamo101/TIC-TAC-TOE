const choiceXorO = document.querySelectorAll(".x-button,.o-button");
const gameMenu = document.querySelector("#game-menu");
const gameStart = document.querySelector("#start-game");
let player1 = "x";
let mode = "cup";

const activateChoice = (icon) => {
    if (icon === "x"){
        choiceXorO[0].classList.add("active");
        choiceXorO[1].classList.remove("active");
        let player1 = "x";
    }else{
        choiceXorO[1].classList.add("active");
        choiceXorO[0].classList.remove("active");
        let player1 = "o";
    }
};

const startGame = (Mode) => {
     gameMenu.style.display = "none";
     gameStart.style.display ="flex"
     mode = Mode;
     console.log(mode);
};