//llamamos al formulario y le asignamos una funcion para validar lo ingresado en cada input al momento de clickear en submit.
document
  .getElementById("formulario")
  .addEventListener("submit", validarFormulario);

/// Funcion ValidarFormulario se encarga de capturar el contenido de cada input y validar si es correcto o no.
function validarFormulario(event) {
  event.preventDefault();

  let nombre = document.getElementById("nombre").value;

  /// si el largo del nombre es = 0 y menor a 3 da error.

  if (nombre.length == 0 || nombre.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El nombre debe tener 3 caracteres como minimo!",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  let apellido = document.getElementById("apellido").value;
  if (apellido.length == 0 || apellido.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El Apellido debe tener 3 caracteres como minimo!",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  /// si el largo del telefono es = 0 y menor a 10 da error. (Argentina 10 digitos).
  let telefono = document.getElementById("telefono").value;
  if (telefono.length == 0 || telefono.length < 10) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Numero de Telefono Incorrecto!",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  /////ejecutamos la búsqueda de una ocurrencia entre una expresión regular (@) y el correo ingresado por medio del método test().

  let correo = document.getElementById("correo").value;
  let expReg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (expReg.test(correo)) {
    Swal.fire({
      icon: "succes",
      title: "Muchas Gracias",
      text: "Los Datos se guardaron correctamente!",
    });

    /// si es true crea un objeto con los datos.
    let contacto = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      correo: correo,
    };

    /// convertimos a string los valores y los almacenamos en localStorage para trabajar con ellos.

    localStorage.setItem("contacto", JSON.stringify(contacto));

    /// traemos los valores almacenados en localStorage.

    let contactoAlmacenado = localStorage.getItem("contacto");

    /// parseamos los datos guardados en string y los convertimos a su valor original (objeto).
    let contactoJson = JSON.parse(contactoAlmacenado);

    /// creamos por medio de Doom la estructura para mostrar la informacion en nuestro HTML, extraemos cada valor de las claves de nuestros objetos.

    let infoContacto = document.createElement("article");
    infoContacto.id = "infoContacto";

    let titulo = document.createElement("h2");
    titulo.textContent = "Información del contacto";
    infoContacto.appendChild(titulo);

    let nombreInfo = document.createElement("p");
    nombreInfo.id = "nombreInfo";
    nombreInfo.textContent = "Nombre: " + contactoJson.nombre;
    infoContacto.appendChild(nombreInfo);

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

    document.body.appendChild(infoContacto);
  } else {
    /// si el correo era incorrecto informamos de error.
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Correo Electronico Incorrecto!",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
