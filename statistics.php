<!-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thống kê kinh doanh</title>
    

</head>

<body> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/cd0f90628a.js" crossorigin="anonymous"></script>

<link rel="stylesheet" href="./css/statistics.css">
<div class="container">
    <h1>Thống kê kinh doanh</h1>
    <div class="sale-container">
        <div id="revenue-info">
            <p>Sales</p>
            <div class="top">
                <p id="current-revenue">100đ</p>
                <div class="icon">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
            <div class="bottom">
                <p id="revenue-change"></p>
                <p>so với tháng trước</p>
            </div>
        </div>
    </div>


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
    <div id="chart-container">
        <!-- <canvas id="myChart"></canvas> -->
    </div>

</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="js/statistics.js"></script>
<!-- Thêm các script để xử lý sự kiện và vẽ biểu đồ
    
</body>

</html> -->