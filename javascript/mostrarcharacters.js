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

const llamadoApi = (url, generarNodos, container) => {
  fetch(url)
    .then((res) => res.json())
    .then((results) => {
      generarNodos(results, container);
    });
};

llamadoApi(
  "https://rickandmortyapi.com/api/character/1, 2, 3, 4, 5, 6, 7, 8, 34, 56, 67, 42, 59, 24, 22, 116, 180, 146, 148, 183",
  nodosPersonajes,
  containerCards
);
