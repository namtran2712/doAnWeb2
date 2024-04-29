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

        $(".content .show-more").children('button').click(function (e) {
            e.preventDefault();
            console.log(obj)
            obj.currentPage++
            if (type == "sanPham")
                loadDataProduct(obj.currentPage)
            else if (type == "khachHang" || type == "nhanVien")
                loadDataUser(obj.currentPage)
            else if (type == "taiKhoan")
                loadDataAccount(obj.currentPage)
            console.log(obj)
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
                    if (type == "sanPham") {
                        loadDataProduct(obj.currentPage)
                    }
                    else if (type == "khachHang" || type == "nhanVien") {
                        loadDataUser(obj.currentPage)
                    }
                    else if (type == "taiKhoan") {
                        loadDataAccount(obj.currentPage)
                    }
                    if (obj.currentPage == obj.totalPage || obj.totalPage == 0) {
                        $(".content .show-more").children('button').css('display', 'none');
                    }
                }
            });
        }

        function loadDataProduct(page) {
            $.ajax({
                type: "GET",
                url: "./database/getDataAdmin.php?type=sanPham&item=" + obj.items + "&page=" + page,
                dataType: "json",
                success: function (data) {
                    if (page == 1) {
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
                                        `<option value="${item.SIZE}" data-price="${item.PRICE}">${item.SIZE}</option>`
                                    )

                                    tmp = item.ID_PRODUCT

                                    endItem.push(`
                                        </select>
                                        <span class="col-sm-1 col-md-1 col-lg-1 val-price">${parseInt(item.PRICE).toLocaleString("de-DE")}đ</span>
                                        <span class="col-sm-1 col-md-1 col-lg-1">${item.QUANTITY_REMAIN}</span>
                                        <input type="checkbox" name="" id="" class="col-sm-1 col-md-1 col-lg-1">
                                    </div>
                                    `)
                                }
                                else {
                                    subItem[0].id.push(item.ID_PRODUCT)
                                    subItem[0].size.push(`<option value="${item.SIZE}" data-price="${item.PRICE}">${item.SIZE}</option>`)
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
                        price = parseInt(price).toLocaleString("de-DE")
                        price += "đ"
                        $(this).parent().find('.val-price').text(price)
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
                    if (page == 1) {
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
                            <span class="col-sm-2 col-md-2 col-lg-2">username</span>
                            <span class="col-sm-2 col-md-2 col-lg-2">password</span>
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
    }


})(jQuery);
