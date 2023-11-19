const containerCards = document.querySelector("#cardsContainer");

const nodosPersonajes = (results, container) => {
  const nodos = results.reduce((acc, element) => {
    return (
      acc +
      `
    <article class="card"> 
    <h3 class= "tituloCard">${element.name}</h3>
    <div class= "contenidoCard">
    <p> Status: ${element.status} </p>
          <p> Species: ${element.species} </p>
          <p> Gender: ${element.gender} </p>
          <p> Origin: ${element.origin.name} </p>
          <p> Location: ${element.location.name}</p>
          <p> Created: ${element.created}</p>
 
          </div>
    <div class= imgCard>
          <img src="${element.image}" alt= ${element.name}>
      </div>
  
</article>
    `
    );
  }, "");

  container.innerHTML = nodos;
};

/// generamos funcion para llamar a la api, cargar los personajes y generar un evento en un boton para mostrar la pagina siguiente de la informacion.
const llamadoApi = (url, generarNodos, container) => {
  fetch(url)
    .then((res) => res.json())
    .then((results) => {
      generarNodos(results.results, container);
      const siguienteUrl = results.info.next;
      if (siguienteUrl) {
        document.getElementById("cargarMas").onclick = () =>
          llamadoApi(siguienteUrl, generarNodos, container);
      } else {
        document.getElementById("cargarMas").style.display = "none";
      }
    });
};

llamadoApi(
  "https://rickandmortyapi.com/api/character",
  nodosPersonajes,
  containerCards
);
