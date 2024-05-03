<?php
    include 'database/connect.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        $idAccount=$_POST['account_id'];
        $total=$_POST['total'];
        session_start(); // Bắt đầu session

        $sql="SELECT * 
        FROM CART 
        WHERE ID_ACCOUNT=$idAccount";
        $result=mysqli_query($connect,$sql);
        if(mysqli_num_rows($result)>0)
        {
            $row=mysqli_fetch_assoc($result);
            $cartId=$row['ID_CART'];
        }

        $sql="DELETE 
        FROM CART
        WHERE ID_CART=$cartId";
        mysqli_query($connect,$sql);    

        $sql="DELETE 
        FROM PARTICULAR_CART
        WHERE ID_CART=$cartId";
        mysqli_query($connect,$sql);

        $sql="SELECT MAX(ID_BILL) as max
        FROM BILLS";
        $result=mysqli_query($connect,$sql);
        if(mysqli_num_rows($result)>0)
        {
            $row=mysqli_fetch_assoc($result);
            $idBill=$row['max']+1;
        }
        else
        {
            $idBill=1; 
        }

        $sql="INSERT INTO BILLS(ID_BILL,ID_CUSTOMER,TOTAL_BILL,STATUS_BILL) 
        VALUES ($idBill,$idAccount,$total,0)";
        mysqli_query($connect,$sql);

        foreach ($_SESSION['cart'] as $key => $item) {
            $idProduct=$item['product_id'];
            $quantity=$item['quantity'];
            $size=$item['size'];
            $sql="INSERT INTO PARTICULAR_BILLS(ID_BILL,ID_PRODUCT,QUANTITY,SIZE)
            VALUES ($idBill,$idProduct,$quantity,$size)";
            mysqli_query($connect,$sql);
            unset($_SESSION['cart'][$key]);
        }
    }