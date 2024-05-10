<?php
    require "connect.php";

    function getById($connect,$id)
    {
        $sql = "SELECT *
        FROM PARTICULAR_RECEIPTS JOIN PRODUCTS
        ON PARTICULAR_RECEIPTS.ID_PRODUCT = PRODUCTS.ID_PRODUCT
        WHERE ID_RECEIPT = $id";
        $result = mysqli_query($connect,$sql);
        if (mysqli_num_rows($result) > 0) {
            $receipt=[];
            while ($row = mysqli_fetch_assoc($result)) {
                $receipt[] = $row;
            }
            echo json_encode($receipt);
        }
    }

    function getByIdFull($connect,$id)
    {
        $sql = "SELECT *
        FROM PARTICULAR_RECEIPTS JOIN PRODUCTS
        ON PARTICULAR_RECEIPTS.ID_PRODUCT = PRODUCTS.ID_PRODUCT
        WHERE ID_RECEIPT = $id";
        $result = mysqli_query($connect,$sql);
        if (mysqli_num_rows($result) > 0) {
            $receipt=[];
            while ($row = mysqli_fetch_assoc($result)) {
                $receipt[] = $row;
            }
            echo json_encode($receipt);
        }
    }

    if ($_GET["type"]==1) {
        getById ($connect,$_GET["id"]);
    }
    else if ($_GET['type'] == 2) {
        getByIdFull($connect, $_GET["id"]);
    }