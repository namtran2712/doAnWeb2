
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
            searchBar: "#search-bar"
        };
        $.extend(options, defaults);
        var showArea = $(options.showArea)
        var txtCurrentPage = $(options.txtCurrentPage)
        var btnGoNext = $(options.goNext)
        var btnGoPrevious = $(options.goPrevious)
        var infoPage = $(".infoPage")
        var query = $(".fillerSelect")
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

            var queryconditionPrice = ""
            var queryconditionMaterial = ""
            var queryconditionSort = ""
            $("#sortSelection").change(function () {
                queryconditionSort = $(this).children("option:selected").val()
            })
            $.each(query, function (indexInArray, valueOfElement) {
                $(valueOfElement).change(function () {
                    var querycondition = ""
                    if (($(valueOfElement).is(":checked"))) {
                        if ($(valueOfElement).attr("data-filter-type") == "price") {
                            queryconditionPrice = queryconditionPrice + $(valueOfElement).attr("data-query") + " or "
                        }
                        else if ($(valueOfElement).attr("data-filter-type") == "material") {
                            queryconditionMaterial = queryconditionMaterial + $(valueOfElement).attr("data-query") + " or "
                        }

                    }


                    else {
                        if ($(valueOfElement).attr("data-filter-type") == "price") {
                            $c = ($(valueOfElement).attr("data-query") + " or ")
                            queryconditionPrice = queryconditionPrice.replace($c, "")
                        }
                        else if ($(valueOfElement).attr("data-filter-type") == "material") {
                            $c = ($(valueOfElement).attr("data-query") + " or ")
                            queryconditionMaterial = queryconditionMaterial.replace($c, "")

                        }

                    }

                    if (queryconditionPrice.trim() != "") {

                        querycondition += " and (" + queryconditionPrice.substring(0, queryconditionPrice.length - 3) + ")"
                    }
                    if (queryconditionMaterial.trim() != "") {
                        querycondition += " and (" + queryconditionMaterial.substring(0, queryconditionMaterial.length - 3) + ")"
                    }
                    getPageByCondition(querycondition).then(function () {
                        options.currentPage = 1
                        filter(querycondition, options.currentPage, queryconditionSort)
                    })
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
        function getPageByCondition(query) {
            return new Promise(function (resolve, reject) {
                $.when(
                    $.ajax({
                        url: "database/productDao.php?type=197&items=" + options.items,
                        type: "POST",
                        dataType: "json",
                        data: {
                            query: query,
                            category: type,
                        },
                    })
                ).done(function (data) {
                    console.log(data)
                    if (data == 0) {
                        $(".group-btn-page").css("display", "none");
                        $(".infoPage").css("display", "none");
                    }
                    else {
                        $(".group-btn-page").css("display", "block");
                        $(".infoPage").css("display", "block");
                    }
                    options.totalPage = data
                    resolve()
                })
            })
        }
        function filter(querycondition, currentPage, queryconditionSort) {
            if (querycondition.trim() == "" && queryconditionSort == "") {
                init();
                options.currentPage = 1
                loadData(options.currentPage)
                return;
            }

            $.ajax({
                type: "POST",
                url: "./database/productDao.php?type=200&items=" + options.items + "&currentPage=" + currentPage,
                data: {
                    query: querycondition,
                    orderby: queryconditionSort,
                    category: type
                },
                dataType: "json",
                success: function (data) {
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
                    setCurrentPage(options.currentPage)
                    setInfoPage(options)
                    btnGoNext.off("click")
                    btnGoPrevious.off("click")
                    // console.log(options)
                    btnGoNext.click(function (e) {
                        if (options.totalPage == 0)
                            return;
                        if (options.currentPage == options.totalPage) {
                            return;
                        }
                        window.scrollTo({
                            top: 0,
                            behavior: "instant"
                        });
                        options.currentPage++;
                        console.log(options)
                        setCurrentPage(options.currentPage);
                        filter(querycondition, options.currentPage, queryconditionSort);
                        setInfoPage(options)
                        console.log(options)
                    })

                    btnGoPrevious.click(function () {
                        if (options.currentPage == 1 || options.totalPage == 0) {
                            return;
                        }
                        window.scrollTo({
                            top: 0,
                            behavior: "instant"
                        });
                        options.currentPage--;
                        setCurrentPage(options.currentPage);
                        filter(querycondition, options.currentPage, queryconditionSort);
                        setInfoPage(options)
                    })
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
    function returnResultSearch(result) {
        var holederResult = document.querySelector(".searchHolder ul")

        holederResult.innerHTML = ""
        $.each(result, function (indexInArray, valueOfElement) {
            var li = document.createElement("li");
            li.innerHTML = `${valueOfElement.PRODUCT_NAME}`
            li.setAttribute("data-id", valueOfElement.ID_PRODUCT)
            li.addEventListener("click", function () {
                $.ajax({
                    type: "GET",
                    url: "./database/getData.php?id=" + valueOfElement.ID_PRODUCT + "&type=processDP",
                    dataType: "html",
                    success: function (data) {
                        window.location.href = "./detailProduct.php?id=" + valueOfElement.ID_PRODUCT;
                    }
                });
            })
            holederResult.append(li)

        });
    }

    function search() {
        $.ajax({
            type: "get",
            url: "./database/productDao.php?type=196",
            dataType: "json",
            success: function (data) {

                var valueSearch = document.querySelector("#search-bar").value
                var result = data.filter(value => {
                    return value.PRODUCT_NAME.toUpperCase().includes(valueSearch.toUpperCase())
                })
                returnResultSearch(result)
                fromsearch.addEventListener('submit', function (e) {
                    e.preventDefault();
                    createProductItem (result , $(".list-product"))
                    searchAction.value =""
                })
            }
        });
    }
    var searchAction = document.querySelector("#search-bar")
    var holederResult = document.querySelector(".searchHolder ul")
    var fromsearch = document.querySelector(".formSearch")

    searchAction.addEventListener("input", _.debounce(async () => {
        holederResult.style.display = "block"
        search();
    }, 300));
    searchAction.addEventListener("blur", function () {
        setTimeout(() => {
            document.querySelector(".searchHolder ul").style.display = 'none';
        }, 500);
    })

    


    function createProductItem(data,showArea) {
        showArea.empty ()
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
})(jQuery);

$(document).ready(function () {
    var categoryName = new URLSearchParams(window.location.search).get("data-name")
    var options = {}
    $(".list-product").dataProduct(options, categoryName)
})