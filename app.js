let minutos = 0;
let segundos = 0;
let cronometro;
let isRunning = false;

function actualizarCronometro() {
    if (segundos > 0 || minutos > 0) {
        segundos--;

        if (segundos === -1) {
            segundos = 59;
            minutos--;
        }

        document.getElementById("minutos").textContent = minutos.toString().padStart(2, '0');
        document.getElementById("segundos").textContent = segundos.toString().padStart(2, '0');
    } else {
        clearInterval(cronometro);
        isRunning = false;
    }
}

document.getElementById("fijar").addEventListener("click", function () {
    var nuevoTiempo = document.getElementById("tiempo").value;
    minutos = parseInt(nuevoTiempo);
    segundos = 0;
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, '0');
    document.getElementById("segundos").textContent = segundos.toString().padStart(2, '0');
});

document.getElementById("iniciar").addEventListener("click", function () {
    if (!isRunning && (minutos > 0 || segundos > 0)) { // Asegura que el cronómetro no esté ya en 00:00
        cronometro = setInterval(actualizarCronometro, 1000);
        isRunning = true;
    }
});


document.getElementById("detener").addEventListener("click", function () {
    if (isRunning) {
        clearInterval(cronometro);
        isRunning = false;
    }
});

document.getElementById("reiniciar").addEventListener("click", function () {
    clearInterval(cronometro);
    minutos = segundos = 0;
    isRunning = false;
    document.getElementById("minutos").textContent = "00";
    document.getElementById("segundos").textContent = "00";
});