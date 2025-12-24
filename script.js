const STORAGE_CREDENTIALS = "fn-credentials";
const STORAGE_SECRETS = "fn-secrets";
const SESSION_AUTH = "fn-auth";
const SESSION_UNLOCK = "fn-unlock";

const defaultSecrets = ["helecho", "bosque", "roca", "huella"];

const setupForm = document.getElementById("setup-form");
const setupMessage = document.getElementById("setup-message");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const authSection = document.getElementById("auth-section");
const mainSection = document.getElementById("main-section");
const resetAccessButton = document.getElementById("reset-access");
const lockForm = document.getElementById("lock-form");
const lockMessage = document.getElementById("lock-message");
const lockPanel = document.getElementById("lock-panel");
const dinoCards = document.querySelectorAll(".dino-card");
const questionSection = document.getElementById("question-section");
const questionCard = document.getElementById("question-card");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const questionMeta = document.getElementById("question-meta");

const dinos = {
  triceratops: {
    name: "Triceratops",
    emoji: "🦕",
    question: "¿Qué recuerdo te hace sentir tan fuerte como sus tres cuernos?",
  },
  raptor: {
    name: "Velociraptor",
    emoji: "🦖",
    question: "¿Qué pista rápida puedes descubrir para seguir la aventura?",
  },
  stego: {
    name: "Stegosaurus",
    emoji: "🦕",
    question: "¿Qué detalle especial esconderías bajo sus placas?",
  },
  brachio: {
    name: "Brachiosaurus",
    emoji: "🦕",
    question: "¿Cuál es la meta más alta que quieres alcanzar hoy?",
  },
};

const getStoredCredentials = () => {
  const raw = localStorage.getItem(STORAGE_CREDENTIALS);
  return raw ? JSON.parse(raw) : null;
};

const getStoredSecrets = () => {
  const raw = localStorage.getItem(STORAGE_SECRETS);
  return raw ? JSON.parse(raw) : defaultSecrets;
};

const setMessage = (element, message, isError = false) => {
  element.textContent = message;
  element.style.color = isError ? "#8b1f2a" : "#1f6b4b";
};

const setAuthState = (isAuthenticated) => {
  sessionStorage.setItem(SESSION_AUTH, isAuthenticated ? "true" : "false");
  authSection.hidden = isAuthenticated;
  mainSection.hidden = !isAuthenticated;
};

const setLockState = (isUnlocked) => {
  sessionStorage.setItem(SESSION_UNLOCK, isUnlocked ? "true" : "false");
  if (isUnlocked) {
    lockPanel.classList.remove("is-locked");
    questionMeta.innerHTML = "Estado: <span>Desbloqueado</span>";
    questionText.textContent = "Selecciona un dinosaurio para ver su pregunta.";
    return;
  }
  lockPanel.classList.remove("is-locked");
  questionMeta.innerHTML = "Estado: <span>Bloqueado</span>";
  questionText.textContent = "Cuando desbloquees el candado podrás ver las preguntas especiales.";
};

const updateLockedUI = (isUnlocked) => {
  dinoCards.forEach((card) => {
    card.classList.toggle("is-locked", !isUnlocked);
  });
  questionCard.classList.toggle("is-locked", !isUnlocked);
};

const resetAccess = () => {
  localStorage.removeItem(STORAGE_CREDENTIALS);
  localStorage.removeItem(STORAGE_SECRETS);
  sessionStorage.removeItem(SESSION_AUTH);
  sessionStorage.removeItem(SESSION_UNLOCK);
  setMessage(loginMessage, "Acceso restablecido. Configura nuevos datos.");
  setMessage(setupMessage, "");
  setMessage(lockMessage, "");
  setAuthState(false);
  updateLockedUI(false);
};

setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(setupForm);
  const credentials = {
    user: formData.get("setupUser").trim(),
    pass: formData.get("setupPass").trim(),
  };
  const secrets = [
    formData.get("secret1").trim(),
    formData.get("secret2").trim(),
    formData.get("secret3").trim(),
    formData.get("secret4").trim(),
  ];

  if (credentials.user.length < 3 || credentials.pass.length < 3) {
    setMessage(setupMessage, "Usuario y contraseña deben tener al menos 3 caracteres.", true);
    return;
  }

  if (secrets.some((word) => word.length < 2)) {
    setMessage(setupMessage, "Cada palabra secreta debe tener al menos 2 caracteres.", true);
    return;
  }

  localStorage.setItem(STORAGE_CREDENTIALS, JSON.stringify(credentials));
  localStorage.setItem(STORAGE_SECRETS, JSON.stringify(secrets));
  setMessage(setupMessage, "Configuración guardada. Ya puedes iniciar sesión.");
  setupForm.reset();
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const stored = getStoredCredentials();
  if (!stored) {
    setMessage(loginMessage, "Primero guarda el usuario y contraseña en la configuración.", true);
    return;
  }
  const formData = new FormData(loginForm);
  const user = formData.get("loginUser").trim();
  const pass = formData.get("loginPass").trim();
  if (user === stored.user && pass === stored.pass) {
    setMessage(loginMessage, "¡Acceso correcto! Bienvenida/o.");
    setAuthState(true);
    loginForm.reset();
    updateLockedUI(sessionStorage.getItem(SESSION_UNLOCK) === "true");
    return;
  }
  setMessage(loginMessage, "Credenciales incorrectas.", true);
});

resetAccessButton.addEventListener("click", resetAccess);

lockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const storedSecrets = getStoredSecrets();
  const formData = new FormData(lockForm);
  const entered = [
    formData.get("word1"),
    formData.get("word2"),
    formData.get("word3"),
    formData.get("word4"),
  ].map((word) => word.trim().toLowerCase());

  const normalizedSecrets = storedSecrets.map((word) => word.trim().toLowerCase());

  const success = entered.every((word, index) => word === normalizedSecrets[index]);

  if (success) {
    setMessage(lockMessage, "¡Candado abierto! Puedes ver las preguntas.");
    setLockState(true);
    updateLockedUI(true);
    lockForm.reset();
    return;
  }

  setMessage(lockMessage, "Palabras incorrectas. Intenta de nuevo.", true);
  setLockState(false);
  updateLockedUI(false);
});

dinoCards.forEach((card) => {
  card.addEventListener("click", () => {
    const isUnlocked = sessionStorage.getItem(SESSION_UNLOCK) === "true";
    if (!isUnlocked) {
      setMessage(lockMessage, "Desbloquea el candado para activar las preguntas.", true);
      return;
    }
    const key = card.dataset.dino;
    const dino = dinos[key];
    if (!dino) return;

    questionTitle.textContent = dino.name;
    questionText.textContent = dino.question;
    questionImage.textContent = dino.emoji;
    questionMeta.innerHTML = "Estado: <span>Pregunta activa</span>";
    questionSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const initialize = () => {
  const stored = getStoredCredentials();
  if (!stored) {
    setMessage(loginMessage, "Primero guarda el usuario y contraseña.");
  }

  const isAuthenticated = sessionStorage.getItem(SESSION_AUTH) === "true";
  setAuthState(isAuthenticated);
  const isUnlocked = sessionStorage.getItem(SESSION_UNLOCK) === "true";
  updateLockedUI(isUnlocked);
  setLockState(isUnlocked);
};

initialize();
