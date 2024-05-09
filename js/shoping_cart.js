$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "database/accountDao.php?type=100",
        dataType: "json",
        success: function (response) {
            var accountId=response['idAccount']
            var priceDiscount=0;
            $(".site-btn").click(function (e) { 
                e.preventDefault();
                var code =$("#code-discount").val();
                if(code=="THAYSANGDEPTRAI123")
                {
                    priceDiscount=500000
                    Swal.fire("Áp mã giảm giá thành công !!!", "", "success");
                }
                checkout()
            });
            $('select[name^="size_"]').change(function () {
                // Lấy giá từ thuộc tính data-price của tùy chọn đã chọn
                var selectedPrice = $(this).find('option:selected').data('price');
            
                // Định dạng giá tiền với dấu phẩy phân cách đơn vị hàng nghìn
                selectedPrice = selectedPrice.toLocaleString('de-DE');
            
                // Cập nhật giá tương ứng
                var productId = $(this).attr('id').replace('size_', '');
                var trId = $(this).closest('tr').attr('id'); // Lấy ID của thẻ <tr>
                var selectedPriceElement = $('#' + trId).find('#selected_price_' + productId); // Tìm phần tử có ID tương ứng bên trong thẻ <tr>
            
                // Thay đổi văn bản của phần tử selectedPriceElement
                selectedPriceElement.text(selectedPrice + 'đ');
            
                // Lặp qua các option và loại bỏ thuộc tính selected
                $(this).find('option').removeAttr('selected');
            
                // Thiết lập thuộc tính selected cho option được chọn
                $(this).find('option:selected').attr('selected', 'selected');
            
                // Lấy giá từ thuộc tính data-price của option được chọn
                var inputPrice = selectedPrice;
            
                // Tìm input trong cùng một hàng và thay đổi thuộc tính data-price
                var inputElement = $(this).closest('tr').find('.value-changer_input');
                // Loại bỏ dấu phân cách số
                inputPrice = inputPrice.replace(/\D/g, '');
                inputElement.attr('data-price', inputPrice);
            
                // Tính tổng tiền
                var totalElement = $(this).closest('tr').find('.shoping__cart__total');
                var totalPrice = inputPrice * inputElement.val(); // Nhân giá của size với số lượng
                totalElement.text(totalPrice.toLocaleString('de-DE') + 'đ'); // Hiển thị tổng tiền đã định dạng
            
                // Lấy thông tin sản phẩm
                var productId = $(this).attr('id').replace('size_', '');
                var quantity = $(this).closest('tr').find('.value-changer_input').val();
                var size = $(this).val();
                var price = $(this).find('option:selected').data('price');
            
                // Gửi yêu cầu cập nhật thông tin trong session
                sendUpdateSizeRequest(productId, quantity, size, price, trId);
            });
            
            // Lắng nghe sự kiện click trên các liên kết tăng và giảm số lượng sản phẩm
            document.querySelectorAll('.value-changer_decrease, .value-changer_increase').forEach(item => {
                item.addEventListener('click', event => {
                    event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a> khi nhấn vào
            
                    // Tìm hàng (row) chứa sản phẩm tương ứng
                    const row = event.target.closest('tr');
                    const trId = row.getAttribute('id');
            
                    // Tìm thẻ input chứa số lượng sản phẩm trong hàng đó
                    const inputElement = row.querySelector('.value-changer_input');
            
                    // Lấy giá và số lượng hiện tại của sản phẩm từ thuộc tính data và giá trị của thẻ input
                    const price = parseFloat(inputElement.getAttribute('data-price'));
                    let quantity = parseInt(inputElement.value);
            
                    // Xác định hành động: tăng hoặc giảm số lượng sản phẩm
                    if (event.target.classList.contains('value-changer_increase')) {
                        quantity += 1;
                    } else if (event.target.classList.contains('value-changer_decrease')) {
                        if (quantity > 1) { // Đảm bảo số lượng sản phẩm không âm
                            quantity -= 1;
                        }
                    }
            
                    // Cập nhật số lượng sản phẩm trong input
                    inputElement.value = quantity;
            
                    // Tính tổng tiền cho sản phẩm trong hàng đó
                    const subtotal = price * quantity;
            
                    // Cập nhật tổng tiền của sản phẩm trong hàng
                    const subtotalElement = row.querySelector('.shoping__cart__total');
                    subtotalElement.innerText = subtotal.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.') + 'đ';
            
                    // Lấy thông tin sản phẩm
                    const productId = event.target.closest('tr').querySelector('.shoping__cart__total').id;
                    const size = row.querySelector('select').value;
            
                    // Gửi yêu cầu cập nhật thông tin trong session
                    sendUpdateQuantityRequest(productId, inputElement.value, size, price, trId);
                });
            });
            
            $('.shoping__cart__item__close').click(function () {
                // Lấy productId và size của sản phẩm cần xóa từ thuộc tính data của thẻ <tr>
                var productId = $(this).closest('tr').data('id-product');
                var size = $(this).closest('tr').data('size');
                // In ra console ID và size của sản phẩm
                Swal.fire({
                    title: "Bạn chắc chắn muốn xóa?",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Xóa",
                    denyButtonText: `Hủy`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("Đã xóa thành công!", "", "success");
                        deleteProduct(accountId, productId, size);
                    }})
                });
            $(".make-bill").click(function (e) { 
                e.preventDefault();
                Swal.fire({
                    title: "Bạn chắc chắn muốn đặt hàng?",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Đặt hàng",
                    denyButtonText: `Hủy`
                }).then((result) => {
                    if (result.isConfirmed) {
                        if($(".shoping__cart__table table tbody tr").length>0)
                        {
                            var priceText =$('.shoping__checkout ul li:nth-child(2) span').text();
                            total = parseFloat(priceText.replace(/[đ.]/g, ""));
                            makeBill(accountId,total)
                            $(".shoping__cart__table table tbody").empty();
                            checkout();
                            Swal.fire("Đặt hàng thành công!", "", "success");
                        }
                        else
                        {
                            Swal.fire({
                                title: "Giỏ hàng của bạn đang trống !!!",
                                text: "",
                                icon: "error"
                            });
                        }

                    }})
            });
            
            function makeBill(accountId,total)
            {
                $.ajax({
                    type: "POST",
                    url: "makeBill.php",
                    data: {
                        account_id : accountId,
                        total : total,
                    },
                    dataType: "dataType",
                    success: function (response) {

                    }
                });
            }
            function deleteProduct(accountId, productId, size) {
                $.ajax({
                    type: 'POST',
                    url: 'delete_cart.php', // Đường dẫn đến file xử lý xóa sản phẩm
                    data: {
                        account_id: accountId,
                        product_id: productId,
                        size: size
                    },
                    success: function (response) {
                        $('tr[data-id-product="' + productId + '"][data-size="' + size + '"]').remove();
                        checkout()
                    },
                    error: function (xhr, status, error) {
                        console.error("Lỗi khi xóa sản phẩm:", error);
                    }
                });
            }
            
            
            function sendUpdateQuantityRequest(productId, quantity, size, price, trId) {
                // Gửi yêu cầu AJAX đến máy chủ để cập nhật thông tin sản phẩm
                $.ajax({
                    type: 'POST',
                    url: 'update_quantity_cart.php', // Đường dẫn đến script PHP để xử lý cập nhật
                    data: {
                        account_id: accountId,
                        product_id: productId,
                        quantity: quantity,
                        size: size,
                        price: price,
                        trId: trId,
                    },
                    success: function (response) {
                        console.log(response); // In ra phản hồi từ server
                        console.log("Cập nhật thành công!");
                        checkout();
                    },
                    error: function (xhr, status, error) {
                        console.error("Lỗi khi cập nhật thông tin sản phẩm trong session:", error);
                    }
                });
            }
            function sendUpdateSizeRequest(productId, quantity, size, price, trId) {
                // Gửi yêu cầu AJAX đến máy chủ để cập nhật thông tin sản phẩm
                $.ajax({
                    type: 'POST',
                    url: 'update_size_cart.php', // Đường dẫn đến script PHP để xử lý cập nhật
                    data: {
                        account_id: accountId,
                        product_id: productId,
                        quantity: quantity,
                        size: size,
                        price: price,
                        trId: trId,
                    },
                    success: function (response) {
                        console.log(response); // In ra phản hồi từ server
                        console.log("Cập nhật thành công!");
                        checkout();
                        // location.href = 'shoping_cart.php';
                    },
                    error: function (xhr, status, error) {
                        console.error("Lỗi khi cập nhật thông tin sản phẩm trong session:", error);
                    }
                });
            }
            
            function checkout() {
                // Khởi tạo biến tổng hóa đơn
                var totalBill = 0;
            
                // // Duyệt qua mỗi hàng trong bảng
                $('.shoping__cart__table tbody tr').each(function (index, element) {
                    // Lấy giá trị từ ô có class là shoping__cart__total
                    var priceText = $(element).find('.shoping__cart__total').text();
                    // Chuyển đổi giá trị về số và loại bỏ ký tự không phải số
                    var price = parseFloat(priceText.replace(/[đ.]/g, ""));
                    // Cộng vào tổng hóa đơn
                    totalBill += price;
                });
                // Hiển thị tổng hóa đơn trong phần tử có class là shoping__checkout
                $('.shoping__checkout ul li:nth-child(1) span').text(totalBill.toLocaleString('de-DE') + 'đ');
                totalBill=totalBill-priceDiscount
                if(totalBill<0)
                {
                    totalBill=0
                }
                $('.shoping__checkout ul li:nth-child(2) span').text(totalBill.toLocaleString('de-DE') + 'đ');
            }
            
            checkout();
        }
    });
    // Lắng nghe sự kiện thay đổi của dropdown thay đổi size
});

