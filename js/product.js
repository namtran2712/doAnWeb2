
(function ($) {
    $.fn.dataProduct = function (options, $category) {
        //====================================================
        // cac gia tri mac dinh cua option
        //====================================================

        var defaults = {
            showArea: ".list-product",
            totalPage: 0,
            items: 12,
            currentPage: 1,
            txtCurrentPage: "#current-page",
            goNext: ".go-next",
            goPrevious: ".go-previous",
            category: $category
        };
        $.extend(options, defaults);
        var showArea = $(options.showArea)
        var txtCurrentPage = $(options.txtCurrentPage)
        var btnGoNext = $(options.goNext)
        var btnGoPrevious = $(options.goPrevious)
        init()
        function init() {
            $.ajax({
                url: "database/productDao.php?type=loadProduct&items=" + options.items + "&category=" + options.category,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log (data)
                    showArea.empty()
                    $.each(data, function (i, value) {
                        var li = `
                        <li class="col-md-3 col-sm-4 col-lg-3 product-item" >
                            <div class="image-product">
                                <img src="${value.MAIN_IMAGE}" alt="" class="img-fluid" data-id = ${value.ID_PRODUCT}>
                                <button class="btn btn-sm btn-dark buy-now" data-id = ${value.ID_PRODUCT}>Mua ngay</button>
                            </div>
                            <div class="info-product">
                                <span class="name-product" data-id = ${value.ID_PRODUCT}>${value.PRODUCT_NAME}</span>
                                <span class="price-product">${parseInt(value.PRICE).toLocaleString("de-DE")} đ</span>
                            </div>
                        </li>
                        `
                        showArea.append(li);
                    });
                }

            })
        }
    }
})(jQuery);

$(document).ready(function () {
    $category = ""

    $(".navbar-nav .nav-item a").click(function (e) {
        e.preventDefault()
        $(".active").removeClass("active")
        $(this).addClass("active")
        $category = $(this).html()
        console.log ($category)
        if ($(this).html() == 'Trang chủ') {
            $(".homeFrame").show()
            $(".show-product").hide()
        }
        else {
            $(".homeFrame").hide()
            $(".show-product").show()

        }
        



        $obj = {}
        console.log($category)
        $(".list-product").dataProduct($obj, $category)
    })


})


