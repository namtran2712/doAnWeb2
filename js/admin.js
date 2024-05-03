$(document).ready(function () {
    $.when(
        $.getScript("js\\pagingForAdmin.js")
    ).done(function () {
        console.log("Tất cả các file đã được tải ở admin!");
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
            $.each(li, function (j, liChild) {
                var d = $(liChild).data('id')
                $.each(data, function (i, val) {
                    if (d == val["ID_TASK"]) {
                        if (i == 0) {
                            $(liChild).find("a").addClass("active");
                        }
                        $(liChild).css("display", "block");
                    }
                });
            });

            var obj = {};
            var type = $("a.active").parent().attr("id");
            console.log($(".list-group-item.list-group-item-action"))
            $(".list-item").Paging(obj, type);

            $(".btn-show-sidebar").click(function (e) {
                e.preventDefault();
                $(".sidebar").toggleClass("toggle");
            });

            const header = document.querySelector(".header");
            const crud = document.querySelector(".crud")
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        console.log(123)
                        crud.classList.add('fixed');
                    } else {
                        crud.classList.remove('fixed');
                    }
                });
            }, {
                rootMargin: '80px 0px 0px 0px'
            });
            observer.observe(header);



            $(".list-group-item.list-group-item-action").click(function (e) {
                e.preventDefault();
                var btns = document.querySelectorAll(".list-group-item.list-group-item-action");

                btns.forEach(btn => {
                    if (btn.classList.contains("active")) {
                        btn.classList.remove("active")
                    }
                });

                $(this).addClass("active");

                var type = $(this).parent().attr("id");
                $(".sidebar").toggleClass("toggle");

                $(".list-item").find(".item.row").remove();
                var obj = null
                $(".list-item").Paging(obj, type);
            });
        })
    })


});