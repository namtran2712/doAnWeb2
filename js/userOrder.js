var allTabButton = document.querySelector("[data-tab='all']");
// Nếu button tồn tại, kích hoạt sự kiện onclick
if (allTabButton) {
    allTabButton.click(); // Kích hoạt sự kiện click
}

function openTab(event, tabName) {
    var i, tablinks;

    // Lấy tất cả các phần tử tab button và loại bỏ lớp 'active' khỏi chúng

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    // Thêm lớp 'active' cho tab button được chọn
    event.currentTarget.classList.add("active");

    var dataTabValue = event.currentTarget.getAttribute("data-tab");
    // Cập nhật nội dung của tab content dựa trên trạng thái đơn hàng tương ứng
    displayOrders(dataTabValue);
}

function changeTab(tabName) {
    $(".tab .active").removeClass("active")
    $(".tablinks[data-tab='" + tabName + "']").addClass("active");
    displayOrders(tabName)
}


// Hàm cập nhật nội dung của tab content dựa trên trạng thái đơn hàng
function displayOrders(dataTabValue) {
    var tabContent = $("#tabContent"); // Lấy tabContent bằng jQuery

    // Thực hiện gọi Ajax để lấy dữ liệu từ tập tin PHP
    $.ajax({
        url: "./database/get_orders.php", // Địa chỉ điểm cuối Ajax của bạn
        type: "GET",
        data: {
            status: dataTabValue
        },
        success: function (response) {
            // Xóa nội dung hiện tại của tab content
            tabContent.empty();

            // Lặp qua từng phần tử và thêm vào tab content
            response.forEach(function (order) {
                // Gọi hàm để thêm mỗi đơn hàng vào tab content
                appendOrderToTabContent(tabContent, order);
            });

            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error("Ajax request failed: " + status + ", " + error);
        }
    });
}

function decodeStatus($status_code) {
    // Chuyển đổi từ số về chữ bằng cách sử dụng if-else
    if ($status_code == 0) {
        return "CHỜ XÁC NHẬN";
    } else if ($status_code == 1) {
        return "CHỜ LẤY HÀNG";
    } else if ($status_code == 2) {
        return "CHỜ GIAO HÀNG";
    } else if ($status_code == 3) {
        return "HOÀN THÀNH";
    } else if ($status_code == 4) {
        return "ĐÃ ĐÁNH GIÁ";
    } else if ($status_code == -1) {
        return "ĐÃ HỦY";
    } else {
        return "unknown"; // Giá trị không xác định
    }
}

function appendOrderToTabContent(tabContent, order) {
    // Lấy các thuộc tính của đơn hàng từ đối tượng order
    var statusBill = decodeStatus(order.STATUS_BILL);
    var totalProduct = order.TOTAL_PRODUCTS;
    var totalPrice = parseFloat(order.TOTAL_BILL).toLocaleString('vi-VN');

    // Tạo phần tử <li> cho mỗi đơn hàng và lưu ID của đơn hàng trong thuộc tính data-idBill
    var orderItem = $("<li>").addClass("order").attr("data-idBill", order.ID_BILL);

    // Tạo các phần tử HTML và in các thuộc tính của đơn hàng vào chúng
    var orderStatus = $("<div>").addClass("order-status");
    orderStatus.append("<p class='status-title'>Trạng thái đơn hàng</p>");
    orderStatus.append("<p class='status'>" + statusBill + "</p>");

    var productInfo = $("<div>").addClass("product-info").attr("id", "product-info");
    if (totalProduct > 1) {
        var liSeemore = $("<div>").addClass("li-seeMore");
        liSeemore.append("<p>Xem thêm sản phẩm </p>");
    }
    var liBottom = $("<div>").addClass("li-bottom");
    var totalProductElement = $("<div>").addClass("total-product");
    var totalPriceElement = $("<div>").addClass("total-price");
    totalProductElement.append("<p>" + totalProduct + " sản phẩm </p>");
    totalPriceElement.append("<p class='title'>Thành tiền: </p>");
    totalPriceElement.append("<p class='price'>" + totalPrice + "đ</p>");

    liBottom.append(totalProductElement);
    liBottom.append(totalPriceElement);

    // btn CANCEL
    if (order.STATUS_BILL == 0) {
        var divBtn = $("<div>").addClass("btn");

        var cancelBtn = $("<button>").addClass("btnCancel").text("Yêu cầu hủy");
        divBtn.append(cancelBtn);
    }

    orderItem.append(orderStatus);
    orderItem.append(productInfo);
    if (totalProduct > 1) {
        orderItem.append(liSeemore);
    }

    orderItem.append(liBottom);
    if (order.STATUS_BILL == 0) {
        orderItem.append(divBtn);
    }

    // Thêm đơn hàng vào tab content
    tabContent.append(orderItem);

    displayOneProduct(order.ID_BILL);
}
function displayOneProduct(idBill) {
    // Tìm phần tử <li> có data-idbill là 1
    var li_IdBill = $('li.order[data-idbill="' + idBill + '"]');

    // Tìm phần tử <div> có id là "product-info" trong phần tử <li> đã tìm được
    var divProductInfo = li_IdBill.find('#product-info');

    // Thực hiện gọi Ajax để lấy dữ liệu từ tập tin PHP
    $.ajax({
        url: "./database/get_oneProduct.php", // Địa chỉ điểm cuối Ajax của bạn
        type: "GET",
        data: {
            idBill: idBill
        },
        success: function (response) {
            // Kiểm tra xem response có phải là một mảng hay không
            if (Array.isArray(response)) {

                // Nếu response là mảng, lặp qua từng phần tử và thêm vào tab content
                response.forEach(function (order) {
                    // Gọi hàm để thêm mỗi đơn hàng vào tab content
                    appendProduct(divProductInfo, order);
                });

            } else {
                // Nếu response không phải là mảng, chỉ thêm đơn hàng đó vào tab content
                appendProduct(divProductInfo, response);
            }


        },
        error: function (xhr, status, error) {
            console.error("Ajax request failed: " + status + ", " + error);
        }
    });
}
function appendProduct(divProductInfo, order) {
    // Lấy các thuộc tính của đơn hàng từ đối tượng order
    var price = parseFloat(order.PRICE).toLocaleString('vi-VN');

    // Tạo phần tử <div> cho thông tin sản phẩm
    var productItem = $("<li>").addClass("li-product-info");
    productItem.append("<div class='imgProduct'><img src='" + order.MAIN_IMAGE + "' alt='Product' class='product-image'></div>");
    productItem.append("<div class='infoProduct'><p class='nameProduct'>" + order.PRODUCT_NAME + "</p><p class='sizeProduct'>Size: " + order.SIZE + "</p><p class='quantityProduct'>Số lượng: " + order.QUANTITY + "</p></div>");
    productItem.append("<div class='priceProduct'><p class='price'>" + price + "đ</p></div>");

    // Thêm sản phẩm vào đơn hàng
    divProductInfo.append(productItem);
}

$('#tabContent').on('click', 'li.order', function () {
    // Lấy giá trị của thuộc tính data-idbill của phần tử <li> được click
    var idBill = $(this).attr('data-idbill');


    // Kiểm tra xem idBill có tồn tại hay không
    if (idBill) {
        // Chuyển hướng đến trang chi tiết đơn hàng với idBill
        window.location.href = 'userOrderDetail.php?id=' + idBill;
    }
});

$('#tabContent').on('click', 'li.order .btn', function (event) {
    event.stopPropagation();
    var idBill = $(this).closest('li.order').attr('data-idbill');
    if (idBill) {
        cancelOrder(idBill);
        $(this).text("Đã gửi yêu cầu hủy");
        $(this).prop('disabled', true);


    }
});

function cancelOrder(idBill) {
    $.ajax({
        type: "POST",
        url: "./database/get_orders.php",
        data: {
            type: 200,
            idBill: idBill,
            status: 'canceled'
        },
        dataType: "html",
        success: function (response) {
            console.log(response)
            changeTab("canceled")

        }
    });
    alert("thực hiện gửi yêu cầu hủy đến ADMIN!");
}








