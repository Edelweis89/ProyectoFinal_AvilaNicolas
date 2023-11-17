let personajesFiltro;
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const subirAlLS = (clave, data) =>
  localStorage.setItem(clave, JSON.stringify(data));
const obtenerDelLs = (clave) => JSON.parse(localStorage.getItem(clave));
const agregarFavorito = (data) => favoritos.push(data);
const obtenerPj = (clase, data) => {
  const obtenerId = clase.slice(4);
  return data.find((element) => element.id === Number(obtenerId));
};

function limpiarBusqueda() {
  document.getElementById("buscadorTarjetas").innerHTML = "";
}

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
        <button class="addfav" id="add-${element.id}">
        <i class="addfav fa-solid fa-star id="add-${element.id} style="color: #982ddf;"></i>
                    
                </button>
    
  </article>
      `
    );
  }, "");

  container.innerHTML = nodoBuscador;
};

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

// filtrar por búsqueda
const inputBusqueda = document.querySelector("#input-busqueda");

document.querySelector("#buscarForm").onsubmit = (event) => {
  event.preventDefault();
  const filteredCharacters = personajesFiltro.filter((personaje) =>
    personaje.name.toLowerCase().includes(inputBusqueda.value.toLowerCase())
  );
  nodosPersonajesBuscador(filteredCharacters, buscadorTarjetas);
};

// agregar a favoritos a partir del evento.
document.body.onclick = (event) => {
  if (event.target.classList.contains("addfav")) {
    agregarFavorito(obtenerPj(event.target.id, personajesFiltro));
    subirAlLS("favoritos", favoritos);
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
};

/// en este punto agrego favoritos al local storage, si no tiene la clase addfav agrega null al ls si la tiene agrega el favorito ok. ver como solucionar eso.
