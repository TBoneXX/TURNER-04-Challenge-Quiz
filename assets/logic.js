// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;


// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var startscrn = document.getElementById('start-screen');
var endscrn = document.getElementById('end-screen');
var scores = document.getElementById('scores');
var timerID = 0;


// sound effects
var sfxRight = new Audio('assets/correct.wav');
var sfxWrong = new Audio('assets/incorrect.wav');


function startQuiz() {
    // hide start screen
startscrn.style.display = 'none';
endscrn.style.display = 'none';
scores.style.display = 'none';
  // un-hide questions section
questionsEl.style.display = 'block';
console.log (time);
//start timer (high)

timerID = setInterval(clockTick,1000);

function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
    console.log(timerEl);
}

    getQuestion();

}
function getQuestion() { //this function is going to get the data from the questions array
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = ''; //Study this later

    // create a for loop that creates the choice elements
    for (var i = 0; i < currentQuestion.choices.length; i++) {

            var btn = document.createElement("button");
            var t = document.createTextNode(currentQuestion.choices[i]);
            btn.appendChild(t);
            document.body.appendChild(btn);
         }
    
 }
           
    


function questionClick(event) {
    var currentQuestion = questions[currentQuestionIndex];
    var buttonEl = event.target;

    // if the clicked element is not a choice button, do nothing.
    if (!buttonEl.matches(currentQuestion.choices)) {
        return;
    }

    // check if user guessed right or wrong
    if (buttonEl != currentQuestion.answer) { //replace true with a conditional statement that checks if the clicked choice button's value is the same as the questions[currentQuestionIndex]'s answer
        //incorrect answer scenario
        sfxWrong.play();
        time = time - 10;
        timerEl.textContent = time;
        // penalize time
        // display new time on page
    } else {
        //correct scenario
        sfxRight.play();
        // move to next question
    }
    // flash right/wrong feedback on page

    // move to next question
    currentQuestionIndex++;

    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute('class', 'hide');
}




function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== '') {

        //JSON.parse
        // get saved scores from localstorage (highscores), or if not any, set to empty array
        

        // format new score object for current user
        

        // save to localstorage
        

        // redirect to next page
        window.location.href = 'highscores.html';
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick; 

initialsEl.onkeyup = checkForEnter;