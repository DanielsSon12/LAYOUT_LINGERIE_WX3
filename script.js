let contador = 1;

document.getElementById("radio-01").checked = true;

setInterval(function () {
    passaImagem();
}, 5000)

function passaImagem() {
    contador++;
    if (contador > 3) {
        contador = 1;
    }

    document.getElementById("radio-0" + contador).checked = true;

}