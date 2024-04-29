
$(document).ready(function () {
    $.getScript("js\\pagingForAdmin.js")
        .done(function () {
            console.log("File pagingForAdmin được tải ở update!");
        })
        .fail(function (jqxhr, textStatus, errorThrown) {
            console.error("Lỗi khi tải file pagingForAdmin:", errorThrown);
        });

    $.getScript("js\\validate.js")
        .done(function () {
            console.log("File validate đã được tải!");
        })
        .fail(function (jqxhr, textStatus, errorThrown) {
            console.error("Lỗi khi tải file validate:", errorThrown);
        });

    $.getScript("js\\modal.js")
        .done(function () {
            console.log("File modal đã được tải!");
        })
        .fail(function (jqxhr, textStatus, errorThrown) {
            console.error("Lỗi khi tải file modal:", errorThrown);
        });

    $(".delete").click(function () {
        var itemsId = $('.list-item .item input:checked').siblings(".id-item")
        var id = []
        $.each(itemsId, function (i, val) {
            id.push($(val).text())
        });
        var table = $(".sidebar ul li a.active").parents().attr("id")

        Swal.fire({
            title: "Bạn chắc chắn muốn xóa?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Xóa",
            denyButtonText: `Hủy`
        }).then((result) => {
            if (result.isConfirmed) {
                if (id.length == 0) {
                    Swal.fire({
                        title: "Vui lòng chọn để xóa",
                        text: "",
                        icon: "error"
                    });
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: "./database/updateData.php?table=" + table + "&type=delete",
                        data: {
                            "id": id,
                        },
                        dataType: "html",
                        success: function (data) {
                            console.log(data)
                            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");

                            $(".list-item").find(".item.row").remove();
                            var obj = {}
                            $(".list-item").Paging(obj, type);
                        }
                    });
                    Swal.fire("Đã xóa thành công!", "", "success");
                }
            }
        });


    });

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

                $(".modal-footer button").click(function (e) {
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
                                                    console.log(type)
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
                            e.preventDefault();
                            var display = $(this).parent().find(".img").css('display');
                            if (display == "block") {
                                $(".modal-body .img").slideUp();
                                $(this).find('i').removeClass('active');
                            }
                            else {
                                $(".modal-body button").find('i').removeClass('active');
                                $(this).find('i').toggleClass('active');
                                $(".modal-body .img").slideUp();
                                $(this).parent().find(".img").slideToggle("slow");
                            }
                        });

                        $("#size-product").change(function (e) {
                            e.preventDefault();
                            var price = $(this).val()
                            var remain = $(this).find("option:selected").data("remain");
                            $("#price-product").val(price);
                            $("#remain-product").val(remain);
                        });

                        $("#price-product").change(function (e) {
                            e.preventDefault();
                            if (checkPrice($(this).val())) {
                                $("#size-product option:selected").val($(this).val());
                            }
                            else {
                                Swal.fire({
                                    title: "Giá không thể chứa kí tự khác số!!",
                                    text: "",
                                    icon: "warning"
                                });
                            }
                        });

                        $(".modal-footer button").off("click")
                        $(".modal-footer button").click(function (e) {
                            e.preventDefault();
                        });
                    })
            }
        }
    });
});