$(document).ready(function () {
    $.when(
        $.getScript("js\\pagingForAdmin.js")
    ).done(function () {
    })

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
});