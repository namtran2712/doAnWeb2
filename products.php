<div class="decription">
    <div class="card bg-dark text-white mt-5 border-0 ">
        <img class="card-img" src="./img/Decription2.jpg" alt="Card image">
        <div class="card-img-overlay ms-5 pt-5">
            <h3 class="card-title">Sản phẩm</h3>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Last updated 3 mins ago</p>
        </div>
    </div>
</div>



<nav class="navbar bg-body-tertiary navbar-expand-lg scroll sticky-top" style="z-index: 10000; margin-top:200px" id="sub">
    <div class="container-fluid">
        <a class="btn btn-default navbar-toggler" data-bs-toggle="offcanvas" href="#offcanvassubNavbar" role="button" aria-controls="offcanvasExample">
            Bộ lọc
        </a>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvassubNavbar" aria-labelledby="offcanvasSubNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasSubNavbarLabel">Menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav pe-3">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Màu sắc</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " aria-current="page" href="#products.php" data-name="sản phẩm">Chất liệu</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " aria-current="page" href="#products.php" data-name="sản phẩm">Giá</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbar-right d-flex align-items-center justify-content-end">
            <span>Sắp xếp | </span>
            <span class="nav-link " aria-current="page" href="#products.php" data-name="sản phẩm">Giá : Tăng dần</span>

        </div>
        <!-- empty-div -->
        <div class="borderbottom">

        </div>

</nav>





<div class="container-fluid show-product">
    <ul class="row list-product">

    </ul>

    <div class="group-btn-page">
        <i class="fa-solid fa-circle-left go-previous"></i>
        <input type="text" value="1" name="current-page" id="current-page">
        <i class="fa-solid fa-circle-right go-next"></i>

    </div>
    <div class="infoPage">
        <span></span>
    </div>

</div>
<script src="js/product.js"></script>
<script>
    var subNav = document.querySelector("#sub")
    var parrentNav = document.querySelector("#parent")
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 500) {
            /* Khi cuộn xuống đủ để ẩn navbar trên */
            subNav.style.top ="0";  
            parrentNav.style.top = "-100";
            parrentNav.style.opacity =" 0"; /* Làm mờ navbar trên */
        } else {
         /* Đẩy navbar trên lên ngoài vùng nhìn thấy */
            parrentNav.style.opacity = "1";
        }


    });
</script>