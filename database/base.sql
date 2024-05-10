USE webbantrangsuc
INSERT INTO material (MATERIAL_NAME)
VALUES ("BẠC"),
    ("VÀNG"),
    ("KIM CƯƠNG");
INSERT INTO category (CATEGORY_NAME)
VALUES ("NHẪN"),
    ("DÂY CHUYỀN"),
    ("BÔNG TAI"),
    ("KIỀNG"),
    ("VÒNG TAY");
INSERT INTO tasks(TASK_NAME)
VALUES ("Phân quyền"),
    ("Qlí sản phẩm"),
    ("Qlí khách hàng"),
    ("Qlí nhân viên"),
    ("Qlí tài khoản"),
    ("Qlí hóa đơn"),
    ("Qlí phiếu nhập"),
    ("Qlí nhập hàng"),
    ("Qlí thống kê");
INSERT INTO actions(ACTION_NAME)
VALUES ("Creacte"),
    ("Update"),
    ("Delete"),
    ("Readonly");
INSERT INTO authorizes(AUTHORIZE_NAME, ID_ADMIN_ADD, ID_ADMIN_UPDATE)
VALUES ("Khách hàng", 1, 1),
    ("Nhân viên kho", 1, 1),
    ("Quản lí bán hàng", 1, 1),
    ("Quản lí", 1, 1),
    ("Kế toán", 1, 1),
    ("Nhân viên", 1, 1),
    ("Admin", 1, 1),
    ("VIP", 1, 1);
INSERT INTO particular_authorize(ID_AUTHORIZE, ID_TASK, ID_ACTION)
VALUES (8, 1, 1),
    (8, 2, 1),
    (8, 3, 1),
    (8, 4, 1),
    (8, 5, 1),
    (8, 6, 1),
    (8, 7, 1),
    (8, 8, 1),
    (8, 9, 1);