var div = document.querySelectorAll(".borderbottom");
var locationMin = 300;
window.addEventListener("scroll", function () {
    if (this.window.scrollY > locationMin) {
        div[0].style.visibility = "visible"
    }
    else {
        div[0].style.visibility = "hidden"
    }
})
$(".navbar-brand").click(function () {
    window.location.href = "./index.php"

})
$(document).ready(function () {
    var categoryName = new URLSearchParams(window.location.search).get("data-name")
    $(".nav-link.active").removeClass("active")

    if (categoryName == "sản phẩm") {
        $(".nav-link").eq(1).addClass("active")
    }
    else if (categoryName == null) {
        $(".nav-link").eq(0).addClass("active")
    }
    var navLink = $(".nav-link")
    $.each(navLink, function (i, val) {
        if ($(val).text() == categoryName) {
            $(val).addClass("active");
        }
    });

    $(".cart").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "database/accountDao.php?type=2",
            dataType: "text",
            success: function (response) {
                if (response) {
                    window.location.href = "shoping_cart.php"
                }
                else {
                    alert("Vui lòng đăng nhập để xem giỏ hàng !!!")
                }
            }
        });
    });
})
