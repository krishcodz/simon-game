var userClickedPattern = [];
var gamePattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var tog=true;
var currentlevel;
function checkanswer(currentlevel) {
    if(gamePattern[currentlevel]==userClickedPattern[currentlevel]){
        console.log("success");
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function () {
                nextsequence();
              }, 1000);
        }
    }
    else{
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
        $("body").removeClass("game-over"); 
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    level=0;
    gamePattern=[];
    tog=true;

    }
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextsequence() {
    userClickedPattern=[];
    level+=1;
    $("#level-title").text("LEVEL "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkanswer(userClickedPattern.length-1)
})

$(document).keypress(function () {
    if(tog){
        tog=false;
        nextsequence();
    }
});

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function () {
        $('.'+currentColour).removeClass('pressed');
    },100);
}