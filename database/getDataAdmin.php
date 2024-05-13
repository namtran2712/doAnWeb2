<?php

    require "connect.php";

    function getPage($id, $table, $connect,$userType,$search) {
        $items = $_GET["item"];
        $idTmp = $table . "." . $id;
        $sql = "SELECT COUNT($idTmp)
        FROM $table";
        if ($table == "USERS") {
            if ($userType == "Nhân viên") {
                $sql = $sql . " JOIN ACCOUNTS
                ON ACCOUNTS.ID_USER = USERS.ID_USER
                WHERE ID_AUTHORIZE <> 1 AND FULLNAME like '%$search%' ";
            }
            else {
                $sql = $sql . " JOIN ACCOUNTS
                ON ACCOUNTS.ID_USER = USERS.ID_USER
                WHERE ID_AUTHORIZE = 1 AND FULLNAME like '%$search%'";
            }
        }
        elseif($table=="PRODUCTS")
        {
            $sql = $sql . " WHERE PRODDUCT_NAME like '%$search%' ";
        }
        elseif($table=="ACCOUNTS")
        {
            $sql = $sql . " WHERE USERNAME like '%$search%' ";
        }
        // echo $sql;
        $result = mysqli_query($connect, $sql);
        // echo print_r($result);
        $totalItem = (int) mysqli_fetch_array($result)[0];
        $totalPage = ceil($totalItem/$items);
        echo json_encode($totalPage);
    }

    function loadUser ($userType, $connect) {
        session_start();
        if (isset($_SESSION["accountCurrent"])) {
            $id = $_SESSION["accountCurrent"]["idUser"];
            if ($userType == "Khách hàng") {
                $currentPage = $_GET['page'];
                $item = $_GET['item'];
                $offset = ($currentPage-1)*$item;
                $search=$_GET['search'];
                $arrSearch=explode(" ", $search);
                $sql = "SELECT * 
                FROM USERS JOIN ACCOUNTS 
                ON USERS.ID_USER = ACCOUNTS.ID_USER
                WHERE ID_AUTHORIZE = 1 ";

                foreach ($arrSearch as $key => $value) {
                        $sql=$sql . " AND FULLNAME like '%$value%' ";
                }
                $sql=$sql. "LIMIT $offset, $item";
                // echo $sql;
                $result = mysqli_query($connect, $sql);
                $users = [];
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $users[] = $row;
                    }
                }
                echo json_encode($users);
            }
            else {
                $currentPage = $_GET['page'];
                $item = $_GET['item'];
                $offset = ($currentPage-1)*$item;
                $search=$_GET['search'];
                $arrSearch=explode(" ", $search);
                $sql = "SELECT * 
                FROM USERS JOIN ACCOUNTS 
                ON USERS.ID_USER = ACCOUNTS.ID_USER
                WHERE ID_AUTHORIZE <> 1
                AND USERS.ID_USER <> $id ";
                foreach ($arrSearch as $key => $value) {
                    $sql=$sql . " AND FULLNAME like '%$value%' ";
                }
                $sql=$sql. "LIMIT $offset, $item";
                $result = mysqli_query($connect, $sql);
                $users = [];
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $users[] = $row;
                    }
                }
                echo json_encode($users);
            }
        }
    }

    function loadAccount ($connect) {
        session_start();
        if (isset($_SESSION["accountCurrent"])) {
            $id = $_SESSION["accountCurrent"]["idAccount"];
            $search=$_GET['search'];
            $arrSearch=explode(" ", $search);
            $sql = "SELECT *
            FROM accounts JOIN authorizes
            ON accounts.ID_AUTHORIZE = authorizes.ID_AUTHORIZE
            JOIN users ON accounts.ID_USER = users.ID_USER WHERE STATUS_ACCOUNT <> 2
            AND accounts.ID_ACCOUNT <> $id ";
            foreach ($arrSearch as $key => $value) {
                $sql=$sql . " AND FULLNAME like '%$value%' ";
            }
            $result = mysqli_query($connect, $sql);
            $accounts = [];
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $accounts[] = $row;
                }
            }
            echo json_encode($accounts);
        }
    }
    function loadReceipt ($connect) {
        $sql = "SELECT *
        FROM RECEIPTS JOIN ACCOUNTS
        ON RECEIPTS.ID_STAFF = ACCOUNTS.ID_ACCOUNT
        JOIN users ON accounts.ID_USER = users.ID_USER";
        $result = mysqli_query($connect, $sql);
        $receipts = [];
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $receipts[] = $row;
            }
        }
        echo json_encode($receipts);
    }
    function loadAuthorize ($connect) {
        $search=$_GET['search'];
        $arrSearch=explode(" ", $search);
        $sql = "SELECT *
        FROM AUTHORIZES 
        WHERE AUTHORIZE_NAME <> 'Khách hàng' ";
        foreach ($arrSearch as $key => $value) {
            $sql=$sql . " AND AUTHORIZE_NAME like '%$value%' ";
        }
        $result = mysqli_query($connect, $sql);
        $receipts = [];
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $receipts[] = $row;
            }
        }
        echo json_encode($receipts);
    }

    $type = $_GET["type"];

    if ($type == "thongKe") {
        echo 1;
    }
    if ($type == "countPage") {
        if ($_GET["loai"] == "sanPham") {
            getPage("ID_PRODUCT","PRODUCTS",$connect,"",$_GET["search"]);
        }
        else if ($_GET["loai"] == "khachHang") {
            getPage("ID_USER","USERS",$connect,"Khách hàng",$_GET["search"]);
        }
        else if ($_GET["loai"] == "nhanVien") {
            getPage("ID_USER","USERS",$connect,"Nhân viên",$_GET["search"]);
        }
        else if ($_GET["loai"] == "taiKhoan") {
            getPage("ID_ACCOUNT","ACCOUNTS",$connect,"",$_GET["search"]);
        }
        // else if ($_GET["loai"] == "hoaDon") {
        //     getPage("ID_BILL","BILLS",$connect,"");
        // }
    }
    else if ($type == "sanPham") {
        $currentPage = $_GET['page'];
        $item = $_GET['item'];
        $search=$_GET['search'];
        $arrSearch=explode(" ", $search);
        $offset = ($currentPage-1)*$item;
        $sql = "SELECT * 
        FROM PRODUCTS JOIN MATERIAL ON PRODUCTS.ID_MATERIAL = MATERIAL.ID_MATERIAL 
        JOIN CATEGORY ON PRODUCTS.ID_CATEGORY = CATEGORY.ID_CATEGORY  
        WHERE ";
        foreach ($arrSearch as $key => $value) {
            if($key==0)
            {
                $sql=$sql . " PRODUCT_NAME like '%$value%' ";
            }
            else
            {
                $sql=$sql . " AND PRODUCT_NAME like '%$value%' ";
            }
        }
        $sql=$sql. "LIMIT $offset, $item";

        $result = mysqli_query($connect,$sql);

        if (mysqli_num_rows($result) > 0) {
            $product = [];
            $particularProduct = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $product[] = $row;
            }

            foreach ($product as $key => $value) {
                $sql = "SELECT * 
                FROM PARTICULAR_PRODUCTS 
                WHERE ID_PRODUCT = $value[ID_PRODUCT]";

                // echo $value['ID_PRODUCT'];
                
                $result = mysqli_query($connect,$sql);
                while ($row = mysqli_fetch_assoc($result)) {
                    $particularProduct[] = $row;
                }
            }
            // echo $currentPage . " " . $item . " " . $offset;
            $total = [
                "product" => $product,
                "particular" => $particularProduct
            ];
            // echo print_r($total);
        }
        echo json_encode($total);
    }
    else if ($type == "khachHang") {
        loadUser("Khách hàng", $connect,);
    }
    else if ($type == "nhanVien") {
        loadUser("Nhân viên", $connect,);
    }
    else if ($type == "taiKhoan") {
        loadAccount ($connect,);
    }
    else if ($type == "phieuNhap") {
        loadReceipt ($connect);
    }
    elseif ($type=="phanQuyen")
    {
        loadAuthorize($connect);
    }

?>