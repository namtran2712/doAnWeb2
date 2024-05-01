<?php
session_start();

// Kiểm tra nếu session giỏ hàng không tồn tại, tạo mới
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

// Lấy thông tin sản phẩm từ yêu cầu AJAX
if (isset($_POST['product_id'])) {
    $product_id = $_POST['product_id'];

    // Thêm sản phẩm vào giỏ hàng (mảng session)
    $_SESSION['cart'][] = $product_id;

    // Trả về số lượng sản phẩm trong giỏ hàng (có thể trả về các thông tin khác nếu cần)
    echo count($_SESSION['cart']);
} else {
    // Trả về thông báo lỗi nếu không nhận được ID sản phẩm từ yêu cầu AJAX
    echo "Lỗi: Thiếu thông tin sản phẩm.";
}
?>
