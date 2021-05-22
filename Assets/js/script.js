var questions = [
    { title: "Which of the following are capabilities of functions in JavaScript?", a: "Return a value", b: "Accept parameters and return a value", c: "Accept parameters", d: "None of the above", correct: "b", score: 5 },

    { title: "______ tag is an extension to HTML that can enclose any number of JavaScript statements.", a: "&lt;SCRIPT&gt;", b: "&lt;BODY&gt;", c: "&lt;HEAD&gt;", d: "&lt;TITLE&gt;", correct: "a", score: 5},

    { title: "If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph?", a: "\"New Text\"", b: "para1.value=\"New Text\"", c: "para1.firstChild.nodeValue= \"New Text\"", d: "para1.nodeValue=\"New Text\"", correct: "b", score: 5},

    { title: "Which of the following is not considered a JavaScript operator?", a: "new", b: "this", c: "delete", d: "typeof", correct: "b", score: 5},

    { title: "The _______ method of an Array object adds and/or removes elements from an array.", a: "Reverse", b: "Shift", c: "Slice", d: "Splice", correct: "d", score: 5},
];

var current = 0;

function displayQuestion (index) {
    var question = document.querySelector("#prompt");
    question.innerHTML = questions[index].title;

    var a = document.querySelector("#a");
    a.innerHTML = questions[index].a;

    var b = document.querySelector("#b");
    b.innerHTML = questions[index].b;

    var c = document.querySelector("#c");
    c.innerHTML = questions[index].c;

    var d = document.querySelector("#d");
    d.innerHTML = questions[index].d;

    var response = document.querySelector("#response");
    response.innerHTML ="";

    current = index;
}

function answerQuestion (answer) {
    var response = document.querySelector("#response");
    if (answer === questions[current].correct){
        response.innerHTML = "Correct!";
    } else {
        response.innerHTML = "Wrong Answer!";
    }
    var timerInterval = setInterval(function() {
        clearInterval(timerInterval);
        displayQuestion (current + 1);
    
      }, 2500);
}

function showcard(id) {
    var card = document.querySelector(id);
    card.style.display = "block";
}

function hidecard(id) {
    var card = document.querySelector(id);
    card.style.display = "none";
}

function initializeQuiz() {
    showcard("#start");
    hidecard("#question");
    hidecard("#gameover");
    hidecard("#highscores");
}

function startQuiz() {
    hidecard("#start");
    showcard("#question");
    hidecard("#gameover");
    hidecard("#highscores");
    displayQuestion(0);
}

initializeQuiz();








