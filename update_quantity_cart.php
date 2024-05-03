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

    // Kiểm tra xem session 'cart' đã tồn tại chưa
    if (isset($_SESSION['cart'])) {
        // Lặp qua các sản phẩm trong giỏ hàng để cập nhật thông tin sản phẩm
        foreach ($_SESSION['cart'] as $key => $item) {
            if ($key == $trId) {
                // Cập nhật thông tin sản phẩm
                $_SESSION['cart'][$key]['quantity'] = $quantity;
                $_SESSION['cart'][$key]['size'] = $size;
                $_SESSION['cart'][$key]['price'] = $price;
                break;
            }
        }
    }
    // Chuẩn bị câu truy vấn SQL để lấy thông tin sản phẩm từ bảng particular_cart và particular_products
    $query = "SELECT pc.ID_PRODUCT, pc.SIZE, pc.QUANTITY, pp.PRICE
                FROM particular_cart pc
                JOIN particular_products pp ON pc.ID_PRODUCT = pp.ID_PRODUCT AND pc.SIZE = pp.SIZE
                WHERE pc.ID_CART IN (
                    SELECT ID_CART FROM cart WHERE ID_ACCOUNT = '$account_id'
                ) AND pc.ID_PRODUCT = '$product_id' AND pc.SIZE = '$size'";

    // Thực hiện truy vấn để lấy thông tin sản phẩm từ bảng particular_cart và particular_products
    $result = $connect->query($query);
    $price_row = 0;
    $price = intval($price) * $quantity;
    // Kiểm tra xem truy vấn có thành công không
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $price_row = $row['PRICE'] * $row['QUANTITY'];

            var_dump($price);
            var_dump($price_row);

            // Thực hiện truy vấn UPDATE để cập nhật giá trị TOTAL_PRICE_CART trong bảng cart
            $updateQuery = "UPDATE cart SET TOTAL_PRICE_CART = TOTAL_PRICE_CART + $price - $price_row WHERE ID_ACCOUNT = '$account_id'";
            $connect->query($updateQuery);
            // Thực hiện truy vấn DELETE để xóa sản phẩm khỏi bảng particular_cart
            $updatePartCart = "UPDATE particular_cart SET QUANTITY = $quantity WHERE ID_PRODUCT = '$product_id' AND SIZE = '$size'";
            $connect->query($updatePartCart);
        }
    } else {
        // Hiển thị thông báo nếu truy vấn không thành công
        echo "Lỗi khi lấy thông tin sản phẩm: " . $connect->error;
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
