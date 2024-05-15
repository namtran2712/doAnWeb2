<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <!-- FIX CAI NAY -->
    <!-- dropdown.js:241 Uncaught TypeError: i.createPopper is not a function at fe._createPopper (dropdown.js:241:27)
    at fe.show (dropdown.js:139:10)
    at fe.toggle (dropdown.js:121:49)
    at HTMLAnchorElement.<anonymous> (dropdown.js:446:38)
    at HTMLDocument.s (event-handler.js:118:19 -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>

    <!-- fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" media="all">

    <!-- css -->
    <link rel="stylesheet" href="css/product.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/login.css">

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

    <!-- popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous">
    </script>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous">
    </script>


    <!-- sweetalert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>

</head>

<body>
    <?php include("./navbar.php") ?>

    <div class="modal fade my-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form action="">
                    <div class="modal-header">
                        <h5 class="text-animation text-gradient modal-title" id="myModalLabel">Đăng nhập</h5>
                    </div>

                    <div class="modal-body">

                    </div>

                    <div class="modal-footer">
                        <button class="btn-register btn btn-danger">Đăng kí</button>
                        <button class="login btn btn-primary">Đăng nhập</button>
                        <button class="register btn btn-primary">Đăng kí</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="decription">
        <div class="card bg-dark text-white mt-5 border-0 ">
            <img class="card-img" src="./img/Decription2.jpg" alt="Card image">
            <div class="card-img-overlay ms-5 pt-5">
                <h3 class="card-title">Sản phẩm</h3>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                    content. This content is a little bit longer.</p>
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
                            <!-- material -->
                            <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuMaterial" data-bs-toggle="dropdown" aria-expanded="false">
                                Chất liệu
                            </a>
                            <ul class="dropdown-menu" id="filter-material" aria-labelledby="dropdownMenuMaterial">
                                <li>
                                    <div class="dropdown-item">
                                        <input class="fillerSelect" type="checkbox" id="m1" name="material_filter" data-filter-type="material" data-query="material.MATERIAL_NAME='bạc'">
                                        <label for="m1">
                                            Bạc
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div class="dropdown-item">
                                        <input class="fillerSelect" type="checkbox" id="m2" name="material_filter" data-filter-type="material" data-query="material.MATERIAL_NAME='vàng'">
                                        <label for="m2">
                                            Vàng
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown-item">
                                        <input class="fillerSelect" type="checkbox" id="m2" name="price_filter" data-filter-type="material" data-query="material.MATERIAL_NAME='kim cương'">
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
                                        <input class="fillerSelect" type="checkbox" id="p1" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 0 AND 1000000">
                                        <label for="p1">
                                            Dưới 1,000,000₫
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown-item">
                                        <input class="fillerSelect" type="checkbox" id="p2" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 1000001 AND 2000000">
                                        <label for="p2">
                                            Từ 1,000,001đ - 2,000,000đ
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown-item">
                                        <input class="fillerSelect" type="checkbox" id="p3" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 2000001 AND 3000000">
                                        <label for="p3">
                                            Từ 2,000,001đ - 3,000,000đ
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown-item">

                                        <input class="fillerSelect" type="checkbox" id="p4" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 3000001 AND 4000000">
                                        <label for="p4">
                                            Từ 3,000,001đ - 4,000,000đ
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown-item">
                                        <input class="fillerSelect" type="checkbox" id="p5" name="price_filter" data-filter-type="price" data-query="PRICE BETWEEN 4000001 AND 1000000000">
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
                <label for="sortSelection">Sắp xếp &nbsp;| &nbsp;</label>
                <select class="fillerSelect" data-filter-type="sort" name="sorSelection" id="sortSelection" style="border :none;  text-indent: 0.01px;">
                    <option value=""selected>Tất cả</option>
                    <option value="Order by QUANTITY_SOLD DESC">Bán chạy nhất</option>
                    <option value="Order by PRICE ASC" >Theo giá: Tăng dần</option>
                    <option value="Order by PRICE DESC">Theo giá: Giảm dần</option>
                    <option value="Order by PRODUCT_NAME ASC">Theo tên: A-Z</option>
                    <option value="Order by PRODUCT_NAME DESC">Theo tên: Z-A</option>
                </select>
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
    <script src="js/navmenu.js"></script>
    <script src="js/login.js"></script>

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
    <!-- js bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous">
    </script>
</body>

</html>