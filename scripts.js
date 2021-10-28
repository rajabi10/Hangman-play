const words = [
  "book",
  "pencil",
  "pen",
  "delete",
  "add",
  "mad",
  "google",
  "search",
  "bad",
  "delete",
];

let randomItem = "";
let clicked = [];
let result = "";
let mistakes = 0;

function selectRandomItem() {
  randomItem = words[Math.floor(Math.random() * words.length)];
  document.getElementById("letters").addEventListener("click", buttonHandler);
  window.addEventListener("keydown", keyHandler);
  console.log(randomItem);
}

function setUnderScores() {
  let splittedWord = randomItem.split("");
  const mappedWord = splittedWord.map((letter) =>
    clicked.indexOf(letter) >= 0 ? letter : "_"
  );
  result = mappedWord.join("");
  document.getElementById("clue").innerHTML = `<p>${result}</p>`;
}

function checkIfWon() {
  if (randomItem === result) {
    document.getElementById("gameover").innerHTML = `<p> YOU WON</p>`;
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.getElementById("image").querySelector("img").src =
      "assets/winner.png";
  }
}

function checkIfLost() {
  if (mistakes === 6) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.getElementById(
      "clue"
    ).innerHTML = `<p> the random number is: ${randomItem}</p>`;
  }
}

function updateHangmanPicture() {
  const picture = document.getElementById("image").querySelector("img");
  picture.src = `assets/hangman${mistakes}.png`;
}

function clickedLetter(letter) {
  letter = letter.toLowerCase();
  clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
  document.getElementById(letter.toUpperCase()).className = "used";
  if (randomItem.indexOf(letter) >= 0) {
    setUnderScores();
    checkIfWon();
  } else if (randomItem.indexOf(letter) === -1) {
    mistakes++;
    checkIfLost();
    updateHangmanPicture();
  }
}

function keyHandler(event) {
  clickedLetter(event.key);
}

function buttonHandler(event) {
  clickedLetter(event.target.id);
}

selectRandomItem();
setUnderScores();
