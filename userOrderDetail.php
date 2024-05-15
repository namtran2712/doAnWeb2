<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chi tiết đơn hàng</title>
    <link rel="stylesheet" href="./css/userOrderDetail.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/cd0f90628a.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <header>
        <nav>
            <button class="back-button">Quay lại</button>
            <p class="idBill" id="idBill">Mã đơn hàng: </p>
        </nav>
    </header>
    <main>
        <div class="modal fade my-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form action="">
                        <div class="modal-header">
                            <h5 class="text-animation text-gradient modal-title" id="myModalLabel">Đánh giá sản phẩm
                            </h5>
                        </div>

                        <div class="modal-body">

                        </div>

                        <div class="modal-footer">

                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="order-progress" id="order-progress">
                <div class="steps-container">
                    <div class="step">
                        <div class="circle-wrapper">
                            <div class="circle active">
                                <i class="fa-solid fa-receipt active"></i>
                            </div>
                            <div class="line" id="first"></div>
                        </div>
                        <span class="step-label">Đơn hàng đã đặt</span>
                        <span class="step-time" id="dateBill">00:00 00/00/0000</span>
                    </div>
                    <div class="step">
                        <div class="circle-wrapper">
                            <div class="circle">
                                <i class="fa-solid fa-money-bills"></i>
                            </div>
                            <div class="line" id="second"></div>
                        </div>
                        <span class="step-label">Đã xác nhận TTTT</span>
                        <span class="step-time" id="confirm_time"></span>
                    </div>
                    <div class="step">
                        <div class="circle-wrapper">
                            <div class="circle">
                                <i class="fa-solid fa-truck"></i>
                            </div>
                            <div class="line" id="third"></div>
                        </div>
                        <span class="step-label">Đã giao cho ĐVVC</span>
                        <span class="step-time" id="shipping_time"></span>
                    </div>
                    <div class="step">
                        <div class="circle-wrapper">
                            <div class="circle">
                                <i class="fa-solid fa-box-archive"></i>
                            </div>
                            <div class="line" id="fourth"></div>
                        </div>
                        <span class="step-label" id="step3-label">Đơn hàng đã hoàn thành</span>
                        <span class="step-time" id="confirm_receive_time"></span>
                    </div>
                    <div class="step">
                        <div class="circle-wrapper">
                            <div class="circle">
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div class="line" id="last"></div>
                        </div>
                        <span class="step-label">Đánh giá</span>
                        <span class="step-time" id="dateRate"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="cancel-info" id="cancel-info">

        </div>
        <div class="feedback" id="feedback">
            <button class="fb-button" id="rate">Đánh giá</button>
            <button class="fb-button" id="rated">Xem đánh giá</button>
            <button class="fb-button" id="receive">Đã nhận hàng</button>
        </div>
        <div class="letter-envelope"></div>
        <div class="delivery-info" id="delivery-info">
        </div>
        <div class="letter-envelope"></div>
        <div class="products">
            <div class="product-info">
                <p class="title">Sản phẩm</p>
                <ul id="list-product">

                </ul>
            </div>
        </div>
        <div class="payment-details">
            <div class="table-column title-column">
                <div class="title">Tổng tiền hàng</div>
                <div class="title">Mã giảm</div>
                <div class="title">Thành tiền</div>
            </div>
            <div class="table-column data-column">
                <div class="data" id="total">000.000.000 đ</div>
                <div class="data" id="discount">-0 đ</div>
                <div class="data" id="total-amount">000.000.000 đ</div>
            </div>
        </div>

        </div>

    </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
    integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous">
</script>

<script src="./js/userOrderDetail.js"></script>

</html>