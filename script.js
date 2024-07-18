let interval;
let remainingTime;
let isRunning = false;
let isPaused = false;

function startTimer() {
    const startButton = document.getElementById('startButton');
    resetButton.textContent = 'Timestamp';
    resetButton.className = 'stamp-button';

    if (isRunning && !isPaused) {
        stopTimer();
        startButton.textContent = 'Resume';
        startButton.className = 'resume-button';
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
                startButton.textContent = 'Start';
                startButton.className = 'start-button';
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
        startButton.textContent = 'Stop';
        startButton.className = 'stop-button';
    }
}

function stopTimer() {
    clearInterval(interval);
    isRunning = false; 
    isPaused = true;
    const startButton = document.getElementById('startButton');
    startButton.textContent = 'Resume';
    startButton.className = 'resume-button';
    resetButton.textContent = 'Reset';
    resetButton.className = 'reset-button';
}

function resetTimer() {
  const resetButton = document.getElementById('resetButton'); 
  const timestampsContainer = document.getElementById('timestampsContainer');
  const startButton = document.getElementById('startButton');

  switch (true) {
      case (isRunning && !isPaused):

          const stamp = remainingTime;
          const stampHourDisp = Math.floor(stamp / 3600);
          const stampMinDisp = Math.floor((stamp % 3600) / 60);
          const stampSecDisp = stamp % 60;

          const timestampElement = document.createElement('div');
          timestampElement.className = 'timestamp';
          timestampElement.textContent = `${stampHourDisp}h ${stampMinDisp}m ${stampSecDisp}s`;

          timestampsContainer.appendChild(timestampElement);

          resetButton.textContent = 'Timestamp';
          resetButton.className = 'stamp-button';
          break;

      case (isRunning && isPaused):
          document.getElementById('hour').value = '';
          document.getElementById('min').value = '';
          document.getElementById('sec').value = '';
          document.getElementById('countdown').innerHTML = '';
          break;

      default:
          clearInterval(interval);
          document.getElementById('hour').value = '';
          document.getElementById('min').value = '';
          document.getElementById('sec').value = '';
          document.getElementById('countdown').innerHTML = '';
          remainingTime = 0;
          isRunning = false;
          isPaused = false;
          startButton.textContent = 'Start';
          startButton.className = 'start-button';
          timestampsContainer.innerHTML = ''; // Clear all previous timestamps
          break;
  }
}


