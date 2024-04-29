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
                // console.log(dataProduct)
                // console.log(dataMaterial)
                // console.log(dataMaterial)
                var bodyName = `
                <div class="container-fluid">
                        <form action="" class="row">
    
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
                                <div class="col-sm-5 col-md-5 col-lg-5">
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
                    <div class="col-sm-1 col-md-1 col-lg-1">
                        <i class="fa-solid fa-circle-plus"></i>
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
                        <button type="button" class="btn btn-success update-img">Sửa ảnh</button>
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
                                        <button type="button" class="btn btn-success update-img">Sửa ảnh</button>
                                        <button type="button" class="btn btn-danger delete-img">Xóa ảnh</button>
                                    </div>
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
                                <button type="button" class="btn btn-success update-img">Sửa ảnh</button>
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

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { modalUser, modalProduct };
    }
    else {
        window.modalUser = modalUser;
        window.modalProduct = modalProduct;
    }
});