function slice(start, end, text) {
  if (start > end) {
    return "";
  }

  return text[start] + slice(start + 1, end, text)
}

function underScores(stringLength) {
  if (stringLength === 0) {
    return "";
  }

  return "_" + underScores(stringLength - 1);
}

function playGame(word) {
  for (let index = 0; index < word.length - 1; index++) {
    const remainingLetters = slice(index + 1, word.length - 1, word);
    const charToGuess = underScores(remainingLetters.length);
    const RevealedChars = slice(0, index, word);
    
    console.log(RevealedChars + charToGuess);
    const enteredText = prompt("TRY WITH THIS...");
    
    if (enteredText === word) {
      return 0;
    }
    console.log("\nNO, BUT YOU ARE CLOSE ENOUGH\n");
  }
  console.log("\n\n      THE WORD IS " + "'" + word + "'" + "\n\n");
  return word.length;
}

function guessWord(word) {
  prompt("\n😎 I KNOW YOU ARE SMART 🤔", "'press return'");
  console.log(word);
  console.log("\n\nIT IS A " + word.length + " LETTER WORD");
  console.log("  STARTS WITH .....\n");
  return playGame(word);
}

function complement(word) {
  const toMessage = guessWord(word);
  if (toMessage > 0) {
    return "\n\n     ....... STUDY BRO ...... \n ......... WHY ARE YOU WASTING TIME ..........\n\n";
  }

  return "\n\n    ........... 🥳 CONGRATULATIONS 🥳 .............\n\n  😂 YOU SUCCESSFULLY WASTED 5 MINUTES OF YOUR TIME 😁\n\n";
}

function getRandomWord(randomNum) {
  switch (randomNum) {
    case 1:
      return "interpretor";
    case 2:
      return "secret";
    case 3:
      return "abstraction";
    case 4:
      return "execution";
    case 5:
      return "addiction";
    case 6:
      return "mechanism";
    case 7:
      return "participate";
    case 8:
      return "review";
    case 9:
      return "software";
    case 10:
      return "vacation";
  }
}

function playWithNewWord() {
  while (confirm("WANT TO CONTINUE", "'PRESS ENTER'")) {
    const word = getRandomWord(Math.ceil(Math.random() * 10));
    console.log(complement(word));
  }

  return " 🤞 BETTER LUCK 🤝 NEXT TIME 😔\n";
}

console.log(playWithNewWord());
