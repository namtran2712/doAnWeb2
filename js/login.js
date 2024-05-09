
$(document).ready(function () {

    $.getScript("./js/validate.js", function (script, textStatus, jqXHR) {
        console.log("Tải thành công validate trong login.js")
    });
    $.getScript("./js/modal.js", function (script, textStatus, jqXHR) {
        console.log("Tải thành công modal trong login.js")
    });

    checkCurrentAccount()
    $(".btn-login").click(function (e) {
        e.preventDefault();
        var content = modalFormLogin();
        $(".modal-title").text("Đăng nhập")
        $(".modal-body").empty();
        $(".modal-body").append(content);
        $(".form-group #password ~ i").click(function (e) {
            e.preventDefault();
            if ($(this).hasClass("fa-solid fa-lock")) {
                $(this).removeClass("fa-solid fa-lock");
                $(this).addClass("fa-solid fa-unlock");
                $("#password").attr("type", "text");
            }
            else {
                $(this).removeClass("fa-solid fa-unlock");
                $(this).addClass("fa-solid fa-lock");
                $("#password").attr("type", "password");
            }
        });
        $(".btn-register , .login").css("display", "block");
        $(".register").css("display", "none");
        $(".my-modal").modal('show')
    });

    $(".login").click(function (e) {
        e.preventDefault();
        if (checkEmpty([
            "#username",
            "#password"
        ])) {
            Swal.fire({
                title: "Không thể để trống các trường!!!",
                text: "",
                icon: "error"
            });
        }
        else {
            $.ajax({
                type: "POST",
                url: "./database/accountDao.php?type=1",
                data: {
                    username: $("#username").val(),
                    password: $("#password").val()
                },
                dataType: "html",
                success: function (data) {
                    if (data == 1) {
                        $.ajax({
                            type: "get",
                            url: "./database/accountDao.php?type=100",
                            dataType: "json",
                            success: function (data) {
                                var a = `
                                <a href="user.php" data-id=${data.idUser} >${data.username}</a>
                                `
                                $(".info").append(a)
                            }
                        });
                        $('.btn-login').off('click');
                        $(".my-modal").modal("hide")
                        $(".info").empty();

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Đăng nhập thành công",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        
                    }
                    else if (data == 0) {
                        Swal.fire({
                            title: "",
                            text: "Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu!!",
                            icon: "error"
                        });
                    }
                    else if (data == 2) {
                        Swal.fire({
                            title: "",
                            text: "Tài khoản của bạn đã bị khóa!",
                            icon: "warning"
                        });
                    }
                    else if (data == 3) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Đăng nhập thành công",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            window.location.href = "admin.php"
                        }, 1600);
                    }
                    console.log (data)
                }
            });
        }
    });

    function checkCurrentAccount() {
        $.ajax({
            type: "GET",
            url: "./database/accountDao.php?type=2",
            dataType: "html",
            success: function (data) {
                if (data == 1) {
                    $('.btn-login').off('click');
                    $(".info").empty();
                    $.ajax({
                        type: "get",
                        url: "./database/accountDao.php?type=100",
                        dataType: "json",
                        success: function (data) {
                            var a = `
                            <a href="user.php" data-id=${data.idUser} >${data.username}</a>
                            `
                            $(".info").append(a)
                            console.log(data);
                        }
                    });
                    $(".btn-logout").click(function (e) {
                        e.preventDefault();
                        $.ajax({
                            type: "GET",
                            url: "./database/accountDao.php?type=3",
                            dataType: "html",
                            success: function (data) {
                            }
                        });
                    });
                }
            }
        });
    }

    $(".btn-register").click(function (e) {
        e.preventDefault();
        $(".modal").modal("hide")
        setTimeout(() => {
            var content = modalFormRegister();
            $(".modal-title").text("Đăng kí")
            $(".btn-register , .login").css("display", "none");
            $(".register").css("display", "block")
            $(".modal-body").empty();
            $(".modal-body").append(content);
            $(".form-group #password ~ i").click(function (e) {
                e.preventDefault();
                if ($(this).hasClass("fa-solid fa-lock")) {
                    $(this).removeClass("fa-solid fa-lock");
                    $(this).addClass("fa-solid fa-unlock");
                    $("#password").attr("type", "text");
                }
                else {
                    $(this).removeClass("fa-solid fa-unlock");
                    $(this).addClass("fa-solid fa-lock");
                    $("#password").attr("type", "password");
                }
            });
            $(".modal").modal("show");
        }, 500);
    });

    $(".register").click(function (e) {
        e.preventDefault();
        if (checkEmpty([
            "#fullname",
            "phone-number",
            "#birthday",
            "#username",
            "#password"
        ])) {
            Swal.fire({
                title: "Không thể để trống các trường!!!",
                text: "",
                icon: "error"
            });
        }
        else {
            if (checkName($("#fullname").val()) != false &&
                checkPhone($("#phone-number").val()) &&
                checkAge($("#birthday").val()) &&
                checkUsername($("#username").val()) &&
                checkPassword($("#password").val())) {
                var fullname = checkName($("#fullname").val());
                var phoneNumber = $("#phone-number").val();
                var birthday = $("#birthday").val();
                var username = $("#username").val();
                var password = $("#password").val();
                $.ajax({
                    type: "POST",
                    url: "./database/accountDao.php?type=4",
                    data: {
                        fullname: fullname,
                        phoneNumber: phoneNumber,
                        birthday: birthday,
                        username: username,
                        password: password
                    },
                    dataType: "html",
                    success: function (data) {
                        console.log(data)
                        if (data != 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Đăng kí thành công",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            $(".my-modal").modal("hide")
                            setTimeout(() => {
                                var content = modalFormLogin();
                                $(".modal-title").text("Đăng nhập")
                                $(".modal-body").empty();
                                $(".modal-body").append(content);
                                $(".form-group #password ~ i").click(function (e) {
                                    e.preventDefault();
                                    if ($(this).hasClass("fa-solid fa-lock")) {
                                        $(this).removeClass("fa-solid fa-lock");
                                        $(this).addClass("fa-solid fa-unlock");
                                        $("#password").attr("type", "text");
                                    }
                                    else {
                                        $(this).removeClass("fa-solid fa-unlock");
                                        $(this).addClass("fa-solid fa-lock");
                                        $("#password").attr("type", "password");
                                    }
                                });
                                $("#username").val(username);
                                $("#password").val(password);
                                $(".btn-register , .login").css("display", "block");
                                $(".register").css("display", "none");
                                $(".my-modal").modal('show')
                            }, 500);
                        }
                        else {
                            Swal.fire({
                                title: "",
                                text: "Tên đăng nhập hoặc số điện thoại đã tồn tại!!",
                                icon: "warning"
                            });
                        }
                    }
                });
            }
            else {
                Swal.fire({
                    title: "",
                    text: "Vui lòng kiểm tra lại thông tin đăng kí!!",
                    icon: "error"
                });
            }
        }
    });

});