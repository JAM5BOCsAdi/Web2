<?php

// http://localhost/works/web2/index.php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$server = 'localhost';
$username = 'root';
$password = '';
$dbname = 'web2';
 
/* Attempt to connect to MySQL database */
$link = mysqli_connect($server, $username, $password, $dbname);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

/* ------------------------- */
/*


$server = 'mysql.caesar.elte.hu';
$username = 'oradam';
$password = 'Pcn30DFTv5zMLcR5';
$dbname = 'oradam';
 

$link = mysqli_connect($server, $username, $password, $dbname);

if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

*/

?>

