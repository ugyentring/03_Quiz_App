const questions = [
  {
    question: "Who is the first Bhutanese movie which get Oscar nomination?",
    answers: [
      { text: "Lunana: The Yak in the Classroom", correct: true },
      { text: "Serzam Gang", correct: false },
      { text: "Sergyal", correct: false },
      { text: "Sorry Wai", correct: false },
    ],
  },
  {
    question: "Bhutan is?",
    answers: [
      { text: "Carbon positive", correct: false },
      { text: "Carbon Neutral", correct: false },
      { text: "Carbon Negative", correct: true },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What is Bhutan known for the outside world?",
    answers: [
      { text: "GDP", correct: false },
      { text: "Football", correct: false },
      { text: "Economy", correct: false },
      { text: "GNH", correct: true },
    ],
  },
  {
    question: "Who is the father of modern Bhutan?",
    answers: [
      { text: "Nge Apa", correct: false },
      { text: "Third Druk Gyalpo", correct: true },
      { text: "Ugyen Tshering", correct: false },
      { text: "Jigme Singye Wangchuk", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Start quiz function
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Show function
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Display answer code
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  // Disable all answer buttons after selection
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  // Display the "Next" button
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scores ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Next button functionality
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
