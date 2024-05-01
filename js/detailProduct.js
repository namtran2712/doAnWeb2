// người dùng đăng nhập mới lấy được account_id
var accountId = 1;

$(document).ready(function () {
    // Thiết lập data-size cho các nút size
    $(".size .group-btn-size .btn-size").each(function (index) {
        $(this).attr("data-size", $(this).text());
    });

    $(".size .group-btn-size .btn-size").eq(0).addClass("selected");

    var text = $(".price-after b span").text();
    text = parseInt(text);
    $(".price-after b span").text(text.toLocaleString("de-DE"));

    $(".sub-img li img").click(function (e) {
        e.preventDefault();
        var srcSubImg = $(this).attr('src');
        var srcMainImg = $(".main-img img").attr('src');
        console.log(srcSubImg)
        console.log(srcMainImg)
        $(".main-img img").attr('src', srcSubImg);
        $(this).attr('src', srcMainImg);
    });

    $(".size .group-btn-size .btn-size").click(function (e) {
        e.preventDefault();
        var price = $(this).data("price");
        $(".price-after b span").text(price.toLocaleString("de-DE"));
        var btns = document.querySelectorAll(".size .group-btn-size .btn-size")
        btns.forEach(btn => {
            if (btn.classList.contains("selected")) {
                btn.classList.remove("selected")
            }
        });
        $(this).addClass("selected");
    });

    function setValQuantityProduct(caculate) {
        var val = $("#quantity").val();
        val = parseInt(val);
        if (caculate == '-') {
            if (val -= 1 > 0)
                $("#quantity").val(val);
        }
        else {
            $("#quantity").val(val += 1);
        }
    }

    $(".decrease").click(function (e) {
        e.preventDefault();
        setValQuantityProduct('-')
    });
    $(".increase").click(function (e) {
        e.preventDefault();
        setValQuantityProduct('+')
    });

    $(".buy-now").click(function (e) {
        e.preventDefault();

        // Lấy ID sản phẩm từ URL
        var urlParams = new URLSearchParams(window.location.search);
        var productId = urlParams.get('id');

        // Lấy số lượng sản phẩm từ phần tử HTML
        var quantity = $("#quantity").val();

        // Lấy size sản phẩm từ phần tử HTML
        var size = $(".size .group-btn-size .btn-size.selected").data("size");

        // Lấy giá sản phẩm từ phần tử HTML
        var price = $(".size .group-btn-size .btn-size.selected").data("price");


        // Kiểm tra xem có size được chọn không
        if (size === undefined || size === null) {
            alert("Vui lòng chọn size sản phẩm.");
            return;
        }

        // Kiểm tra xem số lượng có hợp lệ không
        if (isNaN(quantity) || quantity <= 0) {
            alert("Số lượng sản phẩm không hợp lệ.");
            return;
        }

        // Gửi yêu cầu AJAX để thêm sản phẩm vào giỏ hàng bằng session
        $.ajax({
            type: 'POST',
            url: 'addtoCart.php',
            data: {
                account_id: accountId,
                product_id: productId,
                quantity: quantity,
                size: size,
                price: price
            },
            success: function (response) {
                alert(response); // Hiển thị thông báo thành công hoặc lỗi
            }
        });
    });
});