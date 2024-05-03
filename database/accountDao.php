<?php

require("./connect.php");

function checkLogin($connect, $username, $password)
{
    $sql = "SELECT *
        FROM ACCOUNTS
        WHERE USERNAME = '$username'
        AND PASS_WORD = '$password'";

    $result = mysqli_query($connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        session_start();
        while ($row = mysqli_fetch_assoc($result)) {
            $_SESSION["accountCurrent"]["username"] = $row["USERNAME"];
            $_SESSION["accountCurrent"]["idUser"] = $row["ID_USER"];
            $_SESSION["accountCurrent"]["idAccount"] = $row["ID_ACCOUNT"];
        }
        return 1;
    }
    return 0;
}

function checkAccountExist()
{
    session_start();
    if (isset($_SESSION["accountCurrent"])) {
        return true;
    }
    return false;
}

function removeAccountExist()
{
    session_start();
    if (isset($_SESSION["accountCurrent"])) {
        unset($_SESSION["accountCurrent"]);
        return 1;
    }
    return 0;
}

function checkUsername($connect, $username)
{
    $sql = "SELECT *
        FROM ACCOUNTS
        WHERE USERNAME = '$username'";
    $result = mysqli_query($connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        return false;
    }
    return true;
}

function insertAccount($connect, $fullname, $phone, $birthday, $username, $password)
{
    require "./userDao.php";
    if (checkUsername($connect, $username)) {
        $checkUser = InsertUser($connect, $fullname, $phone, $birthday);
        if ($checkUser) {
            $id = getLastId($connect);
            $sql = "INSERT INTO ACCOUNTS (ID_AUTHORIZE, ID_USER, USERNAME, PASS_WORD)
                VALUES (2, $id, '$username', '$password')";
            return mysqli_query($connect, $sql);
        }
    }
    return 0;
}

function getAccount($connect)
{
    session_start();
    if (isset($_SESSION["accountCurrent"])) {

        echo json_encode($_SESSION["accountCurrent"]);
    } else {
        echo 0;
    }
}
function insertAccountAuthor($connect, $account)
{
    // if (checkUsername($connect, $username)) {
    //     $checkUser = InsertUser($connect)
    // }
    echo print_r($account);
}

if ($_GET["type"] == 1) {
    echo checkLogin($connect, $_POST["username"], $_POST["password"]);
} else if ($_GET["type"] == 2) {
    echo checkAccountExist();
} else if ($_GET["type"] == 3) {
    echo removeAccountExist();
} else if ($_GET["type"] == 4) {
    echo insertAccount($connect, $_POST["fullname"], $_POST["phoneNumber"], $_POST["birthday"], $_POST["username"], $_POST["password"]);
} else if ($_GET["type"] == 5) {
    echo insertAccountAuthor($connect, $_POST["account"]);
} else if ($_GET["type"] == 100) {
    getAccount($connect);
} 