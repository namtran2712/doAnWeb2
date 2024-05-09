<?php
include 'database/connect.php';

session_start(); // Bắt đầu session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $accountId = $_POST['account_id'];
    $productId = $_POST['product_id'];
    $size = $_POST['size'];

    $sql="SELECT * 
    FROM CART 
    WHERE ID_ACCOUNT=$idAccount";
    $result=mysqli_query($connect,$sql);
    if(mysqli_num_rows($result)>0)
    {
        $row=mysqli_fetch_assoc($result);
        $cartId=$row['ID_CART'];
    }
    // Lặp qua sản phẩm trong giỏ hàng và xóa sản phẩm có productId tương ứng
    foreach ($_SESSION['cart'] as $key => $item) {
        if ($item['product_id'] == $productId) {
            unset($_SESSION['cart'][$key]);
            break;
        }
    }
    // Chuẩn bị câu truy vấn SQL để lấy thông tin sản phẩm từ bảng particular_cart và particular_products
    $query = "SELECT pc.ID_PRODUCT, pc.SIZE, pc.QUANTITY, pp.PRICE
                FROM particular_cart pc
                JOIN particular_products pp ON pc.ID_PRODUCT = pp.ID_PRODUCT AND pc.SIZE = pp.SIZE
                WHERE pc.ID_CART IN (
                    SELECT ID_CART FROM cart WHERE ID_ACCOUNT = '$accountId'
                ) AND pc.ID_PRODUCT = '$productId' AND pc.SIZE = '$size'";

    // Thực hiện truy vấn để lấy thông tin sản phẩm từ bảng particular_cart và particular_products
    $result = $connect->query($query);

    $price_row = 0;
    // Kiểm tra xem truy vấn có thành công không
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $price_row = $row['PRICE'] * $row['QUANTITY'];

            // Thực hiện truy vấn UPDATE để cập nhật giá trị TOTAL_PRICE_CART trong bảng cart
            $updateQuery = "UPDATE cart SET TOTAL_PRICE_CART = TOTAL_PRICE_CART - $price_row WHERE ID_ACCOUNT = '$accountId'";
            $connect->query($updateQuery);

            // Thực hiện truy vấn DELETE để xóa sản phẩm khỏi bảng particular_cart
            $deleteQuery = "DELETE FROM particular_cart WHERE ID_CART = $cartId AND ID_PRODUCT = '$productId' AND SIZE = '$size'";
            $connect->query($deleteQuery);
        }
        // Thông báo xóa sản phẩm thành công
        echo "Xóa sản phẩm khỏi giỏ hàng thành công!";
    } else {
        // Hiển thị thông báo nếu truy vấn không thành công
        echo "Lỗi khi lấy thông tin sản phẩm: " . $connect->error;
    }
} else {
    echo "Lỗi: Yêu cầu không hợp lệ!";
}
$connect->close();
