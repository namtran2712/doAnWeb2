
$(document).ready(function () {
    $.when(
        $.getScript("js\\pagingForAdmin.js"),
        $.getScript("js\\validate.js"),
        $.getScript("js\\modal.js"),
        $.getScript("js\\eventAdmin.js")
    ).done(function () {
        console.log("Tất cả các file đã được tải ở update")
    })

    $(".update").click(function (e) {
        e.preventDefault();
        var id = $('.list-item .item input:checked').siblings(".id-item")
        var table = $(".sidebar ul li a.active").parents().attr("id")

        if (id.length == 0) {
            Swal.fire({
                title: "Vui lòng chọn để sửa !!!",
                text: "",
                icon: "error"
            });
        }
        else if (id.length > 1) {
            Swal.fire({
                title: "Chỉ được chọn một lựa chọn !!!",
                text: "",
                icon: "error"
            });
        }
        else {

            $('.my-modal .modal-content .modal-footer .btn.btn-warning').css('display', 'block')
            $('.my-modal .modal-content .modal-footer .btn.btn-success').css('display', 'none')
            $(".my-modal").modal('show')
            if (table == "khachHang" || table == "nhanVien") {
                id = id.text()
                var fullname = $('.list-item .item input:checked').siblings(".full-name").text();
                var phoneNumber = $('.list-item .item input:checked').siblings(".phone-number").text();
                var birthday = $('.list-item .item input:checked').siblings(".birthday").text();
                var modalContent = modalUser(fullname, phoneNumber, birthday)
                $(".modal-body").empty();
                $(".modal-body").append(modalContent);
                $(".modal-footer button").off("click")

                $(".modal-footer .btn.btn-warning").click(function (e) {
                    e.preventDefault();
                    if (table == "khachHang" || table == "nhanVien") {
                        if (checkEmpty(
                            [
                                ".modal-body #full-name",
                                ".modal-body #phone-number",
                                ".modal-body #birthday"
                            ]
                        )) {
                            Swal.fire({
                                title: "Không được bỏ trống trường nào!!!",
                                text: "",
                                icon: "warning"
                            });
                        }
                        else {
                            phoneNumber = $(".modal-body #phone-number").val();
                            fullname = $(".modal-body #full-name").val();
                            birthday = $(".modal-body #birthday").val();
                            user = {
                                fullname: fullname,
                                phoneNumber: phoneNumber,
                                birthday: birthday
                            }
                            if (checkAge(birthday) &&
                                checkName(fullname) &&
                                checkPhone(phoneNumber)) {
                                Swal.fire({
                                    title: "Bạn chắc chắn muốn sửa?",
                                    text: "",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Đồng ý"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        $.ajax({
                                            type: "POST",
                                            url: "./database/updateData.php?type=update&category=user",
                                            data: {
                                                id: id,
                                                user: user
                                            },
                                            dataType: "html",
                                            success: function (data) {
                                                if (data == 1) {
                                                    Swal.fire({
                                                        position: "top-end",
                                                        icon: "success",
                                                        title: "Sửa thành công",
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    });
                                                    $(".my-modal").modal('hide')

                                                    var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
                                                    $(".list-item").find(".item.row").remove();
                                                    var obj = null
                                                    $(".list-item").Paging(obj, type);
                                                }
                                                else {
                                                    Swal.fire({
                                                        title: "Số điện thoại đã tồn tại!!!",
                                                        text: "",
                                                        icon: "warning"
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                Swal.fire({
                                    title: "Vui lòng kiểm tra lại thông tin cần sửa!!",
                                    text: "",
                                    icon: "error"
                                });
                            }
                        }
                    }
                });
            }
            else if (table == "sanPham") {
                id = id.text()
                var modalContent = ``;
                modalProduct(id)
                    .then(function (modal) {
                        modalContent = modal;
                        $(".modal-body").empty();
                        $(".modal-body").append(modalContent);

                        $(".modal-body button").click(function (e) {
                            toggleImg(this)
                        });

                        $("#size-product").change(function (e) {
                            e.preventDefault();
                            var price = $(this).val()
                            var remain = $(this).find("option:selected").data("remain");
                            $("#price-product").val(price);
                            $("#remain-product").val(remain);
                        });

                        $("#price-product , #remain-product , #sold-product , #add-size").keypress(function (e) {
                            if (e.keyCode < 48 || e.keyCode > 57) {
                                e.preventDefault();
                            }
                        });

                        $("#price-product").change(function (e) {
                            e.preventDefault();
                            $("#size-product option:selected").val($(this).val());
                        });

                        $("#remain-product").change(function (e) {
                            e.preventDefault();
                            $("#size-product option:selected").data("remain", $(this).val());
                        });

                        $(".add-size").click(function (e) {
                            e.preventDefault();
                            $(this).parent().find("input").css("display", "block")
                            $(this).parent().find("input").focus()
                        });

                        $(".add-size ~ input").blur(function (e) {
                            check = true;
                            var size = $(this).val()
                            if (size == "") {
                                $(this).css("display", "none");
                                return;
                            }
                            var opt = $("#size-product option")

                            $.each(opt, function (i, val) {
                                if (size == $(val).text()) {
                                    check = false
                                }
                            });

                            if (check) {
                                var tmp = `
                                    <option value="0" data-remain="0">${$(this).val()}</option>
                                `
                                $("#size-product").append(tmp);
                            }
                            $(this).css("display", "none");
                            $(this).val("");
                        });

                        $("i.delete-size").click(function (e) {
                            e.preventDefault();
                            Swal.fire({
                                title: "Bạn chắc chắn muốn xóa?",
                                text: "",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Xóa size"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $("#size-product option:selected").remove();
                                    if ($("#size-product option:selected").length == 0) {
                                        $("#price-product , #remain-product").val("");
                                    }
                                }
                            });
                        });

                        $(".delete-img").click(function (e) {
                            deleteImg(this)
                        });

                        $(".update-img").change(function (e) {
                            changeImg(this)
                        });

                        $(".add-img").click(function (e) {
                            addImg(this)
                        })

                        $(".modal-footer button").off("click")
                        $(".modal-footer .btn-warning").click(function (e) {
                            e.preventDefault();
                            if (checkEmpty([
                                "#product-name",
                                "#price-product",
                                "#remain-product",
                                "#sold-product"
                            ])) {
                                Swal.fire({
                                    title: "",
                                    text: "Không được bỏ trống các trường!!",
                                    icon: "error"
                                });
                            }
                            else {
                                var product = getInfoAddProduct(id)
                                $.ajax({
                                    type: "POST",
                                    url: "./database/productDao.php?type=4",
                                    data: {
                                        product: product
                                    },
                                    dataType: "html",
                                    success: function (data) {
                                        if (data == 1) {
                                            Swal.fire({
                                                title: "Sửa dữ liệu thành công",
                                                text: "",
                                                icon: "success"
                                            });
                                            $(".my-modal").modal('hide')
                                            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
                                            $(".list-item").find(".item.row").remove();
                                            var obj = null
                                            $(".list-item").Paging(obj, type);
                                        }
                                    }
                                });
                            }
                        });
                    })
            }
            else if (table == "taiKhoan") {
                id = id.text()
                modalAccount(id)
                    .then(function (modal) {
                        $(".modal-body").empty();
                        $(".modal-body").append(modal);

                        $(".status-account").click(function (e) {
                            e.preventDefault();
                            var status = $(this).data("status");
                            if (status == 1) {
                                $(this).text("Khóa hoạt động");
                                $(this).attr("class", "status-account btn btn-danger")
                                $(this).data("status", 0);
                            }
                            else {
                                $(this).text("Được hoạt động");
                                $(this).attr("class", "status-account btn btn-success")
                                $(this).data("status", 1);
                            }
                        });

                        $(".modal-footer button").off("click")
                        $(".modal-footer .btn-warning").click(function (e) {
                            e.preventDefault()
                            if (!checkEmpty([
                                "#username",
                                "#password"
                            ])) {
                                var account = {
                                    id: id,
                                    username: $("#username").val(),
                                    password: $("#password").val(),
                                    author: $("#author option:selected").val(),
                                    status: $(".status-account").data("status")
                                }
                                if (checkPassword(account.password)) {
                                    $.ajax({
                                        type: "POST",
                                        url: "./database/accountDao.php?type=7",
                                        data: {
                                            account: account
                                        },
                                        dataType: "html",
                                        success: function (data) {
                                            Swal.fire({
                                                position: "mid-center",
                                                icon: "success",
                                                title: "Your work has been saved",
                                                showConfirmButton: false,
                                                timer: 1000
                                            });
                                            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
                                            $(".list-item").find(".item.row").remove();
                                            var obj = null
                                            $(".list-item").Paging(obj, type);
                                            $(".my-modal").modal("hide")
                                        }
                                    });
                                }
                                else {
                                    Swal.fire({
                                        title: "",
                                        text: "Mật khẩu từ 8 kí tự trở lên!",
                                        icon: "warning"
                                    });
                                }
                            }
                            else {
                                Swal.fire({
                                    title: "",
                                    text: "Không được để trống các trường!",
                                    icon: "error"
                                });
                            }
                        })
                    })
            }
        }
    });
});