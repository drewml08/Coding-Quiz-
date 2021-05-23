var questions = [
    { title: "Which of the following are capabilities of functions in JavaScript?", a: "Return a value", b: "Accept parameters and return a value", c: "Accept parameters", d: "None of the above", correct: "b", score: 5 },

    { title: "______ tag is an extension to HTML that can enclose any number of JavaScript statements.", a: "&lt;SCRIPT&gt;", b: "&lt;BODY&gt;", c: "&lt;HEAD&gt;", d: "&lt;TITLE&gt;", correct: "a", score: 5},

    { title: "If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph?", a: "\"New Text\"", b: "para1.value=\"New Text\"", c: "para1.firstChild.nodeValue= \"New Text\"", d: "para1.nodeValue=\"New Text\"", correct: "b", score: 5},

    { title: "Which of the following is not considered a JavaScript operator?", a: "new", b: "this", c: "delete", d: "typeof", correct: "b", score: 5},

    { title: "The _______ method of an Array object adds and/or removes elements from an array.", a: "Reverse", b: "Shift", c: "Slice", d: "Splice", correct: "d", score: 5},
];

var clockInterval = null;
var secondsLeft = 0;
var highscores = JSON.parse( localStorage.getItem( "week4-highscores" ) );
var current = 0;
var totalscore = 0;

function displayQuestion (index) {
    if (index >= questions.length){
        gameOver();
        return;
    }

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
        totalscore += questions[current].score;
    } else {
        response.innerHTML = "Wrong Answer!";
        secondsLeft -= 30;
    }
    var timerInterval = setInterval(function() {
        clearInterval(timerInterval);
        displayQuestion (current + 1);
    
      }, 2500);
}

function updateClock() {
    var clock = document.querySelector( "#clock" );
    clock.innerHTML = new Date( secondsLeft * 1000 ).toISOString().substr( 11, 8 );    
}

function startClock() {
    secondsLeft = 5 * 60;
    updateClock();

    clockInterval = setInterval( function() {
        --secondsLeft;
        updateClock();
        if (secondsLeft === 0) {
            gameOver();
        }

    }, 1000 );
}

function stopClock() {
    clearInterval( clockInterval );
}

function gameOver()
{
    stopClock();

    var summary = document.querySelector("#summary");
    summary.innerHTML = "Your Score is: " + totalscore;

    if( secondsLeft === 0 ) {
        // Game is over because time ran out
    }
    hidecard("#start");
    hidecard("#question");
    showcard("#gameover");
    hidecard("#highscores");
}

function sortByScore( a, b )
{
    if( a.score < b.score ) {
        return 1;
    }
    else if( a.score > b.score ) {
        return -1;
    }
    return 0;
}

function clearChildren( parent ) {
    if( parent === null ) return;

    var node = parent.firstChild;
    while( node ) {
        var remove = node;
        node = node.nextSibling;
        parent.removeChild( remove );
    }
}

function addHighscore( score ) {
    if( highscores === null ) {
        highscores = [];
    }
    highscores.push( score );
    highscores.sort( sortByScore );
    localStorage.setItem( "week4-highscores", JSON.stringify( highscores ) );
}

function clearHighscores() {
    highscores = [];
    localStorage.removeItem( "week4-highscores" );
    showHighscores();
}

function showHighscores() {
    var divScores = document.querySelector( "#leaderboard" );

    clearChildren( divScores );
    if( highscores.length === 0 ) {
        return;
    }

    var line = document.createElement( "div" );
    line.classList.add( "score" );
    line.classList.add( "header" );
    line.innerHTML = "<p>Name</p><p>Score</p>";
    divScores.appendChild( line );

    for( var i = 0; i < highscores.length; ++i ) {
        line = document.createElement( "div" );
        line.classList.add( "score" );
        line.innerHTML = "<p>" + highscores[ i ].name + "</p><p>" + highscores[ i ].score + "</p>";
        divScores.appendChild( line );
    }
    hidecard("#start");
    hidecard("#question");
    hidecard("#gameover");
    showcard("#highscores");

}

function submitHighscore() {
    var playerName = document.querySelector( "#name" );
    addHighscore({ name: playerName.value, score: totalscore});
    showHighscores();
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
    totalscore = 0;
}

function startQuiz() {
    hidecard("#start");
    showcard("#question");
    hidecard("#gameover");
    hidecard("#highscores");
    startClock();
    displayQuestion(0);
}

initializeQuiz();








