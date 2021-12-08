//simon says game logic 

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function(){
	
	if (!started){
		nextSequence();
		$("#level-title").text("Level " + level);
		started = true;
	} 	
});

$(".btn").click(function(){
	//if ($(this).attr("id", userChosenColor) == gamePattern[gamePattern.length]){
		var userChosenColor = $(this).attr("id");
		userClickedPattern.push(userChosenColor);		
		playSound(userChosenColor);
		animatePress(userChosenColor);
		checkAnswer(userClickedPattern.length-1);	
	//} else {
		//playSound("wrong");
		//animatePress(userChosenColor);
	//}
});

function nextSequence(){
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);

	//create random number 0-3
	var randomNumber;
	randomNumber = Math.floor(Math.random() * 4);
	//console.log(randomNumber);
	//use random number to select color in array
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	console.log(gamePattern);

	//flash button of color/number selected
	$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

	//play sound when clicking on selected button
	
	playSound(randomChosenColor);
	
	
}

// play mp3 file based off name
function playSound(name){

	var sound = new Audio("sounds/"+name+".mp3")
	sound.play();

}

//click button and save color of button user clicked
function animatePress(currentColor){
	$("#" + currentColor).addClass("pressed");
		

		setTimeout(function(){
			$("#" + currentColor).removeClass("pressed")
		}, 100)
		
	};

function checkAnswer(currentLevel){
	if(gamePattern.at(currentLevel) === userClickedPattern.at(currentLevel)){
		console.log("Success");
			if (userClickedPattern.length === gamePattern.length){
		        setTimeout(function () {
		          nextSequence();
		        }, 1000);

      		}
	} else {
		$("body").addClass("game-over");
		playSound("wrong");
		setTimeout(function(){
			$("body").removeClass("game-over")
		}, 200)
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
		console.log("Failure");
	}
}


function startOver(){
	level = 0;
	started = false;
	gamePattern = [];
}
