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
    window.location.href = "http://localhost/Doan"
    
})
$(document).ready(function () {
    $(".navbar-nav .nav-item a").click(function (e) {

        $(".active").removeClass("active")
        $(this).addClass("active")

    })

})
