const darkModeButton = document.querySelector("#colorMode");

const body = document.body;

let darkMode = localStorage.getItem("darkMode");
if (darkMode === "activado") {
  activarModoColor();
} else {
  desactivarModoColor();
}

function activarModoColor() {
  body.classList.add("darkMode");
  localStorage.setItem("darkMode", "activado");
}

function desactivarModoColor() {
  body.classList.remove("darkMode");
  localStorage.setItem("darkMode", "desactivado");
}

darkModeButton.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  console.log(darkMode);
  if (darkMode === "activado") {
    desactivarModoColor();
  } else {
    activarModoColor();
  }
});
