<?php
include "./connect.php";

session_start();
function getTotalPage($connect, $items)
{
    if (isset($_SESSION["category"])) {
        if ($_SESSION["category"]["name"] == "sản phẩm") {
            $sql = "SELECT COUNT(ID_PRODUCT) 
            FROM PRODUCTS
            ";
        } else {
            $category = $_SESSION["category"]["name"];
            $sql = "SELECT COUNT(ID_PRODUCT) 
            FROM PRODUCTS JOIN CATEGORY
            On  PRODUCTS.ID_CATEGORY = CATEGORY.ID_CATEGORY
            where CATEGORY.CATEGORY_NAME = '$category'
            ";
        }
        $result = mysqli_query($connect, $sql);
        $totalProduct = (int) mysqli_fetch_array($result)[0];
        $totalPage = ceil($totalProduct / $items);
        echo json_encode($totalPage);
    }
}

function getProduct($connect, $items, $currentPage)
{
    if (isset($_SESSION["category"])) {
        $category = $_SESSION["category"]["name"];
        if ($category == "sản phẩm") {

            selectAll($connect, $items, $currentPage);
        } else {
            $offset = ($currentPage - 1) * $items;
            $sql = "SELECT DISTINCT PRODUCTS.ID_PRODUCT, PRODUCT_NAME, MAIN_IMAGE, PRICE 
        FROM PRODUCTS JOIN PARTICULAR_PRODUCTS ON PRODUCTS.ID_PRODUCT = PARTICULAR_PRODUCTS.ID_PRODUCT
        JOIN category ON  PRODUCTS.ID_CATEGORY = category.ID_CATEGORY
        WHERE PRICE <= ALL (
            SELECT PRICE
            FROM PARTICULAR_PRODUCTS
            WHERE PRODUCTS.ID_PRODUCT = PARTICULAR_PRODUCTS.ID_PRODUCT
        )
        AND category.CATEGORY_NAME = '$category' 
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
    }
}

function deleteProduct ($connect, $id) {
    $sql = "DELETE FROM PRODUCTS WHERE ID_PRODUCT = $id";
    return mysqli_query($connect, $sql);
}

function selectAll($connect, $items, $currentPage)
{
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

        echo json_encode($listProduct);
    }
}
function getProductById($id, $connect)
{
    $sql = "SELECT *
        FROM PRODUCTS JOIN PARTICULAR_PRODUCTS
        ON PRODUCTS.ID_PRODUCT = PARTICULAR_PRODUCTS.ID_PRODUCT
        WHERE PRODUCTS.ID_PRODUCT = $id";
    $result = mysqli_query($connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        $product = null;
        while ($row = mysqli_fetch_assoc($result)) {
            $product = $row;
        }
        $sql = "SELECT *
            FROM PARTICULAR_PRODUCTS
            WHERE ID_PRODUCT = $id";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            $particularProduct = [];
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
    function updateProduct ($connect, $product) {
        $delete = deleteProduct($connect, $product["id"]);
        $id = $product["id"];
        if ($delete) {
            $cate = $product["category"];
            $mate = $product["material"];
            $name = $product["name"];
            $mainImg = $product["mainImage"];
            $sold = $product["sold"];
            $subImg = $product["quantityImage"];
    
            $sql = "INSERT INTO PRODUCTS (ID_PRODUCT, ID_CATEGORY, ID_MATERIAL, PRODUCT_NAME, MAIN_IMAGE, QUANTITY_SOLD, QUANTITY_SUB_IMAGE)
            VALUES ($id, $cate, $mate, '$name', '$mainImg', $sold, $subImg)";
            $check = mysqli_query($connect, $sql);
    
            if ($check) {
                $size = $product["size"];
                $price = $product["price"];
                $remain = $product["remain"];
                $i = 0;
    
                while ($i < count($size)) {
                    $sizeTmp = $size[$i];
                    $remainTmp = $remain[$i];
                    $priceTmp = $price[$i];
                    $sql = "INSERT INTO PARTICULAR_PRODUCTS (ID_PRODUCT, SIZE, PRICE, QUANTITY_REMAIN)
                    VALUES ($id, $sizeTmp, $priceTmp, $remainTmp)";
                    mysqli_query($connect, $sql);
                    $i+=1;
                }
    
                $linkSub = $product["linkSub"];
                $i = 0;
    
                while ($i < count ($linkSub)) {
                    $link = $linkSub[$i];
                    $sql = "INSERT INTO IMAGES (ID_PRODUCT, LINK_IMAGE)
                    VALUES ($id, '$link')";
                    mysqli_query($connect, $sql);
                    $i+=1;
                }
                return 1;
            }
        }
        return 0;
    }
    
    function insertProduct ($connect, $product) {
        $cate = $product["category"];
        $mate = $product["material"];
        $name = $product["name"];
        $mainImg = $product["mainImage"];
        $sold = $product["sold"];
        $subImg = $product["quantityImage"];
    
        $sql = "INSERT INTO PRODUCTS (ID_CATEGORY, ID_MATERIAL, PRODUCT_NAME, MAIN_IMAGE, QUANTITY_SOLD, QUANTITY_SUB_IMAGE)
        VALUES ($cate, $mate, '$name', '$mainImg', $sold, $subImg)";
        $check = mysqli_query($connect, $sql);
    
        if ($check) {
            $id = getLastId($connect);
            $size = $product["size"];
            $price = $product["price"];
            $remain = $product["remain"];
            $i = 0;
    
            while ($i < count($size)) {
                $sizeTmp = $size[$i];
                $remainTmp = $remain[$i];
                $priceTmp = $price[$i];
                $sql = "INSERT INTO PARTICULAR_PRODUCTS (ID_PRODUCT, SIZE, PRICE, QUANTITY_REMAIN)
                VALUES ($id, $sizeTmp, $priceTmp, $remainTmp)";
                mysqli_query($connect, $sql);
                $i+=1;
            }
    
            $linkSub = $product["linkSub"];
            $i = 0;
    
            while ($i < count ($linkSub)) {
                $link = $linkSub[$i];
                $sql = "INSERT INTO IMAGES (ID_PRODUCT, LINK_IMAGE)
                VALUES ($id, '$link')";
                mysqli_query($connect, $sql);
                $i+=1;
            }
            return 1;
        }
    }

    if ($_GET["type"] == 0) {
        getTotalPage($connect, $_GET["items"]);
    }
    if ($_GET["type"] == 1) {
        getProductById($_GET["id"], $connect);
    }
    
    if ($_GET["type"] == 2) {
        getProduct($connect, $_GET["items"], $_GET["currentPage"]);
    }
    
    if ($_GET["type"] == 3) {
        selectAll($connect, $_GET["items"], $_GET["currentPage"]);
    }
    else if ($_GET["type"] == 4) {
        echo updateProduct ($connect, $_POST["product"]);
    }
    else if ($_GET["type"] == 5) {
        echo insertProduct($connect, $_POST["product"]);
    }
?>