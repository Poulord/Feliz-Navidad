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
  albertosaurus: {
    name: "Albertosaurus",
    emoji: "🦖",
    question: "¿Este dinosaurio era carnívoro o herbívoro?",
    answer: "carnívoro",
  },
  nigersaurus: {
    name: "Nigersaurus",
    emoji: "🦕",
    question: "¿Cuántos dientes tenía este dinosaurio aproximadamente?",
    answer: "500",
  },
  diplodocus: {
    name: "Diplodocus",
    emoji: "🦕",
    question: "¿Era el Diplodocus más largo que dos autobuses de forma horizontal?",
    answer: "sí",
  },
  titanosaurus: {
    name: "Titanosaurus",
    emoji: "🦕",
    question: "¿De qué época fueron los Titanosaurus?",
    answer: "cretácico",
  },
};

const secretWords = ["carnivoro", "500", "si", "cretacico"];
let activeDinoKey = null;

// Normalizar texto (quitar espacios y pasar a minúsculas)
const normalize = (value) => value
  .trim()
  .toLowerCase()
  .normalize("NFD")
  .replace(/\p{Diacritic}/gu, "");

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
    const displayAnswer = dinos[activeDinoKey].answer.toUpperCase();
    setStatusMessage(answerMessage, `¡Correcto! La palabra secreta es: ${displayAnswer}`, "success");
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
