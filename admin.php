<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- css -->
    <link rel="stylesheet" href="./css/admin.css" />
    <link rel="stylesheet" href="./css/reset.css">
    <title>document</title>
</head>

<body>

    <div class="sidebar toggle bg-white d-flex flex-column p-3">
        <div class="btn-show-sidebar">
            <i class="fas fa-regular fa-rectangle-xmark"></i>
        </div>

        <ul class="list-group list-group-flush text-uppercase">
            <div class="info-staff d-flex flex-column justify-content-center align-items-center py-2 m-3">
                <img src="./img/icon/staff.jpg" alt="" title="Xem thông tin" class="img-fluid">
                <h4>Trần Nhật Nam</h4>
                <h6>Chức vụ: <span>Nhân viên</span></h6>
            </div>

            <li id="thongKe"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                    <i class="fas fa-regular fa-square-poll-vertical mx-2"></i> Thống kê</a></li>
            <li id="sanPham"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                    <i class="fas fa-duotone fa-ring mx-2"></i> Sản phẩm</a></li>
            <li id="khachHang"><a href="#"
                    class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right active">
                    <i class="fas fa-solid fa-users mx-2"></i> Khách hàng</a></li>
            <li id="nhanVien"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                    <i class="fas fa-solid fa-user-tie mx-2"></i> Nhân viên</a></li>
            <li id="taiKhoan"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                    <i class="fas fa-solid fa-user mx-2"></i> Tài khoản</a></li>
            <li id="hoaDon"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                    <i class="fas fa-regular fa-money-check mx-2"></i> Hóa đơn</a></li>
            <li id="nhapHang"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                    <i class="fas fa-regular fa-money-bill-transfer mx-2"></i> Nhập hàng</a></li>
            <li id="phanQuyen"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                    <i class="fas fa-solid fa-user-gear mx-2"></i> Phân quyền</a></li>
            <li id="logout"><a href="#"
                    class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-danger text-right">
                    <i class="fas fa-solid fa-right-from-bracket mx-2"></i> Đăng xuất</a></li>
        </ul>

    </div>

    <div class="container-fluid">
        <div class="header d-flex justify-content-center align-items-center">
            <div class="btn-show-sidebar">
                <i class="fas fa-solid fa-bars bg-white p-2"></i>
            </div>
            <img src="./img/vongtay/mimg-40.png" alt="" class="img-fluid">
        </div>

        <div class="content">

            <div class="modal fade my-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="myModalLabel">Sửa thông tin</h5>
                        </div>

                        <div class="modal-body">

                        </div>

                        <div class="modal-footer">
                            <button class="btn btn-primary">Sửa</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="crud">
                <div class="create bg-success">
                    <i class="fas fa-regular fa-circle-plus"></i>
                    <span>Thêm</span>
                </div>

                <div class="update bg-warning" data-toggle="modal" data-target=".my-modal">
                    <i class="fas fa-solid fa-pen-to-square"></i> <span>Sửa</span>
                </div>

                <div class="delete bg-danger">
                    <i class="fas fa-regular fa-trash"></i>
                    <span>Xóa</span>
                </div>
            </div>

            <div class="list-item">
                <div class="title row text-center">

                </div>
            </div>

            <div class="show-more">

            </div>
        </div>
    </div>

    <!-- js -->
    <script src="./js/admin.js"></script>
    <script src="./js/updateData.js"></script>


    <!-- js bootstrap -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js"
        integrity="sha512-ykZ1QQr0Jy/4ZkvKuqWn4iF3lqPZyij9iRv6sGqLRdTPkY69YX6+7wvVGmsdBbiIfN/8OdsI7HABjvEok6ZopQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</body>

</html>
