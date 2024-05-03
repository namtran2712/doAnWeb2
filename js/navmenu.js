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

$(document).ready(function () {
    $(".navbar-nav .nav-item a").click(function (e) {

        $(".active").removeClass("active")
        $(this).addClass("active")

    })
    $(".cart").click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "database/accountDao.php?type=2",
            dataType: "text",
            success: function (response) {
                if(response)
                {
                    window.location.href="shoping_cart.php"
                }
                else
                {
                    alert("Vui lòng đăng nhập để xem giỏ hàng !!!")
                }
            }
        });
    });
})