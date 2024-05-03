<?php

require "connect.php";

$fp=fopen("daychuyen.txt",'r');

while(!feof($fp))
{

    $data = fgets($fp);
    $data = explode(",",$data);

    $ID_PRODUCT = (int) $data[0];
    $ID_CATEGORY = (int) $data[1];
    $ID_MATERIAL = (int) $data[2];
    $PRODUCT_NAME = $data[3];
    $QUANTITY_SUB_IMAGE = (int) $data[4];
    $MAIN_IMAGE = $data[5];
    $QUANTITY_SOLD = random_int(1,100);
    $sql = "INSERT INTO PRODUCTS (ID_PRODUCT, ID_CATEGORY, ID_MATERIAL, PRODUCT_NAME, QUANTITY_SUB_IMAGE, MAIN_IMAGE, QUANTITY_SOLD) 
    VALUES ($ID_PRODUCT,$ID_CATEGORY, $ID_MATERIAL, '$PRODUCT_NAME', $QUANTITY_SUB_IMAGE, '$MAIN_IMAGE', $QUANTITY_SOLD)";

    // die($sql);

    mysqli_query($connect, $sql);
    
    $data= fgets($fp);
    $price = (int) str_replace(",","",$data);
    echo $price . "<br>";
    
    for ($i=0; $i < 3; $i++) { 
        $size = 40 + 2*$i;
        $price = $price *((100+5*$i)/100);
        $QUANTITY_REMAIN = random_int(1,100);
        $sql = "INSERT INTO PARTICULAR_PRODUCTS (ID_PRODUCT, SIZE, PRICE, QUANTITY_REMAIN) 
        VALUES ($ID_PRODUCT, $size, $price, $QUANTITY_REMAIN)";
        // die ($sql);
        mysqli_query($connect, $sql);
    }

    for ($i = 1;$i <= $QUANTITY_SUB_IMAGE; $i++) 
    {
        $str = "./img/daychuyen/img-" . $ID_PRODUCT . "-" . $i . ".png";
        $sql = "INSERT INTO IMAGES (ID_PRODUCT, LINK_IMAGE) 
        VALUES ($ID_PRODUCT, '$str')";

        mysqli_query($connect, $sql);
    }
}
fclose($fp);

$fp=fopen("nhan.txt",'r');

while(!feof($fp))
{

    $data = fgets($fp);
    $data = explode(",",$data);

    $ID_PRODUCT = (int) $data[0];
    $ID_CATEGORY = (int) $data[1];
    $ID_MATERIAL = (int) $data[2];
    $PRODUCT_NAME = $data[3];
    $QUANTITY_SUB_IMAGE = (int) $data[4];
    $MAIN_IMAGE = $data[5];
    $QUANTITY_SOLD = random_int(1,100);
    $sql = "INSERT INTO PRODUCTS (ID_PRODUCT, ID_CATEGORY, ID_MATERIAL, PRODUCT_NAME, QUANTITY_SUB_IMAGE, MAIN_IMAGE, QUANTITY_SOLD) 
    VALUES ($ID_PRODUCT,$ID_CATEGORY, $ID_MATERIAL, '$PRODUCT_NAME', $QUANTITY_SUB_IMAGE, '$MAIN_IMAGE', $QUANTITY_SOLD)";

    // die($sql);

    mysqli_query($connect, $sql);
    
    $data= fgets($fp);
    $price = (int) str_replace(",","",$data);
    echo $price . "<br>";
    
    for ($i=0; $i < 3; $i++) { 
        $size = 6 + 1*$i;
        $price = $price *((100+5*$i)/100);
        $QUANTITY_REMAIN = random_int(1,100);
        $sql = "INSERT INTO PARTICULAR_PRODUCTS (ID_PRODUCT, SIZE, PRICE, QUANTITY_REMAIN) 
        VALUES ($ID_PRODUCT, $size, $price, $QUANTITY_REMAIN)";
        // die ($sql);
        mysqli_query($connect, $sql);
    }

    for ($i = 1;$i <= $QUANTITY_SUB_IMAGE; $i++) 
    {
        $str = "./img/nhan/img-" . $ID_PRODUCT . "-" . $i . ".png";
        $sql = "INSERT INTO IMAGES (ID_PRODUCT, LINK_IMAGE) 
        VALUES ($ID_PRODUCT, '$str')";

        mysqli_query($connect, $sql);
    }
}
fclose($fp);

$fp=fopen("kieng.txt",'r');

while(!feof($fp))
{

    $data = fgets($fp);
    $data = explode(",",$data);

    $ID_PRODUCT = (int) $data[0];
    $ID_CATEGORY = (int) $data[1];
    $ID_MATERIAL = (int) $data[2];
    $PRODUCT_NAME = $data[3];
    $QUANTITY_SUB_IMAGE = (int) $data[4];
    $MAIN_IMAGE = $data[5];
    $QUANTITY_SOLD = random_int(1,100);
    $sql = "INSERT INTO PRODUCTS (ID_PRODUCT, ID_CATEGORY, ID_MATERIAL, PRODUCT_NAME, QUANTITY_SUB_IMAGE, MAIN_IMAGE, QUANTITY_SOLD) 
    VALUES ($ID_PRODUCT,$ID_CATEGORY, $ID_MATERIAL, '$PRODUCT_NAME', $QUANTITY_SUB_IMAGE, '$MAIN_IMAGE', $QUANTITY_SOLD)";

    // die($sql);

    mysqli_query($connect, $sql);
    
    $data= fgets($fp);
    $price = (int) str_replace(",","",$data);
    echo $price . "<br>";
    
    for ($i=0; $i < 3; $i++) { 
        $size = 16 + 1*$i;
        $price = $price *((100+5*$i)/100);
        $QUANTITY_REMAIN = random_int(1,100);
        $sql = "INSERT INTO PARTICULAR_PRODUCTS (ID_PRODUCT, SIZE, PRICE, QUANTITY_REMAIN) 
        VALUES ($ID_PRODUCT, $size, $price, $QUANTITY_REMAIN)";
        // die ($sql);
        mysqli_query($connect, $sql);
    }

    for ($i = 1;$i <= $QUANTITY_SUB_IMAGE; $i++) 
    {
        $str = "./img/kieng/img-" . $ID_PRODUCT . "-" . $i . ".png";
        $sql = "INSERT INTO IMAGES (ID_PRODUCT, LINK_IMAGE) 
        VALUES ($ID_PRODUCT, '$str')";

        mysqli_query($connect, $sql);
    }
}
fclose($fp);

$fp=fopen("vongtay.txt",'r');

while(!feof($fp))
{
    $data = fgets($fp);
    $data = explode(",",$data);

    $ID_PRODUCT = (int) $data[0];
    $ID_CATEGORY = (int) $data[1];
    $ID_MATERIAL = (int) $data[2];
    $PRODUCT_NAME = $data[3];
    $QUANTITY_SUB_IMAGE = (int) $data[4];
    $MAIN_IMAGE = $data[5];
    $QUANTITY_SOLD = random_int(1,100);
    $sql = "INSERT INTO PRODUCTS (ID_PRODUCT, ID_CATEGORY, ID_MATERIAL, PRODUCT_NAME, QUANTITY_SUB_IMAGE, MAIN_IMAGE, QUANTITY_SOLD) 
    VALUES ($ID_PRODUCT,$ID_CATEGORY, $ID_MATERIAL, '$PRODUCT_NAME', $QUANTITY_SUB_IMAGE, '$MAIN_IMAGE', $QUANTITY_SOLD)";

    // die($sql);

    mysqli_query($connect, $sql);
    
    $data= fgets($fp);
    $price = (int) str_replace(",","",$data);
    echo $price . "<br>";
    
    for ($i=0; $i < 3; $i++) { 
        $size = 16 + 2*$i;
        $price = $price *((100+5*$i)/100);
        $QUANTITY_REMAIN = random_int(1,100);
        $sql = "INSERT INTO PARTICULAR_PRODUCTS (ID_PRODUCT, SIZE, PRICE, QUANTITY_REMAIN) 
        VALUES ($ID_PRODUCT, $size, $price, $QUANTITY_REMAIN)";
        // die ($sql);
        mysqli_query($connect, $sql);
    }

    for ($i = 1;$i <= $QUANTITY_SUB_IMAGE; $i++) 
    {
        $str = "./img/vongtay/img-" . $ID_PRODUCT . "-" . $i . ".png";
        $sql = "INSERT INTO IMAGES (ID_PRODUCT, LINK_IMAGE) 
        VALUES ($ID_PRODUCT, '$str')";

        mysqli_query($connect, $sql);
    }
}
fclose($fp);

$fp=fopen("bongtai.txt",'r');

while(!feof($fp))
{
    $data = fgets($fp);
    $data = explode(",",$data);

    $ID_PRODUCT = (int) $data[0];
    $ID_CATEGORY = (int) $data[1];
    $ID_MATERIAL = (int) $data[2];
    $PRODUCT_NAME = $data[3];
    $QUANTITY_SUB_IMAGE = (int) $data[4];
    $MAIN_IMAGE = $data[5];
    $QUANTITY_SOLD = random_int(1,100);
    $sql = "INSERT INTO PRODUCTS (ID_PRODUCT, ID_CATEGORY, ID_MATERIAL, PRODUCT_NAME, QUANTITY_SUB_IMAGE, MAIN_IMAGE, QUANTITY_SOLD) 
    VALUES ($ID_PRODUCT,$ID_CATEGORY, $ID_MATERIAL, '$PRODUCT_NAME', $QUANTITY_SUB_IMAGE, '$MAIN_IMAGE', $QUANTITY_SOLD)";

    // die($sql);

    mysqli_query($connect, $sql);
    
    $data= fgets($fp);
    $price = (int) str_replace(",","",$data);
    echo $price . "<br>";
    
    for ($i=0; $i < 3; $i++) { 
        $size = 17 + 1*$i;
        $price = $price *((100+5*$i)/100);
        $QUANTITY_REMAIN = random_int(1,100);
        $sql = "INSERT INTO PARTICULAR_PRODUCTS (ID_PRODUCT, SIZE, PRICE, QUANTITY_REMAIN) 
        VALUES ($ID_PRODUCT, $size, $price, $QUANTITY_REMAIN)";
        // die ($sql);
        mysqli_query($connect, $sql);
    }

    for ($i = 1;$i <= $QUANTITY_SUB_IMAGE; $i++) 
    {
        $str = "./img/bongtai/img-" . $ID_PRODUCT . "-" . $i . ".png";
        $sql = "INSERT INTO IMAGES (ID_PRODUCT, LINK_IMAGE) 
        VALUES ($ID_PRODUCT, '$str')";

        mysqli_query($connect, $sql);
    }
}
fclose($fp);

mysqli_close($connect);
