const obtenerlistaFavoritos = JSON.parse(localStorage.getItem("favoritos"));

const containerCardsFavoritos = document.querySelector(
  "#cardsContainerFavoritos"
);

const obtenerPjFav = (clase, data) => {
  const obtenerId = clase.slice(4);
  return data.find((element) => element.id === Number(obtenerId));
};

function eliminarFavorito(personaje) {
  const index = obtenerlistaFavoritos.indexOf(personaje);

  if (index !== -1) {
    obtenerlistaFavoritos.splice(index, 1);
  }
}

function actualizarLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function actualizarLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const nodosPersonajesFav = (results, container) => {
  // Verificar si hay datos almacenados en el local storage
  if (localStorage.length === 0) {
    return;
  }

  const nodos = results.reduce((acc, element) => {
    return (
      acc +
      `
     <article class="cardFavoritos"> 
     <h3 class= "tituloCardFavoritos">${element.name}</h3>
     <div class= "contenidoCardFavoritos">
     <p> Status: ${element.status} </p>
           <p> Species: ${element.species} </p>
           <p> Gender: ${element.gender} </p>
           <p> Origin: ${element.origin.name} </p>
           <p> Location: ${element.location.name}</p>
           <p> Created: ${element.created}</p>
  
           </div>
     <div class= imgCardFavoritos>
           <img src="${element.image}" alt= ${element.name}>
       </div>
       
       <button class="removeFav" id="add-${element.id}">
       Eliminar de Favoritos
       </button>
 </article>
     `
    );
  }, "");

  container.innerHTML = nodos;
};

nodosPersonajesFav(obtenerlistaFavoritos, cardsContainerFavoritos);

// Función para eliminar todos los elementos de un array almacenado en local storage
function eliminarTodosLosFavoritos() {
  obtenerlistaFavoritos.length = 0;
}

// Función para eliminar todas las tarjetas de favoritos
function eliminarTodasLasTarjetasFavoritos() {
  let tarjetasFavoritos = document.querySelectorAll(".cardFavoritos");
  tarjetasFavoritos.forEach((tarjeta) => tarjeta.remove());
}

// En el siguiente evento click, capturo por medio del atributo target la clase donde fue escuchado el evento, segun la clase aplico las funciones que corresponden a cada una y de paso controlo el comportamiento de cada evento.

document.body.onclick = (event) => {
  if (event.target.classList.contains("orderAsc")) {
    /// Orden Ascendente de las Tarjetas...(funcion sort() con los atributos name.)
    const ordenarTarjetas = obtenerlistaFavoritos.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    eliminarTodasLasTarjetasFavoritos();
    nodosPersonajesFav(ordenarTarjetas, cardsContainerFavoritos);
    actualizarLocalStorage("favoritos", ordenarTarjetas);
  } else if (event.target.classList.contains("orderDes")) {
    /// Orden Desendente de las Tarjetas...(funcion sort() con los atributos name.)
    const ordenarTarjetas = obtenerlistaFavoritos.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
    eliminarTodasLasTarjetasFavoritos();
    nodosPersonajesFav(ordenarTarjetas, cardsContainerFavoritos);
    actualizarLocalStorage("favoritos", ordenarTarjetas);
  } else if (event.target.classList.contains("eliminarGlobalFav")) {
    /// Elimina Todo el contenido del Local Storage y se limpia la lista Favoritos.
    eliminarTodosLosFavoritos();
    actualizarLocalStorage("favoritos", obtenerlistaFavoritos);
    eliminarTodasLasTarjetasFavoritos();
    Toastify({
      text: `Se han eliminado todos los favoritos.`,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff576d ,#1a1aff)",
      },
    }).showToast();
  } else if (event.target.classList.contains("removeFav")) {
    //Eliminar un solo personaje a traves de su id desde el boton de la tarjeta.
    const personajeFav = obtenerPjFav(event.target.id, obtenerlistaFavoritos);
    eliminarFavorito(personajeFav);
    actualizarLocalStorage("favoritos", obtenerlistaFavoritos);
    event.target.parentElement.remove();
    Toastify({
      text: `El personaje ${personajeFav.name} ha sido eliminado de Favoritos.`,
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
