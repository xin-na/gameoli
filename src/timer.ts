let timerDuration = 15 * 60; // 15 minutes in seconds
let timer = timerDuration;
let timerInterval: ReturnType<typeof setInterval> | null = null;

const timerDisplay = document.getElementById("timer") as HTMLElement | null;
const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement | null;
const resumeBtn = document.getElementById("resumeBtn") as HTMLButtonElement | null;

function updateTimerDisplay(): void {
  if (!timerDisplay) return;
  const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer(): void {
  if (timerInterval) return; // Already running
  timerInterval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(timerInterval!);
      alert("Time's up!");
      return;
    }
    timer--;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer(): void {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (pauseBtn) pauseBtn.style.display = "none";
  if (resumeBtn) resumeBtn.style.display = "inline-block";
}

function resumeTimer(): void {
  startTimer();
  if (pauseBtn) pauseBtn.style.display = "inline-block";
  if (resumeBtn) resumeBtn.style.display = "none";
}

// Attach event listeners if buttons exist
if (pauseBtn) pauseBtn.addEventListener("click", pauseTimer);
if (resumeBtn) resumeBtn.addEventListener("click", resumeTimer);

// Initialize timer
updateTimerDisplay();
startTimer();
