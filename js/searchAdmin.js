$(document).ready(function () {
   
    $(".btn-search-admin").click(function (e) { 
        e.preventDefault();
        var search=$("#search-admin").val();
        var table = $(".sidebar ul li a.active").parents().attr("id");
        if(table=="sanPham")
        {
            $(".list-item").find(".item.row").remove();
            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
            var obj = null
            $(".list-item").Paging(obj, type,search);
            $("#search-admin").val("")
        }
        else if(table=="khachHang")
        {
            $(".list-item").find(".item.row").remove();
            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
            var obj = null
            $(".list-item").Paging(obj, type,search);
            $("#search-admin").val("")

        }
        else if(table=="nhanVien")
        {
            $(".list-item").find(".item.row").remove();
            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
            var obj = null
            $(".list-item").Paging(obj, type,search);
            $("#search-admin").val("")

        }
        else if(table=="taiKhoan")
        {
            $(".list-item").find(".item.row").remove();
            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
            var obj = null
            $(".list-item").Paging(obj, type,search);
            $("#search-admin").val("")

        }
        else if(table=="phanQuyen")
        {
            $(".list-item").find(".item.row").remove();
            var type = $(".list-group-item.list-group-item-action.active").parent().attr("id");
            var obj = null
            $(".list-item").Paging(obj, type,search);
            $("#search-admin").val("")

        }
    });
});