<?php
    // session_start();
    include 'database/connect.php';
    if(!isset($_SESSION['totalReceipt']))
    {
        $_SESSION['totalReceipt']=0;
    }
    $_SESSION['account']['id']=1;
    $sql="SELECT * 
    FROM PRODUCTS";
    $result=mysqli_query($connect,$sql);
    if(mysqli_num_rows($result)>0)
    {
        $product=[];
        while($row=mysqli_fetch_assoc($result))
        {
            $product[]=$row;
        }
    }

?>

<div class="container-fluid d-flex justify-content-center my-4">
   <div class="container-fluid row my-2 title-receipt">
        <div class="col-sm-4 col-md-4 col-lg-4 list-product-receipt">
            <h3 class=" container-fluid text-center text-success fw-bold my-2">Danh sách sản phẩm</h3>
            <div class="container-fluid my-3 row d-flex justify-content-center">

                <div class="container-fluid header-list-product row">
                    <div class="col-sm-2 col-md-2 col-lg-2 text-center"><span class=" fs-5 fw-bold">Mã</span></div>
                    <div class="col-sm-9 col-md-9 col-lg-9 text-center"><span class=" fs-5 fw-bold">Tên sản phẩm</span></div>
                </div>

                <?php  foreach ($product as $key => $value) {?>
                <div class="container-fluid item-product-receipt row">
                    <div class="col-sm-2 col-md-2 col-lg-2 my-2 d-flex align-items-center justify-content-center"><span class=" fs-6 "></span><?php echo $value['ID_PRODUCT']?></div>
                    <div class="col-sm-10 col-md-10 col-lg-10 d-flex align-items-center my-2"><span class="text-right fs-6 name-product-item" data-id=<?php echo $value['ID_PRODUCT']?>><?php echo $value['PRODUCT_NAME']?></span></div>
                </div>
                <?php }?>

            </div>
        </div>

        <div class="col-sm-4 col-md-4 col-lg-4 in4-product">
            <h3 class="container-fluid text-center text-warning fw-bold my-2">Thông tin sản phẩm</h3>
            <form class="my-4">
                <div class="form-row container-fluid row">
                    <div class="form-group col-md-3">
                    <label for="in4-idProduct">ID</label>
                    <input type="text" class="form-control my-2 bg-white" id="in4-idProduct" readonly>
                    </div>
                    <div class="form-group col-md-9">
                    <label for="in4-nameProduct">Tên sản phẩm</label>
                    <input type="text" class="form-control my-2 bg-white" id="in4-nameProduct" readonly>
                    </div>
                </div>
                <div class="form-row container-fluid row">
                    <div class="form-group col-md-6">
                        <label for="in4-categoryProduct">Loại</label>
                        <input type="text" class="form-control my-2 bg-white" id="in4-categoryProduct" readonly>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="in4-materialProduct">Chất liệu</label>
                        <input type="text" class="form-control my-2 bg-white" id="in4-materialProduct" readonly>
                    </div>
                </div>
                <div class="form-row container-fluid row">
                    <div class="form-group col-md-6">
                        <label for="in4-sizeProduct">Size</label>
                        <select id="in4-sizeProduct" class="form-control my-2">
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="in4-priceProduct">Giá</label>
                        <input type="text" class="form-control my-2 bg-white" id="in4-priceProduct" readonly>
                    </div>
                </div>
                <div class="form-row container-fluid row">
                    <div class="form-group col-md-6">
                        <label for="in4-quantityRemainProduct">Số lượng còn</label>
                        <input type="text" class="form-control my-2 bg-white" id="in4-quantityRemainProduct" readonly>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="in4-quantityReceiptProduct">Số lượng nhập</label>
                        <input type="text" class="form-control my-2 text-center" id="in4-quantityReceiptProduct" required>
                    </div>
                </div>
                <div class="container-fluid d-flex justify-content-center">
                    <button type="submit" class="btn btn-warning my-5 add-item-receipt">Nhập sản phẩm</button>
                </div>
            </form>
        </div>

        <div class="col-sm-4 col-md-4 col-lg-4 list-receipt">
            <h3 class="container-fluid text-center text-danger fw-bold my-2">Danh sách nhập hàng</h3>
            <div class="container-fluid my-3 row d-flex justify-content-center">
                <div class="container-fluid header-list-receipt row my-2">
                    <div class="col-sm-6 col-md-7 col-lg-7 text-center"><span class=" fs-6 fw-bold">Tên sản phẩm</span></div>
                    <div class="col-sm-2 col-md-1 col-lg-1 text-center"><span class=" fs-6 fw-bold">Size</span></div>
                    <div class="col-sm-2 col-md-2 col-lg-2 text-center"><span class=" fs-6 fw-bold">Giá</span></div>
                    <div class="col-sm-2 col-md-2 col-lg-2 text-center"><span class=" fs-6 fw-bold">Sl</span></div>
                </div>
                <div class="container-fluid list-item-receipt">

                </div>

                <div class="container-fluid mt-3">
                    <span class="fs-4">Tổng tiền :</span>
                    <span class="fs-4 text-danger fw-bold total-receipt"></span>
                </div>
                <div class="container-fluid mt-4 d-flex justify-content-center">
                    <button class="btn btn-danger add-receipt">Nhập hàng</button>
                </div>
                </div>
            </div>
        </div>
   </div>
   <script src="js/nhapHang.js"></script>
</div>
