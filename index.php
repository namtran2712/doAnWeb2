<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" media="all">
    <link rel="stylesheet" href="css/slick.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <link rel="stylesheet" href="css/product.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href=".css/userAddress.css">
</head>

<body>

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
    <!-- container holder navbar -->
    <div class="container-fluid">

        <!-- start navbar -->
        <?php include("navbar.php") ?>
        <!-- end navbar -->
    </div>
    <!-- container holder banner -->
    <div id="wrapper" class="bg-gray">
        <div class="homeFrame container-fluid">
            <div class="container-fluid px-auto mt-4 ">
                <!-- start banner -->
                <div class="baner-container">
                    <div class="img_banner">
                        <img src="img/banner1.png" class="img-fluid" alt="">
                    </div>
                    <div class="img_banner">
                        <img src="img/banner2.png" class="img-fluid" alt="">
                    </div>
                </div>
                <!-- end banner  -->
            </div>

            <!-- container holder collection  -->

            <div class="container slideanim" id="about">
                <div class="row justify-content-center">
                    <div class="col-md-4 col-sm-12 mx-3 my-3 ">
                        <img src="img/collect1.jpg" alt="" class="img-fluid">
                    </div>
                    <div class="col-md-5 col-sm-12 mx-3 my-3 px-0">
                        <div class="row ">
                            <div class="col-12 ">
                                <img src="img/collection.jpg" alt="" class="img-fluid" style="overflow:hidden;">
                            </div>
                            <div class="collection-about justify-content-center text-center mt-3 ">
                                <h3>Đeo trang sức là cách thể hiện bạn mà không cần một lời nói nào.</h3>
                                <p>
                                    <small>
                                        <i>
                                            Cuộc đời đó có bao lâu mà hững hờ, hãy cứ đeo trang sức như chưa từng được đeo.
                                        </i>
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- container hodler best seller products -->
            <div class="container-fluid mt-4">
                <h1 class="text-center display-6 fw-bolder text-uppercase ">Sản phẩm bán chạy
                </h1>
                <div class="container slideanim" id="productBestSeller">
                </div>
            </div>

            <!-- container bst -->
            <div class="container-fluid mt-4 px-2 mx-2" id="BST">
                <div class="row slideanim ">
                    <div class="col-md-4 col-sm-12 d-flex justify-content-center align-self-center">
                        <h1 class="text-uppercase text-center display-1 fw-bolder ">BST</h2>
                    </div>
                    <div class="col-md-8 col-sm-12 ">
                        <div class="row d-flex justify-content-center align-self-center flex-grow-1">
                            <div class="col-3 flex-grow-1">
                                <img src="img/bst1.jpg" class="img-fluid" alt="vvv">
                                <h2 class="text-center text-uppercase fw-bolder">
                                    Be love
                                </h2>
                            </div>
                            <div class="col-3 flex-grow-1">
                                <img src="img/bst2.jpg" class="img-fluid" alt="">
                                <h2 class="text-center text-uppercase fw-bolder">
                                    Be love
                                </h2>
                            </div>
                            <div class="col-3 flex-grow-1">
                                <img src="img/bst3.jpg" alt="" class="img-fluid">
                                <h2 class="text-center text-uppercase fw-bolder">
                                    Be love
                                </h2>
                            </div>
                        </div>
                        <div class="row mt-3 d-flex justify-content-center align-self-center flex-grow-1 slideanim">
                            <div class="col-3 flex-grow-1">
                                <img src="img/bst4.jpg" alt="" class="img-fluid">
                                <h2 class="text-center text-uppercase fw-bolder">
                                    Be love
                                </h2>
                            </div>
                            <div class="col-3 flex-grow-1">
                                <img src="img/bst5.jpg" alt="" class="img-fluid">
                                <h2 class="text-center text-uppercase fw-bolder">
                                    Be love
                                </h2>
                            </div>
                            <div class="col-3 flex-grow-1">
                                <img src="img/bst6.jpg" alt="" class="img-fluid">
                                <h2 class="text-center text-uppercase fw-bolder">
                                    Be love
                                </h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <script>
            $(".navbar-nav .nav-item a").click(function(e) {
                var href = $(this).attr("href")
                var link = href.substring(1, href.length)
                var name = $(this).data("name");
                var id = $(this).data("id");
                $.ajax({
                    type: "GET",
                    url: "./database/categoryDao.php?type=2&name=" + name + "&id=" + id,
                    dataType: "html",
                    success: function(data) {
                        if (link == "")
                            window.location.href = "http://localhost/Doan"
                        else
                            $("#wrapper").load(link)
                    }
                });

            })
        </script>

    </div>
    <!-- footer  -->
    <div class="container-fluid mt-5 px-0" id="footer">
        <div class="row">
            <div class="col-md-4 sm-12 dieuhuong">
                <ul>
                    <li class="px-2 py-2">Trang chủ</li>
                    <li class="px-2 py-2">Tất cả sản phẩm</li>
                    <li class="px-2 py-2">Nhẫn</li>
                    <li class="px-2 py-2">Vòng</li>
                    <li class="px-2 py-2">Dây chuyền</li>
                    <li class="px-2 py-2">Vòng tay</li>
                    <li class="px-2 py-2">kiềng</li>
                </ul>
            </div>
            <div class="col-md-4 sm-12 thongtinlienhe">
                <ul>
                    <li class="px-2 py-2">
                        Contact us
                    </li>
                    <li class="px-2 py-2">
                        Địa chỉ:640 An Dương Vương quận 5
                    </li>
                </ul>
            </div>
            <div class="col-md-4 sm-12 dichvu">
                <ul>
                    <li class="px-2 py-2">
                        Chính sách & dịch vụ
                    </li>
                    <li class="px-2 py-2">
                        Bảo hành đổi trả trong 15 ngày
                    </li>
                    <li class="px-2 py-2">
                        Miễn phí vận chuyển
                    </li>
                    <li class="px-2 py-2">
                        Trả góp 0% lãi xuất tại cửa hàng
                    </li>
                </ul>
            </div>
        </div>
    </div>


    </div>
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="js/slickslider.js"></script>
    <script src="js/navmenu.js"></script>
    <!-- <script src="js/product.js"></script> -->
    <script src="js/main.js"></script>
    <script src="js/login.js"> </script>
    <script src="js/productBestseller.js"> </script>

</body>

</html>