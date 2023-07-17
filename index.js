const gameBoard = document.querySelector("#game-board");
const playButtons = document.querySelectorAll(".play-btn");
const choiceXorO = document.querySelectorAll(".x-button,.o-button");
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


/* ფლეიერ ერთში ინახება დაჭერისას არჩეული ცვლადი ანუ მაგალითად x ხარ თუ o */
let player1 = "x";


/* html ში startgame ს პარამეტრად მივანიჭეთ cpu და player ი ანუ
 <button class="yellow-btn" onclick="startGame('cpu')">
  <button class="blue-btn" onclick="startGame('player')">
  მოდი არის გლობალური ცვლადი და დეფაულთად მივანიჭეთ cpu*/
let mode = "cpu";


/* თრნი საზღვრავს ვისი სვლის ჯერია, ანუ იქსის ჩაწერის მერე სვლა გადადის ნულიკზე*/
let turn = "x";


/* ეს არის დაფაზე ყუთების ნომერაცია , ამით შემდეგ ვიგებთ რომელი ყუთები დარჩა 
შეუვსებელი და რა ინდექსზე დგანან*/
let freeBtnBox = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/* x da O არეა თავიდან გვაქვს ცარიელი, და როდესაც რამე უჯრაში ჩაწერ იქსს ან ნოლს ან
ჯერ ერთს მერე მეორეს ცარიელ არეას მიენიჭება ის ინდექსი რომელზეც ყუთია ანუ მოკლედ რომელ ყუთებში არიან რა*/
/* ასევე თითოეულ array ში ინახება ის უჯრები ის კომბინაციები რომელიც თითოეულმა შეავსო*/
let xArray = [];
let oArray = [];


/* x o და tie სქორები თავიდან ნოლია და იცვლება იმის მიხედვით ვინ გაიმარჯვა ან 
თუ ფრეა*/
let Xscore = 0;
let tieScore = 0;
let Oscore = 0;

/* აქ ჩამოწერილია მომგებიანი კომბინაციები იმისთვის რომ შევამოწმოთ ვინ მოიგო*/
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

/* html ში გვაქვს  <button class="x-button" onclick="activateChoice('x')">
ასევე  <button class="o-button active" onclick="activateChoice('o')">
და ამ ფუნქციით ვირჩევთ ვინ  იქნება x და ვინ o
icon ნიშნავს რომ პარამეტრად მიიღებს იმ x სს და o სს რომელიც htmlში ჩავუწერეთ */
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


/* ეს ფუნქცია ამოწმებს xის მოგებას */
/* ანუ აქ რახდება მომგებიანი კომბინეციებიდან ვეძებთ ისეთ კომბინაციას
რომელა წევრი ანუ ბათონი არის xarray ში ანუ რომელიც მხოლოდ x ებს შეიცავს*/
const checkXwin = () => {
  return winnerCombinations.find(combination => 
   combination.every(button => xArray.includes(button))
  );
};


/*  ეს ფუნქცია იქსის მოგების შემთხვევაში  იქსისთვის გამოაქვს ქულა
რომ მან მოიგო და აქვს ერთი ქულა ან მეტი ასე გამოაქვს დაფა სადაც წერს რომ იქსმა მოიგო
ამ ფუნქციამ რომ იმშაოს ის გამოვიძახეთ clickFunction ში კერძოდ if(win){ onWinX();
  */
const onWinX = () => {
  modal.style.display = "inline";
  modalIcon.src ="./assets/icon-x.svg";
  modalResultText.style.color ="#31C3BD";
  /*ეს თვლის ქულებს x ის მოგებისას*/
  Xscore++;
  /* ამა გამოაქვს ეს ქულა და წერს დაფის ქვეშ ქვემოთ თვალსაჩინოებისთვის*/
  xScore.textContent = Xscore;

  if(player1 === "x"){
    modalInfoText.textContent = "you won!";
  }else{
    modalInfoText.textContent = modalResultText.textContent;
  };
}; 


/* ეს ფუნქცია ამოწმებს o ის მოგებას*/
const checkOwin = () => {
  return winnerCombinations.find(combination => 
   combination.every(button => oArray.includes(button))
  );
};

/*  ეს ფუნქცია ნოლიკის მოგების შემთხვევაში  ნოლისთვის გამოაქვს ქულა
რომ მან მოიგო და აქვს ერთი ქულა ან მეტი ასე გამოაქვს დაფა სადაც წერს რომ ნოლიკმა მოიგო*/
const onWinO = () => {
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

/* ამ ფუნქციაში როგორც x ისთვის ასევე o ისთვის მოგების სტილიზაციას აკეთებს
ანუ მაგალითად  მოგებული ხაზის ბექგრაუნდის ფერი იცვლება 
ანუ მაგალითად xმა მოიგო 0 4 8 კომბინაციით ანუ array თ 
arrey [0] [1] [2] ნიშნავს რომ სამი უჯრის კომბინაციით იგება სამი უჯრის ბექგრაუნდი
იცვლება*/
const winningStyle = (array) =>{
  if( turn === "x"){
    playButtons[array[0]].style.backgroundColor = "#31C3BD";
    playButtons[array[1]].style.backgroundColor = "#31C3BD";
    playButtons[array[2]].style.backgroundColor = "#31C3BD";   
    playButtons[array[0]].firstElementChild.src ="./assets/icon-x-dark-gray.svg";
    playButtons[array[1]].firstElementChild.src ="./assets/icon-x-dark-gray.svg";
    playButtons[array[2]].firstElementChild.src ="./assets/icon-x-dark-gray.svg";
 
  }else{
    playButtons[array[0]].style.backgroundColor = "#F2B137";
    playButtons[array[1]].style.backgroundColor = "#F2B137";
    playButtons[array[2]].style.backgroundColor = "#F2B137"; 
    playButtons[array[0]].firstElementChild.src ="./assets/icon-o-dark-gray.svg";
    playButtons[array[1]].firstElementChild.src ="./assets/icon-o-dark-gray.svg";
    playButtons[array[2]].firstElementChild.src ="./assets/icon-o-dark-gray.svg";
 };
};

/* ამ ფუნქციაში x ს და o ს ვუყენებთ ბექგრაუნდ ჰოვერებს */
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

/*ამ ფუნქციით ვსვავთ xსს და oსს უჯრებში რიგირს შესაბამისად*/
const clickFunction = () => {
  /* ამ ციკლით ცრიდან ერთ-ერთ ფლეი ბუთონზ შეგვიძლია დაკლიკება რადგან ყველა ცარიელია */
    for (let index = 0; index < playButtons.length; index++){

/* ეს კონკრეტული ორი ხაზი ახალ რაუნდში დაფას გვისუფთავებს*/
     playButtons[index].style.backgroundColor = "#1F3641";
     playButtons[index].innerHTML = "";
      

        playButtons[index].onclick  = (event) => {
          /* ამას ვიყენებთ იმისთვის რომ x ის და o ის ჰოვერები ერთმანეტს არ 
          გადაეწეროს იმ უჯრაში სადაც უკვე x ი წერია ან o ი*/
            event.target.classList.remove("xHover");
            event.target.classList.remove("oHover");

            /* ეს ფუნქცია აკეთებს ამოჭრას,  freeBtnBox.indexOf არის ფუნქცია რომელიც ეძებს
            რომელ ინდექსზე დგას ეს კონკრეტული ელემენტი. ანუ ზემოთ მოცემული ციკლი 
            რომელ ინდექსზე დგას  freeBtnBox მასივში*/
            const spliceIndex = freeBtnBox.indexOf(index);
            /* ამით იჭრება ის ერთი პარამეტრი, 1 რადგან ერთი გვაქ მითითებული*/
            freeBtnBox.splice(spliceIndex, 1);
            
        /* ამ ფუნქციით აქედან ვმანიპულირებთ რომ უჯრაში რომელი სურათი გამოჩნდეს
        როგორც x ისთვის ისე o ისთვის*/
            const icon = document.createElement("img");
            icon.classList.add("players-icon");
            /* აქ უკვე დასაკლიკებლად ვსაზღვრავთ ვისი სვლაა x ის თუ o ის*/
            if( turn === "x"){
                icon.src = "./assets/icon-x.svg";
                /*  event.target.append ნიშნავს რომ ეს ასვავს ერთ ელმენტს მეორე ელემენტს
                შიგნით შვილას, ანუ შესაბამისად ჩვენი შექმნილი icon ელენტს*/
                event.target.append(icon);
                /* ეს ნიშნავს დაკლიკვის დროს x არეაში ჩამატებას */
                xArray.push(index);
      
                const win =  checkXwin();
                if(win){
                onWinX();
                winningStyle(win);
                /* აქ retutn ს ვიყენებთ ფუნქციის გასაწყვეტად რომ აღარაფერი
                აღარ მოხდეს*/
                 return;
               };
               if(xArray.length === 5){
                modalTie.style.display = "inline";
                tieScore++;
                tieScoreElement.textContent = tieScore;
               };
                turn = "o";
                /* აქ ვცვლით სურათ ზემოთ რომ პატარა ყუთია რომელიც აჩვენებს
                ვისი სვლაა, ანუ მაგ ყუთში ვცლით სურათს x ის და o ის სვლის
                შესაბამისად*/
                turnInfoImage.src="./assets/icon-o-small.svg";
            }else{
                icon.src = "./assets/icon-o.svg";
                /*  event.target.append ნიშნავს რომ ეს ასვავს ერთ ელმენტს მეორე ელემენტს
                შიგნით შვილას, ანუ შესაბამისად ჩვენი შექმნილი icon ელენტს*/
                event.target.append(icon);
                /* ეს ნიშნავს დაკლიკვის დროს o არეაში ჩამატებას */
                oArray.push(index);
                /* chechxwin ჩავსვით const win ცვლადში რადგან consol.log ით 
                შევძლოთ შემოწმება */
                const win =  checkOwin();
                if(win){
                onWinO();
                winningStyle(win);
                /* აქ retutn ს ვიყენებთ ფუნქციის გასაწყვეტად რომ აღარაფერი
                აღარ მოხდეს*/
                 return;
                };
                turn = "x";
                /* აქ ვცვლით სურათ ზემოთ რომ პატარა ყუთია რომელიც აჩვენებს
                ვისი სვლაა, ანუ მაგ ყუთში ვცლით სურათს x ის და o ის სვლის
                შესაბამისად*/
                turnInfoImage.src="./assets/icon-x-gray.svg";
            };
            /* ამ ფუნქციას ვიძახებთ თავიდან რადგან თუ მაგალითად პირველი სვლაზე გვქონდა
            x ის ჰოვერები ახლა უკვე o ის სვლის დროს ცარიელი უჯრებში გამოჩდეს o ის ჰოვერები
            მაგრამ იმისთვის რომ თავიდან გამოვიძახო უკვე ჩაწერილი უჯრები უნდა იყოს ამშლილი 
            playbutton ებიდან და დაემატოს შესაბამის xarray შინ ან oarray ში.
            ანუ ახლა უნდა ვიპოვოთ რომელ უჯრაში შეგვიძლია დავაკლიკოთ,ვნახოთ ეს კონკრეტული უჯრა
            რომელ ინდექსზე დგას 
            ზემოთ ვქმნით ასეთ ფუნქციას const spliceIndex = freeBtnBox.indexOf(index);
            ამოიჭრება ელემნეტი და შესაბამისად ამოჭრილ ელმენტზე აღარ მოხდება მანიპულაციას
            და მხოლოდ ცარიელებს მისცემს*/
            onHoverEffects();
            /* ამით ჩაწერილ დაკავებულ უჯერას საერთოდ ვსხნით კლიკის ფუნქციას*/
            event.target.onclick = null;
       };
    };
};


/* ეს ფუნქცია მიმაგრებიული ყვითელ და ლურჯ ბუთონებზე ფრჩხილებში ჩაწერილი Mode არის 
ფუნქციის პარამეტრი (და არა გლობალური პარამეტრი)
როცა ვწერთ რომ mode = Mode ეს ნიშნავს რომ ანუ ფუნქცის პარამეტრი გახდეს ის რაც იქნება
გლობალური პარამეტრი*/
const startGame = (Mode) => {
     gameMenu.style.display = "none";
     gameStart.style.display ="flex"
     mode = Mode;
    console.log(mode);

     onHoverEffects();
     clickFunction();
     /* ამ ლოგიკით შესაბამის მოთამაშეს ვანიჭებთ შესაბამის მოგებულ ქულას
     რომელიც იწერება დაფის ქვემოთ შესაბამის ადგილას*/
           if(Mode === "player") {
            if (player1 === "x") {
              xScoreText.textContent = "X (P1)";
              oScoreText.textContent = "O (P2)";
            } else {
              xScoreText.textContent = "X (P2)";
              oScoreText.textContent = "O (P1)";
            };
          } else {
            if (player1 === "o") {
              xScoreText.textContent = "X (CPU)";
              oScoreText.textContent = "O (YOU)";
            } else {
              xScoreText.textContent = "X (YOU)";
              oScoreText.textContent = "O (CPU)";
            };
     };
};


const reset = () => {
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

