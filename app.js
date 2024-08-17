let setBtn = document.getElementById("fijar");
let playBtn = document.getElementById("play");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");
let minInput = document.getElementById("minutes");
let secInput = document.getElementById("seconds");
const countdownScreen = document.getElementById('countdown');
let countdown;
let remaining;
let countingUp = 0;
let isPaused = false;
let isCountingUp = false;

// Colocar tiempo en pantalla
function updateDisplay(minutes, seconds) {
    let dash = isCountingUp ? "-" : "";
    countdownScreen.textContent = `${dash}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

playBtn.addEventListener("click", function () {
    countdownScreen.style.color = "green";
    isCountingUp = false;
    countingUp = 0;

    if (isPaused) {
        isPaused = false;
        return; // Si estaba pausado, simplemente reanuda
    }

    clearInterval(countdown);

    let minutes = parseInt(minInput.value);
    let seconds = parseInt(secInput.value);

    if (minutes < 0 || seconds < 0) {
        alert("No es posible asignar tiempo negativo");
        return; // Detiene la ejecución si hay tiempo negativo
    }

    remaining = minutes * 60 + seconds;

    countdown = setInterval(() => {
        if (!isPaused) {
            if (remaining > 0) {
                if (remaining <= 31) {
                    countdownScreen.style.color = "orange";
                }
                remaining--;
            } else {
                countdownScreen.style.color = "red";
                isCountingUp = true;
                countingUp++;
            }
            const minutes = Math.floor(Math.abs(remaining > 0 ? remaining : countingUp ) / 60);
            const seconds = Math.abs(remaining > 0 ? remaining : countingUp ) % 60;
            updateDisplay(minutes, seconds);
        }
    }, 1000);
});

// Iniciar conteo
setBtn.addEventListener("click", function () {
    countdownScreen.style.color = "green";
    updateDisplay(minInput.value, secInput.value);
});

// Pausar conteo
pauseBtn.addEventListener("click", function () {
    isPaused = !isPaused;
});

resetBtn.addEventListener("click", function () {
    isCountingUp = false;
    countingUp = 0;
    clearInterval(countdown);
    isPaused = false;
    remaining = parseInt(minInput.value) * 60 + parseInt(secInput.value);
    countdownScreen.style.color = "green";
    updateDisplay(minInput.value, secInput.value);
});