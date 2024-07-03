let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const displayElement = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsElement = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = 'Stop';
    running = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  startStopBtn.textContent = 'Start';
  displayElement.textContent = '00:00:00.00';
  lapsElement.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const lapTime = formatTime(Date.now() - startTime);
    const li = document.createElement('li');
    li.textContent = lapTime;
    li.className = 'lap-item';
    lapsElement.appendChild(li);
  }
});

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  displayElement.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
  return `${minutes}:${seconds}.${milliseconds}`;
}
