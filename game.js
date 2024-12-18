let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  

$(".btn").click(function () {
    let userChosenColor = (this.id);
  
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    animatePress(userChosenColor)

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over")}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
  
}

function nextSequence() {

    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 3 + 1);

    let randomChosenColor =  buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);

    level++;
   
    $("#level-title").text("Level " + level );
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
    
}

function animatePress(currentColor) {
 
  $("#" + currentColor).addClass("pressed");

   setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}







