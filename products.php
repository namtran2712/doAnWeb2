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



<nav class="navbar bg-body-tertiary navbar-expand-lg scroll sticky-top" style="z-index: 100; margin-top:200px" id="sub">
    <div class="container-fluid">
        <a class="btn btn-default navbar-toggler" data-bs-toggle="offcanvas" href="#offcanvassubNavbar" role="button" aria-controls="offcanvasExample">
            Bộ lọc
        </a>
        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvassubNavbar" aria-labelledby="offcanvasSubNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasSubNavbarLabel">Menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav pe-3 flex-grow-1">
                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuMaterial" data-bs-toggle="dropdown" aria-expanded="false">
                            Chất liệu
                        </a>
                        <ul class="dropdown-menu" id="filter-material" aria-labelledby="dropdownMenuMaterial">
                            <li>
                                <div class="dropdown-item">
                                    <input type="checkbox" id="m1" name="material_filter" data-filter-type="material" data-query="material.name=bạc">
                                    <label for="m1">
                                        Bạc
                                    </label>
                                </div>
                            </li>

                            <li>
                                <div class="dropdown-item">
                                    <input type="checkbox" id="m2" name="material_filter" data-filter-type="material" data-query="material.name=vàng">
                                    <label for="m2">
                                        Vàng
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="dropdown-item">
                                    <input type="checkbox" id="m2" name="price_filter" data-filter-type="material" data-query="material.name=kim cương">
                                    <label for="m2">
                                        Kim cương
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuPrice" data-bs-toggle="dropdown" aria-expanded="false">
                            Giá
                        </a>
                        <ul class="dropdown-menu" id="filter-price" aria-labelledby="dropdownMenuPrice">
                            <li>
                                <div class="dropdown-item">
                                    <input type="checkbox" id="p1" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 0 AND 1000000">
                                    <label for="p1">
                                        Dưới 1,000,000₫
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="dropdown-item">
                                    <input type="checkbox" id="p2" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 1000001 AND 2000000">
                                    <label for="p2">
                                        Từ 1,000,001đ - 2,000,000đ
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="dropdown-item">
                                    <input type="checkbox" id="p3" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 2000001 AND 3000000">
                                    <label for="p3">
                                        Từ 2,000,001đ - 3,000,000đ
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="dropdown-item">

                                    <input type="checkbox" id="p4" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 3000001 AND 4000000">
                                    <label for="p4">
                                        Từ 3,000,001đ - 4,000,000đ
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="dropdown-item">
                                    <input type="checkbox" id="p1" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 4000001 AND 1000000000">
                                    <label for="p5">
                                        Trên 4,000,000₫
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div class="navbar-right d-flex align-items-center justify-content-end">
            <span>Sắp xếp|</span>
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

            parrentNav.style.opacity = "0";
            parrentNav.style.display = "none"
        } else {

            parrentNav.style.opacity = "1";
            parrentNav.style.display = "block"
        }


    });
</script>

<script src="/js/product.js>