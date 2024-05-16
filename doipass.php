<div class="main-content bg-white" id="mainContent">
    <div class="btnMenu" id="btnMenu">
        <h2 id="user-info">Đổi mật khẩu</h2>
    </div>
    <div class="main-info">
        <div class="info-wrapper">
            <form action="" method="post">
                <div class="user-info input-group mb-3">
                    <label for="username-authorize">Tên đăng nhập:</label>
                    <input readonly class="form-control-plaintext" type="text" id="username" value="
                        ">
                </div>
                <div class="user-info input-group mb-5">
                    <label for="passold">Mật khẩu hiện tại:</label>
                    <input type="password" id="pasold">
                </div>

                <div class="user-info input-group mb-5">
                    <label for="passnew">Mật khẩu mới:</label>
                    <input type="password" id="passnew">
                </div>
                
                <div class="user-btn">
                    <button id="saveButton">Lưu</button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    /* CSS cho phần chính */
    .main-content {
        max-width: 600px;
        /* Thay đổi kích thước theo nhu cầu */
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 8px;
    }

    /* CSS cho nút menu */
    .btnMenu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    #menu-toggle {
        background: none;
        border: none;
        cursor: pointer;
    }

    #menu-toggle svg {
        fill: #333;
    }

    /* CSS cho tiêu đề */
    .title h2 {
        color: #333;
    }

    /* CSS cho phần thông tin chính */
    .main-info {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
    }

    /* CSS cho mỗi phần thông tin cá nhân */
    .user-info {
        margin-bottom: 15px;
    }

    .user-info label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
        color: #333;
    }

    .user-info input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
        color: #333;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    /* Reset default styles */
    select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-color: transparent;
        border: 1px solid #ccc;
        padding: 8px 30px 8px 10px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
    }

    /* Style the custom dropdown arrow */
    select::after {
        content: '\25BC';
        /* Unicode character for down arrow */
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        pointer-events: none;
    }

    /* Style for selected option */
    option:checked {
        background-color: #f0f0f0;
    }

    .user-btn {
        text-align: right;
        /* Căn lề phải */
    }

    #saveButton {
        background-color: #4CAF50;
        /* Màu nền */
        color: white;
        /* Màu chữ */
        padding: 10px 20px;
        /* Kích thước padding */
        border: none;
        /* Không có đường viền */
        border-radius: 5px;
        /* Bo tròn góc */
        cursor: pointer;
        /* Con trỏ khi di chuột qua */
        font-size: 16px;
        /* Kích thước chữ */
    }
</style>

<script src="./js/userInfo.js"></script>
<!-- <script src="./js/user.js"></script> -->