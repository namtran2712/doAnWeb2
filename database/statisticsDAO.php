<?php
include 'connect.php';

// Kiểm tra hành động yêu cầu từ AJAX
if (isset($_GET['action']) && $_GET['action'] == 'get_statistics') {
    $productType = isset($_GET['product_type']) ? $_GET['product_type'] : '';
    $startDate = isset($_GET['start_date']) ? $_GET['start_date'] : '';
    $endDate = isset($_GET['end_date']) ? $_GET['end_date'] : '';
    $orderBy = isset($_GET['order_by']) ? $_GET['order_by'] : '';
    $sortOrder = isset($_GET['sort_order']) ? $_GET['sort_order'] : '';
    $statistics = getStatistics($productType, $startDate, $endDate, $orderBy, $sortOrder);
    echo json_encode($statistics);
}
// Kiểm tra hành động yêu cầu từ AJAX
if (isset($_GET['action']) && $_GET['action'] == 'get_categories') {
    $categories = getCategories();
    echo json_encode($categories);
}
if (isset($_GET['action']) && $_GET['action'] == 'get_sales') {
    $month = isset($_GET['month']) ? (int)$_GET['month'] : date('m');

    // Truy vấn SQL để lấy doanh thu của tháng hiện tại và tháng trước đó
    $sql = "SELECT 
                MONTH(b.DATE_BILL) AS month,
                SUM(b.TOTAL_BILL) AS revenue
            FROM 
                bills b
            WHERE 
                b.STATUS_BILL IN (3, 4) 
                AND (MONTH(b.DATE_BILL) = $month OR MONTH(b.DATE_BILL) = ($month - 1))
            GROUP BY 
                MONTH(b.DATE_BILL)";

    // Thực hiện truy vấn SQL
    $result = mysqli_query($connect, $sql);

    // Khởi tạo mảng để lưu trữ dữ liệu
    $data = array();

    // Lặp qua các hàng kết quả và thêm chúng vào mảng dữ liệu
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    // Trả về dữ liệu dưới dạng JSON
    echo json_encode($data);
}


if (isset($_GET['action']) && $_GET['action'] == 'get_chart') {
    $startDate = isset($_GET['startDate']) ? $_GET['startDate'] : null;
    $endDate = isset($_GET['endDate']) ? $_GET['endDate'] : null;

    // Xây dựng điều kiện cho truy vấn SQL dựa trên khoảng thời gian
    $condition = "";
    if ($startDate && $endDate) {
        $condition = "AND b.DATE_BILL BETWEEN '$startDate' AND '$endDate'";
    }

    $sql = "SELECT 
                MONTH(b.DATE_BILL) AS month,
                SUM(b.TOTAL_BILL) AS revenue
            FROM 
                bills b
            WHERE 
                b.STATUS_BILL IN (3, 4)
                $condition
            GROUP BY 
                MONTH(b.DATE_BILL)";

    // Thực hiện truy vấn SQL
    $result = mysqli_query($connect, $sql);

    // Kiểm tra xem có kết quả trả về không
    if ($result) {
        // Khởi tạo một mảng để lưu trữ dữ liệu
        $data = array();

        // Lặp qua các hàng kết quả và thêm chúng vào mảng dữ liệu
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }

        // Trả về dữ liệu dưới dạng JSON
        echo json_encode($data);
    } else {
        // Xử lý lỗi nếu có
        echo "Lỗi truy vấn: " . mysqli_error($connect);
    }
}

// Hàm lấy thông tin thống kê
function getStatistics($productType = '', $startDate = '', $endDate = '', $orderBy = '', $sortOrder = '')
{
    global $connect;

    $sql = "SELECT 
                p.MAIN_IMAGE,
                sold_quantity.ID_PRODUCT,
                p.PRODUCT_NAME,
                TOTAL_SOLD,
                TOTAL_SOLD * pp.PRICE AS REVENUE,
                b.DATE_BILL
            FROM (
                SELECT 
                    ID_BILL,
                    ID_PRODUCT,
                    SIZE,
                    SUM(QUANTITY) AS TOTAL_SOLD
                FROM 
                    particular_bills
                WHERE 
                    ID_BILL IN (SELECT ID_BILL FROM bills WHERE STATUS_BILL IN (3, 4))
                GROUP BY 
                    ID_PRODUCT
            ) AS sold_quantity
            JOIN 
                products p ON sold_quantity.ID_PRODUCT = p.ID_PRODUCT
            JOIN 
                particular_products pp ON sold_quantity.ID_PRODUCT = pp.ID_PRODUCT AND sold_quantity.SIZE = pp.SIZE 
            JOIN 
                particular_bills pb ON sold_quantity.ID_PRODUCT = pb.ID_PRODUCT
            JOIN 
                bills b ON sold_quantity.ID_BILL = b.ID_BILL";

    // Khởi tạo mảng tham số
    $parameters = array();

    // Thêm điều kiện dựa trên loại sản phẩm và phạm vi ngày nếu được cung cấp
    if ($productType !== '0') {
        $sql .= " WHERE p.ID_CATEGORY = ?";
        // Thêm productType vào mảng tham số
        $parameters[] = $productType;
    }

    if (!empty($startDate) && !empty($endDate)) {
        $sql .= " AND DATE(b.DATE_BILL) BETWEEN ? AND ?";
        // Thêm startDate và endDate vào mảng tham số
        $parameters[] = $startDate;
        $parameters[] = $endDate;
    }

    $sql .= " GROUP BY sold_quantity.ID_PRODUCT ORDER BY $orderBy $sortOrder;";

    // Sử dụng Câu lệnh được chuẩn bị
    $stmt = $connect->prepare($sql);

    // Kiểm tra xem câu lệnh đã được chuẩn bị thành công hay không
    if ($stmt) {
        // Nếu mảng tham số không trống, gắn các tham số
        if (!empty($parameters)) {
            // Gắn các tham số động bằng cách sử dụng call_user_func_array
            $types = str_repeat('s', count($parameters)); // Giả sử tất cả các tham số đều là chuỗi
            $stmt->bind_param($types, ...$parameters);
        }

        // Thực thi câu lệnh
        $stmt->execute();

        // Lấy kết quả
        $result = $stmt->get_result();
        // Xử lý dữ liệu và trả về dưới dạng JSON
        $statistics = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $statistics[] = array(
                    'MAIN_IMAGE' => $row['MAIN_IMAGE'],
                    'ID_PRODUCT' => $row['ID_PRODUCT'],
                    'PRODUCT_NAME' => $row['PRODUCT_NAME'],
                    'TOTAL_SOLD' => $row['TOTAL_SOLD'],
                    'REVENUE' => $row['REVENUE'],
                    'DATE_BILL' => $row['DATE_BILL']
                );
            }
        }

        return $statistics;
    } else {
        // Xử lý khi chuẩn bị câu lệnh thất bại
        // Ví dụ:
        echo "Lỗi: " . $connect->error;
    }
}


// Hàm lấy danh sách các loại sản phẩm từ bảng categories
function getCategories()
{
    global $connect;

    $sql = "SELECT * FROM category";
    $result = $connect->query($sql);

    $categories = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
    }
    return $categories;
}