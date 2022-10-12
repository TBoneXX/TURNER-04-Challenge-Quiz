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
var score = 0;

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
           choicesEl.appendChild(btn);
         }
    
 }
       
    


function questionClick(event) {
  
    var currentQuestion = questions[currentQuestionIndex];
    var buttonEl = event.target;
    console.log (currentQuestion.answer);
    // if the clicked element is not a choice button, do nothing.
    // if (!buttonEl.textContent.matches(currentQuestion.choices.textContent)) {
    //     return;
    // }

    // check if user guessed right or wrong
    if (buttonEl.textContent === currentQuestion.answer) { //replace true with a conditional statement that checks if the clicked choice button's value is the same as the questions[currentQuestionIndex]'s answer
        //correct answer scenario
        sfxRight.play();
        score++;
        currentQuestionIndex++;
       
    } else {
        sfxWrong.play();
        time = time - 15;
        timerEl.textContent = time;
        //incorrect scenario
         // penalize time
        // move to next question
     // display new time on page
    // flash right/wrong feedback on page
    currentQuestionIndex++;
    // move to next question
    }
    
    
    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        
        getQuestion();
    }

}
function quizEnd() {
    console.log (score);
    // stop timer
    clearInterval(timerID);

    // show end screen
    // var endScreenEl = document.getElementById('end-screen');
    // endScreenEl.removeAttribute('class');
    endscrn.style.display = 'block';
    questionsEl.style.display = 'none';
    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = score;

    // hide questions section
    questionsEl.setAttribute('class', 'hide');
}




function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== '') {

        // get saved scores from localstorage (highscores), or if not any, set to empty array

        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

        // format new score object for current user

        var newScore = {
            score,
            initials
        };

        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));
        

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
