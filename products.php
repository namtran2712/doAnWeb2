<?php
$header = '<div class="container-fluid">

     <!-- start navbar -->
     <nav class="navbar bg-body-tertiary fixed-top navbar-expand-lg scroll ">
         <div class="container-fluid">
             <div class="navLogo d-flex">
                 <button class="navbar-toggler me-sm-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>
                 <a class="navbar-brand" href="#">
                     <h3>logo</h3>
                 </a>
             </div>

             <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                 <div class="offcanvas-header">
                     <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                     <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                 </div>
                 <div class="offcanvas-body">
                     <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                         <li class="nav-item">
                             <a class="nav-link active" aria-current="page" href="#">Trang chủ</a>
                         </li>
                         <li class="nav-item mx-lg-2"><a href="" class="nav-link">Nhẫn</a></li>
                         <li class="nav-item mx-lg-2"><a href="" class="nav-link">Vòng</a></li>
                         <li class="nav-item mx-lg-2"><a href="" class="nav-link">Kiềng</a></li>
                         <li class="nav-item mx-lg-2"><a href="" class="nav-link">Khuyên tai</a></li>
                         <li class="nav-item mx-lg-2"><a href="" class="nav-link">Dây chuyền</a></li>
                     </ul>

                 </div>
             </div>
             <div class="navbar-right d-flex  justify-content-end">
                 <form class="d-flex formSearch" role="search">
                     <input class="form-control py-2 px-5 " size="25" type="search" placeholder="Search" aria-label="Search" id="search-bar">
                     <div class="iconForSearchBar mb-2 ">
                         <i class="fa-solid fa-magnifying-glass px-2 py-2"></i>
                     </div>

                 </form>
                 <a href="" class="btn-login btn btn-success mx-2">Login</a>
             </div>
         </div>
         <!-- empty-div -->
         <div class="borderbottom">

         </div>

     </nav>
     <!-- end navbar -->
 </div>'
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/header.css">


    <!-- boostrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

    <!-- font awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- css -->
    <link rel="stylesheet" href="./css/product.css">
    <link rel="stylesheet" href="./css/reset.css">
</head>

<body>
    <div class="wrapper">
        
        <div class="container-fluid show-product">
            <ul class="row list-product">

            </ul>

            <div class="group-btn-page">
                <i class="fa-solid fa-circle-left go-previous"></i>
                <input type="text" value="1" name="current-page" id="current-page">
                <i class="fa-solid fa-circle-right go-next"></i>
            </div>
        </div>
    </div>
    <script src="./js/paging.js"></script>

</body>

</html>