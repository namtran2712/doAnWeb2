$(document).ready(function () {
    function appendStaff() {
        return new Promise(function (resolve, reject) {
            $.when(
                $.ajax({
                    type: "GET",
                    url: "./database/userDao.php?type=2",
                    dataType: "json"
                })
            ).done(function (data) {
                var item = `
                <div class="item row">
                    <span class="id-item col-sm-2 col-md-2 col-lg-2">${data["ID_USER"]}</span>
                    <span class="full-name col-sm-3 col-md-3 col-lg-3">${data["FULLNAME"]}</span>
                    <span class="phone-number col-sm-3 col-md-3 col-lg-3">${data["PHONE_NUMBER"]}</span>
                    <span class="birthday col-sm-3 col-md-3 col-lg-3">${data["BIRTHDAY"]}</span>
                    <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                </div>
                `
                resolve(item)
            })
        })
    }

    function appendProduct() {
        return new Promise(function (resolve, reject) {
            $.when(
                $.ajax({
                    type: "GET",
                    url: "./database/productDao.php?type=7",
                    dataType: "json",
                })
            ).done(function (data) {
                var head = `
                <div class="item row">
                    <span class="id-item col-sm-1 col-md-1 col-lg-1">${data[0]["ID_PRODUCT"]}</span>
                    <span class="col-sm-3 col-md-3 col-lg-3">${data[0]["PRODUCT_NAME"]}</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">${data[0]["CATEGORY_NAME"]}</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">${data[0]["MATERIAL_NAME"]}</span>
                    <img src="${data[0]["MAIN_IMAGE"]}" alt="" class="col-sm-1 col-md-1 col-lg-1 img-fluid">
                    <span class="col-sm-1 col-md-1 col-lg-1">${data[0]["QUANTITY_SOLD"]}</span>
                `
                var bodySize = `
                    <select class="col-sm-1 col-md-1 col-lg-1 select-size" name="">
                `
                var priceCurrent = 0
                var remainCurrent = 0

                $.each(data, function (i, val) {
                    if (i == 0) {
                        priceCurrent = val["PRICE"]
                        remainCurrent = val["QUANTITY_REMAIN"]
                    }
                    bodySize += `<option value="${val["SIZE"]}" data-price="${val["PRICE"]}" data-remain="${val["QUANTITY_REMAIN"]}">${val["SIZE"]}</option>`
                });

                var tail = `
                    </select>
                    <span class="col-sm-1 col-md-1 col-lg-1 val-price">${parseInt(priceCurrent.toLocaleString("de-DE"))}đ</span>
                    <span class="col-sm-1 col-md-1 col-lg-1 val-remain">${remainCurrent}</span>
                    <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                </div>
                `
                var item = head + bodySize + tail
                resolve(item)
            })
        })
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { appendStaff, appendProduct };
    }
    else {
        window.appendStaff = appendStaff;
        window.appendProduct = appendProduct;
    }
});