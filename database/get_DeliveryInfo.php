<?php
// Kết nối đến cơ sở dữ liệu
include 'connect.php';

// Kiểm tra xem yêu cầu có chứa tham số 'status' không
if (isset($_GET['idBill'])) {
    // Lấy giá trị của tham số 'status' từ yêu cầu
    $idBill = $_GET['idBill'];

    if ($idBill != 0) {
        $sql = "SELECT 
                    bills.ID_BILL,
                    bills.ID_STAFF,
                    accounts.ID_USER AS ID_CUSTOMER,
                    users.FULLNAME,
                    users.PHONE_NUMBER AS PHONENUMBER,
                    bills.TOTAL_BILL,
                    bills.SHIPPING_ADDRESS,
                    bills.DATE_BILL,
                    bills.STATUS_BILL,
                    feedbacks.DATE_FEEDBACK, 
                    order_timeline.CONFIRM_TIME,
                    order_timeline.SHIPPING_TIME,
                    order_timeline.CONFIRM_RECEIVE_TIME,
                    order_timeline.CANCEL_TIME
                FROM 
                    bills
                INNER JOIN 
                    accounts ON bills.ID_CUSTOMER = accounts.ID_ACCOUNT
                INNER JOIN 
                    users ON accounts.ID_USER = users.ID_USER
                LEFT JOIN 
                    feedbacks ON bills.ID_BILL = feedbacks.ID_BILL 
                LEFT JOIN 
                    order_timeline ON bills.ID_BILL = order_timeline.ID_BILL 
                WHERE 
                    bills.ID_BILL = $idBill;";
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
    echo "No idBill parameter provided";
}
