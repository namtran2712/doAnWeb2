(function ($) {
    

    $.fn.Paging = function (obj) {
        var Default = {
            currentPage: 1,
            totalPage: 0,
            items: 10
        }

        obj = Default;

        init ()

        function init () {
            $.ajax({
                type: "GET",
                url: "./database/getData.php?type=countPage&item=" + obj.items,
                dataType: "json",
                success: function (data) {
                    obj.totalPage = data
                    loadData ()
                }
            });
        }

        function loadData ()  {
            $.ajax({
                type: "GET",
                url: "./database/getDataAdmin.php?type=sanPham&item="+obj.items + "&page=" + obj.currentPage,
                dataType: "json",
                success: function (data) {
                    // console.log (data)
                    var title = `
                        <span class="col-sm-1 col-md-1 col-lg-1">ID</span>
                        <span class="col-sm-3 col-md-3 col-lg-3">Tên sản phẩm</span>
                        <span class="col-sm-1 col-md-1 col-lg-1">Loại</span>
                        <span class="col-sm-1 col-md-1 col-lg-1">Chất liệu</span>
                        <span class="col-sm-1 col-md-1 col-lg-1">Hình ảnh</span>
                        <span class="col-sm-1 col-md-1 col-lg-1">Size</span>
                        <span class="col-sm-1 col-md-1 col-lg-1">Giá</span>
                        <span class="col-sm-1 col-md-1 col-lg-1">Hàng tồn</span>
                        <span class="col-sm-1 col-md-1 col-lg-1">Đã bán</span>
                        <span class="col-sm-1 col-md-1 col-lg-1">Chọn</span>
                    `
                    $(".list-item").children().first().append(title);

                    console.log (data)
                    var currentID = -1;
                    var startItem = ``;
                    var subItem = ``;
                    var endItem = ``;

                    $.each(data, function (i, val) {
                        $.each(val, function (indexInArray, valueOfElement) { 
                            console.log (valueOfElement) 
                        });
                    });
                }
            });
        }
    }

}) (jQuery);

$(document).ready(function () {

    $(".btn-show-sidebar").click(function (e) { 
        e.preventDefault();
        $(".sidebar").toggleClass ("toggle");
    });

    $(".list-group-item.list-group-item-action").click(function (e) {
        e.preventDefault();
        var btns = document.querySelectorAll (".list-group-item.list-group-item-action");

        btns.forEach(btn => {
            if (btn.classList.contains ("active")) {
                btn.classList.remove ("active")
            }
        });

        $(this).addClass("active");

        var type = $(this).parent ().attr("id");
        $(".sidebar").toggleClass ("toggle");
        loadData (type)
    });

    var obj = {};

    $(".list-item").Paging (obj);
    
});