let amigos = [];
const input = document.getElementById("amigo");
const buttonPlay = document.getElementById("button-play");
const buttonReset = document.getElementById("button-reset");
const errorMensaje = document.getElementById("error");
const imagenSorteo = document.getElementById("imagenAmigoSecreto");
const listaAmigos = document.getElementById("listaAmigos");
const resultadoTexto = document.getElementById("resultado");
const mensajeListaVacia = document.querySelector(".list__empty");
const confetiMap = {
  sebastian: "./assets/calamardo.png",
  seba: "./assets/calamardo.png",
  vanesa: "./assets/otaku2.png",
  vane: "./assets/otaku2.png",
  luneska: "./assets/otaku.png",
  diego: "./assets/krilin.png",
  samito: "./assets/saitama.png",
  nicolas: "./assets/fry.png",
  nico: "./assets/fry.png",
  nicolás: "./assets/fry.png",
  kike: "./assets/rick.png",
  david: "./assets/troll.png",
};

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
  li.id = nombre;
  li.innerHTML = `
        <div class="list__avatar-container">
            <img src="${generarAvatar(
              nombre
            )}" alt="Avatar de ${nombre}" class="list__avatar">
            <span class="list__name">${nombre}</span>
        </div>
        <button onclick="eliminarAmigo('${nombre}')" class="list__delete-btn" aria-label="Eliminar amigo ${nombre}">
            <img src="assets/icon-close.svg" alt="Cerrar" class="list__delete-icon">
        </button>
    `;
  listaAmigos.appendChild(li);
  mostrarLista();
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
  const nombreSorteado = amigos.splice(indiceAleatorio, 1)[0];

  resultadoTexto.textContent = `🎉 ${nombreSorteado} 🎁`;
  imagenSorteo.src = generarAvatar(nombreSorteado);

  const nombreNormalizado = nombreSorteado.toLowerCase();

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
  actualizarBotones();
}

function eliminarAmigo(nombre) {
  amigos = amigos.filter((amigo) => amigo !== nombre);
  document.getElementById(nombre)?.remove();
  mostrarLista();
  actualizarBotones();
}

function actualizarBotones() {
  buttonPlay.disabled = amigos.length < 2;
  buttonReset.disabled = amigos.length === 0;
}
/*
- Agregar botón para apagar/activar sonido
- Agregar sonidos
- Chequear que los nombres no se repitan considerando mayusculas o minusculas
*/
