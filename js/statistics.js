$(document).ready(function () {
    // Gọi hàm AJAX khi trang được tải
    getCategories();

});

function getCategories() {
    // Gửi yêu cầu AJAX để lấy danh sách các loại sản phẩm từ file statisticsDAO.php
    $.ajax({
        url: './database/statisticsDAO.php',
        type: 'GET',
        dataType: 'json',
        data: {
            action: 'get_categories' // Thêm một tham số để phân biệt các loại yêu cầu trong file PHP
        },
        success: function (response) {
            // Xử lý và hiển thị danh sách các loại sản phẩm
            displayCategories(response);
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching categories:', error);
        }
    });
}

function displayCategories(categories) {
    // Lặp qua mỗi loại sản phẩm và hiển thị chúng trên trang web
    var categorySelect = $('#category-select');

    // Lặp qua các loại sản phẩm và thêm chúng vào dropdown menu
    categories.forEach(function (category) {
        categorySelect.append($('<option>', {
            value: category.ID_CATEGORY,
            text: category.CATEGORY_NAME
        }));
    });
}

$(document).ready(function () {
    $('#category-select').prepend('<option value="0" selected>Tất cả</option>');
    var clickedColumn = getClickedColumn();
    fetchStatistics(0, null, null, clickedColumn, sortOrder);

    // Lắng nghe sự kiện khi người dùng thay đổi lựa chọn trong dropdown menu
    $('#category-select').change(function () {
        // Lấy giá trị của loại sản phẩm đã chọn
        var selectedCategory = $(this).find(":selected").val();
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        var clickedColumn = getClickedColumn();
        // Gọi hàm fetchStatistics để gửi yêu cầu AJAX
        fetchStatistics(selectedCategory, startDate, endDate, clickedColumn, sortOrder);
        
    });
});
$(document).ready(function () {
    $('#apply-filter').click(function () {
        // Lấy giá trị ngày bắt đầu và ngày kết thúc từ ô nhập liệu
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        var selectedCategory = $('#category-select').val();
        var clickedColumn = getClickedColumn();

        // Gọi hàm fetchStatistics để gửi yêu cầu AJAX
        fetchStatistics(selectedCategory, startDate, endDate, clickedColumn, sortOrder);
    });
});
var sortOrder = 'DESC'; // Mặc định sắp xếp giảm dần
console.log(sortOrder);
document.addEventListener('DOMContentLoaded', function() {
    // Biến toàn cục để lưu trữ tiêu đề được click
    var clickedHeader = null;

    // Lắng nghe sự kiện click trên tiêu đề của bảng
    document.querySelectorAll('thead th[data-sort]').forEach(function(th) {
        th.addEventListener('click', function() {
            // Loại bỏ lớp data-sort-by khỏi tất cả các thẻ th
            document.querySelectorAll('thead th').forEach(function(th) {
                th.classList.remove('data-sort-by');
            });

            // Thêm lớp data-sort-by cho thẻ th được click
            this.classList.add('data-sort-by');

            // Lưu trữ tiêu đề đã được click
            clickedHeader = this;

            // Đảo ngược thứ tự sắp xếp nếu đã được click trước đó
            if (this.classList.contains('asc')) {
                this.classList.remove('asc');
                this.classList.add('desc');
            } else {
                // Nếu chưa được click trước đó, đặt lại thứ tự mặc định là asc
                this.classList.remove('desc');
                this.classList.add('asc');
            }

            // Gọi hàm fetchStatistics với thông tin sắp xếp cột và hướng sắp xếp
            var startDate = $('#start-date').val();
            var endDate = $('#end-date').val();
            var selectedCategory = $('#category-select').val();
            var columnName = this.getAttribute('data-sort');
            sortOrder = this.classList.contains('asc') ? 'ASC' : 'DESC';
            console.log(sortOrder);
            fetchStatistics(selectedCategory, startDate, endDate, columnName, sortOrder);
        });
    });
    // Mặc định sắp xếp theo doanh thu khi trang được tải
    var defaultSortHeader = document.querySelector('thead th[data-sort="REVENUE"]');
    defaultSortHeader.setAttribute('data-clicked', 'true');
});


function getClickedColumn() {
    var clickedColumn = null;
    document.querySelectorAll('thead th[data-clicked="true"]').forEach(function(th) {
        clickedColumn = th.getAttribute('data-sort');
    });
    return clickedColumn;
}

function fetchStatistics(selectedCategory, startDate, endDate, orderBy, sortOrder) {
    $.ajax({
        url: './database/statisticsDAO.php', // Đường dẫn đến file xử lý yêu cầu AJAX
        type: 'GET',
        dataType: 'html',
        data: {
            action: 'get_statistics', // Hành động cần thực hiện trong file statisticsDAO.php
            product_type: selectedCategory, // Giá trị của loại sản phẩm đã chọn
            start_date: startDate,
            end_date: endDate,
            order_by: orderBy,
            sort_order: sortOrder,
        },
        success: function (response) {
            // Xử lý và hiển thị dữ liệu thống kê
            console.log(response);
            displayStatistics(response);
            $('#data-body tr').each(function (index) {
                if (index % 2 === 0) {
                    $(this).addClass('even-row');
                } else {
                    $(this).addClass('odd-row');
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching statistics:', error);
        }
    });
}

function displayStatistics(data) {
    // Lấy thẻ tbody trong bảng
    var tbody = $('#data-body');

    // Xóa bỏ nội dung cũ trong tbody (nếu có)
    tbody.empty();

    // Kiểm tra nếu dữ liệu trả về là null hoặc rỗng
    if (data === null || data.length === 0) {
        // Tạo một dòng thông báo không có dữ liệu
        var noDataMessage = $('<tr>').append($('<td colspan="3">').text('Không có sản phẩm thỏa điều kiện.'));

        // Thêm dòng vào tbody
        tbody.append(noDataMessage);
    } else {
        // Lặp qua mỗi mục trong mảng dữ liệu và thêm vào tbody
        data.forEach(function (item) {
            // Tạo một dòng mới
            var row = $('<tr>');

            var formattedRevenue = parseFloat(item.REVENUE).toLocaleString('vi-VN');
            var formattedQuantity = parseFloat(item.TOTAL_SOLD).toLocaleString('vi-VN');

            // Tạo một đối tượng <a> với thuộc tính href là đường dẫn của hình ảnh
            var imageLink = $('<a>').attr('href', item.MAIN_IMAGE);

            // Tạo một đối tượng <img> để hiển thị hình ảnh
            var image = $('<img>').attr('src', item.MAIN_IMAGE);

            // Thêm đối tượng <img> vào đối tượng <a>
            imageLink.append(image);

            // Tạo một ô <td> mới với lớp 'product-img' và thêm đối tượng <a> vào đó
            var productImgCell = $('<td>').addClass('product-img').append(imageLink);
            var productNameCell = $('<td class="product-name">').text(item.PRODUCT_NAME);
            var totalRevenueCell = $('<td class = "numeric-cell">').text(formattedRevenue + ' đ');
            var totalQuantityCell = $('<td class="total-quantity">').text(formattedQuantity);
            var date = $('<td class="total-quantity">').text(item.DATE_BILL);


            // Thêm các ô vào dòng
            row.append(productImgCell, productNameCell, totalRevenueCell, totalQuantityCell, date);

            // Thêm dòng vào tbody
            tbody.append(row);
        });
    }
}
$.ajax({
    url: './database/statisticsDAO.php', // Đường dẫn đến file xử lý yêu cầu AJAX
    type: 'GET',
    dataType: 'json',
    data: {
        action: 'get_chart', // Hành động cần thực hiện trong file statisticsDAO.php
    },
    success: function (data) {
        console.log(data);
        drawChart(data);
    },
    error: function (xhr, status, error) {
        console.error('Error fetching data:', error);
    }
});

var monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

function drawChart(data) {
    var months = data.map(function (item) {
        return monthNames[item.month - 1];
    });

    var revenues = data.map(function (item) {
        return item.revenue;
    });

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Doanh thu theo tháng',
                data: revenues,
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // Màu của cột
                hoverBackgroundColor: 'rgba(75, 192, 192, 1)', // Màu hover
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
    
}









