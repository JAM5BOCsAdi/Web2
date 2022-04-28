import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;
let animation;
let endgame = true;
/** Loop that keeps updated the "screen" */
function update(time){
    if(endgame == false){
        if(lastTime != null){
            const delta = time - lastTime;
            //console.log(delta);
            /** Update's the Ball and ComputerPaddle's position by delta */
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            computerPaddle.update(delta, ball.y);
            /** Changing the theme [color] of the game */
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));

            document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

            if(isLose()){
                handleLose();
                console.log("Lose");
            }

        }

    lastTime = time;
    //console.log(time);
    animation = window.requestAnimationFrame(update);
    }
}
/** Lose a point, when the Ball collide with the wall */
function isLose(){
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}
/** Handle the loser or winner of the game to 5 */
function handleLose(){
    const rect = ball.rect();
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    }
    else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }

    if(parseInt(playerScoreElem.textContent) === 5 || parseInt(computerScoreElem.textContent) === 5){
        let winner = (parseInt(playerScoreElem.textContent) === 5) ? "Player" : "Computer";
        /*document.cookie = winner;
        window.location.href = window.location.href+'?winner='+winner;*/
        if(winner==="Player"){
            $.ajax({
                type: 'POST',
                data: {'score': 1},
                url: 'saveScore.php'
            }).done(function(response){
                console.log(response)
            });
        }
        endgame = true; 

        document.getElementById("cover").classList.add("hidden");
        document.getElementById("game-over").classList.remove("hidden");
        window.cancelAnimationFrame(animation);

        //let win = `<h1 class="win">Game Over! ${winner} Win</h1>`;
        document.getElementById("game-over-score").textContent = "Game Over! " + winner + " Win";

    }
    ball.reset();
    computerPaddle.reset();
}
/** Start the Game Function [Button] */
function startGame(){
    document.getElementById("cover").classList.remove("hidden");
    document.getElementById("start").classList.add("hidden");
    document.getElementById("game-over").classList.add("hidden");
    console.log("start");

    animation = window.requestAnimationFrame(update);

    endgame = false;

    playerScoreElem.textContent = 0;
    computerScoreElem.textContent = 0;
 
}
/** Paddle moves with mouse */
document.addEventListener("mousemove", e => {
    /* e.y going to be in "px" and we need to convert it to a "%" value */
    playerPaddle.position = e.y / window.innerHeight * 100;
});
/** Start the Game on click */
document.getElementById("startGame").addEventListener("click", e => {
    startGame();
});
/** Start a new Game on click */
document.getElementById("startGame-end").addEventListener("click", e => {
    startGame();
});
//window.requestAnimationFrame(update);



