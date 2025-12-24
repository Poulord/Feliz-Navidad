const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

const ALLOWED_USER = "navidad";
const ALLOWED_PASS = "dino2024";

const setMessage = (message, isError = false) => {
  loginMessage.textContent = message;
  loginMessage.style.color = isError ? "#8b1f2a" : "#1f6b4b";
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const user = formData.get("loginUser").trim();
  const pass = formData.get("loginPass").trim();

  if (user === ALLOWED_USER && pass === ALLOWED_PASS) {
    setMessage("Acceso correcto. Entrando...");
    window.location.href = "main.html";
    return;
  }

  setMessage("Usuario o contraseña incorrectos.", true);
});
