<?php

    include "./connect.php";

    $type = $_GET["type"];
    
    if ($type == "countPage") {
        $items = $_GET["item"];
        $sql = "SELECT COUNT(ID_PRODUCT) 
        FROM PRODUCTS";
        $result = mysqli_query($connect, $sql);
        $totalProduct = (int) mysqli_fetch_array($result)[0];
        $totalPage = ceil($totalProduct/$items);
        echo json_encode($totalPage);
    }
    else if ($type == "loadData") {
        $items = $_GET["item"];
        $currentPage = $_GET["page"];
        $offset = ($currentPage - 1) * $items;
        $sql = "SELECT DISTINCT PRODUCTS.ID_PRODUCT, PRODUCT_NAME, MAIN_IMAGE, PRICE 
        FROM PRODUCTS JOIN PARTICULAR_PRODUCTS ON PRODUCTS.ID_PRODUCT = PARTICULAR_PRODUCTS.ID_PRODUCT 
        WHERE PRICE <= ALL (
            SELECT PRICE
            FROM PARTICULAR_PRODUCTS
            WHERE PRODUCTS.ID_PRODUCT = PARTICULAR_PRODUCTS.ID_PRODUCT
        )
        LIMIT $offset, $items";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            $listProduct = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $listProduct[] = $row;
            }
            
            // echo print_r($listProduct);

            echo json_encode($listProduct);
        }
    }
    elseif($type=="processDP")
    {
        $id=$_GET['id'];

        $sql="SELECT * 
        FROM PRODUCTS AS P JOIN PARTICULAR_PRODUCTS AS PP ON P.ID_PRODUCT = PP.ID_PRODUCT 
        WHERE P.ID_PRODUCT=$id";

        $result=mysqli_query($connect,$sql);
        if (mysqli_num_rows($result) > 0)
        {
            $product = [];
            while ($row = mysqli_fetch_assoc($result)) 
            {
                $product[] = $row;
            }

            $sql="SELECT *
            FROM IMAGES 
            WHERE ID_PRODUCT=$id";

            $result=mysqli_query($connect,$sql);
            $sub_img=[];
            while ($row = mysqli_fetch_assoc($result)) 
            {
                $sub_img[] = $row;
            }


            session_start();
            $serializedProduct= serialize($product);
            $serializedSubImg=serialize($sub_img);
            $_SESSION["serializedProduct"]=$serializedProduct;
            $_SESSION["subImg"]=$serializedSubImg;

        }
}

