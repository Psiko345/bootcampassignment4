let startQuiz = document.getElementById("start-quiz");
let timeLeft = document.getElementById("seconds");

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
  .getElementById("summarytest")
  .addEventListener("click", handleSummaryTest);

document
  .getElementsById("answer1")
  .addEventListener("click", handleAnswerClicked);
document
  .getElementsById("answer2")
  .addEventListener("click", handleAnswerClicked);
document
  .getElementsById("answer3")
  .addEventListener("click", handleAnswerClicked);
document
  .getElementsById("answer4")
  .addEventListener("click", handleAnswerClicked);

function handleQuizButtonTest(e) {
  e.preventDefault();
  if (applicationGlobals.currentQuestion == ALL_QUESTIONS.length - 1) {
    clearInterval(applicationGlobals.secondsRemainingCallback);
    changePageType("endpage");
  } else {
    showQuestion(applicationGlobals.currentQuestion + 1);
  }
}

function handleSummaryTest(e) {
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
  applicationGlobals.secondsRemaining = 10;
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
  let question = ALL_QUESTIONS[questionIndex];
  document.getElementById("questionText").textContent = question.questionText;
  document.getElementById("answer1").textContent = question.possible_answers[0];
  document.getElementById("answer2").textContent = question.possible_answers[1];
  document.getElementById("answer3").textContent = question.possible_answers[2];
  document.getElementById("answer4").textContent = question.possible_answers[3];
}

let applicationGlobals = {
  pageType: "intro", // / "highscore" / "quiz"
  secondsRemaining: 10,
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

function handleAnswerClicked(e) {
  e.preventDefault();
  if (ALL_QUESTIONS.possible_answers == rightAnswer) {
    showQuestion(applicationGlobals.currentQuestion + 1);
  }
}

let ALL_QUESTIONS = [
  {
    questionText: "Which type is not simple?",
    rightAnswer: 3,
    possible_answers: ["string", "alert", "bool", "datetime"],
  },
  {
    questionText: "Some other question?",
    right_answer: 1,
    possible_answers: ["string", "alert", "bool", "datetime"],
  },
];
