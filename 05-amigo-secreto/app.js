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
  imagenSorteo.src = "assets/amigoIncognito.png";
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
}

function actualizarBotones() {
  buttonPlay.disabled = amigos.length < 2;
  buttonReset.disabled = amigos.length === 0;
}
