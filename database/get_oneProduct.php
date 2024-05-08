<?php
// Kết nối đến cơ sở dữ liệu
include 'connect.php';

// Kiểm tra xem yêu cầu có chứa tham số 'status' không
if (isset($_GET['idBill'])) {
    // Lấy giá trị của tham số 'status' từ yêu cầu
    $idBill = $_GET['idBill'];

    // Nếu mã hóa thành công, tiếp tục xử lý
    if ($idBill != 0) {
        $sql = "SELECT p.MAIN_IMAGE, p.PRODUCT_NAME, pp.PRICE, pb.SIZE, pb.QUANTITY
                FROM particular_bills pb
                INNER JOIN particular_products pp ON pb.ID_PRODUCT = pp.ID_PRODUCT AND pb.SIZE = pp.SIZE
                INNER JOIN products p ON pp.ID_PRODUCT = p.ID_PRODUCT
                WHERE pb.ID_BILL = '$idBill'
                LIMIT 10;";

        // Thực thi truy vấn SQL
        $result = mysqli_query($connect, $sql);

        // Kiểm tra xem có kết quả trả về không
        if ($result) {
            // Chuyển đổi kết quả thành mảng các dòng dữ liệu
            $productInfo = mysqli_fetch_all($result, MYSQLI_ASSOC);

            // Trả về dữ liệu dưới dạng JSON
            header('Content-Type: application/json');
            echo json_encode($productInfo);
        } else {
            // Trường hợp có lỗi khi thực thi truy vấn, trả về thông báo lỗi
            echo "Query execution failed";
        }
    } else {
        // Trường hợp không xác định được trạng thái đơn hàng, trả về thông báo lỗi
        echo "Invalid status parameter";
    }

    // Đóng kết nối đến cơ sở dữ liệu
    mysqli_close($connect);
} else {
    // Trường hợp không có tham số 'status' trong yêu cầu, trả về thông báo lỗi
    echo "No status parameter provided";
}
