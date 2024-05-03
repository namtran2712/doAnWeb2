INSERT INTO USERS (FULLNAME, PHONE_NUMBER, BIRTHDAY)
VALUES (
        "Trần Nhật Nam",
        "0976290389",
        "2004-12-27"
    ),
    (
        "Nguyễn Thành Nam",
        "0987654321",
        "2004-1-1"
    ),
    (
        "Nguyễn Nhật Nam",
        "0123456789",
        "2004-11-20"
    ),
    (
        "Nguyễn Văn A",
        "0123456788",
        "2004-12-27"
    ),
    (
        "Nguyễn Văn B",
        "0987654322",
        "2004-12-27"
    );
INSERT INTO AUTHORIZES (ID_AUTHORIZE, AUTHORIZE_NAME)
VALUES (1, "Nhân viên"),
    (2, "Khách hàng");
INSERT INTO ACCOUNTS (
        ID_USER,
        ID_AUTHORIZE,
        USERNAME,
        PASS_WORD,
        STATUS_ACCOUNT
    )
VALUES (2, 1, "thanhnam123", "12345678", 1),
    (1, 2, "trannam123", "12345678", 1),
    (3, 1, "nguyennam123", "12345678", 1),
    (4, 2, "nguyenvana123", "12345678", 1),
    (5, 1, "nguyenvanb123", "12345678", 1);