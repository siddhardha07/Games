const SPACE = " ";
const ALL_SPACE = "        ";

function slice(start, end, text) {
  if (start > end) {
    return "";
  }

  return text[start] + slice(start + 1, end, text)
}

function getReplacedText(text, target, replacement, index) {
  if (index > text.length - 1) {
    return "";
  }

  if (index === target) {
    return replacement + getReplacedText(text, target, replacement, index + 8);
  }

  return text[index] + getReplacedText(text, target, replacement, index + 1);
}

function replace(text, target, replacement) {
  if (text === "") {
    return text;
  }

  return getReplacedText(text, target, replacement, 0);
}

function giveBoard() {
  let board = '';

  board += "┏━━━━━━━━┳━━━━━━━━┳━━━━━━━━┳━━━━━━━━┓\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┣━━━━━━━━╋━━━━━━━━╋━━━━━━━━╋━━━━━━━━┫\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┣━━━━━━━━╋━━━━━━━━╋━━━━━━━━╋━━━━━━━━┫\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┣━━━━━━━━╋━━━━━━━━╋━━━━━━━━╋━━━━━━━━┫\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┃        ┃        ┃        ┃        ┃\n"
  board += "┗━━━━━━━━┻━━━━━━━━┻━━━━━━━━┻━━━━━━━━┛";

  return board;
}

function convertNumToString(number) {
  if (number < 1) {
    return ALL_SPACE;
  }
  let value = "" + number;
  const noOfDigits = value.length;

  for (let i = noOfDigits; i < 7; i += 2) {
    value = SPACE + value + SPACE;
  }

  if (value.length < 8) {
    return value = SPACE + value;
  }

  return value;
}

function arrangeBoard(num, index, toSpaceIndex, board) {
  const value = convertNumToString(num);
  const updatedBoard = replace(board, index, value);

  return replace(updatedBoard, toSpaceIndex, ALL_SPACE);
}

function addCommanNumbers(board, index, nextNumIndex, sideNumLength) {
  let updatedBoard = board;
  let aboveNumIndex = index;

  for (let index = 0; index < 4; index++) {
    const aboveNumber = +slice(aboveNumIndex, aboveNumIndex + 7, updatedBoard);
    const belowNumIndex = aboveNumIndex + nextNumIndex;
    const belowNumber = +slice(belowNumIndex, belowNumIndex + 7, updatedBoard);

    if (aboveNumber === belowNumber || aboveNumber === 0) {
      const resultantNum = aboveNumber + belowNumber;
      updatedBoard = arrangeBoard(resultantNum, aboveNumIndex, belowNumIndex, updatedBoard);
    }

    aboveNumIndex = aboveNumIndex + sideNumLength;
  }

  return updatedBoard;
}

function arrangeAccordingToMove(board, numberIndex, difference, sideNumLength, toCheck) {
  let updatedBoard = board;

  if (toCheck === 0) {
    return updatedBoard;
  }

  const updatedTopRow = addCommanNumbers(updatedBoard, numberIndex, difference, sideNumLength);//towords up
  const updatedSecondRow = addCommanNumbers(updatedTopRow, numberIndex + difference, difference, sideNumLength);
  const updatedThirdRow = addCommanNumbers(updatedSecondRow, numberIndex + difference * 2, difference, sideNumLength);
  const updatedLastRow = addCommanNumbers(updatedThirdRow, numberIndex, difference, sideNumLength);//towords up

  return arrangeAccordingToMove(updatedLastRow, numberIndex, difference, sideNumLength, toCheck - 1);
}

function userDecition(board, userMove) {
  if (userMove === "W" || userMove === "w") {
    return arrangeAccordingToMove(board, 77, 152, 9, 2);
  }

  if (userMove === "S" || userMove === "s") {
    return arrangeAccordingToMove(board, 560, -152, -9, 2);
  }

  if (userMove === "A" || userMove === "a") {
    return arrangeAccordingToMove(board, 77, 9, 152, 2);
  }

  if (userMove === "D" || userMove === "d") {
    return arrangeAccordingToMove(board, 560, -9, -152, 2);
  }
}

function getInstructions() {
  let rules = "\n 🔺 'Enter 'W' or 'w' ⬆️ \n 🔻 'Enter 's' or 's' ⬇️\n";

  return rules + " 👈 'Enter 'A' or 'a' ⬅️ \n 👉 'Enter 'D' or 'd' ➡️ \n";
}

function playerInput() {
  let playerMove = prompt("Enter here : ");

  while (!isUserInputValid(playerMove)) {
    playerMove = prompt("Invalid Move Try Again : ");
  }

  return playerMove;
}

function isUserInputValid(move) {
  return (move === "W" || move === "w"
    || move === "A" || move === "a"
    || move === "D" || move === "d"
    || move === "S" || move === "s")
}

function getLeastInRow(board, startingIndex) {
  let leastInRow = 2048;
  let updatedBoard = board;
  let numberIndex = startingIndex

  for (let index = 0; index < 4; index++) {
    const least = +slice(numberIndex, numberIndex + 7, updatedBoard);

    if (leastInRow > least && least !== 0) {
      leastInRow = least;
    }

    numberIndex += 9;
  }

  return leastInRow;
}

function getLeastInBoard(board, startingIndex) {
  let leastInBoard = 2048;
  let numberIndex = startingIndex

  for (let index = 0; index < 4; index++) {
    const leastInRow = getLeastInRow(board, numberIndex);
    if (leastInBoard > leastInRow && leastInRow !== 0) {
      leastInBoard = leastInRow;
    }
    numberIndex += 152;
  }

  return leastInBoard === 2048 ? 2 : leastInBoard;
}

function getRandomNum(from, to) {
  return from + Math.ceil(Math.random() * (to - from));
}

function generateNum(board, index) {
  const randomNum = getRandomNum(0, 100);

  if (randomNum % 2 === 0) {
    const leastInBoard = getLeastInBoard(board, 77);
    const value = convertNumToString(leastInBoard);

    return replace(board, index, value);
  }

  return board;
}

function gameOverMsg(playerName, playerScore) {
  if (playerScore > 3000) {
    let winnerMsg = "\n🏅 Winners never quit, and quitters never win. 🏆\n";
    winnerMsg = winnerMsg + playerName + "\n You Are The True Winner 🫂\n";
    return winnerMsg + "\n Your Score : " + playerScore;
  }

  if (playerScore > 800) {
    let gameOver = "\n Well Done  " + playerName + "\n";
    gameOver = gameOver + "\n Your Score : " + playerScore + "\n";
    return gameOver + "\n😊 I am Proud Of The Effort You Put In. 🥹";
  }


  return "\n😊 Well Done " + playerName + "\nYour Score : " + playerScore;
}

function fillMTrows(board, startingIndex) {
  let updatedBoard = board;
  let numberIndex = startingIndex;

  for (let index = 0; index < 4; index++) {
    if (+slice(numberIndex, numberIndex + 7, updatedBoard) === 0) {
      updatedBoard = generateNum(updatedBoard, numberIndex);
    }

    numberIndex += 9;
  }

  return updatedBoard;
}

function fillMTbox(board, rowIndex) {
  let updatedBoard = board;

  if (rowIndex > board.length) {
    return updatedBoard;
  }

  updatedBoard = fillMTrows(updatedBoard, rowIndex);

  return fillMTbox(updatedBoard, rowIndex + 152);
}

function gameName() {
  const name = ("\n-------------* 2️⃣ 0️⃣ 4️⃣ 8️⃣  *-------------\n");

  return name + "A Single-Player Sliding Block Puzzle Game\n";
}

function gameRules() {
  let rules = "\n👉🏿 The objective of the game is to slide numbered tiles on a grid"
  rules += "\n👉🏿 To combine them to create a tile with the number 2048\n"
  rules += "👉🏿 However one can continue to play the game after reaching the goal";
  return rules + "\n👉🏿 Creating tiles with larger numbers."
}

function mainFunction(board, playerName, playerScore) {
  console.clear();
  console.log(gameName());

  const generatedBoard = fillMTbox(board, 77);

  console.log(generatedBoard);
  console.log("\n" + playerName + "'s Score : " + playerScore + "\n");
  console.log(getInstructions());

  const userMove = playerInput();
  const updatedBoard = userDecition(generatedBoard, userMove);

  if (board === updatedBoard) {
    return playerScore;
  }

  return mainFunction(updatedBoard, playerName, playerScore + 10);
}

function main() {
  console.clear();

  const board = giveBoard();

  console.log(gameName());
  console.log(gameRules());

  const playerName = prompt("\nEnter Your Name To Continue : ")
  const playerScore = mainFunction(board, playerName, 0);

  console.log(gameOverMsg(playerName, playerScore));

  if (confirm("\n 🥹 Do You Want To Play Again 🥹")) {
    main();
  } else {
    console.log("\n      😔 'Goodbye' 🖐🏼     \n");
  }
}

main();
