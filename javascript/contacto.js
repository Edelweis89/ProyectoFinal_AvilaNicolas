//llamamos al formulario y le asignamos una funcion para que realice en respuesta al evento submit.
//Esta funcion va a crear 4 variables y les va a asignar el valor que se ingrese en el campo input.
///Luego crea un objeto con la info de las 4 variables y guarda el objeto en formato string (stringify) en el localstorage.

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let telefono = document.getElementById("telefono").value;
  let correo = document.getElementById("correo").value;

  let contacto = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    correo: correo,
  };

  localStorage.setItem("contacto", JSON.stringify(contacto));
  alert("Contacto guardado correctamente");

  let contactoAlmacenado = localStorage.getItem("contacto");
  let contactoJson = JSON.parse(contactoAlmacenado);

  // Luego, creamos un nuevo elemento 'div' con un id 'infoContacto'
  let infoContacto = document.createElement("div");
  infoContacto.id = "infoContacto";

  // Agregamos un título con el texto 'Información del contacto'
  let titulo = document.createElement("h2");
  titulo.textContent = "Información del contacto";
  infoContacto.appendChild(titulo);

  // Luego, agregamos un párrafo 'p' con el texto 'Nombre: ' más el nombre del contacto
  let nombreInfo = document.createElement("p");
  nombreInfo.id = "nombreInfo";
  nombreInfo.textContent = "Nombre: " + contactoJson.nombre;
  infoContacto.appendChild(nombreInfo);

  // Repetimos el proceso para cada variable (apellido, teléfono, correo)
  let apellidoInfo = document.createElement("p");
  apellidoInfo.id = "apellidoInfo";
  apellidoInfo.textContent = "Apellido: " + contactoJson.apellido;
  infoContacto.appendChild(apellidoInfo);

  let telefonoInfo = document.createElement("p");
  telefonoInfo.id = "telefonoInfo";
  telefonoInfo.textContent = "Teléfono: " + contactoJson.telefono;
  infoContacto.appendChild(telefonoInfo);

  let correoInfo = document.createElement("p");
  correoInfo.id = "correoInfo";
  correoInfo.textContent = "Correo: " + contactoJson.correo;
  infoContacto.appendChild(correoInfo);

  // agregamos el elemento 'infoContacto' al body del documento HTML
  document.body.appendChild(infoContacto);
});
