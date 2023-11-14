crearNode(data, document.getElementById("cardsContainer"));

function crearNode(array, container) {
  for (let i = 0; i < array.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
     <h3 class= "tituloCard"> ${array[i].name} </h3>
     <div class= "contenidoCard"> 
         <p> Status: ${array[i].status} </p>
         <p> Species: ${array[i].species} </p>
         <p> Gender: ${array[i].gender} </p>
         <p> Origin: ${array[i].origin.name} </p>
         <p> Location: ${array[i].location.name} </p>
 
     </div>
     <div class= imgCard> 
         <img src="${array[i].image}" alt= ${array[i].name}>
     </div>
    
     `;
    container.appendChild(card);
    // container.appendChild(card);
  }
}

setTimeout(() => {
  Swal.fire("Bienvenido al Sitio de Rick & Morty!");
}, 1000);
