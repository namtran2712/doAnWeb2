$(document).ready(function () {
    $(".list-item").on("click", ".btn-status", function (e) {
        e.preventDefault();
        var id = $(this).parent().find(".id-item").text()
        var status = parseInt($(this).data("status"))
        var mess = ''
        var currentBtn = $(this)
        switch (status) {
            case 0:
                mess = "Xác nhận đơn hàng"
                break;
            case 1:
                mess = "Xác nhận giao hàng"
                break;
            case 2:
                text = "Đang vận chuyển";
                button = "btn-orange";
                break;
            case 3:
                text = "Giao hàng thành công";
                button = "btn-success";
                break;
            case 4:
                text = "Đơn hàng đã hoàn thành";
                button = "btn-secondary";
            default:
                text = ""
                break;
        }
        if (status < 2 && status != -1) {
            Swal.fire({
                title: mess,
                text: "",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý"
            }).then((result) => {
                if (result.isConfirmed) {
                    $.get("./database/billDao.php?type=3&id=" + id,
                        function (data) {
                            console.log(status)
                            if (status + 1 == 1) {
                                var text = "giao hàng";
                                var button = "btn-info";
                                var val = `btn-status col-sm-2 btn ${button} col-md-2 col-lg-2`
                                currentBtn.attr("class", val);
                                currentBtn.text(text)
                                currentBtn.data("status", status + 1);
                                console.log(currentBtn.data("status"))
                            }
                            else if (status + 1 == 2) {
                                var text = "Đang vận chuyển";
                                var button = "btn-orange";
                                var val = `btn-status col-sm-2 btn ${button} col-md-2 col-lg-2`
                                currentBtn.attr("class", val);
                                currentBtn.text(text)
                                currentBtn.data("status", status + 1);
                                console.log(currentBtn.data("status"))
                            }
                        },
                        "html"
                    );
                }
            });
        }
    });
});