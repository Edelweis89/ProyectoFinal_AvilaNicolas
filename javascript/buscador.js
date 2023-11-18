let personajesFiltro;
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function agregarFavorito(personaje) {
  favoritos.push(personaje);
}

function eliminarFavorito(personaje) {
  const index = favoritos.indexOf(personaje);

  if (index !== -1) {
    favoritos.splice(index, 1);
  }
}

function actualizarLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const obtenerPj = (clase, data) => {
  const obtenerId = clase.slice(4);
  return data.find((element) => element.id === Number(obtenerId));
};

/// crear tarjetas con Doom para mostrar la info de los personajes Buscados.

const nodosPersonajesBuscador = (results, container) => {
  const nodoBuscador = results.reduce((acc, element) => {
    return (
      acc +
      `

      <article class="cardBuscador">
      <h3 class= "tituloCardBuscador">${element.name}</h3>
      <div class= "contenidoCardBuscador">
      <p> Status: ${element.status} </p>
            <p> Species: ${element.species} </p>
            <p> Gender: ${element.gender} </p>
            <p> Origin: ${element.origin.name} </p>
            <p> Location: ${element.location.name}</p>
            <p> Created: ${element.created}</p>

            </div>
      <div class= imgCardBuscador>
            <img src="${element.image}" alt= ${element.name}>
        </div>
        <button class="addfav" id="add-${element.id}"> Agregar a Favoritos
        

                </button>
                <button class="removeFav" id="add-${element.id}">
                Eliminar de Favoritos
        

                </button>

  </article>
      `
    );
  }, "");

  container.innerHTML = nodoBuscador;
};

/// llamado a la api
const llamadoApiBuscador = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((results) => {
      personajesFiltro = results;
    });
};

llamadoApiBuscador(
  "https://rickandmortyapi.com/api/character/1, 2, 3, 4, 5, 6, 7, 8, 34, 56, 67, 42, 59, 24, 22, 116, 180, 146, 148, 183"
);

// filtrar por búsqueda de nombre
const inputBusqueda = document.querySelector("#input-busqueda");

document.querySelector("#buscarForm").onsubmit = (event) => {
  event.preventDefault();
  const filteredCharacters = personajesFiltro.filter((personaje) =>
    personaje.name.toLowerCase().includes(inputBusqueda.value.toLowerCase())
  );
  nodosPersonajesBuscador(filteredCharacters, buscadorTarjetas);
};

/// Proceso de agregar o eliminar favoritos segun el evento escuchado en el body por el navegador. Si el evento contiene la clase addfav se agregar la tarjeta a favorita, si el evento contiene la clase removeFav, la tarjeta se elimina de favoritos.

document.body.onclick = (event) => {
  if (event.target.classList.contains("addfav")) {
    agregarFavorito(obtenerPj(event.target.id, personajesFiltro));
    actualizarLocalStorage("favoritos", favoritos);
    Toastify({
      text: `El personaje ${
        obtenerPj(event.target.id, personajesFiltro).name
      } ha sido añadido a Favoritos.`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {},
    }).showToast();
  }

  if (event.target.classList.contains("removeFav")) {
    const personaje = obtenerPj(event.target.id, favoritos);
    eliminarFavorito(personaje);
    actualizarLocalStorage("favoritos", favoritos);

    Toastify({
      text: `El personaje ${personaje.name} ha sido eliminado de Favoritos.`,
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #c0392b, #8e44ad)",
      },
    }).showToast();
  }
};
