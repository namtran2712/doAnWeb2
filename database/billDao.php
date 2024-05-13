<?php

    require ("./connect.php");

    function selectAll ($connect) {
        $sql = "SELECT *
        FROM BILLS
        JOIN ACCOUNTS
        ON BILLS.ID_CUSTOMER = ACCOUNTS.ID_ACCOUNT
        JOIN USERS
        ON ACCOUNTS.ID_USER = USERS.ID_USER
        WHERE STATUS_BILL_DELETE = 1";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            $bills = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $bills[] = $row;
            }
            echo json_encode($bills);
        }
    }

    function selectParticularBill ($connect, $id) {
        $sql = "SELECT *
        FROM PARTICULAR_BILLS JOIN PRODUCTS
        ON PARTICULAR_BILLS.ID_PRODUCT = PRODUCTS.ID_PRODUCT
        JOIN BILLS
        ON BILLS.ID_BILL = PARTICULAR_BILLS.ID_BILL
        JOIN ACCOUNTS
        ON ACCOUNTS.ID_ACCOUNT = BILLS.ID_CUSTOMER
        JOIN USERS
        ON USERS.ID_USER = ACCOUNTS.ID_USER
        WHERE PARTICULAR_BILLS.ID_BILL = $id";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            $ptBill = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $ptBill[] = $row;
            }
            return json_encode($ptBill);
        }
    }

    function getStatusBill ($connect, $id) {
        $sql = "SELECT STATUS_BILL
        FROM BILLS
        WHERE ID_BILL = $id";
        $result = mysqli_query($connect, $sql);
        return mysqli_fetch_assoc($result)["STATUS_BILL"];
    }

    function updateStatusBill ($connect,$id) {
        $sql = "UPDATE BILLS SET STATUS_BILL = STATUS_BILL + 1
        WHERE ID_BILL = $id";
        mysqli_query($connect, $sql);
        $status = getStatusBill($connect, $id);
        if ($status == 1) {
            session_start();
            if (isset($_SESSION["accountCurrent"])) {
                $idStaff = $_SESSION["accountCurrent"]["idAccount"];
                $sql = "UPDATE BILLS SET ID_STAFF = $idStaff
                WHERE ID_BILL = $id";
                return mysqli_query($connect, $sql);
            }
        }
    }
    
    function checkQuantity ($connect) {
        session_start();
        foreach ($_SESSION['cart'] as $key => $value) {
            $id=$value['product_id'];
            $quantity=$value['quantity'];
            $size=$value['size'];
            
            $sql="SELECT * FROM PARTICULAR_PRODUCTS
            WHERE ID_PRODUCT=$id AND SIZE=$size";
            $result=mysqli_query($connect,$sql);
            
            if(mysqli_num_rows($result)>0)
            {
                $pt=mysqli_fetch_assoc($result);
                if($pt["QUANTITY_REMAIN"]<$quantity)
                {
                    $sql="SELECT * FROM PRODUCTS
                    WHERE ID_PRODUCT=$id";
                    $result=mysqli_query($connect,$sql);
                    if(mysqli_num_rows($result)==1)
                    {
                        $product=mysqli_fetch_assoc($result);
                        return "Số lượng sản phẩm " .$product['PRODUCT_NAME']." trong kho hiện tại chỉ còn ".$pt['QUANTITY_REMAIN'];
                    }
                }
                }
        }
        return 1;
    }
    

    if ($_GET["type"] == 1) {
        selectAll($connect);
    }
    else if ($_GET["type"] == 2) {
        echo selectParticularBill($connect, $_GET["id-bill"]);
    }
    else if ($_GET["type"] == 3) {
        echo updateStatusBill($connect,$_GET["id"]);
    }
    else if ($_GET["type"] == 100) {
        echo checkQuantity($connect);
    }


?>