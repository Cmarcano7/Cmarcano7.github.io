var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
];

var startButton = document.querySelector("#begin");
var mainContent = document.querySelector("#main-content");
var initialsRetrieved = false;
totalScore = 0;
var i = 0;
var newDiv;

var totalScore = localStorage.getItem("totalScore");
var currentInitials = localStorage.getItem("currentInitials");
var highScore1;
localStorage.setItem("highScore1", highScore1);
var highScoreInit1;
localStorage.setItem("highScoreInit1", highScoreInit1);

var timeEl = document.querySelector(".timer");
var secondsLeft = 30;

function setTime() {
    var timerInterval = setInterval(function() {
    secondsLeft--;
    if(secondsLeft > 9) {
        timeEl.textContent = "0:" + secondsLeft;
    }
    else {
        timeEl.textContent = "0:0" + secondsLeft;
    }
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function getInitials() {
    mainContent.innerHTML = "";

    var newH1 = document.createElement("h1");
    newH1.textContent = "Finished!";
    mainContent.appendChild(newH1);
    
    var newP = document.createElement("p");
    newP.textContent = "Enter your initials to log your score:";
    mainContent.appendChild(newP);

    var newForm = document.createElement("form");
    newForm.setAttribute("method", "post");

    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "input-group");

    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("name", "initials");
    newInput.setAttribute("id", "initials");

    newDiv.appendChild(newInput);
    newForm.appendChild(newDiv);
    mainContent.appendChild(newForm);

    
    newInput.addEventListener("keypress", function(e, event) {
        event.preventDefault();

        if (e.key === "Enter") {
            var initials = document.querySelector("#initials").value;
            localStorage.setItem("currentInitials", initials);

            window.location.href = "highscores.html";

            if (totalScore > highScore1) {
                highScore1 = totalScore;
                highScoreInit1 = initials;

                document.querySelector("#score-1").textContent = highScore1;
                document.querySelector("#initials-1").textContent = highScoreInit1;
            }
        }

    });  
}

function continueBtn() {
    var contBtn = document.createElement("button");
    contBtn.innerHTML = "continue";
    mainContent.appendChild(contBtn);

    contBtn.addEventListener("click", function() {
        i++;
        if (secondsLeft > 0 && i < questions.length) {    
            nextQuestion();
        }
        else {
            getInitials();
        }
    });

}

function nextQuestion() {
    mainContent.innerHTML = "";

    var newH2 = document.createElement("h2");
    newH2.innerHTML = questions[i].title;
    mainContent.append(newH2);

    newDiv = document.createElement("div");
    mainContent.appendChild(newDiv);

    var ansBtn0 = document.createElement("button");
    var ansBtn1= document.createElement("button");
    var ansBtn2 = document.createElement("button");
    var ansBtn3 = document.createElement("button");

    var ansBtns = [ansBtn0, ansBtn1, ansBtn2, ansBtn3];

    for (var j = 0; j < 4; j++) {
        ansBtns[j].innerHTML = questions[i].answer[j];
        ansBtns[j].setAttribute("class", "btn, btn-secondary")
        newDiv.appendChild(ansBtns[j]);
    }

    for (var k = 0; k < 4; k++) {
        ansBtns[k].addEventListener("click", function() {
            console.log("inside ansBtns[k] event listener, 'this': " + this);
            console.log("inside ansBtns[k] event listener, 'this.innerHTML': " + this.innerHTML);
            console.log("inside ansBtns[k] event listener, typeof 'this.innerHTML': " + typeof this.innerHTML);
            console.log("correct ans = " + questions[i].answer);
            console.log("correct ans type = " + typeof questions[i].answer);
            if (this.innerHTML == questions[i].answer) {
                this.setAttribute("class", "btn btn-success");

                ansBtn0.disabled = true;
                ansBtn1.disabled = true;
                ansBtn2.disabled = true;
                ansBtn3.disabled = true;  

                qAnswered = true;
                totalScore++;
                localStorage.setItem("totalScore", totalScore);

                continueBtn();
            }
            else {
                this.setAttribute("class", "btn-danger");
                
                ansBtn0.disabled = true;
                ansBtn1.disabled = true;
                ansBtn2.disabled = true;
                ansBtn3.disabled = true;  

                // take 5 seconds off timer for a wrong answer
                secondsLeft = secondsLeft - 5;

                qAnswered = true;

                continueBtn();
            }
        });
    }
}

startButton.addEventListener("click", function() {
    setTime();
    nextQuestion();
});
