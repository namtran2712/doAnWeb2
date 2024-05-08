// Lấy idBill từ URL
var idBill = new URLSearchParams(window.location.search).get('id');

if (idBill) {
    displayProductList(idBill);
    displayDeliveryInfo(idBill);
} else {
    console.log('Không có idBill được truyền vào URL.');
}

function displayDeliveryInfo(idBill) {
    $.ajax({
        url: "./database/get_DeliveryInfo.php", // Địa chỉ điểm cuối Ajax của bạn
        type: "GET",
        data: {
            idBill: idBill
        },
        
        success: function (response) {
            console.log(response);
            if (Array.isArray(response) && response.length === 1) {
                appendInfo(response[0]);
            }
        },
        error: function (xhr, status, error) {
            console.error("Ajax request failed: " + status + ", " + error);
        }
    });
}

function displayProductList(idBill) {
    // Tìm phần tử <div> có id là "product-info" trong phần tử <li> đã tìm được
    var productList = $('#list-product');

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
                    appendProduct(productList, order);
                });
            } else {
                // Nếu response không phải là mảng, chỉ thêm đơn hàng đó vào tab content
                appendProduct(productList, response);
            }
            updateTotalPrice();
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error("Ajax request failed: " + status + ", " + error);
        }
    });
}


function appendInfo(info) {
    var statusBill = info.STATUS_BILL;
    updateStepStatus(statusBill);
    var idBillElement = $('#idBill');
    var deliveryInfo = $('#delivery-info');
    var dateBillElement = $('#dateBill');
    var cancelInfo = $('#cancel-info');
    var phoneNumber = "(+84) " + info.PHONENUMBER.substring(1);


    var divFeedback = document.getElementById("feedback");

    // button
    var receiveBtn = document.getElementById("receive");
    var rateButton = document.getElementById("rate");
    var ratedButton = document.getElementById("rated");

    // time
    var confirmTime = $('#confirm_time');
    confirmTime.text(info.CONFIRM_TIME);
    var shippingTime = $('#shipping_time');
    shippingTime.text(info.SHIPPING_TIME);
    var confirmReceiveTime = $('#confirm_receive_time');
    confirmReceiveTime.text(info.CONFIRM_RECEIVE_TIME);
    var dateRate = $('#dateRate');
    dateRate.text(info.DATE_FEEDBACK);

    // status = 0,1,2
    if (statusBill != 3 && statusBill != 4) {
        divFeedback.style.display = "none";
    }
    // đvvc đã giao nhưng người dùng chưa xác nhận 
    if (statusBill == 3) {
        if (info.CONFIRM_RECEIVE_TIME == null || info.CONFIRM_RECEIVE_TIME == "0000-00-00 00:00:00") {
            receiveBtn.style.display = "block";
        }
        // người dùng đã xác nhận sẽ có CONFIRM_RECEIVE_TIME
        else {
            rateButton.style.display = "block";
        }
    }
    // sau khi đánh giá thì status = 4, hiện button xem đánh giá
    if (statusBill == 4) {
        ratedButton.style.display = "block";
    }
    if (statusBill == -1) {
        var div = document.getElementById("order-progress");
        div.style.display = "none";
        var div2 = document.getElementById("cancel-info");
        div2.style.display = "block";
        var title = $('<p class="title">Đã hủy đơn hàng</p>');
        var time = $('<p class="cancelTime">vào '+ info.CANCEL_TIME +'</p>');
        cancelInfo.append(title);
        cancelInfo.append(time);
    }
    // Thêm thông tin của ID_BILL vào phần tử có id là 'idBill'
    idBillElement.text("Mã đơn hàng: " + info.ID_BILL);
    dateBillElement.text(info.DATE_BILL);
    var title = $('<p class="title">Địa chỉ nhận hàng</p>');
    var addressInfo = $('<div class="addressInfo"></div>');
    var name = $('<p class="name">' + info.FULLNAME + '</p>');
    var phone = $('<p class="phone">' + phoneNumber + '</p>');
    var address = $('<p class="address">' + info.SHIPPING_ADDRESS + '</p>');

    // Append các phần tử vào phần tử "delivery-info"
    deliveryInfo.append(title);
    deliveryInfo.append(addressInfo);
    addressInfo.append(name);
    addressInfo.append(phone);
    addressInfo.append(address);
}


function appendProduct(productList, order) {
    // Lấy các thuộc tính của đơn hàng từ đối tượng order
    var price = parseFloat(order.PRICE).toLocaleString('vi-VN');

    // Tạo phần tử <div> cho thông tin sản phẩm
    var productItem = $("<li>").addClass("li-product-info");
    productItem.append("<div class='imgProduct'><img src='" + order.MAIN_IMAGE + "' alt='Product' class='product-image'></div>");
    productItem.append("<div class='infoProduct'><p class='nameProduct'>" + order.PRODUCT_NAME + "</p><p class='sizeProduct'>Size: " + order.SIZE + "</p><p class='quantityProduct'>Số lượng: " + order.QUANTITY + "</p></div>");
    productItem.append("<div class='priceProduct'><p class='price'>" + price + "đ</p></div>");


    // Thêm sản phẩm vào đơn hàng
    productList.append(productItem);
}

function updateTotalPrice() {
    // Tạo biến để lưu tổng tiền, tổng chiết khấu và tổng số tiền cuối cùng
    var total = 0;
    var discount = 0;
    var totalAmount = 0;

    // Lặp qua mỗi phần tử <div> có class là "priceProduct"
    $('.priceProduct').each(function () {
        // Lấy giá reduced từ mỗi phần tử <div> này
        var priceText = $(this).find('.price').text();

        // Loại bỏ ký tự "đ" và dấu chấm từ giá reduced
        var priceNumber = parseFloat(priceText.replace(/[.,đ]/g, ''));

        // Kiểm tra xem giá reduced có phải là một số hợp lệ không
        if (!isNaN(priceNumber)) {
            // Cộng giá reduced vào tổng tiền
            total += priceNumber;
        }
    });

    // Lấy giá trị của tổng chiết khấu từ phần tử <div> có id là "discount"
    var discountText = $('#discount').text();
    var discountNumber = parseFloat(discountText.replace(/[.,đ]/g, ''));

    // Kiểm tra xem giá trị chiết khấu có phải là một số hợp lệ không
    if (!isNaN(discountNumber)) {
        discount = discountNumber;
    }

    // Tính tổng số tiền cuối cùng
    totalAmount = total + discount;

    $('#total').text(formatMoney(total) + ' đ');
    $('#total-amount').text(formatMoney(totalAmount) + ' đ');
}

// Hàm để định dạng số tiền
function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm phân cách hàng nghìn
}

function updateStepStatus(statusBill) {
    // Loại bỏ tất cả các class CSS liên quan đến trạng thái đơn hàng
    $('.step .circle').removeClass('active');
    $('.step .circle i').removeClass('active');
    $('.step .line').removeClass('active');

    if (statusBill === '0') {
        // Trạng thái: Đã đặt đơn hàng
        $('.step:nth-child(1) .circle').addClass('active2').css('box-shadow', '0 0 5px rgba(45, 194, 88, 0.5)');
        $('.step:nth-child(1) .circle i').addClass('active');
    } else if (statusBill === '1') {
        // Trạng thái: Đã xác nhận
        for (var i = 1; i <= 2; i++) {
            $('.step:nth-child(' + i + ') .circle').addClass('active');
            $('.step:nth-child(' + i + ') .circle i').addClass('active');
        }
        $('.step:nth-child(2) .circle').addClass('active2');
        $('#first').addClass('active');
        $('#second').addClass('active2');
    } else if (statusBill === '2') {
        // Trạng thái: Đã giao cho đơn vị vận chuyển
        for (var i = 1; i <= 3; i++) {
            $('.step:nth-child(' + i + ') .circle').addClass('active');
            $('.step:nth-child(' + i + ') .circle i').addClass('active');
        }
        $('.step:nth-child(3) .circle').addClass('active2');
        $('#first').addClass('active');
        $('#second').addClass('active');
        $('#third').addClass('active2');
    } else if (statusBill === '3') {
        // Trạng thái: Đã hoàn thành
        for (var i = 1; i <= 4; i++) {
            $('.step:nth-child(' + i + ') .circle').addClass('active');
            $('.step:nth-child(' + i + ') .circle i').addClass('active');
        }
        $('.step:nth-child(4) .circle').addClass('active2');
        $('#first').addClass('active');
        $('#second').addClass('active');
        $('#third').addClass('active');
        $('#fourth').addClass('active2');
    } else if (statusBill === '4') {
        // Trạng thái: Đánh giá
        for (var i = 1; i <= 5; i++) {
            $('.step:nth-child(' + i + ') .circle').addClass('active');
            $('.step:nth-child(' + i + ') .circle i').addClass('active');
        }
        $('.step:nth-child(5) .circle').addClass('active2');
        $('#first').addClass('active');
        $('#second').addClass('active');
        $('#third').addClass('active');
        $('#fourth').addClass('active');
        $('#last').addClass('active');
    }
}

// Click button xác nhận đã nhận hàng, hiển thị và lưu datetime xác nhận
document.getElementById('receive').addEventListener('click', function () {
    // Lấy ngày giờ hiện tại
    var currentDate = new Date();

    // Trích xuất các thành phần của ngày và giờ
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    var hours = String(currentDate.getHours()).padStart(2, '0');
    var minutes = String(currentDate.getMinutes()).padStart(2, '0');
    var seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Tạo chuỗi định dạng "YYYY-MM-DD HH:mm:ss"
    var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Thay đổi nội dung của phần tử "step3-label" và "dateReceived"
    document.getElementById('step3-label').innerText = 'Đã nhận hàng';
    document.getElementById('confirm_receive_time').innerText = formattedDate;

    // button
    var receiveBtn = document.getElementById("receive");
    var rateBtn = document.getElementById("rate");

    $.ajax({
        url: "./database/post_order_timeline.php",
        type: 'POST',
        data: {
            idBill: idBill,
            confirmTime: null,
            shippingTime: null,
            confirmReceiveTime: formattedDate,
            cancelTime: null
        },
        success: function (response) {
            receiveBtn.style.display = "none";
            rateBtn.style.display = "block";
            console.log(response);
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi nếu có
            console.error("Ajax request failed: " + status + ", " + error);
        }
    });
});


document.querySelector (".back-button").addEventListener ("click",function()
{
    window.location.href = ("user.php#userOrder.php")

});



