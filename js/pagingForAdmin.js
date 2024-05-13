

(function ($) {
    $.fn.Paging = function (obj, type) {
        var Default = {
            currentPage: 1,
            totalPage: 0,
            items: 10,
        }

        obj = Default;
        var showMore = `
        <button class="btn btn-outline-dark m-2">Xem thêm nội dung</button>
        `
        $(".content .show-more").empty();
        $(".content .show-more").append(showMore);
        $(".list-item").find(".item.row").remove()

        $(".content .show-more").children('button').click(function (e) {
            e.preventDefault();
            obj.currentPage++
            if (type == "sanPham")
                loadDataProduct(obj.currentPage)
            else if (type == "khachHang" || type == "nhanVien")
                loadDataUser(obj.currentPage)
            else if (type == "taiKhoan")
                loadDataAccount(obj.currentPage)
            if (obj.currentPage == obj.totalPage) {
                $(".content .show-more").children('button').css('display', 'none');
            }
        });

        getPage()

        function getPage() {
            $.ajax({
                type: "GET",
                url: "./database/getDataAdmin.php?type=countPage&item=" + obj.items + "&loai=" + type,
                dataType: "html",
                success: function (data) {
                    obj.totalPage = data
                    $(".thongKe").css("display", 'none');
                    $(".content").css("display", "block");
                    if (type == "sanPham") {
                        loadDataProduct(obj.currentPage)
                        $(".crud").css("display", "flex");
                    }
                    else if (type == "khachHang" || type == "nhanVien") {
                        loadDataUser(obj.currentPage)
                        $(".crud").css("display", "flex");
                        if (type == "khachHang") {
                            $(".create").css("display", "none");
                        }
                    }
                    else if (type == "taiKhoan") {
                        loadDataAccount(obj.currentPage)
                        $(".crud").css("display", "flex");
                        $(".create").css("display", "none");
                    }
                    else if (type == "hoaDon") {
                        loadDataBill(obj.currentPage)
                        $(".crud").css("display", "flex");
                        $(".create").css("display", "none");
                        $(".update").css("display", "none");
                    }
                    else if (type == "phieuNhap") {
                        loadDataReceipt(obj.currentPage)
                        $(".crud").css("display", "flex");
                        $(".update").css("display", "none");
                    }
                    else if (type == "phanQuyen") {
                        loadAuthoryze(obj.currentPage)
                        $(".crud").css("display", "flex");
                    }
                    if (obj.currentPage == obj.totalPage || obj.totalPage == 0) {
                        $(".content .show-more").children('button').css('display', 'none');
                    }

                    var item = $(".crud").find("div")
                    var display = false
                    $.each(item, function (i, val) {
                        if ($(val).css("display") == "block") {
                            display = true
                        }
                    });
                    if (!display) {
                        $(".crud").css("display", "none")
                        $(".crud").find("div").remove()
                    }
                    else {
                        $(".crud").css("display", "flex")
                    }
                    if (type == "thongKe") {
                        $(".thongKe").css("display", 'block');
                        $(".content").css("display", "none")
                    }
                    else if (type == "nhapHang") {
                        $(".list-item").children().first().empty();
                        $(".nhapHang").css('display', 'flex');
                        $(".crud").css("display", "none");
                        console.log(type)
                    }
                    if (type != "nhapHang") {
                        $(".nhapHang").css('display', 'none');
                    }
                }
            });
        }
        function dataEmpty() {
            if (obj.totalPage == 0) {
                var item = `
                <div class="item row">
                    <marquee behavior="scroll" direction="left" scrollamount="15" scrolldelay="50" loop="infinite" onmouseover="this.stop()" onmouseout="this.start()" class="notification">
                        Hiện không có thông tin nào
                    </marquee>
                </div>
                `
                $(".list-item").append(item)
            }
        }
        function loadDataProduct(page) {
            $.ajax({
                type: "GET",
                url: "./database/getDataAdmin.php?type=sanPham&item=" + obj.items + "&page=" + page,
                dataType: "json",
                success: function (data) {
                    if (page == 1 || obj.currentPage == 0) {
                        var title = `
                            <span class="col-sm-1 col-md-1 col-lg-1">ID</span>
                            <span class="col-sm-3 col-md-3 col-lg-3">Tên sản phẩm</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Loại</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Chất liệu</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Hình ảnh</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Đã bán</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Size</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Giá</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Hàng tồn</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Chọn</span>
                        `
                        $(".list-item").children().first().empty();
                        $(".list-item").children().first().append(title);
                    }

                    var startItem = [];
                    var subItem = [
                        {}
                    ]
                    subItem[0].id = [];
                    subItem[0].size = [];

                    curPage = [];

                    var endItem = [];

                    $.each(data, function (i, val) {
                        if (i == "product") {
                            $.each(val, function (indexInArray, valueOfElement) {
                                curPage.push(valueOfElement.ID_PRODUCT)

                                startItem.push(`
                                <div class="item row">
                                    <span class="id-item col-sm-1 col-md-1 col-lg-1">${valueOfElement.ID_PRODUCT}</span>
                                    <span class="col-sm-3 col-md-3 col-lg-3">${valueOfElement.PRODUCT_NAME}</span>
                                    <span class="col-sm-1 col-md-1 col-lg-1">${valueOfElement.CATEGORY_NAME}</span>
                                    <span class="col-sm-1 col-md-1 col-lg-1">${valueOfElement.MATERIAL_NAME}</span>
                                    <img src="${valueOfElement.MAIN_IMAGE}" alt="" class="col-sm-1 col-md-1 col-lg-1 img-fluid">
                                    <span class="col-sm-1 col-md-1 col-lg-1">${valueOfElement.QUANTITY_SOLD}</span>
                                    <select class="col-sm-1 col-md-1 col-lg-1 select-size" name="">
                                `)
                            });
                        }
                        else if (i == "particular") {
                            tmp = -1;
                            for (const item of val) {
                                if (tmp != item.ID_PRODUCT) {
                                    subItem[0].id.push(item.ID_PRODUCT)
                                    subItem[0].size.push(
                                        `<option value="${item.SIZE}" data-price="${item.PRICE}" data-remain="${item.QUANTITY_REMAIN}">${item.SIZE}</option>`
                                    )

                                    tmp = item.ID_PRODUCT

                                    endItem.push(`
                                        </select>
                                        <span class="col-sm-1 col-md-1 col-lg-1 val-price">${parseInt(item.PRICE).toLocaleString("de-DE")}đ</span>
                                        <span class="col-sm-1 col-md-1 col-lg-1 val-remain">${item.QUANTITY_REMAIN}</span>
                                        <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                                    </div>
                                    `)
                                }
                                else {
                                    subItem[0].id.push(item.ID_PRODUCT)
                                    subItem[0].size.push(`<option value="${item.SIZE}" data-price="${item.PRICE}" data-remain="${item.QUANTITY_REMAIN}">${item.SIZE}</option>`)
                                }
                            }
                        }
                    });

                    j = 0;

                    for (i = 0; i < startItem.length; i++) {
                        item = ``;
                        item = item + startItem[i]
                        check = true

                        for (j; j < subItem[0].id.length && check; j++) {
                            if (subItem[0].id[j] == curPage[i]) {
                                item = item + subItem[0].size[j]
                            }
                            else {
                                j--;
                                check = false
                            }
                        }

                        item += endItem[i]

                        $(".list-item").append(item)
                    }

                    if (document.querySelector(".list-item").children.length > 1 &&
                        obj.totalPage > 1) {
                        document.querySelector(".show-more button").style.visibility = "visible"
                    }

                    $(".select-size").change(function (e) {
                        e.preventDefault();
                        val = $(this).find(":selected")
                        price = val.data("price")
                        remain = val.data("remain")
                        price = parseInt(price).toLocaleString("de-DE")
                        price += "đ"
                        $(this).parent().find('.val-price').text(price)
                        $(this).parent().find('.val-remain').text(remain)
                    });
                }
            });
        }

        function loadDataUser(page) {
            $.ajax({
                type: "GET",
                url: "./database/getDataAdmin.php?type=" + type + "&item=" + obj.items + "&page=" + page,
                dataType: "json",
                success: function (data) {
                    if (page == 1 || page == 0) {
                        if (type == "khachHang") {
                            var title = `
                                <span class="col-sm-2 col-md-2 col-lg-2">ID</span>
                                <span class="col-sm-3 col-md-3 col-lg-3">Tên khách hàng</span>
                                <span class="col-sm-3 col-md-3 col-lg-3">Số điện thoại</span>
                                <span class="col-sm-3 col-md-3 col-lg-3">Ngày sinh</span>
                                <span class="col-sm-1 col-md-1 col-lg-1">Chọn</span>
                            `
                        }
                        else {
                            var title = `
                                <span class="col-sm-2 col-md-2 col-lg-2">ID</span>
                                <span class="col-sm-3 col-md-3 col-lg-3">Tên nhân viên</span>
                                <span class="col-sm-3 col-md-3 col-lg-3">Số điện thoại</span>
                                <span class="col-sm-3 col-md-3 col-lg-3">Ngày sinh</span>
                                <span class="col-sm-1 col-md-1 col-lg-1">Chọn</span>
                            `
                        }
                        $(".list-item").children().first().empty();
                        $(".list-item").children().first().append(title);
                    }

                    $.each(data, function (i, val) {
                        var item = `
                        <div class="item row">
                            <span class="id-item col-sm-2 col-md-2 col-lg-2">${val.ID_USER}</span>
                            <span class="full-name col-sm-3 col-md-3 col-lg-3">${val.FULLNAME}</span>
                            <span class="phone-number col-sm-3 col-md-3 col-lg-3">${val.PHONE_NUMBER}</span>
                            <span class="birthday col-sm-3 col-md-3 col-lg-3">${val.BIRTHDAY}</span>
                            <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                        </div>
                        `

                        $(".list-item").append(item)
                    });
                }
            });
        }

        function loadDataAccount(page) {
            $.ajax({
                type: "GET",
                url: "./database/getDataAdmin.php?type=" + type + "&item=" + obj.items + "&page=" + page,
                dataType: "json",
                success: function (data) {
                    if (page == 1) {
                        var title = `
                            <span class="col-sm-1 col-md-1 col-lg-1">ID</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Vai trò</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Người sử dụng</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Username</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Password</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Tình trạng</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Chọn</span>
                        `
                        $(".list-item").children().first().empty();
                        $(".list-item").children().first().append(title);
                    }

                    $.each(data, function (i, val) {
                        var statusAcc;
                        if (val.STATUS_ACCOUNT == '1') {
                            statusAcc = "Được hoạt động"
                        }
                        else {
                            statusAcc = "Khóa hoạt động"
                        }
                        var item = `
                        <div class="item row">
                            <span class="id-item col-sm-1 col-md-1 col-lg-1">${val.ID_ACCOUNT}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">${val.AUTHORIZE_NAME}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">${val.FULLNAME}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">${val.USERNAME}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">${val.PASS_WORD}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">${statusAcc}</span>
                            <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                        </div>
                        `

                        $(".list-item").append(item)
                    });
                }
            });
        }

        function loadDataBill(page) {
            $.ajax({
                type: "GET",
                url: "./database/billDao.php?type=1" + "&item=" + obj.items + "&page=" + page,
                dataType: "json",
                success: function (data) {
                    if (page == 1 || page == 0) {
                        var title = `
                            <span class="col-sm-1 col-md-1 col-lg-1">ID</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Nhân viên</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Khách hàng</span>
                            <span class="col-sm-3 col-md-3 col-lg-3">Tổng tiền</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Trạng thái</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Chi tiết</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Chọn</span>
                        `
                        $(".list-item").children().first().empty();
                        $(".list-item").children().first().append(title);
                    }
                    $.each(data, function (i, val) {
                        var staff = "Chưa có người duyệt đơn";
                        var price = parseInt(val["TOTAL_BILL"]).toLocaleString("de-DE");
                        var status = "";
                        var button = "";

                        switch (val["STATUS_BILL"]) {
                            case "-1":
                                status = "Đã hủy đơn hàng"
                                button = "btn-danger"
                                break;
                            case "0":
                                status = "Đang chờ xác nhận";
                                button = "btn-warning";
                                break;
                            case "1":
                                status = "giao hàng";
                                button = "btn-info";
                                break;
                            case "2":
                                status = "Đang vận chuyển";
                                button = "btn-orange";
                                break;
                            case "3":
                                status = "Giao hàng thành công";
                                button = "btn-success";
                                break;
                            case "4":
                                status = "Đơn hàng đã hoàn thành";
                                button = "btn-secondary";
                            default:
                                break;
                        }

                        var getStaffPromise = new Promise(function (resolve, reject) {
                            if (val["ID_STAFF"] != null) {
                                $.get("./database/accountDao.php?type=8&id=" + val["ID_STAFF"], function (user) {
                                    resolve(user["FULLNAME"]);
                                }, "json");
                            } else {
                                resolve(staff);
                            }
                        });

                        getStaffPromise.then(function (staffName) {
                            var item = `
                            <div class="item row">
                              <span class="id-item col-sm-1 col-md-1 col-lg-1">${val["ID_BILL"]}</span>
                              <span class="col-sm-2 col-md-2 col-lg-2">${staffName}</span>
                              <span class="col-sm-2 col-md-2 col-lg-2">${val.FULLNAME}</span>
                              <span class="col-sm-3 col-md-3 col-lg-3">${price}đ</span>
                              <button class="btn-status col-sm-2 btn ${button} col-md-2 col-lg-2" data-status="${val["STATUS_BILL"]}">${status}</button>
                              <span class="detail-receipt col-sm-1 col-md-1 col-lg-1"><i class="fa-solid fa-eye"></i></span>
                              <input type="checkbox" name="" id="check-bill" class="col-sm-1 col-md-1 col-lg-1">
                            </div>
                          `;
                            $(".list-item").append(item);
                        });
                    });

                    $(".list-item").on("click", ".detail-receipt", function (e) {
                        e.preventDefault();
                        var id = $(this).parent().find(".id-item").text();
                        modalBillParticular(id).then(function (modal) {
                            $(".modal-body").empty();
                            $(".modal-body").append(modal);
                            $(".modal-footer").css("display", "none");
                            $(".my-modal").modal("show");
                        });
                    });

                    $.getScript("./js/acceptBill.js");
                }
            });
        }
        function loadDataReceipt(page) {
            $.ajax({
                type: "GET",
                url: "./database/getDataAdmin.php?type=" + type + "&item=" + obj.items + "&page=" + page,
                dataType: "json",
                success: function (data) {
                    if (page == 1 || page == 0) {
                        var title = `
                            <span class="col-sm-1 col-md-1 col-lg-2">ID</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Tên nhân viên</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Thời gian</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Tổng hóa đơn</span>
                            <span class="col-sm-1 col-md-1 col-lg-2">Chi tiết</span>
                            <span class="col-sm-1 col-md-1 col-lg-2">Chọn</span>
                        `
                        $(".list-item").children().first().empty();
                        $(".list-item").children().first().append(title);
                    }

                    $.each(data, function (i, val) {
                        var item = `
                        <div class="item row">
                        <span class="id-item col-sm-1 col-md-1 col-lg-2">${val.ID_RECEIPT}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">${val.FULLNAME}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">${val.DATE_RECEIPT}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">${parseInt(val.TOTAL_PRICE).toLocaleString("de-DE") + "đ"}</span>
                            <span class="col-sm-2 col-md-2 col-lg-2" ><i class="fas fa-solid fa-eye detail-receipt" data-id=${val.ID_RECEIPT}></i></span>
                            <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-2">
                        </div>
                        `

                        $(".list-item").append(item)
                    });

                    $(".detail-receipt").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data('id');

                        $.getScript("./js/modal.js");
                        modalReceiptsParticular(id).then(function (modal) {
                            $(".modal-body").empty()
                            $(".modal-body").append(modal)
                            $(".modal-footer").css("display", "none")
                            $(".modal-title").text("Chi tiết phiếu nhập")
                            $(".my-modal").modal('show')
                        })

                    });
                }
            });
        }

        function loadAuthoryze(page) {
            $.ajax({
                type: "GET",
                url: "./database/getDataAdmin.php?type=" + type + "&item=" + obj.items + "&page=" + page,
                dataType: "json",
                success: function (data) {
                    if (page == 1 || page == 0) {
                        var title = `
                            <span class="col-sm-1 col-md-1 col-lg-1">ID</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Tên nhóm quyền</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Người tạo</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Ngày tạo</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Người thay đổi</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">Ngày thay đổi</span>
                            <span class="col-sm-1 col-md-1 col-lg-1">Chọn</span>
                        `
                        $(".list-item").children().first().empty();
                        $(".list-item").children().first().append(title);
                    }

                    $.each(data, function (i, val) {

                        $.ajax({
                            type: "GET",
                            url: "./database/userDao.php?type=200&id=" + val['ID_ADMIN_ADD'],
                            dataType: "json",
                            success: function (admin) {
                                $.ajax({
                                    type: "GET",
                                    url: "./database/userDao.php?type=200&id=" + val['ID_ADMIN_UPDATE'],
                                    dataType: "json",
                                    success: function (response) {
                                        var item = `
                                        <div class="item row">
                                                <span class="id-item col-sm-1 col-md-1 col-lg-1">${val['ID_AUTHORIZE']}</span>
                                                <span class="name-au col-sm-2 col-md-2 col-lg-2">${val['AUTHORIZE_NAME']}</span>
                                                <span class="staff-cr col-sm-2 col-md-2 col-lg-2">${admin['FULLNAME']}</span>
                                                <span class="day-cr col-sm-2 col-md-2 col-lg-2">${val['CREATE_AT']}</span>
                                                <span class="staff-up col-sm-2 col-md-2 col-lg-2">${response['FULLNAME']}</span>
                                                <span class="day-up col-sm-2 col-md-2 col-lg-2">${val['UPDATE_AT']}</span>
                                                <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                        `
                                        $(".list-item").append(item)
                                    }
                                });
                            }
                        });

                    });
                }
            });
        }
    }


})(jQuery);
