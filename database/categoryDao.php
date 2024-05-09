<?php

require("./connect.php");

function selectById ($connect,$id) {
    $sql = "SELECT *
    FROM CATEGORY 
    WHERE ID_CATEGORY=$id";
    $result = mysqli_query($connect,$sql);
    if (mysqli_num_rows($result) > 0) {
        $category = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $category[] = $row;
        }
        echo json_encode($category);
    }
}

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

if ($_GET["type"]==1) {
    selectAll($connect);
}
elseif($_GET["type"]==3)
{
    $id=$_GET['id'];
    selectById($connect,$id);
}
else if ($_GET["type"] == 2) {
    saveType($_GET["name"], $_GET["id"]);
}
?>
