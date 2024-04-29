
(function ($) {
    $.fn.dataProduct = function (options, $category) {
        //====================================================
        // cac gia tri mac dinh cua options
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
        var infoPage = $(".infoPage")
        init()

        function init() {
            $.ajax({
                url: "database/productDao.php?type=0&items=" + options.items + "&category=" + options.category,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    options.totalPage = data
                    loadData(options.currentPage, $category)
                    setInfoPage (options) 
                }

            })
            btnGoNext.off ("click")
            btnGoPrevious.off ("click")
            btnGoNext.click (function(e){
                goNext();
                
            })  
            btnGoPrevious.click (function(e){
                goPrevious();
            })
            $(txtCurrentPage).keyup(function (e) { 
                if (e.keyCode == 13) {
                    var valueText = $(this).val ()
                    valueText = parseInt (valueText)
                    if (valueText < 1 || valueText > options.totalPage || isNaN (valueText)) {
                        Swal.fire({
                            title: "Vui lòng nhập > 0 và bé hơn hoặc bằng " + options.totalPage,
                            width: 600,
                            padding: "3em",
                            color: "#716add",
                            background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
                            backdrop: `
                              rgba(0,0,123,0.4)
                              url("https://sweetalert2.github.io/images/nyan-cat.gif")
                              left top
                              no-repeat
                            `
                        });
                        setCurrentPage (options.currentPage)
                    }
                    else {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant"
                        });
                        setCurrentPage (valueText);
                        options.currentPage = valueText;
                        txtCurrentPage.blur ();
                        loadData (options.currentPage,options.category)
                    }
                }
            });
        }   
        function setInfoPage (options){
            infoPage.text("Page " +options.currentPage +" of " +options.totalPage)
        }

        function createProductItem(data) {
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
        function loadData(page, category) {
            console.log (category)
            var url
            if (category == "Sản phẩm") {
                url = "./database/productDao.php?type=3&items=" + options.items + "&currentPage=" + page
            }
            else
                url = "./database/productDao.php?type=2&items=" + options.items + "&currentPage=" + page + "&category=" + category

            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    showArea.empty()
                    createProductItem(data)
                    $(".buy-now").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data("id")
                        // console.log (id)
                        getData(id)
                    });

                    $(".image-product img").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data("id")
                        // console.log (id)
                        getData(id)
                    });

                    $(".name-product").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data("id")
                        // console.log (id)
                        getData(id)
                    });


                }
            });
        }

        function getData(id) {
            $.ajax({
                type: "GET",
                url: "./database/getData.php?id=" + id + "&type=processDP",
                dataType: "html",
                success: function (data) {
                    window.location.href = "./detailProduct.php"
                }
            });
        }
        function setCurrentPage(value) {
            txtCurrentPage.val(value)
        }

        function goNext() {
        console.log (options)
            if (options.currentPage == options.totalPage) {
                return;
            }
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
            options.currentPage++;
            setCurrentPage(options.currentPage);
            loadData(options.currentPage,options.category);
            setInfoPage (options) 


        }

        function goPrevious() {
            if (options.currentPage == 1) {
                return;
            }
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
            options.currentPage--;
            setCurrentPage(options.currentPage);
            loadData(options.currentPage,options.category);
            setInfoPage (options) 
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
        console.log($category)
        if ($(this).html() == 'Trang chủ') {
            $(".homeFrame").show()
            $(".show-product").hide()
        }
        else {
            $(".homeFrame").hide()
            $(".show-product").show()

        }




        $options = {}
        console.log($category)
        $(".list-product").dataProduct($options, $category)
    })


})


