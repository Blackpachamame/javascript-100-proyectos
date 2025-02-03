let amigos = [];

function generarAvatar(nombre) {
  return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(
    nombre
  )}`;
}

function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();

  if (nombre === "") {
    alert("Por favor, ingresa un nombre válido.");
    return;
  }

  if (amigos.includes(nombre)) {
    alert("Este nombre ya ha sido agregado.");
    return;
  }

  amigos.push(nombre);
  agregarElementoLista(nombre);
  input.value = "";
}

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
    lista.classList.add("mostrar");
  }
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert("La lista está vacía. Agrega nombres antes de sortear.");
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const nombreSorteado = amigos[indiceAleatorio];

  document.getElementById("resultado").innerHTML = `
      🎉 <b>${nombreSorteado}</b> es el Amigo Secreto 🎁
  `;
}
