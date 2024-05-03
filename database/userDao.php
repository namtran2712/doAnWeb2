<?php

    require ("./connect.php");

    function InsertUser ($connect, $name, $phone, $birthday) {
        $sql = "SELECT *
        FROM USERS
        WHERE PHONE_NUMBER = $phone";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            return false;
        }
        else {
            $sql = "INSERT INTO USERS (FULLNAME, PHONE_NUMBER, BIRTHDAY)
            VALUES ('$name', '$phone', '$birthday')";
            return mysqli_query($connect, $sql);
        }
    }

    function getLastId ($connect) {
        $sql = "SELECT id_user
        FROM users
        ORDER BY id_user DESC
        LIMIT 1";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            $id = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $id[] = $row;
            }
            return $id[0]["id_user"];
        }
    }

?>