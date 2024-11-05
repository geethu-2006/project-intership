document.getElementById('begin-button').addEventListener('click', () => {
    document.getElementById('begin-page').style.display = 'none';
    document.getElementById('stopwatch-page').style.display = 'block';
});

let startTime, timerInterval, elapsedTime = 0;
let running = false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resumeBtn = document.getElementById('resume-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapList = document.getElementById('lap-list');

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);

    running = true;
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
    lapBtn.style.display = 'inline-block';
}

function stopTimer() {
    clearInterval(timerInterval);
    running = false;
    stopBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block';
}

function resumeTimer() {
    startTimer();
    resumeBtn.style.display = 'none';
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = '';
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    lapBtn.style.display = 'none';
    running = false;
}

function addLap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapList.childElementCount + 1}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(lapTime);
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resumeBtn.addEventListener('click', resumeTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

