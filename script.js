let startQuiz = document.getElementById("start-quiz");
let timeLeft = document.getElementById("seconds");
const initialSecondsRemaining = 30;

window.onload = function () {
  changePageType("intro");
};

startQuiz.addEventListener("click", handleStartQuizClicked);

document
  .getElementById("quizbuttontest")
  .addEventListener("click", handleQuizButtonTest);

document
  .getElementById("highscoretest")
  .addEventListener("click", handleHighscoreTest);

document
  .getElementById("endpagetest")
  .addEventListener("click", handleEndpageTest);

document
  .getElementById("answer1")
  .addEventListener("click", handleAnswer1Clicked);
document
  .getElementById("answer2")
  .addEventListener("click", handleAnswer2Clicked);
document
  .getElementById("answer3")
  .addEventListener("click", handleAnswer3Clicked);
document
  .getElementById("answer4")
  .addEventListener("click", handleAnswer4Clicked);

function handleQuizButtonTest(e) {
  e.preventDefault();
  if (applicationGlobals.currentQuestion == ALL_QUESTIONS.length - 1) {
    clearInterval(applicationGlobals.secondsRemainingCallback);
    changePageType("endpage");
  } else {
    showQuestion(applicationGlobals.currentQuestion + 1);
  }
}

function handleEndpageTest(e) {
  e.preventDefault();
  changePageType("highscore");
}

function handleHighscoreTest(e) {
  e.preventDefault();
  changePageType("intro");
}

function handleStartQuizClicked(e) {
  e.preventDefault();
  changePageType("quiz");
  showQuestion(0);
  applicationGlobals.secondsRemaining = initialSecondsRemaining;
  applicationGlobals.secondsRemainingCallback = setInterval(function () {
    applicationGlobals.secondsRemaining =
      applicationGlobals.secondsRemaining - 1;
    document.getElementById("secondsText").textContent =
      applicationGlobals.secondsRemaining;
    if (applicationGlobals.secondsRemaining == 0) {
      clearInterval(applicationGlobals.secondsRemainingCallback);
      changePageType("endpage");
    }
  }, 1000);
}

function handleQuizFinished() {
  clearInterval(applicationGlobals.secondsRemainingCallback);
  let currentScore = JSON.stringify(applicationGlobals.secondsRemaining);
  console.log(currentScore);
  document.getElementById("currentScoreDisplayBox").textContent = currentScore;
}

function changePageType(newPageType) {
  document.getElementById("intro").style.display =
    newPageType == "intro" ? "BLOCK" : "NONE";
  document.getElementById("quiz").style.display =
    newPageType == "quiz" ? "BLOCK" : "NONE";
  document.getElementById("highscore").style.display =
    newPageType == "highscore" ? "BLOCK" : "NONE";
  document.getElementById("endpage").style.display =
    newPageType == "endpage" ? "BLOCK" : "NONE";
}

function showQuestion(questionIndex) {
  applicationGlobals.currentQuestion = questionIndex;

  if (applicationGlobals.currentQuestion === ALL_QUESTIONS.length) {
    changePageType("endpage");
    handleQuizFinished();
  }

  let question = ALL_QUESTIONS[questionIndex];
  document.getElementById("questionText").textContent = question.questionText;
  document.getElementById("answer1").textContent = question.possible_answers[0];
  document.getElementById("answer2").textContent = question.possible_answers[1];
  document.getElementById("answer3").textContent = question.possible_answers[2];
  document.getElementById("answer4").textContent = question.possible_answers[3];
  clearAnswerVisual();
}

let applicationGlobals = {
  secondsRemaining: initialSecondsRemaining,
  currentQuestion: 0,
  secondsRemainingCallback: null,
  highScores: [
    {
      who: "JPP",
      score: 99,
    },
    {
      who: "JP",
      score: 100,
    },
  ],
};

function handleAnswerClicked(answer) {
  if (ALL_QUESTIONS[applicationGlobals.currentQuestion].rightAnswer == answer) {
    showCorrectAnswerVisual();
    setTimeout(function () {
      showQuestion(applicationGlobals.currentQuestion + 1);
    }, 700);
  } else {
    showIncorrectAnswerVisual();
    applicationGlobals.secondsRemaining =
      applicationGlobals.secondsRemaining - 10;
    setTimeout(function () {
      showQuestion(applicationGlobals.currentQuestion + 1);
    }, 700);
  }
}

function showCorrectAnswerVisual() {
  document.getElementById("correctOrIncorrectVisual").textContent = "CORRECT!";
}

function showIncorrectAnswerVisual() {
  document.getElementById("correctOrIncorrectVisual").textContent =
    "INCORRECT!";
}

function clearAnswerVisual() {
  document.getElementById("correctOrIncorrectVisual").textContent = " ";
}

function handleAnswer1Clicked(e) {
  e.preventDefault();
  handleAnswerClicked(1);
}

function handleAnswer2Clicked(e) {
  e.preventDefault();
  handleAnswerClicked(2);
}

function handleAnswer3Clicked(e) {
  e.preventDefault();
  handleAnswerClicked(3);
}

function handleAnswer4Clicked(e) {
  e.preventDefault();
  handleAnswerClicked(4);
}

/* How to get initals from form and saved with score
  1. eventlistener on form box for when 'enter' key is released
  2. when released, combine with score string and save to localstorage
  3. 

*/

document
  .getElementById("saveHighScoreBtn")
  .addEventListener("click", handleSaveScoreAndInitials);

function handleSaveScoreAndInitials() {
  let currentHighscore = JSON.stringify("initialsInput" + currentScore);
  console.log(currentHighscore);
}

let ALL_QUESTIONS = [
  {
    questionText: "Which type is not simple?",
    rightAnswer: 3,
    possible_answers: ["string", "alert", "bool", "datetime"],
  },
  {
    questionText: "Which is higher?",
    rightAnswer: 1,
    possible_answers: ["One", "Two", "Three", "Four"],
  },
  {
    questionText: "How phat yo momma?",
    rightAnswer: 4,
    possible_answers: [
      "ham planet",
      "grape looking",
      "Wears a MAGA hat",
      "You possess admirable heft, girl",
    ],
  },
];
