$(document).ready(function () {
    function outerProduct(id) {
        return new Promise(function (resolve, reject) {
            $.when(
                $.ajax({
                    type: "GET",
                    url: "./database/productDao.php?type=1&id=" + id,
                    dataType: "json",
                })
            ).done(function (data) {
                console.log(data)
                var head = `
                    <span class="id-item col-sm-1 col-md-1 col-lg-1">${data["product"]["ID_PRODUCT"]}</span>
                    <span class="col-sm-3 col-md-3 col-lg-3">${data["product"]["PRODUCT_NAME"]}</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">${data["product"]["CATEGORY_NAME"]}</span>
                    <span class="col-sm-1 col-md-1 col-lg-1">${data["product"]["MATERIAL_NAME"]}</span>
                    <img src="${data["product"]["MAIN_IMAGE"]}" alt="" class="col-sm-1 col-md-1 col-lg-1 img-fluid">
                    <span class="col-sm-1 col-md-1 col-lg-1">${data["product"]["QUANTITY_SOLD"]}</span>
                `
                var price = 0;
                var remain = 0;

                var body = `
                    <select class="col-sm-1 col-md-1 col-lg-1 select-size" name="">`

                $.each(data["particular"], function (i, val) {
                    if (i == 0) {
                        price = val["PRICE"];
                        remain = val["QUANTITY_REMAIN"]
                    }
                    var opt = `<option value="${val["SIZE"]}" data-price="${val["PRICE"]}" data-remain="${val["QUANTITY_REMAIN"]}">${val["SIZE"]}</option>`
                    body += opt
                });
                body += `</select>`
                var tail = `
                    <span class="col-sm-1 col-md-1 col-lg-1 val-price">${parseInt(price).toLocaleString("de-DE")}đ</span>
                    <span class="col-sm-1 col-md-1 col-lg-1 val-remain">${remain}</span>
                    <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                `
                var item = head + body + tail;
                resolve(item)
            })
        })
    }

    function outerAccount(id) {
        return new Promise(function (resolve, reject) {
            $.when(
                $.ajax({
                    type: "POST",
                    url: "./database/accountDao.php?type=6",
                    data: {
                        id: id
                    },
                    dataType: "json",
                })
            ).done(function (data) {
                console.log(data)
                var status = ''
                if (data[0]["STATUS_ACCOUNT"] == 1) {
                    status = "Được hoạt động"
                }
                else {
                    status = "Khóa hoạt động"
                }
                var item = `
                    <span class="id-item col-sm-1 col-md-1 col-lg-1">${data[0]["ID_ACCOUNT"]}</span>
                    <span class="col-sm-2 col-md-2 col-lg-2">${data[0]["AUTHORIZE_NAME"]}</span>
                    <span class="col-sm-2 col-md-2 col-lg-2">${data[0]["FULLNAME"]}</span>
                    <span class="col-sm-2 col-md-2 col-lg-2">${data[0]["USERNAME"]}</span>
                    <span class="col-sm-2 col-md-2 col-lg-2">${data[0]["PASS_WORD"]}</span>
                    <span class="col-sm-2 col-md-2 col-lg-2">${status}</span>
                    <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                `
                resolve(item)
            })
        })
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { outerProduct, outerAccount };
    }
    else {
        window.outerProduct = outerProduct;
        window.outerAccount = outerAccount;
    }
});