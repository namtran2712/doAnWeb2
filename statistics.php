<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thống kê kinh doanh</title>
    <link rel="stylesheet" href="./css/statistics.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>
    <div class="container">
        <h1>Thống kê kinh doanh</h1>
        <div class="filters">
            <label for="product-type">Loại sản phẩm:</label>
            <select id="category-select">

            </select>

            <label for="date-range">Khoảng thời gian:</label>
            <input type="date" id="start-date">
            <input type="date" id="end-date">
            <button id="apply-filter">Áp dụng</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th data-sort="PRODUCT_NAME">Sản phẩm</th>
                    <th data-sort="REVENUE">Doanh số</th>
                    <th data-sort="QUANTITY">Số lượng bán</th>
                    <th data-sort="DATE_BILL">Ngày giờ</th>
                    <!-- Thêm các cột khác nếu cần -->
                </tr>
            </thead>
            <tbody id="data-body">
                <!-- Dữ liệu sẽ được thêm vào đây bằng JavaScript -->
            </tbody>
        </table>
        <div class="chart-container">
            <canvas id="myChart"></canvas>
        </div>

    </div>

    <!-- Thêm các script để xử lý sự kiện và vẽ biểu đồ -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/statistics.js"></script>
</body>

</html>