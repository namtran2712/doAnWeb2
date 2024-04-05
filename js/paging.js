let timerInterval;

Swal.fire({
title: "LOADING!!!",
html: "",
timer: 500,
timerProgressBar: true,
didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
},
willClose: () => {
    clearInterval(timerInterval);
}
});


(function ($) {
    $.fn.paging = function (obj) {
        
        var Default = {
            showArea: ".list-product",
            totalPage: 0,
            items: 12,
            currentPage: 1,
            txtCurrentPage: "#current-page",
            goNext: ".go-next",
            goPrevious: ".go-previous"
        }

        obj = Default;

        var showArea = $(obj.showArea)
        var txtCurrentPage = $(obj.txtCurrentPage)
        var btnGoNext = $(obj.goNext)
        var btnGoPrevious = $(obj.goPrevious)

        setCurrentPage (obj.currentPage)

        init ();
        
        function init () {
                $.ajax({
                type: "GET",
                url: "./database/getData.php?type=countPage&item=" + obj.items,
                dataType: "json",
                success: function (data) {
                    obj.totalPage = data;
                    loadData (obj.currentPage);
                }   
            });

            $(txtCurrentPage).keyup(function (e) { 
                if (e.keyCode == 13) {
                    var valueText = $(this).val ()
                    valueText = parseInt (valueText)
                    if (valueText < 1 || valueText > obj.totalPage || isNaN (valueText)) {
                        Swal.fire({
                            title: "Vui lòng nhập > 0 và bé hơn hoặc bằng " + obj.totalPage,
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
                        setCurrentPage (obj.currentPage)
                    }
                    else {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant"
                        });
                        setCurrentPage (valueText);
                        obj.currentPage = valueText;
                        txtCurrentPage.blur ();
                        loadData (obj.currentPage)
                    }
                }
            });

            btnGoNext.click(function (e) { 
                e.preventDefault();
                goNext ()
            });



            btnGoPrevious.click (function (e) {
                e.preventDefault ();
                goPrevious ();
            })
        }

        function setCurrentPage (value) {
            txtCurrentPage.val (value)
        }

        function goNext () {
            if(obj.currentPage==obj.totalPage)
            {
                return;
            }
            window.scrollTo({
                top: 0,
                behavior: "instant"
              });
            obj.currentPage++;
            setCurrentPage (obj.currentPage);
            loadData(obj.currentPage);


        }

        function goPrevious () {
            if(obj.currentPage==1)
            {
                return;
            }
            window.scrollTo({
                top: 0,
                behavior: "instant"
              });
            obj.currentPage--;
            setCurrentPage (obj.currentPage);
            loadData(obj.currentPage);
        }

        function loadData (page) {
            $.ajax({
                type: "GET",
                url: "./database/getData.php?type=loadData&item=" + obj.items + "&page=" + page,
                dataType: "json",
                success: function (data) {
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
                                <span class="price-product">${ parseInt (value.PRICE).toLocaleString("de-DE")} đ</span>
                            </div>
                        </li>
                        ` 
                        showArea.append(li);
                    });
                    
                    $(".buy-now").click(function (e) { 
                        e.preventDefault();
                        var id=$(this).data("id")
                        // console.log (id)
                        getData(id)
                    });

                    $(".image-product img").click(function (e) { 
                        e.preventDefault();
                        var id=$(this).data("id")
                        // console.log (id)
                        getData(id)
                    });

                    $(".name-product").click(function (e) { 
                        e.preventDefault();
                        var id=$(this).data("id")
                        // console.log (id)
                        getData(id)
                    });
                    

                }});
        }

        
        function getData (id)
        {
            $.ajax({
                type: "GET",
                url: "./database/getData.php?id=" + id +"&type=processDP",
                dataType: "html",
                success: function (data) 
                {
                    window.location.href="./detailProduct.php"
                }
            });
        }
    }   
}) (jQuery);


$(document).ready(function () {
    var obj = {};
    $(".show-product").paging (obj)
});

