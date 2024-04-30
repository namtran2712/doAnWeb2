<?php

require("./connect.php");

function selectAll($connect)
{
    $sql = "SELECT *
        FROM CATEGORY";
    $result = mysqli_query($connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        $category = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $category[] = $row;
        }
        echo json_encode($category);
    }
}

function saveType($name, $id)
{
    session_start();
    echo $name . "<br>" . $id;
    if (isset($_SESSION["category"])) {
        $_SESSION["category"]["type"] = 2;
        $_SESSION["category"]["name"] = $name;
        $_SESSION["category"]["id"] = $id;
    } else {
        $_SESSION["category"]["type"] = 2;
        $_SESSION["category"]["name"] = $name;
        $_SESSION["category"]["id"] = $id;
    }

    echo print_r($_SESSION["category"]);
}

if ($_GET["type"] == 1) {
    selectAll($connect);
} else if ($_GET["type"] == 2) {
    saveType($_GET["name"], $_GET["id"]);
}
