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
                            <?php
                            include "./database/connect.php";
                            $sql = "select * from category";
                            $result = mysqli_query($connect, $sql);
                            ?>

                                <?php
                                while ($row = mysqli_fetch_assoc($result)) {
                                    echo '<li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="products.php?type=2&category='.$row["CATEGORY_NAME"].'&idCategory='.$row["ID_CATEGORY"] .'">'.$row["CATEGORY_NAME"].'</a>
                                </li>';
                                }
                                ?>

                           
                        </ul>
                    </div>
                </div>
                <div class="navbar-right d-flex align-items-center justify-content-end">
                    <form class="d-flex formSearch" role="search">
                        <input class="form-control py-2 px-5 " size="25" type="search" placeholder="Search" aria-label="Search" id="search-bar">
                        <div class="iconForSearchBar mb-2 ">
                            <i class="fa-solid fa-magnifying-glass px-2 py-2"></i>
                        </div>
                    </form>
                    <a href="" data-toggle="modal" data-target=".my-modal" class="btn-login btn btn-success mx-2">Login</a>
                    <div class="cart">
                        <i class="fa-solid fa-cart-shopping fs-3"></i>
                        <span>
                            <?php
                            if (isset($_SESSION["accountCurrent"])) {
                                $idAccount = $_SESSION["accountCurrent"]["idAccount"];
                                $sql = "SELECT COUNT(PARTICULAR_CART.ID_CART)
                                    FROM PARTICULAR_CART JOIN CART
                                    ON PARTICULAR_CART.ID_CART = CART.ID_CART
                                    WHERE CART.ID_ACCOUNT = $idAccount";
                                $result = mysqli_query($connect, $sql);
                                if (mysqli_num_rows($result) > 0) {
                                    while ($row = mysqli_fetch_assoc($result)) {
                                        echo $row["COUNT(PARTICULAR_CART.ID_CART)"];
                                    }
                                }
                            }
                            ?>
                        </span>
                    </div>
                </div>
            </div>
            <!-- empty-div -->
            <div class="borderbottom">

            </div>

        </nav>