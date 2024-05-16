<?php
session_start();

if (!empty($_SESSION["serializedProduct"])) {
    $serializedProduct = $_SESSION["serializedProduct"];
    $product = unserialize($serializedProduct);

    $serializedSubImg = $_SESSION["subImg"];
    $sub_img = unserialize($serializedSubImg);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- boostrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

    <!-- font awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- css -->
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/detailProduct.css">
    <link rel="stylesheet" href="./css/header.css">
    <link rel="stylesheet" href="css/login.css">
</head>

<body>
    <?php include "navbar.php" ?>

    <div class="modal fade my-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form action="">
                    <div class="modal-header">
                        <h5 class="text-animation text-gradient modal-title" id="myModalLabel">Đăng nhập</h5>
                    </div>

                    <div class="modal-body">

                    </div>

                    <div class="modal-footer">
                        <button class="btn-register btn btn-danger">Đăng kí</button>
                        <button class="login btn btn-primary">Đăng nhập</button>
                        <button class="register btn btn-primary">Đăng kí</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="container detail-product">
        <div class="show-detail-product row">
            <div class="show-img-product col-md-12 col-sm-12 col-lg-5">

                <div class="main-img">
                    <img src="<?php echo $product[0]["MAIN_IMAGE"] ?>" alt="" class="img-fluid">
                </div>


                <ul class="sub-img">
                    <?php foreach ($sub_img as $key => $value) { ?>

                    <li class="col-md-3 col-sm-3 col-lg-3">
                        <img src="<?php echo $value["LINK_IMAGE"] ?>" class="img-fluid" alt="">
                    </li>
                    <?php  } ?>
                </ul>
            </div>
            <div class="show-info-product col-md-12 col-sm-12 col-lg-7">
                <div class="title">
                    <h1><?php echo $product[0]["PRODUCT_NAME"] ?></h1>
                </div>
                <div class="rating">
                    <div class="star">

                        <?php
                            $idProduct = $product[0]["ID_PRODUCT"];
                            $sql = "SELECT STAR
                            FROM feedbacks
                            JOIN particular_bills ON feedbacks.ID_BILL = particular_bills.ID_BILL
                            JOIN products ON products.ID_PRODUCT = particular_bills.ID_PRODUCT
                            WHERE particular_bills.ID_PRODUCT = $idProduct";
                            $result = mysqli_query($connect, $sql);
                            if (mysqli_num_rows($result) > 0) {
                                while ($row = mysqli_fetch_assoc($result)) {
                                    $star = (int)$row["STAR"];
                                    for ($i = 1;$i <= $star;$i++) {
                                        echo '<i class="fa-solid fa-star"></i>';
                                    }
                                    for ($i = 1;$i <= 5-$star;$i++) {
                                        echo '<i class="fa-regular fa-star"></i>';
                                    }
                                }
                            }
                        ?>
                    </div>
                    <span>Đánh giá(
                        <span class="evaluate">
                            <?php
                                require ("./database/connect.php");
                                $idProduct = $product[0]["ID_PRODUCT"];
                                $sql = "SELECT COUNT(*)
                                FROM feedbacks JOIN particular_bills
                                ON feedbacks.ID_BILL = particular_bills.ID_BILL
                                WHERE particular_bills.ID_PRODUCT = $idProduct";
                                $result = mysqli_query($connect,$sql);
                                if (mysqli_num_rows($result) > 0) {
                                    while ($row = mysqli_fetch_assoc($result)) {
                                        echo $row["COUNT(*)"];
                                    }
                                }
                                else {
                                    echo 0;
                                }
                            ?>
                        </span>)
                    </span>

                    <span>Đã bán(<span class="quantity-sold"><?php echo $product[0]["QUANTITY_SOLD"] ?></span>)</span>

                    <span>Còn(<span class="quantity-sold"><?php echo $product[0]["QUANTITY_REMAIN"] ?></span>)</span>
                </div>
                <div class="price">
                    <div class="price-after">
                        <b><span><?php echo $product[0]["PRICE"] ?></span> đ</b>
                    </div>
                </div>
                <div class="endow">
                    <div class="title">
                        <span>Ưu đãi:</span>
                    </div>
                    <div class="decribe">
                        <p><i class="fa-brands fa-cc-paypal"></i>Giảm tới 500k khi thanh toán sử dụng mã ưu đãi
                            <span>thaySangdeptrai123</span>
                        </p>
                    </div>
                </div>
                <div class="size">
                    <span>Chọn kích cỡ:</span>
                    <div class="group-btn-size">
                        <?php foreach ($product as $key => $value) { ?>

                        <button class="btn-size"
                            data-price="<?php echo $value["PRICE"] ?>"><?php echo $value["SIZE"] ?></button>

                        <?php } ?>
                    </div>
                </div>
                <div class="add-product">
                    <div class="quantity-product">
                        <button class="decrease">-</button>
                        <input type="text" name="quantity" id="quantity" value="1" readonly>
                        <button class="increase">+</button>
                    </div>
                    <button class="btn btn-danger btn-sm buy-now">Mua ngay</button>
                </div>
            </div>
        </div>

        <div class="comment-product row">
            <div class="title">
                <span>Bình luận</span>
            </div>
            <div class="list-comment row">
                <div class="comment">
                    <?php
                        $idProduct = $product[0]["ID_PRODUCT"];
                        $sql = "SELECT *
                        FROM feedbacks JOIN particular_bills
                        ON feedbacks.ID_BILL = particular_bills.ID_BILL
                        JOIN accounts ON accounts.ID_ACCOUNT = feedbacks.ID_ACCOUNT
                        WHERE particular_bills.ID_PRODUCT = $idProduct";
                        $result = mysqli_query($connect, $sql);
                        if (mysqli_num_rows($result) > 0) {
                            $feedbacks = [];
                            while ($row = mysqli_fetch_assoc($result)) {
                            ?>

                    <div class="user-and-evaluate">
                        <span class="user"><?php echo $row["USERNAME"] ?></span>
                        <div class="star">
                            <?php
                                for ($i = 1;$i<=$row["STAR"];$i++) {
                                    echo '<i class="fa-solid fa-star"></i>';
                                }
                                for ($i = 1;$i <= 5-$row["STAR"];$i ++) {
                                    echo '<i class="fa-regular fa-star"></i>';      
                                }
                            ?>
                        </div>
                    </div>
                    <div class="content-product">
                        <p> <?php echo $row["CONTENT"] ?> </p>
                    </div>
                    <?php   
                            }
                        }
                        else {
                            echo "<span style='display: block;text-align: center;font-size: 20px'>Hiện không có bất cứ đánh giá nào về sản phẩm này</span>";
                        }
                        ?>
                </div>
            </div>
        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
        integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous">
    </script>

    <script src="./js/detailProduct.js"></script>
    <script src="./js/login.js"></script>
    <script src="./js/navmenu.js"></script>
</body>

</html>