<?php

    include ("./connect.php");

    function deleteData ($id, $table,$connect) {
        if ($table == "khachHang" || $table == "nhanVien") {
            $sql = "DELETE FROM USERS WHERE ID_USER=";
            $i = 0;
            while (count($id) > $i) {
                $tmp = (int) $id[$i];
                mysqli_query($connect, $sql . $tmp);
                $i+=1;
                // echo $sql . $tmp;
            }
        }
        elseif ($table == "sanPham") {
            $sql = "DELETE FROM PRODUCTS WHERE ID_PRODUCT=";
            $i = 0;
            while (count($id) > $i) {
                $tmp = (int) $id[$i];
                mysqli_query($connect, $sql . $tmp);
                $i+=1;
                echo "Đã xóa product có id: " . $tmp . "<br>";
            }
        }
    }
    function updateDataUser ($id,$user,$connect) {
        $fullname = $user['fullname'];
        $phone = $user['phoneNumber'];
        $birthday = $user['birthday'];
        $sql = "UPDATE USERS 
        SET FULLNAME = '$fullname',
        PHONE_NUMBER = '$phone',
        BIRTHDAY = '$birthday'
        WHERE ID_USER = $id";
        return mysqli_query($connect, $sql);
    }

    if ($_GET["type"] == "delete") {
        $id = $_POST["id"];
        $table = $_GET["table"];
        deleteData($id,$table,$connect);
    }
    elseif ($_GET["type"] == "update" && $_GET["category"] == "user") {
        $id = (int) $_POST["id"];
        $user = $_POST["user"];
        echo updateDataUser($id, $user,$connect);
    }

?>