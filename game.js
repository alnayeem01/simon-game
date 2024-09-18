var buttonColours =[ "red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level=0;
// t detect keyboard input
$(document).keydown(function(){
    if (!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started= true;
    }
});

//  function for dinding user choise and keeping user input record
$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   
    playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1)
})

// check answer function

function checkAnswer (currentLevel1){
    if (gamePattern [currentLevel1] === userClickedPattern[currentLevel1] ){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function (){
                nextSequence();
            },200);
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },100)
        $("h1").text("Game over. Press any key to restart.")
        startOver();
    }
}
// function dor creating and recornding sequences
function nextSequence (){
    userClickedPattern = []; // Once next sequence triggerd rest hte userClickedPattern
    level++;
    $("#level-title").text("level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound (randomChosenColour);
}
//  function for playing sound on demand

function playSound(name){   
    var audio = new Audio ("sounds/"+name+ ".mp3");  
    audio.play();
}
//  function for aniamtion on click

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

// gameOver funtion

function startOver(){
    level=0;

    gamePattern = [];

    started = false;

    
}