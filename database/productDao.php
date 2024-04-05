<?php
include "./connect.php";

$type = $_GET["type"];
if ($type = "loadProduct") {
    $category = strtolower($_GET["category"]);
    $sql = "select * from products , category 
    where products.ID_CATEGORY = category.ID_CATEGORY And category.CATEGORY_NAME = '" . $category ."'";

    $result = mysqli_query($connect, $sql);
    $listProduct = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $listProduct[] = $row;
    }
    echo json_encode($listProduct);
}
