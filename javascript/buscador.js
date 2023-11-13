document.getElementById("buscarForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let busqueda = document.getElementById("buscarBtn").value;
  localStorage.setItem("busqueda", busqueda);
  let buscarName = data.find(
    (name) => name.name === localStorage.getItem("busqueda")
  );
  buscarName
    ? crearNodeBuscador(buscarName, document.getElementById("buscador"))
    : Swal.fire("Personaje no encontrado, intenta nuevamente!");

  function crearNodeBuscador(array, container) {
    const cardBuscador = document.createElement("div");
    cardBuscador.className = "cardBuscador";
    cardBuscador.innerHTML = `
         <h3 class= "tituloCardBuscador"> ${array.name} </h3>
         <div class= "contenidoCardBuscador">
             <p> Status: ${array.status} </p>
             <p> Species: ${array.species} </p>
             <p> Gender: ${array.gender} </p>
             <p> Origin: ${array.origin.name} </p>
             <p> Location: ${array.location.name} </p>
             <p> URL: <a>${array.location.url}</a> </p>
             <p> Created: ${array.created}</p>
     
         </div>
         <div class= imgCardBuscador>
             <img src="${array.image}" alt= ${array.name}>
         </div>
         <button id="agregarFavoritos">
           Agregar a Favoritos
         </button>
         <button id="nuevaBusqueda">
           Nueva Busqueda
         </button>
       
         
     
         `;
    container.appendChild(cardBuscador);
  }
});
