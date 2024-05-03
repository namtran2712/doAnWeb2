// Tạo option cho ngày (mặc định từ 1 đến 31)

function initInfo() {
    $.ajax({
        type: "get",
        url: "./database/userDao.php?type=200",
        dataType: "json",
        success: function (data) {
            $("#fullname").val(data.FULLNAME);
            $("#username").val(data.USERNAME);
            $("#phone").val(data.PHONE_NUMBER)
        }
    });
}
function createDayOptions() {
    var daySelect = document.getElementById("day");
    daySelect.innerHTML = ""; // Xóa các option cũ

    var selectedMonth = document.getElementById("month").value;
    var daysInMonth = new Date(document.getElementById("year").value, selectedMonth, 0).getDate();

    for (var i = 1; i <= daysInMonth; i++) {
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        daySelect.appendChild(option);
    }
}

// Tạo option cho tháng (mặc định từ 1 đến 12)
function createMonthOptions() {
    var monthSelect = document.getElementById("month");
    monthSelect.innerHTML = ""; // Xóa các option cũ

    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        monthSelect.appendChild(option);
    }
    // Mỗi khi tháng thay đổi, cập nhật lại số ngày
    monthSelect.addEventListener("change", createDayOptions);
}

// Tạo option cho năm (từ 1900 đến năm hiện tại)
function createYearOptions() {
    var yearSelect = document.getElementById("year");
    yearSelect.innerHTML = ""; // Xóa các option cũ

    var currentYear = new Date().getFullYear();
    for (var i = 1900; i <= currentYear; i++) {
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        yearSelect.appendChild(option);
    }
    // Mỗi khi năm thay đổi, cập nhật lại số ngày
    yearSelect.addEventListener("change", createDayOptions);
}

// Khởi tạo các tùy chọn ban đầu
$(document).ready(function () {
    createDayOptions();
    createMonthOptions();
    createYearOptions();
    initInfo()
})