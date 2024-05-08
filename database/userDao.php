<?php

require("./connect.php");

function InsertUser($connect, $name, $phone, $birthday)
{
    $sql = "SELECT *
        FROM USERS
        WHERE PHONE_NUMBER = $phone";
    $result = mysqli_query($connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        return false;
    } else {
        $sql = "INSERT INTO USERS (FULLNAME, PHONE_NUMBER, BIRTHDAY)
            VALUES ('$name', '$phone', '$birthday')";
        return mysqli_query($connect, $sql);
    }
}

function getLastId($connect)
{
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

function getUserByID($connect, $id)
{
    $sql = "  SELECT *
    FROM accounts ,users 
    WHERE accounts.ID_USER =users.ID_USER AND users.ID_USER =$id;";
    $result = mysqli_query($connect, $sql);
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
    // print_r($result);
}
function getAddressUser($connect, $idUser)
{
    $sql = "        
    SELECT * 
    FROM user_shipping_address adr , accounts 
    WHERE adr.ID_ACCOUNT =accounts.ID_Account and accounts.ID_Account = $idUser    
    ";
    $result = mysqli_query($connect, $sql);
    $address = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $address[] = $row;
    }
    // echo print_r($address);
    echo json_encode($address);

}

function insertAddress($connect, $idUser, $address)
{
    $sql = "INSERT INTO user_shipping_address (ID_ACCOUNT,SHIPPING_ADDRESS)
    VALUES ($idUser,'$address')";
    return mysqli_query($connect, $sql);
}


function removeAddress($connect, $idAddress)
{
    $sql = "DELETE FROM user_shipping_address WHERE ID_USER_SHIPPING_ADDRESS = $idAddress";
    return mysqli_query($connect, $sql);
}

 
function getAddressById ($connect ,$idAddress)
{
    $sql ="Select * from user_shipping_address where ID_USER_SHIPPING_ADDRESS = $idAddress";
    $result = mysqli_query($connect,$sql);
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
}
function editUser($connect, $idUser, $fullname, $phone)
{
    $sql = "
    UPDATE users 
    SET FULLNAME = '$fullname',  PHONE_NUMBER='$phone'
    WHERE users.ID_USER = $idUser
    ";
    return mysqli_query($connect,$sql);
}

function updateAddressUser ($connect,$idAddress,$address)
{
    $sql ="
        update user_shipping_address 
        set SHIPPING_ADDRESS ='$address'
        where ID_USER_SHIPPING_ADDRESS ='$idAddress'
    ";
    return mysqli_query($connect,$sql);
}

session_start();
if ($_GET["type"] == 200) {
    getUserByID($connect, $_SESSION["accountCurrent"]["idUser"]);
} else if ($_GET["type"] == 199) {
    echo insertAddress($connect, $_POST["idAccount"], $_POST["shipingAddress"]);
} else if ($_GET["type"] == 197) {
    getAddressUser($connect, $_GET["idAccount"]);
} else if ($_GET["type"] == 196) {
    echo removeAddress($connect, $_GET["idAddress"]);
}else if ($_GET["type"]==190){
    echo editUser($connect,$_SESSION["accountCurrent"]["idUser"],$_POST["fullname"],$_POST["phone"]);
}else if ($_GET["type"]==189){
    echo getAddressById($connect,$_GET["idAddress"]);
}else if ($_GET["type"]==188){
    echo updateAddressUser($connect,$_POST["idAddress"],$_POST["address"]);
}
