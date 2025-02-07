let amigos = [];
const input = document.getElementById("amigo");
const buttonPlay = document.getElementById("button-play");
const buttonReset = document.getElementById("button-reset");
const errorMensaje = document.getElementById("error");
const imagenSorteo = document.getElementById("imagenAmigoSecreto");
const listaAmigos = document.getElementById("listaAmigos");
const resultadoTexto = document.getElementById("resultado");
const mensajeListaVacia = document.querySelector(".list__empty");

function generarAvatar(nombre) {
  return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(
    nombre
  )}`;
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    agregarAmigo();
  }
});

function agregarAmigo() {
  const nombre = input.value.trim();
  errorMensaje.textContent = "";

  if (!nombre) {
    mostrarError("⚠️ Por favor, ingresa un nombre válido.");
    return;
  }

  if (amigos.includes(nombre)) {
    mostrarError("⚠️ Este nombre ya ha sido agregado.");
    return;
  }

  amigos.push(nombre);
  agregarElementoLista(nombre);
  input.value = "";
  actualizarBotones();
}

function mostrarError(mensaje) {
  errorMensaje.textContent = mensaje;
  setTimeout(() => (errorMensaje.textContent = ""), 3000);
}

function agregarElementoLista(nombre) {
  const li = document.createElement("li");
  li.classList.add("list__item");
  li.innerHTML = `
        <img src="${generarAvatar(
          nombre
        )}" alt="Avatar de ${nombre}" class="list__avatar">
        <span class="list__name">${nombre}</span>
    `;
  listaAmigos.appendChild(li);

  if (amigos.length > 0) {
    mensajeListaVacia.style.display = "none";
    listaAmigos.classList.add("list__items--visible");
  }
}

function resetearLista() {
  amigos = [];
  listaAmigos.innerHTML = "";
  listaAmigos.classList.remove("list__items--visible");
  mensajeListaVacia.style.display = "block";
  resultadoTexto.textContent = "Amigo Secreto";
  imagenSorteo.src = "assets/amigo-secreto.jpg";
  actualizarBotones();
}

function sortearAmigo() {
  if (amigos.length < 2) {
    mostrarError("⚠️ Debes agregar al menos 2 amigos para sortear.");
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const nombreSorteado = amigos[indiceAleatorio];

  resultadoTexto.textContent = `🎉 ${nombreSorteado} 🎁`;
  imagenSorteo.src = generarAvatar(nombreSorteado);
  if (
    nombreSorteado.toLowerCase() === "sebastian" ||
    nombreSorteado.toLowerCase() === "seba"
  ) {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./assets/calamardo.png",
            width: 32,
            height: 32,
          },
        ],
      },
    });
  } else if (
    nombreSorteado.toLowerCase() === "vanesa" ||
    nombreSorteado.toLowerCase() === "vane"
  ) {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./assets/otaku2.png",
            width: 32,
            height: 32,
          },
        ],
      },
    });
  } else if (nombreSorteado.toLowerCase() === "luneska") {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./assets/otaku.png",
            width: 32,
            height: 32,
          },
        ],
      },
    });
  } else if (nombreSorteado.toLowerCase() === "diego") {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./assets/krilin.png",
            width: 32,
            height: 32,
          },
        ],
      },
    });
  } else if (nombreSorteado.toLowerCase() === "samito") {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./assets/saitama.png",
            width: 32,
            height: 32,
          },
        ],
      },
    });
  } else if (
    nombreSorteado.toLowerCase() === "nicolas" ||
    nombreSorteado.toLowerCase() === "nico" ||
    nombreSorteado.toLowerCase() === "nicolás"
  ) {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./assets/fry.png",
            width: 32,
            height: 32,
          },
        ],
      },
    });
  } else if (nombreSorteado.toLowerCase() === "kike") {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./assets/rick.png",
            width: 32,
            height: 32,
          },
        ],
      },
    });
  } else if (nombreSorteado.toLowerCase() === "david") {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./assets/troll.png",
            width: 32,
            height: 32,
          },
        ],
      },
    });
  } else {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 4,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${nombreSorteado}`,
            width: 32,
            height: 32,
          },
        ],
      },
    });
  }
}

function actualizarBotones() {
  buttonPlay.disabled = amigos.length < 2;
  buttonReset.disabled = amigos.length === 0;
}
