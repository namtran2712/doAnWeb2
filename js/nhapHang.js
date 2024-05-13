$(document).ready(function () {

    $.getScript("js/validate.js", function (script, textStatus, jqXHR) {
    });
    loadListReceipt()

    function loadListReceipt() {
        $.ajax({
            type: "GET",
            url: "database/processNhapHang.php?type=listReceipt",
            dataType: "json",
            success: function (response) {

                if (response != 0) {
                    $(".list-item-receipt").empty();
                    var total = 0;
                    Object.keys(response).forEach(function (key) {
                        var value = response[key];
                        var item =
                            `
                        <div class="container-fluid item-receipt row py-2">
                        <div class="col-sm-6 col-md-6 col-lg-6 text-right  fs-6">${value['name']}</div>
                        <div class="col-sm-1 col-md-1 col-lg-1 text-center d-flex align-items-center justify-content-center  fs-6">${value['size']}</div>
                        <div class="col-sm-2 col-md-2 col-lg-2 text-center d-flex align-items-center justify-content-center  fs-6">${parseInt(value['price']).toLocaleString("de-DE") + "đ"}</div>
                        <div class="col-sm-1 col-md-1 col-lg-1 text-center d-flex align-items-center justify-content-center  fs-6">${value['quantity']}</div>
                        <div class="col-sm-1 col-md-1 col-lg-1 text-center d-flex align-items-center justify-content-center  fs-6"><i class="fa-solid fa-trash-can delete-receipt" data-id=${key}></i></div>
                        </div>
                        `
                        $(".list-item-receipt").append(item);
                        var price = value['price']
                        total += (price * value['quantity'])
                    });
                    $(".total-receipt").text(parseInt(total).toLocaleString("de-DE") + "đ");
                    $(".delete-receipt").off("click")
                    $(".delete-receipt").click(function (e) { 
                        e.preventDefault();
                        var id= $(this).data("id");
                        Swal.fire({
                            title: "Bạn chắc chắn muốn xóa?",
                            text: "",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Xóa"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.get("database/processNhapHang.php?type=deleteItem&id="+id,
                                    function (data) {
                                        loadListReceipt()
                                        Swal.fire({
                                            title: "Xóa thành công",
                                            text: "",
                                            icon: "success"
                                        });
                                    },
                                    "html"
                                );                        
                            }
                        });
                    });
                }
                else {
                    $(".list-item-receipt").empty();
                    $(".total-receipt").text("0đ")
                }
            }
        });
    }

    $(".name-product-item").click(function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            type: "GET",
            url: "database/productDao.php?type=1&id=" + id,
            dataType: "json",
            success: function (response) {
                $("#in4-idProduct").val(response['product']['ID_PRODUCT']);
                $("#in4-nameProduct").val(response['product']['PRODUCT_NAME']);
                $("#in4-sizeProduct").empty();

                response['particular'].forEach(element => {
                    var optionText = element['SIZE'];
                    var optionValue = element['SIZE'];
                    var newOption = $("<option></option>").attr("value", optionValue).text(optionText);
                    $("#in4-sizeProduct").append(newOption);
                });

                $("#in4-sizeProduct").off("change");

                $("#in4-sizeProduct").change(function (e) {
                    e.preventDefault();
                    var id = response['product']['ID_PRODUCT'];
                    var size = $(this).val();
                    $.ajax({
                        type: "GET",
                        url: "database/productDao.php?type=100&id=" + id + "&size=" + size,
                        dataType: "json",
                        success: function (data) {
                            $("#in4-priceProduct").val(parseInt(data['PRICE'] * (0.95)).toLocaleString("de-DE") + "đ");
                            $("#in4-quantityRemainProduct").val(data['QUANTITY_REMAIN']);
                        }
                    });
                });

                $("#in4-priceProduct").val(parseInt(response['particular']['0']['PRICE'] * (0.95)).toLocaleString("de-DE") + "đ");
                $("#in4-quantityRemainProduct").val(response['particular']['0']['QUANTITY_REMAIN']);
                $.ajax({
                    type: "GET",
                    url: "database/categoryDao.php?type=3&id=" + response['product']['ID_CATEGORY'],
                    dataType: "json",
                    success: function (response) {
                        $("#in4-categoryProduct").val(response['0']['CATEGORY_NAME']);
                    }
                });
                $.ajax({
                    type: "GET",
                    url: "database/materialDao.php?type=2&id=" + response['product']['ID_MATERIAL'],
                    dataType: "json",
                    success: function (response) {
                        $("#in4-materialProduct").val(response['0']['MATERIAL_NAME']);
                    }
                });

                $('.add-item-receipt').off("click")
                $('.add-item-receipt').click(function (e) {
                    e.preventDefault();
                    if ($("#in4-idProduct").val() == "") {
                        Swal.fire({
                            title: "Vui lòng chọn sản phẩm để nhập",
                            text: "",
                            icon: "error"
                        });
                    }
                    else if ($("#in4-quantityReceiptProduct").val() == "") {
                        Swal.fire({
                            title: "Vui lòng nhập số lượng",
                            text: "",
                            icon: "error"
                        });
                    }
                    else if (!checkPrice($("#in4-quantityReceiptProduct").val())) {
                        Swal.fire({
                            title: "Vui lòng nhập số nguyên dương",
                            text: "",
                            icon: "error"
                        });
                    }
                    else {
                        var price = $("#in4-priceProduct").val();
                        price = parseInt(price.replace(/\./g, ""))
                        $.ajax({
                            type: "POST",
                            url: "database/processNhapHang.php",
                            data: {
                                id: $("#in4-idProduct").val(),
                                name: $("#in4-nameProduct").val(),
                                size: $("#in4-sizeProduct").val(),
                                price: price,
                                quantity: $("#in4-quantityReceiptProduct").val(),
                            },
                            dataType: "html",
                            success: function (response) {

                                loadListReceipt()
                                $("#in4-idProduct").val('');
                                $("#in4-nameProduct").val('');
                                $("#in4-materialProduct").val('');
                                $("#in4-categoryProduct").val('');
                                $("#in4-sizeProduct").empty();
                                $("#in4-priceProduct").val('');
                                $("#in4-quantityRemainProduct").val("");
                                $("#in4-quantityReceiptProduct").val("");
                            }
                        });
                        Swal.fire("Thêm vào phiếu nhập thành công!", "", "success");


                    }
                });


            }
        });


    });

    $(".add-receipt").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "database/processNhapHang.php?type=addReceipt",
            dataType: "text",
            success: function (response) {
                if (response == 0) {
                    Swal.fire({
                        title: "Vui lòng thêm sản phẩm cần nhập",
                        text: "",
                        icon: "error"
                    });
                }
                else {
                    loadListReceipt()
                    Swal.fire("Nhập hàng thành công!", "", "success");
                }
            }
        });
    });


});