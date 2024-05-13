$(document).ready(function () {

    function loadCrud(id, type) {
        return new Promise(function (resolve, reject) {
            $.when(
                $.ajax({
                    type: "get",
                    url: "./database/authoriesDao.php?type=14&id=" + id,
                    dataType: "json"
                })
            )
                .done(function (data) {
                    $(".list-item").find(".item.row").remove();
                    var obj = null
                    $(".list-item").Paging(obj, type);
                    $(".crud").empty();
                    var check = false
                    $.each(data, function (i, val) {
                        if (val['ID_ACTION'] == 1) {
                            var add =
                                `
                            <div class="create bg-success" data-id="1">
                                <i class="fas fa-regular fa-circle-plus"></i>
                                <span>Thêm</span>
                            </div>
                            `
                            check = true
                            $('.crud').append(add);
                        }
                        else if (val['ID_ACTION'] == 2) {
                            var up =
                                `
                                <div class="update bg-warning" data-id="2" data-toggle="modal" data-target=".my-modal">
                                <i class="fas fa-solid fa-pen-to-square"></i> <span>Sửa</span>
                                </div>
                                `
                            $('.crud').append(up);
                            check = true
                        }
                        else if (val['ID_ACTION'] == 3) {
                            var del =
                                `
                                <div class="delete bg-danger" data-id="3">
                                    <i class="fas fa-regular fa-trash"></i>
                                    <span>Xóa</span>
                                </div>
                                `
                            $('.crud').append(del);
                            check = true
                        }
                    });
                    if (!check) {
                        $(".crud").css("display", "none")
                    }
                    $.getScript("./js/addData.js");
                    $.getScript("./js/updateData.js");
                    $.getScript("./js/deleteData.js");
                    resolve("")

                })
        })
    }

    $.when(
        $.getScript("js\\pagingForAdmin.js")
    ).done(function () {
    })

    return new Promise(function (resolve, reject) {
        $.when(
            $.ajax({
                type: "GET",
                url: "./database/authoriesDao.php?type=10",
                dataType: "json",
            })
        ).done(function (data) {

            var li = $(".list-group li")
            $.each(li, function (i, val) {
                var check = false
                $.each(data, function (j, value) {
                    if ($(val).data("id") == value['ID_TASK']) {
                        $(val).css("display", "block");
                        check = true
                    }
                });
                if (check == false && $(val).data("id") != 10) {
                    $(val).remove();
                }
            });

            $(".list-group li").eq(0).find("a").attr("class", "list-group-item list-group-item-action py-3 fw-bold fs-7 text-right active");

            var type = $("a.active").parent().attr("id");

            loadCrud($(".list-group li").eq(0).data("id"), type)

            $(".btn-show-sidebar").click(function (e) {
                e.preventDefault();
                $(".sidebar").toggleClass("toggle");
                $(this).hide();
            });
            $(".btn-hide-sidebar").click(function (e) {
                e.preventDefault();
                $(".sidebar").toggleClass("toggle");
                setTimeout(() => {
                    $(".btn-show-sidebar").show();

                }, 300);
            });

            const header = document.querySelector(".header");
            const crud = document.querySelector(".crud")
            const crudFake = document.querySelector(".crud-fake")
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        crud.classList.add('fixed');
                        crudFake.classList.add('fixed')
                        const height = crud.offsetHeight;
                        crudFake.style.height = height + 'px';
                    } else {
                        crud.classList.remove('fixed');
                        crudFake.classList.remove('fixed')
                        crudFake.style.height = 0 + 'px';
                    }
                });
            }, {
                rootMargin: '80px 0px 0px 0px'
            });
            observer.observe(header);

            $("#logout").click(function (e) {
                e.preventDefault();
                $.get("./database/accountDao.php?type=3",
                    function (data) {
                        if (data) {
                            window.location.href = "./index.php"
                        }
                    },
                    "html"
                );
            });

            $(".list-group-item.list-group-item-action").click(function (e) {
                e.preventDefault();
                var btns = document.querySelectorAll(".list-group-item.list-group-item-action");

                btns.forEach(btn => {
                    if (btn.classList.contains("active")) {
                        btn.classList.remove("active")
                    }
                });

                $(this).addClass("active");
                setTimeout(() => {
                    $(".btn-show-sidebar").show();

                }, 300);

                $(".sidebar").toggleClass("toggle");

                var type = $(this).parent().attr("id");
                loadCrud($(this).parent().data('id'), type).then(function (i) {

                })


            });
        })
    })
});