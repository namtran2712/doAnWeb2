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
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

</head>

<body>
    <!-- container holder navbar -->
    <div class="container-fluid">

        <!-- start navbar -->
     <?php include ("navbar.php") ?>
        <!-- end navbar -->
    </div>
    <!-- container holder banner -->
    <div id="wrapper" class="bg-gray container-fluid">
        <script>
            $(".navbar-nav .nav-item a").click(function(e){
                var href = $(this).attr ("href")
                var link =href.substring (1,href.length)
                var name = $(this).data("name");
                var id = $(this).data("id");
                console.log (name)
                console.log (id)
                $.ajax({
                    type: "GET",
                    url: "./database/categoryDao.php?type=2&name=" + name +"&id=" +id,
                    dataType: "html",
                    success: function (data) {
                        // console.log (data)
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
</body>

</html>