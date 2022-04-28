<?php
session_start();

require_once "config.php";
if (isset($_POST['score']) && json_decode($_POST['score']) === 1 && isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
    $sql = "UPDATE users SET score = score + 1 WHERE id = ?";
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $_SESSION['id']);


        if (mysqli_stmt_execute($stmt)) {

            mysqli_stmt_store_result($stmt);
        } else {
            echo "Oops! Something went wrong. Please try again later.";
        }
        mysqli_stmt_close($stmt);
    }
}
