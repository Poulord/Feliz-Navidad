const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const passwordInput = document.getElementById("login-pass");
const togglePasswordButton = document.getElementById("toggle-password");

const ALLOWED_USER = "Ali";
const ALLOWED_PASS = "1234";

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

togglePasswordButton.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePasswordButton.setAttribute("aria-pressed", String(isHidden));
  togglePasswordButton.setAttribute(
    "aria-label",
    isHidden ? "Ocultar contraseña" : "Mostrar contraseña"
  );
});
