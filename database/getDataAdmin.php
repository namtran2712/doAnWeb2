<?php

    require "connect.php";

    $type = $_GET["type"];

    if ($type == "thongKe") {
        echo 1;
    }
    else if ($type == "sanPham") {
        $currentPage = $_GET['page'];
        $item = $_GET['item'];
        $offset = ($currentPage-1)*$item;
        $sql = "SELECT * 
        FROM PRODUCTS JOIN MATERIAL ON PRODUCTS.ID_MATERIAL = MATERIAL.ID_MATERIAL 
        JOIN CATEGORY ON PRODUCTS.ID_CATEGORY = CATEGORY.ID_CATEGORY  
        LIMIT $offset, $item";

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
            echo json_encode($total);
        }
    }

?>