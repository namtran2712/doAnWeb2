$(document).ready(function () {
    $(".size .group-btn-size .btn-size").eq(0).addClass("selected");
    
    var text =$(".price-after b span").text();
    text=parseInt(text);
    $(".price-after b span").text(text.toLocaleString("de-DE"));
    
    $(".sub-img li img").click(function (e) { 
        e.preventDefault();
        var srcSubImg = $(this).attr ('src');
        var srcMainImg = $(".main-img img").attr ('src');
        console.log (srcSubImg)
        console.log (srcMainImg)
        $(".main-img img").attr ('src', srcSubImg);
        $(this).attr ('src', srcMainImg);
    });

    $(".size .group-btn-size .btn-size").click(function (e) { 
        e.preventDefault();
        var price = $(this).data("price");
        $(".price-after b span").text(price.toLocaleString("de-DE"));
        var btns = document.querySelectorAll (".size .group-btn-size .btn-size")
        btns.forEach(btn => {
            if (btn.classList.contains ("selected")) {
                btn.classList.remove ("selected")
            }
        });
        $(this).addClass("selected");
    });

    function setValQuantityProduct (caculate) {
        var val = $("#quantity").val();
        val = parseInt (val);
        if (caculate == '-') {
            if (val-=1 > 0)
                $("#quantity").val(val);
        }
        else {
            $("#quantity").val(val+=1);
        }
    }

    $(".decrease").click(function (e) { 
        e.preventDefault();
        setValQuantityProduct ('-')
    });
    $(".increase").click(function (e) { 
        e.preventDefault();
        setValQuantityProduct ('+')
    });
});