let timerDuration = 15 * 60; // 15 minutes in seconds
let timer = timerDuration;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");

function updateTimerDisplay() {
  const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (timerInterval) return; // Already running
  timerInterval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      // Optional: reset game or reload page
      return;
    }
    timer--;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
}

function resumeTimer() {
  startTimer();
  pauseBtn.style.display = "inline-block";
  resumeBtn.style.display = "none";
}

// Event listeners
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);

// Initialize
updateTimerDisplay();
startTimer();
