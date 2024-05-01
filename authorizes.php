<?php
include 'database/connect.php';

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phân quyền</title>
    <link rel="stylesheet" type="text/css" href="css/admin.css">
</head>

<body>
    <table class="permission-table">
        <thead>
            <tr>
                <th rowspan="2">Nhóm Quyền</th>
                <th colspan="7">Các Quyền</th>
            </tr>
            <tr>
                <th>Quản trị viên</th>
                <th>Nhân viên Bán hàng</th>
                <th>Khách hàng</th>
                <th>Quản lý Thanh toán</th>
                <th>Quản lý Kho</th>
                <th>Quản lý Khuyến mãi</th>
                <th>Quản lý Người dùng</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Kết nối đến cơ sở dữ liệu
            include 'database/connect.php';

            // Truy vấn dữ liệu từ bảng authorizes
            $sql = "SELECT * FROM authorizes";
            $result = $connect->query($sql);

            // Kiểm tra nếu có dữ liệu trả về từ truy vấn
            if ($result->num_rows > 0) {
                // Lặp qua từng dòng dữ liệu và hiển thị
                while ($row = $result->fetch_assoc()) {
                    echo '<tr>';
                    echo '<td>' . $row['AUTHORIZE_NAME'] . '</td>';
                    // Tạo checkbox cho mỗi quyền
                    echo '<td><input type="checkbox" name="admin-permission"></td>';
                    echo '<td><input type="checkbox" name="sales-staff-permission"></td>';
                    echo '<td><input type="checkbox" name="customer-permission"></td>';
                    echo '<td><input type="checkbox" name="payment-management-permission"></td>';
                    echo '<td><input type="checkbox" name="warehouse-management-permission"></td>';
                    echo '<td><input type="checkbox" name="promotion-management-permission"></td>';
                    echo '<td><input type="checkbox" name="user-management-permission"></td>';
                    echo '</tr>';
                }
            } else {
                echo "Không có nhóm quyền nào được tìm thấy";
            }

            // Đóng kết nối
            $connect->close();
            ?>
        </tbody>
    </table>
</body>
<script>
    // JavaScript
    document.addEventListener("DOMContentLoaded", function() {
        // Đếm số lượng cột tiêu đề trong phần đầu của bảng
        var numOfColumns = document.querySelectorAll('.permission-table thead th').length;

        // Đặt độ rộng cho các cột tiêu đề
        var tableWidth = 100; // Độ rộng ban đầu của bảng
        var columnWidth = tableWidth / numOfColumns; // Tính độ rộng cho mỗi cột
        var thElements = document.querySelectorAll('.permission-table thead th');
        thElements.forEach(function(th) {
            th.style.width = columnWidth + '%';
        });
    });
</script>

</html>