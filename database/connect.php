<?php

    $tranNam=3306;
    $connect=mysqli_connect('localhost','root','','webbantrangsuc', 3306);

    if (mysqli_connect_error()) {
        $connect=mysqli_connect('localhost','root','','webbantrangsuc', $tranNam);
    }