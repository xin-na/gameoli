    const answers = {
    1: "4",
    2: "Dave",
    3: "20"
    };


    function checkAnswer(puzzleNumber) {
        const input = document.getElementById(`answer${puzzleNumber}`).value.trim().toLowerCase();
        const correct = answers[puzzleNumber].trim().toLowerCase();

        const soundCorrect = document.getElementById("soundCorrect");
        const soundWrong = document.getElementById("soundWrong");


        if (input === correct) {
            soundCorrect.play();
            alert("Correct!");
            document.getElementById(`puzzle${puzzleNumber}`).style.display = "none";

            if (puzzleNumber < 3) {
            document.getElementById(`puzzle${puzzleNumber + 1}`).style.display = "block";
            } else {
            document.getElementById("success").style.display = "block";
            }
        } else {
            soundWrong.play();
            alert("Try again!");
        }
    }

    function submitOnEnter(event, puzzleNumber) {
      if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer(puzzleNumber);
      }
    }

    function showHint(puzzleNumber) {
      document.getElementById(`hint${puzzleNumber}`).style.display = "block";
    }


const bgMusic = document.getElementById("bg-music");
const toggleBtn = document.getElementById("musicToggleBtn");

function updateMusicButton() {
  toggleBtn.textContent = bgMusic.paused ? "▶️ Play Music" : "🔇 Stop Music";
}

toggleBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().then(updateMusicButton).catch(() => {
      alert("Click anywhere on the page to allow audio.");
    });
  } else {
    bgMusic.pause();
    updateMusicButton();
  }
});

// Try auto-play after first user interaction
["click", "keydown", "touchstart"].forEach(evt => {
  window.addEventListener(evt, () => {
    if (bgMusic.paused) {
      bgMusic.play().then(updateMusicButton).catch(() => {});
    }
  }, { once: true });
});

updateMusicButton(); // Sync label on load


