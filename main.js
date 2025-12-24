const dinoCards = document.querySelectorAll(".dino-card");
const questionSection = document.getElementById("question-section");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const questionMeta = document.getElementById("question-meta");
const answerInput = document.getElementById("answer-input");
const checkAnswerButton = document.getElementById("check-answer");
const answerMessage = document.getElementById("answer-message");
const verifyWordsButton = document.getElementById("verify-words");
const wordsMessage = document.getElementById("words-message");
const wordInputs = [
  document.querySelector('input[name="word1"]'),
  document.querySelector('input[name="word2"]'),
  document.querySelector('input[name="word3"]'),
  document.querySelector('input[name="word4"]'),
];

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

const normalize = (value) => value.trim().toLowerCase();

const setStatusMessage = (element, message, status) => {
  element.textContent = message;
  element.classList.remove("is-error", "is-success");
  if (status === "error") {
    element.classList.add("is-error");
  }
  if (status === "success") {
    element.classList.add("is-success");
  }
};

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
    answerInput.value = "";
    setStatusMessage(answerMessage, "", "");
    questionSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

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
    setStatusMessage(answerMessage, "¡Respuesta correcta!", "success");
    return;
  }
  setStatusMessage(answerMessage, "Respuesta incorrecta. Intenta de nuevo.", "error");
});

verifyWordsButton.addEventListener("click", () => {
  const entered = wordInputs.map((input) => normalize(input.value));
  if (entered.some((word) => !word)) {
    setStatusMessage(wordsMessage, "Completa las cuatro palabras.", "error");
    return;
  }
  const isCorrect = entered.every((word, index) => word === secretWords[index]);
  if (isCorrect) {
    setStatusMessage(wordsMessage, "¡Correcto! Abriendo la carta...", "success");
    window.location.href = "carta.html";
    return;
  }
  setStatusMessage(wordsMessage, "Palabras incorrectas. Revisa las respuestas.", "error");
});
