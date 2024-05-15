
(function ($) {
    $.fn.dataProduct = function (options, type) {
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
            query: "#filter-price .dropdown-item input",
            query1: "#filter-material .dropdown-item input"

        };
        $.extend(options, defaults);
        var showArea = $(options.showArea)
        var txtCurrentPage = $(options.txtCurrentPage)
        var btnGoNext = $(options.goNext)
        var btnGoPrevious = $(options.goPrevious)
        var infoPage = $(".infoPage")
        var query = $("#filter-price .dropdown-item input")
        var query1 = $("#filter-material .dropdown-item input")
        init()

        function init() {
            $.ajax({
                url: "database/productDao.php?type=0&items=" + options.items + "&category=" + type,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    options.totalPage = data
                    loadData(options.currentPage)
                    setInfoPage(options)
                }

            })
            btnGoNext.off("click")
            btnGoPrevious.off("click")
            btnGoNext.click(function (e) {
                goNext();

            })
            btnGoPrevious.click(function (e) {
                goPrevious();
            })

            var querycondition = ""
         
            $.each(query, function (indexInArray, valueOfElement) {
                $(valueOfElement).change(function () {

                    if (($(val).is(":checked"))) {
                        querycondition = querycondition + $(val).attr("data-query") + " or "
                        console.log(1)
                    }
                    else {
                        if (querycondition.trim() == "")
                            querycondition = ""

                        querycondition = querycondition.replace(($(val).attr("data-query") + " or"), " ")

                    }
                    filter(querycondition.substring(0, querycondition.length - 4), options.currentPage)

                })


            });

            $.each(query1, function (indexInArray, valueOfElement) {
                $(valueOfElement).change(function () {
                    if (($(valueOfElement).is(":checked"))) {
                        querycondition = querycondition + $(valueOfElement).attr("data-query") + " or "

                    }
                    else {
                        if (querycondition.trim() == "")
                            querycondition = ""

                        querycondition = querycondition.replace(($(valueOfElement).attr("data-query") + " or"), " ")

                    }
                    
                    filter(querycondition.substring(0, querycondition.length - 4), options.currentPage)
                })


            });
            txtCurrentPage.keyup(function (e) {
                if (e.keyCode == 13) {
                    var valueText = $(this).val()
                    valueText = parseInt(valueText)
                    if (valueText < 1 || valueText > options.totalPage || isNaN(valueText)) {
                        Swal.fire({
                            title: "Vui lòng nhập > 0 và <= " + options.totalPage,
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
                        setCurrentPage(options.currentPage)
                    }
                    else {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant"
                        });
                        setCurrentPage(valueText);
                        options.currentPage = valueText;
                        txtCurrentPage.blur();
                        loadData(options.currentPage)
                    }
                }
            });
        }
        function setInfoPage(options) {
            infoPage.text("Page " + options.currentPage + " of " + options.totalPage)
        }
        function filterByprice(querycondition, currentPage) {
            $.ajax({
                type: "POST",
                url: "./database/productDao.php?type=200&items=" + options.items + "&currentPage=" + currentPage,

                data: {
                    query: querycondition,
                },
                dataType: "html",
                success: function (data) {
                    // console.log(data)
                    if (data == null) {
                        showArea.empty()
                        var li = `
                        <div class="container-fluid">
                            <h3> Không có sản phẩm nào
                        </div>
                        `
                        showArea.append(li)

                    }
                    else {
                        showArea.empty()
                        createProductItem(data)
                        $(".buy-now").click(function (e) {
                            e.preventDefault();
                            var id = $(this).data("id")
                            getData(id)
                        });

                        $(".image-product img").click(function (e) {
                            e.preventDefault();
                            var id = $(this).data("id")
                            getData(id)
                        });

                        $(".name-product").click(function (e) {
                            e.preventDefault();
                            var id = $(this).data("id")
                            getData(id)
                        });

                    }

                }
            });
        }
        function filterByMaterial(querycondition, currentPage) {
            $.ajax({
                type: "POST",
                url: "./database/productDao.php?type=199&items=" + options.items + "&currentPage=" + currentPage,

                data: {
                    query: querycondition,
                },
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    if (data == null) {
                        showArea.empty()
                        var li = `
                        <div class="container-fluid">
                            <h3> Không có sản phẩm nào
                        </div>
                        `
                        showArea.append(li)

                    }
                    else {
                        showArea.empty()
                        createProductItem(data)
                        $(".buy-now").click(function (e) {
                            e.preventDefault();
                            var id = $(this).data("id")
                            getData(id)
                        });

                        $(".image-product img").click(function (e) {
                            e.preventDefault();
                            var id = $(this).data("id")
                            getData(id)
                        });

                        $(".name-product").click(function (e) {
                            e.preventDefault();
                            var id = $(this).data("id")
                            getData(id)
                        });

                    }

                }
            });
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
        function loadData(page) {
            $.ajax({
                type: "GET",
                url: "./database/productDao.php?type=2&items=" + options.items + "&currentPage=" + page + "&category=" + type,
                dataType: "json",
                success: function (data) {
                    showArea.empty()
                    createProductItem(data)
                    $(".buy-now").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data("id")
                        getData(id)
                    });

                    $(".image-product img").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data("id")
                        getData(id)
                    });

                    $(".name-product").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data("id")
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
                    window.location.href = "./detailProduct.php?id=" + id;
                }
            });
        }
        function setCurrentPage(value) {
            txtCurrentPage.val(value)
        }

        function goNext() {
            if (options.currentPage == options.totalPage) {
                return;
            }
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
            options.currentPage++;
            setCurrentPage(options.currentPage);
            loadData(options.currentPage);
            setInfoPage(options)


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
            loadData(options.currentPage);
            setInfoPage(options)
        }


    }

})(jQuery);

$(document).ready(function () {
    var categoryName = new URLSearchParams(window.location.search).get("data-name")
    var options = {}
    $(".list-product").dataProduct(options, categoryName)
})
