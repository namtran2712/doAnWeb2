$(document).ready(function () {
    $.when(
        $.getScript("js\\modal.js")
    ).done(function () {
        console.log("Tất cả các file đã được tải ở admin!");
        // var obj = {};
        // $(".list-item").Paging(obj, "khachHang");
    })

});