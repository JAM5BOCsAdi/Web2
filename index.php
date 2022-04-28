<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
  header("location: login.php");
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./styles.css" /> 
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="./script.js" type="module" defer></script>
 
  <title>Index</title>
</head>

<body>
  <!--
      https://www.formget.com/javascript-login-form/
      https://codepen.io/codot/pen/BorNdz
      https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
      https://www.studentstutorial.com/ajax/login-signup

      https://topherpedersen.blog/2019/09/03/simple-leaderboard-tutorial-in-php-js/
    -->
  <canvas id="canvas" style="display: none"></canvas>
  <div id="start" class="">
    <a href="#" id="startGame">Start Game</a>
    <h2 id="game-to-5">Game to 5</h2>
    <div id="buttons">
      <a href="leaderboard.php" id="leaderBoard">LeaderBoard</a>
      <a href="logout.php" id="logOut">LogOut</a>
      <a href="reset-password.php" id="resetPassword">Reset Password</a>
    </div>
  </div>
  <div id="game-over" class="hidden">
    <h1 id="game-over-score">Game Over</h1>
    <a href="#" id="startGame-end">Start Game</a>
    <h2 id="game-to-5-end">Game to 5</h2>
    <div id="buttons">
      <a href="leaderboard.php" id="leaderBoard">LeaderBoard</a>
      <a href="logout.php" id="logOut">LogOut</a>
      <a href="reset-password.php" id="resetPassword">Reset Password</a>
    </div>
  </div>
  <div class="hidden" id="cover">
    <div class="score">
      <div id="player-score">0</div>
      <div id="computer-score">0</div>
    </div>
    <div class="ball" id="ball"></div>
    <div class="paddle left" id="player-paddle"></div>
    <div class="paddle right" id="computer-paddle"></div>
  </div>
</body>

</html>