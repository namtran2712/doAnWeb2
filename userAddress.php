<div class="top-content" id="topContent">
    <h2 id="user-info">Địa chỉ</h2>
    <button id="addAddress">
        <div class="menu-item">
            <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOElEQVR4nGNgGCDgBsVUA1eheNRA8sEwDEM3JE3Y8A8oxqfGjaYGDv4wJARGDRyEYehG7QKWaAAAXKI0qf87rN4AAAAASUVORK5CYII=">
            <span>Thêm địa chỉ</span>
        </div>
    </button>
</div>
<div class="main-content">
    <div class="overlay" id="overlay"></div>

    <div class="centered-form" id="centeredForm" style="display: none;">
        <div class="top-title">
            <h2 id="user-info">Địa chỉ</h2>
        </div>
        <!-- Form thêm địa chỉ -->
        <form id="addAddressForm">
            <div class="nameAndPhone">
                <input readonly type="text" id="fullname" class=".form-control-plaintext" name="name">
                <input readonly type="text" id="phone" name="phone" class=".form-control-plaintext">
            </div>
            <input type="text" id="addressNote" name="address" placeholder="Địa chỉ cụ thể" required>
            <input type="text" id="address" name="address" placeholder="Tỉnh/ Thành Phố, Quận/ Huyện, Phường/ Xã"
                required>
        </form>
        <!-- Dropdown danh sách thành phố, quận, phường -->
        <div id="addressDropdown">
            <div class="tab">
                <button class="tablinks active" onclick="openTab(event, 'city')">Tỉnh/ Thành phố</button>
                <button class="tablinks" onclick="openTab(event, 'district')">Quận/ Huyện</button>
                <button class="tablinks" onclick="openTab(event, 'ward')">Phường/ Xã</button>
            </div>
            <div id="city" class="tabcontent">
                <!-- Danh sách thành phố -->
                <ul id="cityList">

                </ul>
            </div>
            <div id="district" class="tabcontent">
                <!-- Danh sách quận -->
                <ul id="districtList">

                </ul>
            </div>
            <div id="ward" class="tabcontent">
                <!-- Danh sách phường -->
                <ul id="wardList">

                </ul>
            </div>
        </div>
        <div class="btnAction">
            <button class="back-button" id="backButton">Trở lại</button>
            <button class="btnAdd" type="submit">Thêm</button>
            <button class="btnRepair" type="submit">Sửa</button>
        </div>
    </div>

    <div class="addressContainer">
        <div class="address">
            <div class="addressInfo">
                <div class="nameAndPhone">
                    <p class="name">111</p>
                    <p> 11</p>
                </div>
                <div class="addressDetails me-3">
                    <p>1111</p>
                </div>
                <div class="setDefault me-3">
                    <span class="border border-danger"> Mặc định </span>
                </div>
            </div>
            <div class="button-container">
                <div class="btnTop">
                    <button class="btnUpdate" data-id=${valueOfElement.ID_USER_SHIPPING_ADDRESS}>Cập nhật</button>
                    <button class="btnDelete" data-id=${valueOfElement.ID_USER_SHIPPING_ADDRESS}>Xóa</button>
                </div>
                <button class="btnDefault">Thiết lập mặc định</button>
            </div>
        </div>
    </div>
</div>
<script src="./js/userAddress.js"></script>
<style>
    p{
        font-size: 18px;
    }
    .btnDefault ,.btnUpdate ,.btnDelete {
        font-size: 15px;
    }
    span {
        padding: 5px !important
    }
</style>