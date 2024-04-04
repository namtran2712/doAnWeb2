<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" />
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="./css/admin.css"/>
    <link rel="stylesheet" href="./css/reset.css">
    <title>document</title>
</head>

<body>
    
    <div class="sidebar bg-white d-flex flex-column p-3">
        <div class="btn-show-sidebar">
            <i class="fas fa-regular fa-rectangle-xmark"></i>
        </div>

        <ul class="list-group list-group-flush text-uppercase">
            <div class="info-staff d-flex flex-column justify-content-center align-items-center py-2 m-3">
                <img src="./img/icon/staff.jpg" alt="" title="Xem thông tin" class="img-fluid">
                <h4>Trần Nhật Nam</h4>
                <h6>Chức vụ: <span>Nhân viên</span></h6>
            </div>


            <li id="thongKe"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right active">
                <i class="fas fa-regular fa-square-poll-vertical mx-2"></i> Thống kê</a></li>
            <li id="sanPham"><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                <i class="fas fa-duotone fa-ring mx-2"></i> Sản phẩm</a></li>
            <li><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                <i class="fas fa-solid fa-users mx-2"></i> Khách hàng</a></li>
            <li><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                <i class="fas fa-solid fa-user-tie mx-2"></i> Nhân viên</a></li>
            <li><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                <i class="fas fa-solid fa-user mx-2"></i> Tài khoản</a></li>
            <li><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right"> 
                <i class="fas fa-regular fa-money-check mx-2"></i> Hóa đơn</a></li>
            <li><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                <i class="fas fa-regular fa-money-bill-transfer mx-2"></i> Nhập hàng</a></li>
            <li><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-right">
                <i class="fas fa-solid fa-user-gear mx-2"></i> Phân quyền</a></li>
            <li><a href="#" class="list-group-item list-group-item-action py-3 fw-bold fs-7 text-danger text-right">
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
            <div class="crud">
                <div class="create bg-success">
                    <i class="fas fa-regular fa-circle-plus"></i>
                    <span>Thêm</span>
                </div>
                
                <div class="update bg-warning">
                    <i class="fas fa-solid fa-pen-to-square"></i>
                    <span>Sửa</span>
                </div>
                
                <div class="delete bg-danger">
                    <i class="fas fa-regular fa-trash"></i>
                    <span>Xóa</span>
                </div>
            </div>

            <div class="list-item">
                <div class="title row text-center">
                    <!-- <span class="col-sm-1 col-md-1 col-lg-1">ID</span>
                    <span class="col-sm-3 col-md-3 col-lg-3">Tên sản phẩm</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Loại</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Chất liệu</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Hình ảnh</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Size</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Giá</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Hàng tồn</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Đã bán</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Chọn</span> -->
                </div>

                <!-- <div class="item row">

                    <span class="col-sm-1 col-md-1 col-lg-1">1</span>
                    <span class="col-sm-3 col-md-3 col-lg-3">Hoa Tai Bạc Pandora Timeless Đính Đá Tròn Vầng Sáng Halo</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Bông tai</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">Bạc</span>
                    <img src="./img/bongtai/mimg-60.png" alt="" class="col-sm-1 col-md-1 col-lg-1 img-fluid">

                    <select class="col-sm-1 col-md-1 col-lg-1" name="" id="">
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                    </select>

                    <span class="col-sm-1 col-md-1 col-lg-1">6.000.000đ</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">10000</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">20000</span>
                    <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">

                </div> -->
            </div>

            <div class="show-more">
                <button class="btn btn-outline-dark m-2">Xem thêm nội dung</button>
            </div>
        </div>
    </div>

    <script src="./js/admin.js"></script>

</body>

</html>