window.onload = function () {
  let highScores = [];
  let highScoresAsString = localStorage.getItem("highscores");
  if (highScoresAsString != null) {
    highScores = JSON.parse(highScoresAsString);
    highScores.sort(function (a, b) {
      return b.score - a.score;
    });
  }

  let highScoreListEle = document.getElementById("highScoreList");
  highScores.forEach((element) => {
    console.log(element);
    var li = document.createElement("li");
    //li.setAttribute('class','');
    highScoreListEle.appendChild(li);
    li.innerText = element.initials + ": " + element.score;
  });
};

document
  .getElementById("clearHighscores")
  .addEventListener("click", handleClearHighScores);

function handleClearHighScores() {
  localStorage.removeItem("highscores");
  location.reload();
}
