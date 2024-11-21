// Assume rangeStart and rangeEnd are always greater than 0.
// rangeStart is always less than rangeEnd.

function getWelcomeMsg(rangeStart, rangeEnd, maxAttempts) {
  console.log("\nWelcome to Guess the Number!");

  let welcomeMsg = "\nThe secret number is between " + rangeStart + " and ";
  welcomeMsg = welcomeMsg + rangeEnd + ". You have " + maxAttempts;
  welcomeMsg = welcomeMsg + " attempts to find it.";
  
  console.log(welcomeMsg);
}

function getRandomNum(rangeStart, rangeEnd) {
  const numToGuess = (Math.ceil(Math.random() * rangeEnd));

  if (numToGuess <= rangeStart) {
    return getRandomNum(rangeStart, rangeEnd);
  }

  return numToGuess;
}

function getUserInput(toAttempts) {
  const triesMsg = "Take a guess! (Remaining attempts:" + toAttempts + ")";

  return prompt(triesMsg);
}

function isUserInputValid(userInput, rangeStart, rangeEnd) {
  return rangeStart <= userInput && userInput <= rangeEnd;
}

function howClose(numToGuess, userInput) {
  if (userInput < numToGuess) {
    if (userInput < numToGuess - 10) {
      return userInput + " Too low! Try a higher number.";
    }
    return userInput + " is Close 🤩! Try a higher number.";
  }

  if (userInput > numToGuess) {
    if (userInput > numToGuess + 10) {
      return userInput + " Too high! Try a smaller number.";
    }
    return userInput + " is Close 🤗! Try a smaller number.";
  }
}

function userGuess(rangeStart, rangeEnd, attempts, numToGuess) {
  if (attempts === 0) {
    return 10;
  }
  console.log("\nTake a guess! (Remaining attempts:" + attempts + ")\n");

  const userInput = prompt("TYPE HERE...");

  if (+userInput === numToGuess) {
    return 100;
  }
  console.log("\n" + howClose(numToGuess, userInput));
  
  if (!isUserInputValid(userInput, rangeStart, rangeEnd)) {
    console.log("\n 😡 Invalid Input! Please enter a number ")
    attempts += 1;
  }

  return userGuess(rangeStart, rangeEnd, attempts - 1, numToGuess);
}

function guessTheNum(rangeStart, rangeEnd, maxAttempts, numToGuess) {
  return userGuess(rangeStart, rangeEnd, maxAttempts, numToGuess);
}

function getOutput(userOutput, numToGuess) {
  if (userOutput === 100) {
    const msg = "\n👏🏼 Bravo! You've nailed it. The number was ";
    return msg + numToGuess + " ! 🤩";
  }

  const msg = "\n The number is " + numToGuess + "\n" +"\nOh no! You've used";

  return msg + " all your attempts. Better luck next time!";
}

function startGame(rangeStart, rangeEnd, maxAttempts) {
  getWelcomeMsg(rangeStart, rangeEnd, maxAttempts);
  const numToGuess = getRandomNum(rangeStart, rangeEnd);
  const uOp = guessTheNum(rangeStart, rangeEnd, maxAttempts, numToGuess);

  console.log(getOutput(uOp, numToGuess));

  if (confirm("\n 🥹 Do you want to play again ? 🥹")) {
    startGame(rangeStart, rangeEnd, maxAttempts);
  } else {
    console.log("\n      😔 'Goodbye' 🖐🏼     \n");
  }
}

startGame(1, 100, 5);
