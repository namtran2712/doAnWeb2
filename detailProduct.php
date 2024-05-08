<?php
    session_start();

    if(!empty($_SESSION["serializedProduct"]))
    {
        $serializedProduct=$_SESSION["serializedProduct"];
        $product=unserialize($serializedProduct);

        $serializedSubImg=$_SESSION["subImg"];
        $sub_img=unserialize($serializedSubImg);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- boostrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

    <!-- font awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />


    <!-- css -->
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/detailProduct.css">
</head>
<body>
    <?php include ("navbar.php")?>
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
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <span>Đánh giá(<span class="evaluate">1000</span>)</span>
                    
                    <span>Đã bán(<span class="quantity-sold"><?php echo $product[0]["QUANTITY_SOLD"] ?></span>)</span>

                    <span>Còn(<span class="quantity-sold"><?php echo $product[0]["QUANTITY_REMAIN"] ?></span>)</span>
                </div>
                <div class="price">
                    <div class="price-after">
                        <b><span><?php echo $product[0]["PRICE"] ?></span> đ</b>
                    </div>
                    <!-- <div class="price-before">
                        <b style="text-decoration: line-through;color:grey;">2.999.000 đ</b>
                    </div> -->
                </div>
                <div class="endow">
                    <div class="title">
                        <span>Ưu đãi:</span>
                    </div>
                    <div class="decribe">
                        <p><i class="fa-brands fa-cc-paypal"></i>Giảm tới 500k khi thanh toán sử dụng mã ưu đãi <span>thaySangdeptrai123</span></p>
                    </div>
                </div>
                <div class="size">
                    <span>Chọn kích cỡ:</span>
                    <div class="group-btn-size">
                        <?php  foreach ($product as $key => $value) { ?>

                        <button class="btn-size" data-price="<?php echo $value["PRICE"] ?>"><?php echo $value["SIZE"] ?></button>

                        <?php }?>
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
                    <div class="user-and-evaluate">
                        <span class="user">ABCDEFJ</span>
                        <div class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div class="content-product">
                        <p>loremloeads;lfasdlkfjsadlkfjsaldk;fjlasjflsdajfl;asdjfhasdkfjsldkjfahdjkfaeuhdglkjerahgkdvjsoido</p>
                    </div>
                </div>
                <div class="comment">
                    <div class="user-and-evaluate">
                        <span class="user">ABCDEFJ</span>
                        <div class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div class="content-product">
                        <p>loremloeads;lfasdlkfjsadlkfjsaldk;fjlasjflsdajfl;asdjfhasdkfjsldkjfahdjkfaeuhdglkjerahgkdvjsoido</p>
                    </div>
                </div>
                <div class="comment">   
                    <div class="user-and-evaluate">
                        <span class="user">ABCDEFJ</span>
                        <div class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div class="content-product">
                        <p>loremloeads;lfasdlkfjsadlkfjsaldk;fjlasjflsdajfl;asdjfhasdkfjsldkjfahdjkfaeuhdglkjerahgkdvjsoido</p>
                    </div>
                </div>
            </div>  
        </div>

    </div>

    <script src="./js/detailProduct.js"></script>
</body>
</html>