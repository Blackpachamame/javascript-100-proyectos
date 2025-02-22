let amigos = [];
let sonidoActivado = true;
const input = document.getElementById("amigo");
const buttonPlay = document.getElementById("button-play");
const buttonReset = document.getElementById("button-reset");
const errorMensaje = document.getElementById("error");
const imagenSorteo = document.getElementById("imagenAmigoSecreto");
const listaAmigos = document.getElementById("listaAmigos");
const resultadoTexto = document.getElementById("resultado");
const mensajeListaVacia = document.querySelector(".list__empty");
const confetiMap = {
  sebastian: "./assets/confetti/calamardo.png",
  seba: "./assets/confetti/calamardo.png",
  395039: "./assets/confetti/otaku2.png",
  raffa: "./assets/confetti/rick.png",
  luneska: "./assets/confetti/otaku.png",
  diego: "./assets/confetti/krilin.png",
  samito: "./assets/confetti/saitama.png",
  nicolas: "./assets/confetti/fry.png",
  nico: "./assets/confetti/fry.png",
  nicolás: "./assets/confetti/fry.png",
  kike: "./assets/confetti/rick.png",
  david: "./assets/confetti/troll.png",
};
const sonidos = {
  play: new Audio("assets/sounds/play.wav"),
  reset: new Audio("assets/sounds/reset.mp3"),
  active: new Audio("assets/sounds/on.mp3"),
  error: new Audio("assets/sounds/error.mp3"),
};

function reproducirSonido(tipo) {
  if (sonidoActivado && sonidos[tipo]) {
    sonidos[tipo].play();
  }
}

function activarSonido() {
  sonidoActivado = !sonidoActivado;
  const sonidoBoton = document.getElementById("button-sound");
  const sonidoIcono = sonidoBoton.querySelector("img");

  sonidoIcono.classList.remove("sound-on", "sound-off");
  sonidoIcono.classList.add(sonidoActivado ? "sound-on" : "sound-off");

  sonidoBoton.setAttribute("aria-pressed", sonidoActivado);

  sonidoIcono.alt = sonidoActivado ? "Sonido Activado" : "Sonido Desactivado";

  if (!sonidoActivado) {
    // 🔥 Detiene todos los sonidos en curso
    Object.values(sonidos).forEach((sonido) => {
      sonido.pause();
      //sonido.currentTime = 0; // Reinicia el tiempo de reproducción
    });
  } else {
    reproducirSonido("active");
  }
}

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

function mostrarLista() {
  const hayAmigos = amigos.length > 0;
  mensajeListaVacia.style.display = hayAmigos ? "none" : "block";
  listaAmigos.classList.toggle("list__items--visible", hayAmigos);
}

function agregarAmigo() {
  const nombre = input.value.trim();
  errorMensaje.textContent = "";

  if (!nombre) {
    mostrarError("⚠️ Por favor, ingrese un nombre.");
    return;
  }

  if (amigos.some((amigo) => amigo.toLowerCase() === nombre.toLowerCase())) {
    mostrarError("⚠️ Este nombre ya ha sido agregado.");
    return;
  }

  if (nombre === "abuelita" || nombre === "Abuelita") {
    console.log("👵 ¡Tatuarse es malo! ¡Coman sus vegetales!");
  }

  amigos.push(nombre);
  agregarElementoLista(nombre);
  input.value = "";
  actualizarBotones();
}

function mostrarError(mensaje) {
  errorMensaje.textContent = mensaje;
  reproducirSonido("error");
  setTimeout(() => (errorMensaje.textContent = ""), 3000);
}

function agregarElementoLista(nombre) {
  const li = document.createElement("li");
  li.classList.add("list__item");
  li.id = nombre;
  li.innerHTML = `
        <div class="list__avatar-container">
            <img src="${generarAvatar(
              nombre
            )}" alt="Avatar de ${nombre}" class="list__avatar">
            <span class="list__name">${nombre}</span>
        </div>
        <button onclick="eliminarAmigo('${nombre}')" class="list__delete-btn" aria-label="Eliminar amigo ${nombre}">
            <img src="assets/icons/close.svg" alt="Cerrar" class="list__delete-icon">
        </button>
    `;
  listaAmigos.appendChild(li);
  mostrarLista();
}

function sortearAmigo() {
  if (amigos.length < 2) {
    mostrarError("⚠️ Debes agregar al menos 2 amigos para sortear.");
    return;
  }
  buttonPlay.disabled = true;

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const nombreSorteado = amigos.splice(indiceAleatorio, 1)[0];

  resultadoTexto.textContent = `🎉 ${nombreSorteado} 🎁`;
  imagenSorteo.src = generarAvatar(nombreSorteado);

  const nombreNormalizado = nombreSorteado.toLowerCase();
  reproducirSonido("play");
  const imagenConfeti =
    confetiMap[nombreNormalizado] ||
    `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${nombreSorteado}`;

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
          src: imagenConfeti,
          width: 32,
          height: 32,
        },
      ],
    },
  });

  document.getElementById(nombreSorteado)?.remove();
  setTimeout(() => {
    actualizarBotones();
  }, 3000);
}

function actualizarBotones() {
  buttonPlay.disabled = amigos.length < 2;
  buttonReset.disabled = amigos.length === 0;
}

function eliminarAmigo(nombre) {
  const item = document.getElementById(nombre);

  if (!item) return;

  if (amigos.length === 1) {
    resetearLista();
  } else {
    item.classList.add("list__item--removing");

    setTimeout(() => {
      amigos = amigos.filter((amigo) => amigo !== nombre);
      item.remove();
      mostrarLista();
      actualizarBotones();
    }, 390);
  }
}

function resetearLista() {
  amigos = [];
  listaAmigos.innerHTML = "";
  listaAmigos.classList.remove("list__items--visible");
  mensajeListaVacia.style.display = "block";
  resultadoTexto.textContent = "Amigo Secreto";
  imagenSorteo.src = "assets/images/amigo-secreto.jpg";
  reproducirSonido("reset");
  actualizarBotones();
}
