function playSonido(idAudio) {
    document.querySelector(idAudio).play();
}

const listaTeclas = document.querySelectorAll('.tecla');

for (let i = 0; i < listaTeclas.length; i++) {
    const tecla = listaTeclas[i];
    const instrumento = tecla.classList[1];
    const idAudio = `#sonido_${instrumento}`;

    tecla.onclick = function () { playSonido(idAudio) };
}