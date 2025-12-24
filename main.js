// Selección de elementos del DOM
const dinoCards = document.querySelectorAll(".dino-card");
const questionSection = document.getElementById("question-section");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const questionMeta = document.getElementById("question-meta");

// Elementos para responder preguntas individuales
const answerInput = document.getElementById("answer-input");
const checkAnswerButton = document.getElementById("check-answer-button");
const answerMessage = document.getElementById("answer-message");

// Elementos para la validación final (Header)
const wordInputs = Array.from(document.querySelectorAll(".word-input"));
const verifyWordsButton = document.getElementById("verify-words-button");
const wordsMessage = document.getElementById("words-message");

const dinos = {
  triceratops: {
    name: "Triceratops",
    emoji: "🦕",
    question: "¿Qué recuerdo te hace sentir tan fuerte como sus tres cuernos?",
    answer: "familia",
  },
  raptor: {
    name: "Velociraptor",
    emoji: "🦖",
    question: "¿Qué pista rápida puedes descubrir para seguir la aventura?",
    answer: "huella",
  },
  stego: {
    name: "Stegosaurus",
    emoji: "🦕",
    question: "¿Qué detalle especial esconderías bajo sus placas?",
    answer: "estrella",
  },
  brachio: {
    name: "Brachiosaurus",
    emoji: "🦕",
    question: "¿Cuál es la meta más alta que quieres alcanzar hoy?",
    answer: "sueño",
  },
};

const secretWords = ["familia", "huella", "estrella", "sueño"];
let activeDinoKey = null;

// Normalizar texto (quitar espacios y pasar a minúsculas)
const normalize = (value) => value.trim().toLowerCase();

const setStatusMessage = (element, message, status) => {
  element.textContent = message;
  element.className = "message-status"; // Reset clases
  if (status === "error") element.classList.add("is-error");
  if (status === "success") element.classList.add("is-success");
};

// Evento al hacer clic en un dinosaurio
dinoCards.forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.dino;
    const dino = dinos[key];
    if (!dino) return;

    activeDinoKey = key;
    questionTitle.textContent = dino.name;
    questionText.textContent = dino.question;
    questionImage.textContent = dino.emoji;
    questionMeta.innerHTML = "Estado: <span>Pregunta activa</span>";
    
    // Limpiar input y mensajes anteriores
    answerInput.value = "";
    setStatusMessage(answerMessage, "", "");

    // Scroll suave a la pregunta
    questionSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Comprobar la respuesta del dinosaurio seleccionado
checkAnswerButton.addEventListener("click", () => {
  if (!activeDinoKey) {
    setStatusMessage(answerMessage, "Primero selecciona un dinosaurio.", "error");
    return;
  }

  const expected = normalize(dinos[activeDinoKey].answer);
  const response = normalize(answerInput.value);

  if (!response) {
    setStatusMessage(answerMessage, "Escribe una respuesta antes de comprobar.", "error");
    return;
  }

  if (response === expected) {
    setStatusMessage(answerMessage, `¡Correcto! La palabra secreta es: ${expected.toUpperCase()}`, "success");
  } else {
    setStatusMessage(answerMessage, "Respuesta incorrecta. Intenta de nuevo.", "error");
  }
});

// Verificar las 4 palabras en el header para ir a carta.html
verifyWordsButton.addEventListener("click", () => {
  const entered = wordInputs.map((input) => normalize(input.value));

  if (entered.some((word) => !word)) {
    setStatusMessage(wordsMessage, "Completa las cuatro palabras primero.", "error");
    return;
  }

  const isCorrect = entered.every((word, index) => word === secretWords[index]);

  if (isCorrect) {
    setStatusMessage(wordsMessage, "¡Correcto! Abriendo la carta...", "success");
    // Pequeña pausa para que vean el mensaje de éxito antes de redirigir
    setTimeout(() => {
      window.location.href = "carta.html";
    }, 1000);
  } else {
    setStatusMessage(wordsMessage, "Alguna palabra no es correcta. Revisa tus pistas.", "error");
  }
});