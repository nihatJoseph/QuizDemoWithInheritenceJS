function question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

question.prototype.checkAnswer = function (answer) {
  return this.answer === answer;
};

function quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

quiz.prototype.getQuestions = function () {
  return this.questions[this.questionIndex];
};

quiz.prototype.isFinish = function () {
  return this.questions.length === this.questionIndex;
};

quiz.prototype.guess = function (answer) {
  let question = this.getQuestions();
  if (question.checkAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

let q1 = new question(
  "what is the best programming language?",
  ["C#", "javascript", "python", "asp.net"],
  "javascipt"
);

let q2 = new question(
  "what is the most popular programming language?",
  ["C#", "visual basic", "node.js", "javascript"],
  "javascipt"
);

let q3 = new question(
  "what is the best modern programming language?",
  ["C#", "javascript", "python", "javascript"],
  "javascipt"
);

let questions = [q1, q2, q3];

let quiz1 = new quiz(questions);

loadQuestion();

function loadQuestion() {
  if (quiz1.isFinish()) {
    showScore();
  } else {
    let question = quiz1.getQuestions();
    let choices = question.choices;
    document.querySelector("#question").textContent = question.text;
    for (let index = 0; index < choices.length; index++) {
      const element = document.querySelector("#choice" + index);
      element.innerHTML = choices[index];
      guess("btn" + index, choices[index]);
    }
    showProgress();
  }
}

function guess(id, guess) {
  let btn = document.getElementById(id);
  btn.onclick = function () {
    quiz1.guess(guess);
    loadQuestion();
  };
}

function showScore() {
  let html = `<h2>Score</h2><h4>${quiz1.score}</h4>`;
  document.querySelector(".card-body").innerHTML = html;
}

function showProgress() {
  let totalQuestion = quiz1.questions.length;
  let questionNumber = quiz1.questionIndex + 1;
  document.querySelector("#progress").innerHTML =
    "Question " + questionNumber + " of " + totalQuestion;
}
