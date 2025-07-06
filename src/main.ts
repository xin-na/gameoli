const answers: { [key: number]: string } = {
  1: "4",
  2: "Dave",
  3: "20"
};

function checkAnswer({ puzzleNumber }: { puzzleNumber: number }): void {
  const inputEl = document.getElementById(`answer${puzzleNumber}`) as HTMLInputElement | null;

  const answerValue = answers[puzzleNumber];
  if (!answerValue) {
    console.error(`No answer defined for puzzleNumber: ${puzzleNumber}`);
    return;
  }
  const correct = answerValue.trim().toLowerCase();

  const soundCorrect = document.getElementById("soundCorrect") as HTMLAudioElement | null;
  const soundWrong = document.getElementById("soundWrong") as HTMLAudioElement | null;

  if (!inputEl || !soundCorrect || !soundWrong) {
    console.warn("Missing element(s)");
    return;
  }

  const input = inputEl.value.trim().toLowerCase();

  if (input === correct) {
    soundCorrect.play();
    alert("Correct!");
    const currentPuzzle = document.getElementById(`puzzle${puzzleNumber}`);
    if (currentPuzzle) currentPuzzle.style.display = "none";

    if (puzzleNumber < 3) {
      const nextPuzzle = document.getElementById(`puzzle${puzzleNumber + 1}`);
      if (nextPuzzle) nextPuzzle.style.display = "block";
    } else {
      const success = document.getElementById("success");
      if (success) success.style.display = "block";
    }
  } else {
    soundWrong.play();
    alert("Try again!");
  }
}

function submitOnEnter(event: KeyboardEvent, puzzleNumber: number): void {
  if (event.key === "Enter") {
    event.preventDefault();
    checkAnswer({ puzzleNumber: Number(puzzleNumber) });
  }
}

function showHint(puzzleNumber: number): void {
  const hintEl = document.getElementById(`hint${puzzleNumber}`);
  if (hintEl) hintEl.style.display = "block";
}

// Background music logic
const bgMusic = document.getElementById("bg-music") as HTMLAudioElement | null;
const toggleBtn = document.getElementById("musicToggleBtn") as HTMLButtonElement | null;

function updateMusicButton(): void {
  if (!bgMusic || !toggleBtn) return;
  toggleBtn.textContent = bgMusic.paused ? "▶️ Play Music" : "🔇 Stop Music";
}

if (toggleBtn && bgMusic) {
  toggleBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play()
        .then(updateMusicButton)
        .catch(() => {
          alert("Click anywhere on the page to allow audio.");
        });
    } else {
      bgMusic.pause();
      updateMusicButton();
    }
  });

  ["click", "keydown", "touchstart"].forEach(evt => {
    window.addEventListener(evt, () => {
      if (bgMusic.paused) {
        bgMusic.play().then(updateMusicButton).catch(() => {});
      }
    }, { once: true });
  });

  updateMusicButton(); // Sync label on load
}
