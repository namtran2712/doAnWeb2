
<?php
    require "connect.php";

    if(isset($_POST['id']))
    {
        $id=$_POST['id'];
        $name=$_POST['name'];
        $size=$_POST['size'];
        $price=$_POST['price'];
        $quantity=$_POST['quantity'];
        session_start();
        if(isset($_SESSION['receipt'][$id]))
        {
            $_SESSION['receipt'][$id]['quantity']+=$quantity;
        }
        else
        {
            $_SESSION['receipt'][$id]['name']=$name;
            $_SESSION['receipt'][$id]['size']=$size;
            $_SESSION['receipt'][$id]['price']=$price;
            $_SESSION['receipt'][$id]['quantity']=$quantity;
            $_SESSION['totalReceipt']+=$_SESSION['receipt'][$id]['price']*$_SESSION['receipt'][$id]['quantity'];
        }
    }
    $type=$_GET['type'];
    if($type=="listReceipt")
    {
        session_start();
        if(isset($_SESSION['receipt']))
        {
            echo json_encode($_SESSION['receipt']);
        }
        else
        {
            echo 0;
        }
    }
    elseif($type=="addReceipt")
    {
        session_start();
        if(isset($_SESSION['receipt']))
        {
            $total=$_SESSION['totalReceipt'];
            $idStaff=$_SESSION['accountCurrent']['idAccount'];
            $sql="SELECT MAX(ID_RECEIPT) AS max_id FROM RECEIPTS";
            $result=mysqli_query($connect,$sql);
            if(mysqli_num_rows($result)>0)
            {
                $idReceipt=mysqli_fetch_assoc($result);
            }
            $idReceipt=$idReceipt['max_id']+1;
            echo $idReceipt;
            $sql="INSERT INTO RECEIPTS (ID_RECEIPT,ID_STAFF,TOTAL_PRICE) VALUES ($idReceipt,$idStaff,$total)";
            mysqli_query($connect,$sql);

            foreach ($_SESSION['receipt'] as $key => $value) 
            {
                $quantity=$value['quantity'];
                $size=$value['size'];
                $price=$value['price'];
                $sql="INSERT INTO PARTICULAR_RECEIPTS (ID_RECEIPT,ID_PRODUCT,QUANTITY,PRICE,SIZE) 
                VALUES ($idReceipt,$key,$quantity,$price,$size)";
                mysqli_query($connect,$sql);
            }
            unset($_SESSION['receipt']);
            $_SESSION['totalReceipt']=0;
            echo 1;
        }
        else
        {
            echo 0;
        }
    }
    elseif($type=="deleteItem")
    {
        session_start();
        $id=$_GET['id'];
        if(count($_SESSION['receipt'])>1)
        {
            unset($_SESSION['receipt'][$id]);
        }
        else
        {
            unset($_SESSION['receipt']);
        }

    }


