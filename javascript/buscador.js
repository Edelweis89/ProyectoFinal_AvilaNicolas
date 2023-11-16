const filtroPj = "https://rickandmortyapi.com/api/character";
console.log(filtroPj);
//traemos el elemento form para trabajar con el y le asignamos una funcion al hacer submit en el mismo.

// document.getElementById("buscarForm").addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Si hay informacion ya en el elemento lo borramos para una nueva busqueda sino realiza busqueda.
//   document.getElementById("buscadorTarjetas").innerHTML = "";

//   /// traemos el valor del input.
//   let busqueda = document.getElementById("buscarBtn").value;

//   /// almacenamos en localstorage el valor.
//   localStorage.setItem("busqueda", busqueda);

//   /// buscamos en el objeto data la informacion y si es igual traemos el contenido acorde.
//   let buscarName = results.find(
//     (name) => name.name === localStorage.getItem("busqueda")
//   );

//   /// ejecutamos funcion para mostrar info en el dom de nuestro html.
//   buscarName
//     ? crearNodeBuscador(buscarName, document.getElementById("buscadorTarjetas"))
//     : Swal.fire("Personaje no encontrado, intenta nuevamente!");

//   function crearNodeBuscador(array, container) {
//     const cardBuscador = document.createElement("div");
//     cardBuscador.className = "cardBuscador";
//     cardBuscador.innerHTML = `
//          <h3 class= "tituloCardBuscador"> ${array.name} </h3>
//          <div class= "contenidoCardBuscador">
//              <p> Status: ${array.status} </p>
//              <p> Species: ${array.species} </p>
//              <p> Gender: ${array.gender} </p>
//              <p> Origin: ${array.origin.name} </p>
//              <p> Location: ${array.location.name} </p>
//              <p> URL: <a>${array.location.url}</a> </p>
//              <p> Created: ${array.created}</p>

//          </div>
//          <div class= imgCardBuscador>
//              <img src="${array.image}" alt= ${array.name}>
//          </div>
//          <button id="agregarFavoritos">
//            Agregar a Favoritos
//          </button>
//          `;
//     container.appendChild(cardBuscador);
//   }
// });

// setTimeout(() => {
//   Swal.fire(
//     "Busca informacion de los Personajes de la Serie! Puedes Agregar el que quieras a tus Favoritos"
//   );
// }, 1000);
