$(document).ready(function () {
    function toggleImg(selector) {
        var display = $(selector).parent().find(".img").css('display');
        if (display == "block") {
            $(".modal-body .img").slideUp();
            $(selector).find('i').removeClass('active');
        }
        else {
            $(".modal-body button").find('i').removeClass('active');
            $(selector).find('i').toggleClass('active');
            $(".modal-body .img").slideUp();
            $(selector).parent().find(".img").slideToggle("slow");
        }
    }

    function changeImg(selector) {
        var file = selector.files[0];

        var formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: './database/updateData.php?type=1',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                $(selector).parent().find('img').attr('src', data)
            },
        });
    }

    function deleteImg(selector) {
        Swal.fire({
            title: "Chắn chắn muốn xóa?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Xóa thành công",
                    text: "",
                    icon: "success"
                });
                $(selector).parent().parent().remove();
            }
        });
    }

    function addImg(selector) {
        $(selector).parent().find('input').trigger('click');
        $(selector).parent().find('input').change(function (e) {
            var file = this.files[0];

            var formData = new FormData();
            formData.append('file', file);
            $.ajax({
                url: './database/updateData.php?type=1',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    var content = `
                    <button type="button"
                        class="btn col-sm-12 col-md-12 col-lg-12 btn-md btn-primary">
                        Ảnh được thêm
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <div class="img col-sm-12 col-md-12 col-lg-12">
                        <img src="${data}" class="img-fluid" alt="">
                        <input type="file" name="update-img" class="update-img form-control" accept="image/*">
                        <button type="button" class="btn btn-danger delete-img">Xóa ảnh</button>
                    </div>
                    `
                    var tail = `
                    <div class="form-group-product col-sm-12 col-md-12 col-lg-12 row">
                        <button type="button" class="btn btn-success add-img">Thêm ảnh mới</button>
                        <input type="file" name="update-img" class="form-control" accept="image/*" style="display: none;">
                    </div>
                    `
                    $(".add-img").parent().empty();
                    $(".form-group-product").last().append(content);
                    $(".form-group-product").parent().append(tail);

                    $(".modal-body button , .delete-img , .update-img , .add-img").off("click")

                    $(".modal-body button").click(function (e) {
                        toggleImg(this)
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
                },
            });
        })
    }

    function getInfoAddProduct(id) {
        var size = []
        var price = []
        var remain = []
        var linkSubImg = []
        var mainImg = $(".form-group-product").eq(4).find("img").attr("src")
        var quantitySubImg = $(".form-group-product").length - 6

        $.each($("#size-product option"), function (i, val) {
            size.push($(val).text())
            price.push($(val).val())
            remain.push($(val).data("remain"))
        });

        $.each($(".form-group-product").slice(5, $(".form-group-product").length - 1), function (i, val) {
            linkSubImg.push($(val).find("img").attr("src"))
        });


        var product = {
            id: id,
            name: $("#product-name").val(),
            category: $("#category-product").val(),
            material: $("#material-product").val(),
            size: size,
            price: price,
            remain: remain,
            sold: $("#sold-product").val(),
            mainImage: mainImg,
            quantityImage: quantitySubImg,
            linkSub: linkSubImg
        }
        return product;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { toggleImg, changeImg, deleteImg, addImg, getInfoAddProduct };
    }
    else {
        window.toggleImg = toggleImg;
        window.changeImg = changeImg;
        window.deleteImg = deleteImg;
        window.addImg = addImg;
        window.getInfoAddProduct = getInfoAddProduct;
    }
});