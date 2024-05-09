<?php
// Kết nối đến cơ sở dữ liệu
include 'connect.php';

// Hàm mã hóa trạng thái đơn hàng từ chữ sang số
function encodeStatus($status)
{
    // Sử dụng một bảng ánh xạ để quy đổi từ chữ sang số
    switch ($status) {
        case "waiting_confirm":
            return 0;
        case "waiting_pickup":
            return 1;
        case "waiting_delivery":
            return 2;
        case "completed":
            return 3;
        case "all":
            return 5;
        case "canceled":
            return -1;
        default:
            return "unknown"; // Giá trị mặc định hoặc không hợp lệ
    }
}
function changeState($connect, $idBill, $status)
{
    $sql = " UPDATE bills SET STATUS_BILL=$status WHERE  ID_BILL=$idBill";   
    return mysqli_query($connect, $sql);
}
// Kiểm tra xem yêu cầu có chứa tham số 'status' không
if (isset($_GET['status'])) {
    // Lấy giá trị của tham số 'status' từ yêu cầu
    $status = $_GET['status'];

    // Kiểm tra trạng thái đơn hàng dựa trên 'status' và mã hóa nó thành số
    $status = encodeStatus($status);

    // Nếu mã hóa thành công, tiếp tục xử lý
    if ($status != "unknown") {
        // tất cả
        if ($status == 5) {
            $sql = "SELECT b.ID_BILL, b.STATUS_BILL, b.TOTAL_BILL, COUNT(pb.ID_PRODUCT) AS TOTAL_PRODUCTS
                    FROM bills b
                    LEFT JOIN particular_bills pb ON b.ID_BILL = pb.ID_BILL
                    GROUP BY b.ID_BILL, b.TOTAL_BILL;";
        }
        // hoàn thành
        else if ($status == 3) {
            $sql = "SELECT b.ID_BILL, b.STATUS_BILL, b.TOTAL_BILL, COUNT(pb.ID_PRODUCT) AS TOTAL_PRODUCTS
                    FROM bills b
                    LEFT JOIN particular_bills pb ON b.ID_BILL = pb.ID_BILL
                    WHERE b.STATUS_BILL = '3' OR b.STATUS_BILL = '4'
                    GROUP BY b.ID_BILL, b.TOTAL_BILL;";
        } else {
            // Viết truy vấn SQL để lấy các đơn hàng có trạng thái tương ứng
            $sql = "SELECT b.ID_BILL, b.STATUS_BILL, b.TOTAL_BILL, COUNT(pb.ID_PRODUCT) AS TOTAL_PRODUCTS
                    FROM bills b
                    LEFT JOIN particular_bills pb ON b.ID_BILL = pb.ID_BILL
                    WHERE b.STATUS_BILL = '$status'
                    GROUP BY b.ID_BILL, b.TOTAL_BILL; ";
        }


        // Thực thi truy vấn SQL
        $result = mysqli_query($connect, $sql);

        // Kiểm tra xem có kết quả trả về không
        if ($result) {
            // Chuyển đổi kết quả thành mảng các dòng dữ liệu
            $bills = mysqli_fetch_all($result, MYSQLI_ASSOC);

            // Trả về dữ liệu dưới dạng JSON
            header('Content-Type: application/json');
            echo json_encode($bills);
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

if (isset($_POST ["type"]) and $_POST ["type"]==200 )
{  
    echo changeState($connect,$_POST["idBill"],encodeStatus($_POST["status"]));
}
