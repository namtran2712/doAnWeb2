(function ($) {
    $.fn.dataProductBestSeller = function (options) {
        var defaults = {
            showArea: "#productBestSeller",
            items: 12,

        };
        $.extend(options, defaults);
        var showArea = $(options.showArea);

        init()
        function init() {
            $.ajax({
                type: "GET",
                url: "./database/productDao.php?type=4&items=12",
                dataType: "json",
                success: function (data) {
                    createCard(data)
                    // console.log (data)

                    $(".card-img-top").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data("id")
                        getData(id)
                    });

                    $(".card-title").click(function (e) {
                        e.preventDefault();
                        var id = $(this).data("id")
                        getData(id)
                    });
                }
            });
        }
        function createCard(data) {
            $.each(data, function (i, valueOfElement) {
                var card = `
                <div class="card mx-2 " style="width: 300px; ">
                    <img src="${valueOfElement.MAIN_IMAGE}" class="card-img-top img-fluid" alt="" data-id=${valueOfElement.ID_PRODUCT}>
                    <div class="card-body ">
                        <div class="title-name">
                            <p class="card-title text-center" data-id=${valueOfElement.ID_PRODUCT}>${valueOfElement.PRODUCT_NAME}</p>
                        </div>
                        <div class="title-price ">
                            <p class="card-text text-center">
                            ${parseInt(valueOfElement.PRICE).toLocaleString("de-DE")} đ
                            </p>
                        </div>
                        
                    </div>
                </div>
                `
                // console.log(card);
                showArea.append(card)
            });
            $.getScript("slickslider.js")
            bestsellerSlick();

        }
        function getData(id) {
            $.ajax({
                type: "GET",
                url: "./database/getData.php?id=" + id + "&type=processDP",
                dataType: "html",
                success: function (data) {
                    window.location.href = "./detailProduct.php"
                }
            });
        }
    }
}(jQuery));

$(document).ready(function () {
    $options = {}
    $("#productBestSeller").dataProductBestSeller($options)
});
