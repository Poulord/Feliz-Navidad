const dinoCards = document.querySelectorAll(".dino-card");
const questionSection = document.getElementById("question-section");
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

dinoCards.forEach((card) => {
  card.addEventListener("click", () => {
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
