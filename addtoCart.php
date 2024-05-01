<?php
include 'database/connect.php';
// Kiểm tra xem request là POST hay không
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ AJAX
    $account_id = $_POST['account_id'];
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];
    $size = $_POST['size'];
    $price = $_POST['price'];

    // Lưu thông tin sản phẩm vào session 
    session_start();

    // // Xóa toàn bộ dữ liệu trong session 'cart' trước khi thêm sản phẩm mới
    // unset($_SESSION['cart']);

    $is_product_exist = false;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as &$item) {
            if ($item['product_id'] == $product_id && $item['size'] == $size) {
                // Cập nhật số lượng sản phẩm nếu đã tồn tại trong giỏ hàng
                $item['quantity'] += $quantity;
                $is_product_exist = true;
                break;
            }
        }
    }

    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
    if (!$is_product_exist) {
        $_SESSION['cart'][] = array(
            'account_id' => $account_id,
            'product_id' => $product_id,
            'quantity' => $quantity,
            'size' => $size,
            'price' => $price
        );
    }

    // người dùng đã đăng nhập, lưu cart vào DB
    if ($account_id != null) {
        addtoDB($account_id, $product_id, $size, $quantity, $price);
    }

    // Trả về thông báo thành công hoặc lỗi
    echo "Sản phẩm đã được thêm vào giỏ hàng!";
} else {
    // Trả về lỗi nếu request không phải là POST
    echo "Lỗi: Yêu cầu không hợp lệ!";
}
$connect->close();
function addtoDB($account_id, $product_id, $size, $quantity, $price)
{
    global $connect;
    // Khai báo biến $cart_id trước khi sử dụng
    $cart_id = null;

    // Kiểm tra xem account_id đã tồn tại trong bảng cart hay chưa
    $check_cart_query = "SELECT * FROM cart WHERE ID_ACCOUNT = '$account_id'";
    $check_cart_result = $connect->query($check_cart_query);

    if ($check_cart_result->num_rows > 0) {
        // Nếu cart_id đã tồn tại, lấy giá trị hiện tại của TOTAL_PRICE_CART và cập nhật
        // echo "AccountID tồn tại trong CDSL <br>";
        $cart_row = $check_cart_result->fetch_assoc();
        $current_total_price = $cart_row['TOTAL_PRICE_CART'];

        // Tính toán tổng giá trị mới
        $new_total_price = $current_total_price + $price;

        // Cập nhật giá trị của TOTAL_PRICE_CART
        $update_cart_query = "UPDATE cart SET TOTAL_PRICE_CART = '$new_total_price' WHERE ID_ACCOUNT = '$account_id'";
        if ($connect->query($update_cart_query) === TRUE) {
            // echo "Giá trị của TOTAL_PRICE_CART đã được cập nhật!";

            // Lấy cart_id từ kết quả truy vấn
            $cart_id = $cart_row['ID_CART'];

            addParticularCart($cart_id, $product_id, $size, $quantity);
        } else {
            echo "Lỗi: " . $connect->error;
        }
    } else {
        // echo "AccountID chưa tồn tại trong CDSL <br>";
        // Nếu cart_id chưa tồn tại, thêm mới cart và thêm mới các sản phẩm vào particular_cart với cart_id mới
        $insert_cart_query = "INSERT INTO cart (ID_ACCOUNT, TOTAL_PRICE_CART) VALUES ('$account_id', '$price')";
        if ($connect->query($insert_cart_query) === TRUE) {
            // Lấy ID mới được tạo ra
            $cart_id = $connect->insert_id;

            // Tiếp tục với việc thêm mới các sản phẩm vào particular_cart với cart_id mới ở đây
            addParticularCart($cart_id, $product_id, $size, $quantity);
        } else {
            echo "Lỗi: " . $connect->error;
        }
    }
}
function addParticularCart($cart_id, $product_id, $size, $quantity)
{
    global $connect; // Sử dụng biến kết nối ở phạm vi toàn cục

    // Kiểm tra trong bảng particular_cart có dòng nào có product_id và size như yêu cầu
    $check_particular_cart_query = "SELECT * FROM particular_cart WHERE ID_CART = '$cart_id' AND ID_PRODUCT = '$product_id' AND SIZE = '$size'";
    $check_particular_cart_result = $connect->query($check_particular_cart_query);

    if ($check_particular_cart_result->num_rows > 0) {
        // Đã tồn tại dòng trong particular_cart có product_id và size như yêu cầu, cập nhật số lượng
        $existing_row = $check_particular_cart_result->fetch_assoc();
        $existing_quantity = $existing_row['QUANTITY'];
        $new_quantity = $existing_quantity + $quantity;

        $update_particular_cart_query = "UPDATE particular_cart SET QUANTITY = '$new_quantity' WHERE ID_CART = '$cart_id' AND ID_PRODUCT = '$product_id' AND SIZE = '$size'";
        if ($connect->query($update_particular_cart_query) === TRUE) {
            // echo "Đã cập nhật số lượng trong particular_cart!";
        } else {
            echo "Lỗi khi cập nhật số lượng trong particular_cart: " . $connect->error;
        }
    } else {
        // Thêm thông tin sản phẩm vào bảng particular_cart
        $sql_particular_cart = "INSERT INTO particular_cart (ID_CART, ID_PRODUCT, QUANTITY, SIZE) VALUES ('$cart_id', '$product_id', '$quantity', '$size')";

        if ($connect->query($sql_particular_cart) === TRUE) {
            // echo "Sản phẩm đã được thêm vào bảng particular_cart!";
        } else {
            echo "Lỗi: " . $connect->error;
        }
    }
}
