<?php

    require ("./connect.php");

    function getProductById ($id, $connect) {
        $sql = "SELECT *
        FROM PRODUCTS JOIN PARTICULAR_PRODUCTS
        ON PRODUCTS.ID_PRODUCT = PARTICULAR_PRODUCTS.ID_PRODUCT
        WHERE PRODUCTS.ID_PRODUCT = $id";
        $result = mysqli_query($connect,$sql);
        if (mysqli_num_rows($result) > 0) {
            $product = null;
            while ($row = mysqli_fetch_assoc($result)) {
                $product = $row;
            }
            $sql = "SELECT *
            FROM PARTICULAR_PRODUCTS
            WHERE ID_PRODUCT = $id";
            $result = mysqli_query($connect,$sql);
            if (mysqli_num_rows($result) > 0) {
                $particularProduct=[];
                while ($row = mysqli_fetch_assoc($result)) {
                    $particularProduct[] = $row;
                }
            }
            $sql = "SELECT *
            FROM IMAGES
            WHERE ID_PRODUCT = $id";
            $result = mysqli_query($connect, $sql);
            if (mysqli_num_rows($result) > 0) {
                $img=[];
                while ($row = mysqli_fetch_assoc($result)) {
                    $img[] = $row;
                }
            }
            $total = [
                "product" => $product,
                "particular" => $particularProduct,
                "img" => $img
            ];
            echo json_encode($total);
        }
    }

    if ($_GET["type"]==1) {
        getProductById ($_GET["id"], $connect);
    }
?>