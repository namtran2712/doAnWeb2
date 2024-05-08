$(document).ready(function () {
    $(".showPage").load("userInfo.php")
    $(".btn-logout").click(function (e) {
        e.preventDefault(); 
        $.ajax({
            type: "GET",
            url: "./database/accountDao.php?type=3",
            dataType: "html",
            success: function (data) {
                window.location.href = "index.php"
            }
        });


    });
    $(".nav-item a").click(function () {
        var href = $(this).attr("href")
        var link = href.substring(1, href.length)
        $.ajax({
            type: "GET",
            url: link,
            dataType: "html",
            success: function (response) {
                $(".showPage").html(response);
            }
        });
        // $(".showPage").load(link);
    })

});


