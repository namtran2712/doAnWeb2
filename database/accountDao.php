<?php

    require ("./connect.php");

    function checkLogin ($connect, $username, $password) {
        session_start();
        $sql = "SELECT *
        FROM ACCOUNTS
        WHERE USERNAME = '$username'
        AND PASS_WORD = '$password'";

        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            $sql = "SELECT *
            FROM ACCOUNTS
            WHERE USERNAME = '$username'
            AND PASS_WORD = '$password'
            AND STATUS_ACCOUNT = 1";
            $result = mysqli_query($connect, $sql);
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $_SESSION["accountCurrent"]["username"] = $row["USERNAME"];
                    $_SESSION["accountCurrent"]["idUser"] = $row["ID_USER"];
                    $_SESSION["accountCurrent"]["idAccount"] = $row["ID_ACCOUNT"];
                }
                $sql = "SELECT *
                FROM ACCOUNTS
                WHERE USERNAME = '$username'
                AND PASS_WORD = '$password'
                AND ID_AUTHORIZE = 1";
                $result = mysqli_query($connect, $sql);
                if (mysqli_num_rows($result) > 0) {
                    return 1;
                }
                else {
                    return 3;
                }
            }
            else {
                return 2;
            }
        }
        return 0;
    }

    function checkAccountExist () {
        session_start();
        if (isset($_SESSION["accountCurrent"])) {
            return true;
        }
        return false;
    }

    function removeAccountExist () {
        session_start();
        if (isset($_SESSION["accountCurrent"])) {
            unset($_SESSION["accountCurrent"]);
            return 1;
        }
        return 0;
    }

    function checkUsername ($connect, $username) {
        $sql = "SELECT *
        FROM ACCOUNTS
        WHERE USERNAME = '$username'";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            return false;
        }
        return true;
    }

    function insertAccount ($connect, $fullname, $phone, $birthday, $username, $password) {
        require "./userDao.php";
        if (checkUsername($connect, $username)) {
            $checkUser = InsertUser ($connect,$fullname,$phone,$birthday);
            if ($checkUser) {
                $id = getLastId($connect);
                $sql = "INSERT INTO ACCOUNTS (ID_AUTHORIZE, ID_USER, USERNAME, PASS_WORD)
                VALUES (1, $id, '$username', '$password')";
                return mysqli_query($connect, $sql);
            }
        }
        return 0;
    }

    function getAccount($connect)
    {
        session_start();
        if(isset( $_SESSION["accountCurrent"]))
        {
            echo json_encode( $_SESSION["accountCurrent"]);
        }
        else
        {
            echo 0;
        }
    }
    function selectAccountById ($connect, $id) {
        $sql = "SELECT *
        FROM ACCOUNTS
        WHERE ID_ACCOUNT = $id";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            $account = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $account[] = $row;
            }
        }
        return json_encode($account);
    }

    function selectUserByIdAccount ($connect, $id) {
        $sql = "SELECT *
        FROM USERS JOIN ACCOUNTS ON USERS.ID_USER = ACCOUNTS.ID_USER
        WHERE ACCOUNTS.ID_ACCOUNT = $id";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {

            while ($row = mysqli_fetch_assoc($result)) {
                return json_encode($row);
            }
        }
    }

    function updateAccount ($connect, $account) {
        echo print_r($account);
        $id = $account["id"];
        $password = $account["password"];
        $author = $account["author"];
        $status = $account["status"];
        $sql = "UPDATE ACCOUNTS
        SET ID_AUTHORIZE = $author,
        PASS_WORD = '$password',
        STATUS_ACCOUNT = $status
        WHERE ID_ACCOUNT = $id";
        return mysqli_query($connect, $sql);
    }
    function insertAccountAuthor ($connect, $account) {
        require "./userDao.php";
        if (checkUsername($connect, $account["username"])) {
            $checkUser = InsertUser($connect,$account["fullName"], $account["phoneNumber"],$account["birthday"]);
            if ($checkUser) {
                $author = $account["author"];
                $id = getLastId($connect);
                $username = $account["username"];
                $password = $account["password"];
                $sql = "
                INSERT INTO ACCOUNTS (ID_AUTHORIZE, ID_USER, USERNAME, PASS_WORD)
                VALUES ($author , $id, '$username', '$password')
                ";
                return mysqli_query($connect, $sql);
            }
        }
        return 0;
    }
    
    if ($_GET["type"] == 1) {
        echo checkLogin($connect, $_POST["username"], $_POST["password"]);
    }
    else if ($_GET["type"] == 2) {
        echo checkAccountExist();
    }
    else if ($_GET["type"] == 3) {
        echo removeAccountExist();
    }
    else if ($_GET["type"] == 4) {
        echo insertAccount($connect,$_POST["fullname"], $_POST["phoneNumber"],$_POST["birthday"], $_POST["username"], $_POST["password"]);
    }
    else if ($_GET["type"] == 5) {
        echo insertAccountAuthor($connect, $_POST["account"]);
    }
    else if ($_GET["type"] == 6) {
        echo selectAccountById($connect, $_POST["id"]);
    }
    else if ($_GET["type"] == 7) {
        echo updateAccount($connect, $_POST["account"]);
    }
    else if ($_GET["type"] == 8) {
        echo selectUserByIdAccount($connect, $_GET["id"]);
    }
    elseif($_GET["type"]==100)
    {
        getAccount($connect);
    }
    