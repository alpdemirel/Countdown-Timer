let interval;
let remainingTime;
let isRunning = false;
let isPaused = false;

function startTimer() {
    if (isRunning && !isPaused) {
        stopTimer();
    } else {
        if (!isPaused) {
            const hours = parseInt(document.getElementById('hour').value) || 0;
            const mins = parseInt(document.getElementById('min').value) || 0;
            const secs = parseInt(document.getElementById('sec').value) || 0;
            remainingTime = (hours * 3600) + (mins * 60) + secs;
        }

        const countdownElement = document.getElementById('countdown');

        interval = setInterval(function() {
            if (remainingTime <= 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "Time's up!";
                isRunning = false;
                isPaused = false;
                return;
            }

            const hourDisp = Math.floor(remainingTime / 3600);
            const minDisp = Math.floor((remainingTime % 3600) / 60);
            const secDisp = remainingTime % 60;

            countdownElement.innerHTML = `${hourDisp}h ${minDisp}m ${secDisp}s`;
            remainingTime--;
        }, 1000);

        isRunning = true;
        isPaused = false;
    }
}

function stopTimer() {
    clearInterval(interval);
    isRunning = true;
    isPaused = true;
}

function resetTimer() {
    clearInterval(interval);
    document.getElementById('hour').value = '';
    document.getElementById('min').value = '';
    document.getElementById('sec').value = '';
    document.getElementById('countdown').innerHTML = '';
    remainingTime = 0;
    isRunning = false;
    isPaused = false;
}
