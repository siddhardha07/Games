const emojiLength = 2;

function slice(start, end, text) {
  if (start > end) {
    return "";
  }

  return text[start] + slice(start + 1, end, text)
}

function eliminateLastSpace(string) {
  return slice(0, string.length - 2, string);
}

function squares(row, column) {
  let string = "";
  for (let coulmnIndex = 0; coulmnIndex < column; coulmnIndex++) {
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      string = string + "🔲";
    }

    string = string + "\n";
  }

  return eliminateLastSpace(string);
}

function rowLength(string, index) {
  if (string[index] === "\n" || index > string.length) {
    return index;
  }

  return rowLength(string, index + 1);
}

function getfrontIndex(index, string) {
  const lineLength = rowLength(string, 0);
  return index - lineLength - 1;
}

function getLeftIndex(index) {
  return index - emojiLength;
}

function getRigthIndex(index) {
  return index + emojiLength;
}

function getBackIndex(index, string) {
  const lineLength = rowLength(string, 0);
  return index + lineLength + 1;
}

function toSelectColumn(noOfColumns) {
  if (noOfColumns === 0) {
    return "";
  }

  return " " + noOfColumns + toSelectColumn(noOfColumns - 1);
}

function getActualMove(string, index) {
  return slice(index, index + 2, string);
}

function giveOptions(move) {
  if (move === "W" || move == "w") {
    console.log("\n ▲ 'Enter 'W' or 'w' ⬆ '");
    console.log(" ◀ 'Enter 'A' or 'a' ⬅ '");
    console.log(" ▶ 'Enter 'D' or 'd' ➤ '");
  }

  if (move === "A" || move == "a") {
    console.log("\n ▲ 'Enter 'W' or 'w' ⬆ '");
    console.log(" ◀ 'Enter 'A' or 'a' ⬅ '");
    console.log(" ▼ 'Enter 'D' or 'd' ⬇ '");
  }

  if (move === "D" || move == "d") {
    console.log("\n ▲ 'Enter 'W' or 'w' ⬆ '");
    console.log(" ▶ 'Enter 'D' or 'd' ➤ '");
    console.log(" ▼ 'Enter 's' or 's' ⬇ '");
  }

  if (move === "S" || move == "s") {
    console.log("\n ◀️ 'Enter 'A' or 'a' ⬅ '");
    console.log(" ▶️ 'Enter 'D' or 'd' ➤ '");
    console.log(" ▼ 'Enter 'S' or 's' ⬇ '");
  }
  return 0;
}

function isUserInputValid(move) {
  return (move === "W" || move === "w"
    || move === "A" || move === "a"
    || move === "D" || move === "d"
    || move === "S" || move === "s")
}

function convertCharToIndex(move, index, string) {
  if (move === "W" || move === "w") {
    return getfrontIndex(index, string);
  }

  if (move === "A" || move === "a") {
    return getLeftIndex(index);
  }

  if (move === "D" || move === "d") {
    return getRigthIndex(index);
  }

  if (move === "S" || move === "s") {
    return getBackIndex(index, string);
  }

  return false;
}

function getResultString(string, position, symbol) {
  let resultantString = "";
  let index = 0;
  while (index < string.length) {
    if (index === position) {
      resultantString = resultantString + symbol;
    } else if (string[index] + string[index + 1] === "🔲" || string[index] + string[index + 1] === "🟩") {
      resultantString = resultantString + string[index] + string[index + 1]
    }

    if (string[index] === "\n") {
      resultantString = resultantString + string[index];
    }
    index = index + 1;
  }

  return resultantString;
}

function mineMessage(string, currentPosition) {
  const mineString = getResultString(string, currentPosition, "💣");
  for (let iterations = 0; iterations < 12000; iterations++) {
    console.clear();
    console.log(printRules());
    if (iterations % 2 === 0) {
      console.log(string);
    } else {
      console.log(mineString);
    }
    console.log("\nOh! You stepped into a mine");
    delay(60000);
  }
}

function delay(max) {
  for (let iterations = 0; iterations < max; iterations++) {
  }
  return 0;
}

function printRules() {
  let rules = "\n💣 ---*MINEFIELD*--- 💀\n"
  rules = rules + "==> Find a way to reach home.☠️ 🏴‍☠️🏴‍☠️\n"
  rules = rules + "\nSTEP 1 ➤ 'Enter' the column number from where you want start."
  rules = rules + "\nSTEP 2 ➤ 'Enter' key according to 'Move'."
  rules = rules + "\nSTEP 3 ➤ If you stepped into a mine, the game will restart."
  rules = rules + "\nSTEP 4 ➤ Carefully remember route."
  rules = rules + "\nRULE ➤ YOU CANT ESCAPE AFTER STARTING THE GAME 💀\n"
  rules = rules + "--------------......................🛣️🏠"

  return rules;
}

function continueGame(string, map, currentPosition, currentMove) {
  for (let index = 4; index < map.length; index += 4) {
    const newString = getResultString(string, currentPosition, "🟩");
    string = newString;
    console.log(printRules());
    console.log(string);
    const actualMove = +getActualMove(map, index);

    giveOptions(currentMove);
    let userMove = prompt("\n'Enter here'...");

    while (!isUserInputValid(userMove)) {
      userMove = prompt("\nPlease Enter Valid Move..")
    }

    currentMove = userMove;
    const prevPosition = currentPosition;
    currentPosition = convertCharToIndex(currentMove, prevPosition, string);

    if (currentPosition !== actualMove) {
      mineMessage(string, currentPosition);
      console.clear();
      console.log(printRules());
      console.log(getResultString(string, currentPosition, "🟥"));
      prompt("\n😔 YOU STEPPED INTO MINE 💣 'RESTART AGAIN'", "'Press Enter'");
      return 0;
    }
    console.clear();
  }
  return 500;
}

function complement() {
  console.log("\n       🥳🥳🥳🥳🥳🥳🥳   \n");
  console.log("......👌🏻 SUPERB! BUDDY 👏🏼......");
  console.log("\n----* I KNOW YOU CAN DO IT *----\n\n")
}

function printStartinMsg(row, column) {
  console.clear();
  console.log(printRules());
  const string = squares(row, column);
  console.log(string);
  console.log(toSelectColumn(column));
  console.log("\nTO SELECT COLUMN ENTER 'Column' NUMBER\n");
  return string;
}

function startGame(map, row, column, toStop) {
  const string = printStartinMsg(row, column);
  console.log(map, map.length);
  const selectedColumn =  +prompt("\nSELECT A COLUMN TO CHECK..");
  const userFirstMove = string.length - selectedColumn * 2;
  const actualMove = +getActualMove(map, 0);
  const currentMove = "w";

  if (userFirstMove === actualMove) {
    console.clear();

    toStop = continueGame(string, map, actualMove, currentMove);
  }

  if (toStop === 500) {
    return complement();
  }

  return startGame(map, row, column);
}

function getRandomNum(rangeStart, rangeEnd) {
  const randomNum = (Math.ceil(Math.random() * rangeEnd));

  if (randomNum < rangeStart) {
    return getRandomNum(rangeStart, rangeEnd);
  }

  return randomNum;
}

function getNextChar(random) {
  switch(random) {
    case 2:
      return "d";
    case 3:
      return "w";
    case 4:
      return "a";
    default:
      return "s";
  }
}

function getNextIndex(position) {
  const random = getRandomNum(0, 4);
  if (position === "w") {
    return getNextChar(random) === "s" ? getNextChar(position) : getNextChar(random);
  }

  if (position === "a") {
    return getNextChar(random) === "d" ? getNextChar(position) : getNextChar(random);
  }

  if (position === "s") {
    return getNextChar(random) === "w" ? getNextChar(position) : getNextChar(random);
  }

  if (position === "d") {
    return getNextChar(random) === "a" ? getNextChar(position) : getNextChar(random);
  }
}

function getNextMoveIndex(move, index, string) {
  const safePlace = convertCharToIndex(move, index, string);
  if (safePlace === "\n") {
    return 0;
  }

  return safePlace;
}

function checkPrevious(string, index) {
  if(string[index] + string[index + 1] === "🔲") {
    return index;
  }

  let newPrev = string[index] === "\n" ? index + 1 : index - 1;
  return newPrev < 100 ? "0" + newPrev : newPrev;
}

function addZeroToPrevious(prev) {
  if(prev < 10) {
    prev = "0" + prev;
  }
  
  if (prev < 100) {
    prev = "0" + prev;
  }
  
  return prev;
}

function getMap(string, currentMove, column) {
  let previousMove = +getRandomNum(string.length - column, string.length - 1);
  previousMove = checkPrevious(string, previousMove);
  let map = "";

  while (previousMove >= 0 && previousMove < string.length) {
    map = map + previousMove + ",";
    const nextMove = getNextIndex(currentMove);
    previousMove = +getNextMoveIndex(nextMove, previousMove, string);
    currentMove = nextMove;
    previousMove = addZeroToPrevious(previousMove);
  }

  return map;
}

function createMap(row, column) {
  const string = squares(row, column);
  let currentMove = "w";
  return getMap(string, currentMove, column);
}

function verifyMap(row, column, max) {
  const trailMap = createMap(row, column);
  const firstIndex = +slice(0, 2, trailMap);
  const lastIndex = +slice(trailMap.length - 4, trailMap.length - 2, trailMap);
  if (firstIndex > trailMap.length - 1 
    && lastIndex < row * 2 && trailMap.length < max) {
    return trailMap;
  }

  return verifyMap(row, column, max)
}

function getLimit(column) {
  if (column === 5) {
    return 40;
  }

  return column === 7 ? 70 : 500;
}

function mineField(row, column) {
  const limit = getLimit(column);
  const map = verifyMap(row, column, limit);
  startGame(map, row, column, 50);
  if (confirm("🥹 DO YOU TO PLAY AGAIN 🥹")) {
    selectMode();
  } else {
    console.log("\n      😔 'Goodbye' 🖐🏼     \n");
  }
}

function modes() {
  console.clear();
  console.log("\n💀 Enter The Mode You Want To Play 💣\n");
  console.log("Easy   'Enter' '1'");
  console.log("Medium 'Enter' '2'");
  console.log("Hard   'Enter' '3'");
}

function selectMode() {
  modes();
  const mode = +prompt("\nEnter here....");
  if (mode === 1) {
    mineField(5,5);
  }

  if (mode === 2) {
    mineField(7,7);
  }

  if (mode === 3) {
    mineField(10,10)
  }
}

selectMode();
