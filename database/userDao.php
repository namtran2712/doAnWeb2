<?php

require("./connect.php");

function InsertUser($connect, $name, $phone, $birthday)
{
    $sql = "SELECT *
        FROM USERS JOIN ACCOUNTS
        ON USERS.ID_USER = ACCOUNTS.ID_USER
        WHERE PHONE_NUMBER = '$phone'
        AND STATUS_ACCOUNT <> 2";
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
}
function getAddressUser($connect, $idUser)
{
    $sql = "SELECT * 
    FROM user_shipping_address adr , accounts 
    WHERE adr.ID_ACCOUNT =accounts.ID_Account and accounts.ID_Account = $idUser    
    ORDER BY STATUS_ADDRESS DESC";
    $result = mysqli_query($connect, $sql);
    $address = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $address[] = $row;
    }
    // echo print_r($address);
    echo json_encode($address);

}

function getCountAddress($connect, $idAccount){
    $sql = "SELECT COUNT(*)
    FROM user_shipping_address
    WHERE user_shipping_address.ID_ACCOUNT = $idAccount";
    $result = mysqli_query($connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        return (int)$row["COUNT(*)"];
    }
    
}

function insertAddress ($connect, $idAccount, $address) {
    $count = getCountAddress($connect, $idAccount);
    $status = ($count == 0) ? 1 : 0;
    $sql = "INSERT INTO user_shipping_address (ID_ACCOUNT, SHIPPING_ADDRESS, STATUS_ADDRESS)
    VALUES ($idAccount, '$address',$status)";
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

function setDefaultAddress ($connect, $idAddress) {
    session_start();
    if (isset($_SESSION["accountCurrent"])) {
        $idAcc = $_SESSION["accountCurrent"]["idAccount"];
        $sql = "UPDATE user_shipping_address SET STATUS_ADDRESS = 0
        WHERE ID_ACCOUNT = $idAcc";
        if (mysqli_query($connect, $sql)) {
            $sql = "UPDATE user_shipping_address SET STATUS_ADDRESS = 1
            WHERE ID_USER_SHIPPING_ADDRESS = $idAddress";
            return mysqli_query($connect, $sql);
        }
    }
}
function insertAddressLevelUp($connect,$address)
{
    $id= $_SESSION["accountCurrent"]["idAccount"];
    $count = getCountAddress($connect, $id);
    $status = ($count == 0) ? 1 : 0;
    $sql = "INSERT INTO user_shipping_address (ID_ACCOUNT, SHIPPING_ADDRESS, STATUS_ADDRESS)
    VALUES ($id, '$address',$status)";
    return mysqli_query($connect, $sql);
}

function getStaffLast ($connect) {
    $sql = "SELECT *
    FROM users
    WHERE ID_USER = (SELECT MAX(ID_USER) FROM users)";
    $result = mysqli_query($connect,$sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            return json_encode($row);
        }
    }
    return null;
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
else if ($_GET["type"]==100){
    echo insertAddressLevelUp($connect,$_GET["address"]);
}
else if ($_GET["type"] == 1) {
    echo setDefaultAddress($connect, $_GET["id"]);
}
else if ($_GET["type"] == 2) {
    echo getStaffLast($connect);
}