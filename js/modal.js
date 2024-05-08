$(document).ready(function () {
    function modalUser(fullname, phoneNumber, birthday) {
        var modal = `
        <div class="container-fluid">
            <form action="">
                <div class="form-group">
                    <div class="title-text">
                        <label for="full-name">Tên người dùng</label>
                    </div>
                    <div class="input-text">
                        <input type="text" name="full-name" id="full-name" class="form-control" value="${fullname}">
                        <i class="fa-solid fa-user"></i>
                    </div>
                </div>

                <div class="form-group">
                    <div class="title-text">
                        <label for="phone-number">Số điện thoại</label>
                    </div>
                    <div class="input-text">
                        <input type="text" name="phone-number" id="phone-number" class="form-control" value="${phoneNumber}">
                        <i class="fa-solid fa-phone"></i>
                    </div>
                </div>

                <div class="form-group">
                    <div class="title-text">
                        <label for="birthday">Ngày sinh</label>
                    </div>
                    <div class="input-text">
                        <input type="date" name="birthday" id="birthday" class="form-control" value="${birthday}">
                    </div>
                </div>

            </form>
        </div>
        `

        return modal;
    }

    function modalUserAdd() {
        return new Promise(function (resolve, reject) {
            $.when(
                $.ajax({
                    type: "GET",
                    url: "./database/authoriesDao.php?type=2",
                    dataType: "json"
                })
            ).done(function (data) {
                var modal = `
                <div class="container-fluid">
                    <form action="">
                        <div class="form-group">
                            <div class="title-text">
                                <label for="full-name">Tên người dùng</label>
                            </div>
                            <div class="input-text">
                                <input type="text" name="full-name" id="full-name" class="form-control">
                            </div>
                        </div>
        
                        <div class="form-group">
                            <div class="title-text">
                                <label for="phone-number">Số điện thoại</label>
                            </div>
                            <div class="input-text">
                                <input type="text" name="phone-number" id="phone-number" class="form-control">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                        </div>
        
                        <div class="form-group">
                            <div class="title-text">
                                <label for="birthday">Ngày sinh</label>
                            </div>
                            <div class="input-text">
                                <input type="date" name="birthday" id="birthday" class="form-control">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="title-text">
                                <label for="username">Tên đăng nhập</label>
                            </div>
                            <div class="input-text">
                                <input type="text" name="username" id="username" class="form-control">
                                <i class="fa-solid fa-user"></i>
                            </div>
                        </div>
        
                        <div class="form-group">
                            <div class="title-text">
                                <label for="password">Mật khẩu</label>
                            </div>
                            <div class="input-text">
                                <input type="password" name="password" id="password" class="form-control">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                        </div>
        
                        <div class="form-group">
                            <div class="title-text">
                                <label for="author">Quyền hạn</label>
                            </div>
                            <div class="input-text">
                                <select name="author" class="form-control" id="author">
                `
                $.each(data, function (i, val) {
                    var tmp = `
                    <option value="${val["ID_AUTHORIZE"]}">${val["AUTHORIZE_NAME"]}</option>
                    `;
                    if (i == data.length - 1) {
                        modal += tmp;
                        modal += `
                                        </select>
                                        <i class="fa-solid fa-hat-cowboy"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                        `
                    }
                    else {
                        modal += tmp;
                    }
                });
                resolve(modal)
            })
        })
    }

    function modalProduct(id) {
        return new Promise((resolve, reject) => {
            $.when(
                $.ajax({
                    type: "GET",
                    url: "./database/productDao.php?id=" + id + "&type=1",
                    dataType: "json"
                }),
                $.ajax({
                    type: "GET",
                    url: "./database/materialDao.php?type=1",
                    dataType: "json"
                }),
                $.ajax({
                    type: "GET",
                    url: "./database/categoryDao.php?type=1",
                    dataType: "json"
                })
            ).done(function (dataProduct, dataMaterial, dataCategory) {
                var bodyName = `
                <div class="container-fluid">
                        <form action="" class="row" enctype="multipart/form-data">
    
                            <div class="form-group-product col-sm-12 col-md-12 col-lg-12">
                                <label for="product-name">Tên sản phẩm</label>
                                <input type="text" name="product-name" id="product-name" class="form-control" value="${dataProduct[0]["product"]["PRODUCT_NAME"]}">
                            </div>
                `
                var bodyCate = `
                <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <label for="category-product">Loại</label>
                        <select name="category-product" id="category-product">
                `

                $.each(dataCategory[0], function (i, val) {
                    var tmp;
                    if (i == dataCategory[0].length - 1) {
                        if (dataProduct[0]["product"]["ID_CATEGORY"] == val["ID_CATEGORY"]) {
                            tmp = `
                                <option value="${val["ID_CATEGORY"]}" selected>${val["CATEGORY_NAME"]}</option>
                            </select>
                        </div>
                        `
                        }
                        else {
                            tmp = `
                                    <option value="${val["ID_CATEGORY"]}">${val["CATEGORY_NAME"]}</option>
                                </select>
                            </div>
                            `
                        }
                        bodyCate += tmp
                    }
                    else {
                        if (dataProduct[0]["product"]["ID_CATEGORY"] == val["ID_CATEGORY"]) {
                            tmp = `
                                <option value="${val["ID_CATEGORY"]}" selected>${val["CATEGORY_NAME"]}</option>
                            `
                        }
                        else {
                            tmp = `
                                <option value="${val["ID_CATEGORY"]}">${val["CATEGORY_NAME"]}</option>
                            `
                        }
                        bodyCate += tmp
                    }
                });

                var bodyMater = `
                <div class="col-sm-6 col-md-6 col-lg-6">
                    <label for="material-product">Chất liệu</label>
                    <select name="material-product" id="material-product">
                `

                $.each(dataMaterial[0], function (i, val) {
                    var tmp;
                    if (i == dataMaterial[0].length - 1) {
                        if (dataProduct[0]["product"]["ID_MATERIAL"] == val["ID_MATERIAL"]) {
                            tmp = `
                                        <option value="${val["ID_MATERIAL"]}" selected>${val["MATERIAL_NAME"]}</option>
                                    </select>
                                </div>
                            </div>
                            `
                        }
                        else {
                            tmp = `
                                        <option value="${val["ID_MATERIAL"]}">${val["MATERIAL_NAME"]}</option>
                                    </select>
                                </div>
                            </div>
                            `
                        }
                        bodyMater += tmp
                    }
                    else {
                        if (dataProduct[0]["product"]["ID_MATERIAL"] == val["ID_MATERIAL"]) {
                            tmp = `
                                <option value="${val["ID_MATERIAL"]}" selected>${val["MATERIAL_NAME"]}</option>
                            `
                        }
                        else {
                            tmp = `
                                <option value="${val["ID_MATERIAL"]}">${val["MATERIAL_NAME"]}</option>
                            `
                        }
                        bodyMater += tmp
                    }
                });

                var bodySize = `
                            <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                                <div class="col-sm-4 col-md-4 col-lg-4">
                                    <label for="size-product">Kích cỡ</label>
                                    <select name="size-product" id="size-product">
                `
                $.each(dataProduct[0]["particular"], function (i, val) {
                    if (i == dataProduct[0]["particular"].length - 1) {
                        var tmp = `
                                <option value="${val["PRICE"]}" data-remain="${val["QUANTITY_REMAIN"]}" selected>${val["SIZE"]}</option>
                            </select>
                        </div>
                        `
                        bodySize += tmp
                    }
                    else {
                        var tmp = `
                            <option value="${val["PRICE"]}" data-remain="${val["QUANTITY_REMAIN"]}">${val["SIZE"]}</option>
                        `
                        bodySize += tmp
                    }
                });

                var bodyPrice = `
                    <div class="col-sm-2 col-md-2 col-lg-2">
                        <i class="add-size fa-solid fa-circle-plus"></i>
                        <i class="delete-size fa-solid fa-circle-minus"></i>
                        <input type="text" inputmode="numeric" name="add-size" id="add-size" class="form-control" style="display:none">
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <label for="price-product">Giá</label>
                        <input type="text" name="price-product" id="price-product" value="${dataProduct[0]["product"]["PRICE"]}"
                            class="form-control">
                    </div>
                </div>
    
                <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <label for="remain-product">Còn lại</label>
                        <input type="text" name="remain-product" id="remain-product"
                            class="form-control" value="${dataProduct[0]["product"]["QUANTITY_REMAIN"]}">
                    </div>
    
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <label for="sold-product">Đã bán</label>
                        <input type="text" name="sold-product" id="sold-product"
                            class="form-control" value="${dataProduct[0]["product"]["QUANTITY_SOLD"]}">
                    </div>
                </div>
                `
                var bodyImage = `
                <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                    <button type="button"
                        class="btn col-sm-12 col-md-12 col-lg-12 btn-md btn-primary">
                        Ảnh chính
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <div class="img col-sm-12 col-md-12 col-lg-12">
                        <img src="${dataProduct[0]["product"]["MAIN_IMAGE"]}" class="img-fluid" alt="">
                        <input type="file" name="update-img" class="form-control update-img" accept="image/*">
                        <button type="button" class="btn btn-danger delete-img">Xóa ảnh</button>
                    </div>
                </div>
                `
                $.each(dataProduct[0]["img"], function (i, val) {
                    if (i == dataProduct[0]["img"].length - 1) {
                        var tmp = `
                                <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                                    <button type="button"
                                        class="btn col-sm-12 col-md-12 col-lg-12 btn-md btn-primary">
                                        Ảnh ${i + 1}
                                        <i class="fa-solid fa-chevron-down"></i>
                                    </button>
    
                                    <div class="img col-sm-12 col-md-12 col-lg-12">
                                        <img src="${val["LINK_IMAGE"]}" class="img-fluid" alt="">
                                        <input type="file" name="update-img" class="update-img form-control" accept="image/*">
                                        <button type="button" class="btn btn-danger delete-img">Xóa ảnh</button>
                                    </div>
                                </div>
                                <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                                    <button type="button" class="btn btn-success add-img">Thêm ảnh mới</button>
                                    <input type="file" name="update-img" class="form-control" accept="image/*" style="display: none;">
                                </div>
                            </form>
                        </div>
                        `
                        bodyImage += tmp
                    }
                    else {
                        var tmp = `
                        <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                            <button type="button"
                                class="btn col-sm-12 col-md-12 col-lg-12 btn-md btn-primary">
                                Ảnh ${i + 1}
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
    
                            <div class="img col-sm-12 col-md-12 col-lg-12">
                                <img src="${val["LINK_IMAGE"]}" class="img-fluid" alt="">
                                <input type="file" name="update-img" class="form-control update-img" accept="image/*">
                                <button type="button" class="btn btn-danger delete-img">Xóa ảnh</button>
                            </div>
                        </div>
                        `
                        bodyImage += tmp
                    }
                });
                var modal = bodyName + bodyCate + bodyMater + bodySize + bodyPrice + bodyImage;
                resolve(modal)
            })
        })
    }

    function modalProductAdd() {
        return new Promise(function (resolve, reject) {
            $.when(
                $.ajax({
                    type: "GET",
                    url: "./database/materialDao.php?type=1",
                    dataType: "json"
                }),
                $.ajax({
                    type: "GET",
                    url: "./database/categoryDao.php?type=1",
                    dataType: "json"
                })
            ).done(function (dataMaterial, dataCategory) {
                var bodyHead = `
                <div class="container-fluid">
                        <form action="" class="row" enctype="multipart/form-data">
    
                            <div class="form-group-product col-sm-12 col-md-12 col-lg-12">
                                <label for="product-name">Tên sản phẩm</label>
                                <input type="text" name="product-name" id="product-name" class="form-control">
                            </div>
                <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <label for="category-product">Loại</label>
                        <select name="category-product" id="category-product">
                `

                $.each(dataCategory[0], function (i, val) {
                    var tmp;
                    if (i == dataCategory[0].length - 1) {
                        tmp = `
                                <option value="${val["ID_CATEGORY"]}">${val["CATEGORY_NAME"]}</option>
                            </select>
                        </div>
                        `
                        bodyHead += tmp
                    }
                    else {
                        tmp = `
                                <option value="${val["ID_CATEGORY"]}">${val["CATEGORY_NAME"]}</option>
                            `
                        bodyHead += tmp
                    }
                });

                var bodyMater = `
                <div class="col-sm-6 col-md-6 col-lg-6">
                    <label for="material-product">Chất liệu</label>
                    <select name="material-product" id="material-product">
                `

                $.each(dataMaterial[0], function (i, val) {
                    var tmp;
                    if (i == dataMaterial[0].length - 1) {

                        tmp = `
                                    <option value="${val["ID_MATERIAL"]}">${val["MATERIAL_NAME"]}</option>
                                </select>
                            </div>
                        </div>
                        `
                        bodyMater += tmp
                    }
                    else {
                        tmp = `
                            <option value="${val["ID_MATERIAL"]}">${val["MATERIAL_NAME"]}</option>
                        `
                        bodyMater += tmp
                    }
                });

                var bodySize = `
                    <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <label for="size-product">Kích cỡ</label>
                            <select name="size-product" id="size-product">
                            </select>
                        </div>
                `
                var bodyPrice = `
                    <div class="col-sm-2 col-md-2 col-lg-2">
                        <i class="add-size fa-solid fa-circle-plus"></i>
                        <i class="delete-size fa-solid fa-circle-minus"></i>
                        <input type="text" inputmode="numeric" name="add-size" id="add-size" class="form-control" style="display:none">
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <label for="price-product">Giá</label>
                        <input type="text" name="price-product" id="price-product"
                            class="form-control">
                    </div>
                </div>
    
                <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <label for="remain-product">Còn lại</label>
                        <input type="text" name="remain-product" id="remain-product"
                            class="form-control">
                    </div>
    
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <label for="sold-product">Đã bán</label>
                        <input type="text" name="sold-product" id="sold-product"
                            class="form-control">
                    </div>
                </div>
                `

                bodyTail = `
                <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                                    <button type="button" class="btn btn-success add-img">Thêm ảnh mới</button>
                                    <input type="file" name="update-img" class="form-control" accept="image/*" style="display: none;">
                                </div>
                            </form>
                        </div>
                `
                var modal = bodyHead + bodyMater + bodySize + bodyPrice + bodyTail;
                resolve(modal)
            })
        })
    }

    function modalAccount(id) {
        return new Promise(function (resolve, reject) {
            $.when(
                $.ajax({
                    type: "POST",
                    url: "./database/accountDao.php?type=6",
                    data: {
                        id: id
                    },
                    dataType: "json",
                }),
                $.ajax({
                    type: "GET",
                    url: "./database/authoriesDao.php?type=2",
                    dataType: "json",
                })
            ).done(function (dataAccount, dataAuthor) {
                console.log(dataAccount)
                console.log(dataAuthor[0])

                var statusAccount;
                var backgroundStatus;
                if (dataAccount[0][0]["STATUS_ACCOUNT"] == 1) {
                    statusAccount = "Được hoạt động"
                    backgroundStatus = "btn-success"
                }
                else {
                    statusAccount = "Khóa hoạt động"
                    backgroundStatus = "btn-danger"
                }

                var modal = `
                <div class="container-fluid">
                    <form action="" class="row">
                        <div class="form-group-product col-md-12 col-sm-12 col-lg-12 row">
                            <label for="username">Tên đăng nhập</label>
                            <input type="text" class="form-control" name="username" id="username" value="${dataAccount[0][0]["USERNAME"]}" readonly>
                        </div>

                        <div class="form-group-product col-md-12 col-sm-12 col-lg-12 row">
                            <label for="password">Mật khẩu</label>
                            <input type="text" class="form-control" name="password" id="password" value="${dataAccount[0][0]["PASS_WORD"]}">
                        </div>
                `
                var bodyAuthor = ` 
                        <div class="form-group-product col-md-12 col-sm-12 col-lg-12 row">
                            <div class="col-md-6 col-sm-6 col-lg-6">
                                <label for="author">Vai trò</label>
                                <select name="author" id="author">
                `
                $.each(dataAuthor[0], function (i, val) {
                    var tmp1 = `<option value="${val["ID_AUTHORIZE"]}">${val["AUTHORIZE_NAME"]}</option>`
                    var tmp2 = `<option value="${val["ID_AUTHORIZE"]}" selected>${val["AUTHORIZE_NAME"]}</option>`
                    if (i == dataAuthor[0].length - 1) {
                        if (val["ID_AUTHORIZE"] == dataAccount[0][0]["ID_AUTHORIZE"]) {
                            bodyAuthor += tmp2
                        }
                        else {
                            bodyAuthor += tmp1
                        }
                        bodyAuthor += `
                            </select>
                        </div>
                        `
                    }
                    else {
                        if (val["ID_AUTHORIZE"] == dataAccount[0][0]["ID_AUTHORIZE"]) {
                            bodyAuthor += tmp2
                        }
                        else {
                            bodyAuthor += tmp1
                        }
                    }
                });

                var bodyStatus = `
                            <div class="col-md-6 col-sm-6 col-lg-6">
                                <label for="author">Trạng thái</label>
                                <button class="btn status-account ${backgroundStatus}" data-status=${dataAccount[0][0]["STATUS_ACCOUNT"]}>
                                    ${statusAccount}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                `;
                modal += bodyAuthor + bodyStatus;
                resolve(modal)
            })
        })
    }

    function modalFormLogin() {
        var modal = `
        <div class="form-group">
            <input type="text" name="username" id="username" placeholder="Tên đăng nhập" required
                class="form-control">
            <i class="fa-solid fa-user"></i>
        </div>
        <div class="form-group">
            <input type="password" name="password" id="password" placeholder="Mật khẩu" required
                class="form-control">
            <i class="fa-solid fa-lock"></i>
        </div>
        `
        return modal;
    }

    function modalFormRegister() {
        var modal = `
        <div class="form-group">
            <input type="text" name="fullname" id="fullname" placeholder="Họ và tên" required
                class="form-control">
        </div>

        <div class="form-group">
            <input type="text" name="phone-number" id="phone-number" placeholder="Số điện thoại"
                required class="form-control">
            <i class="fa-solid fa-phone"></i>
        </div>

        <div class="form-group">
            <input type="date" name="birthday" id="birthday" placeholder="Ngày sinh" required
                class="form-control">
            <i class="fa-solid fa-cake-candles"></i>
        </div>

        <div class="form-group">
            <input type="text" name="username" id="username" placeholder="Tên đăng nhập" required
                class="form-control">
            <i class="fa-solid fa-user"></i>
        </div>

        <div class="form-group">
            <input type="password" name="password" id="password" placeholder="Mật khẩu" required
                class="form-control">
            <i class="fa-solid fa-lock"></i>
        </div>
        `;
        return modal;
    }

    function modalReceiptsParticular (id) {
        return new Promise (function (resolve, reject) {
            $.when (
                $.ajax({
                    type: "GET",
                    url: "./database/receiptDao.php?type=1&id="+id,
                    dataType: "json",
                })
            ).done (function (data) {
                var modal = `
                <div class="container-fluid header-list-receipt row my-2">
                    <div class="col-sm-6 col-md-7 col-lg-9 text-center"><span class=" fs-6 fw-bold">Tên sản phẩm</span></div>
                    <div class="col-sm-2 col-md-1 col-lg-1 text-center"><span class=" fs-6 fw-bold">Size</span></div>
                    <div class="col-sm-2 col-md-2 col-lg-1 text-center"><span class=" fs-6 fw-bold">Giá</span></div>
                    <div class="col-sm-2 col-md-2 col-lg-1 text-center"><span class=" fs-6 fw-bold">Số lượng</span></div>
                </div>
                `
                $.each(data, function (i, val) { 
                    tmp = `
                    <div class="container-fluid item-receipt row py-2">
                        <div class="col-sm-6 col-md-7 col-lg-9 text-right"><span class=" fs-6 ">${val["PRODUCT_NAME"]}</span></div>
                        <div class="col-sm-2 col-md-1 col-lg-1 text-left d-flex align-items-center justify-content-center"><span class=" fs-6 ">${val["SIZE"]}</span></div>
                        <div class="col-sm-2 col-md-2 col-lg-1 text-left d-flex align-items-center justify-content-center"><span class=" fs-6 ">${val["PRICE"]}</span></div>
                        <div class="col-sm-1 col-md-1 col-lg-1 text-left d-flex align-items-center justify-content-center"><span class=" fs-6 ">${val["QUANTITY"]}</span></div>
                    </div>
                    `
                    modal += tmp
                });
                resolve (modal)                    
            })
        })
    }

    function modalAddAu()
    {
        return new Promise(function(resolve,reject)
        {
            $.when(
                $.ajax({
                    type: "GET",
                    url: "./database/authoriesDao.php?type=9",
                    dataType: "json",
                })
            ).done(function(data)
            {
                var modalHead=`
                <div class="container-fluid row">
                    <div class="form-row container-fluid row my-3">
                        <div class="form-group col-md-12">
                        <label for="nameAu">Tên Nhóm quyền</label>
                        <input type="text" class="form-control my-2 bg-white mb-5" id="nameAu" >
                        </div>
                    </div>
                        <div class="col-sm-3 col-md-3 col-lg-3 fs-5 text-primary"></div>
                        <div class="col-sm-2 col-md-2 col-lg-2 fs-5 text-primary text-center">Create</div>
                        <div class="col-sm-2 col-md-2 col-lg-2 fs-5 text-primary  text-center">Update</div>
                        <div class="col-sm-2 col-md-2 col-lg-2 fs-5 text-primary text-center">Detele</div>
                        <div class="col-sm-2 col-md-2 col-lg-2 fs-5 text-primary text-center">Readonly</div>
                    `
                    var modalTail=''
                    $.each(data, function (i, val) { 
                     var tmp=
                     `
                            <div class="col-sm-3 col-md-3 col-lg-3 fs-5 text-primary text-right py-1">${val['TASK_NAME']}</div>
                            <div class="check__box col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center py-1"><input type="checkbox" data-task=${val['ID_TASK']} data-action=1></input></div>
                            <div class="check__box col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center py-1"><input type="checkbox" data-task=${val['ID_TASK']} data-action=2></input></div>
                            <div class="check__box col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center py-1"><input type="checkbox" data-task=${val['ID_TASK']} data-action=3></input></div>
                            <div class="check__box col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center py-1"><input type="checkbox" data-task=${val['ID_TASK']} data-action=4></input></div>
                     `
                    modalTail+=tmp
                });
                modalTail+="</div>"
                var modal=modalHead+modalTail
                resolve(modal)
            })
        })
    }
    function modalUpAu(id)
    {
        return new Promise(function(resolve,reject)
        {
            $.when(
                $.ajax({
                    type: "GET",
                    url: "./database/authoriesDao.php?type=9",
                    dataType: "json",
                }),
                $.ajax({
                    type: "GET",
                    url: "./database/authoriesDao.php?type=12&id="+id,
                    dataType: "json",
                })
            ).done(function(listTask,Au)
            {
                var modalHead=`
                <div class="container-fluid row">
                    <div class="form-row container-fluid row my-3">
                        <div class="form-group col-md-12">
                        <label for="nameAu">Tên Nhóm quyền</label>
                        <input type="text" class="form-control my-2 bg-white mb-5" id="nameAu" value="${Au[0]['AUTHORIZE_NAME']}">
                        </div>
                    </div>
                        <div class="col-sm-3 col-md-3 col-lg-3 fs-5 text-primary"></div>
                        <div class="col-sm-2 col-md-2 col-lg-2 fs-5 text-primary text-center">Create</div>
                        <div class="col-sm-2 col-md-2 col-lg-2 fs-5 text-primary  text-center">Update</div>
                        <div class="col-sm-2 col-md-2 col-lg-2 fs-5 text-primary text-center">Detele</div>
                        <div class="col-sm-2 col-md-2 col-lg-2 fs-5 text-primary text-center">Readonly</div>
                    `
                    var modalTail=''
                    $.each(listTask[0], function (i, val) {
                     var tmp=
                     `
                            <div class="col-sm-3 col-md-3 col-lg-3 fs-5 text-primary text-right py-1">${val['TASK_NAME']}</div>
                            <div class="check__box col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center py-1"><input type="checkbox" id="${val['ID_TASK']}-1"  data-task=${val['ID_TASK']} data-action=1></input></div>
                            <div class="check__box col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center py-1"><input type="checkbox" id="${val['ID_TASK']}-2"  data-task=${val['ID_TASK']} data-action=2></input></div>
                            <div class="check__box col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center py-1"><input type="checkbox" id="${val['ID_TASK']}-3"  data-task=${val['ID_TASK']} data-action=3></input></div>
                            <div class="check__box col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center py-1"><input type="checkbox" id="${val['ID_TASK']}-4"  data-task=${val['ID_TASK']} data-action=4></input></div>
                     `
                    modalTail+=tmp
                });
                modalTail+="</div>"
                var modal=modalHead+modalTail
                resolve(modal)
            })
        })
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { modalUser, modalUserAdd, modalProduct, modalFormLogin, modalFormRegister, modalAccount, modalProductAdd ,modalAddAu,modalUpAu};
    }
    else {
        window.modalUser = modalUser;
        window.modalUserAdd = modalUserAdd;
        window.modalProduct = modalProduct;
        window.modalFormLogin = modalFormLogin;
        window.modalFormRegister = modalFormRegister;
        window.modalAccount = modalAccount;
        window.modalProductAdd = modalProductAdd;
        window.modalAddAu = modalAddAu;
        window.modalUpAu = modalUpAu;
    }
});