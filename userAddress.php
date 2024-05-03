<div class="top-content" id="topContent">
    <h2 id="user-info">Địa chỉ</h2>
    <button id="addAddress">
        <div class="menu-item">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOElEQVR4nGNgGCDgBsVUA1eheNRA8sEwDEM3JE3Y8A8oxqfGjaYGDv4wJARGDRyEYehG7QKWaAAAXKI0qf87rN4AAAAASUVORK5CYII=">
            <span>Thêm địa chỉ</span>
        </div>
    </button>
</div>
<div class="main-content">
    <div class="overlay" id="overlay"></div>

    <div class="centered-form" id="centeredForm">
        <div class="top-title">
            <h2 id="user-info">Địa chỉ</h2>
        </div>
        <!-- Form thêm địa chỉ -->
        <form id="addAddressForm">
            <div class="nameAndPhone">
                <input readonly type="text" id="fullname" class=".form-control-plaintext" name="name">
                <input readonly type="text" id="phone" name="phone"  class=".form-control-plaintext">
            </div>
            <input type="text" id="addressNote" name="address" placeholder="Địa chỉ cụ thể" required>
            <input type="text" id="address" name="address" placeholder="Tỉnh/ Thành Phố, Quận/ Huyện, Phường/ Xã" required>
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
        </div>
    </div>
    <div class="addressContainer">

    </div>
</div>
<script src="./js/userAddress.js"></script>