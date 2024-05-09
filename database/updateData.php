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
        else if ($table == "phieuNhap") {
            $sql = "DELETE FROM RECEIPTS WHERE ID_RECEIPT=";
            $i = 0;
            while (count($id) > $i) {
                $tmp = (int) $id[$i];
                mysqli_query($connect, $sql . $tmp);
                $i+=1;
                echo "Đã xóa receipts có id: " . $tmp . "<br>";
            }
        }
        else if ($table == "phanQuyen") {
            $sql = "DELETE FROM AUTHORIZES WHERE ID_AUTHORIZE=";
            $i = 0;
            while (count($id) > $i) {
                $tmp = (int) $id[$i];
                mysqli_query($connect, $sql . $tmp);
                $i+=1;
                echo "Đã xóa authorize có id: " . $tmp . "<br>";
            }
        }
        else if($table == "taiKhoan")
        {
            $sql="UPDATE ACCOUNTS SET STATUS_ACCOUNT =2 WHERE ID_ACCOUNT=";
            $i = 0;
            while (count($id) > $i) {
                $tmp = (int) $id[$i];
                mysqli_query($connect, $sql . $tmp);
                $i+=1;
                echo "Đã xóa account có id: " . $tmp . "<br>";
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
    function handleImage () {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_FILES['file'])) {
                $file = $_FILES['file'];
                $targetDir = "../imgNew/";
        
                $targetFilePath = $targetDir . basename($file['name']);
        
                if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
                    
                    echo substr ($targetFilePath,1, strlen($targetFilePath));
                } else {
                    echo "Failed to upload file.";
                }
            } else {
                echo "No file was sent.";
            }
        } else {
            echo "Invalid request method.";
        }
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
    elseif ($_GET["type"] == 1) {
        handleImage();
    }

?>