let amigos = [];
const buttonPlay = document.getElementById("button-play");
const buttonReset = document.getElementById("button-reset");
const errorMensaje = document.getElementById("error");
const imagenSorteo = document.getElementById("imagenAmigoSecreto");

/**
 * 🔹 Genera un avatar para el nombre añadido.
 */
function generarAvatar(nombre) {
  return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(
    nombre
  )}`;
}

/**
 * 🔹 Agrega un nuevo amigo a la lista de amigos.
 */
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();

  // Limpiar mensaje de error antes de validar
  errorMensaje.textContent = "";

  if (nombre === "") {
    errorMensaje.textContent = "⚠️ Por favor, ingresa un nombre válido.";
    return;
  }

  if (amigos.includes(nombre)) {
    errorMensaje.textContent = "⚠️ Este nombre ya ha sido agregado.";
    return;
  }

  amigos.push(nombre);
  agregarElementoLista(nombre);
  input.value = "";
}

/**
 * 🔹 Maqueta un nuevo nombre a la lista de amigos.
 * 🔹 También oculta el mensaje de la list-empty.
 */
function agregarElementoLista(nombre) {
  const lista = document.getElementById("listaAmigos");
  const li = document.createElement("li");
  li.classList.add("friend-item");

  li.innerHTML = `
        <img src="${generarAvatar(
          nombre
        )}" alt="Avatar de ${nombre}" class="avatar">
        <span class="friend-name">${nombre}</span>
    `;

  lista.appendChild(li);

  if (amigos.length > 0) {
    document.querySelector(".list-empty").style.display = "none";
    lista.classList.add("mostrar");
  }

  actualizarBotones();
}

/**
 * 🔹 Función para borrar todos los nombres de la lista.
 */
function resetearLista() {
  amigos = [];
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  lista.classList.remove("mostrar");

  document.querySelector(".list-empty").style.display = "block";

  document.getElementById("resultado").textContent = "Amigo Secreto";
  imagenSorteo.src = "assets/amigoIncognito.png";

  actualizarBotones();
}

/**
 * 🔹 Sortea un amigo de forma aleatoria y cambia la imagen.
 */
function sortearAmigo() {
  if (amigos.length < 2) {
    errorMensaje.textContent =
      "⚠️ Debes agregar al menos 2 amigos para sortear.";
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const nombreSorteado = amigos[indiceAleatorio];

  // Actualizar el texto con el nombre del amigo secreto
  document.getElementById("resultado").textContent = `🎉 ${nombreSorteado} 🎁`;

  // Cambiar la imagen al avatar del amigo sorteado
  imagenSorteo.src = generarAvatar(nombreSorteado);
}

/**
 * 🔹 Actualizar el estado (habilitado/deshabilitado) de los botones.
 */
function actualizarBotones() {
  buttonPlay.disabled = amigos.length < 2;
  buttonReset.disabled = amigos.length === 0;
}
