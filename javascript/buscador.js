let personajesFiltro;
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const obtenerDelLs = (clave) => JSON.parse(localStorage.getItem(clave));
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

                       

            </article>
              `
    );
  }, "");

  container.innerHTML = nodoBuscador;
};

const llamadoApiBuscador = async (url) => {
  try {
    const respuesta = await fetch(url);

    if (respuesta.ok) {
      const data = await respuesta.json();
      personajesFiltro = data.results;
      nodosPersonajesBuscador(
        data.results,
        document.getElementById("buscadorTarjetas")
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al buscar el personaje:",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al buscar el personaje:",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

// Obtenemos el elemento del formulario
const buscarForm = document.getElementById("buscarForm");

// Agregamos un evento para detectar cuando se haga clic en el botón de búsqueda
buscarForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitamos que la página se recargue al hacer clic en el botón de búsqueda

  const inputBuscar = document.getElementById("input-busqueda");
  const nombrePersonaje = inputBuscar.value;

  // Limpiamos el valor del input
  inputBuscar.value = "";

  llamadoApiBuscador(
    `https://rickandmortyapi.com/api/character/?name=${nombrePersonaje}`
  );
});

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
};
