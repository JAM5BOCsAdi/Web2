<?php
    // Initialize the session
    session_start();

    // Check if the user is already logged in, if yes then redirect him to welcome page
    if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
        header("location: leaderboard.php");
        exit;
    }

    // Include config file
    require_once "config.php";

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./styles.css" />
  <script src="./script.js" type="module" defer></script>
  <title>LeaderBoard</title>
</head>
<body>
  <!--
      https://www.formget.com/javascript-login-form/
      https://codepen.io/codot/pen/BorNdz
      https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
      https://www.studentstutorial.com/ajax/login-signup
      https://www.codegrepper.com/code-examples/php/how+to+use+js+variable+in+php
      https://stackoverflow.com/questions/14662927/how-can-i-store-javascript-variable-output-into-a-php-variable
-->
<canvas id="canvas" style="display: none"></canvas>
<div id="score" class="">
    <h2>LeaderBoard</h2>
    <h3>Top 5</h3>
        <table>
            <tr>
                <td>Ranking</td>
                <td>UserName</td>
                <td>Most Win</td>
            </tr>
            <?php
                /* Mysqli query to fetch rows 
                in descending order of scores */
                $result = mysqli_query($link, "SELECT username, score FROM users_web2 ORDER BY score DESC LIMIT 5");

                /* First rank will be 1 and 
                    second be 2 and so on */
                $ranking = 1;
                
                /* Fetch Rows from the SQL query */
                if (mysqli_num_rows($result)) {
                    while ($row = mysqli_fetch_array($result)) {
                        echo "
                        <tr>
                            <td>{$ranking}</td>
                            <td>{$row['username']}</td>
                            <td>{$row['score']}</td>
                        </tr>  
                        ";
                        $ranking++;
                    }
                }
                
                /*$phpWinner = "<script>let winner = (parseInt(playerScoreElem.textContent) === 5) ? 'Player' : 'Computer'</script>";
                $phpWinner = $_COOKIE['winner'];
                $phpWinner = "<script>document.write(winner);</script>";
                $phpWinner = $_COOKIE['winner'];
                echo $phpWinner;
                $phpWinner = $_GET['winner'];*/

            ?>

    </table>
    <div id="buttons">
        <a href="index.php" id="back">Back</a>
    </div>   
</div>
</body>
</html>