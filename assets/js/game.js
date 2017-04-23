$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();
$("body").on("click", ".start-button", function(event){
	event.preventDefault(); 
	//try and add ----> clickSound.play();
	generateHTML();

	timerWrapper();
});

$("body").on("click", ".answer", function(event){
	answeredQuestion = true;
	//try and add ----> clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	//try and add ----> clickSound.play();
	resetGame();
}); 

});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
		       "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + 
		       //"<img class='center-block img-wrong' src='img/x.png'>";

	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
			   "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" [questionCounter];

	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
			   "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" 
			   //+ "<img class='center-block img-wrong' src='img/x.png'>";

	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30 </span></p> <p class='text-center'>" + questionArray[questionCounter] + 
			   "</p> <p class='first-answer answer'>A. " + answerArray[questionCounter][0] + 
			   "</p> <p class='answer'>B. "+ answerArray[questionCounter][1]+
			   "</p> <p class='answer'>C. "+ answerArray[questionCounter][2]+ 
			   "</p> <p class='answer'>D. "+ answerArray[questionCounter][3]+
			   "</p>";
	
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
			   "<p class='text-center'>All done, here's how you did!" + "</p>" + 
			   "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + 
			   "<p> Wrong Answers: " + incorrectTally + "</p>" + 
			   "<p> Unanswered: " + unansweredTally + "</p>" + 
			   "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["In which Disney film would you find a rabbit named Thumper?", 
					 "What kind of dog is Pongo from the movie 101 Dalmatians?", 
					 "In the Disney movie Toy Story, Buzz Light year was owned by", 
					 "What kind of animal does Princess Jasmine have for a pet?", 
					 "In the Disney movie Peter Pan, what color of dress does Tinker Bell wear?", 
					 "What is the name of the man that carves Pinocchio?", 
					 "What is the name of the old man in the Disney film Up?",
					 "The sea witch in The Little Mermaid is half what?"];

var answerArray = [["Bambi", "Peter Pan", "Hercules", "Frozen"], 
				   ["Chihuahua","Dalmation","Bulldog","Poodle"], 
				   ["Timmy", "John", "Andy", "Mike"], 
				   ["Monkey","Parrot","Tiger","Snake"], 
				   ["Yellow", "Pink", "Blue", "Green"], 
				   ["Geppetto","Sully","The Blue Fairy","Monstro"], 
				   ["Paul", "Carl", "James", "Edward"], 
				   ["Eel","Shark","Crab","Octopus"]];


var correctAnswers = ["A. Bambi", 
					  "B. Dalmation", 
					  "C. Andy", 
					  "C. Tiger", 
					  "D. Green", 
					  "A. Geppetto", 
					  "B. Carl", 
					  "D. Octopus"];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
//var clickSound = new Audio("get a sound clip");