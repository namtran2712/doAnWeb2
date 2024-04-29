
$(document).ready(function () {
    $.getScript("js\\pagingForAdmin.js")
        .done(function () {
            // File JS đã được tải thành công
            console.log("File pagingForAdmin được tải!");
            var obj = {};
            $(".list-item").Paging(obj, "khachHang");
        })
        .fail(function (jqxhr, textStatus, errorThrown) {
            // Lỗi xảy ra khi tải file JS
            console.error("Lỗi khi tải file pagingForAdmin:", errorThrown);
        });


    $(".btn-show-sidebar").click(function (e) {
        e.preventDefault();
        $(".sidebar").toggleClass("toggle");
    });

    $(".list-group-item.list-group-item-action").click(function (e) {
        e.preventDefault();
        var btns = document.querySelectorAll(".list-group-item.list-group-item-action");

        btns.forEach(btn => {
            if (btn.classList.contains("active")) {
                btn.classList.remove("active")
            }
        });

        $(this).addClass("active");

        var type = $(this).parent().attr("id");
        $(".sidebar").toggleClass("toggle");

        $(".list-item").find(".item.row").remove();
        var obj = null
        $(".list-item").Paging(obj, type);
    });
});