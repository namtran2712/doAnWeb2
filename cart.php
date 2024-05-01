<?php
session_start();

// Kiểm tra xem session giỏ hàng có tồn tại không
if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
    // Duyệt qua mảng $_SESSION['cart'] và hiển thị thông tin sản phẩm
    foreach ($_SESSION['cart'] as $product_id => $product) {
        // // In thông tin của từng sản phẩm
        // echo "Product ID: $product_id<br>";
        // foreach ($product as $key => $value) {
        //     echo " $key: $value <br>";
        // }
        // echo "<hr>"; // Thêm dòng ngăn cách giữa các sản phẩm
    }
} else {
    echo "Giỏ hàng của bạn đang trống.";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/shoping_cart.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Document</title>
</head>

<body>
    <div class="col-lg-12">
        <div class="shoping__cart__btns">
            <a href="#" class="primary-btn cart-btn">CONTINUE SHOPPING</a>
            <a href="#" class="primary-btn cart-btn cart-btn-right"><span class="icon_loading"></span>
                Upadate Cart</a>
        </div>
    </div>
    <section class="shoping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="shoping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th class="shoping__product">Products</th>
                                    <th>Price</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                require_once("database/connect.php");

                                // Kiểm tra xem có sản phẩm trong giỏ hàng hay không
                                if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
                                    // Lấy danh sách sản phẩm từ session giỏ hàng
                                    $cartProducts = $_SESSION['cart'];
                                    // Hiển thị danh sách sản phẩm trong giỏ hàng
                                    foreach ($cartProducts as $product_id) {
                                        // Truy vấn cơ sở dữ liệu để lấy thông tin sản phẩm
                                        $query = "SELECT * FROM products WHERE id_product = $product_id";
                                        $result = mysqli_query($connect, $query);

                                        if (mysqli_num_rows($result) > 0) {
                                            // Lặp qua mỗi hàng kết quả
                                            while ($row = mysqli_fetch_assoc($result)) {
                                                // Truy vấn cơ sở dữ liệu để lấy thông tin chi tiết sản phẩm
                                                $query = "SELECT * FROM particular_products WHERE id_product = $product_id";
                                                $result_CTSP = mysqli_query($connect, $query);
                                                // In ra thông tin sản phẩm trong định dạng HTML                                        
                                ?>
                                                <tr>
                                                    <td class="shoping__cart__item">
                                                        <div class="cart_item">
                                                            <img class="img_product" src="<?php echo $row['MAIN_IMAGE']; ?>" alt="">
                                                            <h5><?php echo $row['PRODUCT_NAME']; ?></h5>
                                                        </div>
                                                    </td>
                                                    <td class="shoping__cart__price">
                                                        <span id="selected_price_<?php echo $product_id; ?>"></span>
                                                    </td>
                                                    <td>
                                                        <select name="size_<?php echo $product_id; ?>" id="size_<?php echo $product_id; ?>">
                                                            <?php while ($row_CTSP = mysqli_fetch_assoc($result_CTSP)) : ?>
                                                                <option value="<?php echo $row_CTSP['SIZE']; ?>" data-price="<?php echo $row_CTSP['PRICE']; ?>">
                                                                    <?php echo $row_CTSP['SIZE']; ?>
                                                                </option>
                                                            <?php endwhile; ?>
                                                        </select>
                                                    </td>
                                                    <td class="shoping__cart__quantity">
                                                        <div class="cart-content_qty">
                                                            <div class="quantity">
                                                                <a href="" class="value-changer_increase">-</a>
                                                                <input type="text" value="1" min="1" class="value-changer_input">
                                                                <a href="" class="value-changer_increase">+</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="shoping__cart__total">
                                                        $<?php  ?>
                                                    </td>
                                                    <td class="shoping__cart__item__close">
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                                        </svg>
                                                    </td>
                                                </tr>
                                <?php

                                            }
                                        }
                                    }
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row">

                <div class="shoping__continue">
                    <div class="shoping__discount">
                        <h5>Discount Codes</h5>
                        <form action="#">
                            <input type="text" placeholder="Enter your coupon code">
                            <button type="submit" class="site-btn">APPLY COUPON</button>
                        </form>
                    </div>
                </div>
                <div class="shoping__checkout">
                    <h5>Cart Total</h5>
                    <ul>
                        <li>Subtotal <span>$149.99</span></li>
                        <li>Total <span>$149.99</span></li>
                    </ul>
                    <a href="#" class="primary-btn">PROCEED TO CHECKOUT</a>
                </div>
            </div>
        </div>
    </section>
</body>
<script>
    // Lắng nghe sự kiện thay đổi của dropdown
    $('select[name^="size_"]').change(function() {
        // Lấy giá từ thuộc tính data-price của tùy chọn đã chọn
        var selectedPrice = $(this).find('option:selected').data('price');
        // Cập nhật giá tương ứng
        var productId = $(this).attr('id').replace('size_', '');
        $('#selected_price_' + productId).text('$' + selectedPrice);
    });
</script>



</html>