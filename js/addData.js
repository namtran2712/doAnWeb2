
$(document).ready(function () {
    $.when(
        $.getScript("js\\validate.js"),
        $.getScript("js\\modal.js"),
        $.getScript("js\\pagingForAdmin.js"),
        $.getScript("js\\eventAdmin.js")
    ).done(function () {
        console.log("Tất cả các file đã được tải ở add")
    })

    $(".create").click(function (e) {

        $('.my-modal .modal-content .modal-footer .btn.btn-warning').css('display', 'none')
        $('.my-modal .modal-content .modal-footer .btn.btn-success').css('display', 'block')
        $(".my-modal .modal-body").empty()
        var table = $(".sidebar ul li a.active").parents().attr("id");
        if (table == "nhanVien") {
            modalUserAdd()
                .then(function (modal) {
                    $(".my-modal .modal-body").append(modal)
                    $(".my-modal").modal('show')
                    $(".modal-footer .btn.btn-success").click(function (e) {
                        e.preventDefault();
                        if (checkEmpty([
                            "#full-name",
                            "#phone-number",
                            "#birthday",
                            "#username",
                            "#password"
                        ])) {
                            Swal.fire({
                                title: "",
                                text: "Không được để trống các trường !!!",
                                icon: "error"
                            });
                        }
                        else {
                            var account = {
                                fullName: $("#full-name").val(),
                                phoneNumber: $("#phone-number").val(),
                                birthday: $("#birthday").val(),
                                username: $("#username").val(),
                                password: $("#password").val(),
                                author: $("#author option:selected").val()
                            }
                            if (checkName(account.fullName) != false &&
                                checkPhone(account.phoneNumber) &&
                                checkAge(account.birthday) &&
                                checkUsername(account.username) &&
                                checkPassword(account.password)) {
                                $.ajax({
                                    type: "POST",
                                    url: "./database/accountDao.php?type=5",
                                    data: {
                                        account: account
                                    },
                                    dataType: "html",
                                    success: function (data) {
                                        if (data != 0) {
                                            Swal.fire({
                                                position: "top-end",
                                                icon: "success",
                                                title: "Thêm thành công",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            $(".my-modal").modal('hide')
                                            $(".list-item").find(".item.row").remove();
                                            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
                                            var obj = null
                                            $(".list-item").Paging(obj, type);
                                        }
                                        else {
                                            Swal.fire({
                                                title: "",
                                                text: "Tên đăng nhập hoặc số điện thoại đã tồn tại!!",
                                                icon: "warning"
                                            });
                                        }
                                    }
                                });
                            }
                            else {
                                Swal.fire({
                                    title: "",
                                    text: "Vui lòng kiểm tra lại thông tin đăng nhập!!",
                                    icon: "error"
                                });
                            }
                        }
                    });
                })
        }
        else if (table == "sanPham") {
            modalProductAdd()
                .then(function (modal) {
                    $(".my-modal .modal-body").append(modal);
                    $(".my-modal").modal('show')

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

                    $(".modal-footer .btn.btn-success").click(function (e) {
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
                            var product = getInfoAddProduct("")
                            $.ajax({
                                type: "POST",
                                url: "./database/productDao.php?type=5",
                                data: {
                                    product: product
                                },
                                dataType: "html",
                                success: function (data) {
                                    console.log(data)
                                    Swal.fire({
                                        title: "Thêm dữ liệu thành công",
                                        text: "",
                                        icon: "success"
                                    });
                                    $(".my-modal").modal('hide')
                                    var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
                                    $(".list-item").find(".item.row").remove();
                                    var obj = null
                                    $(".list-item").Paging(obj, type);
                                }
                            });
                        }
                    });
                })
        }
        else if(table=="phanQuyen")
            {
                modalAddAu().then(function(modal)
                {
                    $(".modal-body").empty();
                    $(".modal-body").append(modal)
                    $(".my-modal").modal("show")
                    $(".modal-footer .btn-success").click(function (e) { 
                        e.preventDefault();
                        var name=$("#nameAu").val();
                        if(checkEmpty(["#nameAu"]))
                        {
                            Swal.fire({
                                title: "Không được để rỗng tên!!!",
                                text: "",
                                icon: "error"
                            });
                        }
                        else
                        {
                            $.get("database/authoriesDao.php?type=4&name="+name,
                                function (data) {
                                    if(data==1)
                                    {
                                        Swal.fire({
                                            title: "Chắc chưa?",
                                            showDenyButton: true,
                                            showCancelButton: false,
                                            confirmButtonText: "Thêm",
                                            denyButtonText: `Hủy`
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                var checked=$(".check__box input:checked")
                                                $.get("./database/authoriesDao.php?type=5&name="+name,
                                                    function (data) {
                                                        if(data==1)
                                                        {
                                                            var idAu=0
                                                            $.get("./database/authoriesDao.php?type=11", 
                                                                function (data) {
                                                                    console.log(data)
                                                                    idAu=data
                                                                    $.each(checked, function (i, val) { 
                            
                                                                        var idTask=$(val).data("task")
                                                                        var idAc=$(val).data("action")
                                                                        $.get("./database/authoriesDao.php?type=7&idAu="+idAu+"&idTask="+idTask+"&idAc="+idAc,
                                                                            function (data) {
                                                                                console.log(data)
                                                                            },
                                                                            "html"
                                                                        );
        
                                                                    });
                                                                    Swal.fire("Thêm thành công!", "", "success");
                                                                    $(".my-modal").modal("hide")
                                                                },
                                                                "html"
                                                            );

                                                        }

                                                    },
                                                    "html"
                                                );
                                                
                                            }
                                        });
                                    }
                                    else
                                    {
                                        Swal.fire({
                                            title: "",
                                            text: "Tên nhóm quyền đã tồn tại!!",
                                            icon: "error"
                                        });
                                    }
                                },
                                "html"
                            );
                        }
                    });
                })
            }
    });
});