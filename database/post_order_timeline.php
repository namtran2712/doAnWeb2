<?php
// Kết nối đến cơ sở dữ liệu
include 'connect.php';

// Lấy dữ liệu từ request POST
$idBill = $_POST['idBill'];
$confirmTime = $_POST['confirmTime'];
$shippingTime = $_POST['shippingTime'];
$confirmReceiveTime = $_POST['confirmReceiveTime'];
$cancelTime = $_POST['cancelTime']; // Thêm dòng này để lấy giá trị cancelTime từ client

// Kiểm tra xem idBill đã tồn tại trong cơ sở dữ liệu chưa
$sql = "SELECT * FROM order_timeline WHERE ID_BILL = $idBill";
$result = $connect->query($sql);

if ($result->num_rows > 0) {
    // Nếu idBill tồn tại, thực hiện cập nhật các thuộc tính khác null
    $updateQuery = "UPDATE order_timeline SET ";
    if ($confirmTime != null) {
        $updateQuery .= "CONFIRM_TIME = '$confirmTime', ";
    }
    if ($shippingTime != null) {
        $updateQuery .= "SHIPPING_TIME = '$shippingTime', ";
    }
    if ($confirmReceiveTime != null) {
        $updateQuery .= "CONFIRM_RECEIVE_TIME = '$confirmReceiveTime', ";
    }
    if ($cancelTime != null) { // Thêm điều kiện này để cập nhật cancelTime nếu được gửi từ client
        $updateQuery .= "CANCEL_TIME = '$cancelTime', ";
    }
    // Loại bỏ dấu phẩy cuối cùng và kết thúc câu lệnh UPDATE
    $updateQuery = rtrim($updateQuery, ", ");
    $updateQuery .= " WHERE ID_BILL = $idBill";

    if ($connect->query($updateQuery) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $connect->error;
    }
} else {
    // Nếu idBill không tồn tại, thực hiện chèn dữ liệu mới
    $insertQuery = "INSERT INTO order_timeline (ID_BILL, CONFIRM_TIME, SHIPPING_TIME, CONFIRM_RECEIVE_TIME, CANCEL_TIME) VALUES ($idBill, '$confirmTime', '$shippingTime', '$confirmReceiveTime', '$cancelTime')";

    if ($connect->query($insertQuery) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $insertQuery . "<br>" . $connect->error;
    }
}

// Đóng kết nối
$connect->close();

?>
