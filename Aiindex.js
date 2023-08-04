// Minimax algorithm for Tic-Tac-Toe
const minimax = (board, depth, isMaximizing) => {
    const scores = {
      x: 10,
      o: -10,
      tie: 0,
    };
  
    const winner = checkWinner();
    if (winner !== null) {
      return scores[winner];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "x";
          const score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(bestScore, score);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "o";
          const score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(bestScore, score);
        }
      }
      return bestScore;
    }
  };
  
  // Function to find the best move for CPU using minimax
  const findBestMove = () => {
    let bestScore = -Infinity;
    let bestMove;
  
    for (let i = 0; i < 9; i++) {
      if (freeBtnBox.includes(i)) {
        gameBoard.innerHTML = gameBoard.innerHTML.slice(0, -12);
        gameBoard.innerHTML += "<div class='play-btn xHover'></div>";
        const newBoard = Array.from(freeBtnBox);
        newBoard.splice(newBoard.indexOf(i), 1);
        newBoard.push(i);
        const moveScore = minimax(newBoard, 0, false);
        if (moveScore > bestScore) {
          bestScore = moveScore;
          bestMove = i;
        }
      }
    }
  
    return bestMove;
  };
  
  // CPU plays its turn
  const cpuPlay = () => {
    const bestMove = findBestMove();
    const btn = playButtons[bestMove];
    btn.classList.remove("xHover");
    btn.classList.remove("oHover");
    const icon = document.createElement("img");
    icon.classList.add("players-icon");
    icon.src = "./assets/icon-x.svg";
    btn.append(icon);
    const spliceIndex = freeBtnBox.indexOf(bestMove);
    freeBtnBox.splice(spliceIndex, 1);
    xArray.push(bestMove);
    turn = "o";
    turnInfoImage.src = "./assets/icon-o-small.svg";
    checkWiner();
    ifDeaw();
    onHoverEffects();
  };
  
  // Update your clickFunction to handle the player's move
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
        checkWiner();
        ifDeaw();
        onHoverEffects();
        event.target.onclick = null;
  
        if (mode === "cpu" && turn === "o" && freeBtnBox.length > 0) {
          setTimeout(() => {
            cpuPlay();
          }, 500);
        }
      };
    }
  };
  
  // Add a checkWinner function (assuming you don't have it already)
  const checkWinner = () => {
    const checkWin = (array) => {
      return winnerCombinations.some((combination) =>
        combination.every((button) => array.includes(button))
      );
    };
  
    if (checkWin(xArray)) {
      return "x";
    } else if (checkWin(oArray)) {
      return "o";
    } else if (freeBtnBox.length === 0) {
      return "tie";
    } else {
      return null;
    }
  };
  
  // Call the startGame function as usual to start the game
  





  // This function checks if the current state is a terminal state (win, lose, draw)
const isTerminalState = () => {
  // Check if X has won
  const xWin = winnerCombinations.some(combination =>
    combination.every(button => xArray.includes(button))
  );

  // Check if O has won
  const oWin = winnerCombinations.some(combination =>
    combination.every(button => oArray.includes(button))
  );

  // Check for a draw
  const isDraw = freeBtnBox.length === 0 && !xWin && !oWin;

  return xWin || oWin || isDraw;
};

// This function evaluates the current state for the maximizing player (O)
const evaluate = () => {
  // Assuming the computer is O and wants to maximize its score
  if (player1 === "x") {
    if (isTerminalState()) {
      if (xWin) return -10;
      if (oWin) return 10;
      return 0; // Draw
    }
  } else {
    if (isTerminalState()) {
      if (xWin) return 10;
      if (oWin) return -10;
      return 0; // Draw
    }
  }

  return null; // The game is not over yet
};

// The minimax function itself
const minimax = (depth, isMaximizing) => {
  const score = evaluate();

  if (score !== null) {
    return score;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const index of freeBtnBox) {
      // Simulate a move for O
      oArray.push(index);
      const currentScore = minimax(depth + 1, false);
      bestScore = Math.max(bestScore, currentScore);
      oArray.pop(); // Undo the move
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const index of freeBtnBox) {
      // Simulate a move for X
      xArray.push(index);
      const currentScore = minimax(depth + 1, true);
      bestScore = Math.min(bestScore, currentScore);
      xArray.pop(); // Undo the move
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

// Modify your clickFunction to call the getBestMove function for the computer's turn
const clickFunction = () => {
  for (let index = 0; index < playButtons.length; index++) {
    // ...

    playButtons[index].onclick = (event) => {
      // ...
      
      // Player's move
      // ...
      
      // Computer's move
      if (mode === "cpu" && turn === "o") {
        const bestMove = getBestMove();
        const cpuButton = playButtons[bestMove];
        // Simulate a click on the best move for the computer
        cpuButton.click();
      }
    };
  }
};
