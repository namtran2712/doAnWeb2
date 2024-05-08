
// Dữ liệu các thành phố và quận
var cityData = {
    "Hà Nội": [
        "Quận Ba Đình",
        "Quận Hoàn Kiếm",
        "Quận Hai Bà Trưng",
        "Quận Đống Đa",
        "Quận Tây Hồ",
        "Quận Cầu Giấy",
        "Quận Thanh Xuân",
        "Quận Hoàng Mai",
        "Quận Long Biên",
        "Quận Bắc Từ Liêm",
        "Quận Nam Từ Liêm",
        "Huyện Sóc Sơn",
        "Huyện Đông Anh",
        "Huyện Gia Lâm",
        "Huyện Thanh Trì",
        "Huyện Thanh Oai",
        "Huyện Mê Linh",
        "Huyện Hoài Đức",
        "Huyện Quốc Oai",
        "Huyện Thạch Thất",
        "Huyện Chương Mỹ",
        "Huyện Thanh Xuân",
        "Huyện Thường Tín",
        "Huyện Phú Xuyên",
        "Huyện Ứng Hòa",
        "Huyện Mỹ Đức"
    ],
    "TP.Hồ Chí Minh": [
        "Quận 1",
        "Quận 2",
        "Quận 3",
        "Quận 4",
        "Quận 5",
        "Quận 6",
        "Quận 7",
        "Quận 8",
        "Quận 9",
        "Quận 10",
        "Quận 11",
        "Quận 12",
        "Quận Bình Tân",
        "Quận Bình Thạnh",
        "Quận Gò Vấp",
        "Quận Phú Nhuận",
        "Quận Tân Bình",
        "Quận Tân Phú",
        "Quận Thủ Đức",
        "Quận Bình Chánh",
        "Quận Cần Giờ",
        "Quận Củ Chi",
        "Quận Hóc Môn",
        "Quận Nhà Bè"
    ],
    "Hải Phòng": [
        "Quận Hồng Bàng",
        "Quận Ngô Quyền",
        "Quận Lê Chân",
        "Quận Hải An",
        "Quận Kiến An",
        "Quận Đồ Sơn",
        "Quận Dương Kinh",
        "Quận Thủy Nguyên",
        "Quận An Dương",
        "Quận An Lão",
        "Quận Kiến Thụy",
        "Quận Tiên Lãng",
        "Quận Vĩnh Bảo",
        "Quận Cát Hải",
        "Huyện Bạch Long Vĩ"
    ],
    "Đà Nẵng": [
        "Quận Hải Châu",
        "Quận Thanh Khê",
        "Quận Sơn Trà",
        "Quận Ngũ Hành Sơn",
        "Quận Liên Chiểu",
        "Quận Cẩm Lệ",
        "Huyện Hòa Vang"
    ],
    "Cần Thơ": [
        "Quận Ninh Kiều",
        "Quận Bình Thủy",
        "Quận Cái Răng",
        "Quận Ô Môn",
        "Quận Thốt Nốt",
        "Huyện Vĩnh Thạnh",
        "Huyện Cờ Đỏ",
        "Huyện Phong Điền",
        "Huyện Thới Lai"
    ],
    "An Giang": [
        "Thành phố Long Xuyên",
        "Thị xã Châu Đốc",
        "Thị xã Tân Châu",
        "Huyện An Phú",
        "Huyện Châu Phú",
        "Huyện Châu Thành",
        "Huyện Chợ Mới",
        "Huyện Phú Tân",
        "Huyện Tịnh Biên",
        "Huyện Tri Tôn"
    ],
    "Bình Phước": [
        "Thị xã Đồng Xoài",
        "Thị xã Bình Long",
        "Huyện Bù Đăng",
        "Huyện Bù Đốp",
        "Huyện Bù Gia Mập",
        "Huyện Chơn Thành",
        "Huyện Đồng Phú",
        "Huyện Hớn Quản",
        "Huyện Lộc Ninh",
        "Huyện Phú Riềng"
    ],
    "Gia Lai": [
        "Thành phố Pleiku",
        "Thị xã An Khê",
        "Thị xã Ayun Pa",
        "Thị xã Kông Chro",
        "Huyện Chư Păh",
        "Huyện Chư Pưh",
        "Huyện Chư Sê",
        "Huyện Đăk Đoa",
        "Huyện Đăk Pơ",
        "Huyện Đức Cơ",
        "Huyện Ia Grai",
        "Huyện Ia Pa",
        "Huyện KBang",
        "Huyện Kông Chro",
        "Huyện Krông Pa",
        "Huyện Mang Yang",
        "Huyện Phú Thiện"
    ],
    "Kiên Giang": [
        "Thành phố Rạch Giá",
        "Thành phố Hà Tiên",
        "Thị xã Kiên Lương",
        "Thị xã Hòn Đất",
        "Thị xã An Biên",
        "Thị xã An Minh",
        "Huyện Châu Thành",
        "Huyện Giồng Riềng",
        "Huyện Gò Quao",
        "Huyện Hòn Đất",
        "Huyện Kiên Hải",
        "Huyện Kiên Lương",
        "Huyện Phú Quốc",
        "Huyện Tân Hiệp",
        "Huyện U Minh Thượng",
        "Huyện Vĩnh Thuận",
        "Huyện Giang Thành"
    ],
    "Bà Rịa – Vũng Tàu": [
        "Thành phố Vũng Tàu",
        "Thành phố Bà Rịa",
        "Huyện Châu Đức",
        "Huyện Côn Đảo",
        "Huyện Đất Đỏ",
        "Huyện Long Điền",
        "Huyện Tân Thành",
        "Huyện Xuyên Mộc"
    ],
    "Bình Thuận": [
        "Thành phố Phan Thiết",
        "Thị xã La Gi",
        "Huyện Bắc Bình",
        "Huyện Đức Linh",
        "Huyện Hàm Tân",
        "Huyện Hàm Thuận Bắc",
        "Huyện Hàm Thuận Nam",
        "Huyện Phú Quí",
        "Huyện Tánh Linh",
        "Huyện Tuy Phong"
    ],
    "Hà Giang": [
        "Thành phố Hà Giang",
        "Huyện Bắc Mê",
        "Huyện Bắc Quang",
        "Huyện Đồng Văn",
        "Huyện Hoàng Su Phì",
        "Huyện Mèo Vạc",
        "Huyện Quản Bạ",
        "Huyện Quang Bình",
        "Huyện Vị Xuyên",
        "Huyện Xín Mần",
        "Huyện Yên Minh"
    ],
    "Kon Tum": [
        "Thành phố Kon Tum",
        "Huyện Đắk Glei",
        "Huyện Đắk Hà",
        "Huyện Đắk Tô",
        "Huyện Kon Plông",
        "Huyện Kon Rẫy",
        "Huyện Ngọc Hồi",
        "Huyện Sa Thầy",
        "Huyện Tu Mơ Rông"
    ],
    "Bạc Liêu": [
        "Thành phố Bạc Liêu",
        "Huyện Đông Hải",
        "Huyện Giá Rai",
        "Huyện Hòa Bình",
        "Huyện Hồng Dân",
        "Huyện Phước Long",
        "Huyện Vĩnh Lợi"
    ],
    "Cà Mau": [
        "Thành phố Cà Mau",
        "Huyện Cái Nước",
        "Huyện Đầm Dơi",
        "Huyện Năm Căn",
        "Huyện Ngọc Hiển",
        "Huyện Phú Tân",
        "Huyện Thới Bình",
        "Huyện Trần Văn Thời",
        "Huyện U Minh",
        "Thị xã Cái Nước"
    ],
    "Hà Nam": [
        "Thành phố Phủ Lý",
        "Huyện Bình Lục",
        "Huyện Duy Tiên",
        "Huyện Kim Bảng",
        "Huyện Lý Nhân",
        "Huyện Thanh Liêm"
    ],
    "Lai Châu": [
        "Thành phố Lai Châu",
        "Huyện Mường Tè",
        "Huyện Phong Thổ",
        "Huyện Sìn Hồ",
        "Huyện Tam Đường",
        "Huyện Tân Uyên",
        "Huyện Than Uyên",
        "Huyện Nậm Nhùn"
    ],
    "Bắc Giang": [
        "Thành phố Bắc Giang",
        "Thị xã Hưng Yên",
        "Huyện Hiệp Hòa",
        "Huyện Lạng Giang",
        "Huyện Lục Nam",
        "Huyện Lục Ngạn",
        "Huyện Sơn Động",
        "Huyện Tân Yên",
        "Huyện Việt Yên",
        "Huyện Yên Dũng",
        "Huyện Yên Thế"
    ],
    "Cao Bằng": [
        "Thành phố Cao Bằng",
        "Huyện Bảo Lâm",
        "Huyện Bảo Lạc",
        "Huyện Hạ Lang",
        "Huyện Hà Quảng",
        "Huyện Hoà An",
        "Huyện Nguyên Bình",
        "Huyện Phục Hoà",
        "Huyện Quảng Uyên",
        "Huyện Thạch An",
        "Huyện Thông Nông",
        "Huyện Trà Lĩnh",
        "Huyện Trùng Khánh"
    ],
    "Hà Tĩnh": [
        "Thành phố Hà Tĩnh",
        "Thị xã Hồng Lĩnh",
        "Huyện Cẩm Xuyên",
        "Huyện Can Lộc",
        "Huyện Đức Thọ",
        "Huyện Hương Khê",
        "Huyện Hương Sơn",
        "Huyện Kỳ Anh",
        "Huyện Lộc Hà",
        "Huyện Nghi Xuân",
        "Huyện Thạch Hà",
        "Huyện Vũ Quang"
    ],
    "Lạng Sơn": [
        "Thành phố Lạng Sơn",
        "Huyện Bắc Sơn",
        "Huyện Bình Gia",
        "Huyện Cao Lộc",
        "Huyện Chi Lăng",
        "Huyện Đình Lập",
        "Huyện Hữu Lũng",
        "Huyện Lộc Bình",
        "Huyện Tràng Định",
        "Huyện Văn Lãng",
        "Huyện Văn Quan"
    ],
    "Bắc Kạn": [
        "Thành Phố Bắc Kạn",
        "Huyện Ba Bể",
        "Huyện Bạch Thông",
        "Huyện Chợ Đồn",
        "Huyện Chợ Mới",
        "Huyện Na Rì",
        "Huyện Ngân Sơn",
        "Huyện Pác Nặm"
    ],
    "Đắk Lắk": [
        "Thành phố Buôn Ma Thuột",
        "Thành phố Buôn Hồ",
        "Huyện Buôn Đôn",
        "Huyện Cư Kuin",
        "Huyện Cư M'gar",
        "Huyện Ea Kar",
        "Huyện Ea Súp",
        "Huyện Krông Ana",
        "Huyện Krông Bông",
        "Huyện Krông Buk",
        "Huyện Krông Năng",
        "Huyện Krông Pắc",
        "Huyện Lắk",
        "Huyện M'Đrắk",
        "Huyện Krông Buk",
        "Huyện Krông Nô"
    ],
    "Hải Dương": [
        "Thành phố Hải Dương",
        "Thị xã Chí Linh",
        "Huyện Bình Giang",
        "Huyện Cẩm Giàng",
        "Huyện Gia Lộc",
        "Huyện Kim Thành",
        "Huyện Kinh Môn",
        "Huyện Nam Sách",
        "Huyện Ninh Giang",
        "Huyện Thanh Hà",
        "Huyện Thanh Miện",
        "Huyện Tứ Kỳ"
    ],
    "Lào Cai": [
        "Thành phố Lào Cai",
        "Huyện Bắc Hà",
        "Huyện Bảo Thắng",
        "Huyện Bảo Yên",
        "Huyện Bát Xát",
        "Huyện Mường Khương",
        "Huyện Sa Pa",
        "Huyện Si Ma Cai",
        "Huyện Văn Bàn"
    ],
    "Bắc Ninh": [
        "Thành phố Bắc Ninh",
        "Thị xã Từ Sơn",
        "Huyện Gia Bình",
        "Huyện Lương Tài",
        "Huyện Quế Võ",
        "Huyện Thuận Thành",
        "Huyện Yên Phong"
    ],
    "Đắk Nông": [
        "Thành phố Gia Nghĩa",
        "Huyện Cư Jút",
        "Huyện Đắk Glong",
        "Huyện Đắk Mil",
        "Huyện Đắk R'Lấp",
        "Huyện Đắk Song",
        "Huyện Krông Nô",
        "Huyện Tuy Đức"
    ],
    "Hậu Giang": [
        "Thành phố Vị Thanh",
        "Huyện Châu Thành",
        "Huyện Châu Thành A",
        "Huyện Long Mỹ",
        "Huyện Phụng Hiệp",
        "Huyện Vị Thủy",
        "Thị xã Ngã Bảy"
    ],
    "Lâm Đồng": [
        "Thành phố Đà Lạt",
        "Thị xã Bảo Lộc",
        "Thị xã Đạ Huoai",
        "Huyện Bảo Lâm",
        "Huyện Cát Tiên",
        "Huyện Đạ Tẻh",
        "Huyện Đam Rông",
        "Huyện Di Linh",
        "Huyện Đơn Dương",
        "Huyện Đức Trọng",
        "Huyện Lạc Dương"
    ],
    "Bến Tre": [
        "Thành phố Bến Tre",
        "Huyện Ba Tri",
        "Huyện Bình Đại",
        "Huyện Châu Thành",
        "Huyện Chợ Lách",
        "Huyện Giồng Trôm",
        "Huyện Mỏ Cày Bắc",
        "Huyện Mỏ Cày Nam",
        "Huyện Thạnh Phú"
    ],
    "Điện Biên": [
        "Thành phố Điện Biên Phủ",
        "Huyện Điện Biên",
        "Huyện Điện Biên Đông",
        "Huyện Mường Ảng",
        "Huyện Mường Chà",
        "Huyện Mường Nhé",
        "Huyện Mường Lay",
        "Huyện Tủa Chùa",
        "Huyện Tuần Giáo",
        "Thị xã Mường Lay"
    ],
    "Hòa Bình": [
        "Thành phố Hòa Bình",
        "Huyện Cao Phong",
        "Huyện Đà Bắc",
        "Huyện Kim Bôi",
        "Huyện Kỳ Sơn",
        "Huyện Lạc Sơn",
        "Huyện Lạc Thủy",
        "Huyện Lương Sơn",
        "Huyện Mai Châu",
        "Huyện Tân Lạc",
        "Huyện Yên Thủy"
    ],
    "Nam Định": [
        "Thành phố Nam Định",
        "Huyện Giao Thủy",
        "Huyện Hải Hậu",
        "Huyện Mỹ Lộc",
        "Huyện Nam Trực",
        "Huyện Nghĩa Hưng",
        "Huyện Trực Ninh",
        "Huyện Vụ Bản",
        "Thị xã Bảo Lạc"
    ],
    "Bình Dương": [
        "Thành phố Thủ Dầu Một",
        "Thị xã Bến Cát",
        "Thị xã Dĩ An",
        "Thị xã Phú Giáo",
        "Huyện Bắc Tân Uyên",
        "Huyện Dầu Tiếng",
        "Huyện Dĩ An",
        "Huyện Phú Giáo",
        "Huyện Tân Uyên",
        "Huyện Thuận An"
    ],
    "Đồng Nai": [
        "Thành phố Biên Hòa",
        "Thị xã Long Khánh",
        "Thị xã Nhơn Trạch",
        "Huyện Cẩm Mỹ",
        "Huyện Định Quán",
        "Huyện Long Thành",
        "Huyện Tân Phú",
        "Huyện Thống Nhất",
        "Huyện Trảng Bom",
        "Huyện Vĩnh Cửu",
        "Huyện Xuân Lộc"
    ],
    "Hưng Yên": [
        "Thành phố Hưng Yên",
        "Huyện Ân Thi",
        "Huyện Khoái Châu",
        "Huyện Kim Động",
        "Huyện Mỹ Hào",
        "Huyện Phù Cừ",
        "Huyện Tiên Lữ",
        "Huyện Văn Giang",
        "Huyện Văn Lâm",
        "Huyện Yên Mỹ"
    ],
    "Long An": [
        "Thành phố Tân An",
        "Thị xã Kiến Tường",
        "Huyện Bến Lức",
        "Huyện Cần Đước",
        "Huyện Cần Giuộc",
        "Huyện Châu Thành",
        "Huyện Đức Hòa",
        "Huyện Đức Huệ",
        "Huyện Mộc Hóa",
        "Huyện Tân Hưng",
        "Huyện Tân Thạnh",
        "Huyện Tân Trụ",
        "Huyện Thạnh Hóa",
        "Huyện Thủ Thừa",
        "Huyện Vĩnh Hưng"
    ],
    "Bình Định": [
        "Thành phố Quy Nhơn",
        "Thị xã An Nhơn",
        "Thị xã Hoài Nhơn",
        "Huyện An Lão",
        "Huyện Hoài Ân",
        "Huyện Phù Mỹ",
        "Huyện Phù Cát",
        "Huyện Tây Sơn",
        "Huyện Tuy Phước",
        "Huyện Vân Canh",
        "Huyện Vĩnh Thạnh"
    ],
    "Đồng Tháp": [
        "Thành phố Cao Lãnh",
        "Thành phố Sa Đéc",
        "Thị xã Hồng Ngự",
        "Huyện Cao Lãnh",
        "Huyện Châu Thành",
        "Huyện Hồng Ngự",
        "Huyện Lai Vung",
        "Huyện Lấp Vò",
        "Huyện Tam Nông",
        "Huyện Tân Hồng",
        "Huyện Thanh Bình",
        "Huyện Tháp Mười"
    ],
    "Khánh Hòa": [
        "Thành phố Nha Trang",
        "Thị xã Cam Ranh",
        "Huyện Cam Lâm",
        "Huyện Diên Khánh",
        "Huyện Khánh Sơn",
        "Huyện Khánh Vĩnh",
        "Huyện Trường Sa",
        "Huyện Vạn Ninh",
        "Huyện Ninh Hòa"
    ],
    "Ninh Bình": [
        "Thành phố Ninh Bình",
        "Thị xã Tam Điệp",
        "Huyện Gia Viễn",
        "Huyện Hoa Lư",
        "Huyện Kim Sơn",
        "Huyện Nho Quan",
        "Huyện Yên Khánh",
        "Huyện Yên Mô"
    ],
    "Nghệ An": [
        "Thành phố Vinh",
        "Thành phố Cửa Lò",
        "Thị xã Thái Hoà",
        "Huyện Anh Sơn",
        "Huyện Con Cuông",
        "Huyện Diễn Châu",
        "Huyện Đô Lương",
        "Huyện Hưng Nguyên",
        "Huyện Kỳ Sơn",
        "Huyện Nam Đàn",
        "Huyện Nghi Lộc",
        "Huyện Nghĩa Đàn",
        "Huyện Quế Phong",
        "Huyện Quỳ Châu",
        "Huyện Quỳ Hợp",
        "Huyện Quỳnh Lưu",
        "Huyện Tân Kỳ",
        "Huyện Thanh Chương",
        "Huyện Tương Dương",
        "Huyện Yên Thành"
    ],
    "Phú Thọ": [
        "Thành phố Việt Trì",
        "Thị xã Phú Thọ",
        "Huyện Cẩm Khê",
        "Huyện Đoan Hùng",
        "Huyện Hạ Hoà",
        "Huyện Lâm Thao",
        "Huyện Phù Ninh",
        "Huyện Tam Nông",
        "Huyện Tân Sơn",
        "Huyện Thanh Ba",
        "Huyện Thanh Sơn",
        "Huyện Thanh Thuỷ",
        "Huyện Yên Lập"
    ],
    "Quảng Bình": [
        "Thành phố Đồng Hới",
        "Thị xã Ba Đồn",
        "Huyện Bố Trạch",
        "Huyện Lệ Thủy",
        "Huyện Minh Hóa",
        "Huyện Quảng Ninh",
        "Huyện Quảng Trạch",
        "Huyện Tuyên Hóa"
    ],
    "Quảng Ngãi": [
        "Thành phố Quảng Ngãi",
        "Thị xã Duy Xuyên",
        "Thị xã Đức Phổ",
        "Huyện Ba Tơ",
        "Huyện Bình Sơn",
        "Huyện Minh Long",
        "Huyện Mộ Đức",
        "Huyện Nghĩa Hành",
        "Huyện Sơn Hà",
        "Huyện Sơn Tây",
        "Huyện Sơn Tịnh",
        "Huyện Tây Trà"
    ],
    "Ninh Thuận": [
        "Thành phố Phan Rang-Tháp Chàm",
        "Huyện Bác Ái",
        "Huyện Ninh Hải",
        "Huyện Ninh Phước",
        "Huyện Ninh Sơn",
        "Huyện Thuận Bắc",
        "Huyện Thuận Nam"
    ],
    "Phú Yên": [
        "Thành phố Tuy Hòa",
        "Thị xã Đông Hòa",
        "Huyện Đông Hòa",
        "Huyện Đồng Xuân",
        "Huyện Phú Hòa",
        "Huyện Sơn Hòa",
        "Huyện Sông Hinh",
        "Huyện Tây Hòa",
        "Huyện Tuy An"
    ],
    "Quảng Nam": [
        "Thành phố Hội An",
        "Thành phố Tam Kỳ",
        "Thị xã Điện Bàn",
        "Huyện Bắc Trà My",
        "Huyện Đại Lộc",
        "Huyện Đông Giang",
        "Huyện Duy Xuyên",
        "Huyện Hiệp Đức",
        "Huyện Nam Giang",
        "Huyện Nam Trà My",
        "Huyện Nông Sơn",
        "Huyện Núi Thành",
        "Huyện Phú Ninh",
        "Huyện Phước Sơn",
        "Huyện Quế Sơn",
        "Huyện Tây Giang",
        "Huyện Thăng Bình",
        "Huyện Tiên Phước"
    ],
    "Quảng Ninh": [
        "Thành phố Hạ Long",
        "Thành phố Cẩm Phả",
        "Thành phố Uông Bí",
        "Thành phố Móng Cái",
        "Thị xã Đông Triều",
        "Thị xã Quảng Yên",
        "Huyện Bái Cháy",
        "Huyện Bình Liêu",
        "Huyện Cô Tô",
        "Huyện Đầm Hà",
        "Huyện Hải Hà",
        "Huyện Tiên Yên",
        "Huyện Vân Đồn"
    ],
    "Quảng Trị": [
        "Thành phố Đông Hà",
        "Thị xã Quảng Trị",
        "Huyện Cam Lộ",
        "Huyện Cồn Cỏ",
        "Huyện Đa Krông",
        "Huyện Gio Linh",
        "Huyện Hải Lăng",
        "Huyện Hướng Hóa",
        "Huyện Triệu Phong",
        "Huyện Vĩnh Linh"
    ],
    "Sóc Trăng": [
        "Thành phố Sóc Trăng",
        "Huyện Châu Thành",
        "Huyện Cù Lao Dung",
        "Huyện Kế Sách",
        "Huyện Long Phú",
        "Huyện Mỹ Tú",
        "Huyện Mỹ Xuyên",
        "Huyện Ngã Năm",
        "Huyện Thạnh Trị",
        "Huyện Trần Đề",
        "Huyện Vĩnh Châu"
    ],
    "Sơn La": [
        "Thành phố Sơn La",
        "Huyện Bắc Yên",
        "Huyện Mai Sơn",
        "Huyện Mộc Châu",
        "Huyện Mường La",
        "Huyện Phù Yên",
        "Huyện Quỳnh Nhai",
        "Huyện Sông Mã",
        "Huyện Sốp Cộp",
        "Huyện Thuận Châu",
        "Huyện Vân Hồ",
        "Huyện Yên Châu"
    ],
    "Tây Ninh": [
        "Thành phố Tây Ninh",
        "Huyện Bến Cầu",
        "Huyện Châu Thành",
        "Huyện Dương Minh Châu",
        "Huyện Gò Dầu",
        "Huyện Hòa Thành",
        "Huyện Tân Biên",
        "Huyện Tân Châu",
        "Huyện Trảng Bàng"
    ],
    "Thái Bình": [
        "Thành phố Thái Bình",
        "Huyện Đông Hưng",
        "Huyện Hưng Hà",
        "Huyện Kiến Xương",
        "Huyện Quỳnh Phụ",
        "Huyện Thái Thụy",
        "Huyện Tiền Hải",
        "Huyện Vũ Thư"
    ],
    "Thái Nguyên": [
        "Thành phố Thái Nguyên",
        "Thành phố Sông Công",
        "Huyện Đại Từ",
        "Huyện Định Hóa",
        "Huyện Đồng Hỷ",
        "Huyện Phổ Yên",
        "Huyện Phú Bình",
        "Huyện Phú Lương",
        "Huyện Võ Nhai"
    ],
    "Thanh Hóa": [
        "Thành phố Thanh Hóa",
        "Thành phố Sầm Sơn",
        "Thị xã Bỉm Sơn",
        "Huyện Bá Thước",
        "Huyện Cẩm Thủy",
        "Huyện Đông Sơn",
        "Huyện Hà Trung",
        "Huyện Hậu Lộc",
        "Huyện Hoằng Hóa",
        "Huyện Lang Chánh",
        "Huyện Mường Lát",
        "Huyện Nga Sơn",
        "Huyện Ngọc Lặc",
        "Huyện Như Thanh",
        "Huyện Như Xuân",
        "Huyện Nông Cống",
        "Huyện Quan Hóa",
        "Huyện Quan Sơn",
        "Huyện Quảng Xương",
        "Huyện Thạch Thành",
        "Huyện Thiệu Hóa",
        "Huyện Thọ Xuân",
        "Huyện Thường Xuân",
        "Huyện Tĩnh Gia",
        "Huyện Triệu Sơn",
        "Huyện Vĩnh Lộc",
        "Huyện Yên Định"
    ],
    "Thừa Thiên Huế": [
        "Thành phố Huế",
        "Thị xã Hương Thủy",
        "Thị xã Hương Trà",
        "Huyện A Lưới",
        "Huyện Nam Đông",
        "Huyện Phong Điền",
        "Huyện Phú Lộc",
        "Huyện Phú Vang",
        "Huyện Quảng Điền"
    ],
    "Tiền Giang": [
        "Thành phố Mỹ Tho",
        "Thị xã Cai Lậy",
        "Thị xã Gò Công",
        "Huyện Cái Bè",
        "Huyện Cai Lậy",
        "Huyện Châu Thành",
        "Huyện Chợ Gạo",
        "Huyện Gò Công Đông",
        "Huyện Gò Công Tây",
        "Huyện Tân Phước",
        "Huyện Tân Phú Đông"
    ],
    "Trà Vinh": [
        "Thành phố Trà Vinh",
        "Huyện Càng Long",
        "Huyện Cầu Kè",
        "Huyện Cầu Ngang",
        "Huyện Châu Thành",
        "Huyện Duyên Hải",
        "Huyện Tiểu Cần",
        "Huyện Trà Cú",
        "Huyện Duyên Hải",
        "Thị xã Duyên Hải"
    ],
    "Tuyên Quang": [
        "Thành phố Tuyên Quang",
        "Huyện Chiêm Hóa",
        "Huyện Hàm Yên",
        "Huyện Lâm Bình",
        "Huyện Na Hang",
        "Huyện Sơn Dương",
        "Huyện Yên Sơn"
    ],
    "Vĩnh Long": [
        "Thành phố Vĩnh Long",
        "Thị xã Bình Minh",
        "Huyện Bình Tân",
        "Huyện Long Hồ",
        "Huyện Mang Thít",
        "Huyện Tam Bình",
        "Huyện Trà Ôn",
        "Huyện Vũng Liêm"
    ],
    "Vĩnh Phúc": [
        "Thành phố Vĩnh Yên",
        "Thị xã Phúc Yên",
        "Huyện Bình Xuyên",
        "Huyện Lập Thạch",
        "Huyện Sông Lô",
        "Huyện Tam Dương",
        "Huyện Tam Đảo",
        "Huyện Vĩnh Tường",
        "Huyện Yên Lạc"
    ],
    "Yên Bái": [
        "Thành phố Yên Bái",
        "Thị xã Nghĩa Lộ",
        "Huyện Lục Yên",
        "Huyện Mù Cang Chải",
        "Huyện Trạm Tấu",
        "Huyện Trấn Yên",
        "Huyện Văn Chấn",
        "Huyện Văn Yên"
    ]
}
var districtData = {
    "Quận Ba Đình": [
        "Phường Phúc Xá",
        "Phường Trúc Bạch",
        "Phường Vĩnh Phúc",
        "Phường Cống Vị",
        "Phường Liễu Giai"
    ],
    "Quận Hoàn Kiếm": [
        "Phường Phan Chu Trinh",
        "Phường Hàng Bài",
        "Phường Hàng Trống",
        "Phường Lý Thái Tổ",
        "Phường Đồng Xuân"
    ],
    "Quận Hai Bà Trưng": [
        "Phường Bạch Đằng",
        "Phường Bách Khoa",
        "Phường Bùi Thị Xuân",
        "Phường Đống Mác",
        "Phường Đồng Nhân"
    ],
    "Quận Đống Đa": [
        "Phường Cát Linh",
        "Phường Hàng Bột",
        "Phường Khâm Thiên",
        "Phường Khương Thượng",
        "Phường Kim Liên"
    ],
    "Quận Tây Hồ": [
        "Phường Bưởi",
        "Phường Nhật Tân",
        "Phường Phú Thượng",
        "Phường Quảng An",
        "Phường Thụy Khuê"
    ],
    "Quận Cầu Giấy": [
        "Phường Dịch Vọng",
        "Phường Dịch Vọng Hậu",
        "Phường Mai Dịch",
        "Phường Nghĩa Đô",
        "Phường Nghĩa Tân"
    ],
    "Quận Thanh Xuân": [
        "Phường Hạ Đình",
        "Phường Khương Đình",
        "Phường Khương Mai",
        "Phường Khương Trung",
        "Phường Kim Giang"
    ],
    "Quận Hoàng Mai": [
        "Phường Đại Kim",
        "Phường Định Công",
        "Phường Giáp Bát",
        "Phường Hoàng Liệt",
        "Phường Hoàng Văn Thụ"
    ],
    "Quận Long Biên": [
        "Phường Bồ Đề",
        "Phường Cự Khối",
        "Phường Đức Giang",
        "Phường Giang Biên",
        "Phường Gia Thụy"
    ],
    "Quận Bắc Từ Liêm": [
        "Phường Cổ Nhuế 1",
        "Phường Cổ Nhuế 2",
        "Phường Đông Ngạc",
        "Phường Đức Thắng",
        "Phường Liên Mạc"
    ],
    "Quận Nam Từ Liêm": [
        "Phường Cầu Diễn",
        "Phường Đại Mỗ",
        "Phường Mễ Trì",
        "Phường Mỹ Đình 1",
        "Phường Mỹ Đình 2"
    ],
    "Huyện Sóc Sơn": [
        "Thị trấn Sóc Sơn",
        "Xã Bắc Sơn",
        "Xã Bắc Sơn",
        "Xã Cổ Loa",
        "Xã Đông Xuân"
    ],
    "Huyện Đông Anh": [
        "Thị trấn Đông Anh",
        "Xã Bắc Hồng",
        "Xã Cổ Loa",
        "Xã Dục Tú",
        "Xã Kim Chung"
    ],
    "Huyện Gia Lâm": [
        "Thị trấn Trâu Quỳ",
        "Xã Bát Tràng",
        "Xã Cổ Bi",
        "Xã Dương Hà",
        "Xã Kim Lan"
    ],
    "Huyện Thanh Trì": [
        "Thị trấn Văn Điển",
        "Xã Cự Khê",
        "Xã Hữu Hoà",
        "Xã Ngũ Hiệp",
        "Xã Tả Thanh Oai"
    ],
    "Huyện Thanh Oai": [
        "Thị trấn Kim Bài",
        "Xã Bích Hòa",
        "Xã Bình Minh",
        "Xã Cao Dương",
        "Xã Cao Viên"
    ],
    "Huyện Mê Linh": [
        "Thị trấn Quang Minh",
        "Xã Chi Đông",
        "Xã Chu Phan",
        "Xã Đại Thịnh",
        "Xã Đồng Thịnh"
    ],
    "Huyện Hoài Đức": [
        "Thị trấn Trạm Trôi",
        "Xã An Khánh",
        "Xã An Thượng",
        "Xã Cát Quế",
        "Xã Di Trạch"
    ],
    "Huyện Quốc Oai": [
        "Thị trấn Quốc Oai",
        "Xã Cấn Hữu",
        "Xã Cộng Hòa",
        "Xã Đông Xuân",
        "Xã Đông Yên"
    ],
    "Huyện Thạch Thất": [
        "Thị trấn Liên Quan",
        "Xã Bình Phú",
        "Xã Bình Yên",
        "Xã Cẩm Yên",
        "Xã Chàng Sơn"
    ],
    "Huyện Chương Mỹ": [
        "Thị trấn Chúc Sơn",
        "Xã Đại Yên",
        "Xã Đồng Lạc",
        "Xã Đông Phương Yên",
        "Xã Đông Sơn"
    ],
    "Huyện Thường Tín": [
        "Thị trấn Thường Tín",
        "Xã Chương Dương",
        "Xã Dũng Tiến",
        "Xã Hiền Giang",
        "Xã Hòa Bình"
    ],
    "Huyện Phú Xuyên": [
        "Thị trấn Phú Minh",
        "Xã Bạch Hạ",
        "Xã Châu Can",
        "Xã Chuyên Mỹ",
        "Xã Cộng Lạc"
    ],
    "Huyện Ứng Hòa": [
        "Thị trấn Vân Đình",
        "Xã Cao Thành",
        "Xã Đại Cường",
        "Xã Đại Hùng",
        "Xã Đỗ Động"
    ],
    "Huyện Mỹ Đức": [
        "Thị trấn Đại Nghĩa",
        "Xã An Mỹ",
        "Xã An Phú",
        "Xã An Tiến",
        "Xã An Xuân"
    ],

    // Dữ liệu cho TP.Hồ Chí Minh
    "Quận 1": [
        "Phường Bến Nghé",
        "Phường Bến Thành",
        "Phường Cầu Kho",
        "Phường Cầu Ông Lãnh",
        "Phường Cô Giang"
    ],
    "Quận 2": [
        "Phường An Phú",
        "Phường Bình An",
        "Phường Thảo Điền",
        "Phường Thủ Thiêm",
        "Phường Bình Trưng Tây"
    ],
    "Quận 3": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận 4": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận 5": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận 6": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận 7": [
        "Phường Bình Thuận",
        "Phường Phú Mỹ",
        "Phường Phú Thuận",
        "Phường Tân Hưng",
        "Phường Tân Kiểng"
    ],
    "Quận 8": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận 9": [
        "Phường Long Bình",
        "Phường Long Phước",
        "Phường Long Thạnh Mỹ",
        "Phường Long Trường",
        "Phường Phú Hữu"
    ],
    "Quận 10": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận 11": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận 12": [
        "Phường An Phú Đông",
        "Phường Đông Hưng Thuận",
        "Phường Hiệp Thành",
        "Phường Tân Chánh Hiệp",
        "Phường Tân Thới Hiệp"
    ],
    "Quận Bình Tân": [
        "Phường An Lạc",
        "Phường An Lạc A",
        "Phường Bình Hưng Hòa",
        "Phường Bình Hưng Hòa A",
        "Phường Bình Hưng Hòa B"
    ],
    "Quận Bình Thạnh": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận Gò Vấp": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận Phú Nhuận": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận Tân Bình": [
        "Phường 1",
        "Phường 2",
        "Phường 3",
        "Phường 4",
        "Phường 5"
    ],
    "Quận Tân Phú": [
        "Phường Hiệp Tân",
        "Phường Hoà Thạnh",
        "Phường Phú Thọ Hòa",
        "Phường Phú Trung",
        "Phường Sơn Kỳ"
    ],
    "Quận Thủ Đức": [
        "Phường An Khánh",
        "Phường An Lợi Đông",
        "Phường Bình Chiểu",
        "Phường Bình Thọ",
        "Phường Bình Trưng Đông"
    ],
    "Quận Bình Chánh": [
        "Xã Bình Chánh",
        "Xã Bình Hưng",
        "Xã Bình Lợi",
        "Xã Đa Phước",
        "Xã Hưng Long"
    ],
    "Quận Cần Giờ": [
        "Xã An Thới Đông",
        "Xã Bình Khánh",
        "Xã Long Hòa",
        "Xã Lý Nhơn",
        "Xã Tam Thôn Hiệp"
    ],
    "Quận Củ Chi": [
        "Xã An Nhơn Tây",
        "Xã An Phú",
        "Xã Bình Mỹ",
        "Xã Hòa Phú",
        "Xã Nhuận Đức"
    ],
    "Quận Hóc Môn": [
        "Xã Bà Điểm",
        "Xã Đông Thạnh",
        "Xã Nhị Bình",
        "Xã Tân Hiệp",
        "Xã Tân Thới Nhì"
    ],
    "Quận Nhà Bè": [
        "Phường Hiệp Phước",
        "Phường Long Thới",
        "Phường Nhà Bè",
        "Phường Nhơn Đức",
        "Phường Phú Xuân"
    ],

    // Dữ liệu cho Hải Phòng
    "Quận Hồng Bàng": [
        "Phường Hạ Lý",
        "Phường Hàng Kênh",
        "Phường Hàng Khoé",
        "Phường Hàng Trống",
        "Phường Lãm Hà"
    ],
    "Quận Ngô Quyền": [
        "Phường Cầu Đất",
        "Phường Đằng Giang",
        "Phường Đằng Lâm",
        "Phường Đông Khê",
        "Phường Đổng Quốc Bình"
    ],
    "Quận Lê Chân": [
        "Phường Cát Dài",
        "Phường Cát Bi",
        "Phường Cát Nằm",
        "Phường Đông Hải 1",
        "Phường Đông Hải 2"
    ],
    "Quận Hải An": [
        "Phường Cát Bi",
        "Phường Đằng Hải",
        "Phường Đằng Lâm",
        "Phường Đông Hải 1",
        "Phường Đông Hải 2"
    ],
    "Quận Kiến An": [
        "Phường Bắc Sơn",
        "Phường Đồng Hoà",
        "Phường Lãm",
        "Phường Lam Sơn",
        "Phường Phạm Hồng Thái"
    ],
    "Quận Đồ Sơn": [
        "Phường Hải Thành",
        "Phường Hòa Đẩu",
        "Phường Minh Đức",
        "Phường Ngọc Xuyên",
        "Phường Vạn Hương"
    ],
    "Quận Dương Kinh": [
        "Phường Anh Dũng",
        "Phường Đa Phúc",
        "Phường Hưng Đạo",
        "Phường Kênh Dương",
        "Phường Nam Hải"
    ],
    "Quận Thủy Nguyên": [
        "Phường An Hòa",
        "Phường An Hưng",
        "Phường An Hồng",
        "Phường Cát Bi",
        "Phường Đông Hải 1"
    ],
    "Quận An Dương": [
        "Phường An Dương",
        "Phường Đông Hải",
        "Phường Hồng Phong",
        "Phường Lê Lợi",
        "Phường Lê Lợi"
    ],
    "Quận An Lão": [
        "Phường An Lão",
        "Phường Bát Trang",
        "Phường Lão Hộ",
        "Phường Lão Xa",
        "Phường Phù Lãng"
    ],
    "Quận Kiến Thụy": [
        "Phường Đa Phúc",
        "Phường Đại Thắng",
        "Phường Đông Sơn",
        "Phường Đỗ Nha",
        "Phường Hải Thành"
    ],
    "Quận Tiên Lãng": [
        "Phường Bạch Đằng",
        "Phường Cấp Tiến",
        "Phường Đại Thành",
        "Phường Hợp Đức",
        "Phường Tiên Cường"
    ],
    "Quận Vĩnh Bảo": [
        "Phường An Lư",
        "Phường Cao Minh",
        "Phường Cao Nhân",
        "Phường Cổ Am",
        "Phường Dũng Tiến"
    ],
    "Quận Cát Hải": [
        "Thị trấn Cát Bà",
        "Xã Gia Luận",
        "Xã Hiền Hào",
        "Xã Nghĩa Lộ",
        "Xã Phù Long"
    ],
    "Huyện Bạch Long Vĩ": [
        "Xã Điền Xá",
        "Xã Đồng Sơn",
        "Xã Đông Hải",
        "Xã Đồng Xá",
        "Xã Hải Sơn"
    ],

    // Dữ liệu cho Đà Nẵng
    "Quận Hải Châu": [
        "Phường Bình Hiên",
        "Phường Bình Thuận",
        "Phường Hải Châu 1",
        "Phường Hải Châu 2",
        "Phường Hòa Cường Bắc"
    ],
    "Quận Thanh Khê": [
        "Phường An Khê",
        "Phường Chính Gián",
        "Phường Hòa Khê",
        "Phường Tam Thuận",
        "Phường Tân Chính"
    ],
    "Quận Sơn Trà": [
        "Phường An Hải Bắc",
        "Phường An Hải Đông",
        "Phường An Hải Tây",
        "Phường Mân Thái",
        "Phường Nại Hiên Đông"
    ],
    "Quận Ngũ Hành Sơn": [
        "Phường Hòa Hải",
        "Phường Hòa Quý",
        "Phường Khuê Mỹ",
        "Phường Mỹ An",
        "Phường Mỹ Đa"
    ],
    "Quận Liên Chiểu": [
        "Phường Hòa Hiệp Bắc",
        "Phường Hòa Hiệp Nam",
        "Phường Hòa Khánh Bắc",
        "Phường Hòa Khánh Nam",
        "Phường Hòa Minh"
    ],

    // Dữ liệu cho Cần Thơ
    "Quận Ninh Kiều": [
        "Phường An Bình",
        "Phường An Cư",
        "Phường An Hòa",
        "Phường An Khánh",
        "Phường An Phú"
    ],
    "Quận Bình Thủy": [
        "Phường An Thới",
        "Phường Bình Thủy",
        "Phường Trà An",
        "Phường Trà Nóc",
        "Phường Thới An"
    ],
    "Quận Cái Răng": [
        "Phường Ba Láng",
        "Phường Hưng Phú",
        "Phường Hưng Thạnh",
        "Phường Lê Bình",
        "Phường Phú Thứ"
    ],
    "Quận Ô Môn": [
        "Phường Châu Văn Liêm",
        "Phường Long Hưng",
        "Phường Thới An",
        "Phường Thới Hưng",
        "Phường Thới Long"
    ],
    "Quận Thốt Nốt": [
        "Phường Thuận An",
        "Phường Thuận Hưng",
        "Phường Thốt Nốt",
        "Phường Trung Kiên",
        "Phường Trung Nhứt"
    ],
};

// Lấy tham chiếu đến nút "Thêm địa chỉ", overlay, form và nút "Trở lại"
var addAddressButton = document.getElementById('addAddress');
var overlay = document.getElementById('overlay');
var centeredForm = document.getElementById('centeredForm');
var backButton = document.getElementById('backButton');

// Thêm sự kiện click vào nút "Thêm địa chỉ"
addAddressButton.addEventListener('click', function () {
    // Hiển thị overlay và form khi nút được click
    overlay.style.display = 'block';
    centeredForm.style.display = 'block';
    $(".btnRepair").hide();
    $(".btnAdd").show();

});

// Xử lý sự kiện submit của form



// Thêm sự kiện click vào nút "Trở lại"
backButton.addEventListener('click', function () {
    // Ẩn form và overlay khi nút "Trở lại" được click
    overlay.style.display = 'none';
    centeredForm.style.display = 'none';
});

// Hiển thị dropdown và mở rộng div cha
document.getElementById("address").addEventListener("click", function () {
    document.getElementById("addressDropdown").style.display = "block";
    // Lấy phần tử div có id là "city"
    var cityDiv = document.getElementById("city").style.display = "block";
});

// Đóng dropdown và thu nhỏ div cha
window.addEventListener("click", function (event) {
    var dropdown = document.getElementById("addressDropdown");
    var addressInput = document.getElementById("address");
    if (!event.target.closest("#addressDropdown") && event.target !== addressInput) {
        dropdown.style.display = "none";
    }
});


function loadDataAddress() {
    $.ajax({
        type: "GET",
        url: "./database/userDao.php?type=197&idAccount=" + $idAccount,
        dataType: "json",
        success: function (data) {
            $(".addressContainer").empty();
            $.each(data, function (indexInArray, valueOfElement) {
                var div = `
                <div class="address ">
                    <div class="addressInfo">
                        <div class="nameAndPhone">
                            <p class="name">${$fullname}</p>
                            <p>${$phone}</p>
                        </div>
                        <div class="addressDetails me-3">
                            <p>${valueOfElement.SHIPPING_ADDRESS}</p>
                        </div>
                        <div class="setDefault mt-5 text-danger" data-id=${valueOfElement.ID_USER_SHIPPING_ADDRESS}>
                            
                        </div>           
                    </div>
                    
                    <div class="button-container">
                        <div class="btnTop">
                            <button class="btnUpdate" data-id=${valueOfElement.ID_USER_SHIPPING_ADDRESS}>Cập nhật</button>
                            <button class="btnDelete" data-id =${valueOfElement.ID_USER_SHIPPING_ADDRESS}>Xóa</button>
                        </div>
                        <button class="btnDefault">Thiết lập mặc định</button>
                    </div>
                </div>
                `
                $(".addressContainer").append(div);


            });
            $(".btnDelete").off("click")
            $(".btnDelete").click(function () {
                var idAddress = $(".btnDelete").data("id")
                $.ajax({
                    type: "GET",
                    url: "./database/userDao.php?type=196&idAddress=" + idAddress,
                    dataType: "html",
                    success: function (response) {
                        if (response == 1)
                            loadDataAddress()
                    }
                });
            })


            $(".btnDefault").off("click")
            $(".btnDefault").click(function () {
                $(".setDefault").html('<span class ="border border-danger"> Mặc định </span>')
            })

            $(".btnUpdate").off("click")
            $(".btnUpdate").click(function () {
                overlay.style.display = 'block';
                centeredForm.style.display = 'block';
                var idAddress = $(".btnUpdate").data("id")
                $.ajax({
                    type: "GET",
                    url: "./database/userDao.php?type=189&idAddress=" + idAddress,
                    dataType: "json",
                    success: function (response) {
                        arraySlipAddress= (response.SHIPPING_ADDRESS.split(", "))
                        $("#addressNote").val(arraySlipAddress[0]);

                        // cộng 2 để bỏ qua ", " 
                        $("#address").val(response.SHIPPING_ADDRESS.substring(arraySlipAddress[0].length+2));


                    }
                });
                $(".btnRepair").show();
                $(".btnAdd").hide ();
                $(".btnRepair").click (function (){
                    if (checkEmpty(["#addressNote"])) {
                        $("#addressNote").addClass("border border-danger")
                    }
                    if (checkEmpty(["#address"])) {
                        $("#address").addClass("border border-danger")
                    }

                    $.ajax({
                        type: "POST",
                        url: "./database/userDao.php?type=188",
                        data: {
                            idAddress :idAddress,
                            address: $("#addressNote").val()+ ", " + $("#address").val () 
                        },
                        dataType: "html",
                        success: function (response) {
                           console.log (response)
                        }
                    });
                })

            })
        }
    });
}

function showDistricts(city) {
    var districtList = document.getElementById("districtList");
    districtList.innerHTML = ""; // Xóa danh sách quận cũ

    cityData[city].forEach(function (district) {
        var listItem = document.createElement("li");
        listItem.textContent = district;
        // Thêm sự kiện onclick cho mỗi quận/huyện để cập nhật giá trị input
        listItem.onclick = function () {
            showWards(district);
            updateAddress(city, district);
        };
        districtList.appendChild(listItem);
    });

    // Cập nhật giá trị của input "address" với tên thành phố đã chọn
    var addressInput = document.getElementById("address");
    addressInput.value = city;

    // Mở tab quận/huyện
    var districtTab = document.getElementById("district");
    openTab(event, 'district');
}

// Hiển thị danh sách phường/xã khi người dùng chọn một quận/huyện
function showWards(district) {
    var wardList = document.getElementById("wardList");
    wardList.innerHTML = ""; // Xóa danh sách phường/xã cũ

    districtData[district].forEach(function (ward) {
        var listItem = document.createElement("li");
        listItem.textContent = ward;
        // Thêm sự kiện onclick cho mỗi phường/xã để cập nhật giá trị input
        listItem.onclick = function () {
            updateAddressWard(district, ward);
        };
        wardList.appendChild(listItem);
    });

    // Mở tab phường/xã
    var wardTab = document.getElementById("ward");
    openTab(event, 'ward');
}

// Hàm cập nhật giá trị của input "address" khi người dùng click vào một phường/xã
function updateAddressWard(district, ward) {
    var addressInput = document.getElementById("address");
    var currentValue = addressInput.value;
    // Kiểm tra xem đã có giá trị trước đó trong input hay không
    if (currentValue) {
        addressInput.value = currentValue + ", " + ward;
    } else {
        addressInput.value = ward;
    }
}

// Hàm cập nhật giá trị của input "address" khi người dùng click vào một quận/huyện
function updateAddress(city, district) {
    var addressInput = document.getElementById("address");
    addressInput.value = city + ", " + district;
}

// Hàm mở tab và hiển thị phần ul tương ứng
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("#addressDropdown tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


$(document).ready(function () {
    $idAccount = -1;
    $fullname = ""
    $phone = ""
    $.ajax({
        type: "get",
        url: "./database/userDao.php?type=200",
        dataType: "json",
        success: function (data) {
            $fullname = data.FULLNAME;
            $phone = data.PHONE_NUMBER;
            $("#fullname").val($fullname);
            $("#phone").val($phone)
            $idAccount = data.ID_ACCOUNT
            loadDataAddress();

        }
    });
    $.getScript("./js/validate.js", function (script, textStatus, jqXHR) {
        console.log("Tải thành công validate trong login.js")
    });
    var cityList = document.getElementById("cityList");
    Object.keys(cityData).forEach(function (city) {
        var listItem = document.createElement("li");
        listItem.textContent = city;
        listItem.onclick = function () {
            showDistricts(city);
        };
        cityList.appendChild(listItem);
    });


    $(".btnAdd").click(function (event) {
        event.preventDefault();
        if (checkEmpty(["#addressNote"])) {
            $("#addressNote").addClass("border border-danger")
        }
        if (checkEmpty(["#address"])) {
            $("#address").addClass("border border-danger")
        }
        else {
            $.ajax({
                type: "POST",
                url: "./database/userDAO.php?type=199",
                data: {
                    idAccount: $idAccount,
                    shipingAddress: ($("#addressNote").val() + ", " + $("#address").val())

                },
                dataType: "html",
                success: function (data) {
                    if (data == 1) {
                        alert('Địa chỉ mới đã được thêm!');
                        overlay.style.display = 'none';
                        centeredForm.style.display = 'none';
                        $("#addressNote").val("");
                        $("#address").val("");
                        loadDataAddress()
                    }
                }
            });
        }
    })



});

