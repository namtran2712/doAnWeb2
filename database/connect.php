<?php
$connect=mysqli_connect('localhost','root','','webbantrangsuc', 3306);

if (mysqli_connect_error()) {
    die('Connect Error (' . mysqli_connect_errno() . ') '
            . mysqli_connect_error());
}
?>