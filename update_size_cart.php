<?php
include 'database/connect.php';

// Kiểm tra xem request là POST hay không
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy thông tin sản phẩm từ yêu cầu POST
    $account_id = $_POST['account_id'];
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];
    $size = $_POST['size'];
    $price = $_POST['price'];
    $trId = $_POST['trId'];

    // Khởi động hoặc sử dụng session đã tồn tại
    session_start();
    $count = 0;
    // Kiểm tra xem session 'cart' đã tồn tại chưa, nếu chưa, tạo mới
    if (isset($_SESSION['cart'])) {
        // Lặp qua các sản phẩm trong giỏ hàng để cập nhật thông tin sản phẩm
        foreach ($_SESSION['cart'] as $key => $item) {
            if ($item['product_id'] == $product_id) {
                if ($item['size'] == $size) {
                    $count += 1;
                }
            }
        }
        // size vừa thay đổi không trùng với hàng nào trong bảng partilular_cart
        if ($count == 0) {
            foreach ($_SESSION['cart'] as $key => $item) {
                if ($key == $trId) {
                    $lastsize = $_SESSION['cart'][$key]['size'];
                    $lastprice = intval($_SESSION['cart'][$key]['price']) * $_SESSION['cart'][$key]['quantity'];
                    $_SESSION['cart'][$key]['quantity'] = $quantity;
                    $_SESSION['cart'][$key]['size'] = $size;
                    $_SESSION['cart'][$key]['price'] = $price;

                    $query = "UPDATE particular_cart SET SIZE = $size WHERE ID_PRODUCT = '$product_id' AND SIZE = '$lastsize'";
                    $connect->query($query);
                    break;
                }
            }
        } else {
            $lastsize = $_SESSION['cart'][$trId]['size'];
            $lastprice = intval($_SESSION['cart'][$trId]['price']) * $_SESSION['cart'][$trId]['quantity'];
            $query = "DELETE FROM particular_cart WHERE ID_PRODUCT = '$product_id' AND SIZE = '$lastsize'";
            $connect->query($query);
            unset($_SESSION['cart'][$trId]);
            foreach ($_SESSION['cart'] as $key => $item) {
                if ($item['product_id'] == $product_id) {
                    $_SESSION['cart'][$key]['quantity'] = $quantity + $item['quantity'];
                    $_SESSION['cart'][$key]['size'] = $size;
                    $_SESSION['cart'][$key]['price'] = $price;
                    $quantityItem = $item['quantity'];
                    $query = "UPDATE particular_cart SET QUANTITY = $quantity + $quantityItem WHERE ID_PRODUCT = '$product_id' AND SIZE = '$size'";
                    $connect->query($query);
                    break;
                }
            }
        }
        var_dump(intval($lastprice));
        $updateQuery = "UPDATE cart SET TOTAL_PRICE_CART = TOTAL_PRICE_CART + ($price*$quantity) - $lastprice WHERE ID_ACCOUNT = '$account_id'";
        $connect->query($updateQuery);
    }
    // Trả về phản hồi thành công
    echo "Cập nhật giỏ hàng thành công!";
} else {
    // Trả về lỗi nếu request không phải là POST
    echo "Lỗi: Yêu cầu không hợp lệ!";
}
if (isset($_SESSION['cart'])) {
    // In ra thông tin chi tiết của session có khóa là "cart"
    $cart = $_SESSION['cart'];
    print_r($cart);
} else {
    echo "Không có session nào có khóa là 'cart' tồn tại.";
}
$connect->close();
