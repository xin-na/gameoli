const answers = {
  1: "piano",
  2: "23",
  3: "decode"
};

function checkAnswer(puzzleNumber) {
  const input = document.getElementById(`answer${puzzleNumber}`).value.trim().toLowerCase();
  const correct = answers[puzzleNumber];

  if (input === correct) {
    alert("Correct!");
    document.getElementById(`puzzle${puzzleNumber}`).style.display = "none";
    
    if (puzzleNumber < 3) {
      document.getElementById(`puzzle${puzzleNumber + 1}`).style.display = "block";
    } else {
      document.getElementById("success").style.display = "block";
    }
  } else {
    alert("Try again!");
  }
}
